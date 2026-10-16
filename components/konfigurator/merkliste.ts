// Verbindung Katalog → Konfigurator, ohne three.js zu laden.
// Der Katalog legt Elemente in eine Warteschlange, der Konfigurator setzt sie beim Öffnen in den Park.
export const PARK_SPEICHER = 'aplus-konfigurator-park';
export const NEU_SPEICHER = 'aplus-konfigurator-neu';

const lesen = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };

export const warteschlange = (): string[] => {
  try { return JSON.parse(lesen(NEU_SPEICHER) ?? '[]'); } catch { return []; }
};
export const leeren = () => { try { localStorage.removeItem(NEU_SPEICHER); } catch { /* ohne Speicher nichts zu tun */ } };

export const merken = (slug: string) => {
  try { localStorage.setItem(NEU_SPEICHER, JSON.stringify([...warteschlange(), slug])); } catch { /* ohne Speicher keine Merkliste */ }
  window.dispatchEvent(new Event('aplus-park'));
};

// Anzahl Elemente im gespeicherten Park plus Warteschlange
export const anzahlImPark = () => {
  let imPark = 0;
  const roh = lesen(PARK_SPEICHER);
  if (roh) {
    try { imPark = JSON.parse(atob(roh.replace(/-/g, '+').replace(/_/g, '/'))).t.length; } catch { imPark = 0; }
  }
  return imPark + warteschlange().length;
};
