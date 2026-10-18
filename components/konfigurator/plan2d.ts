import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { drehe, gruppen, umriss, type Ctx, type Park, type Teil, type V, type Zusatz } from './logik';
import { aktuelleLocale, tt } from '../../i18n';

// Druckblätter A4 quer als SVG (Einheit mm): Grundriss im Stil eines CAD-Plans und Schnitt durch die höchste Rampengruppe.
// Die Linien kommen aus den glTF-Modellen: sichtbare Kanten von oben, Höhenlinien auf den Fahrflächen, Schnitt durch die Dreiecke.

type Strecke = [number, number, number, number];
export interface Netz { P: number[][]; tri: number[][]; kanten: Strecke[]; hoehen: Strecke[] }

// ---------- Geometrie aus dem Modell ----------

export const netzAus = (pos: number[], idx: number[], knick = 20): Netz => {
  // Punkte auf mm runden, damit Nähte zwischen Teilflächen zusammenfallen
  const id = new Map<string, number>();
  const P: number[][] = [];
  const vid = (i: number) => {
    const v = [pos[3 * i], pos[3 * i + 1], pos[3 * i + 2]];
    const key = v.map((x) => Math.round(x * 1000)).join(',');
    let j = id.get(key);
    if (j === undefined) { j = P.length; P.push(v); id.set(key, j); }
    return j;
  };
  const tri: number[][] = [];
  for (let i = 0; i < idx.length; i += 3) {
    const t = [vid(idx[i]), vid(idx[i + 1]), vid(idx[i + 2])];
    if (t[0] !== t[1] && t[1] !== t[2] && t[0] !== t[2]) tri.push(t);
  }
  const normale = tri.map(([a, b, c]) => {
    const u = P[b].map((x, i) => x - P[a][i]);
    const v = P[c].map((x, i) => x - P[a][i]);
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const l = Math.hypot(...n) || 1;
    return n.map((x) => x / l);
  });
  const nachbarn = new Map<string, number[]>();
  tri.forEach((t, f) => t.forEach((a, i) => {
    const b = t[(i + 1) % 3];
    const k = a < b ? `${a}_${b}` : `${b}_${a}`;
    const liste = nachbarn.get(k);
    if (liste) liste.push(f); else nachbarn.set(k, [f]);
  }));
  // Kanten, die von oben zu sehen sind: Rand oder Knick an mindestens einer nach oben zeigenden Fläche
  const cosK = Math.cos((knick * Math.PI) / 180);
  const kanten: Strecke[] = [];
  const schon = new Set<string>();
  for (const [k, fs] of nachbarn) {
    if (!fs.some((f) => normale[f][1] > 0.05)) continue;
    const scharf = fs.length !== 2 || normale[fs[0]].reduce((s, x, i) => s + x * normale[fs[1]][i], 0) < cosK;
    if (!scharf) continue;
    const [a, b] = k.split('_').map(Number);
    const l: Strecke = [P[a][0], P[a][2], P[b][0], P[b][2]];
    if (Math.hypot(l[2] - l[0], l[3] - l[1]) < 0.01) continue; // senkrechte Kanten fallen auf einen Punkt
    const hin = l.map((x) => Math.round(x * 200)).join(',');
    const rueck = [l[2], l[3], l[0], l[1]].map((x) => Math.round(x * 200)).join(',');
    if (schon.has(hin) || schon.has(rueck)) continue;
    schon.add(hin);
    kanten.push(l);
  }
  // Höhenlinien alle 20 cm auf geneigten Flächen: zeigen im Plan die Rundung der Rampe
  const hoehen: Strecke[] = [];
  const oben = Math.max(...P.map((p) => p[1]));
  tri.forEach((t, f) => {
    const ny = normale[f][1];
    if (ny < 0.05 || ny > 0.995) return;
    const ys = t.map((i) => P[i][1]);
    if (Math.min(...ys) >= 0.97 * oben) return; // Logo-Prägung auf dem Podest weglassen
    for (let h = 0.2; h < Math.max(...ys); h += 0.2) {
      const pk = schnittpunkte(t.map((i) => P[i]), 1, h, [0, 2]);
      if (pk) hoehen.push(pk);
    }
  });
  return { P, tri, kanten, hoehen };
};

// Schnitt eines Dreiecks mit der Ebene p[achse] = w; Ergebnis als Strecke in den Koordinaten u = [i, j]
const schnittpunkte = (d: number[][], achse: number, w: number, [i, j]: [number, number]): Strecke | null => {
  const pk: number[] = [];
  for (let n = 0; n < 3; n++) {
    const a = d[n];
    const b = d[(n + 1) % 3];
    if ((a[achse] - w) * (b[achse] - w) < 0) {
      const s = (w - a[achse]) / (b[achse] - a[achse]);
      pk.push(a[i] + s * (b[i] - a[i]), a[j] + s * (b[j] - a[j]));
    }
  }
  return pk.length === 4 ? [pk[0], pk[1], pk[2], pk[3]] : null;
};

const netze = new Map<string, Promise<Netz>>();
export const ladeNetz = (url: string): Promise<Netz> => {
  let n = netze.get(url);
  if (!n) {
    n = new GLTFLoader().loadAsync(url).then((g) => {
      g.scene.updateMatrixWorld(true);
      const pos: number[] = [];
      const idx: number[] = [];
      const v = new THREE.Vector3();
      g.scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        const p = m.geometry.getAttribute('position');
        const start = pos.length / 3;
        for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld); pos.push(v.x, v.y, v.z); }
        const ix = m.geometry.getIndex();
        if (ix) for (let i = 0; i < ix.count; i++) idx.push(start + ix.getX(i));
        else for (let i = 0; i < p.count; i++) idx.push(start + i);
      });
      return netzAus(pos, idx);
    });
    netze.set(url, n);
  }
  return n;
};

// ---------- Blatt ----------

const W = 297;
const H = 210;
const R = 8;
const f = (n: number) => n.toFixed(2);
const zahl = (m: number) => m.toLocaleString(aktuelleLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const linie = (x1: number, y1: number, x2: number, y2: number, cls: string) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls}"/>`;
const box = (p: V[]) => ({
  x0: Math.min(...p.map((q) => q.x)), x1: Math.max(...p.map((q) => q.x)),
  z0: Math.min(...p.map((q) => q.z)), z1: Math.max(...p.map((q) => q.z)),
});

const STIL = `
.raster{stroke:#000;stroke-width:.08;stroke-dasharray:.6 1.2;opacity:.35}
.flaeche{fill:none;stroke:#000;stroke-width:.5}
.el{fill:#fff;stroke:none}.mk{stroke:#000;stroke-width:.12;stroke-linecap:round}.hk{stroke:#000;stroke-width:.06}
.code{font-size:1.8px;text-anchor:middle;dominant-baseline:middle;paint-order:stroke;stroke:#fff;stroke-width:.6px}
.kote{font-size:1.4px;text-anchor:middle;dominant-baseline:middle;paint-order:stroke;stroke:#fff;stroke-width:.5px}
.ml{stroke:#000;stroke-width:.13}.hl{stroke:#000;stroke-width:.08}.tick{stroke:#000;stroke-width:.3}
.mz{font-size:2px;text-anchor:middle}.klein{font-size:2px}
.ws{fill:#fff;stroke:#000;stroke-width:.15}.sw{fill:#000;stroke:#000;stroke-width:.15}
.cut{stroke:#000;stroke-width:.35;stroke-linecap:round}.boden{stroke:#000;stroke-width:.5}.dr{fill:#000}
.titel{font-size:2.6px;font-weight:bold}.sl{stroke:#000;stroke-width:.25;stroke-dasharray:4 1 .6 1}.slk{stroke:#000;stroke-width:.35}
.buchst{font-size:2.8px;font-weight:bold}
.rahmen{fill:none;stroke:#000;stroke-width:.35}
.kopf text{font-size:2.3px}.kopf .gross{font-size:4.2px;font-weight:bold}.lbl{font-size:1.7px;fill:#555}
text{font-family:Arial,Helvetica,sans-serif;fill:#000}`;

export interface Kopf { titel: string; planinhalt: string; massstab: string; datum: string }

// Rahmen und Plankopf unten rechts, darüber Hinweis; inhalt ist SVG in mm
export const blatt = (inhalt: string, k: Kopf) => `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:${W}mm;height:${H}mm">
<style>${STIL}</style>
<rect x="${R}" y="${R}" width="${W - 2 * R}" height="${H - 2 * R}" class="rahmen"/>
${inhalt}
<text x="${W - R - 1}" y="${H - R - 25.5}" class="lbl" text-anchor="end">${tt('Planung schematisch, erstellt mit dem A+ Konfigurator. Maßgeblich ist das Angebot.', 'Schematic plan, created with the A+ planner. The quote is what counts.', "Plan schématique, établi avec le planificateur A+. L'offre fait foi.")}</text>
<g class="kopf">
  <rect x="${W - R - 110}" y="${H - R - 24}" width="110" height="24" class="rahmen" style="fill:#fff"/>
  <line x1="${W - R - 62}" y1="${H - R - 24}" x2="${W - R - 62}" y2="${H - R}" stroke="#000" stroke-width=".2"/>
  <image href="/aplus-logo.svg" x="${W - R - 107}" y="${H - R - 20}" width="42" height="12"/>
  <text x="${W - R - 106}" y="${H - R - 4.5}" class="lbl">post@aplusurbandesign.com</text>
  <text x="${W - R - 106}" y="${H - R - 2}" class="lbl">www.aplusurbandesign.com</text>
  <text x="${W - R - 59}" y="${H - R - 19.5}" class="lbl">${tt('PROJEKT', 'PROJECT', 'PROJET')}</text>
  <text x="${W - R - 59}" y="${H - R - 15}" class="gross">${esc(k.titel.toUpperCase())}</text>
  <text x="${W - R - 59}" y="${H - R - 10}" class="lbl">${tt('PLANINHALT', 'PLAN CONTENT', 'CONTENU DU PLAN')}</text>
  <text x="${W - R - 59}" y="${H - R - 6.5}">${esc(k.planinhalt)}</text>
  <text x="${W - R - 59}" y="${H - R - 2}" class="lbl">${esc(k.massstab)}   ·   ${k.datum}</text>
</g>
</svg>`;

// Bild (3D-Ansicht) über die ganze Fläche oberhalb des Plankopfs
export const bildBlatt = (bild: string, k: Kopf) =>
  blatt(`<image href="${bild}" x="${R + 2}" y="${R + 2}" width="${W - 2 * R - 4}" height="${H - 2 * R - 32}" preserveAspectRatio="xMidYMid meet"/>`, k);

export interface PlanDaten { park: Park; ctx: Ctx; zusatz: Zusatz[]; netze: Record<string, Netz>; kopf: Omit<Kopf, 'planinhalt' | 'massstab'> }

export const planBlatt = ({ park, ctx, zusatz, netze: nz, kopf }: PlanDaten) => {
  const { l, b } = park.flaeche;
  const gs = gruppen(park, ctx);
  const gb = gs.map((g) => box(g.flatMap((t) => umriss(t, ctx))));

  // Schnitt durch die höchste Gruppe, quer zur hohen Kante einer Rampe (sonst entlang x)
  const hoechste = gs.map((g, i) => ({ g, i, h: Math.max(...g.map((t) => ctx.masse[t.slug].h)) })).sort((a, c) => c.h - a.h)[0];
  const rampe = hoechste?.g.find((t) => ctx.masse[t.slug].hoch);
  const richtung = rampe ? drehe(ctx.masse[rampe.slug].hoch!, rampe.rot) : { x: 1, z: 0 };
  const entlangX = Math.abs(richtung.x) >= Math.abs(richtung.z);
  const mitSchnitt = !!hoechste;
  const RESERVE = mitSchnitt ? 30 : 0; // Mindestplatz unten für den Schnitt

  // Plan: Maßstab so groß wie möglich, Platz für Maßketten oben/links (LI) und unten/rechts (RE)
  const LI = 5;
  const RE = 1.6;
  const feld = { x: R + 4, y: R + 4, w: W - 2 * R - 8, h: H - 2 * R - 16 - RESERVE };
  const N = [50, 75, 100, 125, 150, 200, 250, 300, 400, 500, 750, 1000].find((n) => ((l + LI + RE) * 1000) / n <= feld.w && ((b + LI + RE) * 1000) / n <= feld.h) ?? 1000;
  const k = 1000 / N;
  const ox = feld.x + (feld.w - (l + LI + RE) * k) / 2 + LI * k;
  const oy = feld.y + LI * k;
  const P = (x: number, z: number): [number, number] => [ox + (x + l / 2) * k, oy + (z + b / 2) * k];
  const poly = (p: V[], cls: string) => `<polygon points="${p.map((q) => P(q.x, q.z).map(f).join(',')).join(' ')}" class="${cls}"/>`;

  let s = '';
  for (let x = -l / 2 + 1.25; x < l / 2 - 1e-6; x += 1.25) { const [a, c] = P(x, -b / 2); s += linie(a, c, a, P(x, b / 2)[1], 'raster'); }
  for (let z = -b / 2 + 1.25; z < b / 2 - 1e-6; z += 1.25) { const [a, c] = P(-l / 2, z); s += linie(a, c, P(l / 2, z)[0], c, 'raster'); }
  s += poly([{ x: -l / 2, z: -b / 2 }, { x: l / 2, z: -b / 2 }, { x: l / 2, z: b / 2 }, { x: -l / 2, z: b / 2 }], 'flaeche');

  const modell = (t: Teil | Zusatz, cls: string) => {
    const n = nz[t.slug];
    if (!n) return '';
    let o = '';
    const zeichne = (liste: Strecke[], c: string) => {
      for (const [ax, az, bx, bz] of liste) {
        const a = drehe({ x: ax, z: az }, t.rot);
        const e = drehe({ x: bx, z: bz }, t.rot);
        const [p1, p2] = P(a.x + t.x, a.z + t.z);
        const [p3, p4] = P(e.x + t.x, e.z + t.z);
        o += linie(p1, p2, p3, p4, c);
      }
    };
    zeichne(n.kanten, cls);
    zeichne(n.hoehen, 'hk');
    return o;
  };

  for (const t of park.teile) {
    const p = umriss(t, ctx);
    const m = ctx.masse[t.slug];
    s += poly(p, 'el');
    s += nz[t.slug] ? modell(t, 'mk') : poly(p, 'mk" style="fill:none');
    const c = p.reduce((a, q) => ({ x: a.x + q.x / p.length, z: a.z + q.z / p.length }), { x: 0, z: 0 });
    const bb = box(p);
    const quer = bb.z1 - bb.z0 > bb.x1 - bb.x0;
    const d = m.hoch ? drehe(m.hoch, t.rot) : { x: 0, z: 0 };
    const [tx, ty] = P(c.x - d.x * 0.9, c.z - d.z * 0.9);
    const dreh = (x: number, y: number) => (quer ? ` transform="rotate(-90 ${f(x)} ${f(y)})"` : '');
    s += `<text x="${f(tx)}" y="${f(ty)}" class="code"${dreh(tx, ty)}>${esc(ctx.info[t.slug]?.code ?? t.slug)}</text>`;
    if (m.hoch) {
      const kx = tx + (quer ? 2.2 : 0);
      const ky = ty + (quer ? 0 : 2.2);
      s += `<text x="${f(kx)}" y="${f(ky)}" class="kote"${dreh(kx, ky)}>${tt('OK', 'TOP', 'HAUT')} +${zahl(m.h)}</text>`;
    }
  }
  for (const z of zusatz) s += nz[z.slug] ? modell(z, 'mk') : poly(umriss({ id: 'z', ...z }, ctx), 'dr');

  // Maßkette: Maßlinie, Schrägstriche, kurze Hilfslinien Richtung Bauteil, Zahl über der Linie
  const kette = (werte: number[], lage: number, achse: 'x' | 'z', richtung: number) => {
    const w = [...new Set(werte.map((v) => Math.round(v * 1000) / 1000))].sort((a, c) => a - c);
    let o = '';
    w.forEach((v, i) => {
      const [px, py] = achse === 'x' ? P(v, lage) : P(lage, v);
      o += achse === 'x' ? linie(px, py, px, py + richtung * 2.5, 'hl') : linie(px, py, px + richtung * 2.5, py, 'hl');
      o += linie(px - 0.9, py + 0.9, px + 0.9, py - 0.9, 'tick');
      if (i === 0) return;
      const [ax, ay] = achse === 'x' ? P(w[i - 1], lage) : P(lage, w[i - 1]);
      o += linie(ax, ay, px, py, 'ml');
      const t = zahl(v - w[i - 1]);
      if ((v - w[i - 1]) * k < t.length * 1.35) return; // Zahl passt nicht zwischen die Striche
      const mx = (ax + px) / 2;
      const my = (ay + py) / 2;
      o += achse === 'x'
        ? `<text x="${f(mx)}" y="${f(my - 0.8)}" class="mz">${t}</text>`
        : `<text x="${f(mx - 0.8)}" y="${f(my)}" class="mz" transform="rotate(-90 ${f(mx - 0.8)} ${f(my)})">${t}</text>`;
    });
    return o;
  };
  s += kette([-l / 2, l / 2], -b / 2 - 4.2, 'x', 1);
  s += kette([-l / 2, l / 2, ...gb.flatMap((q) => [q.x0, q.x1])], -b / 2 - 2.4, 'x', 1);
  s += kette([-b / 2, b / 2], -l / 2 - 4.2, 'z', 1);
  s += kette([-b / 2, b / 2, ...gb.flatMap((q) => [q.z0, q.z1])], -l / 2 - 2.4, 'z', 1);
  gs.forEach((g, i) => {
    const bs = g.map((t) => box(umriss(t, ctx)));
    s += kette(bs.flatMap((q) => [q.x0, q.x1]), gb[i].z1 + 0.9, 'x', -1);
    s += kette(bs.flatMap((q) => [q.z0, q.z1]), gb[i].x1 + 0.9, 'z', -1);
  });

  // Maßstabsleiste über dem Plankopf
  const meter = [2, 5, 10, 20, 50].find((m) => m * k >= 20) ?? 50;
  const sx = W - R - 110;
  const sy = H - R - 29;
  for (let i = 0; i < 5; i++) s += `<rect x="${f(sx + (i * meter * k) / 5)}" y="${f(sy)}" width="${f((meter * k) / 5)}" height="1.4" class="${i % 2 ? 'sw' : 'ws'}"/>`;
  s += `<text x="${f(sx)}" y="${f(sy - 1.2)}" class="klein">0</text><text x="${f(sx + meter * k)}" y="${f(sy - 1.2)}" class="klein" text-anchor="middle">${meter} m</text>`;

  if (mitSchnitt) s += schnitt();
  return blatt(s, { ...kopf, planinhalt: `${tt('Grundriss und Schnitt', 'Plan and section', 'Plan et coupe')} · ${zahl(l)} × ${zahl(b)} m · ${park.teile.length} ${tt('Elemente', 'elements', 'éléments')}`, massstab: `${tt('M', 'Scale', 'Éch.')} 1:${N} (A4) · ${tt('MASSE IN METERN', 'DIMENSIONS IN METRES', 'COTES EN MÈTRES')}` });

  // Schnitt A-A: senkrechte Ebene durch die Mitte der Referenzrampe, darunter links gezeichnet
  function schnitt() {
    const q = gb[hoechste.i];
    const ref = rampe ?? hoechste.g[0];
    const quer = entlangX ? ctx.masse[ref.slug].b : ctx.masse[ref.slug].l;
    const w = (entlangX ? ref.z : ref.x) + quer / 4 + 0.013; // neben der Beschriftung und knapp neben Fugen schneiden
    const u0 = (entlangX ? q.x0 : q.z0) - 0.8;
    const u1 = (entlangX ? q.x1 : q.z1) + 0.8;
    const boden = H - R - 6;
    const frei = boden - (oy + (b + RE) * k) - 9; // Platz zwischen Plan und Boden, abzüglich Überschrift
    // erst schneiden (Koordinaten u, y in Metern), dann den Maßstab nach der tatsächlichen Höhe samt Geländer wählen
    const schnitte: Strecke[] = [];
    for (const t of [...park.teile, ...zusatz]) {
      const n = nz[t.slug];
      const bb = box(umriss({ id: 'z', ...t }, ctx));
      const [lo, hi] = entlangX ? [bb.z0, bb.z1] : [bb.x0, bb.x1];
      const [a0, a1] = entlangX ? [bb.x0, bb.x1] : [bb.z0, bb.z1];
      if (!n || w < lo || w > hi || a1 < u0 || a0 > u1) continue;
      const hy = 'y' in t ? t.y ?? 0 : 0; // Geländer sitzen auf dem Podest
      const welt = n.P.map((p) => { const d = drehe({ x: p[0], z: p[2] }, t.rot); return [d.x + t.x, p[1] + hy, d.z + t.z]; });
      for (const tr of n.tri) {
        const st = schnittpunkte(tr.map((i) => welt[i]), entlangX ? 2 : 0, w, [entlangX ? 0 : 2, 1]);
        if (st) schnitte.push(st);
      }
    }
    const ymax = Math.max(hoechste.h, ...schnitte.flatMap((st) => [st[1], st[3]]));
    const KS = [50, 75, 100, 125, 150, 200, 250, 500].find((n) => ((u1 - u0) * 1000) / n <= 160 && (ymax * 1000) / n <= frei) ?? 500;
    const ks = 1000 / KS;
    const sl = R + 6;
    const S = (u: number, y: number): [number, number] => [sl + (u - u0) * ks, boden - y * ks];
    let o = '';
    for (const st of schnitte) {
      const [x1, y1] = S(st[0], st[1]);
      const [x2, y2] = S(st[2], st[3]);
      o += linie(x1, y1, x2, y2, 'cut');
    }
    const [gx0, gy] = S(u0, 0);
    const [gx1] = S(u1, 0);
    o += linie(gx0, gy, gx1, gy, 'boden');
    for (let i = 0; i < 6; i++) { const x = gx0 + 2 + (i * (gx1 - gx0 - 4)) / 5; o += linie(x, gy + 0.3, x - 1.5, gy + 1.8, 'hl'); }
    // Höhenkoten an der hohen Kante jeder geschnittenen Rampe
    const koten = new Set<string>();
    for (const t of hoechste.g) {
      const m = ctx.masse[t.slug];
      const bb = box(umriss(t, ctx));
      const [lo, hi] = entlangX ? [bb.z0, bb.z1] : [bb.x0, bb.x1];
      if (!m.hoch || w < lo || w > hi) continue;
      const d = drehe(m.hoch, t.rot);
      const dv = entlangX ? d.x : d.z;
      if (Math.abs(dv) < 0.5) continue;
      koten.add(`${dv > 0 ? (entlangX ? bb.x1 : bb.z1) - 0.4 : (entlangX ? bb.x0 : bb.z0) + 0.4}|${m.h}|${Math.sign(dv)}`);
    }
    for (const kt of koten) {
      const [u, h, sg] = kt.split('|').map(Number);
      const [px, py] = S(u, h);
      o += `<path d="M${f(px - 0.9)},${f(py - 1.4)} L${f(px + 0.9)},${f(py - 1.4)} L${f(px)},${f(py)} Z" class="dr"/>`;
      o += `<text x="${f(px - sg * 1.6)}" y="${f(py - 2)}" class="mz" text-anchor="${sg > 0 ? 'end' : 'start'}">+${zahl(h)}</text>`; // Zahl zur Rampe hin, weg vom Geländer
    }
    o += `<text x="${f(gx1 + 1.2)}" y="${f(gy - 0.8)}" class="mz" text-anchor="start">${zahl(0).replace('0.00', '±0.00').replace('0,00', '±0,00')}</text>`;
    const ty = oy + (b + RE) * k + 6; // direkt unter dem Plan, Geländer im Schnitt ragen sonst hinein
    o += `<text x="${f(sl)}" y="${f(ty)}" class="titel">${tt('SCHNITT A-A', 'SECTION A-A', 'COUPE A-A')}</text><text x="${f(sl + 26)}" y="${f(ty)}" class="klein">${tt('M', 'Scale', 'Éch.')} 1:${KS}</text>`;
    // Schnittlinie im Grundriss: Strichpunkt, Blickrichtung und Kennbuchstabe
    const a = entlangX ? P(u0 - 1, w) : P(w, u0 - 1);
    const e = entlangX ? P(u1 + 1.7, w) : P(w, u1 + 1.7);
    o += linie(a[0], a[1], e[0], e[1], 'sl');
    for (const [p, sg] of [[a, -1], [e, 1]] as [[number, number], number][]) {
      const [nx, ny] = entlangX ? [0, 1] : [1, 0];
      o += linie(p[0], p[1], p[0] + nx * 2.5, p[1] + ny * 2.5, 'slk');
      const [qx, qy] = [p[0] + nx * 2.5, p[1] + ny * 2.5];
      o += `<path d="M${f(qx - ny * 1)},${f(qy - nx * 1)} L${f(qx + ny * 1)},${f(qy + nx * 1)} L${f(qx + nx * 1.5)},${f(qy + ny * 1.5)} Z" class="dr"/>`;
      const [lx, ly] = entlangX ? [p[0] + sg * 1.8, p[1] + 0.9] : [p[0] - 1.8, p[1] + sg * 2.4];
      o += `<text x="${f(lx)}" y="${f(ly)}" class="buchst" text-anchor="middle">A</text>`;
    }
    return o;
  }
};
