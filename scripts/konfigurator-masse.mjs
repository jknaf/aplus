// Liest die glTF-Modelle des Skate-Katalogs und schreibt public/konfigurator/masse.json:
// Außenmaße, Höhe und die hohe Seite (Andockseite) je Element. Läuft vor jedem Build,
// damit neu exportierte Modelle (z. B. mit neuen Texturen) automatisch richtig andocken.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const katalog = JSON.parse(readFileSync(join(root, 'public/katalog/katalog.json'), 'utf8'));

const punkte = (gltfPfad) => {
  const g = JSON.parse(readFileSync(gltfPfad, 'utf8'));
  const puffer = {};
  const out = [];
  for (const m of g.meshes) {
    for (const p of m.primitives) {
      const a = g.accessors[p.attributes.POSITION];
      const bv = g.bufferViews[a.bufferView];
      const uri = g.buffers[bv.buffer].uri;
      puffer[uri] ??= readFileSync(join(dirname(gltfPfad), uri));
      const buf = puffer[uri];
      const off = (bv.byteOffset ?? 0) + (a.byteOffset ?? 0);
      const st = bv.byteStride ?? 12;
      for (let i = 0; i < a.count; i++) {
        out.push([buf.readFloatLE(off + i * st), buf.readFloatLE(off + i * st + 4), buf.readFloatLE(off + i * st + 8)]);
      }
    }
  }
  return out;
};

const r = (x) => Math.round(x * 1000) / 1000;

export const vermessen = (v) => {
  let [x0, x1, y1, z0, z1] = [Infinity, -Infinity, 0, Infinity, -Infinity];
  for (const [x, y, z] of v) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    z0 = Math.min(z0, z); z1 = Math.max(z1, z);
  }
  const rand = 0.08;
  const hoeheAn = (f) => v.reduce((m, p) => (f(p) ? Math.max(m, p[1]) : m), 0);
  const s = {
    xmin: hoeheAn((p) => p[0] < x0 + rand), xmax: hoeheAn((p) => p[0] > x1 - rand),
    zmin: hoeheAn((p) => p[2] < z0 + rand), zmax: hoeheAn((p) => p[2] > z1 - rand),
  };
  // Ein Seitenpaar ist „gerichtet“, wenn eine Seite fast die volle Höhe hat und die andere höchstens die Hälfte.
  const richtung = (a, b) => (a >= 0.9 * y1 && b <= 0.5 * y1 ? -1 : b >= 0.9 * y1 && a <= 0.5 * y1 ? 1 : 0);
  const hx = richtung(s.xmin, s.xmax);
  const hz = richtung(s.zmin, s.zmax);
  const n = Math.hypot(hx, hz);
  return {
    l: r(x1 - x0), b: r(z1 - z0), h: r(y1),
    hoch: n ? { x: r(hx / n), z: r(hz / n) } : null,
    niedrig: r(Math.min(s.xmin, s.xmax, s.zmin, s.zmax)),
  };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const masse = {};
  for (const e of katalog.elemente) {
    masse[e.slug] = vermessen(punkte(join(root, 'public', e.modell)));
  }
  mkdirSync(join(root, 'public/konfigurator'), { recursive: true });
  writeFileSync(join(root, 'public/konfigurator/masse.json'), JSON.stringify(masse));
  console.log(`[konfigurator] masse.json mit ${Object.keys(masse).length} Elementen geschrieben.`);
}
