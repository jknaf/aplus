import React, { Suspense, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber';
import { Environment, Html, Line, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { umriss, type Ctx, type Park, type Teil, type V, type Zusatz } from './logik';

THREE.Cache.enabled = true;

export interface BuehnenApi {
  bild: () => string;
  foto: () => string;
  bodenPunkt: (clientX: number, clientY: number) => V | null;
}

interface Props {
  ctx: Ctx;
  park: Park;
  zusatz: Zusatz[];
  auswahl: string | null;
  markierung: Record<string, 'rot' | 'gelb'>;
  ansicht: '3d' | 'oben';
  rundflug: boolean;
  modellPfad: (slug: string) => string;
  onAuswahl: (id: string | null) => void;
  onZiehen: (t: Teil, einzeln: boolean) => void;
  onAblegen: () => void;
  onBereit: (api: BuehnenApi) => void;
}

const boden = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const rad = (g: number) => (g * Math.PI) / 180;

// Ein Katalogmodell, geklont, damit dasselbe Element mehrfach stehen kann
const Modell: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  const kopie = useMemo(() => {
    const k = scene.clone(true);
    k.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return k;
  }, [scene]);
  return <primitive object={kopie} />;
};

const Platzhalter: React.FC<{ l: number; b: number; h: number }> = ({ l, b, h }) => (
  <mesh position={[0, h / 2, 0]}>
    <boxGeometry args={[l, h, b]} />
    <meshStandardMaterial color="#cfcac0" transparent opacity={0.6} />
  </mesh>
);

const Rahmen: React.FC<{ punkte: V[]; farbe: string }> = ({ punkte, farbe }) => (
  <Line points={[...punkte, punkte[0]].map((p) => [p.x, 0.02, p.z] as [number, number, number])} color={farbe} lineWidth={3} />
);

const TeilObjekt = memo<{
  t: Teil; ctx: Ctx; url: string; stufe?: 'rot' | 'gelb';
  onDown: (e: ThreeEvent<PointerEvent>, t: Teil) => void;
  onMove: (e: ThreeEvent<PointerEvent>) => void;
  onUp: (e: ThreeEvent<PointerEvent>) => void;
}>(({ t, ctx, url, stufe, onDown, onMove, onUp }) => {
  const m = ctx.masse[t.slug];
  return (
    // Handler direkt am Element: bei Pointer-Capture liefert r3f Bewegungen nur an das gegriffene Objekt
    <group position={[t.x, 0, t.z]} rotation={[0, rad(t.rot), 0]} onPointerDown={(e) => onDown(e, t)} onPointerMove={onMove} onPointerUp={onUp}>
      <Suspense fallback={<Platzhalter l={m.l} b={m.b} h={m.h} />}>
        <Modell url={url} />
      </Suspense>
      {stufe && (
        <Html position={[0, m.h + 0.5, 0]} center zIndexRange={[20, 0]}>
          <span className={`block w-4 h-4 rounded-full border-2 border-white shadow ${stufe === 'rot' ? 'bg-red-600' : 'bg-amber-400'}`} />
        </Html>
      )}
    </group>
  );
});

const Kamera: React.FC<{ park: Park; ansicht: '3d' | 'oben'; rundflug: boolean; steuerung: React.RefObject<OrbitControlsImpl> }> = ({ park, ansicht, rundflug, steuerung }) => {
  const { camera } = useThree();
  const groesse = Math.max(park.flaeche.l, park.flaeche.b);
  useEffect(() => {
    if (ansicht === 'oben') camera.position.set(0, groesse * 1.25, 0.001);
    else camera.position.set(park.flaeche.l * 0.3, groesse * 0.6, park.flaeche.b * 0.5 + groesse * 0.75);
    steuerung.current?.target.set(0, 0, 0);
    steuerung.current?.update();
    // nur bei Ansichtswechsel oder neuer Flächengröße umsetzen, nicht bei jedem verschobenen Element
  }, [ansicht, groesse, camera, park.flaeche.l, park.flaeche.b, steuerung]);
  return (
    <OrbitControls
      ref={steuerung}
      makeDefault
      enableRotate={ansicht === '3d'}
      maxPolarAngle={ansicht === 'oben' ? 0.01 : 1.42}
      minDistance={3}
      maxDistance={groesse * 3 + 20}
      autoRotate={rundflug}
      autoRotateSpeed={0.6}
    />
  );
};

const Api: React.FC<{ onBereit: (api: BuehnenApi) => void; park: Park }> = ({ onBereit, park }) => {
  const { gl, scene, camera } = useThree();
  const flaeche = useRef(park.flaeche);
  flaeche.current = park.flaeche;
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    onBereit({
      bodenPunkt: (cx, cy) => {
        const r = gl.domElement.getBoundingClientRect();
        raycaster.setFromCamera(new THREE.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
        const p = new THREE.Vector3();
        return raycaster.ray.intersectPlane(boden, p) ? { x: p.x, z: p.z } : null;
      },
      foto: () => { gl.render(scene, camera); return gl.domElement.toDataURL('image/jpeg', 0.9); },
      // Draufsicht für die Anfrage: Kamera kurz nach oben, ein Bild rendern, zurück
      bild: () => {
        const f = flaeche.current;
        const alt = camera.position.clone();
        const altQ = camera.quaternion.clone();
        camera.position.set(0, Math.max(f.l, f.b) * 1.2, 0.001);
        camera.lookAt(0, 0, 0);
        gl.render(scene, camera);
        const url = gl.domElement.toDataURL('image/jpeg', 0.82);
        camera.position.copy(alt);
        camera.quaternion.copy(altQ);
        gl.render(scene, camera);
        return url;
      },
    });
  }, [gl, scene, camera, onBereit]);
  return null;
};

const Raster: React.FC<{ l: number; b: number }> = ({ l, b }) => {
  const geo = useMemo(() => {
    const p: number[] = [];
    for (let x = -l / 2; x <= l / 2 + 1e-6; x += 1.25) p.push(x, 0.006, -b / 2, x, 0.006, b / 2);
    for (let z = -b / 2; z <= b / 2 + 1e-6; z += 1.25) p.push(-l / 2, 0.006, z, l / 2, 0.006, z);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
    return g;
  }, [l, b]);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#8a8a80" transparent opacity={0.35} />
    </lineSegments>
  );
};

const Boden: React.FC<{ l: number; b: number; onLeer: () => void }> = ({ l, b, onLeer }) => {
  // useTexture lädt über Suspense; so wird nach dem Laden neu gezeichnet (Bühne rendert nur bei Bedarf)
  const textur = useTexture('/katalog/modelle/texturen/beton_farbe.jpg', (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
  });
  useEffect(() => { textur.repeat.set(l / 4, b / 4); textur.needsUpdate = true; }, [textur, l, b]);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow onPointerDown={(e) => { if (e.button === 0) onLeer(); }}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#a3ad92" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow onPointerDown={(e) => { if (e.button === 0) onLeer(); }}>
        <planeGeometry args={[l, b]} />
        <meshStandardMaterial map={textur} color="#d9d6cf" roughness={0.95} />
      </mesh>
      <Raster l={l} b={b} />
    </group>
  );
};

const Buehne: React.FC<Props> = ({ ctx, park, zusatz, auswahl, markierung, ansicht, rundflug, modellPfad, onAuswahl, onZiehen, onAblegen, onBereit }) => {
  const steuerung = useRef<OrbitControlsImpl>(null);
  const ziehen = useRef<{ id: string; versatz: V; teil: Teil; bewegt: boolean; einzeln: boolean } | null>(null);
  const gewaehlt = park.teile.find((t) => t.id === auswahl);
  // höchstens 25 Hinweis-Punkte, rote zuerst: jedes HTML-Overlay kostet bei jedem Bild
  const punkte = useMemo(() => new Set(Object.entries(markierung).sort((a, b) => (a[1] === 'rot' ? -1 : 1) - (b[1] === 'rot' ? -1 : 1)).slice(0, 25).map(([id]) => id)), [markierung]);

  const rueckruf = useRef({ onAuswahl, onZiehen, onAblegen });
  rueckruf.current = { onAuswahl, onZiehen, onAblegen };
  const runter = useCallback((e: ThreeEvent<PointerEvent>, t: Teil) => {
    const { onAuswahl } = rueckruf.current;
    if (e.button !== 0) return;
    e.stopPropagation();
    onAuswahl(t.id);
    const p = new THREE.Vector3();
    if (!e.ray.intersectPlane(boden, p)) return;
    ziehen.current = { id: t.id, versatz: { x: t.x - p.x, z: t.z - p.z }, teil: t, bewegt: false, einzeln: e.altKey };
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (steuerung.current) steuerung.current.enabled = false;
  }, []);
  const bewegen = useCallback((e: ThreeEvent<PointerEvent>) => {
    const { onZiehen } = rueckruf.current;
    const z = ziehen.current;
    if (!z) return;
    e.stopPropagation();
    const p = new THREE.Vector3();
    if (!e.ray.intersectPlane(boden, p)) return;
    z.bewegt = true;
    onZiehen({ ...z.teil, x: p.x + z.versatz.x, z: p.z + z.versatz.z }, z.einzeln);
  }, []);
  const loslassen = useCallback((e: ThreeEvent<PointerEvent>) => {
    const { onAblegen } = rueckruf.current;
    const z = ziehen.current;
    if (!z) return;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    ziehen.current = null;
    if (steuerung.current) steuerung.current.enabled = true;
    if (z.bewegt) onAblegen();
  }, []);

  return (
    <Canvas
      shadows
      frameloop={rundflug ? 'always' : 'demand'}
      dpr={park.teile.length > 120 ? [1, 1.25] : [1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{ fov: 40, near: 0.1, far: 1000, position: [20, 18, 26] }}
      onPointerMissed={() => onAuswahl(null)}
    >
      <color attach="background" args={['#e9ebe4']} />
      <fog attach="fog" args={['#e9ebe4', 80, 260]} />
      <Suspense fallback={null}>
        <Environment files="/katalog/tageslicht.hdr" environmentIntensity={0.9} />
      </Suspense>
      <hemisphereLight args={['#ffffff', '#9aa38a', 0.5]} />
      <directionalLight
        position={[18, 30, 12]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0004}
      />
      <Suspense fallback={null}><Boden l={park.flaeche.l} b={park.flaeche.b} onLeer={() => onAuswahl(null)} /></Suspense>
      {park.teile.map((t) => (
        <TeilObjekt key={t.id} t={t} ctx={ctx} url={modellPfad(t.slug)} stufe={punkte.has(t.id) ? markierung[t.id] : undefined} onDown={runter} onMove={bewegen} onUp={loslassen} />
      ))}
      {zusatz.map((z, i) => (
        <group key={`${z.slug}-${i}`} position={[z.x, z.y ?? 0, z.z]} rotation={[0, rad(z.rot), 0]}>
          <Suspense fallback={null}><Modell url={modellPfad(z.slug)} /></Suspense>
        </group>
      ))}
      {gewaehlt && <Rahmen punkte={umriss(gewaehlt, ctx)} farbe={markierung[gewaehlt.id] === 'rot' ? '#dc2626' : '#6B8F4A'} />}
      <Kamera park={park} ansicht={ansicht} rundflug={rundflug} steuerung={steuerung} />
      <Api onBereit={onBereit} park={park} />
    </Canvas>
  );
};

export default Buehne;
