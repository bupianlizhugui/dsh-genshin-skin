/**
 * Genshin ("Snezhnaya / 至冬") palette. Each token carries both a light and a
 * dark value so the override stays legible whichever base color scheme the
 * user picks. These are literal colors on purpose: a skin owns concrete
 * palette values here, while feature components consume the semantic aliases.
 *
 * Want a different look? Edit the values below (or swap whole tokens) and
 * rebuild with `pnpm build`. The token names are DeepSeek Harness's public
 * `--dsw-alias-*` / `--dsw-specific-*` theme variables.
 */

/** One override token: a value for each base palette. */
export interface TokenModes {
  /** Value applied while the light base palette is active. */
  light: string
  /** Value applied while the dark base palette is active. */
  dark: string
}

/** Token-name to per-scheme value pairs, passed to `ctx.theme.overrideTokens`. */
export const GENSHIN_TOKENS: Record<string, TokenModes> = {
  // Brand + primary accents — Teyvat gold.
  '--dsw-alias-brand-primary': { light: 'rgb(120, 88, 32)', dark: 'rgb(226, 188, 120)' },
  '--dsw-alias-brand-text': { light: 'rgb(120, 88, 32)', dark: 'rgb(226, 188, 120)' },
  '--dsw-alias-button-primary-fill': { light: 'rgb(176, 132, 58)', dark: 'rgb(200, 164, 92)' },
  '--dsw-alias-button-primary-hover': { light: 'rgb(150, 112, 46)', dark: 'rgb(220, 186, 118)' },
  '--dsw-alias-button-info-fill': { light: 'rgb(176, 132, 58)', dark: 'rgb(200, 164, 92)' },
  '--dsw-alias-button-info-hover': { light: 'rgb(150, 112, 46)', dark: 'rgb(220, 186, 118)' },
  '--dsw-alias-state-business-primary': { light: 'rgb(176, 132, 58)', dark: 'rgb(200, 164, 92)' },
  // Backgrounds — semi-transparent so the wallpaper (with its scrim) shows
  // through. base is the most transparent; higher layers grow more opaque so
  // content surfaces stay legible.
  '--dsw-alias-bg-base': { light: 'rgba(247, 241, 227, 0.10)', dark: 'rgba(23, 26, 38, 0.14)' },
  '--dsw-alias-bg-layer-1': { light: 'rgba(250, 245, 234, 0.55)', dark: 'rgba(30, 34, 48, 0.62)' },
  '--dsw-alias-bg-layer-2': { light: 'rgba(244, 237, 221, 0.72)', dark: 'rgba(36, 41, 56, 0.78)' },
  '--dsw-alias-bg-layer-3': { light: 'rgba(240, 232, 214, 0.86)', dark: 'rgba(42, 48, 64, 0.9)' },
  '--dsw-specific-sidebar-fill': { light: 'rgba(243, 235, 218, 0.5)', dark: 'rgba(27, 31, 44, 0.58)' },
  // Text — warm ink over parchment, soft cream over night.
  '--dsw-alias-label-primary': { light: 'rgb(52, 42, 26)', dark: 'rgb(236, 230, 216)' },
  '--dsw-alias-label-secondary': { light: 'rgb(104, 88, 58)', dark: 'rgb(188, 178, 158)' },
  // Borders — subtle gilded edges.
  '--dsw-alias-border-l2': { light: 'rgba(150, 112, 46, 0.24)', dark: 'rgba(226, 188, 120, 0.22)' },
  '--dsw-alias-border-l3': { light: 'rgba(150, 112, 46, 0.32)', dark: 'rgba(226, 188, 120, 0.3)' },
  // Chat bubble — a warm gilded tint.
  '--dsw-specific-bubble': { light: 'rgb(245, 235, 214)', dark: 'rgb(44, 40, 30)' },
  '--dsw-specific-bubble-highlight': { light: 'rgb(232, 214, 176)', dark: 'rgb(66, 58, 38)' },
}
