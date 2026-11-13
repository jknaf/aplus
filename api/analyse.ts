import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createSign, timingSafeEqual } from 'node:crypto';

// Nur für /admin: Zahlen aus Google Analytics (GA4) und der Search Console, gelesen mit dem Dienstkonto „GSC Audit“.
// Der Schlüssel (GOOGLE_SA_KEY, JSON) bleibt auf dem Server; der Browser bekommt nur die Zahlen.
const GA_PROPERTY = '564281734';
const GSC_SITE = 'sc-domain:aplusurbandesign.com';

const gleich = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

const zugang = async (key: { client_email: string; private_key: string }) => {
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const jetzt = Math.floor(Date.now() / 1000);
  const kopf = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: key.client_email, aud: 'https://oauth2.googleapis.com/token', iat: jetzt, exp: jetzt + 3600,
    scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
  })}`;
  const sig = createSign('RSA-SHA256').update(kopf).sign(key.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${kopf}.${sig}` }),
  });
  const d = await r.json();
  if (!d.access_token) throw new Error('Google-Anmeldung fehlgeschlagen');
  return d.access_token as string;
};

const tag = (vor: number) => new Date(Date.now() - vor * 86400000).toISOString().slice(0, 10);

const ga = async (token: string, tage: number) => {
  const post = (body: object) => fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY}:runReport`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  }).then((r) => r.json());
  const zeitraum = [{ startDate: `${tage}daysAgo`, endDate: 'today' }];
  const [summe, quellen] = await Promise.all([
    post({ dateRanges: zeitraum, metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'averageSessionDuration' }] }),
    post({ dateRanges: zeitraum, dimensions: [{ name: 'sessionSourceMedium' }], metrics: [{ name: 'activeUsers' }], orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 10 }),
  ]);
  if (summe.error) throw new Error(summe.error.message);
  const w = summe.rows?.[0]?.metricValues?.map((m: { value: string }) => Number(m.value)) ?? [0, 0, 0];
  return {
    besucher: w[0], sitzungen: w[1], verweildauer: Math.round(w[2]),
    quellen: (quellen.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({ quelle: r.dimensionValues[0].value, besucher: Number(r.metricValues[0].value) })),
  };
};

const gsc = async (token: string, tage: number) => {
  const post = (body: object) => fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  }).then((r) => r.json());
  const zeitraum = { startDate: tag(tage), endDate: tag(0) };
  const [summe, begriffe, seiten] = await Promise.all([
    post(zeitraum),
    post({ ...zeitraum, dimensions: ['query'], rowLimit: 15 }),
    post({ ...zeitraum, dimensions: ['page'], rowLimit: 10 }),
  ]);
  if (summe.error) throw new Error(summe.error.message);
  type Zeile = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };
  const z = (r: Zeile) => ({ name: r.keys?.[0] ?? '', klicks: r.clicks, impressionen: r.impressions, ctr: r.ctr, position: r.position });
  const s: Zeile = summe.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return { ...z(s), begriffe: (begriffe.rows ?? []).map(z), seiten: (seiten.rows ?? []).map(z) };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Nur POST' });
  const soll = process.env.SKATE_PREIS_CODE?.trim().toUpperCase();
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  const code = String(body.code ?? '').trim().toUpperCase().replace(/\s+/g, '');
  if (!soll || !gleich(code, soll)) return res.status(401).json({ fehler: 'Nicht angemeldet.' });
  const tage = [7, 30, 90].includes(Number(body.tage)) ? Number(body.tage) : 30;

  let key;
  try { key = JSON.parse(process.env.GOOGLE_SA_KEY ?? ''); } catch { return res.status(503).json({ fehler: 'Google-Zugang ist auf dem Server nicht hinterlegt.' }); }
  try {
    const token = await zugang(key);
    const [g, s] = await Promise.allSettled([ga(token, tage), gsc(token, tage)]);
    return res.status(200).json({
      tage,
      ga: g.status === 'fulfilled' ? g.value : { fehler: String(g.reason?.message ?? g.reason) },
      gsc: s.status === 'fulfilled' ? s.value : { fehler: String(s.reason?.message ?? s.reason) },
    });
  } catch (e) {
    return res.status(502).json({ fehler: (e as Error).message });
  }
}
