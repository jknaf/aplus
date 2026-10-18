import { createHash, createHmac } from 'node:crypto';

// Zeitlich begrenzter Link auf den Katalog (PDF) im privaten Cloudflare-R2-Bucket, S3-Signatur V4 als Query-String.
// Umgebung: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_KATALOG (Dateiname im Bucket, deutsch),
// R2_KATALOG_EN und R2_KATALOG_FR (Dateinamen der englischen und französischen Fassung; fehlen sie, gilt die deutsche).
const STUNDEN = 6;
const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const hmac = (k: Buffer | string, s: string) => createHmac('sha256', k).update(s).digest();
const enc = (s: string) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

export const r2Link = (datei: string | undefined, download = false, jetzt = new Date()): string | null => {
  const { R2_ACCOUNT_ID: konto, R2_ACCESS_KEY_ID: id, R2_SECRET_ACCESS_KEY: geheim, R2_BUCKET: bucket } = process.env;
  if (!konto || !id || !geheim || !bucket || !datei) return null;
  const host = `${konto}.r2.cloudflarestorage.com`;
  const pfad = `/${bucket}/${datei.split('/').map(enc).join('/')}`;
  const zeit = jetzt.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const tag = zeit.slice(0, 8);
  const bereich = `${tag}/auto/s3/aws4_request`;
  const q: Record<string, string> = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${id}/${bereich}`,
    'X-Amz-Date': zeit,
    'X-Amz-Expires': String(STUNDEN * 3600),
    'X-Amz-SignedHeaders': 'host',
  };
  if (download) q['response-content-disposition'] = `attachment; filename="${datei.split('/').pop()}"`;
  const query = Object.keys(q).sort().map((k) => `${enc(k)}=${enc(q[k])}`).join('&');
  const anfrage = ['GET', pfad, query, `host:${host}\n`, 'host', 'UNSIGNED-PAYLOAD'].join('\n');
  const text = ['AWS4-HMAC-SHA256', zeit, bereich, sha(anfrage)].join('\n');
  const schluessel = ['auto', 's3', 'aws4_request'].reduce<Buffer>((k, s) => hmac(k, s), hmac('AWS4' + geheim, tag));
  return `https://${host}${pfad}?${query}&X-Amz-Signature=${hmac(schluessel, text).toString('hex')}`;
};

const links = (datei: string | undefined) => {
  const ansehen = r2Link(datei);
  return ansehen ? { ansehen, download: r2Link(datei, true)! } : null;
};

// Je Sprache ein Linkpaar; ohne eigene Datei für EN oder FR bekommt die Sprache die deutsche Fassung.
export const katalogLinks = () => {
  const de = links(process.env.R2_KATALOG);
  return { de, en: links(process.env.R2_KATALOG_EN) ?? de, fr: links(process.env.R2_KATALOG_FR) ?? de };
};
