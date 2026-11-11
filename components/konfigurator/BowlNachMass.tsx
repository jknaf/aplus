import { useState } from 'react';
import { useT } from '../../i18n';
import { RASTER, bowlNase, type Ctx, type NasenSeite } from './logik';

export interface BowlWahl { h: 98 | 150; l: number; b: number; nasen: NasenSeite[]; lang: number }

const meter = (x: number) => `${x.toFixed(2).replace('.', ',')} m`;
const segment = (an: boolean) => `min-h-[40px] rounded-md text-xs font-semibold transition-colors ${an ? 'bg-brand-dark text-white [&>span]:text-white/70' : 'text-brand-dark/70 hover:text-brand-dark hover:bg-white/60'}`;

// Bowl nach Maß: Draufsicht mit antippbaren Seiten statt Auswahllisten je Seite
export default function BowlNachMass({ ctx, onSetzen }: { ctx: Ctx | null; onSetzen: (w: BowlWahl) => void }) {
  const t = useT();
  const [w, setW] = useState<BowlWahl>({ h: 98, l: 3, b: 2, nasen: [0, 1, 2, 3].map(() => ({ n: 0, aussen: false })), lang: 0 });
  const [sel, setSel] = useState(0);
  const namen = [t('oben', 'top', 'haut'), t('rechts', 'right', 'droite'), t('unten', 'bottom', 'bas'), t('links', 'left', 'gauche')];
  const seite = (i: number, p: Partial<NasenSeite>) => setW({ ...w, nasen: w.nasen.map((x, j) => (j === i ? { ...x, ...p } : x)) });

  // Maße wie in bowlForm: reicht eine Seite für ihre Nasen nicht, wird sie länger
  const nase = (ctx && bowlNase(w.h, ctx)) || 2;
  const noetig = (k: number) => (k ? k * nase + (k + 1) * RASTER : 0);
  const L = Math.max(w.l * RASTER, noetig(w.nasen[0].n), noetig(w.nasen[2].n));
  const B = Math.max(w.b * RASTER, noetig(w.nasen[1].n), noetig(w.nasen[3].n));
  const gewachsen = L > w.l * RASTER + 0.01 || B > w.b * RASTER + 0.01;
  const anzahl = w.nasen.reduce((a, x) => a + x.n, 0);

  // Zeichnung (schematisch, m → px)
  const W = 300, H = 230, P = 34;
  const tiefe = nase / 2 + w.lang * RASTER;
  const raus = w.nasen.map((x) => (x.n && x.aussen ? tiefe : 0));
  const sc = Math.min((W - 2 * P) / (L + raus[1] + raus[3]), (H - 2 * P) / (B + raus[0] + raus[2]), 40);
  const x0 = (W - sc * (L + raus[1] + raus[3])) / 2 + raus[3] * sc;
  const y0 = (H - sc * (B + raus[0] + raus[2])) / 2 + raus[0] * sc;
  const Lp = L * sc, Bp = B * sc, x1 = x0 + Lp, y1 = y0 + Bp;
  const rc = Math.min(0.9 * sc, Lp / 2, Bp / 2);
  const nb = nase * sc;
  const seiten: { o: number[]; t: number[]; n: number[]; len: number; quer: number }[] = [
    { o: [x0, y0], t: [1, 0], n: [0, -1], len: Lp, quer: Bp },
    { o: [x1, y0], t: [0, 1], n: [1, 0], len: Bp, quer: Lp },
    { o: [x1, y1], t: [-1, 0], n: [0, 1], len: Lp, quer: Bp },
    { o: [x0, y1], t: [0, -1], n: [-1, 0], len: Bp, quer: Lp },
  ];
  const plus = (a: number[], v: number[], k: number) => [a[0] + v[0] * k, a[1] + v[1] * k];
  const pt = (p: number[]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  let d = `M ${pt(plus(seiten[0].o, seiten[0].t, rc))}`;
  seiten.forEach((s, i) => {
    const { n, aussen } = w.nasen[i];
    for (let j = 0; j < n; j++) {
      const p = plus(s.o, s.t, (s.len * (j + 1)) / (n + 1));
      const m = aussen ? s.n : [-s.n[0], -s.n[1]];
      const hh = Math.max((aussen ? tiefe * sc : Math.min(tiefe * sc, 0.42 * s.quer)) - nb / 2, 0);
      const a = plus(p, s.t, -nb / 2), b = plus(p, s.t, nb / 2);
      d += ` L ${pt(a)} L ${pt(plus(a, m, hh))} A ${(nb / 2).toFixed(1)} ${(nb / 2).toFixed(1)} 0 0 ${aussen ? 1 : 0} ${pt(plus(b, m, hh))} L ${pt(b)}`;
    }
    const naechste = seiten[(i + 1) % 4];
    d += ` L ${pt(plus(s.o, s.t, s.len - rc))} A ${rc.toFixed(1)} ${rc.toFixed(1)} 0 0 1 ${pt(plus(naechste.o, naechste.t, rc))}`;
  });

  const akt = w.nasen[sel];
  const titel = 'block text-[11px] font-semibold uppercase tracking-wider text-brand-muted mb-1.5';
  const stepper = (key: 'l' | 'b', label: string, wert: number) => (
    <div>
      <span className={titel}>{label}</span>
      <div className="flex items-center justify-between rounded-lg border border-brand-dark/15 bg-white p-0.5">
        <button type="button" aria-label={`${label} −`} disabled={w[key] <= 1} onClick={() => setW({ ...w, [key]: w[key] - 1 })} className="w-9 h-10 shrink-0 rounded-md bg-brand-bg text-lg font-semibold text-brand-dark disabled:opacity-35">−</button>
        <span className="text-[13px] font-bold text-brand-dark whitespace-nowrap">{meter(wert)}</span>
        <button type="button" aria-label={`${label} +`} disabled={w[key] >= 10} onClick={() => setW({ ...w, [key]: w[key] + 1 })} className="w-9 h-10 shrink-0 rounded-md bg-brand-bg text-lg font-semibold text-brand-dark disabled:opacity-35">+</button>
      </div>
    </div>
  );

  return (
    <div className="p-3 rounded-lg bg-white border border-brand-dark/10 space-y-3">
      <div>
        <span className="block font-heading font-bold uppercase text-sm text-brand-dark">{t('Bowl nach Maß', 'Custom-size bowl', 'Bowl sur mesure')}</span>
        <span className="block text-xs text-brand-muted">{t('So sieht der Bowl von oben aus. Größe wählen, dann eine Seite antippen und dort Nasen setzen.', 'This is the bowl seen from above. Choose the size, then tap a side to add noses there.', 'Voici le bowl vu de dessus. Choisissez la taille, puis touchez un côté pour y ajouter des nez.')}</span>
      </div>

      <div>
        <span className={titel}>{t('Wandhöhe', 'Wall height', 'Hauteur de paroi')}</span>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-brand-bg">
          {([98, 150] as const).map((h) => (
            <button key={h} type="button" onClick={() => setW({ ...w, h })} className={segment(w.h === h)}>
              {h} cm <span className="block text-[10px] font-medium text-brand-muted">{h === 98 ? t('flacher Bowl', 'shallow bowl', 'bowl peu profond') : t('tiefer Bowl', 'deep bowl', 'bowl profond')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stepper('l', t('Länge', 'Length', 'Longueur'), L)}
        {stepper('b', t('Breite', 'Width', 'Largeur'), B)}
      </div>

      <div className="relative w-full rounded-lg bg-brand-bg" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 w-full h-full">
          <path d={`${d} Z`} fill="#D9DBD2" stroke="#2C3530" strokeWidth={5} strokeLinejoin="round" />
        </svg>
        {seiten.map((s, i) => {
          const c = plus(plus(s.o, s.t, s.len / 2), s.n, raus[i] * sc + 17);
          const an = sel === i;
          return (
            <button key={i} type="button" onClick={() => setSel(i)} aria-label={t(`Seite ${namen[i]} wählen`, `Select ${namen[i]} side`, `Choisir le côté ${namen[i]}`)} aria-pressed={an}
              className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: `${(c[0] / W) * 100}%`, top: `${(c[1] / H) * 100}%` }}>
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${an ? 'bg-brand-orange border-brand-orange text-white' : 'bg-white border-brand-dark text-brand-dark'}`}>{w.nasen[i].n || '+'}</span>
            </button>
          );
        })}
      </div>

      <div className="p-2.5 rounded-lg border-2 border-brand-orange space-y-2">
        <span className="block text-xs font-bold text-brand-dark">{t(`Nasen an der Seite ${namen[sel]}`, `Noses on the ${namen[sel]} side`, `Nez du côté ${namen[sel]}`)}</span>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-brand-bg">
          {[0, 1, 2].map((n) => (
            <button key={n} type="button" onClick={() => seite(sel, { n })} className={segment(akt.n === n)}>
              {n === 0 ? t('Keine', 'None', 'Aucun') : n === 1 ? t('1 Nase', '1 nose', '1 nez') : t('2 Nasen', '2 noses', '2 nez')}
            </button>
          ))}
        </div>
        {akt.n > 0 && (
          <div className="grid grid-cols-2 gap-1.5">
            {[false, true].map((aussen) => (
              <button key={String(aussen)} type="button" onClick={() => seite(sel, { aussen })} aria-pressed={akt.aussen === aussen}
                className={`min-h-[56px] rounded-lg border-2 bg-white flex flex-col items-center justify-center gap-1 text-xs font-semibold text-brand-dark ${akt.aussen === aussen ? 'border-brand-orange' : 'border-brand-dark/10 hover:border-brand-dark/30'}`}>
                <svg width="44" height="18" aria-hidden="true"><path d={aussen ? 'M 2 15 L 12 15 L 12 10 A 10 8 0 0 1 32 10 L 32 15 L 42 15' : 'M 2 3 L 12 3 L 12 8 A 10 8 0 0 0 32 8 L 32 3 L 42 3'} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" /></svg>
                {aussen ? t('Aus dem Bowl heraus', 'Out of the bowl', 'Vers l’extérieur') : t('In den Bowl hinein', 'Into the bowl', 'Vers l’intérieur')}
              </button>
            ))}
          </div>
        )}
      </div>

      {anzahl > 0 && (
        <div>
          <span className={titel}>{t('Wie weit ragen die Nasen?', 'How far do the noses reach?', 'Jusqu’où vont les nez ?')}</span>
          <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-brand-bg">
            {[0, 1, 2].map((lang) => (
              <button key={lang} type="button" onClick={() => setW({ ...w, lang })} className={segment(w.lang === lang)}>
                {[t('Kurz', 'Short', 'Court'), t('Mittel', 'Medium', 'Moyen'), t('Lang', 'Long', 'Long')][lang]}
                <span className="block text-[10px] font-medium text-brand-muted">{lang === 0 ? t('nur Kegel', 'cones only', 'cônes seuls') : `+ ${meter(lang * RASTER)}`}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {gewachsen && <p className="text-xs rounded-md bg-brand-bg px-2.5 py-2 text-brand-dark">{t(`Damit die Nasen passen, wird der Bowl ${meter(L)} × ${meter(B)} groß.`, `To fit the noses, the bowl becomes ${meter(L)} × ${meter(B)}.`, `Pour loger les nez, le bowl mesure ${meter(L)} × ${meter(B)}.`)}</p>}

      <div className="pt-2 border-t border-brand-dark/10">
        <span className="block text-xs text-brand-muted mb-2">
          {`Bowl ${w.h} cm · ${meter(L)} × ${meter(B)} · `}
          {anzahl ? t(`${anzahl} ${anzahl === 1 ? 'Nase' : 'Nasen'}`, `${anzahl} ${anzahl === 1 ? 'nose' : 'noses'}`, `${anzahl} nez`) : t('ohne Nasen', 'no noses', 'sans nez')}
        </span>
        <button type="button" onClick={() => onSetzen(w)} className="w-full py-2.5 rounded-lg bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange">{t('Bowl setzen', 'Place bowl', 'Poser le bowl')}</button>
      </div>
    </div>
  );
}
