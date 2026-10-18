import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ParkTeil { slug: string; m: number[] }
interface Props { teile: ParkTeil[]; extra: string | null; flaeche: number[] | null; poster: string; alt: string }

// Drehbarer Skatepark aus den fertigen Katalogmodellen: jedes Teil ist ein Katalog-glTF, die Matrix kommt aus Blender
// (08_Preisliste/heft_szenen.py, LAGE). Licht ist eingebacken (unbeleuchtete Materialien), deshalb ohne Lampen.
// Geländer mit eigener Form aus Archicad liegen fertig platziert in einer Zusatzdatei.
const C = new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1);   // Blender (z oben) → glTF (y oben)
const Ci = C.clone().invert();
const lader = new GLTFLoader();
const cache = new Map<string, Promise<THREE.Group | null>>();
const laden = (src: string) => {
  if (!cache.has(src)) cache.set(src, lader.loadAsync(src).then((g) => g.scene, () => null));
  return cache.get(src)!;
};

const ParkAnsicht: React.FC<Props> = ({ teile, extra, flaeche, poster, alt }) => {
  const feld = useRef<HTMLDivElement>(null);
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    const el = feld.current;
    if (!el) return;
    let aus = false;
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    r.toneMapping = THREE.NoToneMapping;
    r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    el.appendChild(r.domElement);
    const sc = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(39.6, 1, 0.1, 500);
    const ctl = new OrbitControls(cam, r.domElement);
    ctl.enableDamping = true; ctl.maxPolarAngle = Math.PI / 2 - 0.05; ctl.autoRotateSpeed = 0.6;
    const groesse = () => {
      const { width, height } = el.getBoundingClientRect();
      r.setSize(width, height, false); cam.aspect = width / Math.max(height, 1); cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(groesse); ro.observe(el); groesse();

    Promise.all([
      ...teile.map(async (t) => {
        const g = await laden(`/katalog/modelle/${t.slug}.gltf`);
        if (!g) return;
        const w = new THREE.Group(); w.matrixAutoUpdate = false;
        w.matrix.copy(C).multiply(new THREE.Matrix4().set(...(t.m as [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]))).multiply(Ci);
        w.add(g.clone(true)); sc.add(w);
      }),
      extra && laden(extra).then((g) => {
        if (!g) return;
        const stahl = new THREE.MeshBasicMaterial({ color: '#B4B8BC' });
        const o = g.clone(true); o.traverse((m) => { if ((m as THREE.Mesh).isMesh) (m as THREE.Mesh).material = stahl; }); sc.add(o);
      }),
    ]).then(() => {
      if (aus) return;
      const box = new THREE.Box3().setFromObject(sc);
      if (flaeche) {   // Platzfläche wie im Heft; Rahmen nach der Fläche, nicht nach den Schattenplatten
        const [l, b, x0 = 0, y0 = 0] = flaeche;
        const p = new THREE.Mesh(new THREE.PlaneGeometry(l, b), new THREE.MeshBasicMaterial({ color: '#D6D4CE' }));
        p.rotation.x = -Math.PI / 2; p.position.set(x0 + l / 2, -0.005, -(y0 + b / 2)); sc.add(p);
        box.min.x = x0; box.max.x = x0 + l; box.min.z = -(y0 + b); box.max.z = -y0;
      }
      const mitte = box.getCenter(new THREE.Vector3()), radius = box.getSize(new THREE.Vector3()).length() / 2;
      mitte.y = box.min.y + 0.6;   // Blick auf die Fahrfläche, nicht auf die Mitte der Geländerhöhe
      const fov = THREE.MathUtils.degToRad(Math.min(cam.fov, cam.fov * cam.aspect)) / 2;
      // Blickrichtung wie Katalog und Heft (Blender 1, -1.25, 0.62)
      cam.position.copy(mitte).add(new THREE.Vector3(1, 0.62, 1.25).normalize().multiplyScalar((radius / Math.sin(fov)) * 0.8));
      ctl.target.copy(mitte); ctl.maxDistance = radius * 5; ctl.minDistance = 1; ctl.update();
      setGeladen(true);
      setTimeout(() => { ctl.autoRotate = true; }, 300);
    });
    ctl.addEventListener('start', () => { ctl.autoRotate = false; });
    r.setAnimationLoop(() => { ctl.update(); r.render(sc, cam); });
    return () => { aus = true; ro.disconnect(); r.setAnimationLoop(null); ctl.dispose(); r.dispose(); el.removeChild(r.domElement); };
  }, [teile, extra, flaeche]);

  return (
    <div ref={feld} className="relative w-full h-full cursor-grab">
      <img src={poster} alt={alt} draggable={false} className="absolute inset-0 w-full h-full object-contain p-6 pointer-events-none transition-opacity duration-300" style={{ opacity: geladen ? 0 : 1 }} />
    </div>
  );
};

export default ParkAnsicht;
