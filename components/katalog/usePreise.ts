import { useCallback, useEffect, useState } from 'react';

// Betreiber-Code: im Browser gemerkt, Preise bei jedem Besuch frisch vom Server.
// Kundencode: Preise nur im Speicher der Seite, nach dem Neuladen sind sie weg (der Code ist dann verbraucht).
const SPEICHER = 'aplus-preis-betreiber';

const merken = (code: string | null) => {
  try {
    if (code) localStorage.setItem(SPEICHER, code); else localStorage.removeItem(SPEICHER);
  } catch {
    /* ohne Speicher gilt die Freischaltung nur bis zum Neuladen */
  }
};

const abfragen = async (body: object) => {
  const res = await fetch('/api/skate-preise', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return { ok: res.ok, daten: await res.json().catch(() => ({})) };
};

export const usePreise = () => {
  const [preise, setPreise] = useState<Record<string, string> | null>(null);
  const [betreiber, setBetreiber] = useState<string | null>(null);
  const [katalog, setKatalog] = useState<{ ansehen: string; download: string } | null>(null);

  useEffect(() => {
    let code: string | null = null;
    try { code = localStorage.getItem(SPEICHER); } catch { /* kein Speicher */ }
    if (!code) return;
    abfragen({ code }).then(({ ok, daten }) => {
      if (ok && daten.art === 'betreiber') { setPreise(daten.preise); setKatalog(daten.katalog ?? null); setBetreiber(code); } else merken(null);
    }, () => undefined);
  }, []);

  const freischalten = useCallback(async (code: string): Promise<string | null> => {
    try {
      const { ok, daten } = await abfragen({ code });
      if (!ok) return daten.fehler ?? 'Freischaltung fehlgeschlagen.';
      setPreise(daten.preise);
      setKatalog(daten.katalog ?? null);
      if (daten.art === 'betreiber') { setBetreiber(code); merken(code); }
      return null;
    } catch {
      return 'Keine Verbindung. Bitte später erneut versuchen.';
    }
  }, []);

  const kundencode = useCallback(async (zweck: 'preise' | 'konfigurator' = 'preise'): Promise<string | null> => {
    if (!betreiber) return null;
    const { ok, daten } = await abfragen({ code: betreiber, neu: true, zweck }).catch(() => ({ ok: false, daten: {} as { kundencode?: string } }));
    return ok ? daten.kundencode ?? null : null;
  }, [betreiber]);

  const abmelden = useCallback(() => { merken(null); setBetreiber(null); setPreise(null); setKatalog(null); }, []);

  return { preise, katalog, freischalten, betreiber: !!betreiber, kundencode, abmelden };
};

// Konfigurator: ohne Freischaltung nur Vorlagen ansehen. Frei mit Betreiber-Code (dauerhaft) oder C-Code (FREI_TAGE im Browser).
// ponytail: Sperre nur im Browser, wer die Seite zerlegt, kommt vorbei; Preise bleiben trotzdem auf dem Server
const FREI_BIS = 'aplus-konfigurator-frei-bis';
const lesen = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
export const konfiguratorFrei = () => Number(lesen(FREI_BIS) ?? 0) > Date.now() || !!lesen(SPEICHER);

export const useKonfiguratorFrei = () => {
  const [frei, setFrei] = useState(konfiguratorFrei);

  useEffect(() => {
    const code = lesen(SPEICHER);
    if (!code || Number(lesen(FREI_BIS) ?? 0) > Date.now()) return;
    abfragen({ code }).then(({ ok, daten }) => {
      if (!(ok && daten.art === 'betreiber')) { merken(null); setFrei(false); }
    }, () => undefined);
  }, []);

  const freischalten = useCallback(async (code: string): Promise<string | null> => {
    try {
      const { ok, daten } = await abfragen({ code, zweck: 'konfigurator' });
      if (!ok) return daten.fehler ?? 'Freischaltung fehlgeschlagen.';
      if (daten.art === 'betreiber') merken(code);
      else try { localStorage.setItem(FREI_BIS, String(Date.now() + (daten.tage ?? 2) * 864e5)); } catch { /* dann nur bis zum Neuladen */ }
      setFrei(true);
      return null;
    } catch {
      return 'Keine Verbindung. Bitte später erneut versuchen.';
    }
  }, []);

  return { frei, freischalten };
};
