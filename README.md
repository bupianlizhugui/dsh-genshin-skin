# dsh-genshin-skin

中文 | [English](./README.en.md)

一款面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
(`dsh`) Web UI 的 **原神（至冬 / Snezhnaya）主题皮肤**：用提瓦特金配色重着色界面，
并加上雪国宫殿壁纸背景。装上之后，原本很"素"的对话界面会变成暖金配色 + 雪国壁纸的
氛围。

> **纯表现层。** 本皮肤只改外观，不触碰会话、模型、工具、沙箱或网络。它完全通过
> DeepSeek Harness 公开的 `ctx.theme` 服务和一层 CSS 生效；卸载后界面干净还原，
> 不会留下任何副作用。

> 非官方粉丝项目，与 HoYoverse / 米哈游及 DeepSeek 无任何隶属、赞助或背书关系。
> 美术版权见 [ASSET_LICENSE.md](./ASSET_LICENSE.md)——随附图片仅供个人非商业演示。

## 效果

- 提瓦特金色的品牌色、按钮、边框点缀；
- 半透明毛玻璃面板，透出背景壁纸；
- 铺满整屏的雪国宫殿壁纸，带一层可读性遮罩保证文字清晰；
- 浅色 / 深色底主题下都可用。

---

## 它是怎么工作的（一句话）

本仓库是一个 DeepSeek Harness 的 **bundle（插件包）**。你用 `dsh plugin add`
把它装进某个 **profile**，`dsh` 启动 Web UI 时会自动扫描并加载它——**完全不用改
DeepSeek Harness 的源码**。卸载就是 `dsh plugin remove`。

> 关于 profile：`dsh` 用 "profile" 来隔离不同的配置/插件组合。Web UI 默认用名为
> `web` 的 profile。`dsh plugin --profile web ...` 就是对这个 profile 增删插件。
> profile 的实际目录在你的用户目录下（不在项目里），所以给它装插件不会污染
> DeepSeek Harness 的源码仓库。

---

## 环境要求

- 已经能跑起来的 DeepSeek Harness：
  - 要么装了全局 `dsh` 命令；
  - 要么是**源码检出**（monorepo），用 `pnpm dsh` 运行。
- Node.js `>= 22.19` 与 `pnpm`（DeepSeek Harness 本身就需要这些）。

---

## 用法一：本地源码检出（重点，比如你的 `deepseek-harness`）

如果你是 clone 了 DeepSeek Harness 源码在本地跑（例如目录
`~/Desktop/github_test/deepseek-harness`，用 `pnpm dsh web` 启动），按下面来。

下面假设两个项目是平级目录：

```
你的工作目录/
├── deepseek-harness/     # DeepSeek Harness 源码检出（用 pnpm dsh 运行）
└── dsh-genshin-skin/     # 本皮肤项目
```

### 步骤 1：把皮肤装进 web profile

在 **deepseek-harness 目录里**执行（`pnpm dsh` 就是本地源码的 dsh 命令）：

```sh
cd deepseek-harness

# 从 GitHub 安装（推荐）：
pnpm dsh plugin --profile web add github:bupianlizhugui/dsh-genshin-skin

# 或者，如果你已经把 dsh-genshin-skin clone 到了本地，用本地路径安装：
pnpm dsh plugin --profile web add ../dsh-genshin-skin
```

> `dsh plugin add` 本质是在 profile 目录里帮你跑 `pnpm add`，然后自动把声明了
> `dsh.bundle` 的这个包登记为该 profile 的一层。相对路径会按你**当前所在目录**解析，
> 所以上面的 `../dsh-genshin-skin` 是相对 `deepseek-harness` 的。

### 步骤 2：首次可能要放行构建（git 安装时）

从 GitHub / git 安装时，pnpm 会从源码构建这个包（走 `prepare` 脚本）。pnpm ≥ 10
出于安全，**首次会拦下这个构建**并让 `add` 失败，同时打印出需要放行的包名 key。

按提示，把这个 key 加到 **web profile 的** `pnpm-workspace.yaml` 里
（`dsh` 的报错信息会告诉你这个文件的确切绝对路径，通常在
`~/.deepseek-harness/profiles/web/pnpm-workspace.yaml` 或 `$DSH_HOME/profiles/web/` 下）：

```yaml
allowBuilds:
  dsh-genshin-skin: true
```

然后**重跑一遍**刚才那条 `add` 命令即可。
（用本地路径 `../dsh-genshin-skin` 安装时，通常不需要这一步。）

> 安全提示：只为你信任的源码放行构建。想更稳，可把安装源固定到某个提交：
> `github:bupianlizhugui/dsh-genshin-skin#<commit-sha>`，避免以后仓库更新悄悄改变
> 你本地运行的内容。

### 步骤 3：启动 Web UI 看效果

```sh
cd deepseek-harness
pnpm dsh web
```

浏览器打开 `http://127.0.0.1:3080`，就能看到原神至冬皮肤了。

### 卸载

```sh
cd deepseek-harness
pnpm dsh plugin --profile web remove dsh-genshin-skin
```

依赖和配置层会一起移除，界面还原为默认样子。

---

## 用法二：全局 `dsh` 命令

如果你装的是全局 `dsh`（不是源码检出），把上面的 `pnpm dsh` 换成 `dsh` 即可：

```sh
# 安装
dsh plugin --profile web add github:bupianlizhugui/dsh-genshin-skin
# 启动
dsh --profile web
# 卸载
dsh plugin --profile web remove dsh-genshin-skin
```

---

## 自定义（换壁纸 / 改配色）

皮肤全是表现层，改完源码用 `pnpm build` 重新构建即可。如果你是用**本地路径**装的，
重新构建后重启 `dsh web` 就生效；如果是从 GitHub 装的，改完记得 push，再让使用者
重装/更新。

先在 **dsh-genshin-skin 目录**里装好开发依赖：

```sh
cd dsh-genshin-skin
pnpm install     # 会自动跑一次 build
```

### 换壁纸

把你想要的图片放到 `src/client/assets/`：

- 最简单：保持文件名为 `genshin-snezhnaya.jpeg`（直接覆盖原图）；
- 或者用别的文件名，然后改 `scripts/build-wallpaper.mjs` 里的 `WALLPAPER_ASSET`
  常量为你的新文件名（支持 `.jpeg` / `.png` / `.webp`）。

然后重新构建：

```sh
pnpm build
```

构建会把图片以 base64 `data:` URI 内联进 client bundle（client bundle 没有单独
的文件路由，这是 DeepSeek Harness 的既定做法）。建议用 **1500×850 或更大的横图**；
文件太大（比如 2MB 的 PNG）会明显撑大 bundle、拖慢首屏，建议先压成质量合适的
JPEG/WebP（一般几百 KB 足够）。

### 改配色

编辑 `src/client/theme-tokens.ts`。里面每一项把一个 DeepSeek Harness 的公开主题
变量（`--dsw-alias-*` / `--dsw-specific-*`）映射到一对 `{ light, dark }` 颜色
（分别对应浅色底和深色底）。改完 `pnpm build`。

想换成别的地区/角色配色（如蒙德清新绿、稻妻紫电、须弥翠绿），直接改这些颜色值即可。

### 调壁纸遮罩 / 面板透明度

- **遮罩浓淡**（壁纸上盖的那层暗色/亮色，决定文字是否够清晰）：改
  `src/client/wallpaper.template.css` 里 `linear-gradient(...)` 的 alpha 透明度值。
- **面板透明度**（面板透出多少壁纸）：改 `theme-tokens.ts` 里的 `--dsw-alias-bg-*`
  这几个值的 alpha。

---

## 工作原理（进阶）

- `package.json` 声明了 `dsh.bundle`（一个 `cordis.patch.yml` 配置层）和
  `dsh.client`（`platform: web`）。装进 profile 后，它就进入该 profile 的依赖闭包。
- `dsh web` 启动时，宿主扫描 loader 树里声明了 `dsh.client` 的包，组成
  `window.__DSH_BOOT__`，并在 `/plugins/dsh-genshin-skin/client.js` 提供本皮肤的
  浏览器 bundle。
- 浏览器半用 `inject = ['theme']` 拿到主题服务，调用
  `ctx.theme.overrideTokens(...)` 叠加一层 `--dsw-*` 令牌覆盖；再通过两个
  CSS Module 注入壁纸和边缘微光。`ctx.effect` 注册这层覆盖，插件卸载时自动移除。

---

## 开发

```sh
pnpm install      # 会自动跑 prepare -> build
pnpm build        # build:wallpaper（内联图片）+ tsdown（构建 node 半 + client 半）
pnpm typecheck    # 类型检查
```

构建产物（不纳入版本库）：

- `lib/index.js` —— node 半（空的表现层插件，仅用于让宿主发现 client 半）。
- `lib/client.js` —— 浏览器半，包裹在 shell loader 的交接格式里，含内联壁纸。

---

## 许可

- **代码**：[MIT](./LICENSE)。
- **美术 / 图片素材**：见 [ASSET_LICENSE.md](./ASSET_LICENSE.md)——**非** MIT。原神
  相关美术版权归米哈游所有；随附图仅供个人非商业演示，若要 fork/发布请替换为你有权
  使用的图片。
