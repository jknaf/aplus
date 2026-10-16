import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import ModellAnsicht from '../components/katalog/ModellAnsicht';
import { usePreise } from '../components/katalog/usePreise';

// Daten: public/katalog/katalog.json, erzeugt aus der Archicad-Skate-Bibliothek
// (08_CAD_Blender/10_Katalog/katalog_web.py). Preise kommen nur über /api/skate-preise.

interface Parameter { name: string; typ: string; wert: unknown; beschreibung: string }
interface Element {
  slug: string; name: string; gruppe: string; element: string; kuerzel: string;
  preisliste_code: string; preisliste_produkt: string; preisliste_masse_cm: string;
  modell_masse_cm: { laenge: number; breite: number; hoehe: number };
  gdl_standard_m: Record<string, number>; gdl_parameter: Parameter[];
  materialien: string[]; makros: string[]; gsm_datei: string; gsm_version: string; gsm_datum: string;
  modell: string; bild: string;
  gewicht: { kg: number; hinweis: string } | null;
}
interface Katalog { stand: string; quelle: string; gruppen: string[]; elemente: Element[] }

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

const wertText = (p: Parameter) => {
  if (typeof p.wert === 'number') {
    if (p.typ === 'Länge') return `${Math.round(p.wert * 1000).toLocaleString('de-DE')} mm`;
    if (p.typ === 'Winkel') return `${Math.round(p.wert * 10) / 10}°`;
    if (p.typ === 'Boolean') return p.wert ? 'Ja' : 'Nein';
    return String(Math.round(p.wert * 1000) / 1000).replace('.', ',');
  }
  if (Array.isArray(p.wert)) return `${p.wert.length} Werte`;
  return String(p.wert ?? '–');
};

const PreisBadge: React.FC<{ preis: string | null; gross?: boolean; onSperre: () => void }> = ({ preis, gross, onSperre }) =>
  preis ? (
    <span className={`font-heading font-extrabold text-brand-dark ${gross ? 'text-3xl' : 'text-base'}`}>
      {preis} <span className="text-xs font-sans font-normal text-brand-muted">netto</span>
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

const CodeDialog: React.FC<{ offen: boolean; onClose: () => void; freischalten: (c: string) => Promise<string | null> }> = ({ offen, onClose, freischalten }) => {
  const [code, setCode] = useState('');
  const [fehler, setFehler] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState(false);
  if (!offen) return null;
  const senden = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLaeuft(true); setFehler(null);
    const f = await freischalten(code);
    setLaeuft(false);
    if (f) setFehler(f); else { setCode(''); onClose(); }
  };
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={onClose}>
      <form onSubmit={senden} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-brand-bg rounded-2xl border border-brand-dark/10 shadow-2xl p-8">
        <span className="material-symbols-outlined text-brand-orange text-4xl mb-4">lock_open</span>
        <h2 className="text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight mb-2">Preise freischalten</h2>
        <p className="text-brand-muted text-sm mb-6">Die Nettopreise 2026 sehen Sie mit Ihrem persönlichen Code. Sie haben noch keinen? Wir senden ihn Ihnen gern zu.</p>
        <label className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2" htmlFor="preis-code">Code</label>
        <input
          id="preis-code" value={code} onChange={(e) => setCode(e.target.value)} autoFocus autoComplete="off"
          className="w-full px-4 py-3 rounded-lg border border-brand-dark/15 bg-white font-mono tracking-widest uppercase focus:outline-none focus:border-brand-orange"
        />
        {fehler && <p className="mt-3 text-sm text-red-700" role="alert">{fehler}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={!code.trim() || laeuft} className="px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:bg-brand-dark transition-colors">
            {laeuft ? 'Prüfe …' : 'Freischalten'}
          </button>
          <a href={ANFRAGE} className="text-sm text-brand-orange underline underline-offset-4">Code anfordern</a>
          <button type="button" onClick={onClose} className="ml-auto text-sm text-brand-muted hover:text-brand-dark">Abbrechen</button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

const Zeile: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex justify-between gap-6 py-2.5 border-b border-brand-dark/5 text-sm">
    <dt className="text-brand-muted">{label}</dt>
    <dd className="text-brand-dark font-medium text-right">{children}</dd>
  </div>
);

const Detail: React.FC<{
  e: Element; preis: string | null; onSperre: () => void; onClose: () => void; vor?: Element; zurueck?: Element;
}> = ({ e, preis, onSperre, onClose, vor, zurueck }) => {
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
          <ModellAnsicht key={e.slug} src={e.modell} poster={e.bild} alt={`3D-Modell ${e.name}`} />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-muted pointer-events-none">
            <span className="material-symbols-outlined text-base">3d_rotation</span> Ziehen zum Drehen · Scrollen zum Zoomen
          </div>
        </div>
        <div className="p-6 md:p-10 flex flex-col">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-3">{e.gruppe}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.95] mb-2">{e.name}</h2>
          <p className="font-mono text-sm text-brand-muted mb-6">{e.preisliste_code || e.kuerzel || 'ohne Code'}{e.preisliste_produkt && ` · ${e.preisliste_produkt}`}</p>
          <div className="mb-8"><PreisBadge preis={preis} gross onSperre={onSperre} /></div>

          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-1">Bemaßung</h3>
          <dl className="mb-8">
            {p ? (
              <>
                <Zeile label="Höhe H (Preisliste)">{p.h} cm</Zeile>
                <Zeile label="Länge L (Preisliste)">{p.l} cm</Zeile>
                <Zeile label="Breite B (Preisliste)">{p.b} cm</Zeile>
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
            <Zeile label="Bibliothekselement">{e.gsm_datei}</Zeile>
          </dl>

          {e.gdl_parameter.length > 0 && (
            <details className="mb-6 group">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-brand-muted hover:text-brand-orange list-none flex items-center gap-1">
                <span className="material-symbols-outlined text-base group-open:rotate-90 transition-transform">chevron_right</span>
                Planungsparameter ({e.gdl_parameter.length})
              </summary>
              <dl className="mt-2">
                {e.gdl_parameter.map((x) => (
                  <Zeile key={x.name} label={x.beschreibung || x.name}>{wertText(x)}</Zeile>
                ))}
              </dl>
            </details>
          )}

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

const KatalogPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [katalog, setKatalog] = useState<Katalog | null>(null);
  const [suche, setSuche] = useState('');
  const [dialog, setDialog] = useState(false);
  const { preise, freischalten } = usePreise();

  useEffect(() => {
    fetch('/katalog/katalog.json').then((r) => r.json()).then(setKatalog).catch(() => setKatalog(null));
  }, []);

  const treffer = useMemo(() => {
    if (!katalog) return [];
    const q = suche.trim().toLowerCase();
    return katalog.elemente.filter((e) => !q || [e.name, e.preisliste_code, e.kuerzel, e.gruppe, e.preisliste_produkt].join(' ').toLowerCase().includes(q));
  }, [katalog, suche]);

  const index = katalog?.elemente.findIndex((e) => e.slug === slug) ?? -1;
  const aktiv = index >= 0 ? katalog!.elemente[index] : undefined;
  const schliessen = () => navigate('/katalog', { replace: false });

  return (
    <PageShell
      title={aktiv ? `${aktiv.name} · Skate-Katalog` : 'Skate-Katalog in 3D'}
      description="Alle Skate-Elemente von A+ Urban Design in 3D: Tables, Banks, Hips, Ramps, Rails und mehr. Mit Maßen, Codes und Planungsdaten."
    >
      <section className="pt-32 pb-10 md:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Katalog</span>
          <h1 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
            Skate-<span className="text-brand-orange">Elemente.</span>
          </h1>
          <p className="text-brand-muted mt-6 max-w-2xl mx-auto text-lg">
            {katalog ? `${katalog.elemente.length} Elemente` : 'Alle Elemente'} in 3D. Drehen, zoomen und vergleichen, mit allen Maßen und Planungsdaten.
          </p>
        </div>
      </section>

      <div className="sticky top-14 md:top-20 z-30 bg-brand-bg/95 backdrop-blur-md border-y border-brand-dark/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted text-xl">search</span>
            <input
              value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suchen, z. B. Bank 98 oder SCR"
              aria-label="Katalog durchsuchen"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-dark/10 bg-white/70 text-sm focus:outline-none focus:border-brand-orange"
            />
          </div>
          <nav className="hidden md:flex flex-1 min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none]" aria-label="Gruppen">
            {katalog?.gruppen.map((g) => (
              <a key={g} href={`#${gruppenId(g)}`} className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-brand-muted border border-brand-dark/10 hover:border-brand-orange hover:text-brand-orange transition-colors">{g}</a>
            ))}
          </nav>
          <button
            type="button" onClick={() => !preise && setDialog(true)}
            className={`ml-auto shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${preise ? 'bg-brand-orange/10 text-brand-orange cursor-default' : 'bg-brand-dark text-white hover:bg-brand-orange'}`}
          >
            <span className="material-symbols-outlined text-lg">{preise ? 'lock_open' : 'lock'}</span>
            {preise ? 'Preise freigeschaltet' : 'Preise freischalten'}
          </button>
        </div>
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
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
                      <img src={e.bild} alt={e.name} loading="lazy" decoding="async" width="420" height="420" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute top-3 right-3 material-symbols-outlined text-brand-muted/60 group-hover:text-brand-orange text-xl">3d_rotation</span>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-extrabold font-heading text-brand-dark uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors">{e.name}</h3>
                      <p className="font-mono text-[11px] text-brand-muted mt-1">{e.preisliste_code || e.kuerzel || '–'}</p>
                      <p className="text-xs text-brand-muted mt-2">{kurzMasse(e)}</p>
                      <div className="mt-3"><PreisBadge preis={preisText(preise?.[e.slug])} onSperre={() => setDialog(true)} /></div>
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

      {aktiv && (
        <Detail
          e={aktiv} preis={preisText(preise?.[aktiv.slug])} onSperre={() => setDialog(true)} onClose={schliessen}
          zurueck={katalog!.elemente[index - 1]} vor={katalog!.elemente[index + 1]}
        />
      )}
      <CodeDialog offen={dialog} onClose={() => setDialog(false)} freischalten={freischalten} />
    </PageShell>
  );
};

export default KatalogPage;
