import React from 'react';
import { createPortal } from 'react-dom';
import { umriss, type Ctx, type Park, type V, type Zeile, type Zusatz } from './logik';
import { bildBlatt, planBlatt, type Netz } from './plan2d';
import { aktuelleLocale, tt, useT } from '../../i18n';

// Druckansicht für „PDF erstellen“, alles A4 quer: 3D-Ansicht, Bauplan (Grundriss und Schnitt aus den Modellen), Stückliste im Angebotslook.
// Gedruckt wird über den Browser (Ziel „Als PDF sichern“); im Bildschirm ist der Bereich unsichtbar.

export interface DruckOptionen { titel: string; ansicht3d: boolean; plan: boolean; liste: boolean }

interface Props {
  park: Park; ctx: Ctx; zusatz: Zusatz[]; zeilen: Zeile[]; hinweise: string[]; optionen: DruckOptionen
  bild3d: string; netze: Record<string, Netz>; qr: string
}

const box = (p: V[]) => ({
  x0: Math.min(...p.map((q) => q.x)), x1: Math.max(...p.map((q) => q.x)),
  z0: Math.min(...p.map((q) => q.z)), z1: Math.max(...p.map((q) => q.z)),
});

// Draufsicht für den Bildschirm (Ersatz, wenn die 3D-Bühne ausfällt)
export const Plan: React.FC<{ park: Park; ctx: Ctx; zusatz: Zusatz[]; bezeichnungen?: boolean }> = ({ park, ctx, zusatz, bezeichnungen = true }) => {
  const { l, b } = park.flaeche;
  const rand = 0.6;
  const s = Math.max(l, b) / 30; // Strichstärken und Schrift mit der Größe skalieren
  const raster: React.ReactNode[] = [];
  for (let x = -l / 2; x <= l / 2 + 1e-6; x += 1.25) raster.push(<line key={`x${x}`} x1={x} y1={-b / 2} x2={x} y2={b / 2} />);
  for (let z = -b / 2; z <= b / 2 + 1e-6; z += 1.25) raster.push(<line key={`z${z}`} x1={-l / 2} y1={z} x2={l / 2} y2={z} />);
  return (
    <svg viewBox={`${-l / 2 - rand} ${-b / 2 - rand} ${l + 2 * rand} ${b + 2 * rand}`} className="w-full h-auto" style={{ maxHeight: '150mm' }}>
      <rect x={-l / 2} y={-b / 2} width={l} height={b} fill="#F2F0EB" stroke="#8A8A80" strokeWidth={0.03 * s} />
      <g stroke="#D0CEC7" strokeWidth={0.01 * s}>{raster}</g>
      {park.teile.map((t) => {
        const p = umriss(t, ctx);
        const c = p.reduce((a, q) => ({ x: a.x + q.x / p.length, z: a.z + q.z / p.length }), { x: 0, z: 0 });
        const bb = box(p);
        const breite = Math.max(bb.x1 - bb.x0, bb.z1 - bb.z0);
        const hoehe = Math.min(bb.x1 - bb.x0, bb.z1 - bb.z0);
        const quer = bb.z1 - bb.z0 > bb.x1 - bb.x0; // Schrift entlang der langen Seite
        const name = ctx.info[t.slug]?.name ?? t.slug;
        const code = ctx.info[t.slug]?.code ?? '';
        // Name und Kürzel, Schrift so klein, dass beides in das Element passt
        const fs = Math.min(0.24 * s, (breite * 0.9) / (Math.max(name.length, code.length) * 0.58), hoehe * 0.32);
        return (
          <g key={t.id}>
            <polygon points={p.map((q) => `${q.x},${q.z}`).join(' ')} fill="#E5E3DC" stroke="#2C3530" strokeWidth={0.025 * s} />
            {bezeichnungen && fs > 0.04 && (
              <g transform={quer ? `rotate(-90 ${c.x} ${c.z})` : undefined}>
                <text x={c.x} y={c.z} dy={-0.1 * fs} fontSize={fs} textAnchor="middle" fill="#2C3530" fontWeight="bold">{name}</text>
                <text x={c.x} y={c.z} dy={1.05 * fs} fontSize={fs * 0.85} textAnchor="middle" fill="#5A5A54">{code}</text>
              </g>
            )}
          </g>
        );
      })}
      {zusatz.filter((z) => z.slug.startsWith('gelaender')).map((z, i) => {
        const p = umriss({ id: `g${i}`, slug: z.slug, x: z.x, z: z.z, rot: z.rot }, ctx);
        return <polygon key={i} points={p.map((q) => `${q.x},${q.z}`).join(' ')} fill="#6B8F4A" stroke="none" />;
      })}
    </svg>
  );
};

const ZEILEN_JE_SEITE = 11;
const kg = (x: number) => `${x.toLocaleString(aktuelleLocale())} kg`;
// „H / L / B“ der Preisliste in cm
const masse = (cm?: string) => {
  const [h, l, b] = (cm ?? '').split('/').map((x) => x.trim());
  return h && l && b ? `H ${h} · L ${l} · ${tt('B', 'W', 'l')} ${b} cm` : '';
};

const Druck: React.FC<Props> = ({ park, ctx, zusatz, zeilen, hinweise, optionen, bild3d, netze, qr }) => {
  const t = useT();
  const datum = new Date().toLocaleDateString(aktuelleLocale(), { day: '2-digit', month: '2-digit', year: 'numeric' });
  const titel = optionen.titel.trim() || t('Skatepark', 'Skatepark', 'Skatepark');
  const kopf = { titel, datum };
  const gewicht = zeilen.reduce((s, z) => s + (z.kg ?? 0), 0);
  const seiten: Zeile[][] = [];
  for (let i = 0; i < zeilen.length; i += ZEILEN_JE_SEITE) seiten.push(zeilen.slice(i, i + ZEILEN_JE_SEITE));
  const fuss = <footer className="absolute left-[12mm] right-[12mm] bottom-[8mm] border-t border-black pt-1.5 text-[7.5pt] text-[#555] flex justify-between">
    <span>A+ Urban Design · Talstraße 41 · 70188 Stuttgart</span><span>post@aplusurbandesign.com · www.aplusurbandesign.com</span>
  </footer>;
  return createPortal(
    <div className="druck-bereich hidden text-black bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <style>{`
        @page { size: A4 landscape; margin: 0; }
        @media print {
          html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
          body > *:not(.druck-bereich) { display: none !important; }
          .druck-bereich { display: block !important; }
          .druck-seite { width: 297mm; height: 210mm; overflow: hidden; position: relative; break-after: page; }
          .druck-seite:last-child { break-after: auto; }
          .druck-bereich * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
      {optionen.ansicht3d && bild3d && (
        <section className="druck-seite" dangerouslySetInnerHTML={{ __html: bildBlatt(bild3d, { ...kopf, planinhalt: `${t('3D-Ansicht', '3D view', 'Vue 3D')} · ${park.teile.length} ${t('Elemente', 'elements', 'éléments')}`, massstab: t('OHNE MASSSTAB', 'NOT TO SCALE', 'SANS ÉCHELLE') }) }} />
      )}
      {optionen.plan && (
        <section className="druck-seite" dangerouslySetInnerHTML={{ __html: planBlatt({ park, ctx, zusatz, netze, kopf }) }} />
      )}
      {optionen.liste && seiten.map((zs, s) => (
        <section key={s} className="druck-seite px-[12mm] pt-[10mm]">
          <header className="flex items-end justify-between">
            <img src="/aplus-logo.svg" alt="A+ Urban Design" style={{ height: '13mm' }} />
            <div className="text-right text-[8pt] text-[#555]">www.aplusurbandesign.com</div>
          </header>
          <div className="border-t border-black mt-2 mb-4" />
          <div className="flex justify-between items-baseline text-[9pt] mb-3">
            <div><span className="text-[14pt] font-bold mr-3">{t("Stückliste", "Parts list", "Liste des pièces")}</span>{t('Projekt', 'Project', 'Projet')}: {titel}</div>
            <div>{datum} · {t('Seite', 'Page', 'Page')} {s + 1}/{seiten.length}</div>
          </div>
          {s === 0 && (
            <p className="text-[9pt] mb-3">
              {t('Fläche', 'Area', 'Surface')} {park.flaeche.l.toLocaleString(aktuelleLocale())} × {park.flaeche.b.toLocaleString(aktuelleLocale())} m, {park.teile.length} {t('Elemente', 'elements', 'éléments')},{' '}
              {park.flaeche.angeboescht ? t('angeböscht', 'banked up', 'taluté') : t('freistehend', 'free-standing', 'autoportant')}. {t('Geländer und Hinweisschild sind nach DIN EN 14974 automatisch ergänzt.', 'Railings and the information sign are added automatically to EN 14974.', "Les garde-corps et le panneau d'information sont ajoutés automatiquement selon la norme EN 14974.")}
            </p>
          )}
          <table className="w-full text-[9pt] border-collapse">
            <thead>
              <tr className="border-y border-black text-left">
                <th className="py-1 pr-3 w-[12mm] font-normal">{t("Pos.", "Item", "Pos.")}</th>
                <th className="py-1 pr-3 font-normal">{t("Bezeichnung", "Description", "Désignation")}</th>
                <th className="py-1 pr-3 text-right w-[22mm] font-normal">{t("Menge", "Quantity", "Quantité")}</th>
                <th className="py-1 text-right w-[30mm] font-normal">{t("Gewicht ca.", "Weight approx.", "Poids env.")}</th>
              </tr>
            </thead>
            <tbody>
              {zs.map((z, i) => {
                const m = masse(z.slug ? ctx.info[z.slug]?.masse : undefined);
                return (
                  <tr key={z.code + z.name} className="border-b border-[#ccc] align-top">
                    <td className="py-1.5 pr-3">{String(s * ZEILEN_JE_SEITE + i + 1).padStart(3, '0')}</td>
                    <td className="py-1.5 pr-3">
                      <div><span className="font-bold">{z.code}</span><span className="text-[#888]"> ____ </span>{z.name}</div>
                      {(m || z.auto) && <div className="text-[8pt] text-[#555]">{[m, z.auto ? t('automatisch ergänzt', 'added automatically', 'ajouté automatiquement') : ''].filter(Boolean).join(' · ')}</div>}
                    </td>
                    <td className="py-1.5 pr-3 text-right whitespace-nowrap">{z.menge} {t('St.', 'pcs', 'pce')}</td>
                    <td className="py-1.5 text-right whitespace-nowrap">{z.kg ? kg(z.kg) : ''}</td>
                  </tr>
                );
              })}
              {s === seiten.length - 1 && gewicht > 0 && (
                <tr className="border-b border-black"><td /><td className="py-1.5 font-bold">{t("Gesamtgewicht ca.", "Total weight approx.", "Poids total env.")}</td><td /><td className="py-1.5 text-right font-bold whitespace-nowrap">{kg(gewicht)}</td></tr>
              )}
            </tbody>
          </table>
          {s === seiten.length - 1 && (
            <div className="mt-4 flex gap-6 items-start text-[8pt] text-[#333]">
              <div className="flex-1">
                {hinweise.length > 0 && <div className="mb-2"><strong>{t('Offene Hinweise:', 'Open notes:', 'Remarques en suspens :')}</strong><ul className="list-disc ml-4">{hinweise.map((h) => <li key={h}>{h}</li>)}</ul></div>}
                <p>{t('Planung schematisch, erstellt mit dem Konfigurator von A+ Urban Design. Preise, Fracht und Montage erhalten Sie mit dem Angebot; bauseitige Leistungen sind nicht enthalten. Maßgeblich ist das Angebot.', 'Schematic plan, created with the A+ Urban Design planner. Prices, freight and installation costs are set out in the quotation. Work by others is not included. The quotation is binding.', "Plan schématique, établi avec le configurateur d'A+ Urban Design. Les prix, le transport et le montage figurent dans l'offre ; les prestations à la charge du client ne sont pas comprises. L'offre fait foi.")}</p>
              </div>
              {qr && (
                <div className="flex items-center gap-2 shrink-0">
                  <div style={{ width: '26mm', height: '26mm' }} dangerouslySetInnerHTML={{ __html: qr }} />
                  <div className="w-[28mm]">{t('Planung online öffnen: Code mit dem Handy scannen.', 'Open the plan online: scan the code with your phone.', 'Ouvrir le plan en ligne : scannez le code avec votre téléphone.')}</div>
                </div>
              )}
            </div>
          )}
          {fuss}
        </section>
      ))}
    </div>,
    document.body,
  );
};

export default Druck;
