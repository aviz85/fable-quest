#!/usr/bin/env node
// Render a scene's art to PNG so you can LOOK at it.
// Usage: node tools/render-scene.mjs <sceneId>          → renders js/scenes/<id>.art.js
//        node tools/render-scene.mjs <sceneId> --hero   → also draws hero sprite at floor center
//        node tools/render-scene.mjs title              → renders js/title.art.js if present
// Output: out/renders/<id>.png (640x400, 2x upscale)
import { makeMockCtx, scale2x } from './mock-canvas.mjs';
import { writePNG } from './png.mjs';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2];
if (!id) { console.error('usage: node tools/render-scene.mjs <sceneId> [--hero]'); process.exit(1); }

const candidates = [
  `${ROOT}/js/scenes/${id}.art.js`,
  `${ROOT}/js/${id}.art.js`,
];
const file = candidates.find(existsSync);
if (!file) { console.error(`no art file found for "${id}" (tried ${candidates.join(', ')})`); process.exit(1); }

const mod = await import(pathToFileURL(file).href);
const draw = mod.draw || (mod.default && mod.default.draw) || mod.default;
if (typeof draw !== 'function') { console.error(`${file} does not export a draw(ctx, P, frame) function`); process.exit(1); }

const { P } = await import(pathToFileURL(`${ROOT}/js/palette.js`).href);
const { ctx, fb, w, h } = makeMockCtx(320, 200);
draw(ctx, P, 0);

if (process.argv.includes('--hero')) {
  const { drawHero } = await import(pathToFileURL(`${ROOT}/js/sprites.js`).href);
  drawHero(ctx, P, 160, 180, 0, 1);
}

mkdirSync(`${ROOT}/out/renders`, { recursive: true });
const out = `${ROOT}/out/renders/${id}.png`;
writePNG(out, scale2x(fb, w, h), w * 2, h * 2);

// quick stats: how much of the screen is still black (unpainted)?
let black = 0;
for (let i = 0; i < fb.length; i += 3) if (fb[i] === 0 && fb[i + 1] === 0 && fb[i + 2] === 0) black++;
const pct = (black / (w * h) * 100).toFixed(1);
console.log(`rendered ${out}`);
console.log(`black/unpainted pixels: ${pct}% ${pct > 40 ? '⚠ TOO MUCH BLACK — paint the whole screen (sky, walls, floor)!' : 'OK'}`);
