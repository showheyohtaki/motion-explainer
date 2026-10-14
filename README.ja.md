# Motion Explainer

**あなたの専門用語で、世界をもっとクリエイティブに。**

[English](README.md) | **日本語** | [中文](README.zh.md) | [한국어](README.ko.md) | [Español](README.es.md)

**あなたの分野の「必修の名前24」の解説アニメーション**を作るためのプロンプトです。8個の小さなアニメーションが並ぶループ動画3本と早見表1枚で、その分野の人なら知っておきたい名前を見せます。
このリポジトリをコーディングAI（Claude Code、Codex、Cursor など）に渡し、分野を伝えれば、一式を最後まで一緒に作れます。

![2つの見本: カメラワーク（左）とモーショングラフィックス（右）](assets/preview.gif)

*この方法で作った2つの一式です。見た目はわざと違えています。見た目はテンプレートではなく、分野から決まります。*

## なぜ作ったか

この動画には、たくさんのコメントをもらいました。

一つずつ読んでいく中で、手が止まった言葉があります。悩んでいたのは想像力が足りないことじゃなかった。その動きを何と呼べばいいのか、分からなかっただけなんだ。そんな趣旨のコメントでした。

すごく分かる、と思いました。頭の中には、もう絵があるんです。足りないのは才能でも想像力でもなくて、それをAIに渡すための言葉だけ。

専門用語は、その分野の共通言語です。カメラにも、モーショングラフィックスにも、料理にも、照明にも、きっとあります。いろんな言語で、いろんな分野のプロが「これだけは知っておいて」という専門用語を教えてくれたら、ものすごく役に立つはずです。

だから、この動画を作るプロンプトそのものを公開することにしました。

「this is how you become a creative director」というコメントもありました。

まさに、と思いました。

いろんな分野の専門用語を知ることで、これまで眠っていたクリエイティブな才能を発揮できる人は、きっともっと増えます。

だから、このリポジトリを使って、自分の分野のことを分かりやすく教えてくれる「先生」が増えたらうれしいです。

その先に、AIと一緒にすばらしい才能を発揮するクリエイティブディレクターが世界中に増えていったら、素敵だと思います。

— 大滝昇平（[@showheyohtaki](https://x.com/showheyohtaki)）

## 使い方

1. [Node.js](https://nodejs.org/) 18以上と [ffmpeg](https://ffmpeg.org/) を入れ、このフォルダで次を実行します。
   ```bash
   npm install
   npx playwright install chromium
   ```
2. このフォルダをコーディングAIで開き、次の文を貼ります。
   ```
   PROMPT.ja.md を読んで、そのとおりに進めて。
   分野: <例:「コーヒーの抽出」「舞台照明」「UIパーツ」>
   誰に向けたものか: <例:「画像生成AIで商品写真を作る人」>
   ```
   一式は、あなたがAIに話しかけている言語で作られます。名前はその言語の現場で使われている呼び方を調べて使い、ラベル・早見表・投稿文もその言語です。英語以外で作るときは、どの名前の下にも英語名が入ります。どの国の人が見ても、AIに何と指示すればいいか分かるようにするためです。英語版や別の言語版は任意で、最後にAIが一度だけ聞きます。
3. AIと一緒に進めます。AIは2回止まって確認を待ちます。**24個の名前の一覧**ができたときと、カードの**見た目**が決まったときです。あなたの専門知識がいちばん効くのは1回目です。そのあとAIが動画を作って書き出し、自分で見直し、早見表の画像・別のAIによる評価・投稿文まで手伝います。

## 中身

```
PROMPT.md / PROMPT.ja.md   メインのプロンプト: 「自分の分野」から完成した一式まで、7段階
prompts/                   メインのプロンプトから使う補助のプロンプト
  cheatsheet-image.md        早見表の画像（画像生成AI向け）
  review.md                  別の会話で行う、作っていないAIによる評価
  post.md                    投稿文（元の投稿を例として収録）
  translate.md               同じ一式を別の言語で作る
  （それぞれ日本語版の .ja.md あり）
template/index.html        空のページ: 見出し・2×4のマス・ラベル・ページ位置の印・書き出しの約束
render.mjs                 HTML → mp4（1コマずつ。Playwright＋ffmpeg）と見直し用の画像
check.mjs                  できた動画を測る: 形式・ループの継ぎ目・点滅
examples/
  camera-moves/            en/ と ja/: HTML・動画3本・早見表。NAMES.md: 24個の名前
  motion-graphics/         ja/: HTML・動画3本・早見表。NAMES.md: 24個の名前
```

## 見本

| 一式 | 見た目 | ラベル | ファイル |
|---|---|---|---|
| カメラワーク＆切り替え | カメラのファインダーの中にグレーの線画の場面。主役だけ青 | 英語・日本語 | [`examples/camera-moves`](examples/camera-moves) ・ [名前の一覧](examples/camera-moves/NAMES.md) |
| モーショングラフィックス | 濃紺の地に4色。1枚ずつ、制作会社のショーリールの1カットのように | 日本語（英語名つき） | [`examples/motion-graphics`](examples/motion-graphics) ・ [名前の一覧](examples/motion-graphics/NAMES.md) |

作者が日本語話者なので見本は日本語で、カメラワーク回だけ英語版も作りました。mp4 と PNG は元の投稿で使った物です。各 `NAMES.md` には、作る途中で決めたこと（評価のあとで直した点、見せにくい名前をどう見せたか）の短いメモも付けています。

`index.html` を Chromium 系のブラウザで開くとループ再生されます。`?page=2` で2ページ目、`?t=3.5` で3.5秒の静止画です。

## 書き出しの仕組み

動画はそれぞれ、`<canvas>` に描くHTMLのページです。実時計は使わず、どのコマもコマ番号から描きます。

| HTMLの中 | 意味 |
|---|---|
| `window.N_FRAMES` | 1ページのコマ数（282＝9.4秒×30fps） |
| `window.renderFrame(i)` | コマ `i` を描く |
| `window.prepareFrame(i)` | 任意。非同期でもよい |
| `window.READY` | 書体の準備ができたら `true` |
| `?page=N`、`?render=1` | ページの指定／プレビュー再生を止める |

`render.mjs` はコマごとに `renderFrame(i)` を呼び、canvas を読み取って ffmpeg に流します。遅いパソコンでもコマ落ちしません。

```bash
node render.mjs examples/camera-moves/ja/index.html --page 1          # → out/camera-moves-ja-page1.mp4
node render.mjs examples/motion-graphics/ja/index.html --all --sheet --cards  # 動画3本と見直し用の画像
node check.mjs out/motion-graphics-ja-page1.mp4                      # 形式・継ぎ目・点滅
```

オプション: `--page`、`--all`、`--pages`、`--out`、`--out-dir`、`--fps`、`--crf`、`--sheet`（ページ全体のコマ一覧）、`--sheet-fps`、`--cards`（カード1枚ずつの原寸の一覧）、`--cards-fps`、`--cards-seconds`。詳しくは `node render.mjs --help`。
出力: 1200×1350、30fps、H.264（yuv420p）、音なし。

**書体。** ネットワークからは何も読み込まず、書体ファイルも同梱していません。見本は macOS に入っている書体（Helvetica Neue、ヒラギノ角ゴシック、Avenir Next、SF Mono）を指定しています。Windows や Linux では別の書体に置き換わるので見た目が少し変わり、日本語には日本語の書体（Noto Sans JP など）が要ります。書体は各 `index.html` の先頭近くの定数で変えられます。同じ理由と書き出しの設定の違いで、書き出し直した動画は同梱の mp4 と少し違うことがあります。

## 元の投稿

- Webのスクロール演出: https://x.com/showheyohtaki/status/2108065874511077598 （このリポジトリには未収録）
- カメラワーク＆切り替え: https://x.com/showheyohtaki/status/2109112248832503895
- モーショングラフィックス: https://x.com/showheyohtaki/status/2109840044554891464

## あなたの分野の版ができたら

**#MotionExplainer** を付けて投稿してください。見に行きます。

## ライセンス

[MIT](LICENSE)。プロンプト・コード・動画・画像は、商用を含めて自由に使えます。リンクを貼ってもらえるとうれしいですが、必須ではありません。
