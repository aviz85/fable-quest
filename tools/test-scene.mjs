#!/usr/bin/env node
// Validate a scene module against the SCENE-SPEC contract.
// Usage: node tools/test-scene.mjs <sceneId>        → full scene (js/scenes/<id>.js)
//        node tools/test-scene.mjs <sceneId> art    → art only (js/scenes/<id>.art.js)
import { makeMockCtx } from './mock-canvas.mjs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2];
const artOnly = process.argv[3] === 'art';
if (!id) { console.error('usage: node tools/test-scene.mjs <sceneId> [art]'); process.exit(1); }

const errors = [];
const warn = [];

const { P } = await import(pathToFileURL(`${ROOT}/js/palette.js`).href);

async function testDraw(drawFn, label) {
  for (const frame of [0, 3, 7, 12, 100]) {
    const { ctx } = makeMockCtx();
    try { drawFn(ctx, P, frame); }
    catch (e) { errors.push(`${label}: draw() threw at frame ${frame}: ${e.message}`); return; }
  }
}

if (artOnly) {
  const f = `${ROOT}/js/scenes/${id}.art.js`;
  if (!existsSync(f)) { console.error(`missing ${f}`); process.exit(1); }
  const mod = await import(pathToFileURL(f).href);
  if (typeof mod.draw !== 'function') errors.push('art file must `export function draw(ctx, P, frame)`');
  else await testDraw(mod.draw, 'art');
} else {
  const f = `${ROOT}/js/scenes/${id}.js`;
  if (!existsSync(f)) { console.error(`missing ${f}`); process.exit(1); }
  const mod = await import(pathToFileURL(f).href);
  const s = mod.default;
  if (!s || typeof s !== 'object') { console.error('scene must have a default export object'); process.exit(1); }

  if (s.id !== id) errors.push(`scene.id ("${s.id}") must equal filename id ("${id}")`);
  if (!s.name || typeof s.name !== 'string') errors.push('scene.name (Hebrew room name) missing');
  if (!/[֐-׿]/.test(s.name || '')) warn.push('scene.name has no Hebrew characters');
  if (!s.description || typeof s.description !== 'string') errors.push('scene.description missing');
  if (typeof s.draw !== 'function') errors.push('scene.draw missing (should re-export from .art.js)');
  else await testDraw(s.draw, 'scene');

  if (!Array.isArray(s.hotspots)) errors.push('scene.hotspots must be an array');
  else {
    if (s.hotspots.length < 3) warn.push(`only ${s.hotspots.length} hotspots — Sierra rooms reward curiosity, aim for 5+`);
    s.hotspots.forEach((h, i) => {
      if (!h.name) errors.push(`hotspot[${i}] missing name`);
      if (!h.look) warn.push(`hotspot[${i}] "${h.name}" missing look text`);
      for (const k of ['x', 'y', 'w', 'h']) if (typeof h[k] !== 'number') errors.push(`hotspot[${i}] "${h.name}" missing numeric ${k}`);
    });
  }
  if (s.exits && typeof s.exits !== 'object') errors.push('scene.exits must be an object');
  if (s.onCommand && typeof s.onCommand !== 'function') errors.push('scene.onCommand must be a function');
  if (s.floor && (typeof s.floor.y1 !== 'number' || typeof s.floor.y2 !== 'number')) errors.push('scene.floor must be {y1, y2}');

  // exercise onCommand with common verbs — must not throw
  if (typeof s.onCommand === 'function') {
    const fakeApi = new Proxy({}, { get: (t, p) => p === 'state' ? { flags: {}, inventory: [] } : (p === 'hasItem' || p === 'getFlag') ? () => false : () => {} });
    for (const verb of ['הסתכל', 'קח', 'השתמש', 'דבר', 'פתח', 'לך']) {
      try { s.onCommand(verb, 'משהו', fakeApi, { raw: verb + ' משהו', words: [verb, 'משהו'], target: null, targetKind: null }); }
      catch (e) { errors.push(`onCommand("${verb}") threw: ${e.message}`); break; }
    }
  }
}

for (const w of warn) console.log('⚠ ' + w);
if (errors.length) {
  for (const e of errors) console.error('✗ ' + e);
  process.exit(1);
}
console.log(`✓ ${id} ${artOnly ? '(art)' : ''} passes`);
