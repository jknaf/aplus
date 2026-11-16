import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { timingSafeEqual } from 'node:crypto';

// Nimmt die wöchentliche Prüfung bei google.de an (läuft auf dem A+-Rechner, siehe scripts/google-plaetze-agent.md).
// Gespeichert wird nur der letzte Stand; /api/analyse liest ihn für das Admin.
export const PFAD = 'google-plaetze/aktuell.json';

const gleich = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

const text = (v: unknown, max: number) => typeof v === 'string' && v.length > 0 && v.length <= max;

// Prüft die Daten von außen; gibt die bereinigte Liste zurück oder null
export const pruefen = (body: { stand?: unknown; ergebnisse?: unknown }) => {
  if (typeof body.stand !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.stand)) return null;
  const e = body.ergebnisse;
  if (!Array.isArray(e) || !e.length || e.length > 30) return null;
  const liste = e.map((z) => {
    if (!z || !text(z.begriff, 60)) return null;
    if (!(z.platz === null || (Number.isInteger(z.platz) && z.platz >= 1 && z.platz <= 100))) return null;
    if (!Array.isArray(z.davor) || z.davor.length > 10 || !z.davor.every((d: unknown) => text(d, 80))) return null;
    return { begriff: String(z.begriff).toLowerCase().trim(), platz: z.platz as number | null, davor: z.davor as string[] };
  });
  return liste.every(Boolean) ? { stand: body.stand, liste: liste as { begriff: string; platz: number | null; davor: string[] }[] } : null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Nur POST' });
  const soll = process.env.SKATE_PREIS_CODE?.trim().toUpperCase();
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}; } catch { return res.status(400).json({ fehler: 'Kein JSON.' }); }
  const code = String(body.code ?? '').trim().toUpperCase().replace(/\s+/g, '');
  if (!soll || !gleich(code, soll)) return res.status(401).json({ fehler: 'Nicht angemeldet.' });
  const daten = pruefen(body);
  if (!daten) return res.status(400).json({ fehler: 'Daten ungültig: stand (JJJJ-MM-TT) und ergebnisse [{ begriff, platz, davor }] nötig.' });
  try {
    await put(PFAD, JSON.stringify(daten), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' });
    return res.status(200).json({ ok: true, stand: daten.stand, begriffe: daten.liste.length });
  } catch (e) {
    return res.status(502).json({ fehler: (e as Error).message });
  }
}
