# Motion Explainer

**Teach the words of your craft. Make the world more creative.**

**English** | [日本語](README.ja.md)

A prompt that lets you make **"24 names" explainer animations for your own field**: three looping videos with 8 animated cards each, and a one-page cheat sheet, showing the names every practitioner in your field should know.
Give this repository to a coding AI (Claude Code, Codex, Cursor, and so on), tell it your field, and it walks you through the whole set.

> 日本語の説明は [README.ja.md](README.ja.md) にあります。プロンプトの日本語版は [PROMPT.ja.md](PROMPT.ja.md) です。
> 中文用户：把这个仓库交给 Claude Code、Codex 等编程 AI，并让它"阅读 PROMPT.md 并照做"，就可以用中文制作你所在领域的版本。
> Any language: the prompt works for labels in any language. Tell the AI which one.

![Two example sets: camera moves (left) and motion graphics (right)](assets/preview.gif)

*Two sets made this way. They look different on purpose: the look comes from the field, not from a template.*

**Gallery:** sets people have posted, all in one page → https://showheyohtaki.github.io/motion-explainer/

## Why I made this

These videos got a lot of comments.

I read through them, and one stopped me. Someone wrote, more or less, that what had been holding them back was never a lack of imagination. They just didn't know what that kind of movement was called.

I knew exactly what they meant. The picture is already in your head. What's missing isn't talent or imagination. It's the word you can hand to your AI.

Every field has its own vocabulary, its shared language. Camera work has one. So do motion graphics, cooking, lighting, and every craft I can think of. If professionals from all kinds of fields, in all kinds of languages, taught us the terms that matter most in their work, that would be incredibly useful.

So I'm sharing the prompt that makes these videos.

Another comment said: "this is how you become a creative director".

Exactly.

I believe that knowing the vocabulary of many different fields will let a lot more people bring out creative talent that has been sleeping in them.

So I hope this repository helps more people become teachers, explaining their own field in a way anyone can follow.

And beyond that, it would be wonderful to see more creative directors around the world doing great work together with AI.

— Shohei Ohtaki ([@showheyohtaki](https://x.com/showheyohtaki))

## How to use

1. Install [Node.js](https://nodejs.org/) 18+ and [ffmpeg](https://ffmpeg.org/), then in this folder:
   ```bash
   npm install
   npx playwright install chromium
   ```
2. Open the folder with your coding AI and paste this, written in your own language:
   ```
   Read PROMPT.md and follow it.
   Field: <your field, e.g. "coffee brewing", "stage lighting", "UI components">
   Who it is for: <e.g. "people who ask AI image models for product photos">
   ```
   The set is made in the language you write in: the names your field uses in that language, the labels, the cheat sheet and the post. If that language is not English, every name also carries its English name underneath, so anyone can see what to type into an AI. A version in English or another language is optional; the AI asks once at the end.
3. Work with it. It stops twice for you: when the **list of 24 names** is ready, and when the **look** of the cards is decided. Your expertise matters most at the first stop. Then it builds, renders and checks the videos, and helps you with the cheat-sheet image, an independent review and the post text.

## What is in here

```
PROMPT.md / PROMPT.ja.md   the main prompt: from "my field" to a finished set, in 7 stages
prompts/                   helper prompts used by the main one
  cheatsheet-image.md        the cheat-sheet image (for an image-generation AI)
  review.md                  an independent review in a separate conversation
  post.md                    the post text, with the original posts as examples
  translate.md               the same set in another language
  (each has a .ja.md version in Japanese)
template/index.html        a blank page: heading, 2x4 grid, labels, page dots, render contract
render.mjs                 HTML -> mp4, one frame at a time (Playwright + ffmpeg), plus review images
check.mjs                  measures finished videos: format, loop seam, flashing
examples/
  camera-moves/            en/ and ja/: HTML, 3 videos, cheat sheet. NAMES.md: the 24 names
  motion-graphics/         ja/: HTML, 3 videos, cheat sheet. NAMES.md: the 24 names
```

## The examples

| Set | Look | Labels | Files |
|---|---|---|---|
| Camera moves & transitions | Gray wireframe scenes in a camera viewfinder, one blue for the subject | English, Japanese | [`examples/camera-moves`](examples/camera-moves) ・ [names](examples/camera-moves/NAMES.md) |
| Motion graphics | Navy stage with four colors, each card like a cut from a motion-design reel | Japanese (with English names) | [`examples/motion-graphics`](examples/motion-graphics) ・ [names](examples/motion-graphics/NAMES.md) |

The author speaks Japanese, so the examples are in Japanese; the camera set also got an English version. The mp4 and PNG files are the ones from the original posts. Each `NAMES.md` also has short notes on decisions made while building the set (what changed after review, how hard-to-show names were shown).

Open any `index.html` in a Chromium browser to watch the loop. `?page=2` shows page 2, `?t=3.5` shows a still at 3.5 seconds.

## How rendering works

Each video is an HTML page that draws on a `<canvas>`. Nothing uses a real-time clock: every frame is drawn from its frame number.

| In the HTML | Meaning |
|---|---|
| `window.N_FRAMES` | frames in one page (282 = 9.4 s x 30 fps) |
| `window.renderFrame(i)` | draws frame `i` |
| `window.prepareFrame(i)` | optional, may be async |
| `window.READY` | `true` when fonts are ready |
| `?page=N`, `?render=1` | which page / turn off the preview loop |

`render.mjs` calls `renderFrame(i)` for each frame, reads the canvas, and pipes it into ffmpeg, so no frame is dropped on a slow machine.

```bash
node render.mjs examples/camera-moves/en/index.html --page 1          # -> out/camera-moves-en-page1.mp4
node render.mjs examples/motion-graphics/ja/index.html --all --sheet --cards  # 3 videos + review images
node check.mjs out/motion-graphics-ja-page1.mp4                      # format, loop seam, flashing
```

Options: `--page`, `--all`, `--pages`, `--out`, `--out-dir`, `--fps`, `--crf`, `--sheet` (one contact sheet per page), `--sheet-fps`, `--cards` (one full-size image per card), `--cards-fps`, `--cards-seconds`. Run `node render.mjs --help`.
Output: 1200x1350, 30 fps, H.264 (yuv420p), no audio.

**Fonts.** Nothing is loaded from the network and no font files are included. The examples use fonts that come with macOS (Helvetica Neue, Hiragino Sans, Avenir Next, SF Mono). On Windows or Linux the browser falls back to other fonts, so text looks a little different, and Japanese needs a Japanese font installed (for example Noto Sans JP). Fonts are set as constants near the top of each `index.html`. A fresh render can also differ slightly from the bundled mp4 files because of encoder settings.

## The original posts

The series this came from (posts in Japanese):

- Scroll animations for websites: https://x.com/showheyohtaki/status/2108065874511077598 (not included here)
- Camera moves & transitions: https://x.com/showheyohtaki/status/2109112248832503895
- Motion graphics: https://x.com/showheyohtaki/status/2109840044554891464

## Made one for your field?

Post it with **#MotionExplainer**. I'll come and take a look.

## License

[MIT](LICENSE). You can use the prompts, code, videos and images here in your own work, including commercial work. A link back is welcome but not required.
