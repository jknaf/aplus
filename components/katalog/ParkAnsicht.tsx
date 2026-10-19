import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ParkTeil { slug: string; m: number[] }
// Erdböschung wie boeschung() in heft_szenen.py: Oberkante [x0, y0, x1, y1] auf Höhe h, Fuß auf z = 0, offen = Seiten ohne Fläche
export type Boeschung = [number[], number[], number | number[], (string | string[] | null)?, number[][][]?];
// beiHover: dreht sich nur, solange die Maus darüber ist (Geräte ohne Maus: dauerhaft, bis jemand das Modell berührt)
interface Props { teile: ParkTeil[]; extra: string | null; flaeche: number[] | null; boeschung?: Boeschung[] | null; alt: string; beiHover?: boolean }

// Drehbarer Skatepark aus den fertigen Katalogmodellen: jedes Teil ist ein Katalog-glTF, die Matrix kommt aus Blender
// (08_Preisliste/heft_szenen.py, LAGE). Licht ist eingebacken (unbeleuchtete Materialien), deshalb ohne Lampen.
// Geländer mit eigener Form aus Archicad liegen fertig platziert in einer Zusatzdatei.
const C = new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1);   // Blender (z oben) → glTF (y oben)
const Ci = C.clone().invert();
const lader = new GLTFLoader();
// ponytail: ?v=2 einmalig gegen alte Browser-Caches (bis 19.10.2026 durften Browser Modelle 1 Tag + 7 Tage behalten, seither fragen sie nach)
const STAND = '?v=2';
const cache = new Map<string, Promise<THREE.Group | null>>();
const laden = (src: string) => {
  if (!cache.has(src)) cache.set(src, lader.loadAsync(src).then((g) => g.scene, () => null));
  return cache.get(src)!;
};
// Schon beim Zeigen auf die Karte laden, damit der Park beim Öffnen fast fertig ist
export const vorladen = (teile: ParkTeil[], extra: string | null) => {
  new Set(teile.map((t) => t.slug)).forEach((s) => laden(`/katalog/modelle/${s}.gltf${STAND}`));
  if (extra) laden(extra);
};

// Jedes Katalogmodell bringt seine Schattenplatte mit. Im Park liegt sie auf der Platzfläche oder, bei aufgesetzten Teilen,
// genau auf einer anderen Oberfläche: das flackert dunkel (z-fighting). Darum Schatten nur am Boden, ohne Tiefenschreiben, leicht vorgezogen.
const schatten = (o: THREE.Object3D, amBoden: boolean) => o.traverse((m) => {
  if (m.name !== 'Schatten' || !(m as THREE.Mesh).isMesh) return;
  if (!amBoden) { m.visible = false; return; }
  const mat = (m as THREE.Mesh).material as THREE.Material;
  mat.depthWrite = false; mat.polygonOffset = true; mat.polygonOffsetFactor = -2; mat.polygonOffsetUnits = -2;
  m.renderOrder = 1;
});

// Rasen und Belag mit fest eingerechnetem Licht je Fläche (die Szene hat keine Lampen), Farben wie im Heft-Rendering
const LICHT = new THREE.Vector3(0.6, 1, 0.9).normalize();
const boeschungBauen = ([a, b, h, offen, dreiecke = []]: Boeschung) => {
  const hh = Array.isArray(h) ? h : [h, h, h, h];
  const off = ([] as (string | null | undefined)[]).concat(offen);
  const v = [[b[0], b[1], 0], [b[2], b[1], 0], [b[2], b[3], 0], [b[0], b[3], 0], [a[0], a[1], hh[0]], [a[2], a[1], hh[1]], [a[2], a[3], hh[2]], [a[0], a[3], hh[3]]];
  const seiten: Record<string, number[]> = { '-y': [0, 1, 5, 4], '+x': [1, 2, 6, 5], '+y': [2, 3, 7, 6], '-x': [3, 0, 4, 7] };
  const flaechen: [number[][], boolean][] = [];
  if (!off.includes('oben')) flaechen.push([[4, 5, 6, 7].map((i) => v[i]), true]);
  Object.entries(seiten).forEach(([k, f]) => { if (!off.includes(k)) flaechen.push([f.map((i) => v[i]), false]); });
  dreiecke.forEach((d) => flaechen.push([d, false]));
  const mitte = v.reduce((m, p) => m.add(new THREE.Vector3(p[0], p[2], -p[1])), new THREE.Vector3()).divideScalar(8);
  const pos: number[] = [], farbe: number[] = [];
  const rasen = new THREE.Color('#A7B59A'), belag = new THREE.Color('#D6D4CE');
  flaechen.forEach(([f, oben]) => {
    const p = f.map((q) => new THREE.Vector3(q[0], q[2], -q[1]));   // Blender (z oben) → y oben
    const n = new THREE.Vector3().crossVectors(p[1].clone().sub(p[0]), p[2].clone().sub(p[0])).normalize();
    const z = p.reduce((m, q) => m.add(q), new THREE.Vector3()).divideScalar(p.length);
    if (n.dot(z.sub(mitte)) < 0) { p.reverse(); n.negate(); }   // nach außen
    const c = oben ? belag : rasen.clone().multiplyScalar(0.72 + 0.28 * Math.max(0, n.dot(LICHT)));
    for (let i = 1; i < p.length - 1; i++) [p[0], p[i], p[i + 1]].forEach((q) => { pos.push(q.x, q.y, q.z); farbe.push(c.r, c.g, c.b); });
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(farbe, 3));
  return new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }));
};

const ParkAnsicht: React.FC<Props> = ({ teile, extra, flaeche, boeschung, alt, beiHover }) => {
  const feld = useRef<HTMLDivElement>(null);
  const [geladen, setGeladen] = useState(false);
  const [fertig, setFertig] = useState(0);

  useEffect(() => {
    const el = feld.current;
    if (!el) return;
    let aus = false;
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5));   // 2 kostet bei großen Fenstern spürbar Bildrate
    r.toneMapping = THREE.NoToneMapping;
    r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .5s';
    el.appendChild(r.domElement);
    const sc = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(39.6, 1, 0.5, 400);   // nahe Grenze nicht zu klein: sonst zu wenig Tiefengenauigkeit
    const ctl = new OrbitControls(cam, r.domElement);
    ctl.enableDamping = true; ctl.maxPolarAngle = Math.PI / 2 - 0.05; ctl.autoRotateSpeed = 0.6;
    const groesse = () => {
      const { width, height } = el.getBoundingClientRect();
      r.setSize(width, height, false); cam.aspect = width / Math.max(height, 1); cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(groesse); ro.observe(el); groesse();

    Promise.all([
      ...teile.map(async (t) => {
        const g = await laden(`/katalog/modelle/${t.slug}.gltf${STAND}`);
        if (!aus) setFertig((n) => n + 1);
        if (!g) return;
        const w = new THREE.Group(); w.matrixAutoUpdate = false;
        w.matrix.copy(C).multiply(new THREE.Matrix4().set(...(t.m as [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]))).multiply(Ci);
        const o = g.clone(true); schatten(o, Math.abs(t.m[11]) < 0.02); w.add(o); sc.add(w);   // m[11] = Höhe z
      }),
      extra && laden(extra).then((g) => {
        if (!g) return;
        const stahl = new THREE.MeshBasicMaterial({ color: '#B4B8BC' });
        const o = g.clone(true); o.traverse((m) => { if ((m as THREE.Mesh).isMesh) (m as THREE.Mesh).material = stahl; }); sc.add(o);
      }),
    ]).then(async () => {
      if (aus) return;
      const box = new THREE.Box3().setFromObject(sc);
      if (flaeche) {   // Platzfläche wie im Heft; Rahmen nach der Fläche, nicht nach den Schattenplatten
        const [l, b, x0 = 0, y0 = 0] = flaeche;
        const p = new THREE.Mesh(new THREE.PlaneGeometry(l, b), new THREE.MeshBasicMaterial({ color: '#D6D4CE' }));
        p.rotation.x = -Math.PI / 2; p.position.set(x0 + l / 2, -0.03, -(y0 + b / 2)); sc.add(p);
        box.min.x = x0; box.max.x = x0 + l; box.min.z = -(y0 + b); box.max.z = -y0;
      }
      boeschung?.forEach((d) => { const m = boeschungBauen(d); sc.add(m); box.union(new THREE.Box3().setFromObject(m)); });
      const mitte = box.getCenter(new THREE.Vector3()), radius = box.getSize(new THREE.Vector3()).length() / 2;
      mitte.y = box.min.y + 0.6;   // Blick auf die Fahrfläche, nicht auf die Mitte der Geländerhöhe
      const fov = THREE.MathUtils.degToRad(Math.min(cam.fov, cam.fov * cam.aspect)) / 2;
      // Blickrichtung wie Katalog und Heft (Blender 1, -1.25, 0.62)
      cam.position.copy(mitte).add(new THREE.Vector3(1, 0.62, 1.25).normalize().multiplyScalar((radius / Math.sin(fov)) * 0.8));
      ctl.target.copy(mitte); ctl.maxDistance = radius * 5; ctl.minDistance = 1; ctl.update();
      // Texturen und Shader vorab auf die Grafikkarte, sonst stockt das erste Bild eine Sekunde
      sc.traverse((m) => { const mat = (m as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined; if (mat?.map) r.initTexture(mat.map); });
      await r.compileAsync(sc, cam);
      if (aus) return;
      r.render(sc, cam); r.domElement.style.opacity = '1'; setGeladen(true);
      if (!nurHover) setTimeout(() => { ctl.autoRotate = true; }, 300);
    });
    ctl.addEventListener('start', () => { ctl.autoRotate = false; });
    const nurHover = !!beiHover && matchMedia('(hover: hover)').matches;
    const an = () => { ctl.autoRotate = true; }, ab = () => { ctl.autoRotate = false; };
    if (nurHover) { el.addEventListener('pointerenter', an); el.addEventListener('pointerleave', ab); }
    r.setAnimationLoop(() => { ctl.update(); r.render(sc, cam); });
    return () => { aus = true; el.removeEventListener('pointerenter', an); el.removeEventListener('pointerleave', ab); ro.disconnect(); r.setAnimationLoop(null); ctl.dispose(); r.dispose(); el.removeChild(r.domElement); };
  }, [teile, extra, flaeche, boeschung, beiHover]);

  return (
    <div ref={feld} className="relative w-full h-full cursor-grab">
      {/* Kein Vorschaubild: es zeigt einen anderen Ausschnitt und springt beim Wechsel. Stattdessen ruhig laden, dann einblenden. */}
      {!geladen && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-brand-muted pointer-events-none" role="status" aria-label={alt}>
          <span className="material-symbols-outlined text-4xl animate-pulse">3d_rotation</span>
          <span className="font-mono text-xs uppercase tracking-widest">Park wird geladen · {Math.round((fertig / Math.max(teile.length, 1)) * 100)} %</span>
        </div>
      )}
    </div>
  );
};

export default ParkAnsicht;
