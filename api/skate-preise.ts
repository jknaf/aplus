import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { list, put } from '@vercel/blob';
import ELEMENT_PREISE from './_skate-preise.js';
import PARK_PREISE from './_park-preise.js';
import { katalogLinks } from './_r2.js';

const SKATE_PREISE = { ...ELEMENT_PREISE, ...PARK_PREISE };

// Gibt die Nettopreise des Skate-Katalogs nur gegen einen gültigen Code heraus. Zwei Arten:
// - Betreiber-Code (Umgebungsvariable SKATE_PREIS_CODE): beliebig oft; mit {neu: true} erzeugt er Kundencodes.
// - Preis-Code (P-…): mit dem Betreiber-Code signiert, TAGE lang einlösbar, genau einmal.
//   Eingelöste Codes merkt sich Vercel Blob (eine leere Datei je Code); ein zweites put() auf denselben Pfad schlägt fehl.
// - Konfigurator-Code (K-…): wie der Preis-Code, schaltet aber nicht die Preise frei, sondern das Bearbeiten im Konfigurator
//   für FREI_TAGE (die Sperre selbst sitzt im Browser). Mit {neu: true, zweck: 'konfigurator', fuer} erzeugt.
// - Erzeugte Codes stehen als leere Datei ausgegeben/<P|K>/<Kern>/<fuer, base64url> im Blob; {liste: true} liefert sie mit Status.
// Mit den Preisen kommen zwei Links auf den Blätter-Katalog (PDF in Cloudflare R2), STUNDEN gültig, siehe _r2.ts.
const TAGE = 2;
const FREI_TAGE = 2;
const ABC = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'; // ohne 0/O, 1/I/L
const zuText = (b: Buffer) => { let n = BigInt('0x' + b.toString('hex')), s = ''; for (let i = 0; i < 15; i++) { s = ABC[Number(n % 31n)] + s; n /= 31n; } return s; };

const gleich = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};
const signatur = (soll: string, kern: string) => createHmac('sha256', soll).update(kern).digest('hex').slice(0, 8).toUpperCase();
const heute = () => Math.floor(Date.now() / 864e5);

// Kundencode: P-<15 Zeichen Zufall+Ablauftag>-<Signatur>; Ablauftag steckt im Kern, damit niemand ihn verlängern kann
// Beim K-Code steckt das Präfix in der Signatur, damit aus einem K- kein P-Code wird
const kundencode = (soll: string, art: 'P' | 'K') => {
  const kern = zuText(Buffer.concat([randomBytes(6), Buffer.from((heute() + TAGE).toString(16).padStart(6, '0'), 'hex')]));
  return { kern, code: `${art}-${kern}-${signatur(soll, art === 'K' ? 'K' + kern : kern)}` };
};
const tag = (t: number) => new Date(t * 864e5).toISOString().slice(0, 10);

// Alle erzeugten Codes mit Status; eingelöst = es gibt die Datei unter preis-codes/ bzw. konfigurator-codes/
const liste = async (soll: string) => {
  const alle = async (prefix: string) => {
    const out = [];
    let cursor: string | undefined;
    do { const r = await list({ prefix, cursor, limit: 1000 }); out.push(...r.blobs); cursor = r.hasMore ? r.cursor : undefined; } while (cursor);
    return out;
  };
  const [aus, preis, konf] = await Promise.all([alle('ausgegeben/'), alle('preis-codes/'), alle('konfigurator-codes/')]);
  const eingeloest = new Map([...preis, ...konf].map((b) => [b.pathname, b.uploadedAt]));
  return aus.map((b) => {
    const [, art, kern, wer] = b.pathname.split('/');
    const am = eingeloest.get(`${art === 'K' ? 'konfigurator-codes' : 'preis-codes'}/${kern}`);
    return {
      code: `${art}-${kern}-${signatur(soll, art === 'K' ? 'K' + kern : kern)}`, art: art === 'K' ? 'konfigurator' : 'preise',
      fuer: Buffer.from(wer ?? '', 'base64url').toString('utf8'), erstellt: b.uploadedAt, bis: tag(ablauf(kern)),
      eingeloest: am ?? null, abgelaufen: !am && ablauf(kern) < heute(),
    };
  }).sort((a, b) => +new Date(b.erstellt) - +new Date(a.erstellt));
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

  const konfigurator = body.zweck === 'konfigurator';
  if (gleich(code, soll)) {
    if (body.liste) {
      try { return res.status(200).json({ codes: await liste(soll) }); } catch { return res.status(503).json({ fehler: 'Liste gerade nicht lesbar.' }); }
    }
    if (body.neu) {
      const fuer = String(body.fuer ?? '').trim().slice(0, 120);
      if (!fuer) return res.status(400).json({ fehler: 'Bitte angeben, für wen der Code ist.' });
      const art = konfigurator ? 'K' : 'P';
      const { kern, code: neu } = kundencode(soll, art);
      try {
        await put(`ausgegeben/${art}/${kern}/${Buffer.from(fuer).toString('base64url')}`, '1', { access: 'private', addRandomSuffix: false });
      } catch {
        return res.status(503).json({ fehler: 'Der Code konnte nicht gespeichert werden. Bitte erneut versuchen.' });
      }
      return res.status(200).json({ kundencode: neu, tage: TAGE, bis: tag(ablauf(kern)) });
    }
    return res.status(200).json({ preise: SKATE_PREISE, art: 'betreiber', katalog: katalogLinks() });
  }

  const m = /^([PK])-([2-9A-HJKMNP-Z]{15})-([0-9A-F]{8})$/.exec(code);
  if (!m || !gleich(m[3], signatur(soll, m[1] === 'K' ? 'K' + m[2] : m[2]))) return res.status(401).json({ fehler: 'Der Code ist leider nicht gültig.' });
  if ((m[1] === 'K') !== konfigurator) {
    return res.status(401).json({ fehler: konfigurator ? 'Das ist ein Code für die Preise im Katalog, nicht für den Konfigurator.' : 'Das ist ein Code für den Konfigurator. Bitte dort eingeben.' });
  }
  if (ablauf(m[2]) < heute()) return res.status(401).json({ fehler: 'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.' });
  try {
    await put(`${konfigurator ? 'konfigurator-codes' : 'preis-codes'}/${m[2]}`, '1', { access: 'private', addRandomSuffix: false });
  } catch (e) {
    const name = (e as Error)?.constructor?.name ?? '';
    if (/exist|Precondition/i.test(name + String((e as Error)?.message))) return res.status(401).json({ fehler: 'Dieser Code wurde bereits verwendet. Bitte fordern Sie einen neuen an.' });
    return res.status(503).json({ fehler: 'Die Freischaltung ist gerade nicht möglich. Bitte später erneut versuchen.' });
  }
  if (konfigurator) return res.status(200).json({ art: 'konfigurator', tage: FREI_TAGE });
  return res.status(200).json({ preise: SKATE_PREISE, art: 'kunde', katalog: katalogLinks() });
}
