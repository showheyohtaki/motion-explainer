#!/usr/bin/env node
// Render a cheat-sheet HTML page to mp4, one frame at a time.
//
//   node render.mjs examples/camera-moves/en/index.html --page 1
//   node render.mjs examples/camera-moves/en/index.html --all --sheet
//   node render.mjs template/index.html --page 1 --sheet --cards
//
// The HTML must expose:
//   window.READY          true when it is ready to draw (fonts loaded)
//   window.N_FRAMES       number of frames to capture
//   window.renderFrame(i) draws frame i on <canvas id="c">
//   window.prepareFrame(i) optional, may be async (e.g. to load an image)
//   window.CARD_RECTS     optional, [[x, y, w, h], ...] of the cards on the page (for --cards).
//                         Without it, the 2x4 grid of the template and the examples is assumed.
// The page is opened with ?page=N&render=1. Frames are read straight from the
// canvas and piped into ffmpeg, so nothing depends on real-time playback and
// no frame can be dropped.

import { chromium } from 'playwright';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error(`Usage: node render.mjs <file.html> [options]

  --page <n>     page to render (default 1)
  --all          render every page (see --pages)
  --pages <n>    number of pages used by --all (default 3)
  --out <file>   output mp4 (single page only). Default: out/<topic>-<lang>-page<n>.mp4
  --out-dir <d>  output folder (default: out)
  --fps <n>      frame rate (default 30; keep it equal to FPS in the HTML)
  --crf <n>      x264 quality, lower = better and larger (default 18)
  --sheet        also save a contact sheet PNG for review (see --sheet-fps)
  --sheet-fps <n> frames per second in the contact sheet (default 2 = every 0.5s; 4 = every 0.25s)
  --cards        also save one image per card: that card only, a still every 0.25s over one cycle,
                 at full size. Use these to review the cards one by one
  --cards-fps <n>      stills per second in the card images (default 4)
  --cards-seconds <n>  how much of the video each card image covers (default: half the page = one cycle)`);
  process.exit(msg ? 1 : 0);
}

const args = process.argv.slice(2);
const opt = { page: 1, pages: 3, all: false, fps: 30, crf: 18, sheet: false, sheetFps: 2, cards: false, cardsFps: 4, cardsSeconds: null, outDir: 'out', out: null, html: null };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  const next = () => (i + 1 < args.length ? args[++i] : usage(`${a} needs a value`));
  if (a === '-h' || a === '--help') usage();
  else if (a === '--page') opt.page = parseInt(next(), 10);
  else if (a === '--pages') opt.pages = parseInt(next(), 10);
  else if (a === '--all') opt.all = true;
  else if (a === '--out') opt.out = next();
  else if (a === '--out-dir') opt.outDir = next();
  else if (a === '--fps') opt.fps = parseInt(next(), 10);
  else if (a === '--crf') opt.crf = parseInt(next(), 10);
  else if (a === '--sheet') opt.sheet = true;
  else if (a === '--sheet-fps') opt.sheetFps = parseFloat(next());
  else if (a === '--cards') opt.cards = true;
  else if (a === '--cards-fps') opt.cardsFps = parseFloat(next());
  else if (a === '--cards-seconds') opt.cardsSeconds = parseFloat(next());
  else if (a.startsWith('--')) usage(`unknown option ${a}`);
  else if (!opt.html) opt.html = a;
  else usage(`unexpected argument ${a}`);
}
if (!opt.html) usage('give the path of an HTML file');
if (!existsSync(opt.html)) usage(`file not found: ${opt.html}`);
if (![opt.page, opt.pages, opt.fps, opt.crf, opt.sheetFps, opt.cardsFps].every(Number.isFinite) || (opt.cardsSeconds !== null && !Number.isFinite(opt.cardsSeconds))) usage('--page, --pages, --fps, --crf and --sheet-fps must be numbers');
if (opt.all && opt.out) usage('--out works with a single page. Use --out-dir with --all');
if (spawnSync('ffmpeg', ['-version']).status !== 0) usage('ffmpeg was not found. Install it and make sure it is on your PATH');

const htmlPath = path.resolve(opt.html);
// Default output name: the folder of the HTML file. If that folder is a language code
// (examples/camera-moves/en/index.html), the topic folder is added: camera-moves-en-page1.mp4
const dirName = path.basename(path.dirname(htmlPath));
const baseName = /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/.test(dirName)
  ? `${path.basename(path.dirname(path.dirname(htmlPath)))}-${dirName}`
  : (dirName || path.basename(htmlPath, '.html'));
const pages = opt.all ? Array.from({ length: opt.pages }, (_, i) => i + 1) : [opt.page];

function runFfmpeg(ffArgs, feed) {
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', ffArgs, { stdio: [feed ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
    let err = '';
    ff.stderr.on('data', (d) => { err = (err + d).slice(-4000); });
    ff.on('error', reject);
    ff.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}\n${err}`))));
    if (feed) {
      ff.stdin.on('error', () => {}); // the close handler reports the real error
      feed(ff.stdin).then(() => ff.stdin.end(), (e) => { ff.kill(); reject(e); });
    }
  });
}

const browser = await chromium.launch();
try {
  for (const pageNo of pages) {
    const out = path.resolve(opt.out ?? path.join(opt.outDir, `${baseName}-page${pageNo}.mp4`));
    mkdirSync(path.dirname(out), { recursive: true });

    const ctx = await browser.newContext({ viewport: { width: 1200, height: 1350 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => console.error(`[page error] ${e.message}`));
    const url = pathToFileURL(htmlPath);
    url.search = `?page=${pageNo}&render=1`;
    await page.goto(url.href);
    await page.waitForFunction(() => window.READY === true && typeof window.renderFrame === 'function', null, { timeout: 30000 });
    const info = await page.evaluate(() => {
      const c = document.getElementById('c') || document.querySelector('canvas');
      return { n: window.N_FRAMES, w: c.width, h: c.height, rects: Array.isArray(window.CARD_RECTS) ? window.CARD_RECTS : null };
    });
    if (!Number.isInteger(info.n) || info.n <= 0) throw new Error('window.N_FRAMES is not set in the HTML');
    console.log(`page ${pageNo}: ${info.n} frames, ${info.w}x${info.h}, ${opt.fps}fps -> ${path.relative(process.cwd(), out)}`);

    await runFfmpeg(
      ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(opt.fps), '-c:v', 'png', '-i', '-',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', String(opt.crf), '-pix_fmt', 'yuv420p',
        '-an', '-movflags', '+faststart', out],
      async (stdin) => {
        for (let i = 0; i < info.n; i++) {
          const b64 = await page.evaluate(async (f) => {
            if (window.prepareFrame) await window.prepareFrame(f);
            window.renderFrame(f);
            const c = document.getElementById('c') || document.querySelector('canvas');
            return c.toDataURL('image/png').slice('data:image/png;base64,'.length);
          }, i);
          if (!stdin.write(Buffer.from(b64, 'base64'))) await new Promise((r) => stdin.once('drain', r));
          if ((i + 1) % 30 === 0 || i + 1 === info.n) process.stdout.write(`\r  frame ${i + 1}/${info.n}`);
        }
        process.stdout.write('\n');
      },
    );
    await ctx.close();

    if (opt.sheet) {
      const sheet = out.replace(/\.mp4$/i, '') + '-sheet.png';
      const shots = Math.ceil((info.n / opt.fps) * opt.sheetFps);
      const cols = Math.min(6, shots), rows = Math.ceil(shots / cols);
      const tile = `tile=${cols}x${rows}:padding=8:margin=8:color=white`;
      // label each still with its time, so you can say "card 05 at 2.5s" when you fix it.
      // Some ffmpeg builds have no drawtext filter; then the sheet is made without labels.
      const label = `drawtext=text='%{pts\\:hms}':x=8:y=h-th-8:fontsize=22:fontcolor=white:box=1:boxcolor=black@0.6`;
      try {
        await runFfmpeg(['-y', '-loglevel', 'error', '-i', out, '-vf', `fps=${opt.sheetFps},scale=600:-1,${label},${tile}`, '-frames:v', '1', sheet]);
      } catch {
        await runFfmpeg(['-y', '-loglevel', 'error', '-i', out, '-vf', `fps=${opt.sheetFps},scale=600:-1,${tile}`, '-frames:v', '1', sheet]);
      }
      console.log(`  contact sheet -> ${path.relative(process.cwd(), sheet)}`);
    }

    if (opt.cards) {
      // default: the 2x4 grid used by template/index.html and the examples (1200x1350)
      const MX = 44, GAP = 34, CW = (1200 - MX * 2 - GAP) / 2, CH = 208, ROW0 = 104, PITCH = 300;
      const rects = info.rects || Array.from({ length: 8 }, (_, i) => [MX + (i % 2) * (CW + GAP), ROW0 + Math.floor(i / 2) * PITCH, CW, CH]);
      const secs = Math.min(opt.cardsSeconds ?? info.n / opt.fps / 2, info.n / opt.fps);
      const shots = Math.max(1, Math.round(secs * opt.cardsFps));
      const cols = Math.min(4, shots), rows = Math.ceil(shots / cols);
      const tile = `tile=${cols}x${rows}:padding=10:margin=10:color=white`;
      const label = `drawtext=text='%{pts\\:hms}':x=6:y=h-th-6:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6`;
      for (let i = 0; i < rects.length; i++) {
        const [x, y, w, h] = rects[i].map((v) => Math.round(v));
        const file = `${out.replace(/\.mp4$/i, '')}-card${String(i + 1).padStart(2, '0')}.png`;
        const base = ['-y', '-loglevel', 'error', '-t', String(secs), '-i', out];
        const vf = `fps=${opt.cardsFps},crop=${w}:${h}:${x}:${y}`;
        try {
          await runFfmpeg([...base, '-vf', `${vf},${label},${tile}`, '-frames:v', '1', file]);
        } catch {
          await runFfmpeg([...base, '-vf', `${vf},${tile}`, '-frames:v', '1', file]);
        }
      }
      console.log(`  ${rects.length} card images (${shots} stills each, every ${1 / opt.cardsFps}s) -> ${path.relative(process.cwd(), out.replace(/\.mp4$/i, ''))}-cardNN.png`);
    }
  }
} finally {
  await browser.close();
}
