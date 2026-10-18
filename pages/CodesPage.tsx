import React, { useCallback, useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import { usePreise, type CodeZeile } from '../components/katalog/usePreise';

// Nur für A+: Kundencodes erzeugen und sehen, wer welchen Code bekommen und eingelöst hat.
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

const CodesPage: React.FC = () => {
  const { betreiber, freischalten, kundencode, codeliste, abmelden } = usePreise();
  const [codes, setCodes] = useState<CodeZeile[] | null>(null);
  const [anmeldung, setAnmeldung] = useState('');
  const [fuer, setFuer] = useState('');
  const [art, setArt] = useState<'preise' | 'konfigurator'>('preise');
  const [neu, setNeu] = useState<{ code?: string; bis?: string; fehler?: string } | null>(null);
  const [laeuft, setLaeuft] = useState(false);

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
    <PageShell title="Kundencodes" noIndex>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-32 max-w-6xl">
        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Nur für A+</span>
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9] mb-10">Kundencodes</h1>

        {!betreiber ? (
          <form onSubmit={anmelden} className="max-w-md bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6">
            <label htmlFor="betreiber-code" className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2">Betreiber-Code</label>
            <input id="betreiber-code" value={anmeldung} onChange={(e) => setAnmeldung(e.target.value)} autoComplete="off" className={`${feld} font-mono uppercase tracking-widest`} />
            {neu?.fehler && <p className="mt-3 text-sm text-red-700" role="alert">{neu.fehler}</p>}
            <button type="submit" disabled={!anmeldung.trim() || laeuft} className={`${knopf} mt-4`}>{laeuft ? 'Prüfe …' : 'Anmelden'}</button>
          </form>
        ) : (
          <>
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
            <button type="button" onClick={abmelden} className="mt-6 text-sm text-brand-muted hover:text-brand-dark">Auf diesem Gerät abmelden</button>
          </>
        )}
      </section>
    </PageShell>
  );
};

export default CodesPage;
