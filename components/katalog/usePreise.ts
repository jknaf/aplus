import { useCallback, useState } from 'react';

// Freigeschaltete Preise gelten für die laufende Browser-Sitzung.
const SPEICHER = 'aplus-katalog-preise';

const laden = (): Record<string, string> | null => {
  try {
    const roh = sessionStorage.getItem(SPEICHER);
    return roh ? JSON.parse(roh) : null;
  } catch {
    return null;
  }
};

export const usePreise = () => {
  const [preise, setPreise] = useState<Record<string, string> | null>(laden);

  const freischalten = useCallback(async (code: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/skate-preise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const daten = await res.json().catch(() => ({}));
      if (!res.ok) return daten.fehler ?? 'Freischaltung fehlgeschlagen.';
      setPreise(daten.preise);
      try {
        sessionStorage.setItem(SPEICHER, JSON.stringify(daten.preise));
      } catch {
        /* ohne Speicher gilt die Freischaltung nur bis zum Neuladen */
      }
      return null;
    } catch {
      return 'Keine Verbindung. Bitte später erneut versuchen.';
    }
  }, []);

  return { preise, freischalten };
};
