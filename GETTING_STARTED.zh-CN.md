# HyperFrames 中文入门

HyperFrames 把 HTML 页面、CSS、可定位的动画时间线和本地音视频素材渲染成 MP4。先用 Codex 生成一个可编辑的视频项目，再通过预览修改，最后导出视频。

## 1. 这次安装的内容

- 你的 GitHub Fork：[GOTU001/hyperframes](https://github.com/GOTU001/hyperframes)。Fork 是官方仓库在你账号下的副本，分支是副本内部的一条开发线。
- 官方仓库：[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)。
- 本地源码目录：`D:\Codex_program\HyperFrames`。
- 工作分支：`codex/hyperframes-setup`。
- `origin` 指向你的 Fork，`upstream` 指向官方仓库。
- 官方核心 10 个 AI 技能安装在 `C:\Users\陈炫硕\.codex\skills`。在 Codex 中开启下一轮聊天后可用；若技能列表还没有刷新，重新打开项目或重启 Codex。
- 教学使用固定的 CLI 版本 `0.8.103`，避免学习时因新版行为变化而混淆。

已验证：本机有 Node.js 24 和 Git，CLI `0.8.103` 可运行；便携 FFmpeg / FFprobe `9.0.2` 和 Chrome Headless Shell `152.0.7977.30` 已安装并验证。示例的 `check`、后台预览和 MP4 导出均已实际运行成功。

本次实测输出是 H.264、`1920×1080`、30 fps、300 帧、10.000 秒、无音轨，文件约 282 KB。检查中 HTML 无错误，浏览器运行和布局无错误，44 项对比度检查全部通过。已查看导出视频第 5 秒的截帧，中文字体、布局和三步骤卡片显示正确，没有裁切。还有一项建议将嵌套结构拆为子合成的提示；此教学示例保持单场景结构。项目未配置 `motion.json`，没有执行专门的运动断言审计。批量导出、新项目流程和交付画质命令尚未实测。

核心技能包含入口 `hyperframes`，以及 `hyperframes-core`、`hyperframes-cli`、`hyperframes-animation`、`hyperframes-creative`、`hyperframes-registry`、`hyperframes-studio`、`hyperframes-audio`、`hyperframes-keyframes`、`media-use`。制作流程从 `/hyperframes` 开始，产品宣传片、字幕等专门工作流由入口按需安装。

## 2. 源码仓库与视频项目

当前目录是 **HyperFrames 框架的源码仓库**，里面的 `packages/` 用于开发框架，`docs/` 是文档，`skills/` 是技能源文件。

每条视频则放在独立的 **视频项目目录** 中，例如：

```text
D:\Codex_program\HyperFrames\
  packages\                 框架源码
  skills\                   官方技能源文件
  examples\first-video\     本次入门示例
    index.html               文案、布局与动画
    hyperframes.json         项目配置
    package.json             预览、检查、导出命令
    run-hyperframes.mjs       固定 CLI 版本与便携工具启动器
    assets\                  本地图片、字体、音频和视频
    output\                  本次示例导出的 MP4
  projects\my-video\        建议用于你自己的新视频项目
  .tools\                    本机便携 FFmpeg、FFprobe 与 Chrome
```

执行教学命令前先进入 `examples\first-video`。根目录的 `npm run dev` 是框架的开发命令，和视频预览不是同一用途。不要在框架根目录运行 `npm install` 或 `pnpm install`；框架源码依赖用 Bun 管理。日常做视频可直接调用已发布的 CLI，无需先编译整个框架。

## 3. 最快的开始方式：让 Codex 制作

在 Codex 打开这个项目，开启下一轮聊天，然后粘贴：

```text
使用 /hyperframes，制作一条 10 秒中文产品介绍视频。
产品：HyperFrames，卖点是用 HTML/CSS 精确修改视频，并导出 MP4。
画面：1920×1080 横屏，30 fps，深色背景、清晰大字，三个连续镜头。
先不加配音和音乐，用文字、图形和动效表达。
项目保存到 D:\Codex_program\HyperFrames\projects\my-intro。
使用固定版本 HyperFrames 0.8.103。
先完成 lint 和 check，打开本地预览，让我确认画面后再导出最终 MP4。
最终输出放到项目的 renders\final.mp4，并告诉我项目和视频的绝对路径。
```

如果要介绍自己的网站，把产品信息改为实际网址。用网站制作宣传片时，Codex 会走产品宣传片流程；只有文字的知识讲解会走讲解视频流程。无需自己记住每个工作流名字。

预览后用具体描述迭代，例如：

```text
把第 2 秒出现的标题改成“代码驱动的视频制作”，字号增大 15%。
第二个镜头多停留 1 秒，保留总时长 10 秒。
结尾按钮向上移动 60 像素。完成检查后重新打开预览。
```

满意后再发：

```text
这个预览版本可以，导出最终 MP4 到 renders\final.mp4。
请检查实际分辨率、帧率和时长，并给我文件路径。
```

预览适合判断叙事、文案大小、动画节奏和声音。`check` 通过以后仍应看一遍预览；自动检查无法替你决定内容是否合适。

## 4. 手动运行本次示例

本次示例是一条 10 秒、`1920×1080`、无声音的中文介绍，演示“写页面、调动画、导出视频”。GSAP 动画库已放在本地 `assets/gsap.min.js`。

在 PowerShell 执行：

```powershell
Set-Location 'D:\Codex_program\HyperFrames\examples\first-video'
npm run check
npm run preview
```

`check` 负责 HTML 结构与浏览器检查，`preview` 启动持久后台 Studio 预览。用浏览器打开命令输出的本地项目地址，服务会继续运行。结束预览时执行 `npm run stop`。

本次已经启动的预览：[http://localhost:3002/#project/first-video](http://localhost:3002/#project/first-video)。已验证服务返回 HTTP 200；如果重新启动后端口变化，以新输出的地址为准。

也可以用 `npm run dev` 前台预览；保持终端运行，在浏览器查看命令输出的本地地址，结束时按 `Ctrl+C`。Codex 帮你交接预览时应优先用 `npm run preview`。

看完预览后导出学习用草稿：

```powershell
Set-Location 'D:\Codex_program\HyperFrames\examples\first-video'
npm run render
```

草稿输出为 `D:\Codex_program\HyperFrames\examples\first-video\output\first-video.mp4`。满意后可提高画质导出：

```powershell
npm run hf -- render --quality delivery --workers 1 --fps 30 --output output/final.mp4
```

最终输出为 `D:\Codex_program\HyperFrames\examples\first-video\output\final.mp4`。

这些脚本通过 `run-hyperframes.mjs` 固定调用 `hyperframes@0.8.103`，自动找到根目录 `.tools/` 里的便携 FFmpeg、FFprobe 和 Chrome。设置只用于启动的子进程，不修改系统全局 PATH，并优先保留你已经设置的 `HYPERFRAMES_*` 环境变量。需要其他 CLI 命令时使用 `npm run hf -- <命令>`，例如 `npm run hf -- lint`。

若检查失败，先修复列出的结构、资源加载或浏览器错误，再预览和导出。日常本地导出不需要 Docker 或云端账号。

## 5. 创建自己的新视频项目

便携工具只在本次示例的启动器中自动配置。新项目要在同一个 PowerShell 窗口先设置本机工具路径，或者沿用示例启动器。以下环境变量仅影响这个终端及其子进程，关闭窗口后失效：

```powershell
$env:HYPERFRAMES_FFMPEG_PATH = 'D:\Codex_program\HyperFrames\.tools\ffmpeg\bin\ffmpeg.exe'
$env:HYPERFRAMES_FFPROBE_PATH = 'D:\Codex_program\HyperFrames\.tools\ffmpeg\bin\ffprobe.exe'
$env:HYPERFRAMES_BROWSER_PATH = 'D:\Codex_program\HyperFrames\.tools\browser\chrome-headless-shell-win64\chrome-headless-shell.exe'
$env:Path = 'D:\Codex_program\HyperFrames\.tools\ffmpeg\bin;' + $env:Path
```

在该窗口中创建另一条视频：

```powershell
Set-Location 'D:\Codex_program\HyperFrames'
npx --yes hyperframes@0.8.103 init projects/my-video --non-interactive --resolution landscape
Set-Location 'D:\Codex_program\HyperFrames\projects\my-video'
```

`--non-interactive` 使用默认空白项目并跳过交互选择。横屏是 `1920×1080`；短视频竖屏可换成 `--resolution portrait`，即 `1080×1920`；方形可用 `--resolution square`，即 `1080×1080`。

新项目里的命令可直接调用固定版本 CLI：

```powershell
npx --yes hyperframes@0.8.103 lint
npx --yes hyperframes@0.8.103 check
npx --yes hyperframes@0.8.103 preview
```

检查通过并确认预览后导出：

```powershell
npx --yes hyperframes@0.8.103 render --quality delivery --fps 30 --output renders/final.mp4
```

可以让 Codex 为新项目添加固定版本的 `npm run dev`、`npm run preview`、`npm run check`、`npm run render` 脚本，并沿用本次示例的 `run-hyperframes.mjs` 启动器。放在 `projects/my-video` 时，启动器相对根目录的位置同样是两层；如果另存到其他位置，要同时更新启动器定位根目录的逻辑。

官方仓库默认忽略 `examples/` 下的新目录；本次 `examples/first-video` 已单独放行。因此自己的项目建议使用 `projects/my-video`，方便用 Git 跟踪。若坚持放到 `examples/my-video`，让 Codex先按 `first-video` 的写法添加对应 `.gitignore` 例外。

## 6. 修改文字、布局、动画和素材

`index.html` 是视频的可编辑源文件：

| 修改内容   | 主要位置                       | 例子                                  |
| ---------- | ------------------------------ | ------------------------------------- |
| 文案       | HTML 文本                      | 标题、字幕、按钮文字                  |
| 视觉       | CSS                            | 字体、颜色、间距、背景、尺寸          |
| 镜头时长   | `data-start` / `data-duration` | 从第 3 秒开始，持续 4 秒              |
| 动画       | GSAP 根时间线                  | 标题入场、数字增长、场景衔接          |
| 画幅       | 根合成的宽高属性               | 横屏、竖屏或方形                      |
| 图片与声音 | `assets/` 文件及其引用         | `assets/logo.png`、`assets/music.mp3` |

HyperFrames 通过时间定位每一帧，因此动画要使用框架注册的时间线。每个合成注册一个 `gsap.timeline({ paused: true })`，放在 `window.__timelines["合成 ID"]`，与根元素的 `data-composition-id` 对应；让 Codex按核心技能维护这一结构。不要用 `Date.now()`、未固定种子的 `Math.random()` 或渲染时联网请求驱动画面。调整镜头总时长时，同时检查根合成的 `data-duration` 和时间线；只改 CSS 无法延长视频。

把有权使用的素材放到各视频项目的 `assets/`，让 Codex 引用相对路径。保留素材来源和授权信息，例如在 `assets/SOURCES.md` 记录文件名、来源链接和用途。最容易开始的是自己的产品截图、录屏、Logo 与已获授权的音乐。若要用在线素材或生成配音，在提示词里写明供应商和预算，避免视频制作过程意外调用付费服务。

视频画面和声音分开声明：视频元素使用 `muted playsinline`，声音由带唯一 `id` 的 `<audio>` 引用，即使两者引用同一个 MP4。由 HyperFrames 管理播放和定位，不在页面脚本中调用 `play()`。音量渐变、音乐压低配合配音等编辑，让 Codex 使用音频技能完成。

改完 HTML 后重新执行 `npm run check`；结构修改期间可以先做快速 `lint`。确认预览版本后，再运行最终导出命令。

## 7. 用变量批量制作

变量适合同一套版式生成多条视频，例如更换产品名称、价格和配色。它是进阶功能；本次入门示例的批量导出尚未实测。

先让 Codex 把要替换的内容声明为合成变量：

```text
使用 /hyperframes，把这个视频做成模板。
声明 name 和 headline 两个 string 变量，并提供默认值。
headline 用 data-var-text 绑定到标题。
name 用于批量输出文件名，保留当前默认版式。
```

变量声明放在 `<html data-composition-variables='...'>`，每个声明需要 `id`、`type`、`label` 和 `default`。声明是数组；传入每一条视频的值是对象，两者不要混用。

在本次示例项目目录创建 `rows.json`：

```json
{
  "rows": [
    { "name": "product-a", "headline": "产品 A：更快开始" },
    { "name": "product-b", "headline": "产品 B：精准控制" }
  ]
}
```

检查并预览代表性内容，确认模板后批量导出：

```powershell
npm run hf -- render --batch rows.json --output 'output/{name}.mp4' --batch-concurrency 1 --strict-variables --quality delivery --workers 1 --fps 30
```

两条视频会分别输出为 `output/product-a.mp4` 和 `output/product-b.mp4`。`--strict-variables` 会拒绝未声明的变量或类型错误。批量完成后检查输出目录的 `manifest.json`，确认每条记录都成功，再抽看生成的视频。

## 8. 保存到自己的 GitHub

日常提交使用当前工作分支。先确认改动和分支：

```powershell
Set-Location 'D:\Codex_program\HyperFrames'
git status --short
git branch --show-current
git remote -v
```

将源文件和素材清单提交到你的 Fork，例如：

```powershell
git add GETTING_STARTED.zh-CN.md examples/first-video
git commit -m 'docs: add Chinese quickstart and first video example'
git push -u origin codex/hyperframes-setup
```

提交前按仓库要求格式化和检查改动。本次示例的 `node_modules/`、`output/`、`.hyperframes/` 和根目录 `.tools/` 已由 `.gitignore` 排除，Git 保存可编辑源文件；其他项目也应按实际需要排除渲染结果和缓存。查看 `git status` 后选择文件，不要把密钥或依赖缓存提交进去。

获取官方更新时，在本地改动已提交或已安全保存的情况下执行：

```powershell
git fetch upstream
git switch codex/hyperframes-setup
git merge upstream/main
git push origin codex/hyperframes-setup
```

这会把官方 `main` 的更新合入你的工作分支。若出现冲突，让 Codex 检查具体文件并解决，然后重跑相关检查。升级 CLI 时单独修改项目的固定版本并验证，Git 更新源码不会自动升级视频项目使用的 CLI。

## 9. 官方资料

- [官方入门：制作第一条视频](https://hyperframes.heygen.com/quickstart)
- [官方介绍](https://hyperframes.heygen.com/introduction)
- [工作流列表](https://hyperframes.heygen.com/workflows)
- [组件与场景目录](https://hyperframes.heygen.com/catalog/blocks/data-chart)
- [源码仓库与技能](https://github.com/heygen-com/hyperframes)

本指南基于当前克隆的官方文档及技能说明，命令固定到 `0.8.103`。上文已区分本机实测结果与尚未实测的进阶用法。
