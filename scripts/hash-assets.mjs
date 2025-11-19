#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TARGETS_FILE = path.join(__dirname, 'asset-hash-targets.json');

async function loadAssetTargets() {
  try {
    const fileContents = await fs.readFile(TARGETS_FILE, 'utf-8');
    const parsed = JSON.parse(fileContents);
    if (!Array.isArray(parsed)) {
      throw new Error('Asset target file must contain an array');
    }
    return parsed;
  } catch (error) {
    console.warn(`Unable to read asset targets from ${TARGETS_FILE}. Falling back to default list.`, error);
    return [
      '/static/js/v2/main.js'
    ];
  }
}

const MANIFEST_PATH = path.join(projectRoot, 'static', 'asset-manifest.json');

(async () => {
  try {
    const ASSETS_TO_HASH = await loadAssetTargets();
    if (!ASSETS_TO_HASH.length) {
      console.warn('No asset targets defined. Nothing to hash.');
      return;
    }
    const manifestEntries = {};

    for (const asset of ASSETS_TO_HASH) {
      const relativePath = asset.replace(/^\//, '');
      const absolutePath = path.join(projectRoot, relativePath);
      await ensureFileExists(absolutePath, asset);

      const fileBuffer = await fs.readFile(absolutePath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex').slice(0, 8);
      const parsedPath = path.parse(absolutePath);
      const hashedFileName = `${parsedPath.name}.${hash}${parsedPath.ext}`;
      const hashedAbsolutePath = path.join(parsedPath.dir, hashedFileName);

      await cleanupOldHashes(parsedPath.dir, parsedPath.name, parsedPath.ext, hashedFileName);
      await fs.writeFile(hashedAbsolutePath, fileBuffer);

      const hashedRelativePath = path.relative(projectRoot, hashedAbsolutePath).split(path.sep).join('/');
      manifestEntries[asset] = `/${hashedRelativePath}`;
      console.log(`Hashed ${asset} -> ${manifestEntries[asset]}`);
    }

    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifestEntries, null, 2) + '\n');
    console.log(`Asset manifest written to ${MANIFEST_PATH}`);
  } catch (error) {
    console.error('Failed to generate asset manifest:', error);
    process.exit(1);
  }
})();

async function ensureFileExists(absolutePath, asset) {
  try {
    await fs.access(absolutePath);
  } catch (error) {
    throw new Error(`Missing asset: ${asset} (${absolutePath})`);
  }
}

async function cleanupOldHashes(dir, baseName, ext, currentFileName) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const pattern = new RegExp(`^${escapeRegex(baseName)}\\.[a-f0-9]{8}${escapeRegex(ext)}$`, 'i');

  await Promise.all(entries.map(async (entry) => {
    if (!entry.isFile()) {
      return;
    }

    if (!pattern.test(entry.name)) {
      return;
    }

    if (entry.name === currentFileName) {
      return;
    }

    await fs.unlink(path.join(dir, entry.name));
  }));
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
