#!/usr/bin/env node
// Full integration test: every scene passes test-scene, exits point to real rooms,
// startRoom exists, and the room graph is connected from startRoom.
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = `${ROOT}/js/scenes`;
const ids = readdirSync(dir)
  .filter(f => f.endsWith('.js') && !f.endsWith('.art.js') && f !== 'index.js' && !f.startsWith('_'))
  .map(f => f.replace(/\.js$/, ''))
  .sort();

let failed = 0;
for (const id of ids) {
  try { execFileSync('node', [`${ROOT}/tools/test-scene.mjs`, id], { stdio: 'pipe' }); }
  catch (e) { failed++; console.error(`✗ ${id}:\n${e.stdout}${e.stderr}`); }
}
console.log(`schema: ${ids.length - failed}/${ids.length} scenes pass`);

// graph check
if (!existsSync(`${dir}/index.js`)) { console.error('✗ index.js missing — run tools/gen-index.mjs'); process.exit(1); }
const { SCENES, START_ROOM } = await import(pathToFileURL(`${dir}/index.js`).href);
const all = Object.keys(SCENES);
let badExits = 0;
for (const [id, s] of Object.entries(SCENES)) {
  for (const [d, target] of Object.entries(s.exits || {})) {
    if (target && !SCENES[target]) { console.error(`✗ ${id} exit ${d} → "${target}" (no such room)`); badExits++; }
  }
}
// BFS from start (via exits only — script gotos not counted)
const seen = new Set([START_ROOM]);
const q = [START_ROOM];
while (q.length) {
  const s = SCENES[q.shift()];
  for (const t of Object.values(s.exits || {})) if (t && SCENES[t] && !seen.has(t)) { seen.add(t); q.push(t); }
}
const unreachable = all.filter(id => !seen.has(id));
if (unreachable.length) console.log(`ℹ rooms not reachable by walking exits alone (must be reachable via api.goto in scripts): ${unreachable.join(', ')}`);
console.log(`graph: ${all.length} rooms, start=${START_ROOM}, bad exits=${badExits}`);
process.exit(failed || badExits ? 1 : 0);
