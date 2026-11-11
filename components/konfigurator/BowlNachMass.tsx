import { useMemo, useState } from 'react';
import { useT } from '../../i18n';
import { FLACH_MIN, MAX_NASEN, RASTER, bowlFormErgebnis, type Ctx, type NasenSeite, type Teil } from './logik';

export interface BowlWahl { h: 98 | 150; l: number; b: number; nasen: NasenSeite[]; lang: number }

const meter = (x: number) => `${x.toFixed(2).replace('.', ',')} m`;
const segment = (an: boolean) => `min-h-[40px] rounded-md text-xs font-semibold transition-colors ${an ? 'bg-brand-dark text-white [&>span]:text-white/70' : 'text-brand-dark/70 hover:text-brand-dark hover:bg-white/60'}`;

// Bowl nach Maß: Draufsicht aus der echten Coping-Linie, Seiten antippen statt Auswahllisten.
// Beim Setzen frisch bauen, damit jedes Setzen eigene Teile-IDs bekommt.
// Die Logik vergrößert den Bowl selbst, bis nichts überlappt und überall 2,50 m flacher Boden bleiben (B12).
export default function BowlNachMass({ ctx, onSetzen }: { ctx: Ctx | null; onSetzen: (teile: Teil[]) => void }) {
  const t = useT();
  const [w, setW] = useState<BowlWahl>({ h: 98, l: 3, b: 2, nasen: [0, 1, 2, 3].map(() => ({ n: 0, aussen: false })), lang: 0 });
  const [sel, setSel] = useState(0);
  const namen = [t('oben', 'top', 'haut'), t('rechts', 'right', 'droite'), t('unten', 'bottom', 'bas'), t('links', 'left', 'gauche')];
  const seite = (i: number, p: Partial<NasenSeite>) => setW({ ...w, nasen: w.nasen.map((x, j) => (j === i ? { ...x, ...p } : x)) });
  const e = useMemo(() => (ctx ? bowlFormErgebnis(w.h, w.l, w.b, w.nasen, w.lang, ctx) : null), [ctx, w]);
  const anzahl = w.nasen.reduce((a, x) => a + x.n, 0);
  const zunge = w.nasen.some((x) => x.n && !x.aussen);

  // Zeichnung: Coping-Linie, x nach rechts, z nach unten (unten = Startseite des Rings)
  const W = 300, H = 230, P = 30;
  const pts = e?.linie ?? [];
  const xs = pts.map((x) => x.p.x), zs = pts.map((x) => x.p.z);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs);
  const L = pts.length ? x1 - x0 : 0, B = pts.length ? z1 - z0 : 0;
  const sc = pts.length ? Math.min((W - 2 * P) / L, (H - 2 * P) / B) : 1;
  const ox = (W - L * sc) / 2 - x0 * sc, oz = (H - B * sc) / 2 - z0 * sc;
  const d = pts.map((x, i) => `${i ? 'L' : 'M'} ${(x.p.x * sc + ox).toFixed(1)} ${(x.p.z * sc + oz).toFixed(1)}`).join(' ');
  // flacher Boden: Coping-Linie um die Rampentiefe nach innen versetzt
  const rampe = ctx?.masse[`coping-ramp-${w.h}`];
  const tiefe = rampe ? (Math.abs(rampe.hoch!.x) > 0.5 ? rampe.l : rampe.b) : 0;
  const boden = pts.map((x, i) => `${i ? 'L' : 'M'} ${((x.p.x + x.n.x * tiefe) * sc + ox).toFixed(1)} ${((x.p.z + x.n.z * tiefe) * sc + oz).toFixed(1)}`).join(' ');
  const mx = W / 2, mz = H / 2, rand = 15;
  const punkte = [[mx, (H - B * sc) / 2 - rand], [(W + L * sc) / 2 + rand, mz], [mx, (H + B * sc) / 2 + rand], [(W - L * sc) / 2 - rand, mz]];
  const gewachsenL = !!e && e.sl > w.l * RASTER + 0.01, gewachsenB = !!e && e.sb > w.b * RASTER + 0.01;
  const schritte = (x: number) => Math.floor(x / RASTER + 0.05);

  const akt = w.nasen[sel];
  const titel = 'block text-[11px] font-semibold uppercase tracking-wider text-brand-muted mb-1.5';
  // Minus geht nicht, wenn die Automatik die Seite schon vergrößert hat: kleiner wäre nicht fahrbar
  const stepper = (key: 'l' | 'b', label: string, wert: number, gewachsen: boolean, gerade: number) => (
    <div>
      <span className={titel}>{label}</span>
      <div className="flex items-center justify-between rounded-lg border border-brand-dark/15 bg-white p-0.5">
        <button type="button" aria-label={`${label} −`} disabled={w[key] <= 1 || gewachsen} onClick={() => setW({ ...w, [key]: w[key] - 1 })} className="w-9 h-10 shrink-0 rounded-md bg-brand-bg text-lg font-semibold text-brand-dark disabled:opacity-35">−</button>
        <span className="text-[13px] font-bold text-brand-dark whitespace-nowrap">{meter(wert)}</span>
        <button type="button" aria-label={`${label} +`} disabled={schritte(gerade) >= 16} onClick={() => setW({ ...w, [key]: schritte(gerade) + 1 })} className="w-9 h-10 shrink-0 rounded-md bg-brand-bg text-lg font-semibold text-brand-dark disabled:opacity-35">+</button>
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
        {stepper('l', t('Länge', 'Length', 'Longueur'), L, gewachsenL, e?.sl ?? w.l * RASTER)}
        {stepper('b', t('Breite', 'Width', 'Largeur'), B, gewachsenB, e?.sb ?? w.b * RASTER)}
      </div>

      <div className="relative w-full rounded-lg bg-brand-bg" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 w-full h-full">
          <path d={`${d} Z`} fill="#C9CCC1" stroke="#2C3530" strokeWidth={4} strokeLinejoin="round" />
          <path d={`${boden} Z`} fill="#EEF0E8" />
        </svg>
        {punkte.map((c, i) => {
          const an = sel === i;
          return (
            <button key={i} type="button" onClick={() => setSel(i)} aria-label={t(`Seite ${namen[i]} wählen`, `Select ${namen[i]} side`, `Choisir le côté ${namen[i]}`)} aria-pressed={an}
              className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: `${(c[0] / W) * 100}%`, top: `${(c[1] / H) * 100}%` }}>
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${an ? 'bg-brand-orange border-brand-orange text-white' : 'bg-white border-brand-dark text-brand-dark'}`}>{w.nasen[i].n || '+'}</span>
            </button>
          );
        })}
      </div>

      <span className="flex items-center gap-3 text-[11px] text-brand-muted -mt-1">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#C9CCC1] border border-brand-dark/40" />{t('Rampe', 'Ramp', 'Rampe')}</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#EEF0E8] border border-brand-dark/20" />{t('flacher Boden', 'flat bottom', 'fond plat')}</span>
      </span>

      <div className="p-2.5 rounded-lg border-2 border-brand-orange space-y-2">
        <span className="block text-xs font-bold text-brand-dark">{t(`Nasen an der Seite ${namen[sel]}`, `Noses on the ${namen[sel]} side`, `Nez du côté ${namen[sel]}`)}</span>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-brand-bg">
          {[0, 1, 2].map((n) => (
            <button key={n} type="button" disabled={anzahl - akt.n + n > MAX_NASEN} onClick={() => seite(sel, { n })} className={`${segment(akt.n === n)} disabled:opacity-35 disabled:cursor-not-allowed`}>
              {n === 0 ? t('Keine', 'None', 'Aucun') : n === 1 ? t('1 Nase', '1 nose', '1 nez') : t('2 Nasen', '2 noses', '2 nez')}
            </button>
          ))}
        </div>
        {anzahl >= MAX_NASEN && <span className="block text-[11px] text-brand-muted">{t(`Höchstens ${MAX_NASEN} Nasen je Bowl. Mit mehr wechselt die Wand alle paar Meter die Richtung, und es bleibt keine Linie zum Fahren.`, `At most ${MAX_NASEN} noses per bowl. With more, the wall changes direction every few metres and no line is left to ride.`, `${MAX_NASEN} nez au maximum par bowl. Au-delà, la paroi change de direction tous les quelques mètres et il ne reste aucune ligne à rider.`)}</span>}
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

      {zunge && (
        <div>
          <span className={titel}>{t('Wie weit ragen die Nasen in den Bowl?', 'How far do the noses reach into the bowl?', 'Jusqu’où les nez entrent-ils dans le bowl ?')}</span>
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

      {(gewachsenL || gewachsenB) && <p className="text-xs rounded-md bg-brand-bg px-2.5 py-2 text-brand-dark">{t(`Damit nichts aneinanderstößt und überall mindestens ${meter(FLACH_MIN)} flacher Boden bleibt, ist der Bowl größer geworden.`, `So that nothing collides and at least ${meter(FLACH_MIN)} of flat bottom remains everywhere, the bowl has been enlarged.`, `Pour que rien ne se touche et qu’il reste partout au moins ${meter(FLACH_MIN)} de fond plat, le bowl a été agrandi.`)}</p>}
      {!e && ctx && <p className="text-xs rounded-md bg-red-50 px-2.5 py-2 text-red-800">{t('Diese Form lässt sich nicht bauen. Bitte eine Nase weniger wählen.', 'This shape cannot be built. Please choose one nose fewer.', 'Cette forme ne peut pas être construite. Choisissez un nez de moins.')}</p>}

      <div className="pt-2 border-t border-brand-dark/10">
        <span className="block text-xs text-brand-muted mb-2">
          {t(`Bowl ${w.h} cm · ${meter(L)} × ${meter(B)} von Coping zu Coping · `, `Bowl ${w.h} cm · ${meter(L)} × ${meter(B)} coping to coping · `, `Bowl ${w.h} cm · ${meter(L)} × ${meter(B)} de coping à coping · `)}
          {anzahl ? t(`${anzahl} ${anzahl === 1 ? 'Nase' : 'Nasen'}`, `${anzahl} ${anzahl === 1 ? 'nose' : 'noses'}`, `${anzahl} nez`) : t('ohne Nasen', 'no noses', 'sans nez')}
        </span>
        <button type="button" disabled={!e} onClick={() => { const neu = ctx && bowlFormErgebnis(w.h, w.l, w.b, w.nasen, w.lang, ctx); if (neu) onSetzen(neu.teile); }} className="w-full py-2.5 rounded-lg bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange disabled:opacity-40">{t('Bowl setzen', 'Place bowl', 'Poser le bowl')}</button>
      </div>
    </div>
  );
}
