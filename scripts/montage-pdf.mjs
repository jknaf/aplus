// Montageanleitung als PDF (DE/EN/FR) aus der Druckfassung der Seite: node scripts/montage-pdf.mjs <seitenpfad> <ziel-ordner> <name-de> <name-en> <name-fr>
// Braucht den laufenden Dev-Server (npm run dev -- --port 5239). Danach die PDFs nach R2 Montageanleitungen/ hochladen (api/anleitung.ts).
import puppeteer from 'puppeteer';
import path from 'node:path';

const [pfad, ziel, ...namen] = process.argv.slice(2);
const BASIS = process.env.BASIS ?? 'http://localhost:5239';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
for (const [i, lang] of ['de', 'en', 'fr'].entries()) {
  await page.goto(`${BASIS}${lang === 'de' ? '' : '/' + lang}${pfad}?druck`, { waitUntil: 'networkidle0', timeout: 60000 });
  // Schriften und Bilder abwarten; Bilder mit loading=lazy (Ablaufleiste, nicht im Druck) laden nie, darum nur die übrigen
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((b) => b.loading !== 'lazy').map((b) => b.complete || new Promise((ok) => { b.onload = b.onerror = ok; })));
  });
  await page.emulateMediaType('print');
  const datei = path.join(ziel, namen[i]);
  await page.pdf({ path: datei, preferCSSPageSize: true, printBackground: true });
  console.log('PDF', datei);
}
await browser.close();
