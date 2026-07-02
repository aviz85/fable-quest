# SCENE-SPEC — the scene module contract

Every room is TWO files in `js/scenes/`:
- `<id>.art.js` — visuals only
- `<id>.js` — the scene object (imports draw from the art file)

`<id>` is lowercase latin snake_case (e.g. `anthropic_lobby`). ALL player-facing text is HEBREW.

## `<id>.art.js`

```js
// <id>.art.js — <room name in Hebrew>
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };
  // ... paint the FULL 320x200 screen with rects ...
}
```

RULES:
- ONLY `ctx.fillRect` + `ctx.fillStyle` (via the `r` helper). No arc/text/path/images — they render as garbage in tests.
- `P` is the EGA palette array (see ART-GUIDE.md). Colors are `P[0]`..`P[15]` ONLY.
- `frame` increments 10x/second forever — use it for small animations: blinking LEDs `if (frame % 10 < 5)`, flowing water `(frame*2) % 320`, flicker. Every scene should have at least one subtle animation.
- Paint EVERYTHING — sky/ceiling, walls, floor. No black voids unless intentionally a cave/space.
- Verify your work: `node tools/render-scene.mjs <id>` then LOOK at `out/renders/<id>.png` with the Read tool. Iterate until it genuinely looks like a Sierra background. Also run with `--hero` to check the hero (~10x28px, feet on floor) fits the scale of doors/furniture.

## `<id>.js`

```js
// <id>.js — <room name in Hebrew>
import { draw } from './<id>.art.js';

export default {
  id: '<id>',
  name: 'שם החדר בעברית',            // shown in the status bar
  description: 'תיאור החדר — מה השחקן רואה. מלא הומור. 2-4 משפטים.',
  draw,
  music: 'anthropic',                 // track name per act (see design doc)
  floor: { y1: 150, y2: 192 },        // walkable vertical band (hero feet)
  hero: true,                         // false = no hero sprite (closeups, cutscenes)
  exits: { left: 'other_room', right: 'another_room' }, // walking off screen edge
  hotspots: [
    {
      name: 'דלת',                    // canonical Hebrew noun
      aliases: ['כניסה', 'דלת כניסה'],// synonyms the parser should accept
      x: 140, y: 60, w: 40, h: 90,    // clickable rect ON the art (match your drawing!)
      look: 'תיאור מצחיק כשמסתכלים.',  // MANDATORY
      take: 'תגובה כשמנסים לקחת.',    // optional; default snark otherwise
      talk: 'תגובה כשמדברים אליו.',   // optional
      'פתח': 'תגובה לפועל ספציפי.',   // any verb key works as canned response
    },
  ],
  onEnter(api) {
    if (!api.getFlag('visited_<id>')) {
      api.setFlag('visited_<id>');
      api.say('טקסט כניסה ראשונה — אווירה + בדיחה.');
    }
  },
  onCommand(verb, noun, api, extra) {
    // verb = canonical Hebrew verb: הסתכל קח השתמש פתח סגור דבר תן לחץ דחוף משוך קרא אכול שתה הרח לך
    // noun = matched hotspot/item name, or raw remaining words
    // extra = { raw, words, target, targetKind }
    // return true if handled, false to fall through to generic engine responses
    if (verb === 'קח' && noun === 'גביע') {
      api.addItem('kos_kafe', 'כוס קפה של מתכנת', 'קר. מריר. כמו שוק ה-AI.');
      api.score(5, 'take_coffee');
      api.say('לקחת את כוס הקפה. היא קרה כמו הלב של ועדת האתיקה.');
      return true;
    }
    return false;
  },
};
```

## The `api` object

- `api.say(text)` — Sierra message box (supports `\n`). Queue-safe.
- `api.addItem(id, name, desc)` / `api.removeItem(id)` / `api.hasItem(id)`
- `api.setFlag(k, v)` / `api.getFlag(k)` — global cross-room state
- `api.score(n, 'unique_key')` — award points ONCE per key
- `api.goto(roomId, heroX?)` — teleport/scripted transition
- `api.die(text)` — Sierra death ☠ (funny death text!). Deaths are a FEATURE — each room should have at least one creative avoidable death or a very snarky near-death response.
- `api.win(text)` — endgame only
- `api.state` — direct state access (inventory, flags, hero pos)

## Style rules (Sierra late-80s, Hebrew)

- Second person, present tense: "אתה רואה...", "אתה מרים...".
- Snark: the narrator mocks the player lovingly (Space Quest tone).
- EVERY hotspot must have a `look` worth reading — jokes live there.
- Puzzles must respect the design doc for the room (items, flags, exits). Use EXACT item ids and flag names from the design doc — other rooms depend on them.
- Score awards per design doc; keys must be unique across the game (prefix with room id).
- Death text ends with a punchline.

## Verify

- `node tools/test-scene.mjs <id>` MUST pass (schema + draw + onCommand smoke test).
- `node tools/render-scene.mjs <id>` and LOOK at the PNG.
