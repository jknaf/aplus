// Selbsttest der Konfigurator-Logik: node scripts/konfigurator-check.ts
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import {
  BAUSTEINE, VORLAGEN, vorlageBauen, gruppen, pruefen, abgeleitet, einrasten, stueckliste, kodieren, dekodieren,
  ueberlappt, umriss, hinzufuegen, vorschlag, allesBeheben, type Ctx, type Park,
} from '../components/konfigurator/logik.ts';

const katalog = JSON.parse(readFileSync(new URL('../public/katalog/katalog.json', import.meta.url), 'utf8'));
const masse = JSON.parse(readFileSync(new URL('../public/konfigurator/masse.json', import.meta.url), 'utf8'));
const info: Ctx['info'] = {};
for (const e of katalog.elemente) info[e.slug] = { name: e.name, code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe, kg: e.gewicht?.kg };
const ctx: Ctx = { masse, info };
const feld = { l: 40, b: 30, angeboescht: false };

// Bausteine: bauen sich vollständig, ohne Überlappung, als eine zusammenhängende Gruppe
for (const b of BAUSTEINE) {
  const t = b.bauen(ctx);
  assert.ok(t, `${b.id} baut nicht`);
  for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) {
    assert.ok(!ueberlappt(umriss(t[i], ctx), umriss(t[j], ctx)), `${b.id}: ${t[i].slug} überlappt ${t[j].slug}`);
  }
  const park: Park = { flaeche: feld, teile: t };
  assert.equal(gruppen(park, ctx).length, 1, `${b.id} zerfällt in mehrere Gruppen`);
  assert.ok(!pruefen(park, ctx).some((h) => h.id.startsWith('hoehe')), `${b.id}: Höhen passen nicht`);
}
assert.equal(BAUSTEINE.find((b) => b.id === 'pyramide-75')!.bauen(ctx)!.length, 12);

// Geländer nur ab 125 cm (G02), Anlaufkeil vor freistehender Quarterramp 165 (A07), keiner in der Pipe
const ab = (id: string) => abgeleitet({ flaeche: feld, teile: BAUSTEINE.find((b) => b.id === id)!.bauen(ctx)! }, ctx);
assert.equal(ab('quarter-98').gelaender.length, 0);
assert.ok(ab('quarter-125').gelaender.length > 0);
assert.equal(ab('pipe-200').keile.length, 0);
assert.ok(abgeleitet({ flaeche: feld, teile: [{ id: 'q', slug: 'quarterramp-165', x: 0, z: 0, rot: 0 }] }, ctx).keile.length > 0);
assert.equal(abgeleitet({ flaeche: { ...feld, angeboescht: true }, teile: BAUSTEINE.find((b) => b.id === 'quarter-125')!.bauen(ctx)! }, ctx).gelaender.length, 0);

// Andocken mit Höhentausch: Bank 98 an Table 60 wird zur Bank 60
const tisch = { id: 'a', slug: 'table-60', x: 0, z: 0, rot: 0 };
const r = einrasten({ id: 'b', slug: 'bank-98', x: 1.6, z: 0.1, rot: 0 }, { flaeche: feld, teile: [tisch] }, ctx);
assert.equal(r.angedockt, 'a');
assert.equal(r.teil.slug, 'bank-60');
assert.equal(gruppen({ flaeche: feld, teile: [tisch, r.teil] }, ctx).length, 1);

// Vorschlag: Table allein bekommt eine Rampe angeboten, die danach andockt
const v = vorschlag('a', { flaeche: feld, teile: [tisch] }, ctx);
assert.ok(v && v.optionen.length);
const mitRampe = v!.optionen[0].anwenden({ flaeche: feld, teile: [tisch] });
assert.equal(mitRampe.teile.length, 2);
assert.equal(gruppen(mitRampe, ctx).length, 1);

// Wall bringt die Wall-Ramp automatisch mit (A11)
assert.equal(hinzufuegen({ flaeche: feld, teile: [] }, [{ id: 'w', slug: 'wall-410', x: 0, z: 0, rot: 0 }], ctx).teile.length, 2);

// Kein Platz frei: Fläche wächst, nichts überlappt
{
  let p: Park = { flaeche: { l: 20, b: 14, angeboescht: false }, teile: [] };
  for (const id of ['quarter-125', 'pipe-200', 'pyramide-98']) p = hinzufuegen(p, BAUSTEINE.find((b) => b.id === id)!.bauen(ctx)!, ctx);
  assert.ok(!pruefen(p, ctx).some((h) => h.id.startsWith('ueber')), 'Bausteine überlappen nach dem Hinzufügen');
  assert.ok(p.flaeche.l > 20 || p.flaeche.b > 14);
}

// Vorlagen: ohne rote Hinweise, passende Größe
for (const vo of VORLAGEN) {
  const p = vorlageBauen(vo, ctx);
  const h = pruefen(p, ctx);
  assert.ok(!h.some((x) => x.stufe === 'rot'), `${vo.id}: ${h.filter((x) => x.stufe === 'rot').map((x) => x.text).join(' | ')}`);
  console.log(`${vo.id}: ${p.teile.length} Elemente, ${p.flaeche.l} × ${p.flaeche.b} m, ${h.length} Hinweise${h.length ? ': ' + h.map((x) => x.text).join(' | ') : ''}`);
}
assert.equal(vorlageBauen(VORLAGEN[0], ctx).teile.length, 5);

// Beheben verschiebt eine zu nahe Gruppe
const eng: Park = { flaeche: feld, teile: [tisch, { id: 'c', slug: 'curb-300', x: 3, z: 0, rot: 0 }] };
assert.ok(pruefen(eng, ctx).some((h) => h.id.startsWith('abst')));
assert.ok(!pruefen(allesBeheben(eng, ctx), ctx).some((h) => h.id.startsWith('abst')));

// Stückliste mit Hinweisschild, Teilen-Link hin und zurück
const gross = vorlageBauen(VORLAGEN[2], ctx);
const sl = stueckliste(gross, ctx);
assert.ok(sl.some((z) => z.code === 'SHS'));
assert.ok(sl.some((z) => z.slug?.startsWith('gelaender')));
const zurueck = dekodieren(kodieren(gross), ctx)!;
assert.equal(zurueck.teile.length, gross.teile.length);
assert.equal(zurueck.flaeche.l, gross.flaeche.l);
console.log('Konfigurator-Logik: alle Prüfungen bestanden.');
