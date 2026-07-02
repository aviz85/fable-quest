// ─────────────────────────────────────────────────────────────
// FABLE QUEST — Sierra-style adventure engine (Hebrew, EGA)
// 320x200 logical canvas, text parser, inventory, score, deaths.
// ─────────────────────────────────────────────────────────────
import { P } from './palette.js';
import { drawHero } from './sprites.js';
import { playTrack, toggleMusic, musicEnabled, sfx } from './music.js';
import { SCENES, START_ROOM, MAX_SCORE, GAME_TITLE } from './scenes/index.js';

const W = 320, H = 200;
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// ── Game state ──────────────────────────────────────────────
const state = {
  room: START_ROOM,
  inventory: [],            // [{id, name, desc}]
  flags: {},
  score: 0,
  scored: {},               // score keys already awarded
  hero: { x: 160, y: 170, tx: null, dir: 1, frame: 0, visible: true },
  dead: false,
  won: false,
  moves: 0,
};

let msgQueue = [];
let currentScene = null;
let frame = 0;

// ── API given to scenes ─────────────────────────────────────
const api = {
  say(text) { msgQueue.push({ text }); showNextMsg(); },
  narrate(text) { api.say(text); },
  addItem(id, name, desc = '') {
    if (!api.hasItem(id)) {
      state.inventory.push({ id, name, desc });
      sfx('take');
      renderInventory();
    }
  },
  removeItem(id) {
    state.inventory = state.inventory.filter(i => i.id !== id);
    renderInventory();
  },
  hasItem(id) { return state.inventory.some(i => i.id === id); },
  setFlag(k, v = true) { state.flags[k] = v; },
  getFlag(k) { return state.flags[k]; },
  score(n, key) {
    if (key && state.scored[key]) return;
    if (key) state.scored[key] = true;
    state.score += n;
    sfx('score');
    renderStatus();
  },
  goto(roomId, heroX) { enterRoom(roomId, heroX); },
  die(text) {
    state.dead = true;
    sfx('die');
    showDeath(text);
  },
  win(text) {
    state.won = true;
    api.score(0);
    showWin(text);
  },
  state,
};

// ── Rooms ───────────────────────────────────────────────────
function enterRoom(roomId, heroX) {
  const scene = SCENES[roomId];
  if (!scene) { api.say(`[באג: חדר ${roomId} לא קיים]`); return; }
  state.room = roomId;
  currentScene = scene;
  const floor = scene.floor || { y1: 150, y2: 192 };
  state.hero.y = Math.min(Math.max(state.hero.y, floor.y1), floor.y2);
  if (typeof heroX === 'number') state.hero.x = heroX;
  else state.hero.x = Math.max(10, Math.min(310, state.hero.x));
  state.hero.tx = null;
  renderStatus();
  if (scene.music) playTrack(scene.music);
  if (scene.onEnter) scene.onEnter(api);
  saveGame('auto');
}

// ── Render loop (~15 fps, Sierra pace but not Sierra patience) ──
const WALK_SPEED = 5; // px per tick
function tick() {
  frame++;
  state.hero.frame = state.hero.tx !== null ? frame : 0;
  // hero walking
  if (state.hero.tx !== null && !state.dead) {
    const dx = state.hero.tx - state.hero.x;
    if (Math.abs(dx) <= WALK_SPEED) { state.hero.x = state.hero.tx; state.hero.tx = null; }
    else { state.hero.x += Math.sign(dx) * WALK_SPEED; state.hero.dir = Math.sign(dx); }
    checkEdges();
  }
  draw();
  setTimeout(tick, 66);
}

function checkEdges() {
  const ex = currentScene.exits || {};
  if (state.hero.x <= 4 && ex.left) { if (mayExit('left')) enterRoom(ex.left, 306); return; }
  if (state.hero.x >= 316 && ex.right) { if (mayExit('right')) enterRoom(ex.right, 14); return; }
}

// scene.onExit(dir, api) may return false to veto an edge exit (locked doors etc.)
function mayExit(dir) {
  if (currentScene.onExit && currentScene.onExit(dir, api) === false) {
    state.hero.tx = null;
    state.hero.x = dir === 'right' ? 310 : 10;
    return false;
  }
  return true;
}

function draw() {
  ctx.fillStyle = P[0];
  ctx.fillRect(0, 0, W, H);
  try { currentScene.draw(ctx, P, frame); }
  catch (e) { ctx.fillStyle = P[4]; ctx.fillRect(0, 0, W, H); }
  if (state.hero.visible && currentScene.hero !== false && !state.dead) {
    drawHero(ctx, P, state.hero.x, state.hero.y, state.hero.frame, state.hero.dir);
  }
}

// ── Hebrew parser ───────────────────────────────────────────
const VERBS = {
  'הסתכל': ['הסתכל', 'תסתכל', 'ראה', 'תראה', 'הבט', 'בדוק', 'תבדוק', 'בחן', 'look'],
  'קח': ['קח', 'תיקח', 'תקח', 'הרם', 'תרים', 'אסוף', 'תאסוף', 'גנוב', 'take'],
  'השתמש': ['השתמש', 'תשתמש', 'הפעל', 'תפעיל', 'use'],
  'פתח': ['פתח', 'תפתח', 'open'],
  'סגור': ['סגור', 'תסגור', 'close'],
  'דבר': ['דבר', 'תדבר', 'שוחח', 'תשוחח', 'אמור', 'תגיד', 'שאל', 'תשאל', 'talk'],
  'תן': ['תן', 'תתן', 'תני', 'הגש', 'give'],
  'לחץ': ['לחץ', 'תלחץ', 'הקש', 'press'],
  'דחוף': ['דחוף', 'תדחוף', 'push'],
  'משוך': ['משוך', 'תמשוך', 'pull'],
  'קרא': ['קרא', 'תקרא', 'read'],
  'אכול': ['אכול', 'תאכל', 'לעס', 'eat'],
  'שתה': ['שתה', 'תשתה', 'לגום', 'drink'],
  'הרח': ['הרח', 'תריח', 'רחרח', 'smell'],
  'לך': ['לך', 'תלך', 'זוז', 'סע', 'עבור', 'צא', 'תצא', 'היכנס', 'הכנס', 'תיכנס', 'טפס', 'תטפס', 'רד', 'תרד', 'עלה', 'תעלה', 'go'],
  'חפצים': ['חפצים', 'מלאי', 'תיק', 'כיסים', 'inventory', 'i'],
  'עזרה': ['עזרה', 'הוראות', 'help'],
  'ניקוד': ['ניקוד', 'נקודות', 'score'],
  'שמור': ['שמור', 'save'],
  'טען': ['טען', 'שחזר', 'load', 'restore'],
};
const VERB_LOOKUP = {};
for (const [canon, list] of Object.entries(VERBS)) for (const v of list) VERB_LOOKUP[v] = canon;

const SNARK = [
  'זה לא הולך לעבוד. גם לא אם תנסה שוב.',
  'המשחק מעריך את היצירתיות שלך. המשחק גם מסרב.',
  'נסיון יפה. פייבל 5 היה מבין אותך, אבל הוא עדיין ישן.',
  'אין לך מושג כמה מתכנתים נשרפו כדי שהמשפט הזה לא יעבוד.',
  'לא הבנתי. נסה פועל + שם עצם, כמו "קח מפתח".',
  'זה משחק הרפתקאות, לא צ׳אטבוט. תהיה ספציפי.',
];

function stripPrefix(word) {
  // strip Hebrew prepositions/prefixes: ה, ב, ל, את, על, עם
  let w = word;
  for (const p of ['את', 'על', 'עם', 'אל']) if (w === p) return '';
  if (w.length > 2 && ['ה', 'ב', 'ל'].includes(w[0])) return w; // keep both forms — matching tries both
  return w;
}

function normalize(w) {
  return w.replace(/[.,!?״"']/g, '');
}

function findHotspot(words) {
  const spots = (currentScene.hotspots || []);
  const invItems = state.inventory;
  const text = words.join(' ');
  // Try longest alias match against remaining text
  let best = null, bestLen = 0;
  for (const hs of spots) {
    for (const alias of [hs.name, ...(hs.aliases || [])]) {
      if (!alias) continue;
      if (matchAlias(text, words, alias) && alias.length > bestLen) { best = { kind: 'hotspot', obj: hs }; bestLen = alias.length; }
    }
  }
  for (const it of invItems) {
    for (const alias of [it.name, it.id]) {
      if (matchAlias(text, words, alias) && alias.length > bestLen) { best = { kind: 'item', obj: it }; bestLen = alias.length; }
    }
  }
  return best;
}

function matchAlias(text, words, alias) {
  const a = alias.trim();
  if (!a) return false;
  if (text.includes(a)) return true;
  // try with stripped prefixes on each word
  return words.some(w => {
    const bare = w.length > 2 && ['ה', 'ב', 'ל'].includes(w[0]) ? w.slice(1) : w;
    return bare === a || w === a;
  });
}

function parse(input) {
  const words = input.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (!words.length) return;
  state.moves++;

  // find verb — first word (with/without ת' prefix)
  let verb = VERB_LOOKUP[words[0]] || VERB_LOOKUP[words[0].replace(/^ו/, '')];
  const rest = words.slice(1).map(stripPrefix).filter(Boolean);

  // meta verbs
  if (verb === 'חפצים') { showInventory(); return; }
  if (verb === 'עזרה') { api.say('כתוב פקודות כמו: הסתכל / קח [חפץ] / דבר עם [דמות] / השתמש ב[חפץ] על [משהו] / פתח [דלת].\nחצים ← → מזיזים את הגיבור. M = מוזיקה. הניקוד למעלה. בהצלחה — ותשמור לעיתים קרובות. זה משחק סיירה.'); return; }
  if (verb === 'ניקוד') { api.say(`צברת ${state.score} נקודות מתוך ${MAX_SCORE}, ב-${state.moves} מהלכים.`); return; }
  if (verb === 'שמור') { saveGame('manual'); api.say('המשחק נשמר. החלטה חכמה. חכמה מאוד.'); return; }
  if (verb === 'טען') { if (loadGame('manual')) api.say('המשחק נטען.'); else api.say('אין שמירה. אמרתי לך לשמור.'); return; }

  // scene gets first shot at EVERYTHING
  if (currentScene.onCommand) {
    const target = findHotspot(words.slice(1).length ? words.slice(1) : words);
    const noun = target ? target.obj.name : rest.join(' ');
    const handled = currentScene.onCommand(verb || words[0], noun, api, {
      raw: input, words, target: target ? target.obj : null, targetKind: target ? target.kind : null,
    });
    if (handled) return;
  }

  // generic fallbacks
  if (!verb) { api.say(SNARK[Math.floor(Math.random() * SNARK.length)]); sfx('error'); return; }

  const target = findHotspot(words.slice(1));
  if (verb === 'הסתכל') {
    if (!words[1]) { api.say(currentScene.description || 'חדר. יש בו דברים. חלקם אפילו שימושיים.'); return; }
    if (target && target.kind === 'hotspot') { api.say(target.obj.look || `זה ${target.obj.name}. נראה בדיוק כמו שזה נשמע.`); return; }
    if (target && target.kind === 'item') { api.say(target.obj.desc || `זה ה${target.obj.name} שלך. שמור עליו.`); return; }
    api.say('אתה לא רואה כאן דבר כזה.'); return;
  }
  if (verb === 'קח') {
    if (target && target.kind === 'hotspot') { api.say(target.obj.take || 'אי אפשר לקחת את זה. האמן לי, ניסיתי לתכנת את זה אחרת.'); return; }
    if (target && target.kind === 'item') { api.say('זה כבר אצלך. אולי תבדוק את הכיסים לפני שאתה חוטף דברים?'); return; }
    api.say('לקחת מה בדיוק?'); return;
  }
  if (verb === 'דבר') {
    if (target && target.kind === 'hotspot' && target.obj.talk) { api.say(target.obj.talk); return; }
    api.say('אתה מדבר. אף אחד לא עונה. קלאסי.'); return;
  }
  if (target && target.kind === 'hotspot' && target.obj[verb]) { api.say(target.obj[verb]); return; }
  api.say(SNARK[Math.floor(Math.random() * SNARK.length)]);
}

// ── UI: messages, death, inventory, status ──────────────────
const msgBox = document.getElementById('msgbox');
const msgText = document.getElementById('msgtext');

function showNextMsg() {
  if (msgBox.classList.contains('open')) return;
  const m = msgQueue.shift();
  if (!m) return;
  msgText.textContent = m.text;
  msgBox.classList.add('open');
  sfx('msg');
}
function dismissMsg() {
  msgBox.classList.remove('open');
  if (msgQueue.length) setTimeout(showNextMsg, 60);
}
msgBox.addEventListener('click', dismissMsg);

function showDeath(text) {
  document.getElementById('deathtext').textContent = text;
  document.getElementById('deathbox').classList.add('open');
}
function showWin(text) {
  document.getElementById('wintext').textContent = text;
  document.getElementById('winscore').textContent = `הניקוד הסופי שלך: ${state.score} מתוך ${MAX_SCORE}`;
  document.getElementById('winbox').classList.add('open');
}
document.getElementById('btn-restore').addEventListener('click', () => {
  document.getElementById('deathbox').classList.remove('open');
  state.dead = false;
  if (!loadGame('auto')) restart();
});
document.getElementById('btn-restart').addEventListener('click', restart);
function restart() { localStorage.removeItem('fq_auto'); location.reload(); }

function showInventory() {
  if (!state.inventory.length) { api.say('הכיסים שלך ריקים. כמו ההבטחות של מנכ"לי AI.'); return; }
  api.say('אתה נושא:\n' + state.inventory.map(i => '• ' + i.name).join('\n'));
}

function renderInventory() {
  const el = document.getElementById('inventory');
  el.innerHTML = '';
  for (const it of state.inventory) {
    const b = document.createElement('span');
    b.className = 'inv-item';
    b.textContent = it.name;
    b.title = it.desc || it.name;
    b.addEventListener('click', () => api.say(it.desc || `זה ה${it.name} שלך.`));
    el.appendChild(b);
  }
}

function renderStatus() {
  document.getElementById('room-name').textContent = currentScene ? currentScene.name : '';
  document.getElementById('score').textContent = `ניקוד: ${state.score} מתוך ${MAX_SCORE}`;
}

// ── Save / Load ─────────────────────────────────────────────
function saveGame(slot) {
  const snap = { room: state.room, inventory: state.inventory, flags: state.flags, score: state.score, scored: state.scored, moves: state.moves, hero: { x: state.hero.x, y: state.hero.y } };
  localStorage.setItem('fq_' + slot, JSON.stringify(snap));
}
function loadGame(slot) {
  const raw = localStorage.getItem('fq_' + slot);
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    Object.assign(state, { inventory: s.inventory, flags: s.flags, score: s.score, scored: s.scored, moves: s.moves });
    state.hero.x = s.hero.x; state.hero.y = s.hero.y;
    state.dead = false;
    renderInventory();
    enterRoom(s.room);
    return true;
  } catch { return false; }
}

// ── Input wiring ────────────────────────────────────────────
const input = document.getElementById('cmd');
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && input.value.trim()) {
    if (msgBox.classList.contains('open')) { dismissMsg(); }
    const v = input.value;
    input.value = '';
    parse(v);
  }
  e.stopPropagation();
});
document.addEventListener('keydown', e => {
  if (msgBox.classList.contains('open') && (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ')) { dismissMsg(); return; }
  if (state.dead || state.won) return;
  if (document.activeElement === input && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const floor = currentScene && currentScene.floor || { y1: 150, y2: 192 };
  if (e.key === 'ArrowLeft') { state.hero.tx = Math.max(0, (state.hero.tx ?? state.hero.x) - 44); e.preventDefault(); }
  if (e.key === 'ArrowRight') { state.hero.tx = Math.min(320, (state.hero.tx ?? state.hero.x) + 44); e.preventDefault(); }
  if (e.key === 'ArrowUp') { state.hero.y = Math.max(floor.y1, state.hero.y - 10); e.preventDefault(); }
  if (e.key === 'ArrowDown') { state.hero.y = Math.min(floor.y2, state.hero.y + 10); e.preventDefault(); }
  if (e.key === 'm' || e.key === 'M') { const on = toggleMusic(); api.say(on ? 'מוזיקה: פועלת' : 'מוזיקה: כבויה'); if (on && currentScene.music) playTrack(currentScene.music); }
});
canvas.addEventListener('click', e => {
  if (msgBox.classList.contains('open')) { dismissMsg(); return; }
  const r = canvas.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width * W;
  const y = (e.clientY - r.top) / r.height * H;
  // click on a hotspot = look at it; click on floor = walk
  const hs = (currentScene.hotspots || []).find(h => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h);
  if (hs) { api.say(hs.look || `זה ${hs.name}.`); return; }
  const floor = currentScene.floor || { y1: 150, y2: 192 };
  if (y >= floor.y1 - 10) { state.hero.tx = Math.round(x); state.hero.y = Math.min(Math.max(y, floor.y1), floor.y2); }
});

// ── Boot ────────────────────────────────────────────────────
document.getElementById('title-screen').addEventListener('click', () => {
  document.getElementById('title-screen').classList.add('hidden');
  playTrack(currentScene && currentScene.music || 'title');
  input.focus();
});
document.title = GAME_TITLE;
document.getElementById('title-name').textContent = GAME_TITLE;
enterRoom(START_ROOM);
tick();
