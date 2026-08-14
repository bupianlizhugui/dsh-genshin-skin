/**
 * Genshin skin bundle, browser half. A presentation-only plugin that reskins
 * the DeepSeek Harness Web UI with a Snezhnaya (至冬) / Teyvat look:
 *
 *   1. It stacks a `--dsw-alias-*` token override layer through the public
 *      `ctx.theme` service (`overrideTokens`), recoloring brand, background,
 *      button, and state tokens for both the light and dark base palettes.
 *   2. It injects a wallpaper stylesheet (a full-bleed background image with a
 *      scheme-aware scrim) and a small gilded edge accent, as CSS Modules that
 *      the client bundle auto-injects as `<style data-plugin>` tags; the loader
 *      removes them on unload.
 *
 * The plugin performs no network requests and imports no functional DSH
 * service beyond the theme registry; unloading it restores the stock look.
 */
import type { ClientContext } from './dsh-types.ts'
import { GENSHIN_TOKENS } from './theme-tokens.ts'
import './wallpaper.module.css'
import './skin.module.css'

/** Layer identity for this skin's token override stack. */
const SKIN_SOURCE = 'dsh-genshin-skin'

/** Required services: the theme registry that owns the `--dsw-*` token layers. */
export const inject = ['theme']

/**
 * Client plugin body: stack the Genshin token override layer over whatever
 * theme is active. The wallpaper and accent stylesheets are injected by the
 * imports above.
 * @param ctx - client root context carrying the theme service.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(
    () => ctx.theme.overrideTokens(SKIN_SOURCE, GENSHIN_TOKENS),
    'dsh-genshin-skin: token override layer',
  )
}
