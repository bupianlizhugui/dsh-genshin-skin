# dsh-genshin-skin

English | [中文](./README.zh.md)

A **Genshin Impact (Snezhnaya / 至冬)** presentation skin for the
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`)
Web UI. It recolors the theme with a Teyvat gold palette and adds a snowy
imperial-city wallpaper background.

> **Presentation only.** This skin does not touch sessions, models, tools,
> sandboxes, or the network. It works entirely through the public `ctx.theme`
> service and a CSS layer, and cleanly restores the stock look when removed.

> Unofficial fan project. Not affiliated with, endorsed by, or sponsored by
> HoYoverse/miHoYo or DeepSeek. See [ASSET_LICENSE.md](./ASSET_LICENSE.md) for
> artwork rights — the bundled image is for personal, non-commercial use.

## Preview

The skin applies a warm gold accent, semi-transparent frosted panels, and a
full-bleed wallpaper with a legibility scrim. Works in both light and dark
base themes.

## Requirements

- DeepSeek Harness installed (the `dsh` CLI), or a source checkout you run with
  `pnpm dsh`.
- Node.js `>= 22.19` and `pnpm` (DeepSeek Harness already requires these).

## Install

This repository is a DeepSeek Harness **bundle**. You install it into a
**profile** with `dsh plugin add`; the Web UI then loads it automatically —
**no changes to the DeepSeek Harness source are needed.**

### From GitHub (recommended)

```sh
# Add the skin to your "web" profile (pin a commit for safety).
dsh plugin --profile web add github:<you>/dsh-genshin-skin
```

A git install builds the package from source via its `prepare` script, so
pnpm (≥10) asks you to allowlist that build the first time. When the first
`add` fails, copy the printed package key into your profile's
`pnpm-workspace.yaml`:

```yaml
allowBuilds:
  dsh-genshin-skin: true
```

then re-run the same `add`. Only allow builds for source you trust; pinning a
commit (`github:<you>/dsh-genshin-skin#<sha>`) keeps a later push from silently
changing what runs.

Then start the Web UI:

```sh
dsh --profile web
# or, from a source checkout:
pnpm dsh web
```

Open `http://127.0.0.1:3080`.

### From a local checkout

```sh
git clone https://github.com/<you>/dsh-genshin-skin
dsh plugin --profile web add ./dsh-genshin-skin
dsh --profile web
```

## Remove

```sh
dsh plugin --profile web remove dsh-genshin-skin
```

This removes both the dependency and the config layer; the UI returns to stock.

## Customize

Everything is presentation, edited in `src/` and rebuilt with `pnpm build`.

### Change the wallpaper

Replace the image in `src/client/assets/` (keep the filename
`genshin-snezhnaya.jpeg`, or update `WALLPAPER_ASSET` in
`scripts/build-wallpaper.mjs`), then:

```sh
pnpm build
```

The build inlines the image as a `data:` URI into the client bundle (a client
bundle has no separate file route). Prefer a landscape image around
1500×850 or larger; very large files inflate the bundle.

### Change the colors

Edit `src/client/theme-tokens.ts`. Each entry maps a public DeepSeek Harness
`--dsw-alias-*` / `--dsw-specific-*` theme variable to a `{ light, dark }`
color pair. Rebuild with `pnpm build`.

### Tune the wallpaper scrim / transparency

- Scrim strength: `src/client/wallpaper.template.css` (the `linear-gradient`
  alpha values).
- Panel transparency: the `--dsw-alias-bg-*` values in `theme-tokens.ts`.

## How it works

- The package declares `dsh.bundle` (a `cordis.patch.yml` config layer) and
  `dsh.client` (`platform: web`). Installing it into a profile puts it in that
  profile's dependency closure.
- On `dsh web`, the host scans the loader tree for `dsh.client` packages,
  composes `window.__DSH_BOOT__`, and serves this skin's browser bundle at
  `/plugins/dsh-genshin-skin/client.js`.
- The browser half injects `inject = ['theme']` and calls
  `ctx.theme.overrideTokens(...)` to stack a `--dsw-*` override layer, plus two
  CSS Modules for the wallpaper and edge glow. `ctx.effect` registers the
  override so it is removed automatically on unload.

## Development

```sh
pnpm install      # runs prepare -> build
pnpm build        # build:wallpaper (inline image) + tsdown (node + client)
pnpm typecheck
```

Build output:

- `lib/index.js` — node half (empty presentation plugin).
- `lib/client.js` — browser half, wrapped in the shell loader handoff.

## License

- Code: [MIT](./LICENSE).
- Artwork/assets: see [ASSET_LICENSE.md](./ASSET_LICENSE.md) — **not** MIT.
