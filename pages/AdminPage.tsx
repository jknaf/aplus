import React, { useCallback, useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import { usePreise, type CodeZeile } from '../components/katalog/usePreise';

// Nur für A+: Kundencodes erzeugen und sehen, wer welchen Code bekommen und eingelöst hat; dazu die Analyse (Google Analytics, Google Ads).
// Nirgends verlinkt; ohne Betreiber-Code zeigt die Seite nur die Anmeldung.
const datum = (s: string) => new Date(s).toLocaleDateString('de-DE');
const zeit = (s: string) => new Date(s).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });

const Status: React.FC<{ z: CodeZeile }> = ({ z }) => z.eingeloest
  ? <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-orange/15 text-brand-dark">Eingelöst am {zeit(z.eingeloest)}</span>
  : z.abgelaufen
    ? <span className="text-xs text-brand-muted">Abgelaufen</span>
    : <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-surface text-brand-dark">Offen</span>;

const feld = 'w-full px-4 py-3 rounded-lg border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-orange';
const knopf = 'px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-dark transition-colors disabled:opacity-50';

// Analyse: Google Analytics und Search Console kommen über /api/analyse (Dienstkonto „GSC Audit“, nur lesend);
// Google Ads ist vorbereitet, noch nicht angebunden. Der Server gibt die Zugangsdaten nie an den Browser.
type Zeile = { name: string; klicks: number; impressionen: number; ctr: number; position: number };
type GaDaten = { besucher: number; sitzungen: number; verweildauer: number; quellen: { quelle: string; besucher: number }[] };
type GscDaten = Zeile & { begriffe: Zeile[]; seiten: Zeile[] };
export type AnalyseDaten = { ga: GaDaten | { fehler: string }; gsc: GscDaten | { fehler: string } };

const zahl = (n: number) => n.toLocaleString('de-DE');
const prozent = (n: number) => `${(n * 100).toLocaleString('de-DE', { maximumFractionDigits: 1 })} %`;
const pos = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 1 });
const dauer = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} min`;
const pfad = (url: string) => url.replace(/^https?:\/\/[^/]+/, '') || '/';

type Kennzahl = { name: string; frage: string; wert?: string };
type Tabelle = { titel: string; spalten: string[]; zeilen?: (string | number)[][] };
type Bereich = { id: 'ga' | 'gsc' | 'ads'; titel: string; was: string; zahlen: Kennzahl[]; tabellen: Tabelle[]; braucht?: string[]; fehler?: string };

const bereiche = (d: AnalyseDaten | null): Bereich[] => {
  const ga = d && !('fehler' in d.ga) ? d.ga : null;
  const gsc = d && !('fehler' in d.gsc) ? d.gsc : null;
  return [
    { id: 'ga', titel: 'Google Analytics', was: 'Was passiert auf der Webseite: wer kommt, woher, und was tun die Besucher? Gezählt wird nur, wer im Cookie-Hinweis zugestimmt hat.',
      fehler: d && 'fehler' in d.ga ? d.ga.fehler : undefined,
      zahlen: [
        { name: 'Besucher', frage: 'Wie viele verschiedene Personen waren da?', wert: ga ? zahl(ga.besucher) : undefined },
        { name: 'Sitzungen', frage: 'Wie oft wurde die Seite besucht?', wert: ga ? zahl(ga.sitzungen) : undefined },
        { name: 'Verweildauer', frage: 'Wie lange bleiben Besucher im Schnitt?', wert: ga ? dauer(ga.verweildauer) : undefined },
        { name: 'Konfigurator gestartet', frage: 'Wie viele planen selbst? (wird noch nicht gemessen)' },
        { name: 'Preise freigeschaltet', frage: 'Wie oft wurde ein Preis-Code eingelöst? (wird noch nicht gemessen)' },
        { name: 'Anfragen per Mail', frage: 'Wie oft wurde „Anfrage senden“ geklickt? (wird noch nicht gemessen)' },
      ],
      tabellen: [{ titel: 'Woher kommen die Besucher', spalten: ['Quelle / Medium', 'Besucher'], zeilen: ga?.quellen.map((q) => [q.quelle, zahl(q.besucher)]) }] },
    { id: 'gsc', titel: 'Google-Suche', was: 'Wie wird die Webseite bei Google gefunden: wie oft gezeigt, wie oft angeklickt, mit welchen Suchbegriffen? Quelle: Search Console, die letzten 2–3 Tage fehlen noch.',
      fehler: d && 'fehler' in d.gsc ? d.gsc.fehler : undefined,
      zahlen: [
        { name: 'Klicks', frage: 'Wie oft wurde die Seite aus der Google-Suche geöffnet?', wert: gsc ? zahl(gsc.klicks) : undefined },
        { name: 'Impressionen', frage: 'Wie oft wurde die Seite in der Suche gezeigt?', wert: gsc ? zahl(gsc.impressionen) : undefined },
        { name: 'Klickrate', frage: 'Welcher Anteil der Suchenden klickt?', wert: gsc ? prozent(gsc.ctr) : undefined },
        { name: 'Ø Position', frage: 'Auf welchem Platz steht die Seite im Schnitt?', wert: gsc ? pos(gsc.position) : undefined },
      ],
      tabellen: [
        { titel: 'Suchbegriffe', spalten: ['Suchbegriff', 'Klicks', 'Impressionen', 'Position'], zeilen: gsc?.begriffe.map((z) => [z.name, zahl(z.klicks), zahl(z.impressionen), pos(z.position)]) },
        { titel: 'Seiten', spalten: ['Seite', 'Klicks', 'Impressionen', 'Position'], zeilen: gsc?.seiten.map((z) => [pfad(z.name), zahl(z.klicks), zahl(z.impressionen), pos(z.position)]) },
      ] },
    { id: 'ads', titel: 'Google Ads', was: 'Was bringt die bezahlte Werbung: was kostet sie, und was kommt dabei heraus?',
      zahlen: [
        { name: 'Anzeigen gezeigt', frage: 'Wie oft wurden die Anzeigen angezeigt?' },
        { name: 'Klicks', frage: 'Wie oft wurde darauf geklickt?' },
        { name: 'Klickrate', frage: 'Welcher Anteil klickt?' },
        { name: 'Kosten', frage: 'Was wurde im Zeitraum ausgegeben?' },
        { name: 'Conversions', frage: 'Wie viele Anfragen kamen über Anzeigen?' },
        { name: 'Kosten je Anfrage', frage: 'Was kostet eine Anfrage?' },
      ],
      tabellen: [{ titel: 'Kampagnen und Suchbegriffe', spalten: ['Kampagne / Suchbegriff', 'Klicks', 'Kosten', 'Anfragen'] }],
      braucht: ['Google-Ads-Kundennummer', 'Developer-Token und Zugriff (OAuth) auf das Konto', 'Conversion-Ziel „Anfrage“ in Ads, verknüpft mit Analytics'] },
  ];
};
const ZEITRAEUME = [7, 30, 90];

const Analyse: React.FC<{ laden: (tage: number) => Promise<AnalyseDaten | { fehler: string }> }> = ({ laden }) => {
  const [tage, setTage] = useState(30);
  const [daten, setDaten] = useState<AnalyseDaten | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState(true);
  useEffect(() => {
    let aktiv = true;
    setLaeuft(true);
    laden(tage).then((d) => {
      if (!aktiv) return;
      if ('fehler' in d) { setFehler(d.fehler); setDaten(null); } else { setFehler(null); setDaten(d); }
      setLaeuft(false);
    });
    return () => { aktiv = false; };
  }, [tage, laden]);
  const status = laeuft ? 'Lädt …' : fehler ? 'Nicht verbunden' : 'Verbunden';
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-surface text-brand-dark" role="status">{status}</span>
        <div className="flex gap-2" role="group" aria-label="Zeitraum">
          {ZEITRAEUME.map((n) => (
            <button key={n} type="button" onClick={() => setTage(n)} aria-pressed={tage === n}
              className={`px-3 py-1.5 rounded-md text-sm border ${tage === n ? 'bg-brand-dark text-white border-brand-dark' : 'border-brand-dark/15 text-brand-dark'}`}>{n} Tage</button>
          ))}
        </div>
        {fehler && <p className="text-sm text-red-700 basis-full" role="alert">{fehler}</p>}
      </div>
      {bereiche(daten).map((a) => (
        <section key={a.id} className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6" aria-labelledby={`an-${a.id}`}>
          <h2 id={`an-${a.id}`} className="text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight">{a.titel}</h2>
          <p className="text-sm text-brand-muted mt-1 mb-5">{a.was} Zeitraum: letzte {tage} Tage.</p>
          {a.fehler && <p className="text-sm text-red-700 mb-4" role="alert">{a.fehler}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {a.zahlen.map((z) => (
              <div key={z.name} className="rounded-xl border border-brand-dark/10 p-4">
                <div className="font-mono text-xs uppercase tracking-widest text-brand-muted">{z.name}</div>
                <div className="text-3xl font-extrabold text-brand-dark my-1">{z.wert ?? '–'}</div>
                <div className="text-xs text-brand-muted">{z.frage}</div>
              </div>
            ))}
          </div>
          {a.tabellen.map((t) => (
            <div key={t.titel} className="overflow-x-auto rounded-xl border border-brand-dark/10 mb-6">
              <table className="w-full text-sm text-left">
                <caption className="text-left px-4 pt-3 font-mono text-xs uppercase tracking-widest text-brand-muted">{t.titel}</caption>
                <thead className="font-mono text-xs uppercase tracking-widest text-brand-muted"><tr>{t.spalten.map((c) => <th key={c} className="px-4 py-3 font-medium whitespace-nowrap">{c}</th>)}</tr></thead>
                <tbody>
                  {t.zeilen?.length ? t.zeilen.map((z, i) => (
                    <tr key={i} className="border-t border-brand-dark/5">{z.map((c, j) => <td key={j} className={`px-4 py-2.5 ${j ? 'whitespace-nowrap' : 'break-all'}`}>{c}</td>)}</tr>
                  )) : <tr className="border-t border-brand-dark/5"><td colSpan={t.spalten.length} className="px-4 py-5 text-brand-muted">{a.braucht ? `Keine Daten, solange ${a.titel} nicht angebunden ist.` : laeuft ? 'Lädt …' : 'Keine Daten im Zeitraum.'}</td></tr>}
                </tbody>
              </table>
            </div>
          ))}
          {a.braucht && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Für die Anbindung nötig</h3>
              <ul className="list-disc pl-5 text-sm text-brand-dark space-y-1">{a.braucht.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { betreiber, freischalten, kundencode, codeliste, analyse, abmelden } = usePreise();
  const [codes, setCodes] = useState<CodeZeile[] | null>(null);
  const [anmeldung, setAnmeldung] = useState('');
  const [fuer, setFuer] = useState('');
  const [art, setArt] = useState<'preise' | 'konfigurator'>('preise');
  const [neu, setNeu] = useState<{ code?: string; bis?: string; fehler?: string } | null>(null);
  const [laeuft, setLaeuft] = useState(false);
  const [reiter, setReiter] = useState<'codes' | 'analyse'>('codes');

  const laden = useCallback(async () => setCodes(await codeliste()), [codeliste]);
  useEffect(() => { if (betreiber) laden(); }, [betreiber, laden]);

  const anmelden = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLaeuft(true);
    const f = await freischalten(anmeldung);
    setLaeuft(false);
    setNeu(f ? { fehler: f } : null);
  };
  const erzeugen = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLaeuft(true);
    const r = await kundencode(art, fuer);
    setLaeuft(false);
    setNeu(r);
    if (r.code) { setFuer(''); laden(); }
  };

  return (
    <PageShell title="Admin" noIndex>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-32 max-w-6xl">
        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Nur für A+</span>
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-none mb-10">Admin</h1>

        {!betreiber ? (
          <form onSubmit={anmelden} className="max-w-md bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6">
            <label htmlFor="betreiber-code" className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Betreiber-Code</label>
            <input id="betreiber-code" value={anmeldung} onChange={(e) => setAnmeldung(e.target.value)} autoComplete="off" className={`${feld} font-mono uppercase tracking-widest`} />
            {neu?.fehler && <p className="mt-3 text-sm text-red-700" role="alert">{neu.fehler}</p>}
            <button type="submit" disabled={!anmeldung.trim() || laeuft} className={`${knopf} mt-4`}>{laeuft ? 'Prüfe …' : 'Anmelden'}</button>
          </form>
        ) : (
          <>
            <div className="flex gap-2 mb-6" role="tablist">
              {([['codes', 'Kundencodes'], ['analyse', 'Analyse']] as const).map(([id, name]) => (
                <button key={id} type="button" role="tab" aria-selected={reiter === id} onClick={() => setReiter(id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider ${reiter === id ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark border border-brand-dark/15'}`}>{name}</button>
              ))}
            </div>
            {reiter === 'analyse' ? <Analyse laden={analyse} /> : <>
            <form onSubmit={erzeugen} className="flex flex-wrap items-end gap-3 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5 mb-4">
              <label className="flex-1 min-w-[240px]">
                <span className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Für wen *</span>
                <input value={fuer} onChange={(e) => setFuer(e.target.value)} required maxLength={120} placeholder="z. B. Gemeinde, Ansprechpartner" className={feld} />
              </label>
              <label>
                <span className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Art</span>
                <select value={art} onChange={(e) => setArt(e.target.value as 'preise' | 'konfigurator')} className={feld}>
                  <option value="preise">Katalog</option>
                  <option value="konfigurator">Konfigurator</option>
                </select>
              </label>
              <button type="submit" disabled={!fuer.trim() || laeuft} className={knopf}>{laeuft ? 'Erzeuge …' : 'Code erzeugen'}</button>
            </form>

            {neu && (
              <div className="mb-10 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5" role="status">
                {neu.code ? (
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono text-lg tracking-wider bg-white border border-brand-dark/15 rounded-lg px-4 py-2 select-all break-all">{neu.code}</span>
                    <button type="button" onClick={() => navigator.clipboard?.writeText(neu.code!)} className={knopf}>Kopieren</button>
                    <p className="text-sm text-brand-muted basis-full">
                      Einlösbar einmal bis {neu.bis && datum(neu.bis)}. {neu.code.startsWith('K-')
                        ? 'Danach kann der Kunde 2 Tage lang im Konfigurator planen.'
                        : 'Danach sieht der Kunde den Katalog, bis er die Seite neu lädt.'}
                    </p>
                  </div>
                ) : <p className="text-sm text-red-700" role="alert">{neu.fehler}</p>}
              </div>
            )}

            <div className="overflow-x-auto bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <table className="w-full text-sm text-left">
                <thead className="font-mono text-xs uppercase tracking-widest text-brand-muted">
                  <tr>{['Code', 'Für wen', 'Art', 'Erstellt', 'Einlösbar bis', 'Status'].map((t) => <th key={t} className="px-5 py-4 font-medium whitespace-nowrap">{t}</th>)}</tr>
                </thead>
                <tbody>
                  {codes === null && <tr><td colSpan={6} className="px-5 py-6 text-brand-muted">Liste wird geladen …</td></tr>}
                  {codes?.length === 0 && <tr><td colSpan={6} className="px-5 py-6 text-brand-muted">Noch keine Codes erzeugt.</td></tr>}
                  {codes?.map((z) => (
                    <tr key={z.code} className="border-t border-brand-dark/5">
                      <td className="px-5 py-3 font-mono whitespace-nowrap select-all">{z.code}</td>
                      <td className="px-5 py-3">{z.fuer}</td>
                      <td className="px-5 py-3">{z.art === 'konfigurator' ? 'Konfigurator' : 'Katalog'}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{datum(z.erstellt)}</td>
                      <td className="px-5 py-3 whitespace-nowrap">{datum(z.bis)}</td>
                      <td className="px-5 py-3 whitespace-nowrap"><Status z={z} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>}
            <button type="button" onClick={abmelden} className="mt-6 text-sm text-brand-muted hover:text-brand-dark">Auf diesem Gerät abmelden</button>
          </>
        )}
      </section>
    </PageShell>
  );
};

export default AdminPage;
