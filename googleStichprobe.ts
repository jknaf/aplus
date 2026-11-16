// Stichprobe bei google.de (ohne persönliche Anpassung): wer steht bei den Kernbegriffen vor A+?
// Die Search Console nennt nur den eigenen Platz, nie die Konkurrenz. Darum diese Liste von Hand.
// Aktuell kommt die Liste jede Woche vom A+-Rechner (scripts/google-plaetze-agent.md, /api/google-plaetze).
// Diese feste Liste gilt nur, solange noch keine Wochenprüfung gespeichert ist, und legt die Suchbegriffe für die Search Console fest.
// Die Reihenfolge der Begriffe ist auch die Reihenfolge der Tabelle im Admin.
export const STICHPROBE_STAND = '2026-11-15';

// platz: Platz von A+ in der Stichprobe, null = nicht auf Seite 1. davor: wer vor A+ steht (bei null: die ersten Treffer).
export const STICHPROBE: { begriff: string; platz: number | null; davor: string[] }[] = [
  { begriff: 'skatepark hersteller', platz: 4, davor: ['schneestern.com', 'populaer.com', 'x-move.net'] },
  { begriff: 'skatepark beton', platz: 1, davor: [] },
  { begriff: 'skatepark bauen', platz: 7, davor: ['schneestern.com', 'sportstaettenrechner.de', 'radquartier.com', 'techramps.com', 'yamatoramps.de', 'populaer.com'] },
  { begriff: 'skatepark elemente', platz: 4, davor: ['populaer.com', 'sport-thieme.de', 'schneestern.com'] },
  { begriff: 'skatepark planung', platz: null, davor: ['radquartier.com', 'maierlandschaftsarchitektur.de', 'lndskt.de', 'iproconsult.com', 'galabau-blog.de'] },
  { begriff: 'skatepark kosten', platz: null, davor: ['sportstaettenrechner.de', 'schneestern.com', 'yamatoramps.de', 'skateanlagen-schuster.de', 'techramps.com'] },
  { begriff: 'skate bowl', platz: 2, davor: ['skatedeluxe.com'] },
  { begriff: 'pumptrack hersteller', platz: 4, davor: ['pumptrack.de', 'radquartier.com', 'schneestern.com'] },
  { begriff: 'pumptrack bauen', platz: null, davor: ['pumptrack.info', 'redbull.com', 'radquartier.com', 'sportstaettenrechner.de', 'schneestern.com'] },
  { begriff: 'umkleidekabine outdoor', platz: 5, davor: ['amazon.de', 'schindler-shop.de', 'pinterest.com', 'peddy-shield.de'] },
  { begriff: 'umkleideschnecke', platz: 1, davor: [] },
  { begriff: 'grillplatz kaufen', platz: null, davor: ['hansagarten24.de', 'gartenhausfabrik.de', 'gartenhaus-king.de', 'butenas.de', 'kleinanzeigen.de'] },
  { begriff: 'eishockey bande', platz: null, davor: ['iss4u.de', 'zueko.de', 'engo.it', 'ast-icerink-solarabsorber.com', 'de.wikipedia.org'] },
];
