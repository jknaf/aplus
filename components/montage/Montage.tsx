import React, { Suspense, lazy, useState } from 'react';
import { Link, useLang, useT } from '../../i18n';
import ModellAnsicht from '../katalog/ModellAnsicht';

// Bausteine der Montageanleitungen (Grillplatz, Umkleidekabine) im Design des Canvas „Montageanleitung Grillstelle“.
// Bilder und 3D-Modell liegen unter /montage/<name>/, die PDF zum Blättern im R2-Bucket (api/anleitung.ts).
const Blaetterkatalog = lazy(() => import('../katalog/Blaetterkatalog'));

export const Kicker: React.FC<{ children: React.ReactNode; leise?: boolean }> = ({ children, leise }) => (
  <span className={`font-mono text-xs uppercase tracking-[0.14em] ${leise ? 'text-brand-dark/60' : 'text-[#4F6C35]'}`}>{children}</span>
);

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-heading font-bold text-[28px] md:text-[34px] leading-tight [word-spacing:0.08em] m-0">{children}</h2>
);

export const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[17px] leading-relaxed text-[#3A433E] m-0">{children}</p>
);

export const Achtung: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useT();
  return (
    <div className="flex gap-3 px-4 py-3.5 rounded-lg bg-[#FFF4E0] border border-[#E8C98A] text-[15px] leading-relaxed text-[#4A3A12]">
      <b className="whitespace-nowrap">{t('Achtung', 'Caution', 'Attention')}</b><span>{children}</span>
    </div>
  );
};

export const Hinweis: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex gap-3 px-4 py-3.5 rounded-lg bg-white border border-brand-dark/10 text-[15px] leading-relaxed text-[#3A433E]">
    <b className="whitespace-nowrap">{label}</b><span>{children}</span>
  </div>
);

export const Liste: React.FC<{ punkte: React.ReactNode[] }> = ({ punkte }) => (
  <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
    {punkte.map((p, i) => (
      <li key={i} className="flex gap-3 text-base leading-relaxed text-[#3A433E]">
        <span aria-hidden="true" className="shrink-0 w-2 h-2 mt-[9px] rounded-[2px] bg-brand-orange" />
        <span>{p}</span>
      </li>
    ))}
  </ul>
);

export const Tabelle: React.FC<{ kopf?: string[]; zeilen: React.ReactNode[][]; ersteBreite?: string }> = ({ kopf, zeilen, ersteBreite }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-[15px]">
      {kopf && (
        <thead>
          <tr>{kopf.map((k, i) => <th key={i} style={i === 0 && ersteBreite ? { width: ersteBreite } : undefined} className="text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-brand-dark/65 px-3 py-3 first:pl-0">{k}</th>)}</tr>
        </thead>
      )}
      <tbody>
        {zeilen.map((z, i) => (
          <tr key={i}>{z.map((c, j) => <td key={j} style={j === 0 && ersteBreite && !kopf ? { width: ersteBreite } : undefined} className="align-top leading-normal px-3 py-3.5 first:pl-0 border-t border-brand-dark/10">{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block font-mono text-xs px-2 py-[3px] rounded bg-brand-dark text-white whitespace-nowrap">{children}</span>
);

// ?druck: alle Bilder sofort laden, sonst fehlen sie in der PDF (Chrome lädt beim Drucken keine Bilder unterhalb des Fensters)
const DRUCK = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('druck');

export const Bild: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
  <div className={`bg-[#E5E3DC] rounded-xl aspect-[7/5] overflow-hidden ${className}`}>
    <img src={src} alt={alt} loading={DRUCK ? 'eager' : 'lazy'} decoding="async" width="1100" height="786" className="w-full h-full object-cover" />
  </div>
);

export type SchrittDaten = { id: string; bild: string; alt: string; kurz: string; titel: string; inhalt: React.ReactNode };

export const Ablauf: React.FC<{ schritte: SchrittDaten[] }> = ({ schritte }) => {
  const t = useT();
  return (
    <section data-kein-druck className="max-w-[1160px] mx-auto px-4 md:px-8 pt-16 md:pt-[72px]">
      <Kicker leise>{t('Ablauf', 'Sequence', 'Déroulement')}</Kicker>
      <nav data-kein-druck aria-label={t('Montageschritte', 'Installation steps', 'Étapes de montage')} className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
        {schritte.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className="flex flex-col gap-2 no-underline text-brand-dark text-[13px] leading-snug hover:text-[#4F6C35]">
            <span className="bg-[#E5E3DC] rounded-lg aspect-[7/5] overflow-hidden"><img src={s.bild} alt="" loading="lazy" className="w-full h-full object-cover" /></span>
            <span><b>{i + 1}</b> {s.kurz}</span>
          </a>
        ))}
      </nav>
    </section>
  );
};

export const Schritte: React.FC<{ schritte: SchrittDaten[] }> = ({ schritte }) => {
  const t = useT();
  return (
    <section className="max-w-[1160px] mx-auto px-4 md:px-8 pt-20 md:pt-24">
      <Kicker>{t('Montage', 'Installation', 'Montage')}</Kicker>
      <div className="mt-3 mb-6"><H2>{t('Schritt für Schritt', 'Step by step', 'Étape par étape')}</H2></div>
      {schritte.map((s, i) => (
        <div key={s.id} id={s.id} className="m-zwei scroll-mt-28 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 md:gap-12 items-center py-10 md:py-14 border-t border-brand-dark/10 break-inside-avoid">
          <Bild src={s.bild} alt={s.alt} />
          <div className="flex flex-col gap-4">
            <span className="font-heading font-extrabold text-[15px] w-10 h-10 rounded-full bg-brand-dark text-white inline-flex items-center justify-center">{i + 1}</span>
            <h3 className="font-heading font-bold text-2xl leading-tight [word-spacing:0.06em] m-0">{s.titel}</h3>
            {s.inhalt}
          </div>
        </div>
      ))}
    </section>
  );
};

// Kopfleiste unter dem Seitenkopf: zurück zum Produkt, PDF zum Blättern (je Sprache), Drucken
export const Leiste: React.FC<{ zurueck: string; zurueckText: string; pdf: string }> = ({ zurueck, zurueckText, pdf }) => {
  const t = useT();
  const lang = useLang();
  const [link, setLink] = useState<{ ansehen: string } | null>(null);
  const [fehler, setFehler] = useState(false);
  const oeffnen = () => {
    setFehler(false);
    fetch(`/api/anleitung?name=${pdf}&lang=${lang}`).then((r) => (r.ok ? r.json() : Promise.reject())).then(setLink).catch(() => setFehler(true));
  };
  const knopf = 'inline-flex items-center gap-2 min-h-[44px] px-[18px] rounded-lg font-semibold text-[15px] no-underline';
  return (
    <div className="border-b border-brand-dark/10 print:hidden">
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 flex flex-wrap gap-3 justify-between items-center min-h-[64px] py-2">
        <Link to={zurueck} className="inline-flex items-center gap-2 text-brand-dark font-semibold no-underline hover:text-[#4F6C35]">
          <span className="material-symbols-outlined text-xl" aria-hidden="true">arrow_back</span>{zurueckText}
        </Link>
        <div className="flex flex-wrap gap-2 items-center">
          {fehler && <span className="text-sm text-[#8A2E1F]">{t('Die PDF lässt sich gerade nicht öffnen.', 'The PDF cannot be opened right now.', "Le PDF ne peut pas être ouvert pour le moment.")}</span>}
          <button type="button" onClick={oeffnen} className={`${knopf} border border-brand-dark/20 text-brand-dark hover:border-brand-dark/50`}>{t('PDF zum Blättern', 'Flip through PDF', 'Feuilleter le PDF')}</button>
          <button type="button" onClick={() => window.print()} className={`${knopf} bg-brand-dark text-white hover:bg-[#4F6C35]`}>{t('Drucken', 'Print', 'Imprimer')}</button>
        </div>
      </div>
      {link && (
        <Suspense fallback={null}>
          <Blaetterkatalog links={link} onClose={() => setLink(null)} titel={t('Montageanleitung', 'Installation instructions', 'Notice de montage')}
            fehlerText={t('Die PDF lässt sich gerade nicht öffnen. Bitte die Seite neu laden.', 'The PDF cannot be opened right now. Please reload the page.', 'Le PDF ne peut pas être ouvert pour le moment. Veuillez recharger la page.')} />
        </Suspense>
      )}
    </div>
  );
};

export const Kopf: React.FC<{ kicker: string; titel: string; texte: React.ReactNode[]; modell: { src: string; poster: string; alt: string; kamera: { ziel: [number, number, number]; abstand: number } }; masse: string; titelbild: string }> = ({ kicker, titel, texte, modell, masse, titelbild }) => {
  const t = useT();
  return (
    <>
      <section data-kein-druck className="max-w-[1160px] mx-auto px-4 md:px-8 pt-10 md:pt-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-5">
            <Kicker>{kicker}</Kicker>
            <h1 className="m-0 font-heading font-extrabold text-[40px] md:text-[52px] leading-[1.1] [word-spacing:0.1em]">{titel}</h1>
            {texte.map((x, i) => i === 0 ? <Text key={i}>{x}</Text> : <p key={i} className="m-0 text-[15px] leading-relaxed text-brand-dark/70">{x}</p>)}
          </div>
          <div className="relative bg-[#E5E3DC] rounded-xl aspect-[4/3] overflow-hidden">
            <ModellAnsicht {...modell} />
            <span className="absolute left-4 top-4 font-mono text-xs uppercase tracking-[0.14em] text-brand-dark pointer-events-none">{t('3D-Modell', '3D model', 'Modèle 3D')}</span>
            <span className="absolute left-4 bottom-4 px-3 py-2 rounded bg-brand-dark text-white font-mono text-[13px] pointer-events-none">{masse}</span>
            <span className="absolute right-4 bottom-4 text-[13px] text-brand-dark/70 pointer-events-none">{t('Ziehen zum Drehen', 'Drag to rotate', 'Glisser pour pivoter')}</span>
          </div>
        </div>
      </section>
      {/* Titelseite der PDF im Stil des Katalogs: Bild oben, Titel unten, Kontakt am Fuß */}
      <section data-nur-druck className="m-titel">
        <div className="m-titel-bild"><img src={titelbild} alt="" /></div>
        <img className="m-titel-logo" src="/aplus-logo.svg" alt="A+ Urban Design" />
        <span className="m-titel-ausg">{t('Ausgabe 2026', 'Edition 2026', 'Édition 2026')}</span>
        <div className="m-titel-text">
          <Kicker>{kicker}</Kicker>
          <h1>{titel}</h1>
          <p>{texte[0]}</p>
          <span className="m-titel-masse">{masse}</span>
        </div>
        <div className="m-titel-fuss"><span>Talstrasse 41, 70188 Stuttgart</span><span>aplusurbandesign.com · +49 155 600 909 66</span></div>
      </section>
    </>
  );
};

// Druck (Knopf „Drucken“ und PDF zum Blättern, gebaut mit scripts/montage_pdf.mjs): A4 mit Kopf- und Fußzeile wie der Katalog,
// ohne Seitenkopf, Fuß, Datenschutz-Hinweis, Ablaufleiste und 3D-Ansicht.
const druckCss = (kopf: string) => `
[data-nur-druck] { display: none; }
@media print {
  @page { size: A4; margin: 21mm 15mm 17mm 15mm; background: #F2F0EB;
    @top-left { content: "A+ URBAN DESIGN"; font: 800 9pt 'Plus Jakarta Sans', sans-serif; letter-spacing: .06em; color: #2C3530; vertical-align: bottom; padding-bottom: 7mm; }
    @top-right { content: "${kopf}"; font: 500 7.5pt ui-monospace, monospace; letter-spacing: .12em; color: #5F6159; vertical-align: bottom; padding-bottom: 7mm; }
    @bottom-left { content: counter(page, decimal-leading-zero); font: 500 8pt ui-monospace, monospace; color: #2C3530; vertical-align: top; padding-top: 7mm; }
    @bottom-right { content: "aplusurbandesign.com"; font: 400 7.5pt Inter, sans-serif; color: #5F6159; vertical-align: top; padding-top: 7mm; } }
  /* Titelseite: seitlich gleicher Rand wie die übrigen Seiten, sonst setzt Chrome alle Seiten 210 mm breit; das Bild läuft per negativem Rand an die Kante */
  @page titel { margin: 0 15mm; @top-left { content: none } @top-right { content: none } @bottom-left { content: none } @bottom-right { content: none } }
  html, body { background: #F2F0EB !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  #root header, #root footer, body .fixed, [data-kein-druck] { display: none !important; }   /* .fixed: Hintergrund, mobiles Menü, Datenschutz-Hinweis */
  [data-nur-druck] { display: block; }
  .m-rahmen { padding: 0 !important; font-size: 12px; }
  .m-rahmen p, .m-rahmen li, .m-rahmen td, .m-rahmen div { font-size: 11.5px !important; }
  .m-rahmen h2 { font-size: 24px !important; } .m-rahmen h3 { font-size: 18px !important; }
  .m-rahmen section { padding: 0 !important; margin-top: 10mm; max-width: none !important; }
  .m-zwei { grid-template-columns: 1fr 1fr !important; gap: 10mm !important; padding: 8mm 0 !important; break-inside: avoid; }
  .m-rahmen .grid { break-inside: avoid; }
  .m-titel { page: titel; position: relative; width: 210mm; height: 297mm; margin: 0 -15mm !important; overflow: hidden; break-after: page; }
  .m-titel-bild { position: absolute; left: 0; top: 0; width: 210mm; height: 175mm; background: #E5E3DC; }
  .m-titel-bild img { width: 100%; height: 100%; object-fit: cover; }
  .m-titel-logo { position: absolute; left: 15mm; top: 12.5mm; width: 40mm; }
  .m-titel-ausg { position: absolute; right: 15mm; top: 16mm; font: 500 8pt ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; }
  .m-titel-text { position: absolute; left: 15mm; right: 15mm; top: 190mm; display: flex; flex-direction: column; gap: 4.5mm; }
  .m-titel-text h1 { margin: 0; font: 800 44pt/1 'Plus Jakarta Sans', sans-serif; word-spacing: .08em; }
  .m-titel-text p { margin: 0; max-width: 150mm; font-size: 11.5pt; line-height: 1.5; color: #4A4F4B; }
  .m-titel-masse { align-self: flex-start; font: 500 9pt ui-monospace, monospace; padding: 1.5mm 3mm; background: #2C3530; color: #fff; }
  .m-titel-fuss { position: absolute; left: 15mm; right: 15mm; bottom: 12.5mm; display: flex; justify-content: space-between; border-top: 1px solid rgba(44,53,48,.18); padding-top: 3.5mm; font-size: 9pt; color: #5F6159; }
}`;

export const Rahmen: React.FC<{ kopfzeile: string; children: React.ReactNode }> = ({ kopfzeile, children }) => (
  <div className="m-rahmen pt-24 md:pt-28 pb-24 bg-brand-bg text-brand-dark">
    <style>{druckCss(kopfzeile)}</style>
    {children}
  </div>
);
