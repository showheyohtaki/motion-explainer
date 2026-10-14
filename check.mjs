#!/usr/bin/env node
// Measure finished videos: format, loop seam and flashing.
//
//   node check.mjs out/coffee-en-page1.mp4 out/coffee-en-page2.mp4 out/coffee-en-page3.mp4
//   node check.mjs video.mp4 --rects '[[44,104,539,208],[617,104,539,208]]'
//
// What it reports, per video:
//   format    1200x1350, 30 fps, h264, yuv420p, no audio, 9.4 s, 282 frames
//   seam      mean difference between the last and the first frame (0-255), next to the
//             largest difference between two neighboring frames inside the video. A seamless
//             loop has a seam no bigger than a normal step.
//   flashing  for each card area (and the whole frame): mean brightness per frame, counting
//             light/dark changes of 10% (26 of 255) or more. A flash is a pair of opposite
//             changes. 3 or more flashes inside any one second fails. Small moving edges barely
//             move the mean of a card, so they do not count; a card that turns dark and light does.
// Needs ffmpeg and ffprobe on the PATH. Exits with 1 if anything fails.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const args = process.argv.slice(2);
const files = [];
let rects = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--rects') rects = JSON.parse(args[++i]);
  else if (args[i] === '-h' || args[i] === '--help') { console.log('Usage: node check.mjs <video.mp4> [more.mp4] [--rects JSON]'); process.exit(0); }
  else files.push(args[i]);
}
if (!files.length) { console.error('Usage: node check.mjs <video.mp4> [more.mp4] [--rects JSON]'); process.exit(1); }

// default: the 2x4 card grid used by template/index.html and the examples
const MX = 44, GAP = 34, CW = (1200 - MX * 2 - GAP) / 2, CH = 208, ROW0 = 104, PITCH = 300;
rects ??= Array.from({ length: 8 }, (_, i) => [MX + (i % 2) * (CW + GAP), ROW0 + Math.floor(i / 2) * PITCH, CW, CH]);

const S = 2;                // analyse at half size: fast, and enough for averages
const THRESH = 255 * 0.1;   // a "change" is 10% of full brightness or more

function probe(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,codec_name,width,height,r_frame_rate,pix_fmt,nb_frames:format=duration', '-of', 'json', file]);
  if (r.status !== 0) throw new Error(`ffprobe failed on ${file}`);
  const j = JSON.parse(r.stdout);
  const v = j.streams.find((s) => s.codec_type === 'video');
  const [a, b] = v.r_frame_rate.split('/').map(Number);
  return { w: v.width, h: v.height, fps: a / b, codec: v.codec_name, pix: v.pix_fmt, frames: Number(v.nb_frames), dur: Number(j.format.duration), audio: j.streams.some((s) => s.codec_type === 'audio') };
}

function analyse(file, w, h) {
  const W = Math.floor(w / S), H = Math.floor(h / S), size = W * H;
  const regions = [...rects.map((r, i) => ({ name: `card ${i + 1}`, r: r.map((v) => Math.round(v / S)) })), { name: 'whole frame', r: [0, 0, W, H] }];
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', ['-v', 'error', '-i', file, '-vf', `scale=${W}:${H},format=gray`, '-f', 'rawvideo', '-']);
    let buf = Buffer.alloc(0), first = null, prev = null, last = null;
    const steps = [], series = regions.map(() => []);
    ff.stdout.on('data', (d) => {
      buf = Buffer.concat([buf, d]);
      while (buf.length >= size) {
        const f = Buffer.from(buf.subarray(0, size)); buf = buf.subarray(size);
        regions.forEach((g, k) => {
          const [x, y, rw, rh] = g.r; let sum = 0;
          for (let yy = y; yy < y + rh; yy++) for (let xx = x; xx < x + rw; xx++) sum += f[yy * W + xx];
          series[k].push(sum / (rw * rh));
        });
        if (prev) steps.push(meanDiff(prev, f));
        if (!first) first = f;
        prev = f; last = f;
      }
    });
    ff.on('error', reject);
    ff.on('close', (code) => code === 0 ? resolve({ regions, series, steps, seam: meanDiff(last, first) }) : reject(new Error(`ffmpeg exited with ${code}`)));
  });
}
function meanDiff(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; }

// count changes of THRESH or more, then the most flashes (pairs of changes) inside any 1-second window
function maxFlashesPerSecond(v, fps) {
  // hi/lo: brightest and darkest value since the last change. dir: direction of the last change
  const turns = []; let hi = v[0], lo = v[0], dir = 0;
  for (let i = 1; i < v.length; i++) {
    hi = Math.max(hi, v[i]); lo = Math.min(lo, v[i]);
    if (dir >= 0 && hi - v[i] >= THRESH) { turns.push(i); dir = -1; hi = lo = v[i]; }
    else if (dir <= 0 && v[i] - lo >= THRESH) { turns.push(i); dir = 1; hi = lo = v[i]; }
  }
  let best = 0;
  for (let a = 0, b = 0; b < turns.length; b++) { while (turns[b] - turns[a] >= fps) a++; best = Math.max(best, b - a + 1); }
  return { changes: turns.length, flashes: Math.floor(best / 2) };
}

let failed = false;
for (const file of files) {
  if (!existsSync(file)) { console.error(`not found: ${file}`); failed = true; continue; }
  const p = probe(file);
  console.log(`\n${file}`);
  const fmt = [
    [p.w === 1200 && p.h === 1350, `${p.w}x${p.h}`],
    [Math.abs(p.fps - 30) < 0.01, `${p.fps} fps`],
    [p.codec === 'h264' && p.pix === 'yuv420p', `${p.codec} ${p.pix}`],
    [!p.audio, p.audio ? 'has audio' : 'no audio'],
    [Math.abs(p.dur - 9.4) < 0.05 && p.frames === 282, `${p.dur.toFixed(2)} s, ${p.frames} frames`],
  ];
  const fmtOk = fmt.every(([ok]) => ok);
  console.log(`  format   ${fmtOk ? 'ok  ' : 'FAIL'}  ${fmt.map(([ok, s]) => (ok ? s : `[${s}]`)).join(', ')}`);
  const a = await analyse(file, p.w, p.h);
  const maxStep = Math.max(...a.steps), seamOk = a.seam <= Math.max(maxStep, 1);
  console.log(`  seam     ${seamOk ? 'ok  ' : 'FAIL'}  last->first ${a.seam.toFixed(2)}  (largest step inside the video ${maxStep.toFixed(2)}; 0-255 scale)`);
  let flashOk = true; const rows = [];
  a.regions.forEach((g, k) => {
    const r = maxFlashesPerSecond(a.series[k], p.fps);
    const ok = r.flashes < 3; flashOk &&= ok;
    rows.push(`${g.name}: ${r.flashes}${ok ? '' : ' FAIL'}`);
  });
  console.log(`  flashing ${flashOk ? 'ok  ' : 'FAIL'}  most flashes in 1 s -> ${rows.join(' | ')}`);
  failed ||= !(fmtOk && seamOk && flashOk);
}
process.exit(failed ? 1 : 0);
