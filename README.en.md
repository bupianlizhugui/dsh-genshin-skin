# dsh-genshin-skin

[中文](./README.md) | English

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
dsh plugin --profile web add github:bupianlizhugui/dsh-genshin-skin
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
commit (`github:bupianlizhugui/dsh-genshin-skin#<sha>`) keeps a later push from
silently changing what runs.

Then start the Web UI (`dsh --profile web`, or `pnpm dsh web` from a source
checkout) and open `http://127.0.0.1:3080`.

### From a source checkout (e.g. a local deepseek-harness)

```sh
cd deepseek-harness
pnpm dsh plugin --profile web add ../dsh-genshin-skin
pnpm dsh web
```

## Remove

```sh
dsh plugin --profile web remove dsh-genshin-skin
```

This removes both the dependency and the config layer; the UI returns to stock.

## Customize

Everything is presentation, edited in `src/` and rebuilt with `pnpm build`.

- **Wallpaper**: replace the image in `src/client/assets/` (keep the filename
  `genshin-snezhnaya.jpeg`, or update `WALLPAPER_ASSET` in
  `scripts/build-wallpaper.mjs`), then `pnpm build`. Prefer a landscape image
  around 1500×850 or larger; very large files inflate the bundle.
- **Colors**: edit `src/client/theme-tokens.ts` — each entry maps a public
  `--dsw-alias-*` / `--dsw-specific-*` theme variable to a `{ light, dark }`
  pair. Rebuild with `pnpm build`.
- **Scrim / transparency**: scrim alpha in
  `src/client/wallpaper.template.css`; panel transparency in the
  `--dsw-alias-bg-*` values in `theme-tokens.ts`.

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
