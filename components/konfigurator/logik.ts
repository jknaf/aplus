// Logik des Skatepark-Konfigurators, ohne React und ohne three.js.
// Regeln: 08_CAD_Blender/12_Konfigurator/…_Konfigurator_Regelwerk_V01.md (IDs wie A01, G02, F01 stehen an den Stellen).
// Koordinaten in Metern, Fläche liegt mittig um (0, 0), x = Länge, z = Breite, Drehung in Grad um die Hochachse.

import { tt, type Lang } from '../../i18n';

export interface V { x: number; z: number }
export interface Masse { l: number; b: number; h: number; hoch: V | null; niedrig: number }
export interface Info { name: string; code: string; gruppe: string; kg?: number; masse?: string }
export interface Ctx { masse: Record<string, Masse>; info: Record<string, Info> }
// gel: Geländer erzwingen (true) oder abschalten (false); ohne Angabe gilt die Automatik (G01/G02)
export interface Teil { id: string; slug: string; x: number; z: number; rot: number; gel?: boolean; bw?: true }
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
      // B11: Ringteile mit Passstück-Lücke (bis 30 cm Ortbeton) gehören zusammen
      const luecke = RINGTEIL.test(a.slug) && RINGTEIL.test(b.slug) ? 0.3 : BERUEHRT;
      if (!nah(ba, teilBox(b, ctx), luecke)) continue;
      if (finde(a.id) === finde(b.id)) continue;
      if (abstand(umriss(a, ctx), umriss(b, ctx)) < luecke) eltern.set(finde(a.id), finde(b.id));
    }
  }
  const m = new Map<string, Teil[]>();
  for (const t of park.teile) { const w = finde(t.id); const l = m.get(w); if (l) l.push(t); else m.set(w, [t]); }
  const out = [...m.values()];
  gruppenCache.set(park.teile, out);
  return out;
};
// Entgruppieren: Element von seiner Gruppe wegrücken, mit 2 m Luft (Sicherheitsbereich); fehlt dafür Platz, mit 50 cm.
// Zuerst weg von der Gruppenmitte, sonst in die Achsrichtung, die am besten dazu passt; null, wenn im Feld kein Platz ist.
export const entgruppieren = (id: string, park: Park, ctx: Ctx): Teil | null => {
  const t = park.teile.find((x) => x.id === id);
  const andere = (gruppen(park, ctx).find((g) => g.some((x) => x.id === id)) ?? []).filter((x) => x.id !== id);
  if (!t || !andere.length) return null;
  const mitte = mal(andere.reduce((s, x) => plus(s, x), { x: 0, z: 0 }), 1 / andere.length);
  const weg = minus(t, mitte);
  const haupt = laenge(weg) > 0.01 ? mal(weg, 1 / laenge(weg)) : { x: 1, z: 0 };
  const achsen: V[] = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
  const richtungen = [haupt, ...achsen.sort((a, b) => skalar(b, haupt) - skalar(a, haupt))];
  const rest = park.teile.filter((x) => x.id !== id).map((x) => umriss(x, ctx));
  for (const luft of [2, 0.5]) for (let d = 0.25; d <= 15; d += 0.25) for (const r of richtungen) {
    const neu = { ...t, x: r3(t.x + r.x * d), z: r3(t.z + r.z * d) };
    const u = umriss(neu, ctx);
    if (imFeld(u, park.flaeche) && rest.every((o) => abstand(u, o) >= luft - 0.001)) return neu;
  }
  return null;
};
// B09: Bowls werden eingegraben, Oberkante Coping auf Geländehöhe. Bowl = Gruppe mit Kurvenstücken, deren Coping-Ring eine Fläche
// umschließt (auch ein geschlossener Snake-Run). Gerechnet im 5-cm-Raster; eine Lücke bis etwa 30 cm gilt als Passstück in Ortbeton.
export interface Bowl { teile: Teil[]; hoehe: Map<string, number>; tief: number; maske: V[][]; passstueck: boolean; offen?: boolean; flaeche: number; drin: (p: V) => boolean }
const ZELLE = 0.05;
const RINGTEIL = /^(coping-ramp|corner|kegel)-/;
const istRingKurve = (slug: string) => istKurve(slug) || slug.startsWith('kegel-');
// r: Aufdicken in Zellen; 3 schließt Passstück-Lücken bis 30 cm, ein großes r schließt den Ring über eine gelöschte Stelle hinweg
const bowlAus = (g: Teil[], ctx: Ctx, r = 3): Bowl | null => {
  const polys = g.map((t) => umriss(t, ctx));
  const b = box(polys.flat());
  const rand = 0.6 + r * ZELLE;
  const x0 = b.x0 - rand;
  const z0 = b.z0 - rand;
  const nx = Math.ceil((b.x1 - x0 + rand) / ZELLE);
  const nz = Math.ceil((b.z1 - z0 + rand) / ZELLE);
  const mitte = (i: number, j: number): V => ({ x: x0 + (i + 0.5) * ZELLE, z: z0 + (j + 0.5) * ZELLE });
  // acht Nachbarn, damit das Zurückwachsen das quadratische Aufdicken genau umkehrt (auch an schrägen Corner-Kanten)
  const nachbar = (c: number, f: (d: number) => boolean) => {
    const i = c % nx;
    for (let dj = -nx; dj <= nx; dj += nx) for (let di = i > 0 ? -1 : 0; di <= (i < nx - 1 ? 1 : 0); di++) { const d = c + dj + di; if (d !== c && d >= 0 && d < nx * nz && f(d)) return true; }
    return false;
  };
  const teilVon = new Int32Array(nx * nz).fill(-1);
  polys.forEach((p, k) => {
    const pb = box(p);
    for (let j = Math.max(0, Math.floor((pb.z0 - z0) / ZELLE)); j <= Math.min(nz - 1, Math.floor((pb.z1 - z0) / ZELLE)); j++) {
      for (let i = Math.max(0, Math.floor((pb.x0 - x0) / ZELLE)); i <= Math.min(nx - 1, Math.floor((pb.x1 - x0) / ZELLE)); i++) {
        if (teilVon[j * nx + i] < 0 && innen(mitte(i, j), p)) teilVon[j * nx + i] = k;
      }
    }
  });
  // Innenfläche: größte Zusammenhangsfläche, die von außen nicht erreichbar ist, wenn die Teile um r Zellen aufgedickt sind
  const innenFlaeche = (r: number) => {
    const sperre = new Uint8Array(nx * nz);
    const zeile = new Uint8Array(nx * nz);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) if (teilVon[j * nx + i] >= 0) for (let a = Math.max(0, i - r); a <= Math.min(nx - 1, i + r); a++) zeile[j * nx + a] = 1;
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) if (zeile[j * nx + i]) for (let c = Math.max(0, j - r); c <= Math.min(nz - 1, j + r); c++) sperre[c * nx + i] = 1;
    const marke = new Int32Array(nx * nz); // 0 offen, -1 außen, >0 Innenfläche Nr.
    const flute = (start: number, wert: number) => {
      let n = 0;
      const stapel = [start];
      marke[start] = wert;
      while (stapel.length) {
        const c = stapel.pop()!;
        n++;
        const i = c % nx;
        for (const d of [i > 0 ? c - 1 : -1, i < nx - 1 ? c + 1 : -1, c - nx, c + nx]) {
          if (d < 0 || d >= nx * nz || marke[d] || sperre[d]) continue;
          marke[d] = wert;
          stapel.push(d);
        }
      }
      return n;
    };
    for (let i = 0; i < nx; i++) for (const c of [i, (nz - 1) * nx + i]) if (!marke[c] && !sperre[c]) flute(c, -1);
    for (let j = 0; j < nz; j++) for (const c of [j * nx, j * nx + nx - 1]) if (!marke[c] && !sperre[c]) flute(c, -1);
    // Außen um r Zellen zurück an die Teile wachsen lassen; was dann nicht außen und kein Teil ist, gehört zur Innenfläche.
    // So bleiben auch schmale Buchten innen erhalten, und an einer Lücke im Ring wächst außen nur r Zellen hinein.
    const aussen = new Uint8Array(nx * nz);
    for (let c = 0; c < nx * nz; c++) if (marke[c] === -1) aussen[c] = 1;
    for (let k = 0; k < r; k++) {
      const neu = aussen.slice();
      for (let c = 0; c < nx * nz; c++) if (!aussen[c] && teilVon[c] < 0 && nachbar(c, (d) => aussen[d] === 1)) neu[c] = 1;
      aussen.set(neu);
    }
    // größte zusammenhängende Innenfläche (4 Nachbarn, Teile trennen)
    const nr = new Int32Array(nx * nz);
    let beste = 0;
    let groesse = 0;
    for (let c0 = 0, z = 0; c0 < nx * nz; c0++) {
      if (nr[c0] || aussen[c0] || teilVon[c0] >= 0) continue;
      let n = 0;
      const stapel = [c0];
      nr[c0] = ++z;
      while (stapel.length) {
        const c = stapel.pop()!;
        n++;
        const i = c % nx;
        for (const d of [i > 0 ? c - 1 : -1, i < nx - 1 ? c + 1 : -1, c - nx, c + nx]) {
          if (d < 0 || d >= nx * nz || nr[d] || aussen[d] || teilVon[d] >= 0) continue;
          nr[d] = z;
          stapel.push(d);
        }
      }
      if (n > groesse) { groesse = n; beste = z; }
    }
    if (groesse * ZELLE * ZELLE < 1) return null;
    const drin = new Uint8Array(nx * nz);
    for (let c = 0; c < nx * nz; c++) if (nr[c] === beste) drin[c] = 1;
    return drin;
  };
  const drin = innenFlaeche(r);
  if (!drin) return null;
  // Ringteile, die an die Innenfläche grenzen; dazu die Tables, die an einem dieser Ringteile liegen. Außen angedockte Elemente bleiben oben.
  const amRand = new Set<number>();
  for (let c = 0; c < nx * nz; c++) {
    if (!drin[c]) continue;
    nachbar(c, (d) => { if (teilVon[d] >= 0) amRand.add(teilVon[d]); return false; });
  }
  const ring = [...amRand].map((k) => g[k]).filter((t) => RINGTEIL.test(t.slug) && !t.slug.startsWith('corner-table'));
  if (!ring.some((t) => istRingKurve(t.slug))) return null;
  const hoehe = new Map(ring.map((t) => [t.id, ctx.masse[t.slug].h]));
  for (const t of g) {
    if (hoehe.has(t.id) || !/^(table|corner-table)-/.test(t.slug)) continue;
    const an = ring.filter((r) => nah(teilBox(t, ctx), teilBox(r, ctx), BERUEHRT) && abstand(umriss(t, ctx), umriss(r, ctx)) < BERUEHRT);
    if (an.length) hoehe.set(t.id, Math.max(...an.map((r) => ctx.masse[r.slug].h)));
  }
  const teile = g.filter((t) => hoehe.has(t.id));
  const maske: V[][] = teile.map((t) => umriss(t, ctx));
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      if (!drin[j * nx + i]) continue;
      let e = i;
      while (e + 1 < nx && drin[j * nx + e + 1]) e++;
      const a = { x: x0 + i * ZELLE - ZELLE, z: z0 + j * ZELLE - ZELLE / 2 };
      const o = { x: x0 + (e + 1) * ZELLE + ZELLE, z: z0 + (j + 1) * ZELLE + ZELLE / 2 };
      maske.push([a, { x: o.x, z: a.z }, o, { x: a.x, z: o.z }]);
      i = e;
    }
  }
  const zelle = (p: V) => { const i = Math.floor((p.x - x0) / ZELLE); const j = Math.floor((p.z - z0) / ZELLE); return i >= 0 && j >= 0 && i < nx && j < nz ? j * nx + i : -1; };
  return {
    teile, hoehe, maske,
    tief: Math.max(...hoehe.values()),
    flaeche: drin.reduce((n, x) => n + x, 0) * ZELLE * ZELLE,
    passstueck: !innenFlaeche(1), // ohne Aufdicken nicht geschlossen: Lücke im Coping-Ring
    drin: (p) => { const c = zelle(p); return c >= 0 && (!!drin[c] || (teilVon[c] >= 0 && hoehe.has(g[teilVon[c]].id))); },
  };
};
const bowlCache = new WeakMap<Teil[], Bowl[]>();
export const bowls = (park: Park, ctx: Ctx): Bowl[] => {
  let b = bowlCache.get(park.teile);
  if (!b) {
    b = gruppen(park, ctx).filter((g) => g.some((t) => istRingKurve(t.slug))).map((g) => mitGemerkten(bowlAus(g, ctx), g, ctx) ?? offenerBowl(g, ctx)).filter((x): x is Bowl => !!x);
    bowlCache.set(park.teile, b);
  }
  return b;
};
// Teile, die schon eingegraben waren (bw), bleiben es, auch wenn die Erkennung sie nach einer Änderung nicht mehr dem Ring zuordnet
const mitGemerkten = (b: Bowl | null, g: Teil[], ctx: Ctx): Bowl | null => {
  const dazu = b ? g.filter((t) => t.bw && !b.hoehe.has(t.id)) : [];
  if (!b || !dazu.length) return b;
  for (const t of dazu) { b.hoehe.set(t.id, ctx.masse[t.slug].h); b.teile.push(t); b.maske.push(umriss(t, ctx)); }
  return b;
};
// Ring offen (z. B. ein Teil gelöscht): Teile, die schon im Bowl lagen (bw), bleiben eingegraben, solange eine Kurve davon in der Gruppe ist.
// Die Innenfläche wird über die Lücke hinweg erkannt (bis etwa 3 m), sonst liegt der Boden auf Geländehöhe.
const offenerBowl = (g: Teil[], ctx: Ctx): Bowl | null => {
  const teile = g.filter((t) => t.bw);
  if (!teile.some((t) => istRingKurve(t.slug))) return null;
  // Ein zu kleines r lässt außen durch die Lücke hinein und findet nur einen Teil der Innenfläche: das r mit der größten Fläche gilt
  let best: Bowl | null = null;
  let flaeche = 0;
  for (const r of [8, 14, 20, 30]) {
    const b = bowlAus(g, ctx, r);
    if (b && b.flaeche > flaeche) { best = b; flaeche = b.flaeche; }
  }
  const weit = mitGemerkten(best, g, ctx);
  if (weit) return { ...weit, passstueck: false, offen: true };
  const hoehe = new Map(teile.map((t) => [t.id, ctx.masse[t.slug].h]));
  const maske = teile.map((t) => umriss(t, ctx));
  return { teile, hoehe, maske, tief: Math.max(...hoehe.values()), passstueck: false, offen: true, flaeche: 0, drin: (p) => maske.some((u) => innen(p, u)) };
};
// Merkt am Teil, dass es im alten Stand eingegraben war; so springt ein Bowl beim Löschen oder Umbauen nicht wieder hoch.
export const eingraben = (alt: Park, neu: Park, ctx: Ctx): Park => {
  const tief = tiefen(alt, ctx);
  return neu.teile.some((t) => !t.bw && tief.has(t.id)) ? { ...neu, teile: neu.teile.map((t) => (!t.bw && tief.has(t.id) ? { ...t, bw: true } : t)) } : neu;
};
export const tiefen = (park: Park, ctx: Ctx) => new Map(bowls(park, ctx).flatMap((b) => [...b.hoehe]));

// ---------- Automatik: Geländer, Anlaufkeile, Pflichtteile (Abschnitte 3, 4, 7) ----------

export interface Zusatz { slug: string; x: number; z: number; rot: number; y?: number }
export interface Abgeleitet { gelaender: Zusatz[]; keile: Zusatz[] }

const GELAENDER: [number, string][] = [[5, 'gelaender-500'], [3.75, 'gelaender-375'], [2.5, 'gelaender-250'], [1.25, 'gelaender-125']];
// Seite der Pfosten mit Fußplatte im Modell (gemessen; das 250er ist gegenüber 375/500 gespiegelt).
// Pfosten nach außen, die Stabfüllung zur Fahrfläche (Joachim, 10.11.2026).
const PFOSTEN: Record<string, V> = {
  'gelaender-125': { x: 0, z: -1 }, 'gelaender-250': { x: -1, z: 0 }, 'gelaender-375': { x: 1, z: 0 }, 'gelaender-500': { x: 1, z: 0 },
  'gelaender-ende-links': { x: 0, z: -1 }, 'gelaender-ende-rechts': { x: 0, z: -1 }, 'gelaender-einzl': { x: 0, z: -1 },
};
const nachAussen = (slug: string, aussen: V) => norm360(winkel(aussen) - winkel(PFOSTEN[slug]));
// Montage wie in den Archicad-Katalogparks (gemessen 13.11.2026): Geländer seitlich an der Außenwand verschraubt,
// Handlauf genau über der Kante, Feldmitte 3,2 cm außerhalb, Fuß 13 cm (Tables) bzw. 15 cm (Rampen) unter der Oberkante.
const HANDLAUF = 0.032;
const SENKUNG = { plattform: 0.13, rampe: 0.15 } as const;
// Tiefe der ebenen Plattform hinter dem Coping, ab Rückkante aus den Modellen gemessen. Ihre Seiten brauchen Geländer.
const PLATEAU: Record<string, number> = { 'quarterramp-165': 1.33, 'quarterramp-165-p': 1.33, 'quarterramp-200': 1.33, 'quarterramp-255': 1.32, 'bigbank-165': 1.14, 'bigbank-200': 1.31 };

// B09: im eingegrabenen Bowl keine Fallhöhe nach außen, also kein Geländer von selbst (EN 3.14); der Schalter An bleibt
const braucht = (t: Teil, m: Masse, park: Park, tief = 0) => (t.gel !== undefined ? t.gel : !park.flaeche.angeboescht && !tief && m.h >= 1.0);
export const abgeleitet = (park: Park, ctx: Ctx): Abgeleitet => {
  const tief = tiefen(park, ctx);
  const oben = (o: Teil) => ctx.masse[o.slug].h - (tief.get(o.id) ?? 0);
  // G06: kein Geländer, wo ein Teil andockt, das höchstens 1,00 m tiefer liegt; liegt es mehr als 1 m tiefer, bleibt das Geländer.
  // shortcut: Nachbarhöhe = seine Oberkante, nicht die Höhe genau an der Stoßkante; stimmt für Tables und Rampen, die mit der hohen Seite andocken
  const zu = (s: Seite, t: Teil) => { const nb = anliegend(s, t.id, park, ctx); return !!nb && oben(t) - oben(nb) <= 1.0; };
  const strecken: { a: V; b: V; n: V; y: number }[] = [];
  const keile: Zusatz[] = [];
  for (const t of park.teile) {
    const m = ctx.masse[t.slug];
    const a = art(t.slug, ctx);
    // G01/G02: Plattformen über 1 m Fallhöhe, bei Rampen nur die hohe Rückseite; per Schalter erzwingen oder abschalten
    if (braucht(t, m, park, tief.get(t.id)) && !istKurve(t.slug) && (a === 'plattform' || (a === 'rampe' && m.hoch && hochAchsig(m)))) {
      const kandidaten = a === 'plattform' ? seiten(t, m) : [seiteIn(t, m, hochWelt(t, m)!)];
      for (const s of kandidaten) {
        if (zu(s, t)) continue;
        const h = mal(s.tangente, s.laenge / 2);
        strecken.push({ a: minus(s.mitte, h), b: plus(s.mitte, h), n: s.normale, y: m.h - (tief.get(t.id) ?? 0) - SENKUNG[a] });
      }
      // G08 (EN 6.2.6, Bild 5): Grenzt eine bis 1 m tiefere Plattform ohne eigenes Geländer an (Extension), läuft das Geländer
      // der freien Nachbarseiten auf der unteren Stufe ein Raster (1,25 m, also mindestens 1 m) weiter
      if (a === 'plattform') for (const s of seiten(t, m)) {
        const nb = anliegend(s, t.id, park, ctx);
        if (!nb || art(nb.slug, ctx) !== 'plattform') continue;
        const d = oben(t) - oben(nb);
        if (d <= 0.05 || d > 1.0 || braucht(nb, ctx.masse[nb.slug], park, tief.get(nb.id))) continue;
        for (const q of seiten(t, m)) {
          if (Math.abs(skalar(q.normale, s.normale)) > 0.5 || zu(q, t)) continue;
          const ecke = plus(q.mitte, mal(s.normale, q.laenge / 2));
          const mitte = plus(ecke, mal(s.normale, 0.625));
          if (!innen(minus(mitte, mal(q.normale, 0.1)), umriss(nb, ctx))) continue; // untere Stufe geht dort weiter
          if (park.teile.some((o) => innen(plus(mitte, mal(q.normale, 0.1)), umriss(o, ctx)))) continue; // außen frei
          strecken.push({ a: ecke, b: plus(ecke, mal(s.normale, 1.25)), n: q.normale, y: oben(nb) - SENKUNG.plattform });
        }
      }
      // Seitlich der Plattform einer Rampe, nur so tief wie die Plattform, ab der hohen Rückkante
      const plateau = a === 'rampe' ? PLATEAU[t.slug] : 0;
      if (plateau) {
        const hw = hochWelt(t, m)!;
        for (const s of seiten(t, m)) {
          if (Math.abs(skalar(s.normale, hw)) > 0.5 || zu(s, t)) continue;
          const ecke = plus(s.mitte, mal(hw, s.laenge / 2));
          strecken.push({ a: ecke, b: minus(ecke, mal(hw, plateau)), n: s.normale, y: m.h - (tief.get(t.id) ?? 0) - SENKUNG.rampe });
        }
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
    if (!t.slug.startsWith('corner-table') || !braucht(t, ctx.masse[t.slug], park, tief.get(t.id))) continue;
    const y = ctx.masse[t.slug].h - (tief.get(t.id) ?? 0) - SENKUNG.plattform;
    const k = KURVE[t.slug];
    const halb = (k.von + k.bis) / 2;
    const aussen = drehe(polar(halb, 1), t.rot);
    const mitteAussen = plus(t, drehe(plus(k.c, polar(halb, k.R)), t.rot));
    if (park.teile.some((o) => o.id !== t.id && innen(plus(mitteAussen, mal(aussen, 0.1)), umriss(o, ctx)))) continue;
    if (t.slug === 'corner-table-150' && ctx.masse['gelaender-sger-150']) {
      // Lage im Table-Corner-Modell ausgeglichen (13.11.2026): Handlauf ±2 cm auf der Außenkante, Enden je 11 cm vor dem Table-Ende
      const p = plus(t, drehe({ x: 0.565, z: -0.014 }, t.rot));
      rund.push({ slug: 'gelaender-sger-150', x: r3(p.x), z: r3(p.z), rot: norm360(t.rot + 300), y });
    } else if (ctx.masse['gelaender-125']) {
      // ponytail: für den Table Corner 98 gibt es im Katalog kein Rundgeländer; zwei gerade 125er entlang des Bogens, A+ prüft im Angebot
      for (const w of [k.von + (k.bis - k.von) / 4, k.von + (3 * (k.bis - k.von)) / 4]) {
        const r = drehe(polar(w, 1), t.rot);
        const p = plus(plus(t, drehe(plus(k.c, polar(w, k.R)), t.rot)), mal(r, HANDLAUF));
        rund.push({ slug: 'gelaender-125', x: r3(p.x), z: r3(p.z), rot: nachAussen('gelaender-125', r), y });
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
        const mitte = plus(plus(l.a, mal(t, pos + Math.min(len, frei) / 2)), mal(l.n, HANDLAUF));
        const rot = nachAussen(slug, l.n);
        gelaender.push({ slug, x: r3(mitte.x), z: r3(mitte.z), rot, y: l.y });
      }
      pos += len;
    }
  }
  const felder = [...rundeEnden(gelaender, rund, ctx), ...rund];
  return { gelaender: [...felder, ...verbinder(felder, ctx)], keile };
};

// Die Geländerfelder sind kürzer als ihr Rastermaß (375er: 3,53 m), die Lücke schließt der Verbinder (22 cm).
// Er sitzt an jedem Stoß zweier Felder, auch zwischen geraden und runden Geländern; knickt der Lauf, der 90°-Verbinder.
// ponytail: Stoß = Feldenden näher als 40 cm, Verbinder mittig dazwischen; Endteile an freien Enden fehlen noch, A+ ergänzt im Angebot
// Rundgeländer: Handlauf-Enden und Bogenmitte im Modell (gemessen 13.11.2026)
const RUND: Record<string, { enden: V[]; mitte: V }> = { 'gelaender-sger-150': { enden: [{ x: 0.997, z: 0.264 }, { x: -0.982, z: -0.266 }], mitte: { x: -1.092, z: 4.103 } } };
const feldEnden = (z: Zusatz, ctx: Ctx): { p: V; r: V }[] => {
  const rund = RUND[z.slug];
  if (rund) return rund.enden.map((e) => {
    const radial = drehe(minus(e, rund.mitte), z.rot);
    return { p: plus(z, drehe(e, z.rot)), r: mal({ x: -radial.z, z: radial.x }, 1 / laenge(radial)) }; // Tangente am Ende
  });
  const m = ctx.masse[z.slug];
  const w = z.rot + (m.l >= m.b ? 0 : 90);
  const r = polar(w, 1);
  const halb = mal(r, Math.max(m.l, m.b) / 2);
  const achse = PFOSTEN[z.slug] ? minus(z, mal(drehe(PFOSTEN[z.slug], z.rot), HANDLAUF)) : z; // Handlauf liegt innen neben der Feldmitte
  // Endstücke: nur das offene Ende zählt (Bogen bei „Ende links“ an +x, bei „Ende rechts“ an -x, „einzl“ beidseitig)
  const offen = { 'gelaender-ende-links': [false, true], 'gelaender-ende-rechts': [true, false], 'gelaender-einzl': [false, false] }[z.slug] ?? [true, true];
  return [{ p: plus(achse, halb), r }, { p: minus(achse, halb), r }].filter((_, k) => offen[k]);
};
// Regel G10 (Joachim, 13.11.2026): Wo ein Geländer aufhört, ist es gerundet. Das letzte 1,25-m-Raster eines freien Endes wird
// zum Endstück (Bogen im Modell: „Ende links“ an +x, „Ende rechts“ an -x), ein einzelnes freies Feld zum beidseitig runden „einzl“.
// Das offene Ende sitzt wie ein Feldende, der Bogen ragt 9,3 cm weiter (in den Katalogparks 7–8 cm über die Kante).
// shortcut: Rundgeländer SGER-150 hat kein Endstück und bleibt offen, bis A+ eins liefert
const FELD_RASTER: Record<string, number> = Object.fromEntries(GELAENDER.map(([l, sl]) => [sl, l]));
const BOGEN = 0.608 - 0.515;
const rundeEnden = (gerade: Zusatz[], rund: Zusatz[], ctx: Ctx): Zusatz[] => {
  if (!ctx.masse['gelaender-ende-links'] || !ctx.masse['gelaender-ende-rechts'] || !ctx.masse['gelaender-einzl']) return gerade;
  const alle = [...gerade, ...rund];
  const enden = alle.flatMap((z, i) => feldEnden(z, ctx).map((e) => ({ ...e, i, y: z.y ?? 0 })));
  const frei = (i: number, p: V, y: number) => !enden.some((e) => e.i !== i && laenge(minus(e.p, p)) < 0.4 && Math.abs(e.y - y) < 0.05);
  return gerade.flatMap((z, i) => {
    const L = FELD_RASTER[z.slug];
    if (!L) return [z];
    const [a, b] = feldEnden(z, ctx); // a am +r-Ende, b am -r-Ende
    const fa = frei(i, a.p, z.y ?? 0), fb = frei(i, b.p, z.y ?? 0);
    if (!fa && !fb) return [z];
    const r = a.r;
    const aussen = drehe(PFOSTEN[z.slug], z.rot);
    const teil = (slug: string, d: number): Zusatz => ({ ...z, slug, x: r3(z.x + r.x * d), z: r3(z.z + r.z * d), rot: nachAussen(slug, aussen) });
    if (L < 1.3 && fa && fb) return [teil('gelaender-einzl', 0)];
    const out: Zusatz[] = [];
    for (const sg of [fa ? 1 : 0, fb ? -1 : 0].filter(Boolean)) {
      const links = teil('gelaender-ende-links', 0);
      const slug = skalar(drehe({ x: 1, z: 0 }, links.rot), mal(r, sg)) > 0 ? 'gelaender-ende-links' : 'gelaender-ende-rechts';
      out.push(teil(slug, sg * (L / 2 - 0.625 + BOGEN)));
    }
    const rest = L - 1.25 * out.length;
    const rs = GELAENDER.find(([g]) => Math.abs(g - rest) < 0.05)?.[1];
    if (rs) out.push(teil(rs, ((fb ? 1 : 0) - (fa ? 1 : 0)) * 0.625));
    return out;
  });
};
const verbinder = (felder: Zusatz[], ctx: Ctx): Zusatz[] => {
  const enden = felder.flatMap((z, i) => feldEnden(z, ctx).map((e) => ({ ...e, i, y: z.y ?? 0 })));
  const paare: { a: number; b: number; d: number }[] = [];
  for (let a = 0; a < enden.length; a++) for (let b = a + 1; b < enden.length; b++) {
    const d = laenge(minus(enden[a].p, enden[b].p));
    if (enden[a].i !== enden[b].i && d < 0.4 && Math.abs(enden[a].y - enden[b].y) < 0.05) paare.push({ a, b, d }); // nur gleiche Höhe
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
    const y = Math.max(ea.y, eb.y);
    if (!knick) {
      const mitte = mal(plus(ea.p, eb.p), 0.5);
      out.push({ slug, x: r3(mitte.x), z: r3(mitte.z), rot: norm360(winkel(skalar(ea.r, eb.r) > 0 ? plus(ea.r, eb.r) : minus(ea.r, eb.r))), y });
      continue;
    }
    // 90°-Bogen: im Modell treffen sich die Handlaufachsen bei (4,6 | 4,6 cm), die Schenkel laufen nach -x und -z.
    // Ecke = Schnitt der beiden Handläufe; das Modell so drehen, dass die Schenkel zu den Feldenden zeigen.
    const ecke = plus(ea.p, mal(ea.r, skalar(minus(eb.p, ea.p), ea.r)));
    const zuA = minus(ea.p, ecke), zuB = minus(eb.p, ecke);
    let rot = norm360(winkel(zuB) - 180);
    if (skalar(drehe({ x: 0, z: -1 }, rot), zuA) < 0) rot = norm360(winkel(zuA) - 180);
    const p = minus(ecke, drehe({ x: 0.046, z: 0.046 }, rot));
    out.push({ slug, x: r3(p.x), z: r3(p.z), rot, y });
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
  for (const b of bowls(park, ctx)) {
    if (b.offen) out.push({ id: `bowloffen-${b.teile[0].id}`, stufe: 'gelb', teile: b.teile.map((t) => t.id), text: tt('Bowl-Ring ist offen: Lücke mit Coping Ramp oder Corner schließen.', 'The bowl ring is open: close the gap with a coping ramp or corner.', "L'anneau du bowl est ouvert : fermez l'espace avec une coping ramp ou un corner.") });
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
  { id: 'bowl-98-niere', name: 'Bowl 98 Niere', text: 'Nase aus 2 Kegeln, Passstück in Ortbeton', seite: 'K S. 4, 41', bauen: (ctx) => niere(98, ctx) },
  { id: 'bowl-150-niere', name: 'Bowl 150 Niere', text: 'Nase aus 2 Kegeln', seite: 'K S. 4, 41', bauen: (ctx) => niere(150, ctx) },
  { id: 'bowl-150', name: 'Bowl 150', text: 'Runde Ecken aus Corners, außen ca. 12,5 × 10,0 m', seite: 'K S. 4, 41', bauen: (ctx) => bowl(150, 3, 1, ctx) },
];

// Einzelteile, die der Kunde nicht direkt wählt: Geländer und Anlaufkeile setzt die Automatik, SQR-255 nur in der Pipe (A09)
export const waehlbar = (slug: string, ctx: Ctx) => art(slug, ctx) !== 'auto' && slug !== 'quarterramp-255' && !istKurve(slug);

// Neues Teil oder Baustein in den Park setzen, an einen freien Platz
export const hinzufuegen = (park: Park, neu: Teil[], ctx: Ctx): Park => {
  // Kein Platz mehr frei: Fläche wächst, statt etwas übereinander zu setzen
  let flaeche = park.flaeche;
  let d = freierPlatz(neu, park, ctx);
  // bis 200 m (Grenze wie im Link); vorher war nach 24 Schritten Schluss und ein Bowl landete über den vorhandenen Elementen
  for (let i = 0; !d && (flaeche.l < 200 || flaeche.b < 200); i++) {
    flaeche = i % 2 ? { ...flaeche, b: Math.min(200, flaeche.b + 2 * RASTER) } : { ...flaeche, l: Math.min(200, flaeche.l + 2 * RASTER) };
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
const KURVEN_HOEHEN: Record<string, { corner: string; tisch: string; kegel: string }> = {
  'coping-ramp-98': { corner: 'corner-98', tisch: 'corner-table-98', kegel: 'kegel-98' },
  'coping-ramp-150': { corner: 'corner-150', tisch: 'corner-table-150', kegel: 'kegel-150' },
};
export type Richtung = 'links' | 'rechts';
export interface Anbau { kurve: Richtung[]; aussen: Richtung[]; gerade: Richtung[] }

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
  if (!t || familie(t.slug) !== 'coping-ramp' || !ctx.masse[t.slug]?.hoch) return { kurve: [], aussen: [], gerade: [] };
  const l = rampenLage(t, ctx);
  const frei = (['links', 'rechts'] as Richtung[]).filter((r) => !anliegend(seiteIn(t, l.m, l.seite(r)), t.id, park, ctx));
  const satz = KURVEN_HOEHEN[t.slug];
  return { kurve: satz ? frei : [], aussen: satz && ctx.masse[satz.kegel] ? frei : [], gerade: frei };
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

// Bowl-Ring als Schildkröte: p liegt auf der Coping-Linie, d ist die Laufrichtung, n zeigt nach hinten zu den Tables.
// G: n Coping Ramps mit Table; I: Innenkurve 90° aus 3 Corner mit Table Corner; A: Außenkurve 90° aus 1 Kegel; P: Passstück in Ortbeton (Lücke).
// Der Kegel ist das Coping-Ramp-Profil, gedreht um eine Achse um (Kegelmaß - Rampentiefe) hinter dem Coping: Kegel 98 0,63 m, Kegel 150 0 m.
interface Kurs { p: V; d: V; n: V }
export type Schritt = ['G', number] | ['I'] | ['A'] | ['P', number];
const schritt = (h: 98 | 150, k: Kurs, s: Schritt, teile: Teil[], tische: Teil[], ctx: Ctx): Kurs => {
  const rampe = `coping-ramp-${h}`;
  const m = ctx.masse[rampe];
  const tiefe = Math.abs(m.hoch!.x) > 0.5 ? m.l : m.b;
  const satz = KURVEN_HOEHEN[rampe];
  const rot = (v: V, mm: Masse) => norm360(winkel(v) - winkel(mm.hoch!));
  if (s[0] === 'G') {
    for (let i = 0; i < s[1]; i++) {
      const basis = plus(k.p, mal(k.d, RASTER / 2 + i * RASTER));
      const c = plus(basis, mal(k.n, -tiefe / 2));
      const tt = plus(basis, mal(k.n, RASTER / 2));
      teile.push(teil(rampe, r3(c.x), r3(c.z), rot(k.n, m)));
      tische.push(teil(`table-${h}`, r3(tt.x), r3(tt.z), rot(k.n, m)));
    }
    return { ...k, p: plus(k.p, mal(k.d, s[1] * RASTER)) };
  }
  if (s[0] === 'P') return { ...k, p: plus(k.p, mal(k.d, s[1])) };
  if (s[0] === 'I') {
    const kr = KURVE[satz.corner];
    const mitte = minus(k.p, mal(k.n, kr.R));
    const a = winkel(k.n);
    const sinn = ((winkel(k.d) - a + 540) % 360) - 180 > 0 ? 1 : -1;
    for (let i = 0; i < 3; i++) {
      const bw = a + sinn * (15 + 30 * i);
      teile.push(kurvenStueck(satz.corner, mitte, bw));
      tische.push(kurvenStueck(satz.tisch, mitte, bw));
    }
    return { p: plus(mitte, mal(k.d, kr.R)), d: mal(k.n, -1), n: k.d };
  }
  const mk = ctx.masse[satz.kegel];
  const o = mk.l - tiefe;
  const q = plus(k.p, mal(k.n, o));
  const c = plus(q, plus(mal(k.n, -mk.l / 2), mal(k.d, mk.l / 2)));
  teile.push(teil(satz.kegel, r3(c.x), r3(c.z), rot(minus(k.n, k.d), mk)));
  return { p: plus(q, mal(k.d, o)), d: k.n, n: mal(k.d, -1) };
};
// Tables erst zum Schluss: wo sie ein Ringteil oder einen anderen Table überdecken, entfallen sie
// (geteilte Table-Reihe in der Nase, Spine ohne Table beim Kegel 150, Zwickel hinter dem Kegel 98)
const tischeEinfuegen = (teile: Teil[], tische: Teil[], ctx: Ctx) => {
  for (const t of tische) if (!teile.some((o) => ueberlappt(umriss(t, ctx), umriss(o, ctx), 0.1))) teile.push(t);
  return teile;
};
export const ring = (h: 98 | 150, pfad: Schritt[], ctx: Ctx): Teil[] | null => {
  if (!ctx.masse[`coping-ramp-${h}`]?.hoch || !ctx.masse[`kegel-${h}`]) return null;
  let k: Kurs = { p: { x: 0, z: 0 }, d: { x: 1, z: 0 }, n: { x: 0, z: 1 } };
  const teile: Teil[] = [];
  const tische: Teil[] = [];
  for (const s of pfad) k = schritt(h, k, s, teile, tische, ctx);
  const alle = tischeEinfuegen(teile, tische, ctx);
  const b = box(alle.flatMap((t) => umriss(t, ctx)));
  return verschiebe(alle, { x: -(b.x0 + b.x1) / 2, z: -(b.z0 + b.z1) / 2 });
};
// Niere: Rechteck mit einer Nase aus 2 Kegeln in einer Längsseite. Die Gegenseite ist um 2R + 2o länger; was nicht aufs Raster passt, wird Passstück.
export const niere = (h: 98 | 150, ctx: Ctx): Teil[] | null => {
  const m = ctx.masse[`coping-ramp-${h}`];
  const mk = ctx.masse[`kegel-${h}`];
  if (!m?.hoch || !mk) return null;
  const tiefe = Math.abs(m.hoch.x) > 0.5 ? m.l : m.b;
  const nase = 2 * KURVE[KURVEN_HOEHEN[`coping-ramp-${h}`].corner].R + 2 * (mk.l - tiefe);
  const n = Math.floor(nase / RASTER + 0.05);
  const rest = r3(nase - n * RASTER);
  const pfad: Schritt[] = [['G', 1], ['I'], ['A'], ['A'], ['I'], ['G', 1], ['I'], ['G', 3], ['I'], ['G', 2 + n], ...(rest > 0.01 ? [['P', rest] as Schritt] : []), ['I'], ['G', 3], ['I']];
  return ring(h, pfad, ctx);
};
// Bowl nach Maß mit Nasen: Rechteck, je Seite 0–2 Nasen nach innen (I A A I) oder außen (A I I A), Nasenlänge in Rastern.
// Gegenüberliegende Seiten werden gleich lang; was nicht aufs Raster passt, wird Passstück in Ortbeton.
export const passstuecke = (rest: number) => (rest > 0.01 ? Math.ceil(rest / 0.3 - 1e-6) : 0);
export interface NasenSeite { n: number; aussen: boolean }
// Breite einer Nase aus 2 Kegeln in m (null, solange Maße fehlen)
export const bowlNase = (h: 98 | 150, ctx: Ctx): number | null => {
  const m = ctx.masse[`coping-ramp-${h}`];
  const mk = ctx.masse[`kegel-${h}`];
  if (!m?.hoch || !mk) return null;
  const tiefe = Math.abs(m.hoch.x) > 0.5 ? m.l : m.b;
  return 2 * KURVE[KURVEN_HOEHEN[`coping-ramp-${h}`].corner].R + 2 * (mk.l - tiefe);
};
// Coping-Linie eines Rings, abgelaufen wie ring(): Punkte mit Laufmeter s und Normale n zum Boden hin
export interface LinienPunkt { p: V; n: V; s: number }
export const copingLinie = (h: 98 | 150, pfad: Schritt[], ctx: Ctx): LinienPunkt[] => {
  const rampe = `coping-ramp-${h}`;
  const m = ctx.masse[rampe];
  const mk = ctx.masse[KURVEN_HOEHEN[rampe].kegel];
  const Rc = KURVE[KURVEN_HOEHEN[rampe].corner].R;
  const tiefe = Math.abs(m.hoch!.x) > 0.5 ? m.l : m.b;
  const o = mk.l - tiefe;
  const out: LinienPunkt[] = [];
  let k: Kurs = { p: { x: 0, z: 0 }, d: { x: 1, z: 0 }, n: { x: 0, z: 1 } };
  let s = 0;
  const gerade = (len: number) => {
    const n = Math.max(1, Math.ceil(len / 0.25));
    for (let i = 0; i < n; i++) out.push({ p: plus(k.p, mal(k.d, (len * i) / n)), n: mal(k.n, -1), s: s + (len * i) / n });
    k = { ...k, p: plus(k.p, mal(k.d, len)) };
    s += len;
  };
  // Bogen um mitte von k.p aus um 90° in Laufrichtung; innen: Boden liegt zur Mitte hin
  const bogen = (mitte: V, r: number, innen: boolean) => {
    const a = minus(k.p, mitte);
    const a0 = Math.atan2(a.z, a.x);
    const e = r > 0 ? plus(mitte, mal(k.d, r)) : mitte;
    const b = minus(e, mitte);
    let da = Math.atan2(b.z, b.x) - a0;
    if (r === 0) { const n0 = Math.atan2(-k.n.z, -k.n.x), n1 = Math.atan2(k.d.z, k.d.x); da = n1 - n0; }
    while (da > Math.PI) da -= 2 * Math.PI;
    while (da < -Math.PI) da += 2 * Math.PI;
    const start = r > 0 ? a0 : Math.atan2(-k.n.z, -k.n.x);
    for (let i = 0; i < 8; i++) {
      const w = start + (da * i) / 8;
      const u = { x: Math.cos(w), z: Math.sin(w) };
      out.push({ p: plus(mitte, mal(u, r)), n: innen ? mal(u, -1) : u, s: s + (Math.abs(da) * r * i) / 8 });
    }
    s += Math.abs(da) * r;
  };
  for (const st of pfad) {
    if (st[0] === 'G') gerade(st[1] * RASTER);
    else if (st[0] === 'P') gerade(st[1]);
    else if (st[0] === 'I') {
      const mitte = minus(k.p, mal(k.n, Rc));
      bogen(mitte, Rc, true);
      k = { p: plus(mitte, mal(k.d, Rc)), d: mal(k.n, -1), n: k.d };
    } else {
      const q = plus(k.p, mal(k.n, o));
      bogen(q, o, false);
      k = { p: plus(q, mal(k.d, o)), d: k.n, n: mal(k.d, -1) };
    }
  }
  out.push({ p: k.p, n: mal(k.n, -1), s });
  return out;
};
// B12: Wo sich zwei Wände gegenüberstehen, bleiben mindestens 2,50 m flacher Boden.
// Gegenüber = Normalen zeigen aufeinander zu; Punkte derselben Rundung (Ecke, Tasche aus 2 Corner) zählen nicht.
export const FLACH_MIN = 2.5;
export const engstelle = (h: 98 | 150, linie: LinienPunkt[], ctx: Ctx): [LinienPunkt, LinienPunkt] | null => {
  const rampe = `coping-ramp-${h}`;
  const m = ctx.masse[rampe];
  const tiefe = Math.abs(m.hoch!.x) > 0.5 ? m.l : m.b;
  const Rc = KURVE[KURVEN_HOEHEN[rampe].corner].R;
  const o = ctx.masse[KURVEN_HOEHEN[rampe].kegel].l - tiefe;
  const U = linie.length ? linie[linie.length - 1].s : 0;
  const bogenlaenge = Math.PI * Rc + Math.PI * o + 0.5;
  const grenze = 2 * tiefe + FLACH_MIN - 0.01;
  const sortiert = [...linie].sort((a, b) => a.p.x - b.p.x);
  for (let i = 0; i < sortiert.length; i++) for (let j = i + 1; j < sortiert.length && sortiert[j].p.x - sortiert[i].p.x < grenze; j++) {
    const a = sortiert[i], b = sortiert[j];
    if (Math.abs(a.p.z - b.p.z) >= grenze) continue;
    const ds = Math.abs(a.s - b.s);
    if (Math.min(ds, U - ds) < bogenlaenge) continue;
    const v = minus(b.p, a.p);
    const d = laenge(v);
    if (d >= grenze || d < 1e-6) continue;
    const u = mal(v, 1 / d);
    if (a.n.x * u.x + a.n.z * u.z > 0.7 && -(b.n.x * u.x + b.n.z * u.z) > 0.7) return [a, b];
  }
  return null;
};
export const zuEng = (h: 98 | 150, linie: LinienPunkt[], ctx: Ctx) => !!engstelle(h, linie, ctx);
export interface BowlErgebnis { teile: Teil[]; linie: LinienPunkt[]; sl: number; sb: number }
// Pfad eines Bowls mit Nasen; Taschen (nach außen) immer ohne Verlängerung, sonst entsteht ein Schlauch unter 2,50 m
export const bowlPfad = (seiten: NasenSeite[], sl: number, sb: number, lang: number, nase: number): Schritt[] => {
  const [oben, rechts, unten, links] = seiten;
  const pfad: Schritt[] = [];
  for (const [seite, laenge] of [[unten, sl], [rechts, sb], [oben, sl], [links, sb]] as [NasenSeite, number][]) {
    const g = Math.floor((laenge - seite.n * nase) / RASTER + 0.05);
    const rest = r3(laenge - seite.n * nase - g * RASTER);
    const stuecke = seite.n + 1;
    // Blöcke: jede gerade Coping Ramp ein Block, jede Nase ein Block; Passstücke nur zwischen Blöcke, nie in eine Nase
    const seg: Schritt[][] = [];
    for (let i = 0; i < stuecke; i++) {
      for (let j = Math.floor(g / stuecke) + (i < g % stuecke ? 1 : 0); j > 0; j--) seg.push([['G', 1]]);
      if (i < seite.n) {
        const gl: Schritt[] = lang && !seite.aussen ? [['G', lang]] : [];
        seg.push((seite.aussen ? [['A'], ['I'], ['I'], ['A']] : [['I'], ...gl, ['A'], ['A'], ...gl, ['I']]) as Schritt[]);
      }
    }
    // B11: so wenige Passstücke wie möglich, jedes höchstens 30 cm
    const np = passstuecke(rest);
    for (let i = np; i > 0; i--) seg.splice(Math.round((i * seg.length) / (np + 1)), 0, [['P', r3(rest / np)]]);
    pfad.push(...seg.flat());
    pfad.push(['I']);
  }
  return pfad;
};
// Bowl nach Maß: wächst, bis nichts überlappt und B12 erfüllt ist. Gewachsen wird dort, wo es klemmt:
// Engstelle quer zur Länge → breiter, längs → länger; Überlappung an Ober-/Unterseite → länger, an den Seiten → breiter.
// B13: höchstens 4 Nasen je Bowl; mit mehr wechselt die Wand alle paar Meter die Richtung, es bleibt keine Fahrlinie
export const MAX_NASEN = 4;
export const bowlFormErgebnis = (h: 98 | 150, nl: number, nb: number, seiten: NasenSeite[], lang: number, ctx: Ctx): BowlErgebnis | null => {
  if (seiten.reduce((a, x) => a + x.n, 0) > MAX_NASEN) return null;
  if (!ctx.masse[`coping-ramp-${h}`]?.hoch || !ctx.masse[`kegel-${h}`]) return null;
  const nase = bowlNase(h, ctx)!;
  const noetig = (k: number) => (k ? k * nase + (k + 1) * RASTER : 0);
  const [oben, rechts, unten, links] = seiten;
  const ohneNase = !seiten.some((x) => x.n > 0);
  const ringteil = (t: Teil) => RINGTEIL.test(t.slug) && !t.slug.startsWith('corner-table');
  let dl = 0, db = 0;
  for (let versuch = 0; versuch < 30; versuch++) {
    const sl = Math.max(nl * RASTER, noetig(oben.n), noetig(unten.n)) + dl * RASTER;
    const sb = Math.max(nb * RASTER, noetig(rechts.n), noetig(links.n)) + db * RASTER;
    const pfad = bowlPfad(seiten, sl, sb, lang, nase);
    const linie = copingLinie(h, pfad, ctx);
    if (laenge(minus(linie[linie.length - 1].p, linie[0].p)) > 0.05) return null; // Passstücke sind auf mm gerundet
    const eng = engstelle(h, linie, ctx);
    if (eng) {
      const ex = Math.abs(eng[1].p.x - eng[0].p.x), ez = Math.abs(eng[1].p.z - eng[0].p.z);
      if (ez >= 0.5 * ex) db++;
      if (ex >= 0.5 * ez) dl++;
      continue;
    }
    const t = ohneNase ? bowl(h, Math.round(sl / RASTER), Math.round(sb / RASTER), ctx) : ring(h, pfad, ctx);
    if (!t) return null;
    // Überlappung: erst Ringteile untereinander, dann alles wie in pruefen (auch Tables)
    const r = t.filter(ringteil);
    let paar: Teil[] | null = null;
    for (let i = 0; i < r.length && !paar; i++) for (let j = i + 1; j < r.length; j++) if (ueberlappt(umriss(r[i], ctx), umriss(r[j], ctx), 0.05)) { paar = [r[i], r[j]]; break; }
    if (!paar) {
      const u = pruefen({ flaeche: { l: 200, b: 200, angeboescht: false }, teile: t }, ctx).find((x) => x.id.startsWith('ueber-'));
      if (u) paar = t.filter((x) => u.teile.includes(x.id));
    }
    if (!paar) return { teile: t, linie, sl, sb };
    const b0 = box(t.flatMap((x) => umriss(x, ctx)));
    const mx = paar.reduce((a, x) => a + x.x, 0) / paar.length, mz = paar.reduce((a, x) => a + x.z, 0) / paar.length;
    const cx = (b0.x0 + b0.x1) / 2, cz = (b0.z0 + b0.z1) / 2;
    if (Math.abs(mz - cz) / (b0.z1 - b0.z0) > Math.abs(mx - cx) / (b0.x1 - b0.x0)) dl++; else db++;
  }
  return null;
};
export const bowlForm = (h: 98 | 150, nl: number, nb: number, seiten: NasenSeite[], lang: number, ctx: Ctx): Teil[] | null =>
  bowlFormErgebnis(h, nl, nb, seiten, lang, ctx)?.teile ?? null;
// Außenkurve 90° an eine Coping Ramp: 1 Kegel, danach eine gerade Coping Ramp (mit Table, wenn die Reihe Tables hat)
export const kegelAnhaengen = (id: string, r: Richtung, park: Park, ctx: Ctx): Park | null => {
  const t = park.teile.find((x) => x.id === id);
  const h = t?.slug === 'coping-ramp-98' ? 98 : t?.slug === 'coping-ramp-150' ? 150 : null;
  if (!t || !h || !ctx.masse[`kegel-${h}`]) return null;
  const l = rampenLage(t, ctx);
  const s = l.seite(r);
  const mitTisch = !!anliegend(seiteIn(t, l.m, l.hw), t.id, park, ctx, ['plattform']);
  const teile: Teil[] = [];
  const tische: Teil[] = [];
  let k: Kurs = { p: plus(plus(t, mal(l.hw, l.tiefe / 2)), mal(s, l.breite / 2)), d: s, n: l.hw };
  k = schritt(h, k, ['A'], teile, tische, ctx);
  schritt(h, k, ['G', 1], teile, tische, ctx);
  const neu = tischeEinfuegen([...park.teile, ...teile], mitTisch ? tische : [], ctx).slice(park.teile.length);
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
  if (familie(t.slug) === 'hip' && hoehe && [60, 75, 98].includes(hoehe)) {
    const allein = !park.teile.some((o) => o.id !== t.id && abstand(umriss(o, ctx), umriss(t, ctx)) < BERUEHRT);
    if (allein) {
      return {
        teil: id, text: tt('Ein Pyramid Hip allein ist selten. Zur Pyramide ergänzen?', 'A pyramid hip on its own is rare. Turn it into a full pyramid?', 'Une pyramid hip seule est rare. La compléter pour en faire une pyramide ?'), optionen: [{
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
  const bw = bowls(park, ctx);
  if (bw.length) {
    zeilen.push({ slug: null, code: tt('bauseits', 'by client', 'à charge client'), name: tt('Bowl: Aushub, Bodenplatte 15 cm bewehrt, Innenfläche ausbetoniert, Hinterfüllung, befahrbarer Gully mit Anschluss an die Entwässerung', 'Bowl: excavation, reinforced base slab 15 cm, interior concreted, backfill, rideable drain connected to the drainage system', "Bowl : excavation, dalle de fond armée de 15 cm, surface intérieure bétonnée, remblai, avaloir roulable raccordé au réseau d'évacuation"), menge: 1, kg: null, auto: true });
  }
  // B10: Übergang 98/150 und Passstück werden vor Ort in Ortbeton nachbetoniert
  const bauseits = (de: string, en: string, fr: string) => zeilen.push({ slug: null, code: tt('bauseits', 'by client', 'à charge client'), name: tt(de, en, fr), menge: 1, kg: null, auto: true });
  if (bw.some((b) => b.teile.some((t) => t.slug.endsWith('-98')) && b.teile.some((t) => t.slug.endsWith('-150')))) bauseits('Bowl: Übergang 98/150 in Ortbeton', 'Bowl: transition 98/150 in cast-in-place concrete', 'Bowl : transition 98/150 en béton coulé sur place');
  if (bw.some((b) => b.passstueck)) bauseits('Bowl: Passstück im Coping-Ring in Ortbeton', 'Bowl: filler piece in the coping ring in cast-in-place concrete', 'Bowl : pièce d’ajustement dans l’anneau de coping en béton coulé sur place');
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
  t: park.teile.map((t) => [t.slug, Math.round(t.x * 100), Math.round(t.z * 100), Math.round(t.rot * 10), ...(t.bw ? [t.gel === undefined ? -1 : t.gel ? 1 : 0, 1] : t.gel === undefined ? [] : [t.gel ? 1 : 0])]),
}));
export const dekodieren = (s: string, ctx: Ctx): Park | null => {
  try {
    const d = JSON.parse(unb64(s));
    const [l, b, a] = d.f;
    const teile: Teil[] = (d.t as [string, number, number, number, number?, number?][])
      .filter(([slug]) => ctx.masse[slug])
      .map(([slug, x, z, r, g, bw]) => ({ id: neueId(), slug, x: x / 100, z: z / 100, rot: r / 10, ...(g === undefined || g < 0 ? {} : { gel: g === 1 }), ...(bw === 1 ? { bw: true as const } : {}) }));
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
  'Runde Ecken aus Corners, außen ca. 12,5 × 10,0 m': ['Rounded corners made of corner elements, approx. 12.5 × 10.0 m outside', "Angles arrondis en éléments corner, env. 12,5 × 10,0 m à l'extérieur"],
  'Bowl 98 klein': ['Bowl 98 small', 'Bowl 98 petit'],
  'Bowl 98 Niere': ['Bowl 98 kidney', 'Bowl 98 haricot'],
  'Bowl 150 Niere': ['Bowl 150 kidney', 'Bowl 150 haricot'],
  'Nase aus 2 Kegeln, Passstück in Ortbeton': ['Nose made of 2 cones, filler piece in cast-in-place concrete', 'Nez en 2 cônes, pièce d’ajustement en béton coulé sur place'],
  'Nase aus 2 Kegeln': ['Nose made of 2 cones', 'Nez en 2 cônes'],
  'Klein · Starter': ['Small · Starter', 'Petit · Starter'],
  'Mittel · Plaza': ['Medium · Plaza', 'Moyen · Plaza'],
  'Groß · Park': ['Large · Park', 'Grand · Park'],
  'Für Schulhof oder Dorfplatz. Niedrige Höhen, eine Jump-Box und eine Street-Linie.': ['For a school playground or village square. Low heights, one jump box and one street line.', "Pour une cour d'école ou une place de village. Faibles hauteurs, une jump box et une ligne street."],
  'Für Jugendzentrum und Freizeitgelände. Zwei Jump-Boxen, Spine und Street-Linie.': ['For a youth centre and leisure grounds. Two jump boxes, a spine and a street line.', 'Pour un centre de jeunesse et un site de loisirs. Deux jump boxes, une spine et une ligne street.'],
  'Aufbau wie gebaute A+-Parks: Pyramide, Quarterramp, Spine, Wallride und eine lange Street-Linie.': ['Layout like built A+ parks: pyramid, quarter ramp, spine, wallride and a long street line.', 'Composition comme les parcs A+ réalisés : pyramide, quarter, spine, wallride et une longue ligne street.'],
};
export const ueberText = (de: string, lang: Lang): string => (lang === 'de' ? de : TEXTE[de]?.[lang === 'en' ? 0 : 1] ?? de);
