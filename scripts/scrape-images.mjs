/**
 * A+ Urban Design — Bild & Video Download Script (v2 - korrigierte URLs)
 * Usage: node scripts/scrape-images.mjs
 */
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const BASE_URL = 'https://www.aplusurbandesign.com';

const IMAGE_CATALOG = [
  // ── BRANDING ──
  { url: '/.cm4all/uproc.php/0/A%2B/.A_Urbam_Design-Logo_Trans600x470.png/picture-1200?_=193723cb368', local: 'images/branding/aplus-logo-transparent.png' },

  // ── SKATE-BOWLS (6 images from /skate-bowl/ page) ──
  { url: '/.cm4all/uproc.php/0/BOWLS/.1-Skate-Bowl_A%2B-756x430.jpg/picture-2600?_=193735e8e88', local: 'images/skate-bowls/skate-bowl-01.jpg' },
  { url: '/.cm4all/uproc.php/0/BOWLS/.2-Skate-Bowl_A%2B-756x430.jpg/picture-2600?_=193735e8e88', local: 'images/skate-bowls/skate-bowl-02.jpg' },
  { url: '/.cm4all/uproc.php/0/BOWLS/.3-Skate-Pool_A%2B-756x430/picture-2600?_=193735e8aa0', local: 'images/skate-bowls/skate-pool-03.jpg' },
  { url: '/.cm4all/uproc.php/0/BOWLS/.4-Skate-Pool_A%2B-756x430.jpg/picture-2600?_=193735e8aa0', local: 'images/skate-bowls/skate-pool-04.jpg' },
  { url: '/.cm4all/uproc.php/0/BOWLS/.5-Skate-Bowl-Pool_A%2B-756x430/picture-2600?_=193735e86b8', local: 'images/skate-bowls/skate-bowl-pool-05.jpg' },
  { url: '/.cm4all/uproc.php/0/BOWLS/.6-Skate-Bowls-Pools_A%2B-756x430.jpg/picture-2600?_=193735e82d0', local: 'images/skate-bowls/skate-bowls-pools-06.jpg' },

  // ── SKATE-PIPES (4 images from /skate-pipes/ page) ──
  { url: '/.cm4all/uproc.php/0/PIPES/.1-Skate-Pipe_A%2B-756x430.jpg/picture-2600?_=193734a9158', local: 'images/skate-pipes/skate-pipe-01.jpg' },
  { url: '/.cm4all/uproc.php/0/PIPES/.2-Skate-Pipe_A%2B-756x430.jpg/picture-2600?_=193734a8d70', local: 'images/skate-pipes/skate-pipe-02.jpg' },
  { url: '/.cm4all/uproc.php/0/PIPES/.3-Skate-Pipe-Bank_A%2B-756x430.jpg/picture-2600?_=193734a8988', local: 'images/skate-pipes/skate-pipe-bank-03.jpg' },
  { url: '/.cm4all/uproc.php/0/PIPES/.4-Skate-Pipe-Kombi_A%2B-756x430.jpg/picture-2600?_=193734a85a0', local: 'images/skate-pipes/skate-pipe-kombi-04.jpg' },

  // ── SKATEPARKS (4 images from /skate-park/ page) ──
  { url: '/.cm4all/uproc.php/0/SKATEPARK/.1-Skate-Park_A%2B-756x430.jpg/picture-2600?_=19373432300', local: 'images/skateparks/skatepark-01.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEPARK/.2-Skate-Park_A%2B-756x430.jpg/picture-2600?_=19373431f18', local: 'images/skateparks/skatepark-02.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEPARK/.3-Skatepark_A%2B-756x430.jpg/picture-2600?_=19373431b30', local: 'images/skateparks/skatepark-03.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEPARK/.4-Skatepark_A%2B-756x430.jpg/picture-2600?_=19373431b30', local: 'images/skateparks/skatepark-04.jpg' },

  // ── SKATE-ANLAGEN (4 images from /skate-anlagen/ page) ──
  { url: '/.cm4all/uproc.php/0/SKATEANLAGEN/.1-Skate-Anlage_A%2B-756x430.jpg/picture-2600?_=193733bdbb8', local: 'images/skate-anlagen/skate-anlage-01.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEANLAGEN/.2-Skate-Anlagen_A%2B-756x430.jpg/picture-2600?_=193733bd7d0', local: 'images/skate-anlagen/skate-anlagen-02.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEANLAGEN/.3-Skateanlage_A%2B-756x430.jpg/picture-2600?_=193733bd7d0', local: 'images/skate-anlagen/skateanlage-03.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEANLAGEN/.4-Skateanlagen_A%2B-756x430.jpg/picture-2600?_=193733bd3e8', local: 'images/skate-anlagen/skateanlagen-04.jpg' },

  // ── SKATE-ELEMENTE (4 images from /skate-element-e/ page - CORRECTED filenames) ──
  { url: '/.cm4all/uproc.php/0/SKATEELEMENTE/.1-Skate-Elemente-Beton_A%2B-756x430.jpg/picture-2600?_=193736823a8', local: 'images/skate-elemente/skate-elemente-beton-01.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEELEMENTE/.2-Skate-Elemente-Beton_A%2B-756x430.jpg/picture-2600?_=19373682790', local: 'images/skate-elemente/skate-elemente-beton-02.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEELEMENTE/.3-Skateelemente-Beton_A%2B-756x430.jpg/picture-2600?_=193736823a8', local: 'images/skate-elemente/skateelemente-beton-03.jpg' },
  { url: '/.cm4all/uproc.php/0/SKATEELEMENTE/.4-Skate-Module-Beton_A%2B-756x430.jpg/picture-2600?_=19373681fc0', local: 'images/skate-elemente/skate-module-beton-04.jpg' },

  // ── PUMPTRACK (5 images) ──
  { url: '/.cm4all/uproc.php/0/A%2B/.2-Pump-Track_A%2B-756x430.jpg/picture-2600?_=19386fba8e0', local: 'images/pumptrack/pumptrack-01.jpg' },
  { url: '/.cm4all/uproc.php/0/PUMPTRACK/.1-Pumptrack-Beton-Elemente_A%2B-756x430.jpg/picture-2600?_=193820c8d68', local: 'images/pumptrack/pumptrack-beton-elemente-01.jpg' },
  { url: '/.cm4all/uproc.php/0/PUMPTRACK/.2-Pumptrack-Beton-Elemente_A%2B-756x430.jpg/picture-2600?_=193820c56b8', local: 'images/pumptrack/pumptrack-beton-elemente-02.jpg' },
  { url: '/.cm4all/uproc.php/0/PUMPTRACK/.3-Pump-Track-Beton-Module_A%2B-756x430.jpg/picture-2600?_=193820c4b00', local: 'images/pumptrack/pumptrack-beton-module-03.jpg' },
  { url: '/.cm4all/uproc.php/0/PUMPTRACK/.4-Pump-Track-Beton-Module_A%2B-756x430.jpg/picture-2600?_=193820c3b60', local: 'images/pumptrack/pumptrack-beton-module-04.jpg' },

  // ── HOCKEY (4 images) ──
  { url: '/.cm4all/uproc.php/0/HOCKEY/.Roll-Hockey-Bande_A%2B.jpg/picture-2600?_=1938211b1d0', local: 'images/hockey/roll-hockey-bande.jpg' },
  { url: '/.cm4all/uproc.php/0/HOCKEY/.1-Hockey-Einfassung_A%2B-756x430.jpg/picture-2600?_=1938211ec68', local: 'images/hockey/hockey-einfassung-01.jpg' },
  { url: '/.cm4all/uproc.php/0/HOCKEY/.2-Inline-Hockey-Bande_A%2B.jpg/picture-2600?_=1938211e880', local: 'images/hockey/inline-hockey-bande-02.jpg' },
  { url: '/.cm4all/uproc.php/0/HOCKEY/.3-Inline-Hockey-Bande_A%2B-756x430.jpg/picture-2600?_=1938211e498', local: 'images/hockey/inline-hockey-bande-03.jpg' },

  // ── GRILL (3 images - .5 does not exist, replaced with background) ──
  { url: '/.cm4all/uproc.php/0/GRILL/.1-Grill-Platz-Beton_A%2B-756x430.jpg/picture-2600?_=193821b3f20', local: 'images/grill/grill-platz-01.jpg' },
  { url: '/.cm4all/uproc.php/0/GRILL/.2-Grill-Stelle-Beton_A%2B-756x430.jpg/picture-2600?_=193821b3750', local: 'images/grill/grill-stelle-02.jpg' },
  { url: '/.cm4all/uproc.php/0/GRILL/.grillstelle_background.jpg/picture-2600', local: 'images/grill/grillstelle-background.jpg' },

  // ── UMKLEIDE (5 images incl. panorama) ──
  { url: '/.cm4all/uproc.php/0/UMKLEIDE/.1-Umkleide-Kabine_Beton_Freibad_A%2B-756x430.jpg/picture-2600?_=19382189f40', local: 'images/umkleide/umkleide-kabine-01.jpg' },
  { url: '/.cm4all/uproc.php/0/UMKLEIDE/.2-Umkleide-Kabine-Beton_Freibad_A%2B-756x430.jpg/picture-2600?_=19382189388', local: 'images/umkleide/umkleide-kabine-02.jpg' },
  { url: '/.cm4all/uproc.php/0/UMKLEIDE/.3-Umkleidekabine-Freibad-Beton%2B-756x430.jpg/picture-2600?_=19382188bb8', local: 'images/umkleide/umkleidekabine-freibad-03.jpg' },
  { url: '/.cm4all/uproc.php/0/UMKLEIDE/.4-Umkleidekabine-Schnecke_Freibad_A%2B-756x430.jpg/picture-2600?_=19382187c18', local: 'images/umkleide/umkleidekabine-schnecke-04.jpg' },
  { url: '/.cm4all/uproc.php/0/UMKLEIDE/.20210618_092754auss3%20-erweitert%20web.jpg/picture-2600?_=19782d411cf', local: 'images/umkleide/umkleide-panorama.jpg' },

  // ── ÜBERDACHUNG (3 images) ──
  { url: '/.cm4all/uproc.php/0/%C3%9CBERDACHUNG/.1-Ueberdachung-Beton_A%2B-756x430.jpg/picture-2600?_=1938232bec0', local: 'images/ueberdachung/ueberdachung-beton-01.jpg' },
  { url: '/.cm4all/uproc.php/0/%C3%9CBERDACHUNG/.2-Ueberdachung_Unterstellplatz-Beton_A%2B-712x363.jpg/picture-2600?_=1938232bad8', local: 'images/ueberdachung/ueberdachung-unterstellplatz-02.jpg' },
  { url: '/.cm4all/uproc.php/0/%C3%9CBERDACHUNG/.Pavillon_Unterstellplatz_Ueberdachung_Wetterschutz.jpg/picture-2600?_=19aba6c7b58', local: 'images/ueberdachung/pavillon-wetterschutz.jpg' },

  // ── DETAILS (3 images - .3 Übergangsblech does not exist on CDN) ──
  { url: '/.cm4all/uproc.php/0/DETAILS/.1-Skate-Element-Schutzkante_A%2B-756x430.jpg/picture-2600', local: 'images/details/schutzkante-01.jpg' },
  { url: '/.cm4all/uproc.php/0/DETAILS/.2-Skate-Element-Copingrohr_A%2B-756x430.jpg/picture-2600?_=193736d3488', local: 'images/details/copingrohr-02.jpg' },
  { url: '/.cm4all/uproc.php/0/DETAILS/.4-Skate-Element-Einstellung_A%2B-756x430.jpg/picture-2600', local: 'images/details/einstellung-04.jpg' },

  // ── PLANUNG (4 images from /skatepark-planen/ page) ──
  { url: '/.cm4all/uproc.php/0/PLANUNG/.1-Skate-Anlage-Planung_A%2B-756x430.jpg/picture-2600?_=1937df92420', local: 'images/planung/skate-anlage-planung-01.jpg' },
  { url: '/.cm4all/uproc.php/0/PLANUNG/.2-Skateanlage-Planung_A%2B-756x430.jpg/picture-2600?_=1937df92038', local: 'images/planung/skateanlage-planung-02.jpg' },
  { url: '/.cm4all/uproc.php/0/PLANUNG/.3-Skate-Park-Planen_A%2B-756x430.jpg/picture-2600?_=1937df91c50', local: 'images/planung/skate-park-planen-03.jpg' },
  { url: '/.cm4all/uproc.php/0/PLANUNG/.4-Skateanlage-Planen_A%2B-756x430.jpg/picture-2600?_=1937df91868', local: 'images/planung/skateanlage-planen-04.jpg' },

  // ── MONTAGE (4 images from /montage-skateelemente/ page) ──
  { url: '/.cm4all/uproc.php/0/MONTAGE/.1-Skate-Elemente-Transport_A%2B_756x430.jpg/picture-2600?_=19381ef02e8', local: 'images/montage/transport-01.jpg' },
  { url: '/.cm4all/uproc.php/0/MONTAGE/.2-Skate-Elemente-Abladen_A%2B_756x430.jpg/picture-2600?_=1937e0005d8', local: 'images/montage/abladen-02.jpg' },
  { url: '/.cm4all/uproc.php/0/MONTAGE/.3-Skate-Element_an-Beton%2B_756x430.jpg/picture-2600?_=19381eeff00', local: 'images/montage/anbetonieren-03.jpg' },
  { url: '/.cm4all/uproc.php/0/MONTAGE/.4-Skate-Elemente-Aufbau_A%2B_756x430.jpg/picture-2600?_=1937e0005d8', local: 'images/montage/aufbau-04.jpg' },

  // ── NEWS / CONTESTS (4 images from /news-info/ page) ──
  { url: '/.cm4all/uproc.php/0/INFO/.1-Wettkampf_A%2B-756x430.jpg/picture-2600?_=193828d5240', local: 'images/news/wettkampf-01.jpg' },
  { url: '/.cm4all/uproc.php/0/INFO/.2-Wettbewerb_A%2B-756x430.jpg/picture-2600?_=193828d4e58', local: 'images/news/wettbewerb-02.jpg' },
  { url: '/.cm4all/uproc.php/0/INFO/.3-Contest_A%2B-756x430.jpg/picture-2600?_=193828d4e58', local: 'images/news/contest-03.jpg' },
  { url: '/.cm4all/uproc.php/0/INFO/.4-Contest_A%2BUrban_Design-756x430.jpg/picture-2600?_=193828d4a70', local: 'images/news/contest-aplus-04.jpg' },

  // ── HOMEPAGE (hero banner, footer, product thumbs) ──
  { url: '/.cm4all/uproc.php/0/A%2B/.a%2Bimg_2091-2600x1300.jpg/picture-2600?_=19372434700', local: 'images/homepage/hero-banner.jpg' },
  { url: '/.cm4all/uproc.php/0/A%2B/.0-A%2B_Urban-Design_Skate.jpg/picture-2600?_=19372434318', local: 'images/homepage/footer-banner.jpg' },
  { url: '/.cm4all/uproc.php/0/A%2B/.1-Skateanlage-A%2B756x430.jpg/picture-2600?_=1937290b738', local: 'images/homepage/thumb-skateanlage.jpg' },
  { url: '/.cm4all/uproc.php/0/A%2B/.3-Hockey-Bande_A%2B-756x430.jpg/picture-2600?_=193723cbb38', local: 'images/homepage/thumb-hockey.jpg' },
  { url: '/.cm4all/uproc.php/0/A%2B/.4-Umkleide-Kabine_A%2B-756x430.jpg/picture-2600?_=19386f75f38', local: 'images/homepage/thumb-umkleide.jpg' },
  { url: '/.cm4all/uproc.php/0/A%2B/.5-Grill-Stelle_A%2B-756x430.jpg/picture-2600?_=193723cb750', local: 'images/homepage/thumb-grill.jpg' },
  { url: '/.cm4all/uproc.php/0/A%2B/.6-%C3%9Cberdachung_Pavillon_A%2B-756x430.jpg/picture-2600?_=193723cb368', local: 'images/homepage/thumb-ueberdachung.jpg' },

  // ── ICONS ──
  { url: '/.cm4all/uproc.php/0/temp/.icon_phone.png/picture-200', local: 'images/branding/icon-phone.png' },
  { url: '/.cm4all/uproc.php/0/temp/.icon_maps.png/picture-200', local: 'images/branding/icon-maps.png' },
  { url: '/.cm4all/uproc.php/0/temp/.icon_mail.png/picture-200', local: 'images/branding/icon-mail.png' },
];

// ── VIDEOS ──
const VIDEO_CATALOG = [
  { url: '/.cm4all/uproc.php/0/VIDEOS/.1-Aplus_BastionSession2.mp4', local: 'videos/skateparks/contest-skate-bmx-inline-scooter.mp4' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.2-Aplus_BastionSession1.mp4', local: 'videos/skateparks/session-skate-bmx-inline-scooter.mp4' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.3-Aplus_Skate-Contest.mp4', local: 'videos/skateparks/contest-skateboard.mp4' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.4-Aplus_BMX-Contest.mp4', local: 'videos/skateparks/contest-bmx.mp4' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.5-Aplus_Inline-Contest.mp4', local: 'videos/skateparks/contest-inliner.mp4' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.6-Aplus_Scooter-Contest.mp4', local: 'videos/skateparks/contest-scooter.mp4' },
];

// Poster frames for videos
const POSTER_CATALOG = [
  { url: '/.cm4all/uproc.php/0/VIDEOS/.1-Aplus_BastionSession2.mp4/poster?_=1943659f260', local: 'videos/skateparks/poster-contest-skate-bmx.jpg' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.2-Aplus_BastionSession1.mp4/poster?_=1943656b984', local: 'videos/skateparks/poster-session-skate-bmx.jpg' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.3-Aplus_Skate-Contest.mp4/poster?_=19436563703', local: 'videos/skateparks/poster-contest-skateboard.jpg' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.4-Aplus_BMX-Contest.mp4/poster?_=19436558d24', local: 'videos/skateparks/poster-contest-bmx.jpg' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.5-Aplus_Inline-Contest.mp4/poster?_=19436538676', local: 'videos/skateparks/poster-contest-inliner.jpg' },
  { url: '/.cm4all/uproc.php/0/VIDEOS/.6-Aplus_Scooter-Contest.mp4/poster?_=194364fd4bd', local: 'videos/skateparks/poster-contest-scooter.jpg' },
];

async function downloadFile(url, localPath, type = 'image') {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const fullLocalPath = join(PUBLIC_DIR, localPath);
  const dir = dirname(fullLocalPath);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  try {
    const response = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    });
    if (!response.ok) {
      console.error(`  x ${response.status} ${localPath}`);
      return { success: false, url: fullUrl, local: localPath, status: response.status };
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (type === 'image' && buffer.length < 512) {
      console.warn(`  ! Too small (${buffer.length}B): ${localPath}`);
      return { success: false, url: fullUrl, local: localPath, status: 'too-small' };
    }
    await writeFile(fullLocalPath, buffer);
    const sizeKB = (buffer.length / 1024).toFixed(1);
    console.log(`  + ${sizeKB}KB  ${localPath}`);
    return { success: true, url: fullUrl, local: `/${localPath}`, sizeKB: parseFloat(sizeKB) };
  } catch (err) {
    console.error(`  x Error: ${localPath} - ${err.message}`);
    return { success: false, url: fullUrl, local: localPath, error: err.message };
  }
}

async function main() {
  const allItems = [
    ...IMAGE_CATALOG.map(i => ({ ...i, type: 'image' })),
    ...POSTER_CATALOG.map(i => ({ ...i, type: 'image' })),
  ];

  console.log(`\n=== Downloading ${allItems.length} images + posters ===\n`);
  const results = [];
  const BATCH = 5;
  for (let i = 0; i < allItems.length; i += BATCH) {
    const batch = allItems.slice(i, i + BATCH);
    const batchResults = await Promise.all(batch.map(item => downloadFile(item.url, item.local, item.type)));
    results.push(...batchResults);
  }

  // Videos (download sequentially - they're large)
  console.log(`\n=== Downloading ${VIDEO_CATALOG.length} videos ===\n`);
  for (const video of VIDEO_CATALOG) {
    const result = await downloadFile(video.url, video.local, 'video');
    results.push(result);
  }

  // Generate manifest
  const manifest = {};
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  for (const r of successful) manifest[r.url] = r.local;
  await writeFile(join(__dirname, 'image-manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`\n=== Done: ${successful.length} OK, ${failed.length} failed ===`);
  if (failed.length > 0) {
    console.log('Failed:');
    for (const f of failed) console.log(`  - ${f.local} (${f.status || f.error})`);
  }
}

main().catch(console.error);
