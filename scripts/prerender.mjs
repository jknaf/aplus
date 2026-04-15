/**
 * A+ Urban Design — Puppeteer Prerender Script
 *
 * Rendert die gebaute SPA (dist/) einmal pro Route in einem Headless-Chromium
 * und speichert das fertige HTML als statische Datei, damit Googlebot den
 * vollen Inhalt (inkl. PageShell Meta-Tags, Canonical, JSON-LD) ohne
 * JavaScript-Ausführung ausliefert bekommt.
 *
 * Erzeugt zusätzlich eine korrekte sitemap.xml (Produktionsdomain, keine
 * Hash-Routen).
 *
 * Usage: node scripts/prerender.mjs   (läuft automatisch via `npm run build`)
 */

import { createServer } from 'http';
import sirv from 'sirv';
import puppeteer from 'puppeteer';
import { writeFile, mkdir, copyFile, unlink } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const BASE_URL = 'https://www.aplusurbandesign.com';
const PORT = 4321;

// --- Routen-Quelle: muss mit App.tsx und constants.ts synchron sein ---
const STATIC_ROUTES = [
  '/',
  '/projekte',
  '/ueber-uns',
  '/kontakt',
  '/planung',
  '/referenzen-presse',
  '/produkte',
  '/produkte/skate-anlagen',
  '/produkte/pumptrack-beton',
  '/produkte/bmx-anlagen',
  '/produkte/hockey-banden',
  '/produkte/grillstelle-beton',
  '/produkte/umkleidekabine-beton',
  '/produkte/ueberdachung-beton',
  '/impressum',
  '/datenschutz',
];

const PROJECT_IDS = [
  'modularer-beton-skatepark',
  'beton-pumptrack',
  'grillplatz-stadtpark',
  'inlinehockey-feld',
  'umkleide-freibad',
  'bastion-skatepark-alba-iulia',
];

const PROJECT_ROUTES = PROJECT_IDS.map((id) => `/projekte/${id}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...PROJECT_ROUTES];

// --- Sitemap-Metadaten pro Route ---
const sitemapMetaFor = (route) => {
  if (route === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (route === '/projekte') return { changefreq: 'weekly', priority: '0.9' };
  if (route.startsWith('/projekte/')) return { changefreq: 'monthly', priority: '0.7' };
  if (route.startsWith('/produkte/')) return { changefreq: 'monthly', priority: '0.8' };
  if (route === '/produkte') return { changefreq: 'monthly', priority: '0.9' };
  if (route === '/ueber-uns' || route === '/kontakt') return { changefreq: 'monthly', priority: '0.9' };
  if (route === '/planung') return { changefreq: 'monthly', priority: '0.8' };
  if (route === '/referenzen-presse') return { changefreq: 'monthly', priority: '0.7' };
  if (route === '/impressum' || route === '/datenschutz') return { changefreq: 'yearly', priority: '0.3' };
  return { changefreq: 'monthly', priority: '0.5' };
};

// --- Hilfsfunktionen ---
const writeHtml = async (route, html) => {
  // `/` → dist/index.html (überschreibt Vite-Original mit prerendertem)
  // `/foo/bar` → dist/foo/bar/index.html
  const rel = route === '/' ? 'index.html' : join(route.slice(1), 'index.html');
  const target = join(DIST_DIR, rel);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  return rel;
};

const buildSitemap = (lastmod) => {
  const urls = ALL_ROUTES.map((r) => {
    const { changefreq, priority } = sitemapMetaFor(r);
    return `  <url>
    <loc>${BASE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

// --- Haupt-Workflow ---
const main = async () => {
  console.log(`\n[prerender] Starte Static-Server für ${DIST_DIR} auf Port ${PORT}`);

  // Sauberes Vite-Template sichern: sirv liefert das als SPA-Fallback,
  // damit die fortlaufend geschriebenen prerendered Dateien nicht als
  // Template für nachfolgende Routen missbraucht werden.
  const TEMPLATE_FILE = '__template.html';
  await copyFile(join(DIST_DIR, 'index.html'), join(DIST_DIR, TEMPLATE_FILE));

  const serve = sirv(DIST_DIR, { single: TEMPLATE_FILE, dev: false, etag: false });
  const server = createServer(serve);
  await new Promise((resolve) => server.listen(PORT, resolve));

  // Vercel-Linux-Container fehlen System-Libs fuer das Puppeteer-Standard-Chromium.
  // Deshalb auf Vercel den Lambda-optimierten @sparticuz/chromium laden, lokal
  // weiterhin das gebundelte Puppeteer-Chromium nutzen.
  const isVercel = !!process.env.VERCEL;
  let launchOptions;
  if (isVercel) {
    const { default: chromium } = await import('@sparticuz/chromium');
    launchOptions = {
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
    console.log(`[prerender] Browser starten (Vercel via @sparticuz/chromium)…`);
  } else {
    launchOptions = {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };
    console.log(`[prerender] Browser starten (lokal via puppeteer)…`);
  }
  const browser = await puppeteer.launch(launchOptions);

  const errors = [];
  let ok = 0;

  for (const route of ALL_ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });

      // Warten bis PageShell useEffect das Canonical für DIESE konkrete Route
      // gesetzt hat (nicht bloss ein fremdes vom Template-HTML geerbtes).
      await page.waitForFunction(
        (expectedPath) => {
          const canonical = document.querySelector('link[rel="canonical"]');
          if (!canonical) return false;
          const href = canonical.getAttribute('href') || '';
          // Canonical endet mit genau diesem Pfad (trailing slash toleriert fuer '/')
          const matches = expectedPath === '/'
            ? /\/$/.test(href)
            : href.endsWith(expectedPath);
          const hasTitle = document.title && document.title.length > 5;
          return matches && hasTitle;
        },
        { timeout: 15000, polling: 100 },
        route
      );

      // Kurzer Puffer für nachträgliche Schema-Injektionen
      await new Promise((r) => setTimeout(r, 500));

      const html = await page.content();
      const rel = await writeHtml(route, html);
      console.log(`  ✓ ${route.padEnd(50)} → dist/${rel}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${route} — ${err.message}`);
      errors.push({ route, message: err.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  // Template-Backup wegräumen
  await unlink(join(DIST_DIR, TEMPLATE_FILE)).catch(() => {});

  // Sitemap
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = buildSitemap(today);
  await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`\n[prerender] sitemap.xml mit ${ALL_ROUTES.length} URLs geschrieben.`);

  console.log(`\n[prerender] Fertig: ${ok}/${ALL_ROUTES.length} Routen prerendered.`);
  if (errors.length) {
    console.error(`[prerender] ${errors.length} Fehler:`);
    errors.forEach((e) => console.error(`  - ${e.route}: ${e.message}`));
    process.exit(1);
  }
};

main().catch((err) => {
  console.error('[prerender] Fataler Fehler:', err);
  process.exit(1);
});
