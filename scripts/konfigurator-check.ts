// Selbsttest der Konfigurator-Logik: node scripts/konfigurator-check.ts
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import {
  BAUSTEINE, LEER, VORLAGEN, vorlageBauen, gruppen, pruefen, abgeleitet, einrasten, stueckliste, kodieren, dekodieren,
  ueberlappt, umriss, hinzufuegen, vorschlag, allesBeheben, kurveAnhaengen, geradeAnhaengen, anbauMoeglich, bowl, bowls, tiefen, niere, bowlForm, eingraben, passstuecke, kegelAnhaengen, gelaenderSetzen, gelaenderModus, type Ctx, type Park,
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
    const kurve = t[i].slug.startsWith('corner') || t[j].slug.startsWith('corner');
    assert.ok(!ueberlappt(umriss(t[i], ctx), umriss(t[j], ctx), kurve ? 0.05 : 0.02), `${b.id}: ${t[i].slug} überlappt ${t[j].slug}`);
  }
  const park: Park = { flaeche: feld, teile: t };
  assert.equal(gruppen(park, ctx).length, 1, `${b.id} zerfällt in mehrere Gruppen`);
  assert.ok(!pruefen(park, ctx).some((h) => h.id.startsWith('hoehe')), `${b.id}: Höhen passen nicht`);
}
assert.equal(BAUSTEINE.find((b) => b.id === 'pyramide-75')!.bauen(ctx)!.length, 12);

// Startformen sind fertige, geprüfte Blöcke (Abschnitt 0): auf leerer Fläche gesetzt ohne einen einzigen Hinweis
for (const b of BAUSTEINE) {
  const p = hinzufuegen(LEER, b.bauen(ctx)!, ctx);
  const h = pruefen(p, ctx);
  assert.equal(h.length, 0, `${b.id}: ${h.map((x) => x.text).join(' | ')}`);
}

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

// Kurve anhängen: Coping Ramp 98 mit Table, Kurve rechts, danach Gerade; alles zusammenhängend, nichts überlappt
{
  for (const h of [98, 150]) {
    const start: Park = { flaeche: { l: 20, b: 20, angeboescht: false }, teile: [
      { id: 'r', slug: `coping-ramp-${h}`, x: 0, z: 0, rot: 0 },
    ] };
    const tisch = vorschlag('r', start, ctx)!.optionen[0].anwenden(start);
    assert.equal(tisch.teile.length, 2);
    assert.deepEqual(anbauMoeglich('r', tisch, ctx).kurve.sort(), ['links', 'rechts']);
    const k = kurveAnhaengen('r', 'rechts', tisch, ctx)!;
    assert.ok(k, 'Kurve lässt sich nicht anhängen');
    assert.equal(k.teile.length, 2 + 6 + 2);
    assert.equal(gruppen(k, ctx).length, 1, `Kurve ${h} hängt nicht zusammen`);
    assert.ok(!pruefen(k, ctx).some((x) => x.stufe === 'rot'), `Kurve ${h}: ${pruefen(k, ctx).map((x) => x.text).join(' | ')}`);
    // Coping der Geraden nach der Kurve liegt genau auf dem Bogenende (Spalt < 2 cm)
    const letzte = k.teile[k.teile.length - 2];
    const g = geradeAnhaengen(letzte.id, anbauMoeglich(letzte.id, k, ctx).gerade[0], k, ctx)!;
    assert.equal(g.teile.length, k.teile.length + 2);
    assert.equal(gruppen(g, ctx).length, 1);
  }
}

// Bowl: geschlossen, eine Gruppe, keine Überlappung, eingegraben ohne Geländer (B09), bauseitige Zeile
for (const [h, nl, nb] of [[98, 1, 0], [98, 3, 1], [150, 3, 1]] as const) {
  const t = bowl(h, nl, nb, ctx)!;
  const p: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: t };
  assert.equal(gruppen(p, ctx).length, 1, `Bowl ${h} ${nl}×${nb} nicht geschlossen`);
  assert.ok(!pruefen(p, ctx).some((x) => x.stufe === 'rot'), `Bowl ${h}: ${pruefen(p, ctx).filter((x) => x.stufe === 'rot').map((x) => x.text).join(' | ')}`);
  const ab = abgeleitet(p, ctx);
  assert.equal(ab.gelaender.length, 0, `Bowl ${h}: Geländer trotz Eingraben`);
  assert.equal(bowls(p, ctx).length, 1);
  assert.ok(t.every((x) => tiefen(p, ctx).get(x.id) === ctx.masse[`corner-${h}`].h), `Bowl ${h}: nicht um seine Höhe abgesenkt`);
  assert.ok(stueckliste(p, ctx).some((z) => z.code === 'bauseits'));
  const xs = t.flatMap((x) => umriss(x, ctx)).map((q) => q.x);
  const zs = t.flatMap((x) => umriss(x, ctx)).map((q) => q.z);
  console.log(`Bowl ${h} ${nl}×${nb}: ${t.length} Teile, außen ${(Math.max(...xs) - Math.min(...xs)).toFixed(2)} × ${(Math.max(...zs) - Math.min(...zs)).toFixed(2)} m`);
}

// B09: außen an den Bowl angedockter Table 98 bleibt auf Geländehöhe
{
  const t = bowl(98, 3, 1, ctx)!;
  const rand = t.filter((x) => x.slug === 'table-98').sort((a, c) => a.z - c.z)[0];
  const aussen: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: [...t, { id: 'aussen', slug: 'table-98', x: rand.x, z: rand.z - 1.25, rot: 0 }] };
  assert.equal(gruppen(aussen, ctx).length, 1, 'Table 98 dockt nicht an den Bowl an');
  assert.equal(tiefen(aussen, ctx).get('aussen') ?? 0, 0, 'Angedockter Table 98 wird mit abgesenkt');
  assert.equal(tiefen(aussen, ctx).size, t.length, 'Bowl-Teile nicht alle abgesenkt');
}

// Niere (B02): Nase aus 2 Kegeln, geschlossener Ring, eingegraben, nichts überlappt; Kegel 98 braucht ein Passstück in Ortbeton
for (const h of [98, 150] as const) {
  const t = niere(h, ctx)!;
  const p: Park = { flaeche: { l: 40, b: 30, angeboescht: false }, teile: t };
  const rot = pruefen(p, ctx).filter((x) => x.stufe === 'rot');
  assert.ok(!rot.length, `Niere ${h}: ${rot.map((x) => x.text).join(' | ')}`);
  assert.equal(gruppen(p, ctx).length, 1, `Niere ${h} zerfällt`);
  assert.equal(t.filter((x) => x.slug === `kegel-${h}`).length, 2);
  const b = bowls(p, ctx);
  assert.equal(b.length, 1, `Niere ${h} nicht als Bowl erkannt`);
  assert.ok(t.filter((x) => /^(coping-ramp|corner|kegel)-/.test(x.slug) && !x.slug.startsWith('corner-table')).every((x) => b[0].hoehe.has(x.id)), `Niere ${h}: Ringteil nicht abgesenkt`);
  assert.equal(b[0].passstueck, h === 98, `Niere ${h}: Passstück falsch erkannt`);
  assert.equal(abgeleitet(p, ctx).gelaender.length, 0);
  assert.equal(stueckliste(p, ctx).some((z) => z.name.includes('Passstück')), h === 98);
  const xs = t.flatMap((x) => umriss(x, ctx)).map((q) => q.x);
  const zs = t.flatMap((x) => umriss(x, ctx)).map((q) => q.z);
  console.log(`Niere ${h}: ${t.length} Teile, außen ${(Math.max(...xs) - Math.min(...xs)).toFixed(2)} × ${(Math.max(...zs) - Math.min(...zs)).toFixed(2)} m`);
}

// Außenkurve: Kegel an eine Coping Ramp mit Table, danach eine Gerade; nichts überlappt, eine Gruppe
for (const h of [98, 150] as const) {
  const start: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: [{ id: 'r', slug: `coping-ramp-${h}`, x: 0, z: 0, rot: 0 }] };
  const mitTisch = geradeAnhaengen('r', 'links', start, ctx)!;
  assert.ok(anbauMoeglich('r', start, ctx).aussen.length === 2, `Außenkurve ${h} nicht angeboten`);
  const k = kegelAnhaengen('r', 'rechts', start, ctx)!;
  assert.ok(k.teile.some((x) => x.slug === `kegel-${h}`));
  assert.equal(gruppen(k, ctx).length, 1, `Außenkurve ${h} hängt nicht an`);
  assert.ok(!pruefen(k, ctx).some((x) => x.id.startsWith('ueber')), `Außenkurve ${h} überlappt`);
  assert.equal(bowls(k, ctx).length, 0, 'offene Reihe gilt als Bowl');
  assert.ok(mitTisch);
}

// Ring-Erkennung: offene Kurve ist kein Bowl; B10: Bowl mit 98 und 150 bekommt die Ortbeton-Zeile
{
  const t = bowl(98, 3, 1, ctx)!;
  const offen: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: t.filter((x) => !(x.slug === 'coping-ramp-98' && x === t.find((y) => y.slug === 'coping-ramp-98'))).filter((x) => x.slug !== 'table-98' || x !== t.find((y) => y.slug === 'table-98')) };
  assert.equal(bowls(offen, ctx).length, 0, 'Bowl mit offenem Ring gilt als Bowl');
  assert.ok(!stueckliste(offen, ctx).some((z) => z.code === 'bauseits'));
  const gemischt: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: t.map((x) => (x.slug === 'table-98' ? { ...x, slug: 'table-150' } : x)) };
  assert.equal(bowls(gemischt, ctx).length, 1);
  assert.ok(stueckliste(gemischt, ctx).some((z) => z.name.includes('98/150')), 'B10-Zeile fehlt');
  assert.ok(!stueckliste({ flaeche: gemischt.flaeche, teile: t }, ctx).some((z) => z.name.includes('98/150')));
}

// Geländer-Schalter: Bowl 98 mit Geländer auf Geländehöhe, Bowl 150 an, aus, auto; bleibt im Teilen-Link erhalten
{
  const b98: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: bowl(98, 3, 1, ctx)! };
  const an = gelaenderSetzen(b98.teile[0].id, 'an', b98, ctx);
  assert.equal(gelaenderModus(an.teile[0].id, an, ctx), 'an');
  const ga = abgeleitet(an, ctx).gelaender;
  assert.ok(ga.filter((g) => g.slug === 'gelaender-125').length >= 24, 'Bowl 98 mit Geländer: Rundung fehlt');
  assert.ok(ga.some((g) => g.slug === 'gelaender-375'), 'Bowl 98 mit Geländer: gerade Seiten fehlen');
  assert.ok(ga.every((g) => Math.abs(g.y ?? 0) < 0.03), 'Bowl 98 mit Geländer: Geländer nicht auf Geländehöhe');
  const zurueck = dekodieren(kodieren(an), ctx)!;
  assert.equal(abgeleitet(zurueck, ctx).gelaender.length, ga.length);
  const b150: Park = { flaeche: { l: 30, b: 30, angeboescht: false }, teile: bowl(150, 3, 1, ctx)! };
  assert.equal(abgeleitet(gelaenderSetzen(b150.teile[0].id, 'an', b150, ctx), ctx).gelaender.filter((g) => g.slug === 'gelaender-sger-150').length, 12);
  assert.equal(abgeleitet(gelaenderSetzen(b150.teile[0].id, 'aus', b150, ctx), ctx).gelaender.length, 0);
  assert.equal(abgeleitet(gelaenderSetzen(gelaenderSetzen(b150.teile[0].id, 'an', b150, ctx).teile[0].id, 'auto', gelaenderSetzen(b150.teile[0].id, 'an', b150, ctx), ctx), ctx).gelaender.length, 0);
}

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
assert.equal(vorlageBauen(VORLAGEN[0], ctx).teile.length, 13);

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
// Bowl nach Maß mit Nasen je Seite (innen, außen, verlängert): geschlossener Ring, alles eingegraben, kein Hinweis, Passstücke je höchstens 30 cm
{
  const S = (n: number, aussen = false) => ({ n, aussen });
  for (const h of [98, 150] as const) for (const [s, lang] of [[[S(2), S(1, true), S(1), S(0)], 0], [[S(1), S(0), S(0), S(0)], 2], [[S(1, true), S(0), S(1), S(0)], 0], [[S(1), S(1), S(1), S(1)], 0]] as const) {
    const t = bowlForm(h, 3, 1, [...s], lang, ctx);
    assert.ok(t, `Bowl ${h} mit Nasen baut nicht`);
    const p = hinzufuegen(LEER, t, ctx);
    assert.equal(bowls(p, ctx).length, 1, `Bowl ${h} mit Nasen nicht als Bowl erkannt`);
    assert.equal(tiefen(p, ctx).size, p.teile.length, `Bowl ${h} mit Nasen: nicht alles abgesenkt`);
    assert.deepEqual(pruefen(p, ctx).map((x) => x.text), [], `Bowl ${h} mit Nasen hat Hinweise`);
  }
  // B11: so wenige Passstücke wie möglich, jedes höchstens 30 cm (2 Nasen Kegel 98 = 0,39 m → 2)
  assert.deepEqual([0, 0.196, 0.3, 0.392, 0.61].map(passstuecke), [0, 1, 1, 2, 3]);
  // Bowl neben vorhandene Elemente: Fläche wächst, bis Platz ist; vorher landete er nach 24 Schritten über den Elementen
  const jb = BAUSTEINE.find((x) => x.id === 'jumpbox-45')!.bauen(ctx)!;
  const mitBox = hinzufuegen(hinzufuegen({ flaeche: { l: 15, b: 11.25, angeboescht: false }, teile: [] }, jb, ctx), bowlForm(98, 3, 1, [S(1), S(1, true), S(0), S(0)], 0, ctx)!, ctx);
  assert.ok(!bowls(mitBox, ctx).some((b) => jb.some((x) => b.drin(mitBox.teile.find((y) => y.id === x.id)!))), 'Bowl über vorhandene Elemente gesetzt');
  // Löschen: ein Teil weg, der Rest bleibt eingegraben (vorher sprang der Bowl beim Löschen eines Corners hoch)
  const t = bowlForm(98, 3, 1, [S(1), S(0), S(0), S(0)], 0, ctx)!;
  const p: Park = { flaeche: { l: 40, b: 40, angeboescht: false }, teile: t };
  for (const x of t) {
    const neu = eingraben(p, { ...p, teile: p.teile.filter((y) => y.id !== x.id) }, ctx);
    assert.equal(tiefen(neu, ctx).size, neu.teile.length, `Bowl springt hoch, wenn ${x.slug} gelöscht wird`);
  }
  const ohneSeite = eingraben(p, { ...p, teile: p.teile.filter((y) => y.z < 3) }, ctx);
  assert.equal(tiefen(dekodieren(kodieren(ohneSeite), ctx)!, ctx).size, ohneSeite.teile.length, 'eingegraben geht im Link verloren');
  assert.ok(pruefen(ohneSeite, ctx).some((x) => x.id.startsWith('bowloffen')), 'offener Bowl-Ring ohne Hinweis');
  // Coping Ramp samt Table gelöscht: Ring offen, die Bodenfläche bleibt unten (vorher lag sie auf Geländehöhe)
  const flaeche = (q: Park) => { const b = bowls(q, ctx)[0]; let n = 0; for (let x = -15; x < 15; x += 0.1) for (let z = -15; z < 15; z += 0.1) if (b?.drin({ x, z })) n++; return n / 100; };
  const rampe = t.filter((x) => x.slug === 'coping-ramp-98')[3];
  const weg = new Set([rampe.id, t.find((x) => x.slug === 'table-98' && Math.hypot(x.x - rampe.x, x.z - rampe.z) < 1.6)!.id]);
  const loch = eingraben(p, { ...p, teile: p.teile.filter((y) => !weg.has(y.id)) }, ctx);
  assert.ok(bowls(loch, ctx)[0]?.offen, 'Lücke im Ring nicht als offen erkannt');
  assert.ok(flaeche(loch) > 0.95 * flaeche(p), `Bodenfläche bei offenem Ring verloren: ${flaeche(loch)} statt ${flaeche(p)} m²`);
}
console.log('Konfigurator-Logik: alle Prüfungen bestanden.');
