import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import ModellAnsicht from '../components/katalog/ModellAnsicht';
import { konfiguratorFrei, useKonfiguratorFrei, usePreise } from '../components/katalog/usePreise';
import CodeDialog, { KONFIGURATOR_ANFRAGE, KONFIGURATOR_TEXT, KONFIGURATOR_TITEL } from '../components/katalog/CodeDialog';
import { anzahlImPark, merken } from '../components/konfigurator/merkliste';
import type { ParkTeil } from '../components/katalog/ParkAnsicht';

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
  bild: string; extra: string | null; flaeche: number[] | null; teile: ParkTeil[];
}

const qm = (p: Beispiel) => Math.round(parseFloat(p.laenge_m.replace(',', '.')) * parseFloat(p.breite_m.replace(',', '.')));
const GROESSEN = [
  { name: 'Alle', passt: () => true },
  { name: 'Bis 300 m²', passt: (p: Beispiel) => qm(p) <= 300 },
  { name: '300 bis 400 m²', passt: (p: Beispiel) => qm(p) > 300 && qm(p) <= 400 },
  { name: 'Über 400 m²', passt: (p: Beispiel) => qm(p) > 400 },
];
const sternchen = (p: Beispiel) => p.laenge_m.endsWith('*') || p.breite_m.endsWith('*');
const hoehen = (p: Beispiel) => p.hoehe_cm[0] === p.hoehe_cm[1] ? `${p.hoehe_cm[0]} cm` : `${p.hoehe_cm[0]} bis ${p.hoehe_cm[1]} cm`;

const ANFRAGE = 'mailto:post@aplusurbandesign.com?subject=' + encodeURIComponent('Preiscode für den Skate-Katalog')
  + '&body=' + encodeURIComponent('Guten Tag,\n\nbitte senden Sie mir den Code zur Freischaltung der Preise im Skate-Katalog.\n\nName:\nFirma / Kommune:\nTelefon:\n');

const gruppenId = (g: string) => 'gruppe-' + g.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-');

const preisText = (roh?: string) => {
  if (!roh) return null;
  const zahl = Number(roh.replace(/[^\d]/g, ''));
  return zahl ? zahl.toLocaleString('de-DE') + ' €' : roh;
};

// Preisliste: „H / L / B / W“ in cm, W = Winkel in Grad
const masseAusPreisliste = (s: string) => {
  const t = s.split(/\s\/\s/).map((x) => x.trim());
  return t.length >= 3 ? { h: t[0], l: t[1], b: t[2], w: t[3] } : null;
};

const kurzMasse = (e: Element) => {
  const p = masseAusPreisliste(e.preisliste_masse_cm);
  if (p) return `H ${p.h} · L ${p.l} · B ${p.b} cm`;
  const m = e.modell_masse_cm;
  return `H ${m.hoehe} · L ${Math.max(m.laenge, m.breite)} · B ${Math.min(m.laenge, m.breite)} cm`;
};

// Die CAD-Oberflächen (z. B. „Anstrich“, „Kiefer“) sind nur Archicad-Darstellung, nicht das Produktmaterial.
const material = (e: Element) => {
  const metall = (m: string) => /stahl|zink|alu/i.test(m);
  if (e.materialien.length && e.materialien.every(metall)) return 'Stahl, verzinkt';
  return e.materialien.some(metall) ? 'Stahlbeton C35/45, Stahl (verzinkt / Edelstahl)' : 'Stahlbeton C35/45';
};

const PreisBadge: React.FC<{ preis: string | null; gross?: boolean; onSperre: () => void }> = ({ preis, gross, onSperre }) =>
  preis ? (
    <span className={`font-heading font-extrabold text-brand-dark ${gross ? 'text-3xl' : 'text-base'}`}>
      {preis}{preis.includes('€') && <span className="text-xs font-sans font-normal text-brand-muted"> netto</span>}
    </span>
  ) : (
    <button
      type="button"
      onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); onSperre(); }}
      className="inline-flex items-center gap-1.5 text-brand-muted hover:text-brand-orange transition-colors"
      aria-label="Preise freischalten"
    >
      <span className="material-symbols-outlined text-base">lock</span>
      <span className={`select-none blur-[5px] font-heading font-extrabold ${gross ? 'text-3xl' : 'text-base'}`} aria-hidden="true">0.000 €</span>
    </button>
  );

// Element in den eigenen Park legen; der Konfigurator setzt es beim nächsten Öffnen an einen freien Platz
const ParkKnopf: React.FC<{ slug: string; onSperre: () => void }> = ({ slug, onSperre }) => {
  const [drin, setDrin] = useState(false);
  useEffect(() => setDrin(false), [slug]);
  return drin ? (
    <Link to="/konfigurator" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-orange/10 text-brand-orange font-bold uppercase tracking-wider text-sm hover:bg-brand-orange hover:text-white transition-colors">
      <span className="material-symbols-outlined text-lg">check</span> Im Park · zum Konfigurator
    </Link>
  ) : (
    <button type="button" onClick={() => { if (!konfiguratorFrei()) { onSperre(); return; } merken(slug); setDrin(true); }} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-dark text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-orange transition-colors">
      <span className="material-symbols-outlined text-lg">add</span> In meinen Park legen
    </button>
  );
};

const ParkZaehler: React.FC = () => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const neu = () => setN(anzahlImPark());
    neu();
    window.addEventListener('aplus-park', neu);
    return () => window.removeEventListener('aplus-park', neu);
  }, []);
  return (
    <Link to="/konfigurator" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider border border-brand-dark/15 text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors">
      <span className="material-symbols-outlined text-lg">view_in_ar</span>
      <span className="hidden sm:inline">Park planen</span>
      {n > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-brand-orange text-white text-[11px] leading-5 text-center">{n}</span>}
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
        <button type="button" onClick={onClose} aria-label="Schließen" className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 border border-brand-dark/10 flex items-center justify-center hover:text-brand-orange">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="relative aspect-square md:aspect-auto md:min-h-[560px] bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#E5E3DC_75%)]">
          <ModellAnsicht key={e.slug} src={e.modell} poster={e.bild} kamera={e.kamera} alt={`3D-Modell ${e.name}`} />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-muted pointer-events-none">
            <span className="material-symbols-outlined text-base">3d_rotation</span> Ziehen zum Drehen · Scrollen zum Zoomen
          </div>
        </div>
        <div className="p-6 md:p-10 flex flex-col">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-3">{e.gruppe}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.95] mb-2">{e.name}</h2>
          <p className="font-mono text-sm text-brand-muted mb-6">{e.preisliste_code || e.kuerzel || 'ohne Code'}{e.preisliste_produkt && ` · ${e.preisliste_produkt}`}</p>
          <div className="mb-6"><PreisBadge preis={preis} gross onSperre={onSperre} /></div>
          <div className="mb-8"><ParkKnopf slug={e.slug} onSperre={onParkSperre} /></div>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">Bemaßung</h3>
          <dl className="mb-8">
            {p ? (
              <>
                <Zeile label="Höhe H">{p.h} cm</Zeile>
                <Zeile label="Länge L">{p.l} cm</Zeile>
                <Zeile label="Breite B">{p.b} cm</Zeile>
                {p.w && <Zeile label="Winkel W">{p.w}°</Zeile>}
              </>
            ) : null}
            <Zeile label="Außenmaße 3D-Modell (L × B × H)">{Math.max(m.laenge, m.breite)} × {Math.min(m.laenge, m.breite)} × {m.hoehe} cm</Zeile>
            {'standard_A_m' in e.gdl_standard_m && (
              <Zeile label="Planungsmaße A × B × Höhe">
                {['standard_A_m', 'standard_B_m', 'standard_ZZYZX_m'].map((k) => Math.round((e.gdl_standard_m[k] ?? 0) * 1000).toLocaleString('de-DE')).join(' × ')} mm
              </Zeile>
            )}
          </dl>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">Daten</h3>
          <dl className="mb-6">
            <Zeile label="Code Preisliste">{e.preisliste_code || '–'}</Zeile>
            <Zeile label="Kürzel Planung (2D-Symbol)">{e.kuerzel || '–'}</Zeile>
            <Zeile label="Material">{material(e)}</Zeile>
            <Zeile label="Gewicht">{e.gewicht ? `ca. ${e.gewicht.kg.toLocaleString('de-DE')} kg${e.gewicht.hinweis ? ` (${e.gewicht.hinweis})` : ''}` : 'auf Anfrage'}</Zeile>
          </dl>


          <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-brand-dark/10">
            {zurueck ? <Link to={`/katalog/${zurueck.slug}`} className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-orange"><span className="material-symbols-outlined">arrow_back</span>{zurueck.name}</Link> : <span />}
            {vor ? <Link to={`/katalog/${vor.slug}`} className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-orange text-right">{vor.name}<span className="material-symbols-outlined">arrow_forward</span></Link> : <span />}
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
  const preis = (k: string) => (preise ? preisText(preise[k]) ?? 'auf Anfrage' : null);
  useEffect(() => {
    const esc = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = 'unset'; };
  }, [onClose]);
  return createPortal(
    <div className="fixed inset-0 z-[60] bg-brand-dark/50 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-6" onClick={onClose}>
      <div onClick={(ev) => ev.stopPropagation()} className="relative w-full max-w-7xl bg-brand-bg md:rounded-2xl shadow-2xl overflow-y-auto md:overflow-hidden md:h-[min(92vh,880px)] grid md:grid-cols-[1.6fr_1fr]">
        <button type="button" onClick={onClose} aria-label="Schließen" className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 border border-brand-dark/10 flex items-center justify-center hover:text-brand-orange">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="relative aspect-[4/3] md:aspect-auto bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#E5E3DC_75%)]">
          <Suspense fallback={null}>
            <ParkAnsicht key={p.id} teile={p.teile} extra={p.extra} flaeche={p.flaeche} alt={`3D-Modell ${p.name}`} />
          </Suspense>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-muted pointer-events-none">
            <span className="material-symbols-outlined text-base">3d_rotation</span> Ziehen zum Drehen · Scrollen zum Zoomen
          </div>
        </div>
        {/* Rechts scrollt allein, der Park links bleibt stehen */}
        <div className="p-6 md:p-10 flex flex-col md:overflow-y-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-3">Skatepark-Beispiel</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.95] mb-2">{p.name}</h2>
          <p className="font-mono text-sm text-brand-muted mb-6">Fläche {p.laenge_m} × {p.breite_m} m · {p.anzahl} Elemente</p>
          <div className="mb-8"><PreisBadge preis={preis(p.id)} gross onSperre={onSperre} /></div>

          <dl className="grid grid-cols-3 gap-3 mb-8">
            {[['Fläche', `${qm(p)} m²${sternchen(p) ? '*' : ''}`], ['Elemente', String(p.anzahl)], ['Höhen', hoehen(p)]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white border border-brand-dark/5 px-3 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">{k}</dt>
                <dd className="font-heading font-extrabold text-brand-dark text-lg leading-tight mt-1">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">Elementgruppen</h3>
          <dl className="mb-8">
            {p.gruppen.map((g) => (
              <div key={g.teil} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-2.5 border-b border-brand-dark/5 text-sm">
                <dt className="font-mono font-bold text-brand-orange w-10">{g.teil}</dt>
                <dd className="text-brand-muted">H {g.h} · L {g.l} · B {g.b} cm</dd>
                <dd className="text-right"><PreisBadge preis={preis(`${p.id}:${g.teil}`)} onSperre={onSperre} /></dd>
              </div>
            ))}
          </dl>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">Stückliste</h3>
          <ul className="mb-6">
            {p.stueckliste.map((t) => (
              <li key={t.slug}>
                <Link to={`/katalog/${t.slug}`} className="flex justify-between gap-6 py-2 border-b border-brand-dark/5 text-sm text-brand-dark hover:text-brand-orange">
                  <span>{t.name}</span><span className="font-mono text-brand-muted">{t.anzahl} ×</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-muted mb-6">
            Die Elemente sind hier zusammengestellt, um Möglichkeiten und Preise zu zeigen. Jede Anlage lässt sich umstellen und erweitern.
            {sternchen(p) && ' * Maße der Fläche ohne angeböschte Bereiche.'}
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

const ParkKarte: React.FC<{ p: Beispiel; preis: string | null; onSperre: () => void }> = ({ p, preis, onSperre }) => (
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
        <p className="text-xs text-brand-muted mt-1">{p.laenge_m} × {p.breite_m} m · {p.anzahl} Elemente · {hoehen(p)}</p>
      </div>
      <div className="shrink-0 whitespace-nowrap"><PreisBadge preis={preis} onSperre={onSperre} /></div>
    </div>
  </Link>
);

const KatalogPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [katalog, setKatalog] = useState<Katalog | null>(null);
  const [suche, setSuche] = useState('');
  const [dialog, setDialog] = useState(false);
  const { preise, katalog: katalogLinks, freischalten, betreiber, kundencode, abmelden } = usePreise();
  const [blaettern, setBlaettern] = useState(false);
  const [neuCode, setNeuCode] = useState<string | null>(null);
  const [konfigDialog, setKonfigDialog] = useState(false);
  const konfig = useKonfiguratorFrei();
  const [parks, setParks] = useState<Beispiel[]>([]);
  const [groesse, setGroesse] = useState(0);
  const [alleParks, setAlleParks] = useState(false);

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
    return katalog.elemente.filter((e) => !q || [e.name, e.preisliste_code, e.kuerzel, e.gruppe, e.preisliste_produkt].join(' ').toLowerCase().includes(q));
  }, [katalog, suche]);

  const parkTreffer = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return parks.filter((p) => GROESSEN[groesse].passt(p) && (!q || [p.name, ...p.stueckliste.map((t) => t.name)].join(' ').toLowerCase().includes(q)));
  }, [parks, suche, groesse]);
  // Erst sechs Parks, damit die Einzelteile nicht weit nach unten rutschen; mit Filter oder Suche alle Treffer
  const parkListe = alleParks || groesse || suche.trim() ? parkTreffer : parkTreffer.slice(0, 6);
  const parkIndex = parks.findIndex((p) => p.id === slug);
  const aktivPark = parkIndex >= 0 ? parks[parkIndex] : undefined;

  const index = katalog?.elemente.findIndex((e) => e.slug === slug) ?? -1;
  const aktiv = index >= 0 ? katalog!.elemente[index] : undefined;
  const schliessen = () => navigate('/katalog', { replace: false });

  return (
    <PageShell
      title={aktivPark ? `${aktivPark.name} · Skate-Katalog` : aktiv ? `${aktiv.name} · Skate-Katalog` : 'Skate-Katalog in 3D'}
      description="Skatepark-Beispiele und alle Skate-Elemente von A+ Urban Design in 3D: Parks mit Fläche und Stückliste, dazu Tables, Banks, Hips, Ramps, Rails und mehr."
    >
      <section className="pt-32 pb-10 md:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Katalog</span>
          <h1 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
            Skate-<span className="text-brand-orange">Parks.</span>
          </h1>
          <p className="text-brand-muted mt-6 max-w-2xl mx-auto text-lg">
            {parks.length || 'Viele'} Beispielparks und {katalog ? katalog.elemente.length : 'alle'} Elemente in 3D. Erst den passenden Park finden, dann jedes Teil im Detail ansehen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#parks" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-dark transition-colors">
              <span className="material-symbols-outlined text-lg">grid_view</span> Beispielparks ansehen
            </a>
            <Link to="/konfigurator" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-dark/15 text-brand-dark font-bold uppercase tracking-wider text-sm hover:border-brand-orange hover:text-brand-orange transition-colors">
              <span className="material-symbols-outlined text-lg">view_in_ar</span> Eigenen Skatepark planen
            </Link>
          </div>
        </div>
      </section>

      <div className="sticky top-14 md:top-20 z-30 bg-brand-bg/95 backdrop-blur-md border-y border-brand-dark/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="relative flex-1 min-w-[120px] max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-xl">search</span>
            <input
              value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suchen, z. B. Bank 98 oder SCR"
              aria-label="Katalog durchsuchen"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-dark/10 bg-white/70 text-sm focus:outline-none focus:border-brand-orange"
            />
          </div>
          <nav className="hidden md:flex flex-1 min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none]" aria-label="Gruppen">
            {[['parks', `Parks ${parks.length || ''}`], ['einzelteile', `Einzelteile ${katalog?.elemente.length ?? ''}`]].map(([id, text]) => (
              <a key={id} href={`#${id}`} className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-brand-dark text-white hover:bg-brand-orange transition-colors">{text}</a>
            ))}
            <span className="shrink-0 w-px bg-brand-dark/10 mx-1" />
            {katalog?.gruppen.map((g) => (
              <a key={g} href={`#${gruppenId(g)}`} className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-brand-muted border border-brand-dark/10 hover:border-brand-orange hover:text-brand-orange transition-colors">{g}</a>
            ))}
          </nav>
          <span className="ml-auto" />
          <ParkZaehler />
          <button
            type="button" onClick={() => !preise && setDialog(true)}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${preise ? 'bg-brand-orange/10 text-brand-orange cursor-default' : 'bg-brand-dark text-white hover:bg-brand-orange'}`}
          >
            <span className="material-symbols-outlined text-lg">{preise ? 'lock_open' : 'lock'}</span>
            <span className="sm:hidden">Preise</span>
            <span className="hidden sm:inline">{preise ? 'Preise freigeschaltet' : 'Preise freischalten'}</span>
          </button>
          {/* Katalog und Preisliste zum Blättern: Link kommt mit den Preisen, ohne Code öffnet sich die Code-Eingabe */}
          <button
            type="button" onClick={() => (katalogLinks ? setBlaettern(true) : !preise && setDialog(true))}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${katalogLinks ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 hover:bg-brand-dark' : 'border border-brand-dark/15 text-brand-dark hover:border-brand-orange hover:text-brand-orange'}`}
            title="Katalog und Preisliste 2026 zum Blättern"
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            {katalogLinks ? <>Katalog<span className="hidden sm:inline">&nbsp;2026 blättern</span></> : <span className="hidden sm:inline">Katalog</span>}
          </button>
          {betreiber && (
            <>
              <button type="button" onClick={async () => setNeuCode((await kundencode('preise')) ?? 'Fehler, bitte erneut versuchen')} className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider bg-brand-dark text-white hover:bg-brand-orange transition-colors" title="Kundencode für die Preise erzeugen">
                <span className="material-symbols-outlined text-lg">key</span>Code Preise
              </button>
              <button type="button" onClick={async () => setNeuCode((await kundencode('konfigurator')) ?? 'Fehler, bitte erneut versuchen')} className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider bg-brand-dark text-white hover:bg-brand-orange transition-colors" title="Kundencode für den Konfigurator erzeugen">
                <span className="material-symbols-outlined text-lg">key</span>Code Konfigurator
              </button>
            </>
          )}
        </div>
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
        {katalogLinks && (
          <div className="mb-16 flex flex-col md:flex-row md:items-center gap-6 bg-brand-dark text-white rounded-2xl p-6 md:p-8">
            <span className="material-symbols-outlined text-5xl text-brand-orange">menu_book</span>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading uppercase tracking-tight">Ihr Katalog 2026 ist freigeschaltet</h2>
              <p className="text-white/70 mt-1">Alle Elemente mit Nettopreisen. Blättern Sie im Heft oder laden Sie es als PDF.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setBlaettern(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-brand-dark transition-colors">
                <span className="material-symbols-outlined text-lg">auto_stories</span>Blättern
              </button>
              <a href={katalogLinks.download} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-bold uppercase tracking-wider text-sm hover:border-brand-orange hover:text-brand-orange transition-colors">
                <span className="material-symbols-outlined text-lg">download</span>PDF laden
              </a>
            </div>
          </div>
        )}
        {parks.length > 0 && (
          <div id="parks" className="mb-24 scroll-mt-40">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3 mb-8 border-b border-brand-dark/10 pb-4">
              <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">Skatepark-Beispiele</h2>
              <span className="font-mono text-xs text-brand-muted">{parkTreffer.length} Parks</span>
              <div className="w-full md:w-auto md:ml-auto flex flex-wrap gap-1.5" role="group" aria-label="Nach Fläche filtern">
                {GROESSEN.map((g, i) => (
                  <button
                    key={g.name} type="button" onClick={() => setGroesse(i)} aria-pressed={groesse === i}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors ${groesse === i ? 'bg-brand-orange border-brand-orange text-white' : 'border-brand-dark/10 text-brand-muted hover:border-brand-orange hover:text-brand-orange'}`}
                  >{g.name}</button>
                ))}
              </div>
            </div>
            <p className="text-brand-muted max-w-3xl mb-8">Jeder Park ist aus unseren Einzelelementen zusammengestellt, mit Fläche, Stückliste und Gesamtpreis. Im Detail drehen Sie die Anlage in 3D.</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {parkListe.map((p) => <ParkKarte key={p.id} p={p} preis={preise ? preisText(preise[p.id]) ?? 'auf Anfrage' : null} onSperre={() => setDialog(true)} />)}
            </div>
            {!parkTreffer.length && <p className="text-center text-brand-muted py-12">Kein Park passt zu diesem Filter.</p>}
            {parkListe.length < parkTreffer.length && (
              <div className="text-center mt-10">
                <button type="button" onClick={() => setAlleParks(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-dark/15 text-brand-dark font-bold uppercase tracking-wider text-sm hover:border-brand-orange hover:text-brand-orange transition-colors">
                  Alle {parkTreffer.length} Parks zeigen <span className="material-symbols-outlined text-lg">expand_more</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div id="einzelteile" className="scroll-mt-40 mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">Einzelteile</h2>
          <p className="text-brand-muted max-w-3xl mt-4">Alle Elemente modular im 125-cm-Raster. Jedes einzeln in 3D, mit Maßen und Planungsdaten.</p>
        </div>
        {!katalog && <p className="text-center text-brand-muted py-24">Katalog wird geladen …</p>}
        {katalog?.gruppen.map((g, gi) => {
          const liste = treffer.filter((e) => e.gruppe === g);
          if (!liste.length) return null;
          return (
            <div key={g} id={gruppenId(g)} className="mb-20 scroll-mt-40">
              <div className="flex items-baseline gap-4 mb-8 border-b border-brand-dark/10 pb-4">
                <span className="font-mono text-xs text-brand-orange">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">{g}</h2>
                <span className="ml-auto font-mono text-xs text-brand-muted">{liste.length} Elemente</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {liste.map((e) => (
                  <Link
                    key={e.slug} to={`/katalog/${e.slug}`}
                    className="group rounded-2xl overflow-hidden border border-brand-dark/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:border-brand-orange/40 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                  >
                    <div className="aspect-square bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#F2F0EB_80%)] p-4 relative">
                      <img src={e.bild} alt={e.name} loading="lazy" decoding="async" width="640" height="640" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute top-3 right-3 material-symbols-outlined text-brand-muted/60 group-hover:text-brand-orange text-xl">3d_rotation</span>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-extrabold font-heading text-brand-dark uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors">{e.name}</h3>
                      <p className="font-mono text-[11px] text-brand-muted mt-1">{e.preisliste_code || e.kuerzel || '–'}</p>
                      <p className="text-xs text-brand-muted mt-2">{kurzMasse(e)}</p>
                      <div className="mt-3"><PreisBadge preis={preise ? preisText(preise[e.slug]) ?? 'auf Anfrage' : null} onSperre={() => setDialog(true)} /></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        {katalog && !treffer.length && <p className="text-center text-brand-muted py-24">Keine Elemente zu „{suche}“ gefunden.</p>}
        {katalog && (
          <div className="mt-8 mb-16 grid md:grid-cols-2 gap-8 border-t border-brand-dark/10 pt-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">Eigenschaften</span>
              <h2 className="text-2xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mt-2">Gebaut für Jahrzehnte.</h2>
              <p className="text-brand-muted mt-4">Alle Elemente sind modular im 125-cm-Raster aufgebaut und lassen sich frei kombinieren, erweitern und umstellen.</p>
            </div>
            <ul className="space-y-3 text-sm text-brand-dark">
              {[
                'Bewehrter Beton C35/45, Wandstärke 8 bis 16 cm',
                'Aufstellen ohne Fundament, höhenverstellbare Füße gleichen Unebenheiten aus',
                'Durchgehender, einbetonierter Hartgummi-Kantenschutz an allen Fahrkanten',
                'Verzinkte Copingrohre mit Alukappen, Anlaufbleche aus Edelstahl',
                'Offenporige Oberfläche: bei Nässe nicht rutschig, kaum Lärm',
                'TÜV-geprüft nach DIN EN 14974, GS-Zeichen',
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="material-symbols-outlined text-brand-orange text-lg">check</span>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {katalog && (
          <p className="text-xs text-brand-muted text-center mt-8">
            Stand {new Date(katalog.stand).toLocaleDateString('de-DE')}. Darstellung schematisch, maßgeblich sind Preisliste und Angebot. Preise netto zzgl. MwSt.
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
          e={aktiv} preis={preise ? preisText(preise[aktiv.slug]) ?? 'auf Anfrage' : null} onSperre={() => setDialog(true)} onParkSperre={() => setKonfigDialog(true)} onClose={schliessen}
          zurueck={katalog!.elemente[index - 1]} vor={katalog!.elemente[index + 1]}
        />
      )}
      {neuCode && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={() => setNeuCode(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="w-full max-w-md bg-brand-bg rounded-2xl border border-brand-dark/10 shadow-2xl p-8">
            <h2 className="text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight mb-2">Kundencode</h2>
            <p className="text-brand-muted text-sm mb-4">{neuCode.startsWith('C-')
              ? 'Für den Konfigurator. Einlösbar einmal innerhalb von 7 Tagen, danach kann der Kunde 2 Tage lang planen.'
              : 'Für die Preise. Gilt einmal und 7 Tage lang. Nach dem Einlösen sieht der Kunde die Preise, bis er die Seite neu lädt.'}</p>
            <p className="font-mono text-lg tracking-wider bg-white border border-brand-dark/15 rounded-lg px-4 py-3 select-all break-all">{neuCode}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => navigator.clipboard?.writeText(neuCode)} className="px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-dark transition-colors">Kopieren</button>
              <button type="button" onClick={abmelden} className="text-sm text-brand-muted hover:text-brand-dark">Auf diesem Gerät abmelden</button>
              <button type="button" onClick={() => setNeuCode(null)} className="ml-auto text-sm text-brand-muted hover:text-brand-dark">Schließen</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
      {blaettern && katalogLinks && (
        <Suspense fallback={null}><Blaetterkatalog links={katalogLinks} onClose={() => setBlaettern(false)} /></Suspense>
      )}
      <CodeDialog
        offen={dialog} onClose={() => setDialog(false)} freischalten={freischalten} anfrage={ANFRAGE} titel="Preise freischalten"
        text="Die Nettopreise 2026 und den Katalog zum Blättern sehen Sie mit Ihrem persönlichen Code. Der Code gilt einmal: Nach dem Neuladen der Seite sind die Preise wieder ausgeblendet. Sie haben noch keinen? Wir senden ihn Ihnen gern zu."
      />
      <CodeDialog offen={konfigDialog} onClose={() => setKonfigDialog(false)} freischalten={konfig.freischalten} anfrage={KONFIGURATOR_ANFRAGE} titel={KONFIGURATOR_TITEL} text={KONFIGURATOR_TEXT} />
    </PageShell>
  );
};

export default KatalogPage;
