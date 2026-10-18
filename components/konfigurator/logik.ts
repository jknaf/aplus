// Logik des Skatepark-Konfigurators, ohne React und ohne three.js.
// Regeln: 08_CAD_Blender/12_Konfigurator/…_Konfigurator_Regelwerk_V01.md (IDs wie A01, G02, F01 stehen an den Stellen).
// Koordinaten in Metern, Fläche liegt mittig um (0, 0), x = Länge, z = Breite, Drehung in Grad um die Hochachse.

import { tt, type Lang } from '../../i18n';

export interface V { x: number; z: number }
export interface Masse { l: number; b: number; h: number; hoch: V | null; niedrig: number }
export interface Info { name: string; code: string; gruppe: string; kg?: number; masse?: string }
export interface Ctx { masse: Record<string, Masse>; info: Record<string, Info> }
// gel: Geländer erzwingen (true) oder abschalten (false); ohne Angabe gilt die Automatik (G01/G02)
export interface Teil { id: string; slug: string; x: number; z: number; rot: number; gel?: boolean }
export interface Flaeche { l: number; b: number; angeboescht: boolean }
export interface Park { flaeche: Flaeche; teile: Teil[] }
export type Art = 'plattform' | 'rampe' | 'street' | 'wand' | 'auto';

export const RASTER = 1.25;
const FEIN = RASTER / 2;
const SICHER = 2; // F01
const ANLAUF = 5; // F02, F03
const BERUEHRT = 0.03;

// ---------- Grundgeometrie ----------

const rad = (g: number) => (g * Math.PI) / 180;
export const drehe = (v: V, g: number): V => {
  const c = Math.cos(rad(g));
  const s = Math.sin(rad(g));
  return { x: v.x * c + v.z * s, z: -v.x * s + v.z * c };
};
const plus = (a: V, b: V): V => ({ x: a.x + b.x, z: a.z + b.z });
const minus = (a: V, b: V): V => ({ x: a.x - b.x, z: a.z - b.z });
const mal = (a: V, k: number): V => ({ x: a.x * k, z: a.z * k });
const skalar = (a: V, b: V) => a.x * b.x + a.z * b.z;
const laenge = (a: V) => Math.hypot(a.x, a.z);
const winkel = (v: V) => (Math.atan2(-v.z, v.x) * 180) / Math.PI;
const norm360 = (g: number) => Math.round((((g % 360) + 360) % 360) * 100) / 100;
const r3 = (x: number) => Math.round(x * 1000) / 1000;

let zaehler = 0;
export const neueId = () => `t${Date.now().toString(36)}${(zaehler++).toString(36)}${Math.random().toString(36).slice(2, 5)}`;

export const art = (slug: string, ctx: Ctx): Art => {
  const g = ctx.info[slug]?.gruppe ?? '';
  if (g === 'Geländer' || slug.startsWith('anlaufkeil')) return 'auto';
  if (g === 'Tables' || slug.startsWith('corner-table')) return 'plattform';
  if (slug.startsWith('wall-') && !slug.startsWith('wall-ramp')) return 'wand';
  if (slug.startsWith('wave')) return 'street';
  if (['Banks', 'Pyramid Hips', 'Corner', 'Coping Ramps', 'Quarterramps und Walls', 'Kegel und Cross-Ramps', 'Stairs'].includes(g)) return 'rampe';
  if (slug.startsWith('jump-ramp')) return 'rampe';
  return 'street';
};
export const istSlide = (slug: string) => slug.startsWith('railslide') || slug.startsWith('wallslide');
export const familie = (slug: string) => slug.replace(/-\d.*$/, '');

const ecken = (t: Teil, m: Masse): V[] =>
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => plus(t, drehe({ x: (a * m.l) / 2, z: (b * m.b) / 2 }, t.rot)));
// Kurvenstücke (Corner, Table Corner): Kreisringsektor um den Mittelpunkt c, Radien r (vorn) bis R (Coping bzw. Außenkante),
// Kanten unter den Winkeln von/bis (Konvention wie winkel()). Aus den glTF-Modellen gemessen, deckt sich mit dem A+-Katalog (K S. 4, 6).
export interface Kurve { c: V; r: number; R: number; von: number; bis: number }
export const KURVE: Record<string, Kurve> = {
  'corner-98': { c: { x: -1.6868, z: -0.6483 }, r: 0.901, R: 2.593, von: -30, bis: 0 },
  'corner-150': { c: { x: -2.0648, z: 0.7795 }, r: 1.168, R: 3.123, von: 0, bis: 30 },
  'corner-table-98': { c: { x: -3.0442, z: -0.9608 }, r: 2.593, R: 3.848, von: -30, bis: 0 },
  'corner-table-150': { c: { x: -3.5344, z: 1.092 }, r: 3.118, R: 4.373, von: 0, bis: 30 },
};
export const istKurve = (slug: string) => slug in KURVE;
const polar = (g: number, rad_: number): V => ({ x: Math.cos(rad(g)) * rad_, z: -Math.sin(rad(g)) * rad_ });
// Umriss als konvexes Vieleck: innen die Tangente an den Bogen (liegt ganz im Teil), außen der Bogen in Stützpunkten
const kurvenUmriss = (t: Teil, k: Kurve): V[] => {
  const rt = k.r / Math.cos(rad((k.bis - k.von) / 2));
  const lokal = [plus(k.c, polar(k.von, rt)), plus(k.c, polar(k.bis, rt))];
  for (let i = 6; i >= 0; i--) lokal.push(plus(k.c, polar(k.von + ((k.bis - k.von) * i) / 6, k.R)));
  return lokal.map((p) => plus(t, drehe(p, t.rot)));
};
const umrissCache = new WeakMap<Teil, V[]>();
export const umriss = (t: Teil, ctx: Ctx): V[] => {
  let u = umrissCache.get(t);
  if (!u) { u = istKurve(t.slug) ? kurvenUmriss(t, KURVE[t.slug]) : ecken(t, ctx.masse[t.slug]); umrissCache.set(t, u); }
  return u;
};
interface Box { x0: number; x1: number; z0: number; z1: number }
const boxCache = new WeakMap<Teil, Box>();
const teilBox = (t: Teil, ctx: Ctx): Box => {
  let b = boxCache.get(t);
  if (!b) { b = box(umriss(t, ctx)); boxCache.set(t, b); }
  return b;
};
// Schneller Vorfilter: liegen zwei Rechtecke näher als d beieinander?
const nah = (a: Box, b: Box, d = 0) => a.x0 - d < b.x1 && b.x0 - d < a.x1 && a.z0 - d < b.z1 && b.z0 - d < a.z1;
// Bögen sind in Stützpunkten angenähert; deshalb dort etwas mehr Toleranz beim Überlappen
const tol = (a: Teil, b: Teil) => (istKurve(a.slug) || istKurve(b.slug) ? 0.05 : 0.02);

const projektion = (p: V[], achse: V) => {
  let lo = Infinity;
  let hi = -Infinity;
  for (const q of p) {
    const d = skalar(q, achse);
    lo = Math.min(lo, d);
    hi = Math.max(hi, d);
  }
  return [lo, hi];
};
const achsen = (p: V[]) => p.map((q, i) => {
  const e = minus(p[(i + 1) % p.length], q);
  const n = laenge(e) || 1;
  return { x: -e.z / n, z: e.x / n };
});
// Überlappen sich zwei konvexe Vielecke um mehr als eps (Trennachsensatz)?
export const ueberlappt = (a: V[], b: V[], eps = 0.02) => {
  for (const ax of [...achsen(a), ...achsen(b)]) {
    const [a0, a1] = projektion(a, ax);
    const [b0, b1] = projektion(b, ax);
    if (a1 - eps <= b0 || b1 - eps <= a0) return false;
  }
  return true;
};
const abstandPunktStrecke = (p: V, a: V, b: V) => {
  const ab = minus(b, a);
  const t = Math.max(0, Math.min(1, skalar(minus(p, a), ab) / (skalar(ab, ab) || 1)));
  return laenge(minus(p, plus(a, mal(ab, t))));
};
export const abstand = (a: V[], b: V[]) => {
  if (ueberlappt(a, b, 0)) return 0;
  let d = Infinity;
  for (const [p, q] of [[a, b], [b, a]]) {
    for (const x of p) for (let i = 0; i < q.length; i++) d = Math.min(d, abstandPunktStrecke(x, q[i], q[(i + 1) % q.length]));
  }
  return d;
};
const innen = (p: V, poly: V[]) => {
  let vz = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const k = (b.x - a.x) * (p.z - a.z) - (b.z - a.z) * (p.x - a.x);
    if (Math.abs(k) < 1e-9) continue;
    const s = Math.sign(k);
    if (vz === 0) vz = s;
    else if (s !== vz) return false;
  }
  return true;
};
const imFeld = (p: V[], f: Flaeche, tol = 0.01) => p.every((q) => Math.abs(q.x) <= f.l / 2 + tol && Math.abs(q.z) <= f.b / 2 + tol);
const randAbstand = (p: V[], f: Flaeche) => Math.min(...p.map((q) => Math.min(f.l / 2 - Math.abs(q.x), f.b / 2 - Math.abs(q.z))));
const box = (p: V[]): Box => ({
  x0: Math.min(...p.map((q) => q.x)), x1: Math.max(...p.map((q) => q.x)),
  z0: Math.min(...p.map((q) => q.z)), z1: Math.max(...p.map((q) => q.z)),
});

// Rechteck vor einer Seite, z. B. Anlauf- oder Landezone
const zoneVor = (s: Seite, tiefe: number): V[] => {
  const h = mal(s.tangente, s.laenge / 2);
  const a = minus(s.mitte, h);
  const b = plus(s.mitte, h);
  const o = mal(s.normale, tiefe);
  return [a, b, plus(b, o), plus(a, o)];
};

// ---------- Seiten eines Teils ----------

export interface Seite { mitte: V; normale: V; tangente: V; laenge: number; halb: number }
const LOKAL: V[] = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
export const seiten = (t: Teil, m: Masse): Seite[] => LOKAL.map((n) => {
  const halb = n.x ? m.l / 2 : m.b / 2;
  const normale = drehe(n, t.rot);
  return { mitte: plus(t, mal(normale, halb)), normale, tangente: { x: -normale.z, z: normale.x }, laenge: n.x ? m.b : m.l, halb };
});
const hochAchsig = (m: Masse) => !!m.hoch && (Math.abs(m.hoch.x) < 0.01 || Math.abs(m.hoch.z) < 0.01);
const hochWelt = (t: Teil, m: Masse) => (m.hoch ? drehe(m.hoch, t.rot) : null);
const seiteIn = (t: Teil, m: Masse, richtung: V) => seiten(t, m).reduce((best, s) => (skalar(s.normale, richtung) > skalar(best.normale, richtung) ? s : best));

// Welches Teil liegt direkt an dieser Seite an? (Stichproben knapp außerhalb der Seite)
const anliegend = (s: Seite, ohne: string, park: Park, ctx: Ctx, nurArten?: Art[]) => {
  const proben = [-0.4, -0.2, 0, 0.2, 0.4].map((k) => plus(plus(s.mitte, mal(s.tangente, k * s.laenge)), mal(s.normale, 0.06)));
  const pb = box(proben);
  let best: Teil | null = null;
  let treffer = 0;
  for (const o of park.teile) {
    if (o.id === ohne || !nah(pb, teilBox(o, ctx), 0.01)) continue;
    if (nurArten && !nurArten.includes(art(o.slug, ctx))) continue;
    const p = umriss(o, ctx);
    const n = proben.filter((q) => innen(q, p)).length;
    if (n > treffer) { treffer = n; best = o; }
  }
  return treffer >= 3 ? best : null;
};
// ---------- Andocken (Regelwerk Abschnitt 3) ----------

export interface Pose { slug: string; x: number; z: number; rot: number; ziel: string }

// Höhenvariante derselben Familie, z. B. Bank 98 → Bank 60 an einem Table 60
export const variante = (slug: string, h: number, ctx: Ctx): string | null => {
  const fam = familie(slug);
  const lang = /\d+l$/.test(slug);
  const kandidaten = Object.keys(ctx.masse).filter((s) => familie(s) === fam && Math.abs(ctx.masse[s].h - h) < 0.06);
  return kandidaten.find((s) => /\d+l$/.test(s) === lang) ?? kandidaten[0] ?? null;
};

// Pose für ein Element, dessen hohe Seite an die Seite s eines Ziels gesetzt wird
export const poseAnSeite = (ziel: Teil, s: Seite, slug: string, versatz: number, ctx: Ctx): Pose | null => {
  const m = ctx.masse[slug];
  if (!m?.hoch || !hochAchsig(m)) return null;
  const rot = norm360(winkel(mal(s.normale, -1)) - winkel(m.hoch));
  const halbE = Math.abs(m.hoch.x) > 0.5 ? m.l / 2 : m.b / 2;
  const p = plus(plus(s.mitte, mal(s.normale, halbE)), mal(s.tangente, versatz));
  return { slug, x: r3(p.x), z: r3(p.z), rot, ziel: ziel.id };
};
// Pose für Eckstücke (Pyramid Hip, Kegel): hohe Ecke an die Ecke eines Tables
export const poseAnEcke = (ziel: Teil, eckIndex: number, slug: string, ctx: Ctx): Pose | null => {
  const m = ctx.masse[slug];
  const mz = ctx.masse[ziel.slug];
  if (!m?.hoch || hochAchsig(m)) return null;
  const ecke = ecken(ziel, mz)[eckIndex];
  const nachInnen = minus(ziel, ecke);
  const rot = norm360(winkel(nachInnen) - winkel(m.hoch));
  const eckeLokal = { x: (Math.sign(m.hoch.x) * m.l) / 2, z: (Math.sign(m.hoch.z) * m.b) / 2 };
  const p = minus(ecke, drehe(eckeLokal, rot));
  return { slug, x: r3(p.x), z: r3(p.z), rot, ziel: ziel.id };
};

export const andockPosen = (slug: string, park: Park, ctx: Ctx, ohne?: string): Pose[] => {
  const m = ctx.masse[slug];
  if (!m?.hoch || art(slug, ctx) !== 'rampe' || istKurve(slug)) return [];
  const out: Pose[] = [];
  for (const z of park.teile) {
    if (z.id === ohne) continue;
    const mz = ctx.masse[z.slug];
    const az = art(z.slug, ctx);
    const passend = Math.abs(mz.h - m.h) < 0.06 ? slug : variante(slug, mz.h, ctx) ?? slug;
    if (!hochAchsig(m)) {
      if (az === 'plattform' && !istKurve(z.slug)) for (let i = 0; i < 4; i++) { const p = poseAnEcke(z, i, passend, ctx); if (p) out.push(p); }
      continue;
    }
    let ziele: Seite[] = [];
    if (az === 'plattform' && !istKurve(z.slug)) ziele = seiten(z, mz);
    else if ((az === 'wand' || familie(z.slug) === 'coping-ramp') && mz.hoch) ziele = [seiteIn(z, mz, hochWelt(z, mz)!)];
    if (az === 'wand' && familie(slug) !== 'wall-ramp') ziele = [];
    if (familie(z.slug) === 'coping-ramp' && familie(slug) !== 'coping-ramp') ziele = [];
    const mp = ctx.masse[passend];
    const breite = mp.hoch && Math.abs(mp.hoch.x) > 0.5 ? mp.b : mp.l;
    for (const s of ziele) {
      const frei = (s.laenge - breite) / 2;
      const versaetze = new Set([0]);
      if (Math.abs(frei) > 0.01) { versaetze.add(r3(frei)); versaetze.add(r3(-frei)); }
      for (let k = FEIN; k < Math.abs(frei); k += FEIN) { versaetze.add(r3(k)); versaetze.add(r3(-k)); }
      for (const v of versaetze) { const p = poseAnSeite(z, s, passend, v, ctx); if (p) out.push(p); }
    }
  }
  return out;
};

export const kollidiert = (t: Teil, park: Park, ctx: Ctx) => {
  const p = umriss(t, ctx);
  const b = teilBox(t, ctx);
  return park.teile.some((o) => o.id !== t.id && nah(b, teilBox(o, ctx)) && ueberlappt(p, umriss(o, ctx), tol(t, o)));
};const ohneTeil = (park: Park, id: string): Park => ({ ...park, teile: park.teile.filter((t) => t.id !== id) });

// Element ins Feld schieben
export const klemmen = (t: Teil, f: Flaeche, ctx: Ctx): Teil => {
  const b = box(umriss(t, ctx));
  let dx = 0;
  let dz = 0;
  if (b.x1 - b.x0 <= f.l) { if (b.x0 < -f.l / 2) dx = -f.l / 2 - b.x0; if (b.x1 > f.l / 2) dx = f.l / 2 - b.x1; }
  if (b.z1 - b.z0 <= f.b) { if (b.z0 < -f.b / 2) dz = -f.b / 2 - b.z0; if (b.z1 > f.b / 2) dz = f.b / 2 - b.z1; }
  return { ...t, x: r3(t.x + dx), z: r3(t.z + dz) };
};

export interface Einrasten { teil: Teil; angedockt: string | null; getauscht: boolean }

// Wohin springt ein gezogenes Element? Andocken (A01), sonst bündig anlegen, sonst Raster (R01)
export const einrasten = (roh: Teil, park: Park, ctx: Ctx): Einrasten => {
  const rest = ohneTeil(park, roh.id);
  const posen = andockPosen(roh.slug, rest, ctx)
    .map((p) => ({ p, d: Math.hypot(p.x - roh.x, p.z - roh.z) }))
    .filter(({ d }) => d < 1.2)
    .sort((a, b) => a.d - b.d);
  for (const { p } of posen) {
    const t = { ...roh, slug: p.slug, x: p.x, z: p.z, rot: p.rot };
    if (!kollidiert(t, rest, ctx) && imFeld(umriss(t, ctx), park.flaeche)) return { teil: t, angedockt: p.ziel, getauscht: p.slug !== roh.slug };
  }
  let t = { ...roh };
  const gerade = Math.abs(((t.rot % 90) + 90) % 90) < 0.5 || Math.abs(((t.rot % 90) + 90) % 90 - 90) < 0.5;
  if (gerade) {
    const b = box(umriss(t, ctx));
    let bx: number | null = null;
    let bz: number | null = null;
    for (const o of rest.teile) {
      const q = box(umriss(o, ctx));
      const zUeber = b.z0 < q.z1 + 0.3 && b.z1 > q.z0 - 0.3;
      const xUeber = b.x0 < q.x1 + 0.3 && b.x1 > q.x0 - 0.3;
      if (zUeber) for (const d of [q.x1 - b.x0, q.x0 - b.x1]) if (Math.abs(d) < 0.2 && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d;
      if (xUeber) for (const d of [q.z1 - b.z0, q.z0 - b.z1]) if (Math.abs(d) < 0.2 && (bz === null || Math.abs(d) < Math.abs(bz))) bz = d;
      if (bx !== null && zUeber) for (const d of [q.z0 - b.z0, q.z1 - b.z1]) if (Math.abs(d) < 0.2 && (bz === null || Math.abs(d) < Math.abs(bz))) bz = d;
      if (bz !== null && xUeber) for (const d of [q.x0 - b.x0, q.x1 - b.x1]) if (Math.abs(d) < 0.2 && (bx === null || Math.abs(d) < Math.abs(bx))) bx = d;
    }
    const raster = (v: number, rand: number) => Math.round((v - rand) / FEIN) * FEIN + rand - v;
    t.x = r3(t.x + (bx ?? raster(b.x0, -park.flaeche.l / 2)));
    t.z = r3(t.z + (bz ?? raster(b.z0, -park.flaeche.b / 2)));
  }
  t = klemmen(t, park.flaeche, ctx);
  return { teil: t, angedockt: null, getauscht: false };
};

// Ganze Gruppe ziehen: Versatz im Feinraster, im Feld halten
export const gruppeVerschieben = (gruppe: Teil[], d: V, park: Park, ctx: Ctx): Teil[] => {
  let dd = { x: Math.round(d.x / FEIN) * FEIN, z: Math.round(d.z / FEIN) * FEIN };
  const b = box(gruppe.flatMap((t) => umriss({ ...t, x: t.x + dd.x, z: t.z + dd.z }, ctx)));
  const f = park.flaeche;
  if (b.x1 - b.x0 <= f.l) dd = { ...dd, x: dd.x + Math.max(0, -f.l / 2 - b.x0) - Math.max(0, b.x1 - f.l / 2) };
  if (b.z1 - b.z0 <= f.b) dd = { ...dd, z: dd.z + Math.max(0, -f.b / 2 - b.z0) - Math.max(0, b.z1 - f.b / 2) };
  return verschiebe(gruppe, dd);
};

// Freien Platz für ein neues Element oder eine Gruppe suchen (Spirale ab Mitte)
export const freierPlatz = (gruppe: Teil[], park: Park, ctx: Ctx, abstandMin = SICHER): V | null => {
  const b = box(gruppe.flatMap((t) => umriss(t, ctx)));
  const mitte = { x: (b.x0 + b.x1) / 2, z: (b.z0 + b.z1) / 2 };
  const andere = park.teile.map((o) => teilBox(o, ctx));
  // Anlaufzonen (F03) freihalten: die vorhandenen Zonen und die Zonen der neuen Gruppe
  const fremdeZonen = anlaufZonen(park.teile, park, ctx).map(box);
  const eigeneZonen = anlaufZonen(gruppe, { flaeche: park.flaeche, teile: gruppe }, ctx).map(box);
  const f = park.flaeche;
  const rand = abstandMin; // gleicher Randabstand wie in der Prüfung (F01), sonst entsteht sofort ein Hinweis
  const ringe = Math.ceil(Math.max(f.l, f.b) / FEIN / 2) + 1;
  // ponytail: das Rechteck der Gruppe ist etwas größer als die Teile selbst; bei Bedarf genauer prüfen
  for (let r = 0; r <= ringe; r++) {
    for (let i = -r; i <= r; i++) {
      for (const [ix, iz] of [[i, -r], [i, r], [-r, i], [r, i]]) {
        const d = { x: ix * FEIN - mitte.x, z: iz * FEIN - mitte.z };
        const g = { x0: b.x0 + d.x, x1: b.x1 + d.x, z0: b.z0 + d.z, z1: b.z1 + d.z };
        if (g.x0 < -f.l / 2 + rand || g.x1 > f.l / 2 - rand || g.z0 < -f.b / 2 + rand || g.z1 > f.b / 2 - rand) continue;
        if (andere.some((o) => nah(g, o, abstandMin)) || fremdeZonen.some((z) => nah(g, z))) continue;
        const zonen = eigeneZonen.map((z) => ({ x0: z.x0 + d.x, x1: z.x1 + d.x, z0: z.z0 + d.z, z1: z.z1 + d.z }));
        if (zonen.some((z) => z.x0 < -f.l / 2 - 0.3 || z.x1 > f.l / 2 + 0.3 || z.z0 < -f.b / 2 - 0.3 || z.z1 > f.b / 2 + 0.3 || andere.some((o) => nah(z, o)))) continue;
        return d;
      }
    }
  }
  return null;
};const verschiebe = (teile: Teil[], d: V) => teile.map((t) => ({ ...t, x: r3(t.x + d.x), z: r3(t.z + d.z) }));

// ---------- Gruppen (zusammenhängende Elemente) ----------

const gruppenCache = new WeakMap<Teil[], Teil[][]>();
export const gruppen = (park: Park, ctx: Ctx): Teil[][] => {
  const gemerkt = gruppenCache.get(park.teile);
  if (gemerkt) return gemerkt;
  const eltern = new Map(park.teile.map((t) => [t.id, t.id]));
  const finde = (id: string): string => { let x = id; while (eltern.get(x) !== x) x = eltern.get(x)!; return x; };
  for (let i = 0; i < park.teile.length; i++) {
    const a = park.teile[i];
    const ba = teilBox(a, ctx);
    for (let j = i + 1; j < park.teile.length; j++) {
      const b = park.teile[j];
      if (!nah(ba, teilBox(b, ctx), BERUEHRT)) continue;
      if (finde(a.id) === finde(b.id)) continue;
      if (abstand(umriss(a, ctx), umriss(b, ctx)) < BERUEHRT) eltern.set(finde(a.id), finde(b.id));
    }
  }
  const m = new Map<string, Teil[]>();
  for (const t of park.teile) { const w = finde(t.id); const l = m.get(w); if (l) l.push(t); else m.set(w, [t]); }
  const out = [...m.values()];
  gruppenCache.set(park.teile, out);
  return out;
};
// ---------- Automatik: Geländer, Anlaufkeile, Pflichtteile (Abschnitte 3, 4, 7) ----------

export interface Zusatz { slug: string; x: number; z: number; rot: number; y?: number }
export interface Abgeleitet { gelaender: Zusatz[]; keile: Zusatz[] }

const GELAENDER: [number, string][] = [[5, 'gelaender-500'], [3.75, 'gelaender-375'], [2.5, 'gelaender-250'], [1.25, 'gelaender-125']];

const braucht = (t: Teil, m: Masse, park: Park) => (t.gel !== undefined ? t.gel : !park.flaeche.angeboescht && m.h >= 1.0);
export const abgeleitet = (park: Park, ctx: Ctx): Abgeleitet => {
  const strecken: { a: V; b: V; n: V; y: number }[] = [];
  const keile: Zusatz[] = [];
  for (const t of park.teile) {
    const m = ctx.masse[t.slug];
    const a = art(t.slug, ctx);
    // G01/G02: Plattformen über 1 m Fallhöhe, bei Rampen nur die hohe Rückseite; per Schalter erzwingen oder abschalten
    if (braucht(t, m, park) && !istKurve(t.slug) && (a === 'plattform' || (a === 'rampe' && m.hoch && hochAchsig(m)))) {
      const kandidaten = a === 'plattform' ? seiten(t, m) : [seiteIn(t, m, hochWelt(t, m)!)];
      for (const s of kandidaten) {
        if (anliegend(s, t.id, park, ctx)) continue; // G06: wo etwas andockt, kein Geländer
        const h = mal(s.tangente, s.laenge / 2);
        strecken.push({ a: minus(s.mitte, h), b: plus(s.mitte, h), n: s.normale, y: m.h });
      }
    }
    // A07: Anlaufkeil vor freistehender Quarterramp 165/200
    if (/^quarterramp-(165|200)/.test(t.slug) && m.hoch) {
      const s = seiteIn(t, m, mal(hochWelt(t, m)!, -1));
      if (!anliegend(s, t.id, park, ctx)) {
        const wahl = ['anlaufkeil-187', 'anlaufkeil-250']
          .filter((k) => ctx.masse[k])
          .map((k) => ({ k, n: Math.max(1, Math.round(s.laenge / ctx.masse[k].b)), rest: Math.abs(s.laenge / ctx.masse[k].b - Math.round(s.laenge / ctx.masse[k].b)) }))
          .sort((x, y) => x.rest - y.rest)[0];
        if (wahl) {
          const mk = ctx.masse[wahl.k];
          for (let i = 0; i < wahl.n; i++) {
            const v = (i - (wahl.n - 1) / 2) * mk.b;
            const p = poseAnSeite(t, s, wahl.k, v, ctx);
            if (p) keile.push({ slug: p.slug, x: p.x, z: p.z, rot: p.rot });
          }
        }
      }
    }
  }
  // G01 an Kurven: Rundgeländer SGER-150 außen am Table Corner 150. Lage im Modell: Sehne unter -14,2°, Bogen nach -z
  const rund: Zusatz[] = [];
  for (const t of park.teile) {
    if (!t.slug.startsWith('corner-table') || !braucht(t, ctx.masse[t.slug], park)) continue;
    const k = KURVE[t.slug];
    const halb = (k.von + k.bis) / 2;
    const aussen = drehe(polar(halb, 1), t.rot);
    const mitteAussen = plus(t, drehe(plus(k.c, polar(halb, k.R)), t.rot));
    if (park.teile.some((o) => o.id !== t.id && innen(plus(mitteAussen, mal(aussen, 0.1)), umriss(o, ctx)))) continue;
    if (t.slug === 'corner-table-150' && ctx.masse['gelaender-sger-150']) {
      const rot = norm360(winkel(aussen) - 75.8);
      const p = minus(plus(mitteAussen, mal(aussen, -0.08)), drehe({ x: 0, z: -0.13 }, rot));
      rund.push({ slug: 'gelaender-sger-150', x: r3(p.x), z: r3(p.z), rot, y: ctx.masse[t.slug].h });
    } else if (ctx.masse['gelaender-125']) {
      // ponytail: für den Table Corner 98 gibt es im Katalog kein Rundgeländer; zwei gerade 125er entlang des Bogens, A+ prüft im Angebot
      for (const w of [k.von + (k.bis - k.von) / 4, k.von + (3 * (k.bis - k.von)) / 4]) {
        const r = drehe(polar(w, 1), t.rot);
        const p = plus(plus(t, drehe(plus(k.c, polar(w, k.R)), t.rot)), mal(r, -0.06));
        const mg = ctx.masse['gelaender-125'];
        rund.push({ slug: 'gelaender-125', x: r3(p.x), z: r3(p.z), rot: norm360(winkel({ x: -r.z, z: r.x }) - (mg.l >= mg.b ? 0 : 90)), y: ctx.masse[t.slug].h });
      }
    }
  }
  // Gleich ausgerichtete, aneinander stoßende Strecken zu Läufen verbinden
  const laeufe: { a: V; b: V; n: V; y: number }[] = [];
  const rest = [...strecken];
  while (rest.length) {
    const lauf = rest.shift()!;
    let wuchs = true;
    while (wuchs) {
      wuchs = false;
      for (let i = 0; i < rest.length; i++) {
        const s = rest[i];
        if (skalar(s.n, lauf.n) < 0.99 || Math.abs(s.y - lauf.y) > 0.05) continue;
        if (laenge(minus(s.a, lauf.b)) < 0.05) { lauf.b = s.b; rest.splice(i, 1); wuchs = true; break; }
        if (laenge(minus(s.b, lauf.a)) < 0.05) { lauf.a = s.a; rest.splice(i, 1); wuchs = true; break; }
      }
    }
    laeufe.push(lauf);
  }
  const gelaender: Zusatz[] = [];
  for (const l of laeufe) {
    const richtung = minus(l.b, l.a);
    const gesamt = laenge(richtung);
    const t = mal(richtung, 1 / (gesamt || 1));
    let pos = 0;
    while (gesamt - pos > 0.3) {
      const frei = gesamt - pos;
      const [len, slug] = GELAENDER.find(([g]) => g <= frei + 0.05) ?? GELAENDER[GELAENDER.length - 1];
      const mg = ctx.masse[slug];
      if (mg) {
        const mitte = plus(plus(l.a, mal(t, pos + Math.min(len, frei) / 2)), mal(l.n, -0.06)); // Reststück nicht über die Kante hinaus
        const rot = norm360(winkel(t) - (mg.l >= mg.b ? 0 : 90));
        gelaender.push({ slug, x: r3(mitte.x), z: r3(mitte.z), rot, y: l.y });
      }
      pos += len;
    }
  }
  return { gelaender: [...gelaender, ...rund, ...verbinder([...gelaender, ...rund], ctx)], keile };
};

// Die Geländerfelder sind kürzer als ihr Rastermaß (375er: 3,53 m), die Lücke schließt der Verbinder (22 cm).
// Er sitzt an jedem Stoß zweier Felder, auch zwischen geraden und runden Geländern; knickt der Lauf, der 90°-Verbinder.
// ponytail: Stoß = Feldenden näher als 40 cm, Verbinder mittig dazwischen; Endteile an freien Enden fehlen noch, A+ ergänzt im Angebot
const SEHNE: Record<string, number> = { 'gelaender-sger-150': -14.2 }; // Rundgeländer: Lage der Sehne im Modell
const feldEnden = (z: Zusatz, ctx: Ctx): { p: V; r: V }[] => {
  const m = ctx.masse[z.slug];
  const w = z.rot + (SEHNE[z.slug] ?? (m.l >= m.b ? 0 : 90));
  const r = polar(w, 1);
  const halb = mal(r, Math.max(m.l, m.b) / 2);
  return [{ p: plus(z, halb), r }, { p: minus(z, halb), r }];
};
const verbinder = (felder: Zusatz[], ctx: Ctx): Zusatz[] => {
  const enden = felder.flatMap((z, i) => feldEnden(z, ctx).map((e) => ({ ...e, i, y: z.y ?? 0 })));
  const paare: { a: number; b: number; d: number }[] = [];
  for (let a = 0; a < enden.length; a++) for (let b = a + 1; b < enden.length; b++) {
    const d = laenge(minus(enden[a].p, enden[b].p));
    if (enden[a].i !== enden[b].i && d < 0.4) paare.push({ a, b, d });
  }
  const belegt = new Set<number>();
  const out: Zusatz[] = [];
  for (const { a, b } of paare.sort((x, y) => x.d - y.d)) {
    if (belegt.has(a) || belegt.has(b)) continue;
    belegt.add(a); belegt.add(b);
    const ea = enden[a], eb = enden[b];
    const knick = Math.abs(skalar(ea.r, eb.r)) < 0.7;
    const slug = knick ? 'gelaender-verbindung-90' : 'gelaender-verbindung-gerade';
    if (!ctx.masse[slug]) continue;
    const mitte = mal(plus(ea.p, eb.p), 0.5);
    const rot = knick ? norm360(winkel(ea.r)) : norm360(winkel(skalar(ea.r, eb.r) > 0 ? plus(ea.r, eb.r) : minus(ea.r, eb.r)));
    out.push({ slug, x: r3(mitte.x), z: r3(mitte.z), rot, y: Math.max(ea.y, eb.y) });
  }
  return out;
};

// ---------- Prüfregeln (Abschnitt 5) ----------

// Anlaufzonen (F03) der freien Rampen-Vorderseiten; in Bowls und Snake-Runs entfällt das, dort ist die Mitte Fahrfläche
const anlaufZonen = (teile: Teil[], park: Park, ctx: Ctx): V[][] => {
  const mitKurve = new Set(gruppen(park, ctx).filter((g) => g.some((t) => istKurve(t.slug))).flatMap((g) => g.map((t) => t.id)));
  const out: V[][] = [];
  for (const t of teile) {
    const m = ctx.masse[t.slug];
    if (art(t.slug, ctx) !== 'rampe' || !m.hoch || !hochAchsig(m) || istKurve(t.slug) || mitKurve.has(t.id)) continue;
    const vorne = seiteIn(t, m, mal(hochWelt(t, m)!, -1));
    if (!anliegend(vorne, t.id, park, ctx)) out.push(zoneVor(vorne, ANLAUF));
  }
  return out;
};

export type Behebung = 'verschieben' | 'hoehe' | 'zurueck';
export interface Hinweis { id: string; stufe: 'rot' | 'gelb'; teile: string[]; text: string; fix?: Behebung }

export const pruefen = (park: Park, ctx: Ctx): Hinweis[] => {
  const out: Hinweis[] = [];
  const polys = new Map(park.teile.map((t) => [t.id, umriss(t, ctx)]));
  const name = (t: Teil) => ctx.info[t.slug]?.name ?? t.slug;
  const mitKurve = new Set(gruppen(park, ctx).filter((g) => g.some((t) => istKurve(t.slug))).flatMap((g) => g.map((t) => t.id)));
  const zoneBelegt = (z: V[], ohne: string) => { const zb = box(z); return park.teile.some((o) => o.id !== ohne && nah(zb, teilBox(o, ctx)) && ueberlappt(z, polys.get(o.id)!, 0.05)); };
  // F06: Überlappung und außerhalb der Fläche
  for (let i = 0; i < park.teile.length; i++) {
    const a = park.teile[i];
    if (!imFeld(polys.get(a.id)!, park.flaeche, 0.02)) out.push({ id: `feld-${a.id}`, stufe: 'rot', teile: [a.id], text: tt(`${name(a)} ragt über die Fläche hinaus.`, `${name(a)} extends beyond the area.`, `${name(a)} dépasse de la surface.`), fix: 'zurueck' });
    for (let j = i + 1; j < park.teile.length; j++) {
      const b = park.teile[j];
      if (nah(teilBox(a, ctx), teilBox(b, ctx)) && ueberlappt(polys.get(a.id)!, polys.get(b.id)!, tol(a, b))) out.push({ id: `ueber-${a.id}-${b.id}`, stufe: 'rot', teile: [b.id, a.id], text: tt(`${name(b)} und ${name(a)} überlappen sich.`, `${name(b)} and ${name(a)} overlap.`, `${name(b)} et ${name(a)} se chevauchent.`), fix: 'verschieben' });
    }
  }
  for (const t of park.teile) {
    const m = ctx.masse[t.slug];
    if (art(t.slug, ctx) !== 'rampe' || !m.hoch || !hochAchsig(m) || istKurve(t.slug)) continue;
    const hw = hochWelt(t, m)!;
    const hinten = seiteIn(t, m, hw);
    const vorne = seiteIn(t, m, mal(hw, -1));
    const ziel = anliegend(hinten, t.id, park, ctx, ['plattform']);
    // R02: Höhen müssen zusammenpassen
    if (ziel && Math.abs(ctx.masse[ziel.slug].h - m.h) >= 0.06) {
      out.push({ id: `hoehe-${t.id}`, stufe: 'rot', teile: [t.id], text: tt(`${name(t)} passt in der Höhe nicht zu ${name(ziel)}.`, `${name(t)} does not match ${name(ziel)} in height.`, `${name(t)} n'a pas la même hauteur que ${name(ziel)}.`), fix: variante(t.slug, ctx.masse[ziel.slug].h, ctx) ? 'hoehe' : undefined });
    }
    const istJump = familie(t.slug) === 'jump-ramp-sjr';
    // F02: hinter freistehender Jump-Ramp 5 m frei
    if (istJump && !anliegend(hinten, t.id, park, ctx)) {
      const z = zoneVor(hinten, ANLAUF);
      if (!imFeld(z, park.flaeche, 0.3) || zoneBelegt(z, t.id)) {
        out.push({ id: `lande-${t.id}`, stufe: 'gelb', teile: [t.id], text: 'Hinter der Jump-Ramp 5 m frei lassen.', fix: 'verschieben' });
      }
    }
    // F03: 5 m Anlauf vor jeder Rampe
    if (!mitKurve.has(t.id) && !anliegend(vorne, t.id, park, ctx)) {
      const z = zoneVor(vorne, ANLAUF);
      if (!imFeld(z, park.flaeche, 0.3) || zoneBelegt(z, t.id)) {
        out.push({ id: `anlauf-${t.id}`, stufe: 'gelb', teile: [t.id], text: tt(`Vor ${name(t)} fehlen 5 m freie Anlauffläche.`, `${name(t)} needs 5 m of clear run-up area in front of it.`, `Il manque 5 m de zone d'élan dégagée devant ${name(t)}.`), fix: 'verschieben' });
      }
    }
  }
  // A06: Rail- und Wall-Slides werden seitlich an ein Element geschraubt
  for (const t of park.teile) {
    if (!istSlide(t.slug)) continue;
    const p = polys.get(t.id)!;
    if (!park.teile.some((o) => o.id !== t.id && nah(teilBox(t, ctx), teilBox(o, ctx), BERUEHRT) && abstand(p, polys.get(o.id)!) < BERUEHRT)) {
      out.push({ id: `slide-${t.id}`, stufe: 'gelb', teile: [t.id], text: `${name(t)} wird seitlich an ein anderes Element geschraubt. Bitte anlegen.` });
    }
  }
  // F01: Sicherheitsbereich 2 m zwischen Gruppen und zum Flächenrand
  const gs = gruppen(park, ctx);
  const gp = gs.map((g) => g.map((t) => polys.get(t.id)!));
  const gb = gs.map((g) => box(g.flatMap((t) => polys.get(t.id)!)));
  for (let i = 0; i < gs.length; i++) {
    for (let j = i + 1; j < gs.length; j++) {
      if (!nah(gb[i], gb[j], SICHER)) continue;
      let d = Infinity;
      for (const a of gs[i]) for (const b of gs[j]) if (nah(teilBox(a, ctx), teilBox(b, ctx), SICHER)) d = Math.min(d, abstand(umriss(a, ctx), umriss(b, ctx)));
      if (d > BERUEHRT && d < SICHER - 0.05) {
        const klein = gs[i].length <= gs[j].length ? gs[i] : gs[j];
        out.push({ id: `abst-${klein[0].id}`, stufe: 'gelb', teile: klein.map((t) => t.id), text: tt(`Abstand ${d.toFixed(1).replace('.', ',')} m, mindestens 2 m Sicherheitsbereich nötig.`, `Distance ${d.toFixed(1)} m, a safety zone of at least 2 m is required.`, `Distance de ${d.toFixed(1).replace('.', ',')} m, une zone de sécurité d'au moins 2 m est nécessaire.`), fix: 'verschieben' });
      }
    }
    const rand = Math.min(...gp[i].map((p) => randAbstand(p, park.flaeche)));
    if (rand >= -0.02 && rand < SICHER - 0.05) {
      out.push({ id: `rand-${gs[i][0].id}`, stufe: 'gelb', teile: gs[i].map((t) => t.id), text: tt('Zu nah am Flächenrand, 2 m Sicherheitsbereich nötig.', 'Too close to the edge of the area; a 2 m safety zone is required.', 'Trop près du bord de la surface ; une zone de sécurité de 2 m est nécessaire.'), fix: 'verschieben' });
    }
  }
  const gesehen = new Set<string>();
  return out.filter((h) => !gesehen.has(h.id) && gesehen.add(h.id));
};

// ---------- Beheben ----------

const VERSATZ: V[] = (() => {
  const v: V[] = [];
  for (let i = -12; i <= 12; i++) for (let j = -12; j <= 12; j++) if (i || j) v.push({ x: i * FEIN, z: j * FEIN });
  return v.sort((a, b) => laenge(a) - laenge(b));
})();

export const beheben = (h: Hinweis, park: Park, ctx: Ctx): Park | null => {
  const t = park.teile.find((x) => x.id === h.teile[0]);
  if (!t) return null;
  if (h.fix === 'zurueck') return { ...park, teile: park.teile.map((x) => (x.id === t.id ? klemmen(x, park.flaeche, ctx) : x)) };
  if (h.fix === 'hoehe') {
    const ziel = anliegend(seiteIn(t, ctx.masse[t.slug], hochWelt(t, ctx.masse[t.slug])!), t.id, park, ctx, ['plattform']);
    const neu = ziel && variante(t.slug, ctx.masse[ziel.slug].h, ctx);
    if (!ziel || !neu) return null;
    const pose = andockPosen(neu, ohneTeil(park, t.id), ctx).filter((p) => p.ziel === ziel.id).sort((a, b) => Math.hypot(a.x - t.x, a.z - t.z) - Math.hypot(b.x - t.x, b.z - t.z))[0];
    return { ...park, teile: park.teile.map((x) => (x.id === t.id ? { ...x, slug: neu, ...(pose ? { x: pose.x, z: pose.z, rot: pose.rot } : {}) } : x)) };
  }
  if (h.fix === 'verschieben') {
    // Überlappung: nur das eine Teil bewegen; sonst die ganze Gruppe
    const gruppe = h.id.startsWith('ueber') ? [t] : gruppen(park, ctx).find((g) => g.some((x) => x.id === t.id)) ?? [t];
    const ids = new Set(gruppe.map((x) => x.id));
    const rest: Park = { ...park, teile: park.teile.filter((x) => !ids.has(x.id)) };
    const fremdeZonen = anlaufZonen(rest.teile, rest, ctx).map((z) => ({ z, b: box(z) }));
    // Gezielte Prüfung nur für die verschobene Gruppe statt der ganzen Prüfung je Kandidat
    const passt = (f: Flaeche, d: V) => {
      const neu = gruppe.map((x) => ({ ...x, x: r3(x.x + d.x), z: r3(x.z + d.z) }));
      const gb = box(neu.flatMap((x) => umriss(x, ctx)));
      if (gb.x0 < -f.l / 2 + SICHER - 0.05 || gb.x1 > f.l / 2 - SICHER + 0.05 || gb.z0 < -f.b / 2 + SICHER - 0.05 || gb.z1 > f.b / 2 - SICHER + 0.05) return null;
      for (const o of rest.teile) {
        const ob = teilBox(o, ctx);
        if (!nah(gb, ob, SICHER)) continue;
        for (const x of neu) if (nah(teilBox(x, ctx), ob, SICHER - 0.05) && abstand(umriss(x, ctx), umriss(o, ctx)) < SICHER - 0.05) return null;
      }
      for (const { z, b: zb } of fremdeZonen) if (nah(gb, zb) && neu.some((x) => ueberlappt(z, umriss(x, ctx), 0.05))) return null;
      const probe: Park = { flaeche: f, teile: [...rest.teile, ...neu] };
      for (const z of anlaufZonen(neu, probe, ctx)) {
        if (!imFeld(z, f, 0.3)) return null;
        const zb = box(z);
        if (rest.teile.some((o) => nah(zb, teilBox(o, ctx)) && ueberlappt(z, umriss(o, ctx), 0.05))) return null;
      }
      return probe;
    };
    // Erst auf der vorhandenen Fläche suchen, sonst die Fläche schrittweise vergrößern
    let f = park.flaeche;
    for (let runde = 0; runde < 5; runde++) {
      for (const d of VERSATZ) { const p = passt(f, d); if (p) return p; }
      f = { ...f, l: f.l + 2 * RASTER, b: f.b + 2 * RASTER };
    }
  }
  return null;
};

export const allesBeheben = (park: Park, ctx: Ctx): Park => {
  let p = park;
  const versucht = new Set<string>();
  for (let i = 0; i < 25; i++) {
    const h = pruefen(p, ctx).find((x) => x.fix && !versucht.has(x.id));
    if (!h) break;
    versucht.add(h.id);
    p = beheben(h, p, ctx) ?? p;
  }
  return p;
};

// ---------- Bausteine aus dem A+-Katalog (Regelwerk Abschnitt 8) ----------

export interface Baustein { id: string; name: string; text: string; seite: string; bauen: (ctx: Ctx) => Teil[] | null }

const teil = (slug: string, x = 0, z = 0, rot = 0): Teil => ({ id: neueId(), slug, x, z, rot });
const ausPose = (p: Pose | null): Teil | null => (p ? teil(p.slug, p.x, p.z, p.rot) : null);
const seiteNach = (t: Teil, ctx: Ctx, n: V) => seiteIn(t, ctx.masse[t.slug], n);
const alle = (xs: (Teil | null)[]) => (xs.every(Boolean) ? (xs as Teil[]) : null);
const OST = { x: 1, z: 0 };
const WEST = { x: -1, z: 0 };
const NORD = { x: 0, z: 1 };
const SUED = { x: 0, z: -1 };
const hipSlug = (h: number) => `hip-${h}`;
const jumpSlug = (h: number) => `jump-ramp-sjr-${h}`;

const jumpBox = (h: number) => (ctx: Ctx) => {
  const t = teil(`table-${h}`);
  return alle([t, ausPose(poseAnSeite(t, seiteNach(t, ctx, WEST), `bank-${h}`, 0, ctx)), ausPose(poseAnSeite(t, seiteNach(t, ctx, OST), jumpSlug(h), 0, ctx))]);
};
const spine = (h: number, breite: number) => (ctx: Ctx) => {
  const out: (Teil | null)[] = [];
  const m = ctx.masse[`coping-ramp-${h}`];
  if (!m?.hoch) return null;
  for (let i = 0; i < breite; i++) {
    const z = (i - (breite - 1) / 2) * RASTER;
    const rot = norm360(winkel(OST) - winkel(m.hoch));
    const a = teil(`coping-ramp-${h}`, 0, z, rot);
    a.x = -(Math.abs(m.hoch.x) > 0.5 ? m.l : m.b) / 2;
    out.push(a, ausPose(poseAnSeite(a, seiteNach(a, ctx, OST), `coping-ramp-${h}`, 0, ctx)));
  }
  return alle(out);
};
const pyramide = (h: number) => (ctx: Ctx) => {
  const t1 = teil(`table-${h}`, -RASTER / 2, 0);
  const t2 = teil(`table-${h}`, RASTER / 2, 0);
  const b = `bank-${h}`;
  const an = (t: Teil, n: V) => ausPose(poseAnSeite(t, seiteNach(t, ctx, n), b, 0, ctx));
  const eck = (t: Teil, i: number) => ausPose(poseAnEcke(t, i, hipSlug(h), ctx));
  // Ecken-Reihenfolge von ecken(): 0 (-x,-z), 1 (+x,-z), 2 (+x,+z), 3 (-x,+z)
  return alle([t1, t2, an(t1, NORD), an(t1, SUED), an(t2, NORD), an(t2, SUED), an(t1, WEST), an(t2, OST), eck(t1, 0), eck(t1, 3), eck(t2, 1), eck(t2, 2)]);
};
const quarter = (h: number) => (ctx: Ctx) => {
  const out: (Teil | null)[] = [];
  for (let i = -1; i <= 1; i++) {
    const t = teil(`table-${h}`, 0, i * RASTER);
    out.push(t, ausPose(poseAnSeite(t, seiteNach(t, ctx, WEST), `coping-ramp-${h}`, 0, ctx)));
  }
  return alle(out);
};
const ollyBox = (ctx: Ctx) => {
  const mp = ctx.masse['manual-pad-300'];
  const cu = ctx.masse['curb-300'];
  if (!mp || !cu) return null;
  const quer = (m: Masse) => (m.l >= m.b ? 0 : 90);
  const breite = (m: Masse) => Math.min(m.l, m.b);
  return [teil('manual-pad-300', 0, 0, quer(mp)), teil('curb-300', 0, r3(breite(mp) / 2 + breite(cu) / 2), quer(cu))];
};
const wallride = (ctx: Ctx) => {
  const w = teil('wall-410');
  const m = ctx.masse['wall-410'];
  if (!m?.hoch) return null;
  return alle([w, ausPose(poseAnSeite(w, seiteIn(w, m, hochWelt(w, m)!), 'wall-ramp-200', 0, ctx))]);
};
const pipe = (h: number) => (ctx: Ctx) => {
  const q = `quarterramp-${h}`;
  const mq = ctx.masse[q];
  if (!mq?.hoch) return null;
  const tiefeQ = Math.abs(mq.hoch.x) > 0.5 ? mq.l : mq.b;
  const breiteQ = Math.abs(mq.hoch.x) > 0.5 ? mq.b : mq.l;
  const breite = h === 165 ? 3.75 : 5; // A08
  const nQ = Math.max(1, Math.round(breite / breiteQ));
  // Flats so wählen, dass sie die Breite möglichst genau füllen
  const wahl = ['flat-250', 'flat-375', 'flat-375-2'].flatMap((s) => {
    const m = ctx.masse[s];
    if (!m) return [];
    return [{ s, quer: m.b, lang: m.l, rot: 0 }, { s, quer: m.l, lang: m.b, rot: 90 }].map((o) => ({ ...o, n: Math.round(breite / o.quer), fehler: Math.abs(breite / o.quer - Math.round(breite / o.quer)) + Math.abs(o.lang - 3.75) / 10 }));
  }).filter((o) => o.n >= 1).sort((a, b) => a.fehler - b.fehler)[0];
  if (!wahl) return null;
  const out: Teil[] = [];
  for (let i = 0; i < wahl.n; i++) out.push(teil(wahl.s, 0, r3((i - (wahl.n - 1) / 2) * wahl.quer), wahl.rot));
  for (const seite of [-1, 1]) {
    const rot = norm360(winkel({ x: seite, z: 0 }) - winkel(mq.hoch));
    for (let i = 0; i < nQ; i++) out.push(teil(q, r3(seite * (wahl.lang / 2 + tiefeQ / 2)), r3((i - (nQ - 1) / 2) * breiteQ), rot));
  }
  return out;
};

export const BAUSTEINE: Baustein[] = [
  { id: 'jumpbox-45', name: 'Jump-Box 45', text: 'Table, Bank und Jump-Ramp, 45 cm', seite: 'K S. 12', bauen: jumpBox(45) },
  { id: 'jumpbox-60', name: 'Jump-Box 60', text: 'Table, Bank und Jump-Ramp, 60 cm', seite: 'K S. 12', bauen: jumpBox(60) },
  { id: 'jumpbox-75', name: 'Jump-Box 75', text: 'Table, Bank und Jump-Ramp, 75 cm', seite: 'K S. 12', bauen: jumpBox(75) },
  { id: 'spine-75', name: 'Spine-Ramp 75', text: '2 Coping Ramps Rücken an Rücken', seite: 'K S. 12', bauen: spine(75, 1) },
  { id: 'spine-98', name: 'Spine-Ramp 98', text: '2 Coping Ramps Rücken an Rücken', seite: 'K S. 12', bauen: spine(98, 1) },
  { id: 'spine-125', name: 'Spine-Ramp 125', text: '4 Coping Ramps, 2,5 m breit', seite: 'K S. 12', bauen: spine(125, 2) },
  { id: 'spine-150', name: 'Spine-Ramp 150', text: '6 Coping Ramps, 3,75 m breit', seite: 'K S. 12', bauen: spine(150, 3) },
  { id: 'pyramide-60', name: 'Pyramide 60', text: '2 Tables, 6 Banks, 4 Pyramid Hips', seite: 'K S. 13', bauen: pyramide(60) },
  { id: 'pyramide-75', name: 'Pyramide 75', text: '2 Tables, 6 Banks, 4 Pyramid Hips', seite: 'K S. 13', bauen: pyramide(75) },
  { id: 'pyramide-98', name: 'Pyramide 98', text: '2 Tables, 6 Banks, 4 Pyramid Hips', seite: 'K S. 13', bauen: pyramide(98) },
  { id: 'quarter-98', name: 'Quarterramp 98', text: '3 Coping Ramps mit Podest, ohne Geländer', seite: 'K S. 15', bauen: quarter(98) },
  { id: 'quarter-125', name: 'Quarterramp 125', text: '3 Coping Ramps mit Podest und Geländer', seite: 'K S. 15', bauen: quarter(125) },
  { id: 'quarter-150', name: 'Quarterramp 150', text: '3 Coping Ramps mit Podest und Geländer', seite: 'K S. 15', bauen: quarter(150) },
  { id: 'ollybox', name: 'Olly Box', text: 'Manual Pad mit Ledge', seite: 'K S. 12', bauen: ollyBox },
  { id: 'wallride', name: 'Wallride', text: 'Wall mit Wall-Ramp', seite: 'K S. 15', bauen: wallride },
  { id: 'pipe-165', name: 'Pipe 165', text: '4 Quarterramps mit Flats, 3,75 m breit', seite: 'K S. 16', bauen: pipe(165) },
  { id: 'pipe-200', name: 'Pipe 200', text: '4 Quarterramps mit Flats, 5 m breit', seite: 'K S. 16', bauen: pipe(200) },
  { id: 'pipe-255', name: 'Pipe 255', text: '4 Quarterramps 255 mit Flats, 5 m breit', seite: 'K S. 16', bauen: pipe(255) },
  { id: 'bowl-98-klein', name: 'Bowl 98 klein', text: 'Runde Ecken aus Corners, außen ca. 9,0 × 7,7 m', seite: 'K S. 4, 41', bauen: (ctx) => bowl(98, 1, 0, ctx) },
  { id: 'bowl-98', name: 'Bowl 98', text: 'Runde Ecken aus Corners, außen ca. 11,5 × 9,0 m', seite: 'K S. 4, 41', bauen: (ctx) => bowl(98, 3, 1, ctx) },
  { id: 'bowl-150', name: 'Bowl 150', text: 'Runde Ecken aus Corners, außen ca. 12,5 × 10,0 m, mit Geländer', seite: 'K S. 4, 41', bauen: (ctx) => bowl(150, 3, 1, ctx) },
];

// Einzelteile, die der Kunde nicht direkt wählt: Geländer und Anlaufkeile setzt die Automatik, SQR-255 nur in der Pipe (A09)
export const waehlbar = (slug: string, ctx: Ctx) => art(slug, ctx) !== 'auto' && slug !== 'quarterramp-255' && !istKurve(slug);

// Neues Teil oder Baustein in den Park setzen, an einen freien Platz
export const hinzufuegen = (park: Park, neu: Teil[], ctx: Ctx): Park => {
  // Kein Platz mehr frei: Fläche wächst, statt etwas übereinander zu setzen
  let flaeche = park.flaeche;
  let d = freierPlatz(neu, park, ctx);
  for (let i = 0; !d && i < 24; i++) {
    flaeche = i % 2 ? { ...flaeche, b: flaeche.b + 2 * RASTER } : { ...flaeche, l: flaeche.l + 2 * RASTER };
    d = freierPlatz(neu, { ...park, flaeche }, ctx);
  }
  park = { ...park, flaeche };
  let teile = [...park.teile, ...verschiebe(neu, d ?? { x: 0, z: 0 })];
  // A11: zur Wall gehört immer die Wall-Ramp
  for (const t of neu) {
    if (t.slug !== 'wall-410' || neu.some((x) => x.slug === 'wall-ramp-200')) continue;
    const w = teile.find((x) => x.id === t.id)!;
    const m = ctx.masse['wall-410'];
    const p = m?.hoch && poseAnSeite(w, seiteIn(w, m, hochWelt(w, m)!), 'wall-ramp-200', 0, ctx);
    if (p) teile = [...teile, teil(p.slug, p.x, p.z, p.rot)];
  }
  return { ...park, teile };
};

// ---------- Kurven und Bowls ----------

// Kurvenstück so setzen, dass sein Mittelpunkt auf cw liegt und seine Winkelhalbierende in Richtung bw zeigt
const kurvenStueck = (slug: string, cw: V, bw: number): Teil => {
  const k = KURVE[slug];
  const rot = norm360(bw - (k.von + k.bis) / 2);
  const p = minus(cw, drehe(k.c, rot));
  return teil(slug, r3(p.x), r3(p.z), rot);
};
const KURVEN_HOEHEN: Record<string, { corner: string; tisch: string }> = {
  'coping-ramp-98': { corner: 'corner-98', tisch: 'corner-table-98' },
  'coping-ramp-150': { corner: 'corner-150', tisch: 'corner-table-150' },
};
export type Richtung = 'links' | 'rechts';
export interface Anbau { kurve: Richtung[]; gerade: Richtung[] }

// Lage einer Coping Ramp: Rückseite (Coping), Tiefe, Breite, Seitenrichtungen aus Sicht des Fahrers
const rampenLage = (t: Teil, ctx: Ctx) => {
  const m = ctx.masse[t.slug];
  const hw = hochWelt(t, m)!;
  const tiefe = Math.abs(m.hoch!.x) > 0.5 ? m.l : m.b;
  const breite = Math.abs(m.hoch!.x) > 0.5 ? m.b : m.l;
  const links = { x: hw.z, z: -hw.x };
  return { m, hw, tiefe, breite, seite: (r: Richtung) => (r === 'links' ? links : mal(links, -1)) };
};

// Was an dieser Coping Ramp angebaut werden kann (nur an freien Seiten)
export const anbauMoeglich = (id: string, park: Park, ctx: Ctx): Anbau => {
  const t = park.teile.find((x) => x.id === id);
  if (!t || familie(t.slug) !== 'coping-ramp' || !ctx.masse[t.slug]?.hoch) return { kurve: [], gerade: [] };
  const l = rampenLage(t, ctx);
  const frei = (['links', 'rechts'] as Richtung[]).filter((r) => !anliegend(seiteIn(t, l.m, l.seite(r)), t.id, park, ctx));
  return { kurve: KURVEN_HOEHEN[t.slug] ? frei : [], gerade: frei };
};

// Angebaute Stücke übernehmen den Geländer-Schalter der Gruppe, an die sie angebaut werden
const erben = (neu: Teil[], von: Teil, park: Park, ctx: Ctx): Teil[] => {
  const modus = gelaenderModus(von.id, park, ctx);
  if (!modus || modus === 'auto') return neu;
  return neu.map((t) => (traegtGelaender(t, ctx) ? { ...t, gel: modus === 'an' } : t));
};

// Neue Teile einfügen: Fläche bei Bedarf vergrößern, Überlappung verhindern
const anbauen = (park: Park, neu: Teil[], ctx: Ctx): Park | null => {
  if (neu.some((t) => kollidiert(t, park, ctx))) return null;
  const b = box(neu.flatMap((t) => umriss(t, ctx)));
  const f = park.flaeche;
  const l = Math.max(f.l, aufRaster(2 * Math.max(Math.abs(b.x0), Math.abs(b.x1)) + 0.01));
  const br = Math.max(f.b, aufRaster(2 * Math.max(Math.abs(b.z0), Math.abs(b.z1)) + 0.01));
  return { flaeche: { ...f, l, b: br }, teile: [...park.teile, ...neu] };
};

// Gerade: eine weitere Coping Ramp (mit Table, wenn dahinter einer steht) in der Reihe
export const geradeAnhaengen = (id: string, r: Richtung, park: Park, ctx: Ctx): Park | null => {
  const t = park.teile.find((x) => x.id === id);
  if (!t) return null;
  const l = rampenLage(t, ctx);
  const s = l.seite(r);
  const neu = [teil(t.slug, r3(t.x + s.x * l.breite), r3(t.z + s.z * l.breite), t.rot)];
  const tisch = anliegend(seiteIn(t, l.m, l.hw), t.id, park, ctx, ['plattform']);
  if (tisch && !istKurve(tisch.slug)) neu.push(teil(tisch.slug, r3(tisch.x + s.x * l.breite), r3(tisch.z + s.z * l.breite), tisch.rot));
  return anbauen(park, erben(neu, t, park, ctx), ctx);
};

// Innenkurve 90°: drei Corner um einen gemeinsamen Mittelpunkt, dahinter drei Table Corner, danach eine gerade Coping Ramp
export const kurveAnhaengen = (id: string, r: Richtung, park: Park, ctx: Ctx): Park | null => {
  const t = park.teile.find((x) => x.id === id);
  const satz = t && KURVEN_HOEHEN[t.slug];
  if (!t || !satz) return null;
  const l = rampenLage(t, ctx);
  const s = l.seite(r);
  const k = KURVE[satz.corner];
  const ecke = plus(plus(t, mal(l.hw, l.tiefe / 2)), mal(s, l.breite / 2)); // Coping-Ende auf dieser Seite
  const mitte = minus(ecke, mal(l.hw, k.R));
  const ah = winkel(l.hw);
  const sinn = ((winkel(s) - ah + 540) % 360) - 180 > 0 ? 1 : -1;
  const mitTisch = !!anliegend(seiteIn(t, l.m, l.hw), t.id, park, ctx, ['plattform']);
  const neu: Teil[] = [];
  for (let i = 0; i < 3; i++) {
    const bw = ah + sinn * (15 + 30 * i);
    neu.push(kurvenStueck(satz.corner, mitte, bw));
    if (mitTisch) neu.push(kurvenStueck(satz.tisch, mitte, bw));
  }
  // Nach 90° zeigt die Rückseite zur Seite s, die Reihe läuft zurück Richtung Fahrer
  const rot = norm360(winkel(s) - winkel(l.m.hoch!));
  const gerade = plus(plus(mitte, mal(s, k.r + l.tiefe / 2)), mal(l.hw, -l.breite / 2));
  neu.push(teil(t.slug, r3(gerade.x), r3(gerade.z), rot));
  if (mitTisch) {
    const tt = plus(gerade, mal(s, l.tiefe / 2 + RASTER / 2));
    const tischSlug = t.slug === 'coping-ramp-98' ? 'table-98' : 'table-150';
    neu.push(teil(tischSlug, r3(tt.x), r3(tt.z), rot));
  }
  return anbauen(park, erben(neu, t, park, ctx), ctx);
};

// Bowl: Rechteck mit runden Innenecken; nl × nb gerade Coping Ramps je Seite, an jeder Ecke 3 Corner, dahinter Tables und Table Corner
export const bowl = (h: 98 | 150, nl: number, nb: number, ctx: Ctx): Teil[] | null => {
  const rampe = `coping-ramp-${h}`;
  const satz = KURVEN_HOEHEN[rampe];
  const m = ctx.masse[rampe];
  if (!satz || !m?.hoch) return null;
  const k = KURVE[satz.corner];
  const tiefe = Math.abs(m.hoch.x) > 0.5 ? m.l : m.b;
  const W = nl * RASTER;
  const H = nb * RASTER;
  const out: Teil[] = [];
  const reihe = (aussen: V, start: V, entlang: V, n: number) => {
    const rot = norm360(winkel(aussen) - winkel(m.hoch!));
    for (let i = 0; i < n; i++) {
      const basis = plus(start, mal(entlang, RASTER / 2 + i * RASTER));
      const c = plus(basis, mal(aussen, k.r + tiefe / 2));
      const tt = plus(basis, mal(aussen, k.r + tiefe + RASTER / 2));
      out.push(teil(rampe, r3(c.x), r3(c.z), rot), teil(`table-${h}`, r3(tt.x), r3(tt.z), rot));
    }
  };
  reihe({ x: 0, z: -1 }, { x: -W / 2, z: -H / 2 }, { x: 1, z: 0 }, nl);
  reihe({ x: 0, z: 1 }, { x: -W / 2, z: H / 2 }, { x: 1, z: 0 }, nl);
  reihe({ x: -1, z: 0 }, { x: -W / 2, z: -H / 2 }, { x: 0, z: 1 }, nb);
  reihe({ x: 1, z: 0 }, { x: W / 2, z: -H / 2 }, { x: 0, z: 1 }, nb);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const mitte = { x: (sx * W) / 2, z: (sz * H) / 2 };
    const a = winkel({ x: 0, z: sz });
    const sinn = ((winkel({ x: sx, z: 0 }) - a + 540) % 360) - 180 > 0 ? 1 : -1;
    for (let i = 0; i < 3; i++) {
      const bw = a + sinn * (15 + 30 * i);
      out.push(kurvenStueck(satz.corner, mitte, bw), kurvenStueck(satz.tisch, mitte, bw));
    }
  }
  return out;
};

// Geländer-Schalter für die Gruppe eines Teils: 'auto' (Regel), 'an', 'aus'
export type GelaenderModus = 'auto' | 'an' | 'aus';
const traegtGelaender = (t: Teil, ctx: Ctx) => art(t.slug, ctx) === 'plattform' || (art(t.slug, ctx) === 'rampe' && !istKurve(t.slug) && !!ctx.masse[t.slug]?.hoch);
export const gelaenderModus = (id: string, park: Park, ctx: Ctx): GelaenderModus | null => {
  const g = gruppen(park, ctx).find((x) => x.some((t) => t.id === id))?.filter((t) => traegtGelaender(t, ctx)) ?? [];
  if (!g.length) return null;
  return g.every((t) => t.gel === true) ? 'an' : g.every((t) => t.gel === false) ? 'aus' : 'auto';
};
export const gelaenderSetzen = (id: string, modus: GelaenderModus, park: Park, ctx: Ctx): Park => {
  const ids = new Set((gruppen(park, ctx).find((x) => x.some((t) => t.id === id)) ?? []).filter((t) => traegtGelaender(t, ctx)).map((t) => t.id));
  return { ...park, teile: park.teile.map((t) => {
    if (!ids.has(t.id)) return t;
    const neu = { ...t };
    delete neu.gel;
    return modus === 'auto' ? neu : { ...neu, gel: modus === 'an' };
  }) };
};

// ---------- Vorschläge beim Ziehen (A02–A05) ----------

export interface Option { label: string; anwenden: (park: Park) => Park }
export interface Vorschlag { teil: string; text: string; optionen: Option[] }

export const vorschlag = (id: string, park: Park, ctx: Ctx): Vorschlag | null => {
  const t = park.teile.find((x) => x.id === id);
  if (!t) return null;
  const m = ctx.masse[t.slug];
  const a = art(t.slug, ctx);
  const name = (s: string) => ctx.info[s]?.name ?? s;
  const andocken = (slug: string, ziel: Teil, nurSeite?: Seite) => (p: Park): Park => {
    const kand = nurSeite ? [poseAnSeite(ziel, nurSeite, slug, 0, ctx)].filter(Boolean) as Pose[] : andockPosen(slug, { ...p, teile: [ziel] }, ctx);
    const frei = kand.filter((po) => !kollidiert({ id: '_', slug: po.slug, x: po.x, z: po.z, rot: po.rot }, p, ctx) && imFeld(umriss({ id: '_', slug: po.slug, x: po.x, z: po.z, rot: po.rot }, ctx), p.flaeche));
    const po = frei.sort((x, y) => Math.hypot(x.x, x.z) - Math.hypot(y.x, y.z))[0];
    return po ? { ...p, teile: [...p.teile, teil(po.slug, po.x, po.z, po.rot)] } : p;
  };
  const anliegendeRampen = seiten(t, m).filter((s) => anliegend(s, t.id, park, ctx, ['rampe']));
  const h = Math.round(m.h * 100);
  const hoehe = [45, 60, 75, 98, 125, 150].find((x) => Math.abs(x - h) <= 4);

  if (a === 'plattform' && anliegendeRampen.length === 0 && hoehe) {
    const opt: Option[] = [];
    const bank = variante(`bank-${hoehe}`, m.h, ctx);
    const jump = variante(jumpSlug(hoehe === 98 ? 75 : hoehe), m.h, ctx);
    const coping = variante(`coping-ramp-${hoehe}`, m.h, ctx);
    if (bank) opt.push({ label: name(bank), anwenden: andocken(bank, t) });
    if (jump) opt.push({ label: name(jump), anwenden: andocken(jump, t) });
    if (!jump && coping) opt.push({ label: name(coping), anwenden: andocken(coping, t) });
    if (opt.length) return { teil: id, text: 'Eine Rampe dazu? Sie dockt passend an.', optionen: opt };
  }
  if (a === 'rampe' && m.hoch && hochAchsig(m) && ['bank', 'jump-ramp-sjr', 'coping-ramp', 'stairs'].includes(familie(t.slug))) {
    const hinten = seiteIn(t, m, hochWelt(t, m)!);
    if (!anliegend(hinten, t.id, park, ctx)) {
      const tisch = variante('table-60', m.h, ctx);
      const opt: Option[] = [];
      const tischDahinter = (p: Park): Park => {
        if (!tisch) return p;
        const mt = ctx.masse[tisch];
        const mitte = plus(hinten.mitte, mal(hinten.normale, mt.l / 2));
        const neu = teil(tisch, r3(mitte.x), r3(mitte.z), t.rot);
        return kollidiert(neu, p, ctx) ? p : { ...p, teile: [...p.teile, neu] };
      };
      if (tisch) opt.push({ label: tt(`${name(tisch)} dahinter`, `${name(tisch)} behind it`, `${name(tisch)} derrière`), anwenden: tischDahinter });
      if (familie(t.slug) === 'coping-ramp') opt.push({ label: tt('Zweite Coping Ramp (Spine)', 'Second coping ramp (spine)', 'Seconde rampe à coping (spine)'), anwenden: andocken(t.slug, t, hinten) });
      if (opt.length) return { teil: id, text: tt('Dahinter gehört ein Podest, sonst ist die Rückseite offen.', 'A platform belongs behind it, otherwise the back is open.', "Une plateforme doit se trouver derrière, sinon l'arrière est ouvert."), optionen: opt };
    }
  }
  if (familie(t.slug) === 'hip' && hoehe && [60, 75, 98].includes(hoehe)) {
    const allein = !park.teile.some((o) => o.id !== t.id && abstand(umriss(o, ctx), umriss(t, ctx)) < BERUEHRT);
    if (allein) {
      return {
        teil: id, text: tt('Ein Pyramid Hip allein ist selten. Zur Pyramide ergänzen?', 'A pyramid hip on its own is rare. Complete it to a pyramid?', 'Une pyramid hip seule est rare. La compléter pour en faire une pyramide ?'), optionen: [{
          label: tt(`Pyramide ${hoehe} bauen`, `Build pyramid ${hoehe}`, `Construire la pyramide ${hoehe}`),
          anwenden: (p) => {
            const b = BAUSTEINE.find((x) => x.id === `pyramide-${hoehe}`)!.bauen(ctx);
            if (!b) return p;
            const ohne = ohneTeil(p, t.id);
            const mitte = box(b.flatMap((x) => umriss(x, ctx)));
            const versetzt = verschiebe(b, { x: t.x - (mitte.x0 + mitte.x1) / 2, z: t.z - (mitte.z0 + mitte.z1) / 2 });
            const ok = versetzt.every((x) => !kollidiert(x, ohne, ctx) && imFeld(umriss(x, ctx), p.flaeche));
            return ok ? { ...ohne, teile: [...ohne.teile, ...versetzt] } : hinzufuegen(ohne, b, ctx);
          },
        }],
      };
    }
  }
  return null;
};

// ---------- Anordnen nach dem Muster der Beispielparks (Regelwerk Abschnitt 9) ----------

export const drehenGruppe = (g: Teil[], viertel: number, ctx: Ctx): Teil[] => {
  if (!viertel) return g;
  const b = box(g.flatMap((t) => umriss(t, ctx)));
  const c = { x: (b.x0 + b.x1) / 2, z: (b.z0 + b.z1) / 2 };
  return g.map((t) => {
    const p = plus(c, drehe(minus(t, c), viertel * 90));
    return { ...t, x: r3(p.x), z: r3(p.z), rot: norm360(t.rot + viertel * 90) };
  });
};
// Fahrtrichtung einer Gruppe: Summe der freien Vorderseiten ihrer Rampen
const front = (g: Teil[], park: Park, ctx: Ctx): V => {
  let f = { x: 0, z: 0 };
  for (const t of g) {
    const m = ctx.masse[t.slug];
    if (art(t.slug, ctx) !== 'rampe' || !m.hoch || !hochAchsig(m)) continue;
    const v = mal(hochWelt(t, m)!, -1);
    if (!anliegend(seiteIn(t, m, v), t.id, park, ctx)) f = plus(f, v);
  }
  return f;
};
const ausrichten = (g: Teil[], ziel: V, park: Park, ctx: Ctx): Teil[] => {
  let best = g;
  let wert = -Infinity;
  for (let k = 0; k < 4; k++) {
    const d = drehenGruppe(g, k, ctx);
    const f = front(d, { ...park, teile: d }, ctx);
    const w = laenge(f) ? skalar(f, ziel) / laenge(f) : 0;
    if (w > wert + 1e-6) { wert = w; best = d; }
  }
  return best;
};
const groesse = (g: Teil[], ctx: Ctx) => { const b = box(g.flatMap((t) => umriss(t, ctx))); return { l: b.x1 - b.x0, b: b.z1 - b.z0, box: b }; };
const setze = (g: Teil[], ctx: Ctx, x0: number, zMitte: number) => {
  const b = box(g.flatMap((t) => umriss(t, ctx)));
  return verschiebe(g, { x: x0 - b.x0, z: zMitte - (b.z0 + b.z1) / 2 });
};
const aufRaster = (x: number) => Math.ceil(x / RASTER - 1e-6) * RASTER;

// A in der Mitte links, B in der Mitte, C rechts, Street-Linie längs daneben, dazwischen 5 m Anlauf
export const anordnen = (park: Park, ctx: Ctx, flaecheBehalten = false): Park => {
  const gs = gruppen(park, ctx);
  const street = gs.filter((g) => g.every((t) => art(t.slug, ctx) === 'street'));
  const rampen = gs.filter((g) => !street.includes(g)).sort((a, b) => { const x = groesse(a, ctx); const y = groesse(b, ctx); return y.l * y.b - x.l * x.b; });
  const teile: Teil[] = [];
  const [B, A, C, ...extra] = rampen;
  let bB = { x0: 0, x1: 0, z0: 0, z1: 0 };
  if (B) {
    const g = groesse(B, ctx);
    const b = g.l >= g.b ? B : drehenGruppe(B, 1, ctx);
    const gg = groesse(b, ctx);
    const s = setze(b, ctx, -gg.l / 2, 0);
    teile.push(...s);
    bB = box(s.flatMap((t) => umriss(t, ctx)));
  }
  if (A) { const a = ausrichten(A, OST, park, ctx); const g = groesse(a, ctx); teile.push(...setze(a, ctx, bB.x0 - ANLAUF - g.l, 0)); }
  if (C) { const c = ausrichten(C, WEST, park, ctx); teile.push(...setze(c, ctx, bB.x1 + ANLAUF, 0)); }
  // Weitere Rampen-Gruppen in eine zweite Reihe, Fahrseite zur Mitte
  let zRand = bB.z0 - ANLAUF;
  if (extra.length) {
    const reihe = extra.map((g) => ausrichten(g, NORD, park, ctx));
    const tiefe = Math.max(...reihe.map((g) => groesse(g, ctx).b));
    const gesamt = reihe.reduce((s, g) => s + groesse(g, ctx).l, 0) + ANLAUF * (reihe.length - 1);
    let x = -gesamt / 2;
    for (const g of reihe) { teile.push(...setze(g, ctx, x, zRand - tiefe / 2)); x += groesse(g, ctx).l + ANLAUF; }
    zRand -= tiefe;
  }
  // Street-Elemente längs, in Reihen nördlich von B
  if (street.length) {
    const reihe = street.map((g) => { const s = groesse(g, ctx); return s.l >= s.b ? g : drehenGruppe(g, 1, ctx); });
    const maxBreite = Math.max(14, bB.x1 - bB.x0 + 2 * ANLAUF);
    let z = bB.z1 + ANLAUF;
    let x = -maxBreite / 2;
    let tiefe = 0;
    const zeile: Teil[][] = [];
    const ablegen = () => {
      const breite = zeile.reduce((s, g) => s + groesse(g, ctx).l, 0) + SICHER * (zeile.length - 1);
      let xx = -breite / 2;
      for (const g of zeile) { teile.push(...setze(g, ctx, xx, z + tiefe / 2)); xx += groesse(g, ctx).l + SICHER; }
      zeile.length = 0;
    };
    for (const g of reihe) {
      const s = groesse(g, ctx);
      if (zeile.length && x + s.l > maxBreite / 2) { ablegen(); z += tiefe + SICHER; x = -maxBreite / 2; tiefe = 0; }
      zeile.push(g);
      x += s.l + SICHER;
      tiefe = Math.max(tiefe, s.b);
    }
    ablegen();
  }
  if (!teile.length) return park;
  // Die Fläche umfasst auch die 5 m Anlauf vor jeder freien Rampe (F03)
  const vorlaeufig = { ...park, teile };
  const zonen = teile.flatMap((t) => {
    const m = ctx.masse[t.slug];
    if (art(t.slug, ctx) !== 'rampe' || !m.hoch || !hochAchsig(m)) return [];
    const vorne = seiteIn(t, m, mal(hochWelt(t, m)!, -1));
    return anliegend(vorne, t.id, vorlaeufig, ctx) ? [] : zoneVor(vorne, ANLAUF - SICHER);
  });
  const b = box([...teile.flatMap((t) => umriss(t, ctx)), ...zonen]);
  const zentriert = verschiebe(teile, { x: -(b.x0 + b.x1) / 2, z: -(b.z0 + b.z1) / 2 });
  const l = aufRaster(b.x1 - b.x0 + 2 * SICHER);
  const br = aufRaster(b.z1 - b.z0 + 2 * SICHER);
  const flaeche = flaecheBehalten
    ? { ...park.flaeche, l: Math.max(park.flaeche.l, l), b: Math.max(park.flaeche.b, br) }
    : { ...park.flaeche, l, b: br };
  return allesBeheben({ flaeche, teile: zentriert }, ctx);
};

// ---------- Vorlagen (Konzept Abschnitt 4) ----------

export interface Vorlage { id: string; name: string; text: string; bausteine: string[]; einzel: string[] }
export const VORLAGEN: Vorlage[] = [
  { id: 'klein', name: 'Klein · Starter', text: 'Für Schulhof oder Dorfplatz. Niedrige Höhen, eine Jump-Box und eine Street-Linie.', bausteine: ['jumpbox-45'], einzel: ['curb-250', 'rail-300'] },
  { id: 'mittel', name: 'Mittel · Plaza', text: 'Für Jugendzentrum und Freizeitgelände. Zwei Jump-Boxen, Spine und Street-Linie.', bausteine: ['jumpbox-60', 'spine-98', 'jumpbox-75', 'ollybox'], einzel: ['rail-300'] },
  { id: 'gross', name: 'Groß · Park', text: 'Aufbau wie gebaute A+-Parks: Pyramide, Quarterramp, Spine, Wallride und eine lange Street-Linie.', bausteine: ['pyramide-75', 'quarter-125', 'spine-125', 'jumpbox-60', 'jumpbox-75', 'jumpbox-45', 'wallride', 'ollybox'], einzel: ['rail-300', 'rail-550', 'curb-300', 'slide-bar-300', 'manual-pad-250', 'ledge-lang-98-40'] },
];

export const vorlageBauen = (v: Vorlage, ctx: Ctx): Park => {
  let teile: Teil[] = [];
  let x = 0;
  for (const id of v.bausteine) {
    const g = BAUSTEINE.find((b) => b.id === id)?.bauen(ctx);
    if (!g) continue;
    // nebeneinander mit großem Abstand ablegen, damit jede Gruppe für sich bleibt; anordnen() verteilt danach
    const s = groesse(g, ctx);
    teile = [...teile, ...setze(g, ctx, x, 0)];
    x += s.l + 10;
  }
  for (const slug of v.einzel) {
    if (!ctx.masse[slug]) continue;
    const g = [teil(slug)];
    const s = groesse(g, ctx);
    teile = [...teile, ...setze(g, ctx, x, 0)];
    x += s.l + 10;
  }
  return anordnen({ flaeche: { l: 100, b: 100, angeboescht: false }, teile }, ctx);
};
export const LEER: Park = { flaeche: { l: 25, b: 15, angeboescht: false }, teile: [] };

// ---------- Stückliste ----------

export interface Zeile { slug: string | null; code: string; name: string; menge: number; kg: number | null; auto: boolean }

export const stueckliste = (park: Park, ctx: Ctx): Zeile[] => {
  const ab = abgeleitet(park, ctx);
  const mengen = new Map<string, { menge: number; auto: boolean }>();
  const zaehle = (slug: string, auto: boolean) => {
    const z = mengen.get(slug) ?? { menge: 0, auto };
    mengen.set(slug, { menge: z.menge + 1, auto: z.auto && auto });
  };
  park.teile.forEach((t) => zaehle(t.slug, false));
  ab.gelaender.forEach((g) => zaehle(g.slug, true));
  ab.keile.forEach((k) => zaehle(k.slug, true));
  const reihenfolge = (slug: string) => { const g = ctx.info[slug]?.gruppe ?? ''; return GRUPPEN.indexOf(g); };
  const zeilen: Zeile[] = [...mengen.entries()]
    .sort(([a], [b]) => reihenfolge(a) - reihenfolge(b) || (ctx.info[a]?.code ?? a).localeCompare(ctx.info[b]?.code ?? b))
    .map(([slug, z]) => {
      const i = ctx.info[slug];
      return { slug, code: i?.code ?? '', name: i?.name ?? slug, menge: z.menge, kg: i?.kg ? i.kg * z.menge : null, auto: z.auto };
    });
  if (park.teile.length) zeilen.push({ slug: null, code: 'SHS', name: tt('Hinweisschild nach DIN EN 14974', 'Information sign to EN 14974', "Panneau d'information selon EN 14974"), menge: 1, kg: null, auto: true }); // P01
  if (park.teile.filter((t) => t.slug.startsWith('corner-') && !t.slug.startsWith('corner-table')).length >= 12) {
    zeilen.push({ slug: null, code: tt('bauseits', 'by client', 'client'), name: tt('Bowl: Bodenplatte 15 cm bewehrt, Innenfläche ausbetoniert, befahrbarer Gully', 'Bowl: reinforced base slab 15 cm, interior concreted, rideable drain', 'Bowl : dalle de fond armée de 15 cm, surface intérieure bétonnée, avaloir roulable'), menge: 1, kg: null, auto: true });
  }
  return zeilen;
};
const GRUPPEN = ['Tables', 'Banks', 'Pyramid Hips', 'Corner', 'Coping Ramps', 'Quarterramps und Walls', 'Kegel und Cross-Ramps', 'Jump-Ramps, Anlaufkeile, Wave', 'Stairs', 'Ledges, Curbs, Flats', 'Rails und Slides', 'Geländer'];

export const csv = (zeilen: Zeile[]) => {
  const kopf = [tt('Code', 'Code', 'Code'), tt('Bezeichnung', 'Description', 'Désignation'), tt('Menge', 'Quantity', 'Quantité'), tt('Gewicht kg', 'Weight kg', 'Poids kg'), tt('Automatisch ergänzt', 'Added automatically', 'Ajouté automatiquement')];
  const z = zeilen.map((r) => [r.code, r.name, r.menge, r.kg ?? '', r.auto ? tt('ja', 'yes', 'oui') : '']);
  return [kopf, ...z].map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(';')).join('\r\n');
};

// ---------- Teilen-Link und Speichern ----------

const b64 = (s: string) => btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64 = (s: string) => atob(s.replace(/-/g, '+').replace(/_/g, '/'));

export const kodieren = (park: Park) => b64(JSON.stringify({
  f: [park.flaeche.l, park.flaeche.b, park.flaeche.angeboescht ? 1 : 0],
  t: park.teile.map((t) => [t.slug, Math.round(t.x * 100), Math.round(t.z * 100), Math.round(t.rot * 10), ...(t.gel === undefined ? [] : [t.gel ? 1 : 0])]),
}));
export const dekodieren = (s: string, ctx: Ctx): Park | null => {
  try {
    const d = JSON.parse(unb64(s));
    const [l, b, a] = d.f;
    const teile: Teil[] = (d.t as [string, number, number, number, number?][])
      .filter(([slug]) => ctx.masse[slug])
      .map(([slug, x, z, r, g]) => ({ id: neueId(), slug, x: x / 100, z: z / 100, rot: r / 10, ...(g === undefined ? {} : { gel: g === 1 }) }));
    if (!(l > 0 && b > 0)) return null;
    return { flaeche: { l: Math.min(l, 200), b: Math.min(b, 200), angeboescht: !!a }, teile };
  } catch {
    return null;
  }
};

// Texte der Bausteine und Vorlagen stehen deutsch im Code; hier die englischen und französischen Fassungen
const TEXTE: Record<string, [string, string]> = {
  'Table, Bank und Jump-Ramp, 45 cm': ['Table, bank and jump ramp, 45 cm', 'Table, bank et jump ramp, 45 cm'],
  'Table, Bank und Jump-Ramp, 60 cm': ['Table, bank and jump ramp, 60 cm', 'Table, bank et jump ramp, 60 cm'],
  'Table, Bank und Jump-Ramp, 75 cm': ['Table, bank and jump ramp, 75 cm', 'Table, bank et jump ramp, 75 cm'],
  '2 Coping Ramps Rücken an Rücken': ['2 coping ramps back to back', '2 rampes à coping dos à dos'],
  '4 Coping Ramps, 2,5 m breit': ['4 coping ramps, 2.5 m wide', '4 rampes à coping, 2,5 m de large'],
  '6 Coping Ramps, 3,75 m breit': ['6 coping ramps, 3.75 m wide', '6 rampes à coping, 3,75 m de large'],
  '2 Tables, 6 Banks, 4 Pyramid Hips': ['2 tables, 6 banks, 4 pyramid hips', '2 tables, 6 banks, 4 pyramid hips'],
  '3 Coping Ramps mit Podest, ohne Geländer': ['3 coping ramps with platform, no railing', '3 rampes à coping avec plateforme, sans garde-corps'],
  '3 Coping Ramps mit Podest und Geländer': ['3 coping ramps with platform and railing', '3 rampes à coping avec plateforme et garde-corps'],
  'Manual Pad mit Ledge': ['Manual pad with ledge', 'Manual pad avec ledge'],
  'Wall mit Wall-Ramp': ['Wall with wall ramp', 'Mur avec wall ramp'],
  '4 Quarterramps mit Flats, 3,75 m breit': ['4 quarter ramps with flats, 3.75 m wide', '4 quarters avec plats, 3,75 m de large'],
  '4 Quarterramps mit Flats, 5 m breit': ['4 quarter ramps with flats, 5 m wide', '4 quarters avec plats, 5 m de large'],
  '4 Quarterramps 255 mit Flats, 5 m breit': ['4 quarter ramps 255 with flats, 5 m wide', '4 quarters 255 avec plats, 5 m de large'],
  'Runde Ecken aus Corners, außen ca. 9,0 × 7,7 m': ['Rounded corners made of corner elements, approx. 9.0 × 7.7 m outside', "Angles arrondis en éléments corner, env. 9,0 × 7,7 m à l'extérieur"],
  'Runde Ecken aus Corners, außen ca. 11,5 × 9,0 m': ['Rounded corners made of corner elements, approx. 11.5 × 9.0 m outside', "Angles arrondis en éléments corner, env. 11,5 × 9,0 m à l'extérieur"],
  'Runde Ecken aus Corners, außen ca. 12,5 × 10,0 m, mit Geländer': ['Rounded corners made of corner elements, approx. 12.5 × 10.0 m outside, with railing', "Angles arrondis en éléments corner, env. 12,5 × 10,0 m à l'extérieur, avec garde-corps"],
  'Bowl 98 klein': ['Bowl 98 small', 'Bowl 98 petit'],
  'Klein · Starter': ['Small · Starter', 'Petit · Starter'],
  'Mittel · Plaza': ['Medium · Plaza', 'Moyen · Plaza'],
  'Groß · Park': ['Large · Park', 'Grand · Park'],
  'Für Schulhof oder Dorfplatz. Niedrige Höhen, eine Jump-Box und eine Street-Linie.': ['For a school playground or village square. Low heights, one jump box and one street line.', "Pour une cour d'école ou une place de village. Faibles hauteurs, une jump box et une ligne street."],
  'Für Jugendzentrum und Freizeitgelände. Zwei Jump-Boxen, Spine und Street-Linie.': ['For a youth centre and leisure grounds. Two jump boxes, a spine and a street line.', 'Pour un centre de jeunesse et un site de loisirs. Deux jump boxes, une spine et une ligne street.'],
  'Aufbau wie gebaute A+-Parks: Pyramide, Quarterramp, Spine, Wallride und eine lange Street-Linie.': ['Layout like built A+ parks: pyramid, quarter ramp, spine, wallride and a long street line.', 'Composition comme les parcs A+ réalisés : pyramide, quarter, spine, wallride et une longue ligne street.'],
};
export const ueberText = (de: string, lang: Lang): string => (lang === 'de' ? de : TEXTE[de]?.[lang === 'en' ? 0 : 1] ?? de);
