import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { put } from '@vercel/blob';
import SKATE_PREISE from './_skate-preise.js';

// Gibt die Nettopreise des Skate-Katalogs nur gegen einen gültigen Code heraus. Zwei Arten:
// - Betreiber-Code (Umgebungsvariable SKATE_PREIS_CODE): beliebig oft; mit {neu: true} erzeugt er Kundencodes.
// - Kundencode (K-…): mit dem Betreiber-Code signiert, 7 Tage gültig, genau einmal einlösbar.
//   Eingelöste Codes merkt sich Vercel Blob (eine leere Datei je Code); ein zweites put() auf denselben Pfad schlägt fehl.
const TAGE = 7;
const ABC = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // ohne 0/O, 1/I/L
const zuText = (b: Buffer) => { let n = BigInt('0x' + b.toString('hex')), s = ''; for (let i = 0; i < 15; i++) { s = ABC[Number(n % 31n)] + s; n /= 31n; } return s; };

const gleich = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};
const signatur = (soll: string, kern: string) => createHmac('sha256', soll).update(kern).digest('hex').slice(0, 8).toUpperCase();
const heute = () => Math.floor(Date.now() / 864e5);

// Kundencode: K-<15 Zeichen Zufall+Ablauftag>-<Signatur>; Ablauftag steckt im Kern, damit niemand ihn verlängern kann
const kundencode = (soll: string) => {
  const kern = zuText(Buffer.concat([randomBytes(6), Buffer.from((heute() + TAGE).toString(16).padStart(6, '0'), 'hex')]));
  return `K-${kern}-${signatur(soll, kern)}`;
};
const ablauf = (kern: string) => {
  let n = 0n;
  for (const c of kern) n = n * 31n + BigInt(ABC.indexOf(c));
  return Number(n & 0xffffffn);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Nur POST' });
  const soll = process.env.SKATE_PREIS_CODE?.trim().toUpperCase();
  if (!soll) return res.status(503).json({ fehler: 'Preisfreischaltung ist noch nicht eingerichtet.' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  const code = String(body.code ?? '').trim().toUpperCase().replace(/\s+/g, '');

  if (gleich(code, soll)) {
    if (body.neu) return res.status(200).json({ kundencode: kundencode(soll), tage: TAGE });
    return res.status(200).json({ preise: SKATE_PREISE, art: 'betreiber' });
  }

  const m = /^K-([2-9A-HJKMNP-Z]{15})-([0-9A-F]{8})$/.exec(code);
  if (!m || !gleich(m[2], signatur(soll, m[1]))) return res.status(401).json({ fehler: 'Der Code ist leider nicht gültig.' });
  if (ablauf(m[1]) < heute()) return res.status(401).json({ fehler: 'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.' });
  try {
    await put(`preis-codes/${m[1]}`, '1', { access: 'private', addRandomSuffix: false });
  } catch (e) {
    const name = (e as Error)?.constructor?.name ?? '';
    if (/exist|Precondition/i.test(name + String((e as Error)?.message))) return res.status(401).json({ fehler: 'Dieser Code wurde bereits verwendet. Bitte fordern Sie einen neuen an.' });
    return res.status(503).json({ fehler: 'Die Freischaltung ist gerade nicht möglich. Bitte später erneut versuchen.' });
  }
  return res.status(200).json({ preise: SKATE_PREISE, art: 'kunde' });
}
