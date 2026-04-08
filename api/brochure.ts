import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body as { email: string };

  if (!email) {
    return res.status(400).json({ error: 'E-Mail-Adresse fehlt.' });
  }

  try {
    // 1. Benachrichtigung intern
    await resend.emails.send({
      from: FROM,
      to: 'info@aplusurbandesign.com',
      subject: `[Katalog-Anfrage] ${email}`,
      html: `<p>Neue Katalog-Anfrage von: <strong>${email}</strong></p>`,
    });

    // 2. E-Mail an Anfragenden mit Katalog-Link
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: 'info@aplusurbandesign.com',
      subject: 'Ihr A+ Urban Design Katalog',
      html: `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background-color:#E5E3DC;font-family:Arial,sans-serif;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#E5E3DC;">
<tr><td align="center" style="padding:32px 16px;">
<table border="0" cellpadding="0" cellspacing="0" width="600"
  style="max-width:600px;background-color:#F2F0EB;border:1px solid #D0CEC7;border-radius:4px;overflow:hidden;">
  <tr><td style="height:4px;background-color:#6B8F4A;"></td></tr>
  <tr><td style="background-color:#2C3530;padding:24px 40px;">
    <span style="font-family:Arial,sans-serif;font-size:22px;font-weight:800;color:#FFFFFF;text-transform:uppercase;">A+ Urban Design</span>
    <span style="display:block;font-size:10px;color:#6B8F4A;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">BETONFERTIGTEILE</span>
  </td></tr>
  <tr><td style="background-color:#2C3530;padding:0 40px 48px 40px;">
    <h1 style="margin:0 0 16px 0;font-size:44px;font-weight:800;color:#FFFFFF;line-height:1.0;letter-spacing:-1.5px;text-transform:uppercase;">
      Ihr <span style="color:#6B8F4A;">Katalog.</span>
    </h1>
    <p style="margin:0;font-size:15px;color:#A0A89E;border-left:3px solid #6B8F4A;padding-left:16px;line-height:1.6;">
      Technische Zeichnungen, Ausschreibungstexte und Referenzprojekte — alles in einer Datei.
    </p>
  </td></tr>
  <tr><td style="height:1px;background-color:#D0CEC7;"></td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="margin:0 0 24px 0;font-size:15px;color:#5A5A54;line-height:1.7;">
      vielen Dank für Ihr Interesse an unserem Produktkatalog. Laden Sie ihn hier direkt herunter:
    </p>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr><td style="background-color:#6B8F4A;border-radius:4px;">
        <a href="https://img.yumpu.com/1909210/1/500x640/skatepark-a-urban-design.jpg"
          style="display:inline-block;padding:14px 32px;font-family:Arial,sans-serif;font-size:12px;font-weight:800;color:#FFFFFF;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">
          Katalog herunterladen &rarr;
        </a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0 0;font-size:13px;color:#8A8A80;line-height:1.6;">
      Fragen zum Katalog oder zu einem konkreten Projekt?<br/>
      <a href="mailto:info@aplusurbandesign.com" style="color:#6B8F4A;font-weight:600;text-decoration:none;">info@aplusurbandesign.com</a>
      &nbsp;&middot;&nbsp;
      <a href="tel:+4915560090966" style="color:#6B8F4A;font-weight:600;text-decoration:none;">+49 155 600 909 66</a>
    </p>
  </td></tr>
  <tr><td style="height:1px;background-color:#D0CEC7;"></td></tr>
  <tr><td style="background-color:#2C3530;padding:24px 40px;">
    <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#FFFFFF;text-transform:uppercase;">A+ Urban Design</p>
    <p style="margin:0;font-size:11px;color:#6B7D6A;">Talstrasse 41 &middot; 70188 Stuttgart</p>
    <p style="margin:12px 0 0 0;font-size:10px;color:#4A5A4A;">
      <a href="https://www.aplusurbandesign.com/#/datenschutz" style="color:#6B8F4A;text-decoration:none;">Datenschutzerklärung</a>
      &nbsp;&middot;&nbsp;
      <a href="https://www.aplusurbandesign.com/#/impressum" style="color:#6B8F4A;text-decoration:none;">Impressum</a>
    </p>
  </td></tr>
  <tr><td style="height:3px;background-color:#6B8F4A;"></td></tr>
</table>
</td></tr></table>
</body></html>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
}
