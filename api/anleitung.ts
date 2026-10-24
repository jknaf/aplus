import type { VercelRequest, VercelResponse } from '@vercel/node';
import { r2Link } from './_r2.js';

// Montageanleitungen als PDF zum Blättern: öffentlich, ohne Code. Die PDFs liegen im selben R2-Bucket wie der Katalog
// unter Montageanleitungen/; der Link gilt einige Stunden (siehe _r2.ts).
const DATEIEN: Record<string, Record<'de' | 'en' | 'fr', string>> = {
  grillplatz: {
    de: 'Montageanleitungen/A-Plus-Urban-Design_Montageanleitung-Grillplatz.pdf',
    en: 'Montageanleitungen/A-Plus-Urban-Design_Installation-Instructions-Barbecue-Area.pdf',
    fr: 'Montageanleitungen/A-Plus-Urban-Design_Notice-de-montage-Aire-de-barbecue.pdf',
  },
  umkleidekabine: {
    de: 'Montageanleitungen/A-Plus-Urban-Design_Montageanleitung-Umkleidekabine.pdf',
    en: 'Montageanleitungen/A-Plus-Urban-Design_Installation-Instructions-Changing-Cubicle.pdf',
    fr: 'Montageanleitungen/A-Plus-Urban-Design_Notice-de-montage-Cabine-de-change.pdf',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const name = String(req.query.name ?? '');
  const lang = req.query.lang === 'en' || req.query.lang === 'fr' ? req.query.lang : 'de';
  const datei = DATEIEN[name]?.[lang];
  if (!datei) return res.status(404).json({ fehler: 'unbekannt' });
  const ansehen = r2Link(datei);
  if (!ansehen) return res.status(503).json({ fehler: 'r2' });
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ansehen });
}
