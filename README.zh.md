# dsh-genshin-skin

[English](./README.md) | 中文

一款面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
(`dsh`) Web UI 的 **原神（至冬 / Snezhnaya）主题皮肤**：用提瓦特金配色重着色界面，
并加上雪国宫殿壁纸背景。

> **纯表现层。** 本皮肤不触碰会话、模型、工具、沙箱或网络，仅通过公开的
> `ctx.theme` 服务和一层 CSS 生效；移除后界面干净还原为原样。

> 非官方粉丝项目，与 HoYoverse / 米哈游及 DeepSeek 无任何隶属、赞助或背书关系。
> 美术版权见 [ASSET_LICENSE.md](./ASSET_LICENSE.md)——随附图片仅供个人非商业使用。

## 效果

暖金色点缀、半透明毛玻璃面板、铺满背景的壁纸（带可读性遮罩），在浅色与深色底主题
下都可用。

## 环境要求

- 已安装 DeepSeek Harness（`dsh` 命令），或用 `pnpm dsh` 运行的源码检出。
- Node.js `>= 22.19` 与 `pnpm`（DeepSeek Harness 本身即需要）。

## 安装

本仓库是一个 DeepSeek Harness **bundle**。用 `dsh plugin add` 把它装进某个
**profile**，Web UI 会自动加载——**无需改动 DeepSeek Harness 源码。**

### 从 GitHub 安装（推荐）

```sh
# 把皮肤加入你的 "web" profile（建议固定到某个 commit 更安全）。
dsh plugin --profile web add github:<你>/dsh-genshin-skin
```

git 安装会通过 `prepare` 脚本从源码构建，因此 pnpm（≥10）首次会要求你放行该构建。
首次 `add` 失败时，把它打印出来的包名 key 复制进该 profile 的
`pnpm-workspace.yaml`：

```yaml
allowBuilds:
  dsh-genshin-skin: true
```

然后重跑同一条 `add`。只为你信任的源码放行构建；固定 commit
（`github:<你>/dsh-genshin-skin#<sha>`）可避免日后推送悄悄改变运行内容。

随后启动 Web UI：

```sh
dsh --profile web
# 或源码检出下：
pnpm dsh web
```

打开 `http://127.0.0.1:3080`。

### 从本地检出安装

```sh
git clone https://github.com/<你>/dsh-genshin-skin
dsh plugin --profile web add ./dsh-genshin-skin
dsh --profile web
```

## 卸载

```sh
dsh plugin --profile web remove dsh-genshin-skin
```

依赖和配置层会一起移除，界面还原为原样。

## 自定义

全部都是表现层，改 `src/` 后用 `pnpm build` 重新构建。

### 换壁纸

替换 `src/client/assets/` 里的图片（保持文件名 `genshin-snezhnaya.jpeg`，或改
`scripts/build-wallpaper.mjs` 里的 `WALLPAPER_ASSET`），然后：

```sh
pnpm build
```

构建会把图片以 `data:` URI 内联进 client bundle（client bundle 没有单独的文件
路由）。建议用 1500×850 或更大的横图；文件过大会撑大 bundle。

### 改配色

编辑 `src/client/theme-tokens.ts`。每一项把一个 DeepSeek Harness 公开主题变量
（`--dsw-alias-*` / `--dsw-specific-*`）映射到一对 `{ light, dark }` 颜色。改完
`pnpm build`。

### 调壁纸遮罩 / 透明度

- 遮罩浓淡：`src/client/wallpaper.template.css`（`linear-gradient` 的 alpha 值）。
- 面板透明度：`theme-tokens.ts` 里的 `--dsw-alias-bg-*`。

## 工作原理

- 包声明了 `dsh.bundle`（一个 `cordis.patch.yml` 配置层）和 `dsh.client`
  （`platform: web`）。装进 profile 后，它就进入该 profile 的依赖闭包。
- `dsh web` 时，宿主扫描 loader 树里声明了 `dsh.client` 的包，组成
  `window.__DSH_BOOT__`，并在 `/plugins/dsh-genshin-skin/client.js` 提供本皮肤的
  浏览器 bundle。
- 浏览器半 `inject = ['theme']`，调用 `ctx.theme.overrideTokens(...)` 叠加一层
  `--dsw-*` 覆盖，再加壁纸与边缘微光两个 CSS Module。`ctx.effect` 注册覆盖，卸载
  时自动移除。

## 开发

```sh
pnpm install      # 会跑 prepare -> build
pnpm build        # build:wallpaper（内联图片）+ tsdown（node + client）
pnpm typecheck
```

构建产物：

- `lib/index.js` —— node 半（空表现层插件）。
- `lib/client.js` —— 浏览器半，包裹在 shell loader 交接格式里。

## 许可

- 代码：[MIT](./LICENSE)。
- 美术/素材：见 [ASSET_LICENSE.md](./ASSET_LICENSE.md)——**非** MIT。
