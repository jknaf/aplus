import type { VercelRequest, VercelResponse } from '@vercel/node';

// Anfrage aus dem Skatepark-Konfigurator: Mail an A+ mit Stückliste (CSV), Draufsicht (JPG) und Park-Link,
// dazu eine Eingangsbestätigung an den Kunden. Versand über die Resend-API.
// Umgebung (Vercel): RESEND_API_KEY, RESEND_FROM_EMAIL, KONFIGURATOR_EMPFAENGER (sonst NOTIFICATION_EMAIL).

interface Zeile { code: string; name: string; menge: number; kg: number | null; auto: boolean }

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const csvZelle = (x: unknown) => `"${String(x ?? '').replace(/"/g, '""')}"`;

const resend = async (key: string, mail: Record<string, unknown>) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(mail),
  });
  const d = await res.json().catch(() => ({}));
  // Resend antwortet bei Fehlern teils mit Status 200 und einem error-Feld: beides prüfen
  if (!res.ok || d.error) throw new Error(d.error?.message ?? d.message ?? `Resend ${res.status}`);
};

const rahmen = (titel: string, inhalt: string) => `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:24px;background:#E5E3DC;font-family:Arial,sans-serif;color:#2C3530;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#F2F0EB;border:1px solid #D0CEC7;">
<tr><td style="background:#2C3530;padding:20px 32px;color:#fff;font-weight:800;text-transform:uppercase;font-size:18px;">A+ Urban Design
<span style="display:block;font-size:10px;color:#9fc27a;letter-spacing:3px;margin-top:4px;">${esc(titel)}</span></td></tr>
<tr><td style="padding:28px 32px;font-size:14px;line-height:1.6;">${inhalt}</td></tr></table></body></html>`;

const tabelle = (zeilen: Zeile[]) => `<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
<tr style="background:#E5E3DC;text-align:left;"><th>Code</th><th>Bezeichnung</th><th style="text-align:right;">Menge</th></tr>
${zeilen.map((z) => `<tr style="border-bottom:1px solid #D0CEC7;"><td style="font-family:monospace;">${esc(z.code)}</td><td>${esc(z.name)}${z.auto ? ' <span style="color:#6B8F4A;font-size:11px;">(automatisch ergänzt)</span>' : ''}</td><td style="text-align:right;font-weight:bold;">${esc(z.menge)}</td></tr>`).join('')}
</table>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Nur POST' });
  const key = process.env.RESEND_API_KEY;
  const von = process.env.RESEND_FROM_EMAIL;
  const an = process.env.KONFIGURATOR_EMPFAENGER || process.env.NOTIFICATION_EMAIL;
  if (!key || !von || !an) return res.status(503).json({ fehler: 'Der Versand von Anfragen ist noch nicht eingerichtet.' });

  let body: Record<string, any>;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}; } catch { return res.status(400).json({ fehler: 'Ungültige Anfrage.' }); }
  const k = body.kontakt ?? {};
  if (k.firma2) return res.status(200).json({ ok: true }); // Honigtopf: Bots bekommen „ok“, es wird nichts gesendet
  const kontakt = {
    name: text(k.name, 120), organisation: text(k.organisation, 160), email: text(k.email, 160), telefon: text(k.telefon, 60),
    ort: text(k.ort, 160), flaeche: text(k.flaeche, 40), untergrund: text(k.untergrund, 40), zeitraum: text(k.zeitraum, 80), nachricht: text(k.nachricht, 3000),
  };
  if (!kontakt.name || !kontakt.ort || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontakt.email) || !k.ok) {
    return res.status(400).json({ fehler: 'Bitte Name, E-Mail, Ort und die Einwilligung angeben.' });
  }
  const zeilen: Zeile[] = (Array.isArray(body.zeilen) ? body.zeilen : []).slice(0, 300).map((z: any) => ({
    code: text(z.code, 30), name: text(z.name, 120), menge: Math.max(0, Math.min(999, Number(z.menge) || 0)), kg: Number(z.kg) || null, auto: !!z.auto,
  }));
  if (!zeilen.length) return res.status(400).json({ fehler: 'Die Stückliste ist leer.' });
  const hinweise: string[] = (Array.isArray(body.hinweise) ? body.hinweise : []).slice(0, 50).map((h: unknown) => text(h, 200));
  const link = text(body.link, 8000);
  const linkOk = /^https?:\/\/[^\s]+\/konfigurator#p=[A-Za-z0-9_-]+$/.test(link);
  const f = body.flaeche ?? {};
  const flaeche = `${Number(f.l) || 0} × ${Number(f.b) || 0} m, ${f.angeboescht ? 'angeböscht' : 'freistehend'}`;
  const bild = typeof body.bild === 'string' && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(body.bild) && body.bild.length < 3_000_000 ? body.bild.split(',')[1] : null;
  const anzahl = zeilen.filter((z) => !z.auto).reduce((s, z) => s + z.menge, 0);

  const csv = ['Code;Bezeichnung;Menge;Gewicht kg;Automatisch ergänzt', ...zeilen.map((z) => [z.code, z.name, z.menge, z.kg ?? '', z.auto ? 'ja' : ''].map(csvZelle).join(';'))].join('\r\n');
  const angaben = [
    ['Name', kontakt.name], ['Organisation', kontakt.organisation], ['E-Mail', kontakt.email], ['Telefon', kontakt.telefon],
    ['Ort der Anlage', kontakt.ort], ['Fläche', `${flaeche}; Fahrfläche ${kontakt.flaeche}; Untergrund ${kontakt.untergrund}`], ['Zeitraum', kontakt.zeitraum],
  ].filter(([, v]) => v).map(([l, v]) => `<tr><td style="color:#8A8A80;padding:3px 12px 3px 0;white-space:nowrap;">${esc(l)}</td><td>${esc(v)}</td></tr>`).join('');

  const anA = rahmen('Anfrage aus dem Konfigurator', `
    <h2 style="margin:0 0 16px;font-size:20px;text-transform:uppercase;">Skatepark mit ${anzahl} Elementen: ${esc(kontakt.organisation || kontakt.name)}</h2>
    <table cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:16px;">${angaben}</table>
    ${kontakt.nachricht ? `<p style="background:#E5E3DC;padding:12px;white-space:pre-wrap;">${esc(kontakt.nachricht)}</p>` : ''}
    ${linkOk ? `<p><a href="${esc(link)}" style="color:#6B8F4A;font-weight:bold;">Park im Konfigurator öffnen</a> (zeigt genau diesen Stand, Änderungen ergeben einen neuen Link)</p>` : ''}
    ${hinweise.length ? `<p style="background:#FEF3C7;padding:12px;"><strong>Offene Hinweise:</strong><br/>${hinweise.map(esc).join('<br/>')}</p>` : '<p>Keine offenen Hinweise.</p>'}
    ${bild ? '<p>Draufsicht im Anhang.</p>' : ''}
    ${tabelle(zeilen)}
    <p style="font-size:12px;color:#8A8A80;margin-top:16px;">Stückliste auch als CSV im Anhang. Antworten geht direkt an den Kunden.</p>`);

  try {
    await resend(key, {
      from: von, to: [an], reply_to: kontakt.email,
      subject: `Konfigurator-Anfrage: ${kontakt.organisation || kontakt.name}, ${kontakt.ort}`,
      html: anA,
      attachments: [
        { filename: 'Stueckliste.csv', content: Buffer.from('﻿' + csv, 'utf8').toString('base64') },
        ...(bild ? [{ filename: 'Draufsicht.jpg', content: bild }] : []),
      ],
    });
  } catch (e) {
    console.error('[konfigurator-anfrage]', e);
    return res.status(502).json({ fehler: 'Die Anfrage konnte gerade nicht gesendet werden. Bitte später erneut versuchen.' });
  }

  // Bestätigung an den Kunden; scheitert sie, ist die Anfrage trotzdem angekommen
  try {
    await resend(key, {
      from: von, to: [kontakt.email], reply_to: an,
      subject: 'Ihre Skatepark-Anfrage bei A+ Urban Design',
      html: rahmen('Eingangsbestätigung', `
        <p>Guten Tag ${esc(kontakt.name)},</p>
        <p>vielen Dank für Ihre Anfrage. Wir haben Ihren Skatepark mit ${anzahl} Elementen erhalten und melden uns mit einem Angebot.</p>
        ${linkOk ? `<p><a href="${esc(link)}" style="color:#6B8F4A;font-weight:bold;">Ihren Park im Konfigurator öffnen</a></p>` : ''}
        ${tabelle(zeilen)}
        <p style="margin-top:20px;">Mit freundlichen Grüßen<br/>A+ Urban Design</p>`),
    });
  } catch (e) {
    console.error('[konfigurator-anfrage] Bestätigung', e);
  }
  return res.status(200).json({ ok: true });
}
