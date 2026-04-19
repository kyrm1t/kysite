/**
 * Writes resized copies to public/images/thumbs/ (same filenames as originals).
 * Run: npm run thumbs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const IMAGES_DIR = path.join(ROOT, 'public', 'images')
const THUMBS_DIR = path.join(IMAGES_DIR, 'thumbs')
const MAX_EDGE = 720

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

async function main() {
  await fs.mkdir(THUMBS_DIR, { recursive: true })
  let entries
  try {
    entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true })
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      console.warn('No public/images folder yet; nothing to do.')
      return
    }
    throw e
  }

  const files = entries.filter(
    (e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase())
  )

  if (files.length === 0) {
    console.warn('No image files found in public/images (skipping README-only folder is normal).')
    return
  }

  for (const e of files) {
    const inPath = path.join(IMAGES_DIR, e.name)
    const outPath = path.join(THUMBS_DIR, e.name)
    const ext = path.extname(e.name).toLowerCase()

    const pipeline = sharp(inPath, { failOn: 'none' })
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })

    if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9 }).toFile(outPath)
    } else if (ext === '.webp') {
      await pipeline.webp({ quality: 82 }).toFile(outPath)
    } else if (ext === '.gif') {
      await pipeline.gif().toFile(outPath)
    } else {
      await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(outPath)
    }

    console.log('thumb:', e.name)
  }

  console.log(`Done. ${files.length} thumbnail(s) in public/images/thumbs/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
