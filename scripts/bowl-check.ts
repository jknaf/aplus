// Selbsttest Bowl nach Maß: alle Nasen-Kombinationen je Höhe und Nasenlänge, Größen 1, 5, 10 (mit --alle: 1–10).
// Prüft: baut, Ring schließt (sonst null), B12 flacher Boden ≥ 2,50 m, keine Überlappung, als ein Bowl erkannt, B13 höchstens 4 Nasen.
// Lauf: npx esbuild scripts/bowl-check.ts --bundle --platform=node --format=esm --outfile=/tmp/bc.mjs && node /tmp/bc.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { LEER, MAX_NASEN, bowls, hinzufuegen, pruefen, tiefen, ueberlappt, umriss, bowlFormErgebnis, zuEng, type Ctx, type NasenSeite } from '../components/konfigurator/logik.ts';

const katalog = JSON.parse(readFileSync(new URL('../public/katalog/katalog.json', import.meta.url), 'utf8'));
const masse = JSON.parse(readFileSync(new URL('../public/konfigurator/masse.json', import.meta.url), 'utf8'));
const info: Ctx['info'] = {};
for (const e of katalog.elemente) info[e.slug] = { name: e.name, code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe, kg: e.gewicht?.kg };
const ctx: Ctx = { masse, info };

const OPT: NasenSeite[] = [{ n: 0, aussen: false }, { n: 1, aussen: false }, { n: 2, aussen: false }, { n: 1, aussen: true }, { n: 2, aussen: true }];
const groessen = process.argv.includes('--alle') ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 5, 10];
const ringteil = /^(coping-ramp|corner|kegel)-/;
let n = 0, fehlt = 0, tiefst = 0;
const t0 = Date.now();
for (const h of [98, 150] as const) for (const a of OPT) for (const b of OPT) for (const c of OPT) for (const d of OPT) {
  const seiten = [a, b, c, d];
  const mitZunge = seiten.some((x) => x.n && !x.aussen);
  // B13: mehr als 4 Nasen baut nicht
  if (seiten.reduce((a, x) => a + x.n, 0) > MAX_NASEN) { assert.equal(bowlFormErgebnis(h, 3, 2, seiten, 0, ctx), null); continue; }
  for (const lang of mitZunge ? [0, 1, 2] : [0]) for (const nl of groessen) for (const nb of groessen) {
    const name = `${h} ${nl}x${nb} ${seiten.map((x) => x.n + (x.aussen ? 'a' : 'i')).join(',')} lang ${lang}`;
    const e = bowlFormErgebnis(h, nl, nb, seiten, lang, ctx);
    n++;
    if (!e) { fehlt++; if (fehlt < 20) console.log('baut nicht:', name); continue; }
    assert.ok(!zuEng(h, e.linie, ctx), `zu eng: ${name}`);
    const r = e.teile.filter((t) => ringteil.test(t.slug) && !t.slug.startsWith('corner-table')).map((t) => umriss(t, ctx));
    for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) assert.ok(!ueberlappt(r[i], r[j], 0.05), `Überlappung: ${name}`);
    tiefst = Math.max(tiefst, e.sl + e.sb);
    if (nl === groessen[0] && nb === groessen[0]) {
      const p = hinzufuegen(LEER, e.teile, ctx);
      assert.equal(bowls(p, ctx).length, 1, `nicht als ein Bowl erkannt: ${name}`);
      assert.equal(tiefen(p, ctx).size, p.teile.length, `nicht alles abgesenkt: ${name}`);
      assert.deepEqual(pruefen(p, ctx).map((x) => x.text), [], `Hinweise: ${name}`);
    }
  }
}
console.log(`${n} Bowls, ${fehlt} bauen nicht, größte Seitensumme ${tiefst.toFixed(2)} m, ${((Date.now() - t0) / n).toFixed(1)} ms je Bowl`);
assert.equal(fehlt, 0);
