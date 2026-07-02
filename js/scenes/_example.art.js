// _example.art.js — harness smoke test
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };
  // sunset dithered sky
  for (let y = 0; y < 100; y += 4) {
    r(0, y, 320, 4, y < 40 ? 1 : y < 70 ? 5 : 12);
    for (let x = (y % 8); x < 320; x += 8) r(x, y + 2, 4, 2, y < 40 ? 5 : y < 70 ? 12 : 14);
  }
  // sun
  r(250, 60, 30, 30, 14); r(255, 55, 20, 40, 14); r(245, 65, 40, 20, 14);
  // far wall / skyline
  r(0, 100, 320, 45, 8);
  for (let i = 0; i < 8; i++) { r(10 + i * 40, 80 - (i % 3) * 12, 26, 65 - (i % 3) * -12, 0); if (frame % 10 < 5) r(14 + i * 40, 90, 4, 4, 14); }
  // floor with perspective strips
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 8, 8);
  r(0, 170, 320, 2, 8);
  // a door
  r(140, 65, 36, 80, 6); r(142, 67, 32, 76, 4); r(168, 105, 4, 4, 14);
  r(139, 64, 38, 2, 0); r(139, 64, 2, 82, 0); r(175, 64, 2, 82, 0);
}
