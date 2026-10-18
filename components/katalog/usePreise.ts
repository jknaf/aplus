import { useCallback, useEffect, useState } from 'react';
import { useT } from '../../i18n';

// Betreiber-Code: im Browser gemerkt, Preise bei jedem Besuch frisch vom Server.
// Kundencode: Preise nur im Speicher der Seite, nach dem Neuladen sind sie weg (der Code ist dann verbraucht).
const SPEICHER = 'aplus-preis-betreiber';

export interface CodeZeile { code: string; art: 'preise' | 'konfigurator'; fuer: string; erstellt: string; bis: string; eingeloest: string | null; abgelaufen: boolean }

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

// Die Server-Meldungen kommen deutsch; hier die für Besucher sichtbaren in EN/FR
const MELDUNGEN: Record<string, [string, string]> = {
  'Preisfreischaltung ist noch nicht eingerichtet.': ['Price unlocking has not been set up yet.', "Le déblocage des prix n'est pas encore configuré."],
  'Der Code ist leider nicht gültig.': ['Sorry, this code is not valid.', "Désolé, ce code n'est pas valide."],
  'Das ist ein Code für die Preise im Katalog, nicht für den Konfigurator.': ['This is a code for the prices in the catalogue, not for the planner.', "Ce code sert à débloquer les prix du catalogue, pas le planificateur."],
  'Das ist ein Code für den Konfigurator. Bitte dort eingeben.': ['This is a code for the planner. Please enter it there.', "Ce code sert au planificateur. Veuillez le saisir dans le planificateur."],
  'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.': ['The code has expired. Please request a new one.', "Le code a expiré. Veuillez en demander un nouveau."],
  'Dieser Code wurde bereits verwendet. Bitte fordern Sie einen neuen an.': ['This code has already been used. Please request a new one.', "Ce code a déjà été utilisé. Veuillez en demander un nouveau."],
  'Die Freischaltung ist gerade nicht möglich. Bitte später erneut versuchen.': ['Unlocking is not possible right now. Please try again later.', "Le déblocage n'est pas possible pour le moment. Veuillez réessayer plus tard."],
};
const meldung = (t: (de: string, en: string, fr: string) => string, m: string) => {
  const x = MELDUNGEN[m];
  return x ? t(m, x[0], x[1]) : m;
};

export const usePreise = () => {
  const t = useT();
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
      if (!ok) return daten.fehler ? meldung(t, daten.fehler) : t('Freischaltung fehlgeschlagen.', 'Unlocking failed.', 'Le déblocage a échoué.');
      setPreise(daten.preise);
      setKatalog(daten.katalog ?? null);
      if (daten.art === 'betreiber') { setBetreiber(code); merken(code); }
      return null;
    } catch {
      return t('Keine Verbindung. Bitte später erneut versuchen.', 'No connection. Please try again later.', 'Pas de connexion. Veuillez réessayer plus tard.');
    }
  }, [t]);

  // Nur für die Seite /codes: erzeugt einen Kundencode für eine Person bzw. liest die Liste aller Codes
  const kundencode = useCallback(async (zweck: 'preise' | 'konfigurator', fuer: string): Promise<{ code?: string; bis?: string; fehler?: string }> => {
    if (!betreiber) return { fehler: 'Nicht angemeldet.' };
    const { ok, daten } = await abfragen({ code: betreiber, neu: true, zweck, fuer }).catch(() => ({ ok: false, daten: {} as Record<string, string> }));
    return ok ? { code: daten.kundencode, bis: daten.bis } : { fehler: daten.fehler ?? 'Fehler, bitte erneut versuchen.' };
  }, [betreiber]);

  const codeliste = useCallback(async (): Promise<CodeZeile[] | null> => {
    if (!betreiber) return null;
    const { ok, daten } = await abfragen({ code: betreiber, liste: true }).catch(() => ({ ok: false, daten: {} as { codes?: CodeZeile[] } }));
    return ok ? daten.codes ?? [] : null;
  }, [betreiber]);

  const abmelden = useCallback(() => { merken(null); setBetreiber(null); setPreise(null); setKatalog(null); }, []);

  return { preise, katalog, freischalten, betreiber: !!betreiber, kundencode, codeliste, abmelden };
};

// Konfigurator: ohne Freischaltung nur Vorlagen ansehen. Frei mit Betreiber-Code (dauerhaft) oder K-Code (FREI_TAGE im Browser).
// ponytail: Sperre nur im Browser, wer die Seite zerlegt, kommt vorbei; Preise bleiben trotzdem auf dem Server
const FREI_BIS = 'aplus-konfigurator-frei-bis';
const lesen = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
export const konfiguratorFrei = () => Number(lesen(FREI_BIS) ?? 0) > Date.now() || !!lesen(SPEICHER);

export const useKonfiguratorFrei = () => {
  const t = useT();
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
      if (!ok) return daten.fehler ? meldung(t, daten.fehler) : t('Freischaltung fehlgeschlagen.', 'Unlocking failed.', 'Le déblocage a échoué.');
      if (daten.art === 'betreiber') merken(code);
      else try { localStorage.setItem(FREI_BIS, String(Date.now() + (daten.tage ?? 2) * 864e5)); } catch { /* dann nur bis zum Neuladen */ }
      setFrei(true);
      return null;
    } catch {
      return t('Keine Verbindung. Bitte später erneut versuchen.', 'No connection. Please try again later.', 'Pas de connexion. Veuillez réessayer plus tard.');
    }
  }, [t]);

  return { frei, freischalten };
};
