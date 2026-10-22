import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Link, LOCALE, dezimal, useLang, useNavigate, useT } from '../i18n';
import PageShell from '../components/PageShell';
import ModellAnsicht from '../components/katalog/ModellAnsicht';
import { konfiguratorFrei, useKonfiguratorFrei, usePreise } from '../components/katalog/usePreise';
import CodeDialog, { useKonfiguratorCode } from '../components/katalog/CodeDialog';
import { gruppenName, teilName } from '../localized';
import { anzahlImPark, merken } from '../components/konfigurator/merkliste';
import type { ParkTeil, Boeschung } from '../components/katalog/ParkAnsicht';
import Plankopf, { Kopfleiste } from '../components/Plankopf';

const ParkAnsicht = lazy(() => import('../components/katalog/ParkAnsicht'));
const Blaetterkatalog = lazy(() => import('../components/katalog/Blaetterkatalog'));

// Daten: public/katalog/katalog.json, erzeugt aus der Archicad-Skate-Bibliothek
// (08_CAD_Blender/10_Katalog/katalog_web.py). Preise kommen nur über /api/skate-preise.

interface Parameter { name: string; typ: string; wert: unknown; beschreibung: string }
interface Element {
  slug: string; name: string; gruppe: string; element: string; kuerzel: string;
  preisliste_code: string; preisliste_produkt: string; preisliste_masse_cm: string;
  modell_masse_cm: { laenge: number; breite: number; hoehe: number };
  kamera?: { ziel: [number, number, number]; abstand: number };
  gdl_standard_m: Record<string, number>; gdl_parameter: Parameter[];
  materialien: string[]; makros: string[];
  modell: string; bild: string;
  gewicht: { kg: number; hinweis: string } | null;
}
interface Katalog { stand: string; quelle: string; gruppen: string[]; elemente: Element[] }

// Skatepark-Beispiele: public/katalog/parks.json, erzeugt von 08_CAD_Blender/08_Preisliste/parks_web.py.
// Preise je Park (id) und Elementgruppe (id:A…) kommen wie die Elementpreise nur über /api/skate-preise.
interface Beispiel {
  id: string; nr: number; name: string; laenge_m: string; breite_m: string; hoehe_cm: [number, number]; anzahl: number;
  gruppen: { teil: string; h: string; l: number; b: number }[];
  stueckliste: { slug: string; name: string; anzahl: number }[];
  bild: string; extra: string | null; flaeche: number[] | null; boeschung?: Boeschung[] | null; teile: ParkTeil[];
}

const qm = (p: Beispiel) => Math.round(parseFloat(p.laenge_m.replace(',', '.')) * parseFloat(p.breite_m.replace(',', '.')));
const GROESSEN = [
  { name: ['Alle', 'All', 'Tous'] as [string, string, string], passt: () => true },
  { name: ['Bis 300 m²', 'Up to 300 m²', "Jusqu'à 300 m²"] as [string, string, string], passt: (p: Beispiel) => qm(p) <= 300 },
  { name: ['300 bis 400 m²', '300 to 400 m²', '300 à 400 m²'] as [string, string, string], passt: (p: Beispiel) => qm(p) > 300 && qm(p) <= 400 },
  { name: ['Über 400 m²', 'Over 400 m²', 'Plus de 400 m²'] as [string, string, string], passt: (p: Beispiel) => qm(p) > 400 },
];
const PARKS_JE_REIHE = 3; // Raster xl: 3 Spalten
const TEILE_JE_REIHE = 4; // Raster xl: 4 Spalten
const MehrLaden: React.FC<{ rest: number; onClick: () => void }> = ({ rest, onClick }) => {
  const t = useT();
  return rest > 0 ? (
  <div className="text-center mt-8">
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-dark/15 text-brand-dark font-bold uppercase tracking-wider text-sm hover:border-brand-orange hover:text-brand-orange transition-colors">
      {t('Mehr laden', 'Load more', 'Charger plus')} <span className="font-mono text-xs text-brand-muted">{rest} {t('weitere', 'more', 'de plus')}</span><span className="material-symbols-outlined text-lg">expand_more</span>
    </button>
  </div>
) : null;
};
const sternchen = (p: Beispiel) => p.laenge_m.endsWith('*') || p.breite_m.endsWith('*');
const hoehen = (p: Beispiel) => p.hoehe_cm[0] === p.hoehe_cm[1] ? `${p.hoehe_cm[0]} cm` : `${p.hoehe_cm[0]}–${p.hoehe_cm[1]} cm`;

// Hinweise zum Gewicht stehen deutsch in den Katalogdaten
const hinweis = (h: string, t: (de: string, en: string, fr: string) => string) =>
  h
    .replace('gilt für L und R', t('gilt für L und R', 'applies to L and R', 'valable pour L et R'))
    .replace(/^(\d+) Teile à ca\./, (_, n) => `${n} ${t('Teile à ca.', 'parts at approx.', 'éléments à env.')}`)
    .replace('mit Connector, ohne Connector ca.', t('mit Connector, ohne Connector ca.', 'with connector, without connector approx.', 'avec connecteur, sans connecteur env.'))
    .replace(/^Liste:/, t('Liste:', 'List:', 'Liste :'));

const gruppenId = (g: string) => 'gruppe-' + g.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-');

const preisText = (roh: string | undefined, loc: string) => {
  if (!roh) return null;
  const zahl = Number(roh.replace(/[^\d]/g, ''));
  return zahl ? zahl.toLocaleString(loc) + ' €' : roh;
};

// Preisliste: „H / L / B / W“ in cm, W = Winkel in Grad
const masseAusPreisliste = (s: string) => {
  const t = s.split(/\s\/\s/).map((x) => x.trim());
  return t.length >= 3 ? { h: t[0], l: t[1], b: t[2], w: t[3] } : null;
};

const kurzMasse = (e: Element, t: (de: string, en: string, fr: string) => string) => {
  const p = masseAusPreisliste(e.preisliste_masse_cm);
  if (p) return `H ${p.h} · L ${p.l} · ${t('B', 'W', 'l')} ${p.b} cm`;
  const m = e.modell_masse_cm;
  return `H ${m.hoehe} · L ${Math.max(m.laenge, m.breite)} · ${t('B', 'W', 'l')} ${Math.min(m.laenge, m.breite)} cm`;
};

// Die CAD-Oberflächen (z. B. „Anstrich“, „Kiefer“) sind nur Archicad-Darstellung, nicht das Produktmaterial.
const material = (e: Element, t: (de: string, en: string, fr: string) => string) => {
  const metall = (m: string) => /stahl|zink|alu/i.test(m);
  if (e.materialien.length && e.materialien.every(metall)) return t('Stahl, verzinkt', 'Steel, galvanised', 'Acier galvanisé');
  return e.materialien.some(metall)
    ? t('Stahlbeton C35/45, Stahl (verzinkt / Edelstahl)', 'Reinforced concrete C35/45, steel (galvanised / stainless)', 'Béton armé C35/45, acier (galvanisé / inox)')
    : t('Stahlbeton C35/45', 'Reinforced concrete C35/45', 'Béton armé C35/45');
};

const PreisBadge: React.FC<{ preis: string | null; gross?: boolean; onSperre: () => void }> = ({ preis, gross, onSperre }) => {
  const t = useT();
  return preis ? (
    <span className={`font-heading font-extrabold text-brand-dark ${gross ? 'text-3xl' : 'text-base'}`}>
      {preis}{preis.includes('€') && <span className="text-xs font-sans font-normal text-brand-muted"> {t('netto', 'net', 'HT')}</span>}
    </span>
  ) : (
    <button
      type="button"
      onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); onSperre(); }}
      className="inline-flex items-center gap-1.5 text-brand-muted hover:text-brand-orange transition-colors"
      aria-label={t("Preise freischalten", "Unlock prices", "Débloquer les prix")}
    >
      <span className="material-symbols-outlined text-base">lock</span>
      <span className={`select-none blur-[5px] font-heading font-extrabold ${gross ? 'text-3xl' : 'text-base'}`} aria-hidden="true">0.000 €</span>
    </button>
  );
};

// Element in den eigenen Park legen; der Konfigurator setzt es beim nächsten Öffnen an einen freien Platz
const ParkKnopf: React.FC<{ slug: string; onSperre: () => void }> = ({ slug, onSperre }) => {
  const t = useT();
  const [drin, setDrin] = useState(false);
  useEffect(() => setDrin(false), [slug]);
  return drin ? (
    <Link to="/konfigurator" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-orange/10 text-brand-orange font-bold uppercase tracking-wider text-sm hover:bg-brand-orange hover:text-white transition-colors">
      <span className="material-symbols-outlined text-lg">check</span> {t("Im Park · zum Konfigurator", "In your park · go to the planner", "Dans votre parc · vers le configurateur")}
    </Link>
  ) : (
    <button type="button" onClick={() => { if (!konfiguratorFrei()) { onSperre(); return; } merken(slug); setDrin(true); }} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-dark text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-orange transition-colors">
      <span className="material-symbols-outlined text-lg">add</span> {t("In meinen Park legen", "Add to my park", "Ajouter à mon parc")}
    </button>
  );
};

const ParkZaehler: React.FC = () => {
  const t = useT();
  const [n, setN] = useState(0);
  useEffect(() => {
    const neu = () => setN(anzahlImPark());
    neu();
    window.addEventListener('aplus-park', neu);
    return () => window.removeEventListener('aplus-park', neu);
  }, []);
  return (
    <Link to="/konfigurator" className="shrink-0 h-12 inline-flex items-center gap-2 px-4 md:px-5 rounded-lg text-sm font-extrabold uppercase tracking-wider bg-brand-orange text-white shadow-[0_6px_18px_rgba(107,143,74,0.35)] hover:bg-brand-dark transition-colors">
      <span className="material-symbols-outlined text-[22px]">view_in_ar</span>
      <span className="hidden sm:inline">{t("Park planen", "Plan a park", "Planifier un parc")}</span>
      {n > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-white text-brand-dark text-[11px] leading-5 text-center">{n}</span>}
    </Link>
  );
};

const Zeile: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex justify-between gap-6 py-2.5 border-b border-brand-dark/5 text-sm">
    <dt className="text-brand-muted">{label}</dt>
    <dd className="text-brand-dark font-medium text-right">{children}</dd>
  </div>
);

const Detail: React.FC<{
  e: Element; preis: string | null; onSperre: () => void; onParkSperre: () => void; onClose: () => void; vor?: Element; zurueck?: Element;
}> = ({ e, preis, onSperre, onParkSperre, onClose, vor, zurueck }) => {
  const t = useT();
  const lang = useLang();
  const loc = LOCALE[lang];
  const p = masseAusPreisliste(e.preisliste_masse_cm);
  const m = e.modell_masse_cm;
  useEffect(() => {
    const esc = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = 'unset'; };
  }, [onClose]);
  return createPortal(
    <div className="fixed inset-0 z-[60] bg-brand-dark/50 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-6" onClick={onClose}>
      <div onClick={(ev) => ev.stopPropagation()} className="relative w-full max-w-6xl bg-brand-bg md:rounded-2xl shadow-2xl overflow-y-auto md:max-h-[92vh] grid md:grid-cols-[1.2fr_1fr]">
        <button type="button" onClick={onClose} aria-label={t("Schließen", "Close", "Fermer")} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 border border-brand-dark/10 flex items-center justify-center hover:text-brand-orange">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="relative aspect-square md:aspect-auto md:min-h-[560px] bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#E5E3DC_75%)]">
          <ModellAnsicht key={e.slug} src={e.modell} poster={e.bild} kamera={e.kamera} alt={`${t('3D-Modell', '3D model', 'Modèle 3D')} ${teilName(e.name, lang)}`} />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-muted pointer-events-none">
            <span className="material-symbols-outlined text-base">3d_rotation</span> {t("Ziehen zum Drehen · Scrollen zum Zoomen", "Drag to rotate · scroll to zoom", "Glisser pour tourner · défiler pour zoomer")}
          </div>
        </div>
        <div className="p-6 md:p-10 flex flex-col">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-3">{gruppenName(e.gruppe, lang)}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-none mb-2">{teilName(e.name, lang)}</h2>
          <p className="font-mono text-sm text-brand-muted mb-6">{e.preisliste_code || e.kuerzel || t("ohne Code", "no code", "sans code")}{e.preisliste_produkt && ` · ${e.preisliste_produkt}`}</p>
          <div className="mb-6"><PreisBadge preis={preis} gross onSperre={onSperre} /></div>
          <div className="mb-8"><ParkKnopf slug={e.slug} onSperre={onParkSperre} /></div>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">{t("Bemaßung", "Dimensions", "Cotes")}</h3>
          <dl className="mb-8">
            {p ? (
              <>
                <Zeile label={t("Höhe H", "Height H", "Hauteur H")}>{p.h} cm</Zeile>
                <Zeile label={t("Länge L", "Length L", "Longueur L")}>{p.l} cm</Zeile>
                <Zeile label={t("Breite B", "Width W", "Largeur l")}>{p.b} cm</Zeile>
                {p.w && <Zeile label={t("Winkel W", "Angle A", "Angle A")}>{p.w}°</Zeile>}
              </>
            ) : null}
            <Zeile label={t("Außenmaße 3D-Modell (L × B × H)", "Outer dimensions, 3D model (L × W × H)", "Dimensions extérieures du modèle 3D (L × l × H)")}>{Math.max(m.laenge, m.breite)} × {Math.min(m.laenge, m.breite)} × {m.hoehe} cm</Zeile>
            {'standard_A_m' in e.gdl_standard_m && (
              <Zeile label={t("Planungsmaße A × B × Höhe", "Planning dimensions A × B × height", "Cotes de planification A × B × hauteur")}>
                {['standard_A_m', 'standard_B_m', 'standard_ZZYZX_m'].map((k) => Math.round((e.gdl_standard_m[k] ?? 0) * 1000).toLocaleString(loc)).join(' × ')} mm
              </Zeile>
            )}
          </dl>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">{t("Daten", "Data", "Données")}</h3>
          <dl className="mb-6">
            <Zeile label={t("Code Preisliste", "Price list code", "Code de la liste de prix")}>{e.preisliste_code || '–'}</Zeile>
            <Zeile label={t("Kürzel Planung (2D-Symbol)", "Planning abbreviation (2D symbol)", "Abréviation de planification (symbole 2D)")}>{e.kuerzel || '–'}</Zeile>
            <Zeile label={t("Material", "Material", "Matériau")}>{material(e, t)}</Zeile>
            <Zeile label={t("Gewicht", "Weight", "Poids")}>{e.gewicht ? `${t('ca.', 'approx.', 'env.')} ${e.gewicht.kg.toLocaleString(loc)} kg${e.gewicht.hinweis ? ` (${hinweis(e.gewicht.hinweis, t)})` : ''}` : t("auf Anfrage", "on request", "sur demande")}</Zeile>
          </dl>


          <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-brand-dark/10">
            {zurueck ? <Link to={`/katalog/${zurueck.slug}`} className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-orange"><span className="material-symbols-outlined">arrow_back</span>{teilName(zurueck.name, lang)}</Link> : <span />}
            {vor ? <Link to={`/katalog/${vor.slug}`} className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-orange text-right">{teilName(vor.name, lang)}<span className="material-symbols-outlined">arrow_forward</span></Link> : <span />}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const ParkDetail: React.FC<{
  p: Beispiel; preise: Record<string, string> | null; onSperre: () => void; onClose: () => void; vor?: Beispiel; zurueck?: Beispiel;
}> = ({ p, preise, onSperre, onClose, vor, zurueck }) => {
  const t = useT();
  const lang = useLang();
  const loc = LOCALE[lang];
  const preis = (k: string) => (preise ? preisText(preise[k], loc) ?? t("auf Anfrage", "on request", "sur demande") : null);
  useEffect(() => {
    const esc = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = 'unset'; };
  }, [onClose]);
  return createPortal(
    <div className="fixed inset-0 z-[60] bg-brand-dark/50 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-6" onClick={onClose}>
      <div onClick={(ev) => ev.stopPropagation()} className="relative w-full max-w-7xl bg-brand-bg md:rounded-2xl shadow-2xl overflow-y-auto md:overflow-hidden md:h-[min(92vh,880px)] grid md:grid-cols-[1.6fr_1fr]">
        <button type="button" onClick={onClose} aria-label={t("Schließen", "Close", "Fermer")} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 border border-brand-dark/10 flex items-center justify-center hover:text-brand-orange">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="relative aspect-[4/3] md:aspect-auto bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#E5E3DC_75%)]">
          <Suspense fallback={null}>
            <ParkAnsicht key={p.id} teile={p.teile} extra={p.extra} flaeche={p.flaeche} boeschung={p.boeschung} alt={`${t('3D-Modell', '3D model', 'Modèle 3D')} ${p.name}`} />
          </Suspense>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-muted pointer-events-none">
            <span className="material-symbols-outlined text-base">3d_rotation</span> {t("Ziehen zum Drehen · Scrollen zum Zoomen", "Drag to rotate · scroll to zoom", "Glisser pour tourner · défiler pour zoomer")}
          </div>
        </div>
        {/* Rechts scrollt allein, der Park links bleibt stehen */}
        <div className="p-6 md:p-10 flex flex-col md:overflow-y-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-3">{t("Skatepark-Beispiel", "Skatepark example", "Exemple de skatepark")}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-none mb-2">{p.name}</h2>
          <p className="font-mono text-sm text-brand-muted mb-6">{t("Fläche", "Area", "Surface")} {dezimal(lang, p.laenge_m)} × {dezimal(lang, p.breite_m)} m · {p.anzahl} {t("Elemente", "elements", "éléments")}</p>
          <div className="mb-8"><PreisBadge preis={preis(p.id)} gross onSperre={onSperre} /></div>

          <dl className="grid grid-cols-3 gap-3 mb-8">
            {[[t("Fläche", "Area", "Surface"), `${qm(p)} m²${sternchen(p) ? '*' : ''}`], [t("Elemente", "Elements", "Éléments"), String(p.anzahl)], [t("Höhen", "Heights", "Hauteurs"), hoehen(p)]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white border border-brand-dark/5 px-3 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">{k}</dt>
                <dd className="font-heading font-extrabold text-brand-dark text-lg leading-tight mt-1">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">{t("Elementgruppen", "Element groups", "Groupes d'éléments")}</h3>
          <dl className="mb-8">
            {p.gruppen.map((g) => (
              <div key={g.teil} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-2.5 border-b border-brand-dark/5 text-sm">
                <dt className="font-mono font-bold text-brand-orange w-10">{g.teil}</dt>
                <dd className="text-brand-muted">H {g.h} · L {g.l} · B {g.b} cm</dd>
                <dd className="text-right"><PreisBadge preis={preis(`${p.id}:${g.teil}`)} onSperre={onSperre} /></dd>
              </div>
            ))}
          </dl>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">{t("Stückliste", "Parts list", "Liste des pièces")}</h3>
          <ul className="mb-6">
            {p.stueckliste.map((t) => (
              <li key={t.slug}>
                <Link to={`/katalog/${t.slug}`} className="flex justify-between gap-6 py-2 border-b border-brand-dark/5 text-sm text-brand-dark hover:text-brand-orange">
                  <span>{teilName(t.name, lang)}</span><span className="font-mono text-brand-muted">{t.anzahl} ×</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-muted mb-6">
            {t("Die Elemente sind hier zusammengestellt, um Möglichkeiten und Preise zu zeigen. Jede Anlage lässt sich umstellen und erweitern.", "The elements are put together here to show possibilities and prices. Every park can be rearranged and extended.", "Les éléments sont assemblés ici pour montrer les possibilités et les prix. Chaque installation peut être réagencée et agrandie.")}
            {sternchen(p) && t(' * Maße der Fläche ohne angeböschte Bereiche.', ' * Area dimensions exclude banked-up areas.', ' * Dimensions de la surface hors zones talutées.')}
          </p>

          <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-brand-dark/10">
            {zurueck ? <Link to={`/katalog/${zurueck.id}`} className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-orange"><span className="material-symbols-outlined">arrow_back</span>{zurueck.name}</Link> : <span />}
            {vor ? <Link to={`/katalog/${vor.id}`} className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-orange text-right">{vor.name}<span className="material-symbols-outlined">arrow_forward</span></Link> : <span />}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const vorladen = (p: Beispiel) => import('../components/katalog/ParkAnsicht').then((m) => m.vorladen(p.teile, p.extra));

const ParkKarte: React.FC<{ p: Beispiel; preis: string | null; onSperre: () => void }> = ({ p, preis, onSperre }) => {
  const t = useT();
  const lang = useLang();
  return (
  <Link
    to={`/katalog/${p.id}`} onMouseEnter={() => vorladen(p)} onFocus={() => vorladen(p)} onTouchStart={() => vorladen(p)}
    className="group rounded-2xl overflow-hidden border border-brand-dark/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:border-brand-orange/40 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1"
  >
    <div className="aspect-[3/2] bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#F2F0EB_80%)] overflow-hidden relative">
      <img src={p.bild} alt={p.name} loading="lazy" decoding="async" width="1200" height="800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute top-3 right-3 material-symbols-outlined text-brand-muted/60 group-hover:text-brand-orange text-xl">3d_rotation</span>
    </div>
    <div className="p-4 md:p-5 flex items-end justify-between gap-4">
      <div>
        <h3 className="font-extrabold font-heading text-brand-dark uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors">{p.name}</h3>
        <p className="text-xs text-brand-muted mt-1">{dezimal(lang, p.laenge_m)} × {dezimal(lang, p.breite_m)} m · {p.anzahl} {t('Elemente', 'elements', 'éléments')} · {hoehen(p)}</p>
      </div>
      <div className="shrink-0 whitespace-nowrap"><PreisBadge preis={preis} onSperre={onSperre} /></div>
    </div>
  </Link>
  );
};

// Titelbild des Katalogheftes (Park 20, 08_Preisliste/heft_renders/park-20_titel.png) mit Schildern an
// einzelnen Elementen. x/y in Prozent des Bildes; links: Schild links vom Punkt (Punkte am rechten Rand).
const TITEL_SCHILDER = [
  { slug: 'table-150', x: 19, y: 55 },
  { slug: 'stairs-60-75', x: 73, y: 39, nurBreit: true },
  { slug: 'curb-300', x: 86, y: 54, links: true, nurBreit: true },
  { slug: 'rail-300', x: 91, y: 28, links: true },
];

const TitelPark: React.FC<{ park?: Beispiel; katalog: Katalog | null }> = ({ park, katalog }) => {
  const t = useT();
  const lang = useLang();
  return (
    <div className="lg:[grid-area:bild] relative flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[640px]">
        <div className="absolute inset-x-[4%] -bottom-[10%] h-[55%] rounded-[50%] bg-brand-orange/10" aria-hidden="true" />
        <img src="/images/katalog/titel-park-20.webp" alt={t("Skatepark 20 aus Betonelementen in 3D", "Skatepark 20 made of concrete elements in 3D", "Skatepark 20 en éléments de béton en 3D")} width="1200" height="555" className="relative w-full h-auto" />
        {katalog && TITEL_SCHILDER.map((s) => {
          const e = katalog.elemente.find((x) => x.slug === s.slug);
          if (!e) return null;
          return (
            <Link
              key={s.slug} to={`/katalog/${s.slug}`}
              style={{ left: `${s.x}%`, top: `${s.y}%`, transform: s.links ? 'translate(calc(-100% + 6px), -50%)' : 'translate(-6px, -50%)' }}
              className={`group absolute ${s.nurBreit ? 'hidden sm:flex' : 'flex'} ${s.links ? 'flex-row-reverse' : ''} items-center gap-1.5 min-h-11`}
            >
              <span className="w-3 h-3 shrink-0 rounded-full bg-brand-orange shadow-[0_0_0_5px_rgba(107,143,74,0.25)]" />
              <span className="px-2.5 py-1 rounded-md bg-brand-dark group-hover:bg-brand-orange text-white font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em] whitespace-nowrap transition-colors">{teilName(e.name, lang)}</span>
            </Link>
          );
        })}
      </div>
      <Link
        to="/katalog/skatepark-20" onMouseEnter={() => park && vorladen(park)} onFocus={() => park && vorladen(park)} onTouchStart={() => park && vorladen(park)}
        className="mt-8 inline-flex items-center gap-2.5 min-h-12 px-5 rounded-full bg-white shadow-[0_6px_20px_rgba(44,53,48,0.14)] font-bold text-[15px] text-brand-dark hover:text-brand-orange transition-colors"
      >
        <span className="material-symbols-outlined text-[22px] text-[#4F6E34]">3d_rotation</span>
        {t("Park 20 in 3D ansehen", "View park 20 in 3D", "Voir le parc 20 en 3D")}
      </Link>
    </div>
  );
};

const KatalogPage: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const loc = LOCALE[lang];
  const konfigCode = useKonfiguratorCode();
  const anfrage = 'mailto:post@aplusurbandesign.com?subject=' + encodeURIComponent(t('Preiscode für den Skate-Katalog', 'Price code for the skate catalogue', 'Code de prix pour le catalogue de skate'))
    + '&body=' + encodeURIComponent(t('Guten Tag,\n\nbitte senden Sie mir den Code zur Freischaltung der Preise im Skate-Katalog.\n\nName:\nFirma / Kommune:\nTelefon:\n', 'Hello,\n\nPlease send me the code to unlock the prices in the skate catalogue.\n\nName:\nCompany / municipality:\nPhone:\n', "Bonjour,\n\nmerci de m'envoyer le code de déblocage des prix du catalogue de skate.\n\nNom :\nEntreprise / commune :\nTéléphone :\n"));
  const { slug } = useParams();
  const navigate = useNavigate();
  const [katalog, setKatalog] = useState<Katalog | null>(null);
  const [suche, setSuche] = useState('');
  const [dialog, setDialog] = useState(false);
  const { preise, katalog: katalogLinks, freischalten } = usePreise();
  const [blaettern, setBlaettern] = useState(false);
  const [konfigDialog, setKonfigDialog] = useState(false);
  const konfig = useKonfiguratorFrei();
  const [parks, setParks] = useState<Beispiel[]>([]);
  const [groesse, setGroesse] = useState(0);
  const [gruppe, setGruppe] = useState('');
  // Erst eine Reihe je Bereich, „Mehr laden“ klappt die nächste auf; bei einer Suche alle Treffer
  const [reihenParks, setReihenParks] = useState(1);
  const [reihenTeile, setReihenTeile] = useState<Record<string, number>>({});
  // Parks oder Einzelteile; #einzelteile im Link und ein geöffnetes Element zeigen die Einzelteile
  const [ansicht, setAnsicht] = useState<'parks' | 'einzelteile'>(() => (typeof window !== 'undefined' && window.location.hash === '#einzelteile' ? 'einzelteile' : 'parks'));
  const leiste = useRef<HTMLDivElement>(null);
  const zeigen = (a: 'parks' | 'einzelteile') => {
    setAnsicht(a);
    if (leiste.current && leiste.current.getBoundingClientRect().top <= 100) leiste.current.scrollIntoView();
  };

  useEffect(() => {
    fetch('/katalog/katalog.json').then((r) => r.json()).then(setKatalog).catch(() => setKatalog(null));
    fetch('/katalog/parks.json').then((r) => r.json()).then((d: { parks: Beispiel[] }) => setParks([...d.parks].sort((a, b) => b.nr - a.nr)))   // große Anlagen zuerst, kleine über den Filter.catch(() => setParks([]));
    // 3D-Code schon laden, während man die Übersicht ansieht: spart nach dem Klick bis zu 0,25 s
    const t = setTimeout(() => import('@google/model-viewer'), 1500);
    return () => clearTimeout(t);
  }, []);

  const treffer = useMemo(() => {
    if (!katalog) return [];
    const q = suche.trim().toLowerCase();
    return katalog.elemente.filter((e) => !q || [e.name, teilName(e.name, lang), e.preisliste_code, e.kuerzel, e.gruppe, e.preisliste_produkt].join(' ').toLowerCase().includes(q));
  }, [katalog, suche]);

  const parkTreffer = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return parks.filter((p) => GROESSEN[groesse].passt(p) && (!q || [p.name, ...p.stueckliste.map((t) => `${t.name} ${teilName(t.name, lang)}`)].join(' ').toLowerCase().includes(q)));
  }, [parks, suche, groesse]);
  // Erst sechs Parks, damit die Einzelteile nicht weit nach unten rutschen; mit Filter oder Suche alle Treffer
  const parkIndex = parks.findIndex((p) => p.id === slug);
  const aktivPark = parkIndex >= 0 ? parks[parkIndex] : undefined;

  const index = katalog?.elemente.findIndex((e) => e.slug === slug) ?? -1;
  const aktiv = index >= 0 ? katalog!.elemente[index] : undefined;
  useEffect(() => { if (aktiv) setAnsicht('einzelteile'); }, [aktiv]);
  const schliessen = () => navigate('/katalog', { replace: false });

  return (
    <PageShell
      title={aktivPark ? `${aktivPark.name} · Skate-Katalog` : aktiv ? `${teilName(aktiv.name, lang)} · Skate-Katalog` : t("Skate-Katalog in 3D", "Skate Catalogue in 3D", "Catalogue de skate en 3D")}
      description={t("Skatepark-Beispiele und alle Skate-Elemente von A+ Urban Design in 3D: Parks mit Fläche und Stückliste, dazu Tables, Banks, Hips, Ramps, Rails und mehr.", "Skatepark examples and all skate elements from A+ Urban Design in 3D: parks with area and parts list, plus tables, banks, hips, ramps, rails and more.", "Exemples de skateparks et tous les éléments de skate d'A+ Urban Design en 3D : parcs avec surface et liste des pièces, ainsi que tables, banks, hips, rampes, rails et plus encore.")}
    >
      {/* Kopf: links Titel und die Wahl Parks oder Einzelteile, rechts der Titelpark aus dem Katalogheft.
          So sieht man schon ohne Scrollen 3D. Am Handy: Titel, Bild, Wahl untereinander. */}
      <section className="pt-6 pb-4 md:pt-8 md:pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-5 lg:gap-x-10 lg:gap-y-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:[grid-template-areas:'text_bild''wahl_bild']">
          <div className="lg:[grid-area:text]">
            <Kopfleiste label={t("Katalog", "Catalogue", "Catalogue")} className="mb-5 md:mb-6" />
            <h1 className="font-extrabold font-heading uppercase leading-none break-words text-brand-dark text-[44px] sm:text-6xl xl:text-[72px] lg:whitespace-nowrap" style={{ wordSpacing: '0.12em' }}>
              {t(<>Skate-<span className="text-brand-orange">Parks</span></>, <>Skate<span className="text-brand-orange">parks</span></>, <><span className="text-brand-orange">Skateparks</span></>)}
            </h1>
            <p className="mt-4 md:mt-5 text-lg md:text-xl leading-relaxed text-brand-dark/75 max-w-xl">
              {parks.length || t('Viele', 'Many', 'De nombreux')} {t('Beispielparks und', 'example parks and', 'parcs exemples et')} {katalog ? katalog.elemente.length : t('alle', 'all', 'tous les')} {t('Einzelteile in 3D. Park aussuchen, Teile ansehen, eigenen Park planen.', 'individual parts in 3D. Choose a park, look at the parts, plan your own park.', 'éléments individuels en 3D. Choisissez un parc, consultez les éléments, planifiez votre propre parc.')}
            </p>
          </div>

          <TitelPark park={parks.find((p) => p.id === 'skatepark-20')} katalog={katalog} />

          {/* Große Schalter mit Bildern aus dem Katalog statt Symbolen */}
          <div className="lg:[grid-area:wahl] lg:self-end grid grid-cols-2 gap-3" role="tablist" aria-label={t("Ansicht", "View", "Vue")}>
            {([
              ['parks', t("Beispielparks", "Example parks", "Parcs exemples"), t("Parks", "Parks", "Parcs"), `${parks.length || ''} ${t('fertige Anlagen mit Preis', 'ready-made parks with prices', 'parcs prêts avec prix')}`, `${parks.length || ''} ${t('Anlagen', 'parks', 'parcs')}`],
              ['einzelteile', t("Einzelteile", "Individual parts", "Éléments individuels"), t("Einzelteile", "Individual parts", "Éléments individuels"), `${katalog?.elemente.length ?? ''} ${t('Elemente einzeln in 3D', 'elements individually in 3D', 'éléments individuels en 3D')}`, `${katalog?.elemente.length ?? ''} ${t('Elemente', 'elements', 'éléments')}`],
            ] as const).map(([id, text, kurz, unter, unterKurz]) => {
              const an = ansicht === id;
              return (
                <button
                  key={id} type="button" role="tab" aria-selected={an} onClick={() => zeigen(id)}
                  className={`group relative overflow-hidden h-32 md:h-[168px] flex flex-col justify-end p-3 md:p-4 rounded-2xl border-2 text-left transition-colors ${an ? 'bg-brand-dark border-brand-dark text-white' : 'bg-white border-brand-dark/15 text-brand-dark hover:border-brand-orange'}`}
                >
                  {id === 'parks' ? (
                    <img src="/katalog/parks/skatepark-22.webp" alt="" width="1200" height="876" className="absolute -top-3 -right-6 w-[150px] md:w-[220px] h-auto transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <span className="absolute top-1.5 md:top-2.5 inset-x-2 md:inset-x-3 flex items-end justify-between transition-transform duration-500 group-hover:scale-105">
                      {['quarterramp-200', 'table-125', 'hip-75'].map((s, i) => <img key={s} src={`/katalog/bilder/${s}.webp?v=2`} alt="" width="640" height="640" className={`object-contain ${['w-[52px] md:w-[76px]', 'w-12 md:w-[70px]', 'w-11 md:w-16'][i]} h-auto`} />)}
                    </span>
                  )}
                  <span className="relative block font-heading font-extrabold uppercase text-base md:text-[19px] [word-spacing:0.12em]"><span className="sm:hidden">{kurz}</span><span className="hidden sm:inline">{text}</span></span>
                  <span className={`relative block text-xs md:text-sm mt-0.5 ${an ? 'text-white/80' : 'text-brand-dark/75'}`}><span className="sm:hidden">{unterKurz}</span><span className="hidden sm:inline">{unter}</span></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leiste: Suche, Filter, Planen, Preise. Codes für Kunden gibt es nur auf /admin. */}
      <div ref={leiste} className="sticky top-14 md:top-20 z-30 bg-brand-bg/95 backdrop-blur-md border-y border-brand-dark/5 scroll-mt-14 md:scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap xl:flex-nowrap items-center gap-2 md:gap-3">
          <div className="relative flex-1 min-w-[10rem] xl:max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-xl">search</span>
            <input
              type="search" value={suche} onChange={(e) => setSuche(e.target.value)}
              placeholder={ansicht === 'parks' ? t("Park oder Element suchen", "Search for a park or element", "Rechercher un parc ou un élément") : t("Suchen, z. B. Bank 98 oder SCR", "Search, e.g. Bank 98 or SCR", "Rechercher, par ex. Bank 98 ou SCR")}
              aria-label={t("Katalog durchsuchen", "Search the catalogue", "Rechercher dans le catalogue")}
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-brand-dark/10 bg-white/70 text-sm focus:outline-none focus:border-brand-orange"
            />
          </div>
          <label className="shrink-0 h-11 flex items-center gap-2 px-3 rounded-lg border border-brand-dark/10 bg-white/70 text-sm">
            <span className="hidden sm:inline text-brand-muted">{ansicht === 'parks' ? t("Fläche", "Area", "Surface") : t("Gruppe", "Group", "Groupe")}</span>
            {ansicht === 'parks' ? (
              <select value={groesse} onChange={(e) => setGroesse(Number(e.target.value))} aria-label={t("Nach Fläche filtern", "Filter by area", "Filtrer par surface")} className="bg-transparent font-semibold text-brand-dark focus:outline-none max-w-[9rem]">
                {GROESSEN.map((g, i) => <option key={g.name[0]} value={i}>{t(...g.name)}</option>)}
              </select>
            ) : (
              <select value={gruppe} onChange={(e) => setGruppe(e.target.value)} aria-label={t("Nach Gruppe filtern", "Filter by group", "Filtrer par groupe")} className="bg-transparent font-semibold text-brand-dark focus:outline-none max-w-[9rem]">
                <option value="">{t('Alle', 'All', 'Tous')}</option>
                {katalog?.gruppen.map((g) => <option key={g} value={g}>{gruppenName(g, lang)}</option>)}
              </select>
            )}
          </label>
          <span className="hidden xl:block flex-1" />
          <ParkZaehler />
          <button
            type="button" onClick={() => (katalogLinks ? setBlaettern(true) : setDialog(true))}
            aria-label={katalogLinks ? t("Katalog 2026 blättern", "Browse the 2026 catalogue", "Feuilleter le catalogue 2026") : t("Preise und Katalog freischalten", "Unlock prices and catalogue", "Débloquer les prix et le catalogue")}
            className="shrink-0 h-12 inline-flex items-center gap-2 px-4 md:px-5 rounded-lg text-sm font-extrabold uppercase tracking-wider bg-brand-dark text-white shadow-[0_6px_18px_rgba(44,53,48,0.25)] hover:bg-brand-orange transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">{katalogLinks ? 'menu_book' : 'lock'}</span>
            <span className="hidden sm:inline">{katalogLinks ? t("Katalog 2026 blättern", "Browse the 2026 catalogue", "Feuilleter le catalogue 2026") : t("Preise und Katalog", "Prices and catalogue", "Prix et catalogue")}</span>
          </button>
        </div>
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-32">
        {katalogLinks && (
          <div className="mb-16 flex flex-col md:flex-row md:items-center gap-6 bg-brand-dark text-white rounded-2xl p-6 md:p-8">
            <span className="material-symbols-outlined text-5xl text-brand-orange">menu_book</span>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading uppercase tracking-tight">{t("Ihr Katalog 2026 ist freigeschaltet", "Your 2026 catalogue is unlocked", "Votre catalogue 2026 est débloqué")}</h2>
              <p className="text-white/70 mt-1">{t("Alle Elemente mit Nettopreisen. Blättern Sie online im Heft.", "All elements with net prices. Browse the booklet online.", "Tous les éléments avec les prix nets. Feuilletez le catalogue en ligne.")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setBlaettern(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-brand-dark transition-colors">
                <span className="material-symbols-outlined text-lg">auto_stories</span>{t("Blättern", "Browse", "Feuilleter")}
              </button>
            </div>
          </div>
        )}
        {ansicht === 'parks' && parks.length > 0 && (
          <div id="parks" className="mb-24 scroll-mt-40">
            {/* Nur die Kopfleiste über den Karten, damit die Parks schon im ersten Bildschirm hereinschauen */}
            <h2 className="sr-only">{t("Skatepark-Beispiele", "Skatepark examples", "Exemples de skateparks")}</h2>
            <Kopfleiste label={t("Skatepark-Beispiele", "Skatepark examples", "Exemples de skateparks")} rechts={<>{parkTreffer.length} {t("Parks", "parks", "parcs")}</>} className="mb-6" />
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {(suche.trim() ? parkTreffer : parkTreffer.slice(0, reihenParks * PARKS_JE_REIHE)).map((p) => <ParkKarte key={p.id} p={p} preis={preise ? preisText(preise[p.id], loc) ?? t("auf Anfrage", "on request", "sur demande") : null} onSperre={() => setDialog(true)} />)}
            </div>
            {!parkTreffer.length && <p className="text-center text-brand-muted py-12">{t("Kein Park passt zu diesem Filter.", "No park matches this filter.", "Aucun parc ne correspond à ce filtre.")}</p>}
            {!suche.trim() && <MehrLaden rest={parkTreffer.length - reihenParks * PARKS_JE_REIHE} onClick={() => setReihenParks((n) => n + 1)} />}
            <p className="text-xl leading-relaxed text-brand-dark/75 max-w-3xl mt-10">{t("Jeder Park ist aus unseren Einzelelementen zusammengestellt, mit Fläche, Stückliste und Gesamtpreis. Im Detail drehen Sie die Anlage in 3D.", "Every park is put together from our individual elements, with area, parts list and total price. In the detail view you can rotate the park in 3D.", "Chaque parc est composé de nos éléments individuels, avec surface, liste des pièces et prix total. Dans la vue détaillée, vous pouvez faire pivoter l'installation en 3D.")}</p>
          </div>
        )}

        {ansicht === 'einzelteile' && (<>
        <div id="einzelteile" className="scroll-mt-40 mb-10">
          <Plankopf klein>{t("Einzelteile", "Individual parts", "Éléments individuels")}</Plankopf>
          <p className="text-xl leading-relaxed text-brand-dark/75 max-w-3xl mt-4">{t("Alle Elemente modular im 125-cm-Raster. Jedes einzeln in 3D, mit Maßen und Planungsdaten.", "All elements are modular on a 125 cm grid. Each one in 3D, with dimensions and planning data.", "Tous les éléments sont modulaires sur une trame de 125 cm. Chacun en 3D, avec ses cotes et ses données de planification.")}</p>
        </div>
        {!katalog && <p className="text-center text-brand-muted py-24">{t("Katalog wird geladen …", "Loading the catalogue …", "Chargement du catalogue …")}</p>}
        {katalog?.gruppen.map((g, gi) => {
          if (gruppe && g !== gruppe) return null;
          const alle = treffer.filter((e) => e.gruppe === g);
          if (!alle.length) return null;
          const liste = suche.trim() ? alle : alle.slice(0, (reihenTeile[g] ?? 1) * TEILE_JE_REIHE);
          return (
            <div key={g} id={gruppenId(g)} className="mb-20 scroll-mt-40">
              <div className="flex items-baseline gap-4 mb-8 border-b border-brand-dark/10 pb-4">
                <span className="font-mono text-xs text-brand-orange">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em]">{gruppenName(g, lang)}</h2>
                <span className="ml-auto font-mono text-xs text-brand-muted">{alle.length} {t("Elemente", "elements", "éléments")}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {liste.map((e) => (
                  <Link
                    key={e.slug} to={`/katalog/${e.slug}`}
                    className="group rounded-2xl overflow-hidden border border-brand-dark/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:border-brand-orange/40 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                  >
                    <div className="aspect-square bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#F2F0EB_80%)] p-4 relative">
                      <img src={e.bild} alt={teilName(e.name, lang)} loading="lazy" decoding="async" width="640" height="640" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute top-3 right-3 material-symbols-outlined text-brand-muted/60 group-hover:text-brand-orange text-xl">3d_rotation</span>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-extrabold font-heading text-brand-dark uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors">{teilName(e.name, lang)}</h3>
                      <p className="font-mono text-[11px] text-brand-muted mt-1">{e.preisliste_code || e.kuerzel || '–'}</p>
                      <p className="text-xs text-brand-muted mt-2">{kurzMasse(e, t)}</p>
                      <div className="mt-3"><PreisBadge preis={preise ? preisText(preise[e.slug], loc) ?? t("auf Anfrage", "on request", "sur demande") : null} onSperre={() => setDialog(true)} /></div>
                    </div>
                  </Link>
                ))}
              </div>
              {!suche.trim() && <MehrLaden rest={alle.length - liste.length} onClick={() => setReihenTeile((r) => ({ ...r, [g]: (r[g] ?? 1) + 1 }))} />}
            </div>
          );
        })}
        {katalog && !treffer.length && <p className="text-center text-brand-muted py-24">{t(<>Keine Elemente zu „{suche}“ gefunden.</>, <>No elements found for “{suche}”.</>, <>Aucun élément trouvé pour « {suche} ».</>)}</p>}
        </>)}
        {katalog && (
          <div className="mt-8 mb-16 grid md:grid-cols-2 gap-8 border-t border-brand-dark/10 pt-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em]">{t(<>Gebaut für <span className="text-brand-orange">Jahrzehnte</span></>, <>Built for <span className="text-brand-orange">decades</span></>, <>Conçu pour <span className="text-brand-orange">des décennies</span></>)}</h2>
              <p className="text-xl leading-relaxed text-brand-dark/75 mt-4">{t("Alle Elemente sind modular im 125-cm-Raster aufgebaut und lassen sich frei kombinieren, erweitern und umstellen.", "All elements are built modularly on a 125 cm grid and can be combined, extended and rearranged freely.", "Tous les éléments sont conçus de façon modulaire sur une trame de 125 cm et peuvent être combinés, agrandis et réagencés librement.")}</p>
            </div>
            <ul className="space-y-3 text-sm text-brand-dark">
              {[
                t("Bewehrter Beton C35/45, Wandstärke 8 bis 16 cm", "Reinforced concrete C35/45, wall thickness 8 to 16 cm", "Béton armé C35/45, épaisseur des parois de 8 à 16 cm"),
                t("Aufstellen ohne Fundament, höhenverstellbare Füße gleichen Unebenheiten aus", "Installed without a foundation, height-adjustable feet compensate for unevenness", "Pose sans fondation, pieds réglables en hauteur pour rattraper les irrégularités"),
                t("Durchgehender, einbetonierter Hartgummi-Kantenschutz an allen Fahrkanten", "Continuous hard-rubber edge protection cast into every riding edge", "Protection d'arête continue en caoutchouc dur, scellée dans toutes les arêtes de roulement"),
                t("Verzinkte Copingrohre mit Alukappen, Anlaufbleche aus Edelstahl", "Galvanised coping tubes with aluminium caps, stainless steel run-up plates", "Tubes de coping galvanisés avec capuchons en aluminium, plaques d'approche en inox"),
                t("Offenporige Oberfläche: bei Nässe nicht rutschig, kaum Lärm", "Open-pored surface: not slippery when wet, very little noise", "Surface à pores ouverts : non glissante par temps humide, très peu de bruit"),
                t("TÜV-geprüft nach DIN EN 14974, GS-Zeichen", "TÜV-tested to EN 14974, GS mark", "Contrôlé par le TÜV selon la norme EN 14974, marque GS"),
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="material-symbols-outlined text-brand-orange text-lg">check</span>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {katalog && (
          <p className="text-xs text-brand-muted text-center mt-8">
            {t('Stand', 'As of', 'État au')} {new Date(katalog.stand).toLocaleDateString(loc)}. {t('Darstellung schematisch, maßgeblich sind Preisliste und Angebot. Preise netto zzgl. MwSt.', 'Illustration is schematic; the price list and quote are what count. Prices net, plus VAT.', 'Représentation schématique ; la liste de prix et l\'offre font foi. Prix nets, TVA en sus.')}
          </p>
        )}
      </section>

      {aktivPark && (
        <ParkDetail
          p={aktivPark} preise={preise} onSperre={() => setDialog(true)} onClose={schliessen}
          zurueck={parks[parkIndex - 1]} vor={parks[parkIndex + 1]}
        />
      )}
      {aktiv && (
        <Detail
          e={aktiv} preis={preise ? preisText(preise[aktiv.slug], loc) ?? t("auf Anfrage", "on request", "sur demande") : null} onSperre={() => setDialog(true)} onParkSperre={() => setKonfigDialog(true)} onClose={schliessen}
          zurueck={katalog!.elemente[index - 1]} vor={katalog!.elemente[index + 1]}
        />
      )}
      {blaettern && katalogLinks && (
        <Suspense fallback={null}><Blaetterkatalog links={katalogLinks} onClose={() => setBlaettern(false)} /></Suspense>
      )}
      <CodeDialog
        offen={dialog} onClose={() => setDialog(false)} freischalten={freischalten} anfrage={anfrage} titel={t("Preise freischalten", "Unlock prices", "Débloquer les prix")}
        text={t("Die Nettopreise 2026 und den Katalog zum Blättern sehen Sie mit Ihrem persönlichen Code. Der Code gilt einmal: Nach dem Neuladen der Seite sind die Preise wieder ausgeblendet. Sie haben noch keinen? Wir senden ihn Ihnen gern zu.", "You see the 2026 net prices and the browsable catalogue with your personal code. The code works once: after the page is reloaded, the prices are hidden again. Don't have one yet? We are happy to send you one.", "Vous voyez les prix nets 2026 et le catalogue à feuilleter avec votre code personnel. Le code est à usage unique : une fois la page rechargée, les prix sont de nouveau masqués. Vous n'en avez pas encore ? Nous vous en envoyons volontiers un.")}
      />
      <CodeDialog offen={konfigDialog} onClose={() => setKonfigDialog(false)} freischalten={konfig.freischalten} anfrage={konfigCode.anfrage} titel={konfigCode.titel} text={konfigCode.text} />
    </PageShell>
  );
};

export default KatalogPage;
