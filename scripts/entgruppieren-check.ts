// Selbsttest Entgruppieren: npx tsx scripts/entgruppieren-check.ts
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { entgruppieren, gruppen, type Ctx, type Park } from '../components/konfigurator/logik.ts';
const katalog = JSON.parse(readFileSync('public/katalog/katalog.json', 'utf8'));
const masse = JSON.parse(readFileSync('public/konfigurator/masse.json', 'utf8'));
const info: Ctx['info'] = {};
for (const e of katalog.elemente) info[e.slug] = { name: e.name, code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe };
const ctx: Ctx = { masse, info };
const park: Park = { flaeche: { l: 20, b: 15, angeboescht: false }, teile: [
  { id: 'a', slug: 'table-150', x: 0, z: 0, rot: 0 }, { id: 'b', slug: 'table-150', x: 1.25, z: 0, rot: 0 }, { id: 'c', slug: 'table-150', x: 2.5, z: 0, rot: 0 }] };
assert.equal(gruppen(park, ctx).length, 1);
const t = entgruppieren('c', park, ctx)!;
const neu = { ...park, teile: park.teile.map((x) => (x.id === t.id ? t : x)) };
assert.equal(gruppen(neu, ctx).length, 2, 'c ist danach allein');
assert.ok(t.x === 4.5 && t.z === 0, `c rückt 2 m nach außen: ${t.x}`);
assert.equal(entgruppieren('a', { ...park, teile: [park.teile[0]] }, ctx), null, 'ohne Gruppe nichts zu tun');
const eng: Park = { ...park, flaeche: { l: 3.75, b: 1.25, angeboescht: false }, teile: park.teile.map((x) => ({ ...x, x: x.x - 1.25 })) };
assert.equal(entgruppieren('c', eng, ctx), null, 'kein Platz im Feld');
const knapp: Park = { ...park, flaeche: { l: 5.5, b: 1.25, angeboescht: false }, teile: park.teile.map((x) => ({ ...x, x: x.x - 1.875 })) };
const k = entgruppieren('c', knapp, ctx)!;
assert.ok(k && Math.abs(k.x - (knapp.teile[2].x + 0.5)) < 0.01, `ohne Platz für 2 m: 50 cm, x = ${k?.x}`);
console.log('Entgruppieren ok, c bei x =', t.x);
