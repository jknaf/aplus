/**
 * Upload Videos zu Vercel Blob Storage
 *
 * Usage: BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXX node scripts/upload-videos.mjs
 *
 * Gibt die Blob-URLs aus, die dann in den Code eingetragen werden.
 */

import { put } from '@vercel/blob';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const VIDEOS = [
  { file: 'videos/skateparks/contest-skate-bmx-inline-scooter.mp4', name: 'contest-skate-bmx-inline-scooter.mp4' },
  { file: 'videos/skateparks/session-skate-bmx-inline-scooter.mp4', name: 'session-skate-bmx-inline-scooter.mp4' },
  { file: 'videos/skateparks/contest-skateboard.mp4', name: 'contest-skateboard.mp4' },
  { file: 'videos/skateparks/contest-bmx.mp4', name: 'contest-bmx.mp4' },
  { file: 'videos/skateparks/contest-inliner.mp4', name: 'contest-inliner.mp4' },
  { file: 'videos/skateparks/contest-scooter.mp4', name: 'contest-scooter.mp4' },
];

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Fehler: BLOB_READ_WRITE_TOKEN nicht gesetzt.');
    console.error('Usage: BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXX node scripts/upload-videos.mjs');
    process.exit(1);
  }

  console.log('Uploading 6 Videos zu Vercel Blob Storage...\n');

  const urlMap = {};

  for (const video of VIDEOS) {
    const filePath = join(PUBLIC_DIR, video.file);
    const buffer = readFileSync(filePath);
    const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);

    console.log(`  Uploading ${video.name} (${sizeMB} MB)...`);

    const blob = await put(`videos/${video.name}`, buffer, {
      access: 'public',
      contentType: 'video/mp4',
    });

    console.log(`  -> ${blob.url}\n`);
    urlMap[`/videos/skateparks/${video.name}`] = blob.url;
  }

  // Save URL mapping
  const mapPath = join(__dirname, 'video-blob-urls.json');
  writeFileSync(mapPath, JSON.stringify(urlMap, null, 2));

  console.log('\n=== Fertig ===');
  console.log(`URL-Mapping gespeichert: scripts/video-blob-urls.json`);
  console.log('\nNächster Schritt: Video-URLs im Code aktualisieren mit:');
  console.log('  node scripts/apply-video-urls.mjs');
}

main().catch(console.error);
