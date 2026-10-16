import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import Buehne, { type BuehnenApi } from '../components/konfigurator/Buehne';
import Druck, { Plan, type DruckOptionen } from '../components/konfigurator/Druck';
import { PARK_SPEICHER, leeren, warteschlange } from '../components/konfigurator/merkliste';
import {
  BAUSTEINE, LEER, RASTER, gruppen, gruppeVerschieben, anbauMoeglich, bowl, drehenGruppe, geradeAnhaengen, kurveAnhaengen, gelaenderModus, gelaenderSetzen, type GelaenderModus, type Richtung, VORLAGEN, abgeleitet, allesBeheben, anordnen, beheben, csv, dekodieren, einrasten,
  hinzufuegen, kodieren, kollidiert, neueId, pruefen, stueckliste, vorlageBauen, vorschlag as vorschlagFuer, waehlbar,
  type Ctx, type Hinweis, type Park, type Teil, type Vorschlag,
} from '../components/konfigurator/logik';

// Konzept: 08_CAD_Blender/12_Konfigurator/…_Konfigurator_Konzept_V01.md, Regeln: …_Regelwerk_V01.md

interface KatalogElement { slug: string; name: string; gruppe: string; kuerzel: string; preisliste_code: string; modell: string; bild: string; gewicht: { kg: number } | null }
interface Katalog { gruppen: string[]; elemente: KatalogElement[] }

const m = (x: number) => x.toLocaleString('de-DE', { maximumFractionDigits: 2 });
const istEingabe = (el: EventTarget | null) => el instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);

const Knopf: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: string; aktiv?: boolean }> = ({ icon, aktiv, children, className = '', ...rest }) => (
  <button
    type="button"
    {...rest}
    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${aktiv ? 'bg-brand-dark text-white' : 'bg-white/80 text-brand-dark hover:bg-white border border-brand-dark/10'} ${className}`}
  >
    {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
    {children}
  </button>
);

// Ohne WebGL (alte Geräte, gesperrte Grafik) nicht die ganze Seite verlieren: dann den Plan zeigen
class OhneDreiD extends React.Component<{ ersatz: React.ReactNode; children: React.ReactNode }, { fehler: boolean }> {
  state = { fehler: false };
  static getDerivedStateFromError() { return { fehler: true }; }
  render() { return this.state.fehler ? this.props.ersatz : this.props.children; }
}

// ---------- Start: Vorlage wählen ----------

const Start: React.FC<{ onWahl: (id: string) => void; onSchliessen?: () => void }> = ({ onWahl, onSchliessen }) => (
  <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
    <div className="w-full max-w-4xl bg-brand-bg rounded-2xl shadow-2xl p-6 md:p-10 max-h-full overflow-y-auto">
      <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">Konfigurator</span>
      <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.95] mt-2 mb-3">Skatepark planen.</h1>
      <p className="text-brand-muted mb-8 max-w-2xl">Starten Sie mit einer Vorlage und passen Sie sie an. Elemente docken passend an, Geländer und Pflichtteile ergänzt der Konfigurator selbst.</p>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {VORLAGEN.map((v) => (
          <button key={v.id} type="button" onClick={() => onWahl(v.id)} className="text-left p-5 rounded-xl bg-white border border-brand-dark/10 hover:border-brand-orange hover:shadow-lg transition-all group">
            <span className="block font-heading font-extrabold uppercase text-brand-dark text-lg group-hover:text-brand-orange">{v.name}</span>
            <span className="block text-sm text-brand-muted mt-2">{v.text}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Knopf icon="crop_free" onClick={() => onWahl('leer')}>Leere Fläche</Knopf>
        {onSchliessen && <button type="button" onClick={onSchliessen} className="text-sm text-brand-muted hover:text-brand-dark">Abbrechen</button>}
      </div>
    </div>
  </div>
);

// ---------- Anfrage ----------

interface Kontakt { name: string; organisation: string; email: string; telefon: string; ort: string; flaeche: string; untergrund: string; zeitraum: string; nachricht: string; firma2: string; ok: boolean }
const LEER_KONTAKT: Kontakt = { name: '', organisation: '', email: '', telefon: '', ort: '', flaeche: 'vorhanden', untergrund: 'Asphalt', zeitraum: '', nachricht: '', firma2: '', ok: false };

const Feld: React.FC<{ label: string; pflicht?: boolean; children: React.ReactNode }> = ({ label, pflicht, children }) => (
  <label className="block">
    <span className="block font-mono text-[11px] uppercase tracking-widest text-brand-muted mb-1">{label}{pflicht && ' *'}</span>
    {children}
  </label>
);
const eingabe = 'w-full px-3 py-2.5 rounded-lg border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-orange text-sm';

const AnfrageDialog: React.FC<{
  offen: boolean; onClose: () => void; senden: (k: Kontakt) => Promise<string | null>; offeneHinweise: number; csvLaden: () => void; link: string;
}> = ({ offen, onClose, senden, offeneHinweise, csvLaden, link }) => {
  const [k, setK] = useState<Kontakt>(LEER_KONTAKT);
  const [status, setStatus] = useState<'bereit' | 'laeuft' | 'fertig'>('bereit');
  const [fehler, setFehler] = useState<string | null>(null);
  if (!offen) return null;
  const set = (f: keyof Kontakt) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setK({ ...k, [f]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value });
  const absenden = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('laeuft'); setFehler(null);
    const f = await senden(k);
    if (f) { setFehler(f); setStatus('bereit'); } else setStatus('fertig');
  };
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-brand-bg rounded-2xl shadow-2xl p-6 md:p-8 max-h-[92vh] overflow-y-auto">
        {status === 'fertig' ? (
          <div>
            <span className="material-symbols-outlined text-brand-orange text-5xl">check_circle</span>
            <h2 className="text-2xl font-extrabold font-heading uppercase text-brand-dark mt-3 mb-2">Danke für Ihre Anfrage.</h2>
            <p className="text-brand-muted mb-6">Wir haben Ihren Park mit Stückliste erhalten und melden uns mit einem Angebot. Eine Bestätigung ist an {k.email} unterwegs.</p>
            <div className="flex flex-wrap gap-3">
              <Knopf icon="link" onClick={() => navigator.clipboard?.writeText(link)}>Park-Link kopieren</Knopf>
              <Knopf onClick={onClose}>Schließen</Knopf>
            </div>
          </div>
        ) : (
          <form onSubmit={absenden}>
            <h2 className="text-2xl font-extrabold font-heading uppercase text-brand-dark mb-1">Angebot anfragen</h2>
            <p className="text-sm text-brand-muted mb-6">Wir erhalten Ihren Park mit Stückliste, Draufsicht und Link und erstellen daraus ein Angebot. Unverbindlich.</p>
            {offeneHinweise > 0 && (
              <p className="mb-5 text-sm bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3">
                {offeneHinweise} {offeneHinweise === 1 ? 'Hinweis ist' : 'Hinweise sind'} noch offen. Sie können trotzdem senden, wir prüfen das im Angebot.
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <Feld label="Name" pflicht><input required maxLength={120} className={eingabe} value={k.name} onChange={set('name')} autoComplete="name" /></Feld>
              <Feld label="Kommune / Organisation"><input maxLength={160} className={eingabe} value={k.organisation} onChange={set('organisation')} autoComplete="organization" /></Feld>
              <Feld label="E-Mail" pflicht><input required type="email" maxLength={160} className={eingabe} value={k.email} onChange={set('email')} autoComplete="email" /></Feld>
              <Feld label="Telefon"><input maxLength={60} className={eingabe} value={k.telefon} onChange={set('telefon')} autoComplete="tel" /></Feld>
              <Feld label="Ort der Anlage" pflicht><input required maxLength={160} className={eingabe} value={k.ort} onChange={set('ort')} /></Feld>
              <Feld label="Gewünschter Zeitraum"><input maxLength={80} className={eingabe} value={k.zeitraum} onChange={set('zeitraum')} placeholder="z. B. Frühjahr 2027" /></Feld>
              <Feld label="Fläche">
                <select className={eingabe} value={k.flaeche} onChange={set('flaeche')}>
                  <option value="vorhanden">Fahrfläche ist vorhanden</option>
                  <option value="geplant">Fahrfläche wird neu gebaut</option>
                  <option value="unklar">Noch offen</option>
                </select>
              </Feld>
              <Feld label="Untergrund">
                <select className={eingabe} value={k.untergrund} onChange={set('untergrund')}>
                  <option>Asphalt</option><option>Beton</option><option>Pflaster</option><option>Noch offen</option>
                </select>
              </Feld>
            </div>
            <div className="mt-4"><Feld label="Nachricht"><textarea maxLength={3000} rows={3} className={eingabe} value={k.nachricht} onChange={set('nachricht')} /></Feld></div>
            <input tabIndex={-1} autoComplete="off" value={k.firma2} onChange={set('firma2')} className="hidden" aria-hidden="true" />
            <label className="flex items-start gap-2 mt-4 text-sm text-brand-muted">
              <input type="checkbox" required checked={k.ok} onChange={set('ok')} className="mt-1" />
              <span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und per E-Mail an A+ Urban Design übermittelt werden. <Link to="/datenschutz" className="underline" target="_blank">Datenschutz</Link></span>
            </label>
            {fehler && (
              <div className="mt-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                <p className="mb-2">{fehler}</p>
                <p>Ihr Park geht nicht verloren: <button type="button" className="underline" onClick={csvLaden}>Stückliste herunterladen</button> oder <button type="button" className="underline" onClick={() => navigator.clipboard?.writeText(link)}>Park-Link kopieren</button>.</p>
              </div>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === 'laeuft'} className="px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:bg-brand-dark transition-colors">
                {status === 'laeuft' ? 'Sende …' : 'Anfrage senden'}
              </button>
              <button type="button" onClick={onClose} className="text-sm text-brand-muted hover:text-brand-dark">Abbrechen</button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
};

// ---------- Drucken ----------

const DruckDialog: React.FC<{ offen: boolean; onClose: () => void; onDrucken: (o: DruckOptionen) => void }> = ({ offen, onClose, onDrucken }) => {
  const [o, setO] = useState<DruckOptionen>({ titel: '', bemassung: true, bezeichnungen: true, ansicht3d: true, liste: true });
  if (!offen) return null;
  const haken = (f: 'bemassung' | 'bezeichnungen' | 'ansicht3d' | 'liste', text: string) => (
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={o[f]} onChange={(e) => setO({ ...o, [f]: e.target.checked })} />{text}</label>
  );
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onDrucken(o); }} className="w-full max-w-md bg-brand-bg rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-extrabold font-heading uppercase text-brand-dark mb-1">Drucken / PDF</h2>
        <p className="text-sm text-brand-muted mb-5">Mit Logo und Datum. Im Druckfenster „Als PDF sichern“ wählen.</p>
        <Feld label="Titel (z. B. Ort oder Projekt)"><input className={eingabe} value={o.titel} maxLength={80} onChange={(e) => setO({ ...o, titel: e.target.value })} placeholder="Skatepark" /></Feld>
        <div className="mt-4 space-y-2">
          {haken('bemassung', 'Plan mit Bemaßung')}
          {haken('bezeichnungen', 'Plan mit Bezeichnungen (Name und Kürzel)')}
          {haken('ansicht3d', '3D-Ansicht (aktueller Blickwinkel)')}
          {haken('liste', 'Stückliste')}
        </div>
        <div className="mt-6 flex gap-4 items-center">
          <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-orange text-white font-bold uppercase text-sm hover:bg-brand-dark">PDF erstellen</button>
          <button type="button" onClick={onClose} className="text-sm text-brand-muted">Abbrechen</button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

// ---------- Seite ----------

const KonfiguratorPage: React.FC = () => {
  const [katalog, setKatalog] = useState<Katalog | null>(null);
  const [ctx, setCtx] = useState<Ctx | null>(null);
  const [park, setPark] = useState<Park | null>(null);
  const [verlauf, setVerlauf] = useState<{ zurueck: Park[]; vor: Park[] }>({ zurueck: [], vor: [] });
  const [auswahl, setAuswahl] = useState<string | null>(null);
  // Gezogene Teile (eines oder eine ganze Gruppe); die Referenz hält den Stand, falls schnell losgelassen wird
  type Zug = { id: string; teile: Teil[]; getauscht: boolean };
  const [ziehen, setZiehen] = useState<Zug | null>(null);
  const ziehenAktuell = useRef<Zug | null>(null);
  const [vorschlag, setVorschlag] = useState<Vorschlag | null>(null);
  const abgelehnt = useRef(new Set<string>());
  const [meldung, setMeldung] = useState<string | null>(null);
  const [ansicht, setAnsicht] = useState<'3d' | 'oben'>('3d');
  const [rundflug, setRundflug] = useState(false);
  const [reiter, setReiter] = useState<'bausteine' | 'einzelteile'>('bausteine');
  const [suche, setSuche] = useState('');
  const [start, setStart] = useState(false);
  const [anfrage, setAnfrage] = useState(false);
  const [druckDialog, setDruckDialog] = useState(false);
  const [druck, setDruck] = useState<{ optionen: DruckOptionen; bild: string } | null>(null);
  const [panel, setPanel] = useState<'katalog' | 'liste' | null>(null);
  const api = useRef<BuehnenApi | null>(null);

  const melden = useCallback((text: string) => { setMeldung(text); window.setTimeout(() => setMeldung((x) => (x === text ? null : x)), 3500); }, []);

  // Daten laden: Katalog und die aus den Modellen berechneten Maße
  useEffect(() => {
    Promise.all([fetch('/katalog/katalog.json').then((r) => r.json()), fetch('/konfigurator/masse.json').then((r) => r.json())]).then(([k, masse]: [Katalog, Ctx['masse']]) => {
      const info: Ctx['info'] = {};
      for (const e of k.elemente) info[e.slug] = { name: e.name, code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe, kg: e.gewicht?.kg };
      const c = { masse, info };
      setKatalog(k);
      setCtx(c);
      const ausLink = window.location.hash.startsWith('#p=') ? dekodieren(window.location.hash.slice(3), c) : null;
      let gespeichert: Park | null = null;
      try { const s = localStorage.getItem(PARK_SPEICHER); gespeichert = s ? dekodieren(s, c) : null; } catch { gespeichert = null; }
      let p = ausLink ?? gespeichert;
      const neu = warteschlange().filter((s) => c.masse[s]);
      if (neu.length) {
        p = p ?? LEER;
        for (const s of neu) p = hinzufuegen(p, [{ id: neueId(), slug: s, x: 0, z: 0, rot: 0 }], c);
        leeren();
        melden(`${neu.length} ${neu.length === 1 ? 'Element' : 'Elemente'} aus dem Katalog übernommen.`);
      }
      if (p) setPark(p); else setStart(true);
    });
  }, [melden]);

  // Speichern im Browser, damit der Park beim Wechsel zum Katalog erhalten bleibt
  useEffect(() => {
    if (!park) return;
    try { localStorage.setItem(PARK_SPEICHER, kodieren(park)); } catch { /* ohne Speicher bleibt der Park nur bis zum Neuladen */ }
  }, [park]);

  const aendern = useCallback((neu: Park, vorher?: Park) => {
    setVerlauf((v) => ({ zurueck: [...v.zurueck.slice(-49), vorher ?? park!], vor: [] }));
    setPark(neu);
  }, [park]);

  const zeigeVorschlag = useCallback((id: string, p: Park) => {
    if (!ctx || abgelehnt.current.has(id)) { setVorschlag(null); return; }
    setVorschlag(vorschlagFuer(id, p, ctx));
  }, [ctx]);

  const mitZug = (p: Park, z: Zug): Park => { const neu = new Map(z.teile.map((t) => [t.id, t])); return { ...p, teile: p.teile.map((t) => neu.get(t.id) ?? t) }; };
  const dargestellt = useMemo(() => (park && ziehen ? mitZug(park, ziehen) : park), [park, ziehen]);
  const ab = useMemo(() => (ctx && dargestellt ? abgeleitet(dargestellt, ctx) : null), [ctx, dargestellt]);
  const hinweise = useMemo(() => (ctx && park ? pruefen(park, ctx) : []), [ctx, park]);
  const markierung = useMemo(() => {
    const out: Record<string, 'rot' | 'gelb'> = {};
    for (const h of hinweise) for (const id of h.teile.slice(0, 1)) if (out[id] !== 'rot') out[id] = h.stufe;
    if (ctx && ziehen && dargestellt) for (const t of ziehen.teile) if (kollidiert(t, dargestellt, ctx)) out[t.id] = 'rot';
    return out;
  }, [hinweise, ziehen, ctx, dargestellt]);
  const zeilen = useMemo(() => (ctx && park ? stueckliste(park, ctx) : []), [ctx, park]);
  const gewicht = zeilen.reduce((s, z) => s + (z.kg ?? 0), 0);
  const link = park ? `${window.location.origin}/konfigurator#p=${kodieren(park)}` : '';

  // ---------- Aktionen ----------

  const vorlageWaehlen = (id: string) => {
    if (!ctx) return;
    const v = VORLAGEN.find((x) => x.id === id);
    const neu = v ? vorlageBauen(v, ctx) : LEER;
    if (park) aendern(neu); else setPark(neu);
    setStart(false); setAuswahl(null); setVorschlag(null);
    setAnsicht('3d');
  };
  const teileHinzufuegen = (neu: Teil[], text?: string) => {
    if (!ctx || !park) return;
    const p = hinzufuegen(park, neu, ctx);
    aendern(p);
    const id = neu[0]?.id;
    setAuswahl(id ?? null);
    if (neu.length === 1 && id) zeigeVorschlag(id, p); else setVorschlag(null);
    if (text) melden(text);
  };
  const bausteinTeile = (id: string) => (ctx ? BAUSTEINE.find((b) => b.id === id)?.bauen(ctx) ?? null : null);
  const einzelTeil = (slug: string): Teil => ({ id: neueId(), slug, x: 0, z: 0, rot: 0 });

  const loeschen = useCallback(() => {
    if (!park || !auswahl) return;
    aendern({ ...park, teile: park.teile.filter((t) => t.id !== auswahl) });
    setAuswahl(null); setVorschlag(null);
  }, [park, auswahl, aendern]);
  const drehen = useCallback((grad: number, einzeln = false) => {
    if (!park || !auswahl || !ctx) return;
    const t = park.teile.find((x) => x.id === auswahl)!;
    const gruppe = gruppen(park, ctx).find((g) => g.some((x) => x.id === t.id)) ?? [t];
    let neu: Park;
    if (!einzeln && gruppe.length > 1 && Math.abs(grad) === 90) {
      const gedreht = new Map(drehenGruppe(gruppe, grad > 0 ? 1 : 3, ctx).map((x) => [x.id, x]));
      neu = { ...park, teile: park.teile.map((x) => gedreht.get(x.id) ?? x) };
      if ([...gedreht.values()].some((x) => kollidiert(x, neu, ctx))) { melden('Zum Drehen ist hier kein Platz.'); return; }
    } else {
      const roh = { ...t, rot: (((t.rot + grad) % 360) + 360) % 360 };
      const r = Math.abs(grad) === 90 ? einrasten(roh, park, ctx).teil : roh;
      neu = { ...park, teile: park.teile.map((x) => (x.id === t.id ? r : x)) };
      if (kollidiert(r, neu, ctx)) { melden('Zum Drehen ist hier kein Platz.'); return; }
    }
    aendern(neu);
  }, [park, auswahl, ctx, aendern, melden]);
  const duplizieren = useCallback(() => {
    const t = park?.teile.find((x) => x.id === auswahl);
    if (t) teileHinzufuegen([{ ...t, id: neueId() }]);
  }, [park, auswahl]);
  const rueckgaengig = useCallback(() => {
    if (!verlauf.zurueck.length || !park) return;
    setPark(verlauf.zurueck[verlauf.zurueck.length - 1]);
    setVerlauf({ zurueck: verlauf.zurueck.slice(0, -1), vor: [park, ...verlauf.vor] });
    setVorschlag(null);
  }, [park, verlauf]);
  const wiederholen = useCallback(() => {
    if (!verlauf.vor.length || !park) return;
    setPark(verlauf.vor[0]);
    setVerlauf({ zurueck: [...verlauf.zurueck, park], vor: verlauf.vor.slice(1) });
  }, [park, verlauf]);

  const ziehenUpdate = useCallback((roh: Teil, einzeln: boolean) => {
    if (!ctx || !park) return;
    const gruppe = einzeln ? [] : gruppen(park, ctx).find((g) => g.some((t) => t.id === roh.id)) ?? [];
    let zug: Zug;
    if (gruppe.length > 1) {
      const alt = park.teile.find((t) => t.id === roh.id)!;
      zug = { id: roh.id, teile: gruppeVerschieben(gruppe, { x: roh.x - alt.x, z: roh.z - alt.z }, park, ctx), getauscht: false };
    } else {
      const r = einrasten(roh, park, ctx);
      zug = { id: roh.id, teile: [r.teil], getauscht: r.getauscht };
    }
    ziehenAktuell.current = zug;
    setZiehen(zug);
    setVorschlag(null);
  }, [ctx, park]);
  const ablegen = useCallback(() => {
    const z = ziehenAktuell.current;
    ziehenAktuell.current = null;
    setZiehen(null);
    if (!ctx || !park || !z) return;
    const neu = mitZug(park, z);
    if (z.teile.some((t) => kollidiert(t, neu, ctx))) { melden('Hier ist kein Platz. Es bleibt, wo es war.'); return; }
    aendern(neu);
    const t = z.teile.find((x) => x.id === z.id)!;
    if (z.getauscht) melden(`Höhe angepasst: ${ctx.info[t.slug]?.name ?? t.slug} passt zum Nachbarn.`);
    if (z.teile.length === 1) zeigeVorschlag(t.id, neu);
  }, [ctx, park, aendern, melden, zeigeVorschlag]);

  const anbau = useMemo(() => (ctx && park && auswahl ? anbauMoeglich(auswahl, park, ctx) : { kurve: [], gerade: [] }), [ctx, park, auswahl]);
  const anbauen = (art: 'kurve' | 'gerade', r: Richtung) => {
    if (!ctx || !park || !auswahl) return;
    const neu = art === 'kurve' ? kurveAnhaengen(auswahl, r, park, ctx) : geradeAnhaengen(auswahl, r, park, ctx);
    if (!neu) { melden('Dafür ist hier kein Platz.'); return; }
    aendern(neu);
    // Das zuletzt angebaute Stück auswählen, damit man direkt weiterbauen kann
    const letzte = neu.teile.filter((t) => t.slug === park.teile.find((x) => x.id === auswahl)?.slug).pop();
    if (letzte) setAuswahl(letzte.id);
    setVorschlag(null);
  };
  const gelModus = useMemo(() => (ctx && park && auswahl ? gelaenderModus(auswahl, park, ctx) : null), [ctx, park, auswahl]);
  const gelSetzen = (m: GelaenderModus) => { if (ctx && park && auswahl) aendern(gelaenderSetzen(auswahl, m, park, ctx)); };
  const [bowlMass, setBowlMass] = useState<{ h: 98 | 150; l: number; b: number }>({ h: 98, l: 3, b: 1 });
  const hinweisBeheben = (h: Hinweis) => {
    if (!ctx || !park) return;
    const neu = beheben(h, park, ctx);
    if (neu) aendern(neu); else melden('Das lässt sich nicht automatisch lösen. Bitte von Hand verschieben.');
  };
  const allesLoesen = () => {
    if (!ctx || !park) return;
    const neu = allesBeheben(park, ctx);
    const rest = pruefen(neu, ctx).length;
    aendern(neu);
    melden(rest ? `${hinweise.length - rest} behoben, ${rest} bleiben offen.` : 'Alles behoben.');
  };
  const neuAnordnen = () => {
    if (!ctx || !park) return;
    aendern(anordnen(park, ctx, false));
    melden('Neu angeordnet nach dem Muster der A+-Beispielparks.');
  };
  const flaecheSetzen = (l: number, b: number, angeboescht = park?.flaeche.angeboescht ?? false) => {
    if (!park) return;
    const runden = (x: number) => Math.min(120, Math.max(5, Math.round(x / RASTER) * RASTER));
    aendern({ ...park, flaeche: { l: runden(l), b: runden(b), angeboescht } });
  };
  const csvLaden = () => {
    const blob = new Blob(['﻿' + csv(zeilen)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'A-Plus-Skatepark-Stueckliste.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const drucken = (o: DruckOptionen) => {
    let bild = '';
    try { bild = o.ansicht3d ? api.current?.foto() ?? '' : ''; } catch { bild = ''; }
    setDruckDialog(false);
    setDruck({ optionen: o, bild });
    // erst rendern lassen, dann das Druckfenster öffnen; danach die Druckansicht wieder entfernen
    window.setTimeout(() => {
      const weg = () => { setDruck(null); window.removeEventListener('afterprint', weg); };
      window.addEventListener('afterprint', weg);
      window.print();
    }, 400);
  };
  const teilen = () => {
    navigator.clipboard?.writeText(link).then(() => melden('Link kopiert. Wer ihn öffnet, sieht genau diesen Park.'), () => melden(link));
  };
  const senden = async (k: Kontakt): Promise<string | null> => {
    if (!park) return 'Kein Park vorhanden.';
    let bild = '';
    try { bild = api.current?.bild() ?? ''; } catch { bild = ''; }
    try {
      const res = await fetch('/api/konfigurator-anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kontakt: k, link, bild,
          flaeche: park.flaeche,
          zeilen: zeilen.map((z) => ({ code: z.code, name: z.name, menge: z.menge, kg: z.kg, auto: z.auto })),
          hinweise: hinweise.map((h) => h.text),
        }),
      });
      const d = await res.json().catch(() => ({}));
      return res.ok ? null : d.fehler ?? 'Die Anfrage konnte nicht gesendet werden.';
    } catch {
      return 'Keine Verbindung. Bitte später erneut versuchen.';
    }
  };

  // Sidebar-Elemente per Ziehen auf die Bühne
  const fallenLassen = (e: React.DragEvent) => {
    e.preventDefault();
    if (!ctx || !park) return;
    const daten = e.dataTransfer.getData('text/plain');
    const p = api.current?.bodenPunkt(e.clientX, e.clientY);
    if (!daten || !p) return;
    const [typ, id] = daten.split(':');
    if (typ === 'teil') {
      const t = { ...einzelTeil(id), x: p.x, z: p.z };
      const r = einrasten(t, park, ctx);
      if (kollidiert(r.teil, { ...park, teile: [...park.teile, r.teil] }, ctx)) { teileHinzufuegen([t]); return; }
      const neu = { ...park, teile: [...park.teile, r.teil] };
      aendern(neu);
      setAuswahl(r.teil.id);
      if (r.getauscht) melden(`Höhe angepasst: ${ctx.info[r.teil.slug]?.name} passt zum Nachbarn.`);
      zeigeVorschlag(r.teil.id, neu);
    } else {
      const g = bausteinTeile(id);
      if (!g) return;
      const cx = g.reduce((s, t) => s + t.x, 0) / g.length;
      const cz = g.reduce((s, t) => s + t.z, 0) / g.length;
      const versetzt = g.map((t) => ({ ...t, x: t.x - cx + p.x, z: t.z - cz + p.z }));
      const ok = versetzt.every((t) => !kollidiert(t, park, ctx));
      if (ok) { aendern({ ...park, teile: [...park.teile, ...versetzt] }); setAuswahl(null); } else teileHinzufuegen(g);
    }
  };

  // Tastatur
  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      if (istEingabe(e.target) || anfrage || druckDialog) return;
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) wiederholen(); else rueckgaengig(); return; }
      if (cmd && e.key.toLowerCase() === 'd') { e.preventDefault(); duplizieren(); return; }
      if (!auswahl) return;
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); loeschen(); }
      if (e.key.toLowerCase() === 'r') drehen(e.shiftKey ? 15 : 90, e.altKey);
      if (e.key === 'Escape') { setAuswahl(null); setVorschlag(null); }
    };
    window.addEventListener('keydown', taste);
    return () => window.removeEventListener('keydown', taste);
  }, [auswahl, anfrage, druckDialog, loeschen, drehen, duplizieren, rueckgaengig, wiederholen]);

  const modellPfad = useCallback((slug: string) => katalog?.elemente.find((e) => e.slug === slug)?.modell ?? `/katalog/modelle/${slug}.gltf`, [katalog]);
  const ausgewaehlt = park?.teile.find((t) => t.id === auswahl);
  const auswahlHinweise = hinweise.filter((h) => auswahl && h.teile.includes(auswahl));
  const einzelteile = useMemo(() => {
    if (!katalog || !ctx) return [];
    const s = suche.trim().toLowerCase();
    return katalog.gruppen.map((g) => ({
      gruppe: g,
      elemente: katalog.elemente.filter((e) => e.gruppe === g && waehlbar(e.slug, ctx) && (!s || `${e.name} ${e.preisliste_code} ${e.kuerzel}`.toLowerCase().includes(s))),
    })).filter((g) => g.elemente.length);
  }, [katalog, ctx, suche]);

  // ---------- Darstellung ----------

  const seitenleiste = (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex gap-1 p-2 border-b border-brand-dark/10">
        <Knopf aktiv={reiter === 'bausteine'} onClick={() => setReiter('bausteine')} className="flex-1 justify-center">Bausteine</Knopf>
        <Knopf aktiv={reiter === 'einzelteile'} onClick={() => setReiter('einzelteile')} className="flex-1 justify-center">Einzelteile</Knopf>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {reiter === 'bausteine' ? (
          <>
            <p className="text-xs text-brand-muted px-1 pb-1">Fertige Kombinationen aus dem A+-Katalog. Klicken oder auf die Fläche ziehen.</p>
            <div className="p-3 rounded-lg bg-white border border-brand-dark/10">
              <span className="block font-heading font-bold uppercase text-sm text-brand-dark">Bowl nach Maß</span>
              <span className="block text-xs text-brand-muted mb-2">Gerade Wände je Seite, Ecken rund aus Corners</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <label>Höhe<select className={`${eingabe} !px-1.5 !py-1`} value={bowlMass.h} onChange={(e) => setBowlMass({ ...bowlMass, h: Number(e.target.value) as 98 | 150 })}><option value={98}>98</option><option value={150}>150</option></select></label>
                <label>Länge<input type="number" min={0} max={10} className={`${eingabe} !px-1.5 !py-1`} value={bowlMass.l} onChange={(e) => setBowlMass({ ...bowlMass, l: Math.max(0, Math.min(10, Number(e.target.value))) })} /></label>
                <label>Breite<input type="number" min={0} max={10} className={`${eingabe} !px-1.5 !py-1`} value={bowlMass.b} onChange={(e) => setBowlMass({ ...bowlMass, b: Math.max(0, Math.min(10, Number(e.target.value))) })} /></label>
              </div>
              <button type="button" onClick={() => { if (!ctx) return; const g = bowl(bowlMass.h, bowlMass.l, bowlMass.b, ctx); if (g) { teileHinzufuegen(g, 'Bowl gesetzt.'); setPanel(null); } }} className="mt-2 w-full py-1.5 rounded-lg bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange">Bowl setzen</button>
            </div>
            {BAUSTEINE.map((b) => (
              <button
                key={b.id}
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', `baustein:${b.id}`)}
                onClick={() => { const g = bausteinTeile(b.id); if (g) { teileHinzufuegen(g, `${b.name} gesetzt.`); setPanel(null); } }}
                className="w-full text-left p-3 rounded-lg bg-white border border-brand-dark/10 hover:border-brand-orange transition-colors"
              >
                <span className="block font-heading font-bold uppercase text-sm text-brand-dark">{b.name}</span>
                <span className="block text-xs text-brand-muted">{b.text}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <input value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Suchen, z. B. Bank 60" className={eingabe} />
            {einzelteile.map((g) => (
              <div key={g.gruppe}>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-brand-muted mt-3 mb-1 px-1">{g.gruppe}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {g.elemente.map((e) => (
                    <button
                      key={e.slug}
                      type="button"
                      draggable
                      onDragStart={(ev) => ev.dataTransfer.setData('text/plain', `teil:${e.slug}`)}
                      onClick={() => { teileHinzufuegen([einzelTeil(e.slug)]); setPanel(null); }}
                      className="text-left p-2 rounded-lg bg-white border border-brand-dark/10 hover:border-brand-orange transition-colors"
                      title={e.name}
                    >
                      <img src={e.bild} alt="" loading="lazy" className="w-full aspect-[4/3] object-contain" />
                      <span className="block text-[11px] font-semibold text-brand-dark leading-tight mt-1">{e.name}</span>
                      <span className="block text-[10px] font-mono text-brand-muted">{e.preisliste_code || e.kuerzel}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="p-3 border-t border-brand-dark/10 text-xs text-brand-muted">
        Alle Elemente mit Maßen im <Link to="/katalog" className="text-brand-orange underline">Katalog</Link>.
      </div>
    </div>
  );

  const liste = (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-brand-dark/10">
        <h2 className="font-heading font-extrabold uppercase text-brand-dark">Stückliste</h2>
        <p className="text-xs text-brand-muted">{park?.teile.length ?? 0} Elemente · Fläche {m(park?.flaeche.l ?? 0)} × {m(park?.flaeche.b ?? 0)} m</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs">
          <tbody>
            {zeilen.map((z) => (
              <tr key={z.code + z.name} className="border-b border-brand-dark/5">
                <td className="py-1.5 pl-4 pr-1 font-mono text-brand-muted whitespace-nowrap">{z.code}</td>
                <td className="py-1.5 px-1 text-brand-dark">{z.name}{z.auto && <span className="ml-1 text-[10px] text-brand-orange" title="Automatisch ergänzt">auto</span>}</td>
                <td className="py-1.5 pl-1 pr-4 text-right font-semibold">{z.menge}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!zeilen.length && <p className="p-4 text-sm text-brand-muted">Noch leer. Wählen Sie links einen Baustein.</p>}
      </div>
      <div className="p-4 border-t border-brand-dark/10 space-y-2 text-sm">
        {gewicht > 0 && <div className="flex justify-between text-brand-muted"><span>Gewicht ca.</span><span>{(gewicht / 1000).toLocaleString('de-DE', { maximumFractionDigits: 1 })} t</span></div>}
        <p className="text-[11px] text-brand-muted leading-snug">Preise erhalten Sie mit dem Angebot, inklusive Fracht und Montage. Bauseitige Leistungen (Fläche, Gullys, Fundamente) sind nicht Teil der Lieferung.</p>
        <button type="button" disabled={!park?.teile.length} onClick={() => setAnfrage(true)} className="w-full py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-dark transition-colors disabled:opacity-40">
          Angebot anfragen
        </button>
        <button type="button" disabled={!zeilen.length} onClick={csvLaden} className="w-full text-xs text-brand-muted hover:text-brand-dark disabled:opacity-40">Stückliste als CSV</button>
      </div>
    </div>
  );

  return (
    <PageShell title="Skatepark-Konfigurator" description="Skatepark aus modularen Betonelementen in 3D planen: Vorlage wählen, Elemente andocken, Stückliste und Angebot anfragen." fullWidth>
      {/* Feste Arbeitsfläche unter dem Seitenkopf: die Seite selbst scrollt nicht, Ziehen und Zoomen bleiben in der Bühne */}
      <div className="fixed inset-x-0 bottom-0 top-14 md:top-20 z-40 flex bg-brand-surface overflow-hidden">
        <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-brand-bg border-r border-brand-dark/10">{seitenleiste}</aside>

        <section className="relative flex-1 min-w-0" onDragOver={(e) => e.preventDefault()} onDrop={fallenLassen}>
          {ctx && park && dargestellt && ab && (
            <OhneDreiD ersatz={
              <div className="absolute inset-0 overflow-auto p-6 pt-36">
                <p className="mb-3 text-sm text-brand-muted">Die 3D-Ansicht läuft auf diesem Gerät nicht. Planen, Stückliste, PDF und Anfrage funktionieren trotzdem.</p>
                <Plan park={park} ctx={ctx} zusatz={[...ab.gelaender, ...ab.keile]} bemassung={false} />
              </div>
            }>
            <Buehne
              ctx={ctx}
              park={dargestellt}
              zusatz={[...ab.gelaender, ...ab.keile]}
              auswahl={auswahl}
              markierung={markierung}
              ansicht={ansicht}
              rundflug={rundflug}
              modellPfad={modellPfad}
              onAuswahl={(id) => { setAuswahl(id); if (!id) setVorschlag(null); }}
              onZiehen={ziehenUpdate}
              onAblegen={ablegen}
              onBereit={(a) => { api.current = a; }}
            />
            </OhneDreiD>
          )}
          {!ctx && <div className="absolute inset-0 flex items-center justify-center text-brand-muted">Lade Elemente …</div>}

          {/* Werkzeugleiste */}
          {park && (
            <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start gap-2 pointer-events-none">
              <div className="flex flex-wrap gap-2 pointer-events-auto">
                <Knopf icon="dashboard_customize" onClick={() => setStart(true)}><span className="hidden md:inline">Vorlage</span></Knopf>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/80 border border-brand-dark/10 text-sm">
                  <span className="material-symbols-outlined text-[18px] text-brand-muted">square_foot</span>
                  <input aria-label="Länge in Metern" type="number" step={RASTER} min={5} max={120} value={park.flaeche.l} onChange={(e) => flaecheSetzen(Number(e.target.value), park.flaeche.b)} className="w-12 md:w-16 bg-transparent text-right font-semibold focus:outline-none" />
                  <span>×</span>
                  <input aria-label="Breite in Metern" type="number" step={RASTER} min={5} max={120} value={park.flaeche.b} onChange={(e) => flaecheSetzen(park.flaeche.l, Number(e.target.value))} className="w-12 md:w-16 bg-transparent text-right font-semibold focus:outline-none" />
                  <span className="text-brand-muted">m</span>
                </div>
                <Knopf icon={park.flaeche.angeboescht ? 'landscape' : 'view_in_ar'} onClick={() => flaecheSetzen(park.flaeche.l, park.flaeche.b, !park.flaeche.angeboescht)} title="Freistehend: Geländer an hohen Podesten. Angeböscht: Böschung statt Geländer.">
                  <span className="hidden md:inline">{park.flaeche.angeboescht ? 'Angeböscht' : 'Freistehend'}</span>
                </Knopf>
                <Knopf icon="auto_awesome_mosaic" onClick={neuAnordnen} disabled={!park.teile.length} title="Gruppen nach dem Muster der A+-Beispielparks verteilen"><span className="hidden md:inline">Anordnen</span></Knopf>
              </div>
              <div className="flex flex-wrap gap-2 pointer-events-auto md:ml-auto">
                <Knopf icon="undo" onClick={rueckgaengig} disabled={!verlauf.zurueck.length} title="Rückgängig (Cmd/Strg + Z)" />
                <Knopf icon="redo" onClick={wiederholen} disabled={!verlauf.vor.length} title="Wiederholen" />
                <Knopf icon="view_in_ar" aktiv={ansicht === '3d'} onClick={() => setAnsicht('3d')}><span className="hidden md:inline">3D</span></Knopf>
                <Knopf icon="grid_view" aktiv={ansicht === 'oben'} onClick={() => { setAnsicht('oben'); setRundflug(false); }}><span className="hidden md:inline">Plan</span></Knopf>
                <Knopf icon="360" aktiv={rundflug} onClick={() => { setAnsicht('3d'); setRundflug(!rundflug); }} title="Rundflug" />
                <Knopf icon="print" onClick={() => setDruckDialog(true)} disabled={!park.teile.length} title="Drucken oder als PDF sichern"><span className="hidden md:inline">PDF</span></Knopf>
                <Knopf icon="share" onClick={teilen}><span className="hidden md:inline">Teilen</span></Knopf>
              </div>
              {hinweise.length > 0 && (
                <div className="basis-full pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    {hinweise.length} {hinweise.length === 1 ? 'Hinweis' : 'Hinweise'}
                    {hinweise.some((h) => h.fix) && <button type="button" onClick={allesLoesen} className="font-semibold underline underline-offset-2">Alles beheben</button>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auswahl */}
          {ausgewaehlt && ctx && !ziehen && (
            <div className="absolute bottom-16 lg:bottom-3 left-3 right-3 md:right-auto md:max-w-md pointer-events-auto">
              <div className="bg-brand-bg/95 backdrop-blur rounded-xl border border-brand-dark/10 shadow-lg p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-heading font-bold uppercase text-sm text-brand-dark truncate">{ctx.info[ausgewaehlt.slug]?.name}</p>
                    <p className="font-mono text-[11px] text-brand-muted">{ctx.info[ausgewaehlt.slug]?.code}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Knopf icon="rotate_right" onClick={() => drehen(90)} title="Gruppe drehen 90° (R), mit Alt nur dieses Element, mit Umschalt 15°" />
                    <Knopf icon="content_copy" onClick={duplizieren} title="Duplizieren (Cmd/Strg + D)" />
                    <Knopf icon="delete" onClick={loeschen} title="Löschen (Entf)" />
                    <Link to={`/katalog/${ausgewaehlt.slug}`} target="_blank" className="inline-flex items-center px-2 rounded-lg bg-white/80 border border-brand-dark/10 text-brand-dark hover:bg-white" title="Im Katalog ansehen">
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </Link>
                  </div>
                </div>
                {(anbau.gerade.length > 0 || anbau.kurve.length > 0) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {anbau.kurve.includes('links') && <Knopf icon="turn_left" onClick={() => anbauen('kurve', 'links')}>Kurve links</Knopf>}
                    {anbau.gerade.includes('links') && <Knopf icon="west" onClick={() => anbauen('gerade', 'links')}>Gerade</Knopf>}
                    {anbau.gerade.includes('rechts') && <Knopf icon="east" onClick={() => anbauen('gerade', 'rechts')}>Gerade</Knopf>}
                    {anbau.kurve.includes('rechts') && <Knopf icon="turn_right" onClick={() => anbauen('kurve', 'rechts')}>Kurve rechts</Knopf>}
                  </div>
                )}
                {gelModus && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-brand-muted">Geländer</span>
                    <div className="inline-flex rounded-lg border border-brand-dark/10 overflow-hidden" role="group" aria-label="Geländer für diese Gruppe">
                      {([['auto', 'Automatisch'], ['an', 'An'], ['aus', 'Aus']] as [GelaenderModus, string][]).map(([m, t]) => (
                        <button key={m} type="button" onClick={() => gelSetzen(m)} aria-pressed={gelModus === m} className={`px-2.5 py-1 font-semibold ${gelModus === m ? 'bg-brand-dark text-white' : 'bg-white/80 text-brand-dark hover:bg-white'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="mt-2 text-[11px] text-brand-muted">Ziehen und R wirken auf die ganze Gruppe, mit gedrückter Alt-Taste nur auf dieses Element. Entf löscht.</p>
                {auswahlHinweise.map((h) => (
                  <div key={h.id} className={`mt-2 flex items-center justify-between gap-2 text-xs rounded-lg px-2.5 py-2 ${h.stufe === 'rot' ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-900'}`}>
                    <span>{h.text}</span>
                    {h.fix && <button type="button" onClick={() => hinweisBeheben(h)} className="font-semibold underline whitespace-nowrap">Beheben</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vorschlag: immer nur einer */}
          {vorschlag && !ziehen && (
            <div className="absolute bottom-40 lg:bottom-3 left-1/2 -translate-x-1/2 w-[min(92%,30rem)] lg:left-auto lg:right-3 lg:translate-x-0 pointer-events-auto">
              <div className="bg-brand-dark text-white rounded-xl shadow-xl p-4">
                <p className="text-sm mb-3"><span className="material-symbols-outlined text-[18px] align-[-4px] mr-1 text-[#9fc27a]">lightbulb</span>{vorschlag.text}</p>
                <div className="flex flex-wrap gap-2">
                  {vorschlag.optionen.map((o) => (
                    <button key={o.label} type="button" onClick={() => { if (park) { aendern(o.anwenden(park)); setVorschlag(null); } }} className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-sm font-semibold hover:bg-white hover:text-brand-dark">
                      {o.label}
                    </button>
                  ))}
                  <button type="button" onClick={() => { abgelehnt.current.add(vorschlag.teil); setVorschlag(null); }} className="px-3 py-1.5 text-sm text-white/70 hover:text-white">Nein danke</button>
                </div>
              </div>
            </div>
          )}

          {meldung && (
            <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-lg bg-brand-dark text-white text-sm shadow-lg pointer-events-none">{meldung}</div>
          )}

          {/* Handy und Tablet: Leisten als Schubladen */}
          {park && (
            <div className="lg:hidden absolute bottom-3 right-3 flex gap-2 pointer-events-auto">
              <Knopf icon="add" onClick={() => setPanel(panel === 'katalog' ? null : 'katalog')} aktiv={panel === 'katalog'}>Elemente</Knopf>
              <Knopf icon="list_alt" onClick={() => setPanel(panel === 'liste' ? null : 'liste')} aktiv={panel === 'liste'}>Liste</Knopf>
            </div>
          )}
          {panel && (
            <div className="lg:hidden absolute inset-x-0 bottom-0 h-[62%] z-20 bg-brand-bg rounded-t-2xl shadow-2xl border-t border-brand-dark/10 flex flex-col">
              <button type="button" onClick={() => setPanel(null)} className="mx-auto my-2 w-12 h-1.5 rounded-full bg-brand-dark/20" aria-label="Schließen" />
              <div className="flex-1 min-h-0">{panel === 'katalog' ? seitenleiste : liste}</div>
            </div>
          )}

        </section>

        <aside className="hidden lg:flex w-80 shrink-0 flex-col bg-brand-bg border-l border-brand-dark/10">{liste}</aside>
        {(start || (ctx && !park)) && <Start onWahl={vorlageWaehlen} onSchliessen={park ? () => setStart(false) : undefined} />}
      </div>
      <DruckDialog offen={druckDialog} onClose={() => setDruckDialog(false)} onDrucken={drucken} />
      {druck && ctx && park && ab && (
        <Druck park={park} ctx={ctx} zusatz={[...ab.gelaender, ...ab.keile]} zeilen={zeilen} hinweise={hinweise.map((h) => h.text)} optionen={druck.optionen} bild3d={druck.bild} link={link} />
      )}
      <AnfrageDialog offen={anfrage} onClose={() => setAnfrage(false)} senden={senden} offeneHinweise={hinweise.length} csvLaden={csvLaden} link={link} />
    </PageShell>
  );
};

export default KonfiguratorPage;
