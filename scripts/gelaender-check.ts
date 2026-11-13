// Selbsttest: Geländerpfosten stehen außen, Stabfüllung zur Fahrfläche. npx tsx scripts/gelaender-check.ts
import { readFileSync } from 'node:fs';
import { abgeleitet, drehe, type Ctx } from '../components/konfigurator/logik.ts';
const katalog = JSON.parse(readFileSync('public/katalog/katalog.json', 'utf8'));
const masse = JSON.parse(readFileSync('public/konfigurator/masse.json', 'utf8'));
const info: Ctx['info'] = {};
for (const e of katalog.elemente) info[e.slug] = { name: e.name, code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe };
const ctx: Ctx = { masse, info };
const P: Record<string, any> = { 'gelaender-125': { x: 0, z: -1 }, 'gelaender-250': { x: -1, z: 0 }, 'gelaender-375': { x: 1, z: 0 }, 'gelaender-500': { x: 1, z: 0 } };
let fehler = 0;
for (const slug of ['quarterramp-200', 'quarterramp-165', 'bigbank-165', 'table-125', 'table-150', 'corner-table-98'])
  for (const rot of [0, 90, 180, 270, 45]) {
    const ab = abgeleitet({ flaeche: { l: 40, b: 30, angeboescht: false }, teile: [{ id: 'a', slug, x: 10, z: 10, rot }] }, ctx);
    const felder = ab.gelaender.filter((g) => P[g.slug]);
    for (const g of felder) {
      const p = drehe(P[g.slug], g.rot), r = { x: g.x - 10, z: g.z - 10 };
      if (p.x * r.x + p.z * r.z <= 0) { fehler++; console.log('Pfosten innen!', slug, rot, g); }
    }
    if (rot === 0) console.log(slug, ab.gelaender.map((g) => g.slug).join(' '));
  }
for (const n of [2, 3, 4]) for (const rot of [0, 90, 180, 270]) {
  const teile = Array.from({ length: n }, (_, i) => ({ id: 't' + i, slug: 'table-150', x: 10 + (rot % 180 ? 0 : i * 1.25), z: 10 + (rot % 180 ? i * 1.25 : 0), rot }));
  const c = { x: 10 + (rot % 180 ? 0 : (n - 1) * 0.625), z: 10 + (rot % 180 ? (n - 1) * 0.625 : 0) };
  const ab = abgeleitet({ flaeche: { l: 40, b: 30, angeboescht: false }, teile }, ctx);
  for (const g of ab.gelaender.filter((g) => P[g.slug])) {
    const p = drehe(P[g.slug], g.rot), r = { x: g.x - c.x, z: g.z - c.z };
    if (p.x * r.x + p.z * r.z <= 0) { fehler++; console.log('Pfosten innen!', n, rot, g.slug); }
  }
}
console.log(fehler ? `FEHLER ${fehler}` : 'alle Pfosten außen');
// G10: freie Enden gerundet. Quarterramp 200 frei: Plateau-Seiten enden in je einem Endstück, Bogen zum freien Ende (nach vorn)
{
  const ab = abgeleitet({ flaeche: { l: 40, b: 30, angeboescht: false }, teile: [{ id: 'q', slug: 'quarterramp-200', x: 10, z: 10, rot: 0 }] }, ctx);
  const e = ab.gelaender.filter((g) => g.slug.startsWith('gelaender-ende'));
  if (e.length !== 2) { fehler++; console.log('Endstücke an Quarterramp 200:', e.length); }
  for (const g of e) {
    const bogen = drehe({ x: g.slug === 'gelaender-ende-links' ? 1 : -1, z: 0 }, g.rot); // Richtung des Bogens
    if (bogen.x >= 0) { fehler++; console.log('Bogen zeigt nicht zum freien Ende', g); } // Rückseite liegt bei +x, frei ist -x
  }
  if (ab.gelaender.some((g) => /^gelaender-(125|250|375|500)$/.test(g.slug) && Math.abs(g.z - 10) > 1)) { fehler++; console.log('offenes Feld an der Plateau-Seite'); }
}
// Tisch-Reihe rundum geschlossen: keine Endstücke
{
  const teile = [0, 1, 2].map((i) => ({ id: 't' + i, slug: 'table-150', x: 10 + i * 1.25, z: 10, rot: 0 }));
  const ab = abgeleitet({ flaeche: { l: 40, b: 30, angeboescht: false }, teile }, ctx);
  if (ab.gelaender.some((g) => /^gelaender-(ende|einzl)/.test(g.slug))) { fehler++; console.log('Endstück an geschlossenem Lauf'); }
}
// G06: an der Stoßseite zum angedockten Table nie Geländer, auch 1,03 m tiefer (kein Käfig)
const paar = (unten: string) => abgeleitet({ flaeche: { l: 40, b: 30, angeboescht: false }, teile: [{ id: 'a', slug: 'table-150', x: 10, z: 10, rot: 0 }, { id: 'b', slug: unten, x: 11.25, z: 10, rot: 0 }] }, ctx).gelaender;
if (['table-45', 'table-60'].some((u) => paar(u).some((g) => Math.abs(g.x - 10.657) < 0.01 && Math.abs(g.z - 10) < 0.01))) { fehler++; console.log('G06: Geländer an der Stoßseite'); }
// G08: Extension Table 150 + Table 98: Geländer läuft auf beiden freien Seiten 1,25 m über die untere Stufe
if (paar('table-98').filter((g) => g.slug === 'gelaender-einzl' && Math.abs(g.x - 11.25) < 0.01).length !== 2) { fehler++; console.log('G08: keine Verlängerung über die untere Stufe'); }
console.log(fehler ? `FEHLER ${fehler}` : 'Enden gerundet, G06 und G08 wie festgelegt');
