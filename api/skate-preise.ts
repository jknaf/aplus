import type { VercelRequest, VercelResponse } from '@vercel/node';
import { timingSafeEqual } from 'node:crypto';
import SKATE_PREISE from './_skate-preise.js';

// Gibt die Nettopreise des Skate-Katalogs nur gegen den richtigen Freischaltcode heraus.
// Der Code liegt ausschließlich in der Umgebungsvariable SKATE_PREIS_CODE (Vercel), nie im Frontend.
const gleich = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Nur POST' });
  const soll = process.env.SKATE_PREIS_CODE;
  if (!soll) return res.status(503).json({ fehler: 'Preisfreischaltung ist noch nicht eingerichtet.' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  const code = String(body.code ?? '').trim().toUpperCase();
  if (!gleich(code, soll.trim().toUpperCase())) return res.status(401).json({ fehler: 'Der Code ist leider nicht gültig.' });
  return res.status(200).json({ preise: SKATE_PREISE });
}
