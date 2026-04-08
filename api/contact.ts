import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// Verwende verifizierte Domain oder Resend-Sandbox als Fallback
const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

// ─── Benachrichtigungs-E-Mail an info@ ───────────────────────────────────────
function notificationHtml(name: string, email: string, phone: string, message: string, projectType: string): string {
  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Neue Anfrage</title></head>
<body style="margin:0;padding:0;background-color:#E5E3DC;font-family:Arial,sans-serif;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#E5E3DC;">
<tr><td align="center" style="padding:32px 16px;">
<table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background-color:#F2F0EB;border:1px solid #D0CEC7;border-radius:4px;overflow:hidden;">
  <tr><td style="height:4px;background-color:#6B8F4A;"></td></tr>
  <tr><td style="background-color:#2C3530;padding:24px 40px;">
    <span style="font-family:Arial,sans-serif;font-size:20px;font-weight:800;color:#FFFFFF;text-transform:uppercase;letter-spacing:-0.5px;">A+ Urban Design</span>
    <span style="display:block;font-size:10px;color:#6B8F4A;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">Neue Website-Anfrage</span>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <h2 style="margin:0 0 24px 0;font-size:24px;font-weight:800;color:#2C3530;text-transform:uppercase;letter-spacing:-0.5px;">
      ${projectType}: <span style="color:#6B8F4A;">${name}</span>
    </h2>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#E5E3DC;border:1px solid #D0CEC7;border-radius:4px;margin-bottom:24px;">
      <tr><td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;">
        <span style="font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;font-family:'Courier New',monospace;">Name</span><br/>
        <strong style="font-size:14px;color:#2C3530;">${name}</strong>
      </td></tr>
      <tr><td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;">
        <span style="font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;font-family:'Courier New',monospace;">E-Mail</span><br/>
        <a href="mailto:${email}" style="font-size:14px;color:#6B8F4A;font-weight:600;">${email}</a>
      </td></tr>
      <tr><td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;">
        <span style="font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;font-family:'Courier New',monospace;">Telefon</span><br/>
        <span style="font-size:14px;color:#2C3530;">${phone || '—'}</span>
      </td></tr>
      <tr><td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;">
        <span style="font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;font-family:'Courier New',monospace;">Thema</span><br/>
        <strong style="font-size:14px;color:#6B8F4A;text-transform:uppercase;">${projectType}</strong>
      </td></tr>
      <tr><td style="padding:10px 20px;">
        <span style="font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;font-family:'Courier New',monospace;">Nachricht</span><br/>
        <span style="font-size:14px;color:#2C3530;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</span>
      </td></tr>
    </table>
    <a href="mailto:${email}?subject=Re: Ihre Anfrage bei A+ Urban Design (${projectType})" style="display:inline-block;padding:12px 28px;background-color:#6B8F4A;color:#FFFFFF;font-weight:800;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2px;border-radius:4px;">
      Direkt antworten →
    </a>
  </td></tr>
  <tr><td style="height:3px;background-color:#6B8F4A;"></td></tr>
</table>
</td></tr></table>
</body></html>`;
}

// ─── Autoresponder-E-Mail an Absender ────────────────────────────────────────
function autoresponderHtml(name: string, email: string, projectType: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Ihre Anfrage bei A+ Urban Design</title>
</head>
<body style="margin:0;padding:0;background-color:#E5E3DC;font-family:Arial,sans-serif;">

  <!-- Hidden preheader -->
  <div style="display:none;max-height:0;overflow:hidden;">Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen. — A+ Urban Design</div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#E5E3DC;">
  <tr><td align="center" style="padding:32px 16px;">
  <table border="0" cellpadding="0" cellspacing="0" width="600"
    style="max-width:600px;background-color:#F2F0EB;border:1px solid #D0CEC7;border-radius:4px;overflow:hidden;">

    <!-- Top accent line -->
    <tr><td style="height:4px;background-color:#6B8F4A;"></td></tr>

    <!-- Header -->
    <tr><td style="background-color:#2C3530;padding:24px 40px 20px 40px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td><span style="font-family:Arial,sans-serif;font-size:22px;font-weight:800;color:#FFFFFF;text-transform:uppercase;letter-spacing:-0.5px;">A+ Urban Design</span></td>
          <td align="right" style="vertical-align:middle;"><span style="font-family:'Courier New',monospace;font-size:10px;color:#6B8F4A;letter-spacing:3px;text-transform:uppercase;">BETONFERTIGTEILE</span></td>
        </tr>
      </table>
    </td></tr>

    <!-- Hero -->
    <tr><td style="background-color:#2C3530;padding:8px 40px 48px 40px;">
      <p style="margin:0 0 12px 0;font-family:'Courier New',monospace;font-size:11px;color:#6B8F4A;letter-spacing:4px;text-transform:uppercase;">Eingangsbestätigung</p>
      <h1 style="margin:0 0 20px 0;font-family:Arial,sans-serif;font-size:44px;font-weight:800;color:#FFFFFF;line-height:1.0;letter-spacing:-1.5px;text-transform:uppercase;">
        Danke für<br/>Ihre <span style="color:#6B8F4A;">Anfrage.</span>
      </h1>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#A0A89E;line-height:1.6;max-width:400px;border-left:3px solid #6B8F4A;padding-left:16px;">
        Ihre Nachricht ist bei uns eingegangen. Wir melden uns in Kürze bei Ihnen.
      </p>
    </td></tr>

    <!-- Divider -->
    <tr><td style="height:1px;background-color:#D0CEC7;"></td></tr>

    <!-- Body -->
    <tr><td style="padding:36px 40px 28px 40px;">
      <p style="margin:0 0 20px 0;font-family:Arial,sans-serif;font-size:15px;color:#2C3530;line-height:1.7;">
        Guten Tag <strong>${name}</strong>,
      </p>
      <p style="margin:0 0 28px 0;font-family:Arial,sans-serif;font-size:15px;color:#5A5A54;line-height:1.7;">
        vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Anfrage zum Thema
        <strong style="color:#2C3530;">${projectType}</strong> erhalten und
        werden uns so schnell wie möglich bei Ihnen melden.
      </p>

      <!-- Summary box -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%"
        style="background-color:#E5E3DC;border:1px solid #D0CEC7;border-radius:4px;margin-bottom:28px;">
        <tr><td style="padding:12px 20px;border-bottom:1px solid #D0CEC7;">
          <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B8F4A;letter-spacing:3px;text-transform:uppercase;">Ihre Eingaben</span>
        </td></tr>
        <tr>
          <td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;width:36%;vertical-align:top;">
            <span style="font-family:'Courier New',monospace;font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;">Name</span>
          </td>
          <td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;vertical-align:top;">
            <strong style="font-family:Arial,sans-serif;font-size:13px;color:#2C3530;">${name}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;vertical-align:top;">
            <span style="font-family:'Courier New',monospace;font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;">E-Mail</span>
          </td>
          <td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;vertical-align:top;">
            <span style="font-family:Arial,sans-serif;font-size:13px;color:#2C3530;">${email}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;vertical-align:top;">
            <span style="font-family:'Courier New',monospace;font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;">Thema</span>
          </td>
          <td style="padding:10px 20px;border-bottom:1px solid #D0CEC7;vertical-align:top;">
            <strong style="font-family:Arial,sans-serif;font-size:13px;color:#6B8F4A;text-transform:uppercase;">${projectType}</strong>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 20px;vertical-align:top;">
            <span style="font-family:'Courier New',monospace;font-size:10px;color:#8A8A80;text-transform:uppercase;letter-spacing:1px;">Nachricht</span>
          </td>
          <td style="padding:10px 20px;vertical-align:top;">
            <span style="font-family:Arial,sans-serif;font-size:13px;color:#5A5A54;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:14px;color:#5A5A54;">
        Sie können uns auch direkt erreichen:
      </p>
      <p style="margin:0 0 4px 0;">
        <a href="tel:+4915560090966" style="font-family:Arial,sans-serif;font-size:14px;color:#2C3530;font-weight:600;text-decoration:none;">&#x260F; +49 155 600 909 66</a>
      </p>
      <p style="margin:0;">
        <a href="mailto:info@aplusurbandesign.com" style="font-family:Arial,sans-serif;font-size:14px;color:#6B8F4A;font-weight:600;text-decoration:none;">&#x2709; info@aplusurbandesign.com</a>
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td style="padding:0 40px 40px 40px;">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr><td style="background-color:#6B8F4A;border-radius:4px;">
          <a href="https://www.aplusurbandesign.com"
            style="display:inline-block;padding:14px 32px;font-family:Arial,sans-serif;font-size:12px;font-weight:800;color:#FFFFFF;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">
            Zur Website &rarr;
          </a>
        </td></tr>
      </table>
    </td></tr>

    <!-- Divider -->
    <tr><td style="height:1px;background-color:#D0CEC7;"></td></tr>

    <!-- Footer -->
    <tr><td style="background-color:#2C3530;padding:24px 40px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td>
            <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#FFFFFF;text-transform:uppercase;letter-spacing:1px;">A+ Urban Design</p>
            <p style="margin:0 0 2px 0;font-family:Arial,sans-serif;font-size:11px;color:#6B7D6A;">Dipl.-Ing. Cüneyit Akcakoca &middot; Freier Architekt</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#6B7D6A;">Talstrasse 41 &middot; 70188 Stuttgart</p>
          </td>
          <td align="right" style="vertical-align:bottom;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;color:#3E4E43;letter-spacing:2px;text-transform:uppercase;">EST. 1999</p>
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:16px;padding-top:14px;border-top:1px solid #3E4E43;">
        <tr><td>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#4A5A4A;line-height:1.6;">
            Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.<br/>
            <a href="https://www.aplusurbandesign.com/datenschutz" style="color:#6B8F4A;text-decoration:none;">Datenschutzerklärung</a>
            &nbsp;&middot;&nbsp;
            <a href="https://www.aplusurbandesign.com/impressum" style="color:#6B8F4A;text-decoration:none;">Impressum</a>
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- Bottom accent -->
    <tr><td style="height:3px;background-color:#6B8F4A;"></td></tr>

  </table>
  </td></tr></table>
</body></html>`;
}

// ─── API Handler ──────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone = '', message, projectType = 'Sonstiges' } = req.body as {
    name: string;
    email: string;
    phone?: string;
    message: string;
    projectType?: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen.' });
  }

  // Notification geht immer an den verifizierten Account-Inhaber (knaf@hm.edu),
  // bis die Domain aplusurbandesign.com in Resend verifiziert ist.
  const NOTIFY_TO = process.env.NOTIFICATION_EMAIL ?? 'knaf@hm.edu';

  try {
    // 1. Benachrichtigung an Inhaber
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `[Anfrage] ${projectType}: ${name}`,
      html: notificationHtml(name, email, phone, message, projectType),
    });
  } catch (err) {
    console.error('Resend notification error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }

  try {
    // 2. Autoresponder an Absender (best-effort — schlägt fehl wenn Domain nicht verifiziert)
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: 'info@aplusurbandesign.com',
      subject: 'Ihre Anfrage bei A+ Urban Design — Wir melden uns bald',
      html: autoresponderHtml(name, email, projectType, message),
    });
  } catch (err) {
    // Autoresponder-Fehler nicht an den User weitergeben
    console.warn('Autoresponder konnte nicht gesendet werden (Domain nicht verifiziert?):', err);
  }

  return res.status(200).json({ success: true });
}
