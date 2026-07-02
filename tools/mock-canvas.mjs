// Mock 2D canvas context that rasterizes fillRect calls into an RGB framebuffer.
// Scene draw() code must use ONLY ctx.fillStyle + ctx.fillRect — everything else is a no-op.
export function makeMockCtx(w = 320, h = 200) {
  const fb = new Uint8Array(w * h * 3);
  let fill = [0, 0, 0];
  const parseColor = (s) => {
    if (typeof s !== 'string') return [255, 0, 255];
    const m = s.match(/^#([0-9a-fA-F]{6})$/);
    if (!m) return [255, 0, 255];
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const ctx = new Proxy({
    canvas: { width: w, height: h },
    set fillStyle(v) { fill = parseColor(v); },
    get fillStyle() { return '#' + fill.map(c => c.toString(16).padStart(2, '0')).join(''); },
    fillRect(x, y, rw, rh) {
      x = Math.round(x); y = Math.round(y); rw = Math.round(rw); rh = Math.round(rh);
      if (rw < 0) { x += rw; rw = -rw; }
      if (rh < 0) { y += rh; rh = -rh; }
      const x0 = Math.max(0, x), y0 = Math.max(0, y);
      const x1 = Math.min(w, x + rw), y1 = Math.min(h, y + rh);
      for (let yy = y0; yy < y1; yy++)
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * w + xx) * 3;
          fb[i] = fill[0]; fb[i + 1] = fill[1]; fb[i + 2] = fill[2];
        }
    },
  }, {
    get(t, prop) {
      if (prop in t) return t[prop];
      return () => {}; // forgive any other canvas method as no-op
    },
    set(t, prop, v) {
      if (prop === 'fillStyle') { t.fillStyle = v; return true; }
      return true;
    },
  });
  return { ctx, fb, w, h };
}

// nearest-neighbor 2x upscale for readability
export function scale2x(fb, w, h) {
  const out = new Uint8Array(w * 2 * h * 2 * 3);
  for (let y = 0; y < h * 2; y++)
    for (let x = 0; x < w * 2; x++) {
      const si = ((y >> 1) * w + (x >> 1)) * 3;
      const di = (y * w * 2 + x) * 3;
      out[di] = fb[si]; out[di + 1] = fb[si + 1]; out[di + 2] = fb[si + 2];
    }
  return out;
}
