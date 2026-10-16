// Laufzeitmessung mit vielen Elementen: node scripts/konfigurator-tempo.ts
import { readFileSync } from 'node:fs';
import { BAUSTEINE, VORLAGEN, vorlageBauen, hinzufuegen, pruefen, abgeleitet, allesBeheben, stueckliste, einrasten, type Ctx, type Park } from '../components/konfigurator/logik.ts';

const katalog = JSON.parse(readFileSync(new URL('../public/katalog/katalog.json', import.meta.url), 'utf8'));
const masse = JSON.parse(readFileSync(new URL('../public/konfigurator/masse.json', import.meta.url), 'utf8'));
const info: Ctx['info'] = {};
for (const e of katalog.elemente) info[e.slug] = { name: e.name, code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe, kg: e.gewicht?.kg };
const ctx: Ctx = { masse, info };
const zeit = <T>(name: string, f: () => T): T => { const t0 = performance.now(); const r = f(); console.log(`${name}: ${(performance.now() - t0).toFixed(0)} ms`); return r; };

let p: Park = vorlageBauen(VORLAGEN[2], ctx);
for (let i = 0; i < 5; i++) p = zeit(`Bowl ${i + 1} hinzufügen (${p.teile.length} Teile vorher)`, () => hinzufuegen(p, BAUSTEINE.find((b) => b.id === 'bowl-150')!.bauen(ctx)!, ctx));
console.log(`${p.teile.length} Teile, Fläche ${p.flaeche.l} × ${p.flaeche.b} m`);
zeit('pruefen', () => pruefen(p, ctx));
zeit('abgeleitet', () => abgeleitet(p, ctx));
zeit('stueckliste', () => stueckliste(p, ctx));
const t = p.teile[3];
zeit('einrasten (ein Zug-Schritt)', () => einrasten({ ...t, x: t.x + 0.3 }, p, ctx));
const eng: Park = { ...p, teile: p.teile.map((x, i) => (i < 12 ? { ...x, x: x.x + 1.5 } : x)) };
zeit('allesBeheben', () => allesBeheben(eng, ctx));
