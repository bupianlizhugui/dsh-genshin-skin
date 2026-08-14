#!/usr/bin/env node
/**
 * Compile src/client/wallpaper.template.css into src/client/wallpaper.module.css
 * by inlining the wallpaper image as a base64 data: URI. A client bundle has
 * no separate HTTP route for asset files, so image data ships inside the CSS
 * (the DeepSeek Harness convention for client bundle assets).
 *
 * Usage: node scripts/build-wallpaper.mjs
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const CLIENT_DIR = join(HERE, '..', 'src', 'client')
const TEMPLATE = join(CLIENT_DIR, 'wallpaper.template.css')
const OUTPUT = join(CLIENT_DIR, 'wallpaper.module.css')
const ASSET_DIR = join(CLIENT_DIR, 'assets')

/** Wallpaper file inlined into the stylesheet. Replace the file to reskin. */
const WALLPAPER_ASSET = 'genshin-snezhnaya.jpeg'
const PLACEHOLDER = '__WALLPAPER_DATA_URI__'

/** Map a file extension to its image MIME type. */
function mimeFor(ext) {
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    case '.webp':
      return 'image/webp'
    default:
      throw new Error(`unsupported wallpaper extension: ${ext} (use .jpeg, .png, or .webp)`)
  }
}

async function main() {
  const assetPath = join(ASSET_DIR, WALLPAPER_ASSET)
  const [template, image] = await Promise.all([
    readFile(TEMPLATE, 'utf8'),
    readFile(assetPath),
  ])
  const dataUri = `data:${mimeFor(extname(WALLPAPER_ASSET))};base64,${image.toString('base64')}`
  const css = template.split(PLACEHOLDER).join(dataUri)
  await writeFile(OUTPUT, css, 'utf8')
  const kb = Math.round(css.length / 1024)
  process.stdout.write(`[build-wallpaper] wrote ${OUTPUT} (${kb} KB, inlined ${WALLPAPER_ASSET})\n`)
}

main().catch((error) => {
  process.stderr.write(`[build-wallpaper] failed: ${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
})
