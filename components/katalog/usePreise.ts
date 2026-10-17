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

  useEffect(() => {
    let code: string | null = null;
    try { code = localStorage.getItem(SPEICHER); } catch { /* kein Speicher */ }
    if (!code) return;
    abfragen({ code }).then(({ ok, daten }) => {
      if (ok && daten.art === 'betreiber') { setPreise(daten.preise); setBetreiber(code); } else merken(null);
    }, () => undefined);
  }, []);

  const freischalten = useCallback(async (code: string): Promise<string | null> => {
    try {
      const { ok, daten } = await abfragen({ code });
      if (!ok) return daten.fehler ?? 'Freischaltung fehlgeschlagen.';
      setPreise(daten.preise);
      if (daten.art === 'betreiber') { setBetreiber(code); merken(code); }
      return null;
    } catch {
      return 'Keine Verbindung. Bitte später erneut versuchen.';
    }
  }, []);

  const kundencode = useCallback(async (): Promise<string | null> => {
    if (!betreiber) return null;
    const { ok, daten } = await abfragen({ code: betreiber, neu: true }).catch(() => ({ ok: false, daten: {} as { kundencode?: string } }));
    return ok ? daten.kundencode ?? null : null;
  }, [betreiber]);

  const abmelden = useCallback(() => { merken(null); setBetreiber(null); setPreise(null); }, []);

  return { preise, freischalten, betreiber: !!betreiber, kundencode, abmelden };
};
