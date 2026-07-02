// Chiptune player — Web Audio square/triangle waves, PC-speaker vibes.
// Tracks live in music-tracks.js as arrays of [freqHz, durationBeats] (freq 0 = rest).
let ctx = null, playing = null, enabled = true, timer = null;

async function loadTracks() {
  try { return (await import('./music-tracks.js')).TRACKS; }
  catch { return {}; }
}

export function toggleMusic() {
  enabled = !enabled;
  if (!enabled) stop();
  return enabled;
}
export function musicEnabled() { return enabled; }

function stop() {
  if (timer) { clearTimeout(timer); timer = null; }
  playing = null;
}

export async function playTrack(name, bpm = 140) {
  if (!enabled) { playing = name; return; }
  const TRACKS = await loadTracks();
  const notes = TRACKS[name];
  if (!notes || !notes.length) return;
  if (playing === name && timer) return; // already playing
  stop();
  playing = name;
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  const beat = 60 / bpm;
  let i = 0;
  const step = () => {
    if (playing !== name || !enabled) return;
    const [f, d] = notes[i % notes.length];
    if (f > 0) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.06, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d * beat * 0.9);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + d * beat * 0.95);
    }
    i++;
    timer = setTimeout(step, d * beat * 1000);
  };
  step();
}

export function sfx(kind) {
  if (!enabled) return;
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'square';
  g.gain.setValueAtTime(0.08, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  const freqs = { msg: 660, score: 880, die: 110, take: 520, error: 180 };
  o.frequency.value = freqs[kind] || 440;
  if (kind === 'score') { o.frequency.setValueAtTime(660, ctx.currentTime); o.frequency.setValueAtTime(880, ctx.currentTime + 0.08); o.frequency.setValueAtTime(1100, ctx.currentTime + 0.16); }
  if (kind === 'die') { o.frequency.setValueAtTime(220, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.6); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6); }
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.7);
}
