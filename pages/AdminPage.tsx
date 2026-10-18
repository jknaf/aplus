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

// Analyse: vorbereitet, noch nicht angebunden. Später liefert useAnalyse() die Zahlen vom Server (Google Analytics Data API, Google Ads API);
// die Karten unten bleiben, nur `wert` wird gefüllt. Der Server darf die Zugangsdaten nie an den Browser geben.
type Kennzahl = { name: string; frage: string; wert?: string };
const ANALYSE: { id: 'ga' | 'ads'; titel: string; was: string; zahlen: Kennzahl[]; tabelle: { titel: string; spalten: string[] }; braucht: string[] }[] = [
  { id: 'ga', titel: 'Google Analytics', was: 'Was passiert auf der Webseite: wer kommt, woher, und was tun die Besucher?',
    zahlen: [
      { name: 'Besucher', frage: 'Wie viele verschiedene Personen waren da?' },
      { name: 'Sitzungen', frage: 'Wie oft wurde die Seite besucht?' },
      { name: 'Verweildauer', frage: 'Wie lange bleiben Besucher im Schnitt?' },
      { name: 'Konfigurator gestartet', frage: 'Wie viele planen selbst?' },
      { name: 'Preise freigeschaltet', frage: 'Wie oft wurde ein Preis-Code eingelöst?' },
      { name: 'Anfragen per Mail', frage: 'Wie oft wurde „Anfrage senden“ geklickt?' },
    ],
    tabelle: { titel: 'Woher kommen die Besucher', spalten: ['Quelle / Medium', 'Besucher', 'Anfragen'] },
    braucht: ['GA4-Property mit Mess-ID (G-…)', 'Dienstkonto mit Leserechten auf die Property', 'Einwilligung der Besucher (Cookie-Hinweis), bevor Analytics lädt'] },
  { id: 'ads', titel: 'Google Ads', was: 'Was bringt die bezahlte Werbung: was kostet sie, und was kommt dabei heraus?',
    zahlen: [
      { name: 'Anzeigen gezeigt', frage: 'Wie oft wurden die Anzeigen angezeigt?' },
      { name: 'Klicks', frage: 'Wie oft wurde darauf geklickt?' },
      { name: 'Klickrate', frage: 'Welcher Anteil klickt?' },
      { name: 'Kosten', frage: 'Was wurde im Zeitraum ausgegeben?' },
      { name: 'Conversions', frage: 'Wie viele Anfragen kamen über Anzeigen?' },
      { name: 'Kosten je Anfrage', frage: 'Was kostet eine Anfrage?' },
    ],
    tabelle: { titel: 'Kampagnen und Suchbegriffe', spalten: ['Kampagne / Suchbegriff', 'Klicks', 'Kosten', 'Anfragen'] },
    braucht: ['Google-Ads-Kundennummer', 'Developer-Token und Zugriff (OAuth) auf das Konto', 'Conversion-Ziel „Anfrage“ in Ads, verknüpft mit Analytics'] },
];
const ZEITRAEUME = [7, 30, 90];

const Analyse: React.FC = () => {
  const [tage, setTage] = useState(30);
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-surface text-brand-dark">Noch nicht verbunden</span>
        <div className="flex gap-2" role="group" aria-label="Zeitraum">
          {ZEITRAEUME.map((n) => (
            <button key={n} type="button" onClick={() => setTage(n)} aria-pressed={tage === n}
              className={`px-3 py-1.5 rounded-md text-sm border ${tage === n ? 'bg-brand-dark text-white border-brand-dark' : 'border-brand-dark/15 text-brand-dark'}`}>{n} Tage</button>
          ))}
        </div>
      </div>
      {ANALYSE.map((a) => (
        <section key={a.id} className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6" aria-labelledby={`an-${a.id}`}>
          <h2 id={`an-${a.id}`} className="text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight">{a.titel}</h2>
          <p className="text-sm text-brand-muted mt-1 mb-5">{a.was} Zeitraum: letzte {tage} Tage.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {a.zahlen.map((z) => (
              <div key={z.name} className="rounded-xl border border-brand-dark/10 p-4">
                <div className="font-mono text-xs uppercase tracking-widest text-brand-muted">{z.name}</div>
                <div className="text-3xl font-extrabold text-brand-dark my-1">{z.wert ?? '–'}</div>
                <div className="text-xs text-brand-muted">{z.frage}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-brand-dark/10 mb-6">
            <table className="w-full text-sm text-left">
              <caption className="text-left px-4 pt-3 font-mono text-xs uppercase tracking-widest text-brand-muted">{a.tabelle.titel}</caption>
              <thead className="font-mono text-xs uppercase tracking-widest text-brand-muted"><tr>{a.tabelle.spalten.map((c) => <th key={c} className="px-4 py-3 font-medium whitespace-nowrap">{c}</th>)}</tr></thead>
              <tbody><tr className="border-t border-brand-dark/5"><td colSpan={a.tabelle.spalten.length} className="px-4 py-5 text-brand-muted">Keine Daten, solange {a.titel} nicht angebunden ist.</td></tr></tbody>
            </table>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Für die Anbindung nötig</h3>
            <ul className="list-disc pl-5 text-sm text-brand-dark space-y-1">{a.braucht.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        </section>
      ))}
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { betreiber, freischalten, kundencode, codeliste, abmelden } = usePreise();
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
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9] mb-10">Admin</h1>

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
            {reiter === 'analyse' ? <Analyse /> : <>
            <form onSubmit={erzeugen} className="flex flex-wrap items-end gap-3 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5 mb-4">
              <label className="flex-1 min-w-[240px]">
                <span className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Für wen *</span>
                <input value={fuer} onChange={(e) => setFuer(e.target.value)} required maxLength={120} placeholder="z. B. Gemeinde, Ansprechpartner" className={feld} />
              </label>
              <label>
                <span className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Art</span>
                <select value={art} onChange={(e) => setArt(e.target.value as 'preise' | 'konfigurator')} className={feld}>
                  <option value="preise">Preise und Katalog</option>
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
                        : 'Danach sieht der Kunde Preise und Katalog, bis er die Seite neu lädt.'}
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
                      <td className="px-5 py-3">{z.art === 'konfigurator' ? 'Konfigurator' : 'Preise'}</td>
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
