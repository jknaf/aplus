import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, LOCALE, localizePath, tt, useLang, useT } from '../i18n';
import PageShell from '../components/PageShell';
import Buehne, { type BuehnenApi } from '../components/konfigurator/Buehne';
import QRCode from 'qrcode';
import Druck, { Plan, type DruckOptionen } from '../components/konfigurator/Druck';
import { ladeNetz, type Netz } from '../components/konfigurator/plan2d';
import { PARK_SPEICHER, leeren, warteschlange } from '../components/konfigurator/merkliste';
import { konfiguratorFrei, useKonfiguratorFrei } from '../components/katalog/usePreise';
import CodeDialog, { useKonfiguratorCode } from '../components/katalog/CodeDialog';
import { gruppenName, teilName } from '../localized';
import {
  BAUSTEINE, LEER, RASTER, gruppen, gruppeVerschieben, anbauMoeglich, bowl, drehenGruppe, geradeAnhaengen, kurveAnhaengen, gelaenderModus, gelaenderSetzen, type GelaenderModus, type Richtung, VORLAGEN, abgeleitet, allesBeheben, anordnen, beheben, csv, dekodieren, einrasten,
  hinzufuegen, kodieren, kollidiert, neueId, pruefen, stueckliste, vorlageBauen, vorschlag as vorschlagFuer, waehlbar,
  type Ctx, type Hinweis, type Park, type Teil, type Vorschlag, ueberText,
} from '../components/konfigurator/logik';

// Konzept: 08_CAD_Blender/12_Konfigurator/…_Konfigurator_Konzept_V01.md, Regeln: …_Regelwerk_V01.md

interface KatalogElement { slug: string; name: string; gruppe: string; kuerzel: string; preisliste_code: string; preisliste_masse_cm?: string; modell: string; bild: string; gewicht: { kg: number } | null }
interface Katalog { gruppen: string[]; elemente: KatalogElement[] }

const m = (x: number, loc: string) => x.toLocaleString(loc, { maximumFractionDigits: 2 });
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

// Fällt die 3D-Bühne aus, nicht die ganze Seite verlieren: dann den Plan zeigen
const webglDa = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } };
class OhneDreiD extends React.Component<{ ersatz: (grund: 'gerät' | 'fehler', neu: () => void) => React.ReactNode; children: React.ReactNode }, { fehler: boolean }> {
  state = { fehler: false };
  static getDerivedStateFromError() { return { fehler: true }; }
  componentDidCatch(e: unknown) { console.error('[konfigurator] 3D-Bühne', e); }
  render() { return this.state.fehler ? this.props.ersatz(webglDa() ? 'fehler' : 'gerät', () => this.setState({ fehler: false })) : this.props.children; }
}

// Werkzeugleiste: zusammengehörige Knöpfe als Gruppe, kompakt, Beschriftung erst bei genug Platz
const Gruppe: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-stretch h-9 rounded-lg bg-white/90 border border-brand-dark/10 shadow-sm divide-x divide-brand-dark/10 overflow-hidden">{children}</div>
);
const LKnopf: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: string; aktiv?: boolean; label?: string; labelAb?: string }> = ({ icon, aktiv, label, labelAb = 'lg:inline', title, ...rest }) => (
  <button
    type="button"
    title={title ?? label}
    aria-label={title ?? label}
    {...rest}
    className={`inline-flex items-center gap-1 px-2.5 text-[13px] font-semibold transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${aktiv ? 'bg-brand-dark text-white' : 'text-brand-dark hover:bg-white'}`}
  >
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
    {label && <span className={`hidden ${labelAb}`}>{label}</span>}
  </button>
);
const ohnePfeile = '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

// ---------- Start: Vorlage wählen ----------

const Start: React.FC<{ onWahl: (id: string) => void; onSchliessen?: () => void }> = ({ onWahl, onSchliessen }) => {
  const t = useT();
  const lang = useLang();
  return (
  <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
    <div className="w-full max-w-4xl bg-brand-bg rounded-2xl shadow-2xl p-6 md:p-10 max-h-full overflow-y-auto">
      <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[0.95] mb-3">{t(<>Skatepark <span className="text-brand-orange">planen</span></>, <>Plan your <span className="text-brand-orange">skatepark</span></>, <>Planifiez votre <span className="text-brand-orange">skatepark</span></>)}</h1>
      <p className="text-brand-muted mb-8 max-w-2xl">{t("Starten Sie mit einer Vorlage und passen Sie sie an. Elemente docken passend an, Geländer und Pflichtteile ergänzt der Konfigurator selbst.", "Start with a template and adapt it. Elements dock together neatly; the planner adds railings and mandatory parts itself.", "Commencez avec un modèle et adaptez-le. Les éléments s'emboîtent automatiquement ; le configurateur ajoute lui-même les garde-corps et les pièces obligatoires.")}</p>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {VORLAGEN.map((v) => (
          <button key={v.id} type="button" onClick={() => onWahl(v.id)} className="text-left p-5 rounded-xl bg-white border border-brand-dark/10 hover:border-brand-orange hover:shadow-lg transition-all group">
            <span className="block font-heading font-extrabold uppercase text-brand-dark text-lg group-hover:text-brand-orange">{ueberText(v.name, lang)}</span>
            <span className="block text-sm text-brand-muted mt-2">{ueberText(v.text, lang)}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Knopf icon="crop_free" onClick={() => onWahl('leer')}>{t("Leere Fläche", "Empty area", "Surface vide")}</Knopf>
        {onSchliessen && <button type="button" onClick={onSchliessen} className="text-sm text-brand-muted hover:text-brand-dark">{t("Abbrechen", "Cancel", "Annuler")}</button>}
      </div>
    </div>
  </div>
  );
};

// ---------- Anfrage ----------

const Feld: React.FC<{ label: string; pflicht?: boolean; children: React.ReactNode }> = ({ label, pflicht, children }) => (
  <label className="block">
    <span className="block font-mono text-[11px] uppercase tracking-widest text-brand-muted mb-1">{label}{pflicht && ' *'}</span>
    {children}
  </label>
);
const eingabe = 'w-full px-3 py-2.5 rounded-lg border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-orange text-sm';

const AnfrageDialog: React.FC<{ offen: boolean; onClose: () => void; mailto: string; link: string }> = ({ offen, onClose, mailto, link }) => {
  const t = useT();
  const [kopiert, setKopiert] = useState(false);
  if (!offen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-brand-bg rounded-2xl shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl font-extrabold font-heading uppercase text-brand-dark mb-2">{t("Angebot anfragen", "Request a quote", "Demander un devis")}</h2>
        <p className="text-sm text-brand-muted mb-6">
          {t("Ihr E-Mail-Programm öffnet sich mit einer fertigen Nachricht an A+ Urban Design. Darin stehen der Link zu Ihrer Planung und die Stückliste. Ergänzen Sie Ort und Kontaktdaten und senden Sie die Mail ab. Unverbindlich.", "Your email program opens with a ready-made message to A+ Urban Design. It contains the link to your plan and the parts list. Add the location and your contact details and send the email. Non-binding.", "Votre messagerie s'ouvre avec un message prêt à l'envoi adressé à A+ Urban Design. Il contient le lien vers votre plan et la liste des pièces. Complétez le lieu et vos coordonnées, puis envoyez l'e-mail. Sans engagement.")}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href={mailto} onClick={() => window.setTimeout(onClose, 300)} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-dark transition-colors">
            <span className="material-symbols-outlined text-lg">mail</span>{t("E-Mail öffnen", "Open email", "Ouvrir la messagerie")}
          </a>
          <button type="button" onClick={onClose} className="text-sm text-brand-muted hover:text-brand-dark">{t("Abbrechen", "Cancel", "Annuler")}</button>
        </div>
        <p className="mt-6 text-xs text-brand-muted">
          {t("Kein E-Mail-Programm? Schreiben Sie an", "No email program? Write to", "Pas de messagerie ? Écrivez à")} <a href="mailto:post@aplusurbandesign.com" className="underline">post@aplusurbandesign.com</a> {t("und fügen Sie den", "and paste the", "et collez-y le")}{' '}
          <button type="button" className="underline" onClick={() => navigator.clipboard?.writeText(link).then(() => setKopiert(true))}>{t("Link zu Ihrer Planung", "link to your plan", "lien vers votre plan")}</button> {t("ein.", "into it.", ".")}{kopiert && t(' Link kopiert.', ' Link copied.', ' Lien copié.')}
        </p>
      </div>
    </div>,
    document.body,
  );
};

// ---------- Drucken ----------

const DruckDialog: React.FC<{ offen: boolean; onClose: () => void; onDrucken: (o: DruckOptionen) => void }> = ({ offen, onClose, onDrucken }) => {
  const t = useT();
  const [o, setO] = useState<DruckOptionen>({ titel: '', ansicht3d: true, plan: true, liste: true });
  if (!offen) return null;
  const haken = (f: 'ansicht3d' | 'plan' | 'liste', text: string) => (
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={o[f]} onChange={(e) => setO({ ...o, [f]: e.target.checked })} />{text}</label>
  );
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onDrucken(o); }} className="w-full max-w-md bg-brand-bg rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-extrabold font-heading uppercase text-brand-dark mb-1">{t("Planung als PDF speichern", "Save plan as PDF", "Enregistrer le plan en PDF")}</h2>
        <p className="text-sm text-brand-muted mb-5">{t("Sie erhalten ein PDF mit 3D-Ansicht, Bauplan mit Maßen und Stückliste. Im nächsten Fenster wählen Sie „Als PDF sichern“.", "You receive a PDF with a 3D view, a site plan with dimensions and the parts list. In the next window, choose “Save as PDF”.", "Vous obtenez un PDF avec vue 3D, plan coté et liste des pièces. Dans la fenêtre suivante, choisissez « Enregistrer au format PDF ».")}</p>
        <Feld label={t("Name Ihres Projekts", "Name of your project", "Nom de votre projet")}><input className={eingabe} value={o.titel} maxLength={60} onChange={(e) => setO({ ...o, titel: e.target.value })} placeholder={t("z. B. Skatepark Musterstadt", "e.g. Exampletown skatepark", "par ex. Skatepark de Villeexemple")} /></Feld>
        <div className="mt-4 space-y-2">
          {haken('ansicht3d', t("3D-Ansicht", "3D view", "Vue 3D"))}
          {haken('plan', t("Bauplan mit Maßen", "Site plan with dimensions", "Plan coté"))}
          {haken('liste', t("Stückliste", "Parts list", "Liste des pièces"))}
        </div>
        <div className="mt-6 flex gap-4 items-center">
          <button type="submit" disabled={!(o.ansicht3d || o.plan || o.liste)} className="px-5 py-2.5 rounded-lg bg-brand-orange text-white font-bold uppercase text-sm hover:bg-brand-dark disabled:opacity-40">{t("PDF erstellen", "Create PDF", "Créer le PDF")}</button>
          <button type="button" onClick={onClose} className="text-sm text-brand-muted">{t("Abbrechen", "Cancel", "Annuler")}</button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

// ---------- Seite ----------

const KonfiguratorPage: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const loc = LOCALE[lang];
  const konfigCode = useKonfiguratorCode();
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
  const [druck, setDruck] = useState<{ optionen: DruckOptionen; bild: string; netze: Record<string, Netz>; qr: string } | null>(null);
  const [panel, setPanel] = useState<'katalog' | 'liste' | null>(null);
  // Stückliste am Desktop ein- und ausblenden; die Wahl merkt sich der Browser
  const [listeOffen, setListeOffen] = useState(() => { try { return localStorage.getItem('aplus-konfigurator-liste') !== 'zu'; } catch { return true; } });
  const listeUmschalten = () => setListeOffen((o) => { try { localStorage.setItem('aplus-konfigurator-liste', o ? 'zu' : 'offen'); } catch { /* ohne Speicher nur für diese Sitzung */ } return !o; });
  const api = useRef<BuehnenApi | null>(null);
  // Ohne Freischaltung: Vorlage wählen, ansehen, Plan und Stückliste; jede Bearbeitung öffnet den Code-Dialog
  const { frei, freischalten } = useKonfiguratorFrei();
  const [sperre, setSperre] = useState(false);
  const gesperrt = useCallback(() => { if (frei) return false; setSperre(true); return true; }, [frei]);

  const melden = useCallback((text: string) => { setMeldung(text); window.setTimeout(() => setMeldung((x) => (x === text ? null : x)), 3500); }, []);

  // Daten laden: Katalog und die aus den Modellen berechneten Maße
  useEffect(() => {
    Promise.all([fetch('/katalog/katalog.json').then((r) => r.json()), fetch('/konfigurator/masse.json').then((r) => r.json())]).then(([k, masse]: [Katalog, Ctx['masse']]) => {
      const info: Ctx['info'] = {};
      for (const e of k.elemente) info[e.slug] = { name: teilName(e.name, lang), code: e.preisliste_code || e.kuerzel, gruppe: e.gruppe, kg: e.gewicht?.kg, masse: e.preisliste_masse_cm };
      const c = { masse, info };
      setKatalog(k);
      setCtx(c);
      const ausLink = window.location.hash.startsWith('#p=') ? dekodieren(window.location.hash.slice(3), c) : null;
      let gespeichert: Park | null = null;
      try { const s = localStorage.getItem(PARK_SPEICHER); gespeichert = s ? dekodieren(s, c) : null; } catch { gespeichert = null; }
      let p = ausLink ?? gespeichert;
      const neu = konfiguratorFrei() ? warteschlange().filter((s) => c.masse[s]) : [];
      if (neu.length) {
        p = p ?? LEER;
        for (const s of neu) p = hinzufuegen(p, [{ id: neueId(), slug: s, x: 0, z: 0, rot: 0 }], c);
        leeren();
        melden(`${neu.length} ${neu.length === 1 ? tt('Element', 'element', 'élément') : tt('Elemente', 'elements', 'éléments')} ${tt('aus dem Katalog übernommen.', 'taken over from the catalogue.', 'repris du catalogue.')}`);
      }
      if (p) setPark(p); else setStart(true);
    });
  }, [melden, lang]);

  // Speichern im Browser, damit der Park beim Wechsel zum Katalog erhalten bleibt
  useEffect(() => {
    if (!park) return;
    try { localStorage.setItem(PARK_SPEICHER, kodieren(park)); } catch { /* ohne Speicher bleibt der Park nur bis zum Neuladen */ }
  }, [park]);

  const aendern = useCallback((neu: Park, vorher?: Park) => {
    if (gesperrt()) return;
    setVerlauf((v) => ({ zurueck: [...v.zurueck.slice(-49), vorher ?? park!], vor: [] }));
    setPark(neu);
  }, [park, gesperrt]);

  const zeigeVorschlag = useCallback((id: string, p: Park) => {
    if (!ctx || abgelehnt.current.has(id)) { setVorschlag(null); return; }
    setVorschlag(vorschlagFuer(id, p, ctx));
  }, [ctx]);

  const mitZug = (p: Park, z: Zug): Park => { const neu = new Map(z.teile.map((t) => [t.id, t])); return { ...p, teile: p.teile.map((t) => neu.get(t.id) ?? t) }; };
  const dargestellt = useMemo(() => (park && ziehen ? mitZug(park, ziehen) : park), [park, ziehen]);
  const ab = useMemo(() => (ctx && dargestellt ? abgeleitet(dargestellt, ctx) : null), [ctx, dargestellt]);
  const hinweise = useMemo(() => (ctx && park ? pruefen(park, ctx) : []), [ctx, park, lang]);
  const markierung = useMemo(() => {
    const out: Record<string, 'rot' | 'gelb'> = {};
    for (const h of hinweise) for (const id of h.teile.slice(0, 1)) if (out[id] !== 'rot') out[id] = h.stufe;
    if (ctx && ziehen && dargestellt) for (const t of ziehen.teile) if (kollidiert(t, dargestellt, ctx)) out[t.id] = 'rot';
    return out;
  }, [hinweise, ziehen, ctx, dargestellt]);
  const zeilen = useMemo(() => (ctx && park ? stueckliste(park, ctx) : []), [ctx, park, lang]);
  const gewicht = zeilen.reduce((s, z) => s + (z.kg ?? 0), 0);
  const link = park ? `${window.location.origin}${localizePath(lang, '/konfigurator')}#p=${kodieren(park)}` : '';

  // ---------- Aktionen ----------

  const vorlageWaehlen = (id: string) => {
    if (!ctx) return;
    const v = VORLAGEN.find((x) => x.id === id);
    const neu = v ? vorlageBauen(v, ctx) : LEER;
    if (park && frei) aendern(neu); else setPark(neu);
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
      if ([...gedreht.values()].some((x) => kollidiert(x, neu, ctx))) { melden(tt('Zum Drehen ist hier kein Platz.', 'There is no room to rotate here.', "Il n'y a pas la place de pivoter ici.")); return; }
    } else {
      const roh = { ...t, rot: (((t.rot + grad) % 360) + 360) % 360 };
      const r = Math.abs(grad) === 90 ? einrasten(roh, park, ctx).teil : roh;
      neu = { ...park, teile: park.teile.map((x) => (x.id === t.id ? r : x)) };
      if (kollidiert(r, neu, ctx)) { melden(tt('Zum Drehen ist hier kein Platz.', 'There is no room to rotate here.', "Il n'y a pas la place de pivoter ici.")); return; }
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
    if (!ctx || !park || gesperrt()) return;
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
  }, [ctx, park, gesperrt]);
  const ablegen = useCallback(() => {
    const z = ziehenAktuell.current;
    ziehenAktuell.current = null;
    setZiehen(null);
    if (!ctx || !park || !z) return;
    const neu = mitZug(park, z);
    if (z.teile.some((t) => kollidiert(t, neu, ctx))) { melden(tt('Hier ist kein Platz. Es bleibt, wo es war.', 'There is no room here. It stays where it was.', "Il n'y a pas de place ici. L'élément reste où il était.")); return; }
    aendern(neu);
    const t = z.teile.find((x) => x.id === z.id)!;
    if (z.getauscht) melden(tt(`Höhe angepasst: ${ctx.info[t.slug]?.name ?? t.slug} passt zum Nachbarn.`, `Height adjusted: ${ctx.info[t.slug]?.name ?? t.slug} now matches its neighbour.`, `Hauteur ajustée : ${ctx.info[t.slug]?.name ?? t.slug} correspond maintenant à son voisin.`));
    if (z.teile.length === 1) zeigeVorschlag(t.id, neu);
  }, [ctx, park, aendern, melden, zeigeVorschlag]);

  const anbau = useMemo(() => (ctx && park && auswahl ? anbauMoeglich(auswahl, park, ctx) : { kurve: [], gerade: [] }), [ctx, park, auswahl]);
  const anbauen = (art: 'kurve' | 'gerade', r: Richtung) => {
    if (!ctx || !park || !auswahl) return;
    const neu = art === 'kurve' ? kurveAnhaengen(auswahl, r, park, ctx) : geradeAnhaengen(auswahl, r, park, ctx);
    if (!neu) { melden(tt('Dafür ist hier kein Platz.', 'There is no room for that here.', "Il n'y a pas de place pour cela ici.")); return; }
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
    if (neu) aendern(neu); else melden(tt('Das lässt sich nicht automatisch lösen. Bitte von Hand verschieben.', 'This cannot be fixed automatically. Please move it by hand.', 'Impossible de corriger cela automatiquement. Veuillez le déplacer à la main.'));
  };
  const allesLoesen = () => {
    if (!ctx || !park) return;
    const neu = allesBeheben(park, ctx);
    const rest = pruefen(neu, ctx).length;
    aendern(neu);
    melden(rest ? tt(`${hinweise.length - rest} behoben, ${rest} bleiben offen.`, `${hinweise.length - rest} fixed, ${rest} remain open.`, `${hinweise.length - rest} corrigées, ${rest} restent ouvertes.`) : tt('Alles behoben.', 'All fixed.', 'Tout est corrigé.'));
  };
  const neuAnordnen = () => {
    if (!ctx || !park) return;
    aendern(anordnen(park, ctx, false));
    melden(tt('Neu angeordnet nach dem Muster der A+-Beispielparks.', 'Rearranged following the pattern of the A+ example parks.', 'Réorganisé selon le modèle des parcs exemples A+.'));
  };
  const flaecheSetzen = (l: number, b: number, angeboescht = park?.flaeche.angeboescht ?? false) => {
    if (!park) return;
    const runden = (x: number) => Math.min(120, Math.max(5, Math.round(x / RASTER) * RASTER));
    aendern({ ...park, flaeche: { l: runden(l), b: runden(b), angeboescht } });
  };
  const csvLaden = () => {
    if (gesperrt()) return;
    const blob = new Blob(['﻿' + csv(zeilen)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'A-Plus-Skatepark-Stueckliste.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const drucken = async (o: DruckOptionen) => {
    if (!park) return;
    let bild = '';
    try { bild = o.ansicht3d ? api.current?.foto() ?? '' : ''; } catch { bild = ''; }
    setDruckDialog(false);
    // Für den Bauplan die Modelle laden; fehlt eins, zeichnet der Plan dort nur den Umriss
    const netze: Record<string, Netz> = {};
    if (o.plan) {
      const slugs = [...new Set([...park.teile.map((t) => t.slug), ...(ab ? [...ab.gelaender, ...ab.keile].map((z) => z.slug) : [])])];
      await Promise.all(slugs.map((s) => ladeNetz(modellPfad(s)).then((n) => { netze[s] = n; }, () => undefined)));
    }
    const qr = o.liste ? await QRCode.toString(link, { type: 'svg', margin: 0, errorCorrectionLevel: 'L' }).catch(() => '') : '';
    setDruck({ optionen: o, bild, netze, qr });
    // erst rendern lassen, dann das Druckfenster öffnen; danach die Druckansicht wieder entfernen
    window.setTimeout(() => {
      const weg = () => { setDruck(null); window.removeEventListener('afterprint', weg); };
      window.addEventListener('afterprint', weg);
      window.print();
    }, 400);
  };
  const teilen = () => {
    if (gesperrt()) return;
    navigator.clipboard?.writeText(link).then(() => melden(tt('Link kopiert. Wer ihn öffnet, sieht genau diesen Park.', 'Link copied. Anyone who opens it sees exactly this park.', "Lien copié. Quiconque l'ouvre voit exactement ce parc.")), () => melden(link));
  };
  // ponytail: mailto statt Server-Versand; sehr große Parks können lange Links ergeben, die manche Mailprogramme kürzen
  const mailto = park ? `mailto:post@aplusurbandesign.com?subject=${encodeURIComponent(t('Angebotsanfrage Skatepark (Konfigurator)', 'Quote request: skatepark (planner)', 'Demande d\'offre : skatepark (planificateur)'))}&body=${encodeURIComponent([
    t('Guten Tag,', 'Hello,', 'Bonjour,'), '', t('ich bitte um ein Angebot für meinen Skatepark aus dem Konfigurator.', 'I would like to request a quote for my skatepark from the planner.', 'Je souhaiterais recevoir une offre pour mon skatepark créé avec le configurateur.'), '',
    t('Link zur Planung:', 'Link to the plan:', 'Lien vers le plan :'), link, '',
    `${t('Fläche', 'Area', 'Surface')}: ${park.flaeche.l.toLocaleString(loc)} × ${park.flaeche.b.toLocaleString(loc)} m, ${park.flaeche.angeboescht ? t('angeböscht', 'banked up', 'taluté') : t('freistehend', 'free-standing', 'autoportant')}`, '',
    t('Stückliste:', 'Parts list:', 'Liste des pièces :'), ...zeilen.map((z) => `${z.menge} × ${z.code} ${z.name}`), '',
    ...(hinweise.length ? [t('Offene Hinweise:', 'Open notes:', 'Remarques en suspens :'), ...hinweise.map((h) => `- ${h.text}`), ''] : []),
    t('Ort der Anlage:', 'Location of the park:', 'Lieu de l\'installation :'), t('Gewünschter Zeitraum:', 'Desired timeframe:', 'Période souhaitée :'), t('Name / Organisation:', 'Name / organisation:', 'Nom / organisation :'), t('Telefon:', 'Phone:', 'Téléphone :'), '', t('Vielen Dank.', 'Thank you.', 'Merci.'),
  ].join('\n'))}` : '';
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
      if (r.getauscht) melden(tt(`Höhe angepasst: ${ctx.info[r.teil.slug]?.name} passt zum Nachbarn.`, `Height adjusted: ${ctx.info[r.teil.slug]?.name} now matches its neighbour.`, `Hauteur ajustée : ${ctx.info[r.teil.slug]?.name} correspond maintenant à son voisin.`));
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

  // Eigener Modellsatz ohne eingebackenes Licht: Elemente werden hier gedreht und von der Bühne beleuchtet (Katalogmodelle tragen Licht und Schattenplatte fest)
  const modellPfad = useCallback((slug: string) => `/konfigurator/modelle/${slug}.gltf`, []);
  const ausgewaehlt = park?.teile.find((t) => t.id === auswahl);
  const auswahlHinweise = hinweise.filter((h) => auswahl && h.teile.includes(auswahl));
  const einzelteile = useMemo(() => {
    if (!katalog || !ctx) return [];
    const s = suche.trim().toLowerCase();
    return katalog.gruppen.map((g) => ({
      gruppe: g,
      elemente: katalog.elemente.filter((e) => e.gruppe === g && waehlbar(e.slug, ctx) && (!s || `${e.name} ${teilName(e.name, lang)} ${e.preisliste_code} ${e.kuerzel}`.toLowerCase().includes(s))),
    })).filter((g) => g.elemente.length);
  }, [katalog, ctx, suche]);

  // ---------- Darstellung ----------

  const seitenleiste = (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex gap-1 p-2 border-b border-brand-dark/10">
        <Knopf aktiv={reiter === 'bausteine'} onClick={() => setReiter('bausteine')} className="flex-1 justify-center">{t("Bausteine", "Building blocks", "Blocs")}</Knopf>
        <Knopf aktiv={reiter === 'einzelteile'} onClick={() => setReiter('einzelteile')} className="flex-1 justify-center">{t("Einzelteile", "Individual parts", "Éléments individuels")}</Knopf>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {reiter === 'bausteine' ? (
          <>
            <p className="text-xs text-brand-muted px-1 pb-1">{t("Fertige Kombinationen aus dem A+-Katalog. Klicken oder auf die Fläche ziehen.", "Ready-made combinations from the A+ catalogue. Click, or drag onto the area.", "Combinaisons toutes faites du catalogue A+. Cliquez ou faites glisser sur la surface.")}</p>
            <div className="p-3 rounded-lg bg-white border border-brand-dark/10">
              <span className="block font-heading font-bold uppercase text-sm text-brand-dark">{t("Bowl nach Maß", "Custom-size bowl", "Bowl sur mesure")}</span>
              <span className="block text-xs text-brand-muted mb-2">{t("Gerade Wände je Seite, Ecken rund aus Corners", "Straight walls on each side, rounded corners made of corner elements", "Parois droites de chaque côté, angles arrondis en éléments corner")}</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <label>{t("Höhe", "Height", "Hauteur")}<select className={`${eingabe} !px-1.5 !py-1`} value={bowlMass.h} onChange={(e) => setBowlMass({ ...bowlMass, h: Number(e.target.value) as 98 | 150 })}><option value={98}>98</option><option value={150}>150</option></select></label>
                <label>{t("Länge", "Length", "Longueur")}<input type="number" min={0} max={10} className={`${eingabe} !px-1.5 !py-1`} value={bowlMass.l} onChange={(e) => setBowlMass({ ...bowlMass, l: Math.max(0, Math.min(10, Number(e.target.value))) })} /></label>
                <label>{t("Breite", "Width", "Largeur")}<input type="number" min={0} max={10} className={`${eingabe} !px-1.5 !py-1`} value={bowlMass.b} onChange={(e) => setBowlMass({ ...bowlMass, b: Math.max(0, Math.min(10, Number(e.target.value))) })} /></label>
              </div>
              <button type="button" onClick={() => { if (!ctx) return; const g = bowl(bowlMass.h, bowlMass.l, bowlMass.b, ctx); if (g) { teileHinzufuegen(g, t("Bowl gesetzt.", "Bowl placed.", "Bowl posé.")); setPanel(null); } }} className="mt-2 w-full py-1.5 rounded-lg bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange">{t("Bowl setzen", "Place bowl", "Poser le bowl")}</button>
            </div>
            {BAUSTEINE.map((b) => (
              <button
                key={b.id}
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', `baustein:${b.id}`)}
                onClick={() => { const g = bausteinTeile(b.id); if (g) { teileHinzufuegen(g, tt(`${b.name} gesetzt.`, `${b.name} placed.`, `${b.name} posé.`)); setPanel(null); } }}
                className="w-full text-left p-3 rounded-lg bg-white border border-brand-dark/10 hover:border-brand-orange transition-colors"
              >
                <span className="block font-heading font-bold uppercase text-sm text-brand-dark">{ueberText(b.name, lang)}</span>
                <span className="block text-xs text-brand-muted">{ueberText(b.text, lang)}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <input value={suche} onChange={(e) => setSuche(e.target.value)} placeholder={t("Suchen, z. B. Bank 60", "Search, e.g. Bank 60", "Rechercher, par ex. Bank 60")} className={eingabe} />
            {einzelteile.map((g) => (
              <div key={g.gruppe}>
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-brand-muted mt-3 mb-1 px-1">{gruppenName(g.gruppe, lang)}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {g.elemente.map((e) => (
                    <button
                      key={e.slug}
                      type="button"
                      draggable
                      onDragStart={(ev) => ev.dataTransfer.setData('text/plain', `teil:${e.slug}`)}
                      onClick={() => { teileHinzufuegen([einzelTeil(e.slug)]); setPanel(null); }}
                      className="text-left p-2 rounded-lg bg-white border border-brand-dark/10 hover:border-brand-orange transition-colors"
                      title={teilName(e.name, lang)}
                    >
                      <img src={e.bild} alt="" loading="lazy" className="w-full aspect-[4/3] object-contain" />
                      <span className="block text-[11px] font-semibold text-brand-dark leading-tight mt-1">{teilName(e.name, lang)}</span>
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
        {t('Alle Elemente mit Maßen im', 'All elements with dimensions in the', 'Tous les éléments avec leurs cotes dans le')} <Link to="/katalog" className="text-brand-orange underline">{t('Katalog', 'catalogue', 'catalogue')}</Link>.
      </div>
    </div>
  );

  const liste = (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b border-brand-dark/10 relative">
        <button type="button" onClick={listeUmschalten} className="hidden lg:flex absolute top-3 right-3 w-8 h-8 items-center justify-center rounded-lg text-brand-muted hover:bg-white hover:text-brand-dark" title={t("Stückliste ausblenden", "Hide the parts list", "Masquer la liste des pièces")} aria-label={t("Stückliste ausblenden", "Hide the parts list", "Masquer la liste des pièces")}>
          <span className="material-symbols-outlined text-[20px]">right_panel_close</span>
        </button>
        <h2 className="font-heading font-extrabold uppercase text-brand-dark">{t("Stückliste", "Parts list", "Liste des pièces")}</h2>
        <p className="text-xs text-brand-muted">{park?.teile.length ?? 0} {t('Elemente', 'elements', 'éléments')} · {t('Fläche', 'Area', 'Surface')} {m(park?.flaeche.l ?? 0, loc)} × {m(park?.flaeche.b ?? 0, loc)} m</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs">
          <tbody>
            {zeilen.map((z) => (
              <tr key={z.code + z.name} className="border-b border-brand-dark/5">
                <td className="py-1.5 pl-4 pr-1 font-mono text-brand-muted whitespace-nowrap">{z.code}</td>
                <td className="py-1.5 px-1 text-brand-dark">{z.name}{z.auto && <span className="ml-1 text-[10px] text-brand-orange" title={t("Automatisch ergänzt", "Added automatically", "Ajouté automatiquement")}>auto</span>}</td>
                <td className="py-1.5 pl-1 pr-4 text-right font-semibold">{z.menge}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!zeilen.length && <p className="p-4 text-sm text-brand-muted">{t("Noch leer. Wählen Sie links einen Baustein.", "Still empty. Choose a building block on the left.", "Encore vide. Choisissez un bloc à gauche.")}</p>}
      </div>
      <div className="p-4 border-t border-brand-dark/10 space-y-2 text-sm">
        {gewicht > 0 && <div className="flex justify-between text-brand-muted"><span>{t('Gewicht ca.', 'Weight approx.', 'Poids env.')}</span><span>{(gewicht / 1000).toLocaleString(loc, { maximumFractionDigits: 1 })} t</span></div>}
        <p className="text-[11px] text-brand-muted leading-snug">{t("Preise erhalten Sie mit dem Angebot, inklusive Fracht und Montage. Bauseitige Leistungen (Fläche, Gullys, Fundamente) sind nicht Teil der Lieferung.", "You receive prices with the quote, including freight and installation. Work to be done by the client (area, drains, foundations) is not part of the delivery.", "Vous recevez les prix avec l'offre, transport et montage compris. Les prestations à la charge du client (surface, avaloirs, fondations) ne font pas partie de la livraison.")}</p>
        <button type="button" disabled={!park?.teile.length} onClick={() => { if (!gesperrt()) setAnfrage(true); }} className="w-full py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-dark transition-colors disabled:opacity-40">
          {t("Angebot anfragen", "Request a quote", "Demander un devis")}
        </button>
        <button type="button" disabled={!zeilen.length} onClick={csvLaden} className="w-full text-xs text-brand-muted hover:text-brand-dark disabled:opacity-40">{t("Stückliste als CSV", "Parts list as CSV", "Liste des pièces en CSV")}</button>
      </div>
    </div>
  );

  return (
    <PageShell title={t("Skatepark-Konfigurator", "Skatepark Planner", "Configurateur de skatepark")} description={t("Skatepark aus modularen Betonelementen in 3D planen: Vorlage wählen, Elemente andocken, Stückliste und Angebot anfragen.", "Plan a skatepark made of modular concrete elements in 3D: choose a template, dock elements together, get the parts list and request a quote.", "Planifiez en 3D un skatepark en éléments modulaires en béton : choisissez un modèle, assemblez les éléments, obtenez la liste des pièces et demandez une offre.")} fullWidth>
      {/* Feste Arbeitsfläche unter dem Seitenkopf: die Seite selbst scrollt nicht, Ziehen und Zoomen bleiben in der Bühne */}
      <div className="fixed inset-x-0 bottom-0 top-14 md:top-20 z-40 flex bg-brand-surface overflow-hidden">
        <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-brand-bg border-r border-brand-dark/10">{seitenleiste}</aside>

        <section className="relative flex-1 min-w-0" onDragOver={(e) => e.preventDefault()} onDrop={fallenLassen}>
          {ctx && park && dargestellt && ab && (
            <OhneDreiD ersatz={(grund, neu) => (
              <div className="absolute inset-0 overflow-auto p-6 pt-36">
                <p className="mb-3 text-sm text-brand-muted">
                  {grund === 'gerät'
                    ? t("Die 3D-Ansicht läuft auf diesem Gerät nicht. Planen, Stückliste, PDF und Anfrage funktionieren trotzdem.", "The 3D view does not run on this device. Planning, parts list, PDF and enquiry still work.", "La vue 3D ne fonctionne pas sur cet appareil. La planification, la liste des pièces, le PDF et la demande fonctionnent malgré tout.")
                    : t("Die 3D-Ansicht konnte nicht geladen werden. Planen, Stückliste, PDF und Anfrage funktionieren trotzdem.", "The 3D view could not be loaded. Planning, parts list, PDF and enquiry still work.", "La vue 3D n'a pas pu être chargée. La planification, la liste des pièces, le PDF et la demande fonctionnent malgré tout.")}
                  {grund === 'fehler' && <button type="button" onClick={neu} className="ml-2 font-semibold text-brand-orange underline">{t("Erneut versuchen", "Try again", "Réessayer")}</button>}
                </p>
                <Plan park={park} ctx={ctx} zusatz={[...ab.gelaender, ...ab.keile]} />
              </div>
            )}>
            <Buehne
              ctx={ctx}
              park={dargestellt}
              zusatz={[...ab.gelaender, ...ab.keile]}
              auswahl={auswahl}
              markierung={markierung}
              ansicht={ansicht}
              rundflug={rundflug}
              modellPfad={modellPfad}
              onAuswahl={(id) => { if (id && gesperrt()) return; setAuswahl(id); if (!id) setVorschlag(null); }}
              onZiehen={ziehenUpdate}
              onAblegen={ablegen}
              onBereit={(a) => { api.current = a; }}
            />
            </OhneDreiD>
          )}
          {!ctx && <div className="absolute inset-0 flex items-center justify-center text-brand-muted">{t("Lade Elemente …", "Loading elements …", "Chargement des éléments …")}</div>}

          {/* Werkzeugleiste */}
          {park && (
            <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start gap-2 pointer-events-none">
              <div className="flex flex-wrap gap-2 pointer-events-auto">
                <Gruppe><LKnopf icon="dashboard_customize" label={t("Vorlage", "Template", "Modèle")} onClick={() => setStart(true)} /></Gruppe>
                {!frei && <Gruppe><LKnopf icon="lock" label={t("Freischalten", "Unlock", "Débloquer")} labelAb="sm:inline" title={t("Konfigurator mit Code freischalten", "Unlock the planner with a code", "Débloquer le configurateur avec un code")} onClick={() => setSperre(true)} /></Gruppe>}
                <Gruppe>
                  <label className="inline-flex items-center gap-1 px-2 text-[13px] font-semibold text-brand-dark" title={t("Fläche in Metern (Raster 1,25 m)", "Area in metres (1.25 m grid)", "Surface en mètres (trame de 1,25 m)")}>
                    <span className="material-symbols-outlined text-[18px] text-brand-muted">square_foot</span>
                    <input aria-label={t("Länge in Metern", "Length in metres", "Longueur en mètres")} type="number" step={RASTER} min={5} max={120} value={park.flaeche.l} onChange={(e) => flaecheSetzen(Number(e.target.value), park.flaeche.b)} style={{ width: `${String(park.flaeche.l).length + 0.8}ch` }} className={`bg-transparent text-center focus:outline-none focus:text-brand-orange ${ohnePfeile}`} />
                    <span className="text-brand-muted">×</span>
                    <input aria-label={t("Breite in Metern", "Width in metres", "Largeur en mètres")} type="number" step={RASTER} min={5} max={120} value={park.flaeche.b} onChange={(e) => flaecheSetzen(park.flaeche.l, Number(e.target.value))} style={{ width: `${String(park.flaeche.b).length + 0.8}ch` }} className={`bg-transparent text-center focus:outline-none focus:text-brand-orange ${ohnePfeile}`} />
                    <span className="text-brand-muted font-normal">m</span>
                  </label>
                  <LKnopf
                    icon={park.flaeche.angeboescht ? 'landscape' : 'view_in_ar'}
                    label={park.flaeche.angeboescht ? t("Angeböscht", "Banked up", "Taluté") : t("Freistehend", "Free-standing", "Autoportant")}
                    labelAb="2xl:inline"
                    title={park.flaeche.angeboescht ? t("Angeböscht: Böschung statt Geländer (umschalten)", "Banked up: embankment instead of railing (toggle)", "Taluté : talus à la place du garde-corps (basculer)") : t("Freistehend: Geländer an hohen Podesten (umschalten)", "Free-standing: railing on high platforms (toggle)", "Autoportant : garde-corps sur les plateformes hautes (basculer)")}
                    onClick={() => flaecheSetzen(park.flaeche.l, park.flaeche.b, !park.flaeche.angeboescht)}
                  />
                </Gruppe>
                <Gruppe><LKnopf icon="auto_awesome_mosaic" label={t("Anordnen", "Arrange", "Réorganiser")} labelAb="2xl:inline" title={t("Anordnen nach dem Muster der A+-Beispielparks", "Arrange in the pattern of the A+ example parks", "Réorganiser selon le modèle des parcs exemples A+")} onClick={neuAnordnen} disabled={!park.teile.length} /></Gruppe>
              </div>
              <div className="flex flex-wrap gap-2 pointer-events-auto md:ml-auto">
                <Gruppe>
                  <LKnopf icon="undo" title={t("Rückgängig (Cmd/Strg + Z)", "Undo (Cmd/Ctrl + Z)", "Annuler (Cmd/Ctrl + Z)")} onClick={rueckgaengig} disabled={!verlauf.zurueck.length} />
                  <LKnopf icon="redo" title={t("Wiederholen (Cmd/Strg + Umschalt + Z)", "Redo (Cmd/Ctrl + Shift + Z)", "Rétablir (Cmd/Ctrl + Maj + Z)")} onClick={wiederholen} disabled={!verlauf.vor.length} />
                </Gruppe>
                <Gruppe>
                  <LKnopf icon="view_in_ar" label="3D" aktiv={ansicht === '3d' && !rundflug} onClick={() => { setAnsicht('3d'); setRundflug(false); }} />
                  <LKnopf icon="grid_view" label={t("Plan", "Plan", "Plan")} aktiv={ansicht === 'oben'} onClick={() => { setAnsicht('oben'); setRundflug(false); }} />
                  <LKnopf icon="360" title={t("Rundflug", "Fly-around", "Vol circulaire")} aktiv={rundflug} onClick={() => { setAnsicht('3d'); setRundflug(!rundflug); }} />
                </Gruppe>
                <Gruppe>
                  <span className="hidden lg:contents">
                    <LKnopf icon="list_alt" label={t("Liste", "List", "Liste")} aktiv={listeOffen} title={listeOffen ? t("Stückliste ausblenden", "Hide the parts list", "Masquer la liste des pièces") : t("Stückliste einblenden", "Show the parts list", "Afficher la liste des pièces")} onClick={listeUmschalten} />
                  </span>
                  {!listeOffen && <span className="hidden lg:contents"><LKnopf icon="send" label={t("Anfrage", "Enquiry", "Demande")} title={t("Angebot anfragen", "Request a quote", "Demander un devis")} onClick={() => { if (!gesperrt()) setAnfrage(true); }} disabled={!park.teile.length} /></span>}
                  <LKnopf icon="print" label="PDF" title={t("Drucken oder als PDF sichern", "Print or save as PDF", "Imprimer ou enregistrer en PDF")} onClick={() => { if (!gesperrt()) setDruckDialog(true); }} disabled={!park.teile.length} />
                  <LKnopf icon="share" label={t("Teilen", "Share", "Partager")} labelAb="2xl:inline" title={t("Link zu diesem Park kopieren", "Copy the link to this park", "Copier le lien vers ce parc")} onClick={teilen} />
                </Gruppe>
              </div>
              {hinweise.length > 0 && (
                <div className="basis-full pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    {hinweise.length} {hinweise.length === 1 ? t("Hinweis", "Note", "Remarque") : t("Hinweise", "Notes", "Remarques")}
                    {hinweise.some((h) => h.fix) && <button type="button" onClick={allesLoesen} className="font-semibold underline underline-offset-2">{t("Alles beheben", "Fix all", "Tout corriger")}</button>}
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
                    <Knopf icon="rotate_right" onClick={() => drehen(90)} title={t("Gruppe drehen 90° (R), mit Alt nur dieses Element, mit Umschalt 15°", "Rotate group 90° (R), with Alt only this element, with Shift 15°", "Faire pivoter le groupe de 90° (R), avec Alt seulement cet élément, avec Maj 15°")} />
                    <Knopf icon="content_copy" onClick={duplizieren} title={t("Duplizieren (Cmd/Strg + D)", "Duplicate (Cmd/Ctrl + D)", "Dupliquer (Cmd/Ctrl + D)")} />
                    <Knopf icon="delete" onClick={loeschen} title={t("Löschen (Entf)", "Delete (Del)", "Supprimer (Suppr)")} />
                    <Link to={`/katalog/${ausgewaehlt.slug}`} target="_blank" className="inline-flex items-center px-2 rounded-lg bg-white/80 border border-brand-dark/10 text-brand-dark hover:bg-white" title={t("Im Katalog ansehen", "View in the catalogue", "Voir dans le catalogue")}>
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </Link>
                  </div>
                </div>
                {(anbau.gerade.length > 0 || anbau.kurve.length > 0) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {anbau.kurve.includes('links') && <Knopf icon="turn_left" onClick={() => anbauen('kurve', 'links')}>{t("Kurve links", "Curve left", "Courbe à gauche")}</Knopf>}
                    {anbau.gerade.includes('links') && <Knopf icon="west" onClick={() => anbauen('gerade', 'links')}>{t("Gerade", "Straight", "Droit")}</Knopf>}
                    {anbau.gerade.includes('rechts') && <Knopf icon="east" onClick={() => anbauen('gerade', 'rechts')}>{t("Gerade", "Straight", "Droit")}</Knopf>}
                    {anbau.kurve.includes('rechts') && <Knopf icon="turn_right" onClick={() => anbauen('kurve', 'rechts')}>{t("Kurve rechts", "Curve right", "Courbe à droite")}</Knopf>}
                  </div>
                )}
                {gelModus && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-brand-muted">{t("Geländer", "Railing", "Garde-corps")}</span>
                    <div className="inline-flex rounded-lg border border-brand-dark/10 overflow-hidden" role="group" aria-label={t("Geländer für diese Gruppe", "Railing for this group", "Garde-corps pour ce groupe")}>
                      {([['auto', t("Automatisch", "Automatic", "Automatique")], ['an', t("An", "On", "Activé")], ['aus', t("Aus", "Off", "Désactivé")]] as [GelaenderModus, string][]).map(([m, t]) => (
                        <button key={m} type="button" onClick={() => gelSetzen(m)} aria-pressed={gelModus === m} className={`px-2.5 py-1 font-semibold ${gelModus === m ? 'bg-brand-dark text-white' : 'bg-white/80 text-brand-dark hover:bg-white'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="mt-2 text-[11px] text-brand-muted">{t("Ziehen und R wirken auf die ganze Gruppe, mit gedrückter Alt-Taste nur auf dieses Element. Entf löscht.", "Dragging and R act on the whole group; hold Alt to affect only this element. Del deletes.", "Le glisser-déposer et R agissent sur tout le groupe ; avec la touche Alt, uniquement sur cet élément. Suppr supprime.")}</p>
                {auswahlHinweise.map((h) => (
                  <div key={h.id} className={`mt-2 flex items-center justify-between gap-2 text-xs rounded-lg px-2.5 py-2 ${h.stufe === 'rot' ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-900'}`}>
                    <span>{h.text}</span>
                    {h.fix && <button type="button" onClick={() => hinweisBeheben(h)} className="font-semibold underline whitespace-nowrap">{t("Beheben", "Fix", "Corriger")}</button>}
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
                  <button type="button" onClick={() => { abgelehnt.current.add(vorschlag.teil); setVorschlag(null); }} className="px-3 py-1.5 text-sm text-white/70 hover:text-white">{t("Nein danke", "No thanks", "Non merci")}</button>
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
              <Knopf icon="add" onClick={() => setPanel(panel === 'katalog' ? null : 'katalog')} aktiv={panel === 'katalog'}>{t("Elemente", "Elements", "Éléments")}</Knopf>
              <Knopf icon="list_alt" onClick={() => setPanel(panel === 'liste' ? null : 'liste')} aktiv={panel === 'liste'}>{t("Liste", "List", "Liste")}</Knopf>
            </div>
          )}
          {panel && (
            <div className="lg:hidden absolute inset-x-0 bottom-0 h-[62%] z-20 bg-brand-bg rounded-t-2xl shadow-2xl border-t border-brand-dark/10 flex flex-col">
              <button type="button" onClick={() => setPanel(null)} className="mx-auto my-2 w-12 h-1.5 rounded-full bg-brand-dark/20" aria-label={t("Schließen", "Close", "Fermer")} />
              <div className="flex-1 min-h-0">{panel === 'katalog' ? seitenleiste : liste}</div>
            </div>
          )}

        </section>

        {listeOffen && <aside className="hidden lg:flex w-80 shrink-0 flex-col bg-brand-bg border-l border-brand-dark/10">{liste}</aside>}
        {(start || (ctx && !park)) && <Start onWahl={vorlageWaehlen} onSchliessen={park ? () => setStart(false) : undefined} />}
      </div>
      <DruckDialog offen={druckDialog} onClose={() => setDruckDialog(false)} onDrucken={drucken} />
      {druck && ctx && park && ab && (
        <Druck park={park} ctx={ctx} zusatz={[...ab.gelaender, ...ab.keile]} zeilen={zeilen} hinweise={hinweise.map((h) => h.text)} optionen={druck.optionen} bild3d={druck.bild} netze={druck.netze} qr={druck.qr} />
      )}
      <CodeDialog offen={sperre} onClose={() => setSperre(false)} freischalten={freischalten} anfrage={konfigCode.anfrage} titel={konfigCode.titel} text={konfigCode.text} />
      {!frei && createPortal(
        <div className="druck-sperre hidden p-16 text-black" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <style>{'@media print { body > *:not(.druck-sperre) { display: none !important; } .druck-sperre { display: block !important; } }'}</style>
          <p className="text-2xl font-bold mb-4">{t("Skatepark-Konfigurator von A+ Urban Design", "Skatepark planner by A+ Urban Design", "Configurateur de skatepark d'A+ Urban Design")}</p>
          <p>{t("Drucken und PDF sind nach der Freischaltung möglich. Den Code erhalten Sie unter post@aplusurbandesign.com.", "Printing and PDF are possible after unlocking. You can get the code from post@aplusurbandesign.com.", "L'impression et le PDF sont possibles après le déblocage. Vous obtenez le code auprès de post@aplusurbandesign.com.")}</p>
        </div>,
        document.body,
      )}
      <AnfrageDialog offen={anfrage} onClose={() => setAnfrage(false)} mailto={mailto} link={link} />
    </PageShell>
  );
};

export default KonfiguratorPage;
