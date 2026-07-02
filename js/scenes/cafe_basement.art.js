// cafe_basement.art.js — "המרתף" — dusty basement, Fable 5 asleep in a server rack
// Sierra SCI0 style. Light: bare bulb top-center + breathing magenta server LED.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- CEILING (0,0 -> 320x22): black with dark-gray beams ----------
  r(0, 0, 320, 22, 0);
  r(0, 6, 320, 4, 8);
  r(0, 14, 320, 4, 8);
  // beam undersides (thin darker line for depth)
  r(0, 9, 320, 1, 0);
  r(0, 17, 320, 1, 0);

  // ---------- BACK WALL (stone) 0,22 -> 320x123 ----------
  r(0, 22, 320, 123, 8);
  // mortar lines: stone blocks ~24x14, staggered like brickwork
  for (let y = 22; y < 145; y += 14) {
    r(0, y, 320, 1, 0); // horizontal mortar
    const off = (((y - 22) / 14) % 2) * 12;
    for (let x = off; x < 320; x += 24) r(x, y, 1, 14, 0); // vertical mortar
  }
  // a few highlight bricks (P7) to break monotony
  const hb = [[26, 51], [122, 65], [206, 37], [290, 65], [62, 79], [230, 121], [110, 107], [14, 121], [194, 79]];
  for (const [bx, by] of hb) { r(bx, by, 22, 12, 7); r(bx, by + 11, 22, 1, 8); }
  // bulb light halo on the wall behind the bulb (widening dithered rows)
  const bulbOn = !((frame + 30) % 47 < 2); // rare dead-frame flicker, lit at frame 0
  if (bulbOn) {
    for (let i = 0; i < 6; i++) {
      const hw = 10 + i * 6;
      for (let x = 159 - hw + (i % 2) * 2; x < 159 + hw; x += 4) r(x, 24 + i * 2, 2, 2, 7);
    }
  }
  // vignette: subtle dark dither at the far-right wall edge (one-bulb basement mood)
  for (let y = 40; y < 144; y += 4) {
    r(312 + ((y >> 2) % 2) * 4, y, 2, 2, 0);
    r(304 + ((y >> 2) % 2) * 4, y + 2, 2, 2, 0);
  }

  // ---------- LIGHT CONE on floor (dithered trapezoid strips) ----------
  // painted before floor objects; floor base first so cone reads on it
  r(0, 145, 320, 55, 6);            // floor dirt-concrete
  r(0, 145, 320, 7, 8);             // dark depth strip y=145..152
  r(0, 144, 320, 1, 0);             // wall/floor grounding line
  if (bulbOn) {
    // trapezoid: narrow at y=150 (x 140..180), wide at y=180 (x 126..194)
    for (let y = 152; y < 180; y += 2) {
      const t = (y - 150) / 30;
      const x0 = Math.round(140 - 14 * t);
      const x1 = Math.round(180 + 14 * t);
      // fake dither: warm P14 core, sparser P14 fringe (soft pool of light on dirt)
      for (let x = x0 + ((y >> 1) % 2) * 2; x < x1; x += 4) {
        if (x > 146 && x < 174) r(x, y, 2, 2, 14);
        else if (((x + y) >> 2) % 2 === 0) r(x, y, 2, 2, 14);
      }
    }
  }
  // floor stains (P8 blobs)
  r(60, 160, 18, 4, 8); r(66, 158, 8, 8, 8);
  r(250, 168, 22, 5, 8); r(258, 166, 10, 9, 8);
  r(150, 186, 26, 5, 8);
  // floor perspective lines (closer = wider apart)
  r(0, 158, 320, 1, 8);
  r(0, 168, 320, 1, 8);
  r(0, 182, 320, 1, 8);
  // scattered dirt speckle
  for (let x = 6; x < 320; x += 26) r(x + (x % 3) * 4, 155 + ((x * 7) % 40), 3, 2, 8);

  // puddle 40,178,24,5 with shimmer
  r(40, 178, 24, 5, 1);
  r(42, 179, 20, 1, 9);
  if (frame % 20 < 10) r(48, 181, 10, 1, 9);

  // ---------- COBWEBS (corners) — after vignette so they stay readable ----------
  // right corner 294,22,26,14 — concentric quarter-web strands
  for (let i = 0; i < 6; i++) { r(294 + i * 4, 22, 1, 13 - i * 2, 7); r(294 + i * 4, 22, 4, 1, 7); }
  r(294, 22, 26, 1, 15); r(319, 22, 1, 14, 7);
  r(297, 30, 1, 4, 15); r(304, 27, 1, 4, 15); // bright strand glints
  // left corner 0,22,26,16 (mostly hidden behind stairs later — fine)
  for (let i = 0; i < 6; i++) { r(22 - i * 4, 22, 1, 15 - i * 2, 7); r(22 - i * 4, 22, 4, 1, 7); }
  r(0, 22, 26, 1, 7);

  // ---------- WOODEN STAIRS (exit UP, top-left) ----------
  // steps from (0,30) descending to (56,120): 8 steps, each ~26x10
  // stairwell dark opening behind the steps
  r(0, 24, 46, 44, 0);
  for (let i = 0; i < 8; i++) {
    const sx = 0, sy = 30 + i * 11;
    const sw = 22 + i * 5;           // widen as they come down/closer
    // riser (shadowed)
    r(sx, sy + 7, sw, 4, 8);
    // tread
    r(sx, sy, sw, 7, 6);
    r(sx, sy, sw, 1, 14);            // lit top edge (bulb light)
    r(sx, sy + 10, sw, 1, 0);        // black step edge
    r(sx + sw, sy, 1, 11, 0);        // black side edge
  }
  // landing shadow under the stairs
  r(0, 118, 58, 4, 0);
  // railing: continuous diagonal handrail (stepped 2px) + vertical balusters
  for (let i = 0; i < 24; i++) { r(16 + i * 2, 24 + i * 4, 3, 3, 6); r(16 + i * 2, 24 + i * 4, 3, 1, 14); }
  for (let i = 0; i < 5; i++) { const px = 20 + i * 10; r(px, 30 + i * 20, 2, 14, 6); }
  r(62, 118, 3, 28, 6); r(62, 118, 3, 1, 14); r(64, 118, 1, 28, 0); // newel post at bottom

  // ---------- ELECTRICAL BOX "קלוד" 70,52,26,34 ----------
  r(69, 51, 28, 36, 0);              // outline
  r(70, 52, 26, 34, 7);
  r(71, 53, 24, 2, 15);              // top highlight
  r(72, 60, 22, 1, 8); r(72, 74, 22, 1, 8); // panel seams
  r(88, 66, 4, 6, 8);                // handle
  r(74, 78, 4, 4, 4);                // red warning square
  // conduit down to floor
  r(81, 87, 3, 58, 8);
  r(81, 87, 1, 58, 0);
  // shadow under box on wall
  r(70, 87, 26, 2, 0);

  // ---------- FIBER CABLES (draw before server so they end IN it) ----------
  // cyan from left wall (0,96 -> 140,96) 3px, slight sag
  r(0, 96, 70, 3, 3); r(70, 98, 40, 3, 3); r(110, 96, 32, 3, 3);
  r(0, 95, 70, 1, 11); // highlight
  // white from ceiling (176,22 -> 176,58) 3px, shaded edge so it reads as a cable
  r(175, 22, 3, 38, 15);
  r(178, 22, 1, 38, 7);
  // red from right wall (320,110 -> 184,110) 3px, sag
  r(246, 110, 74, 3, 4); r(210, 112, 36, 3, 4); r(182, 110, 30, 3, 4);
  // yellow from floor grate (210,145 -> 184,130) stepped 3px
  r(208, 138, 3, 12, 14); r(196, 135, 15, 3, 14); r(196, 130, 3, 8, 14); r(182, 130, 16, 3, 14);

  // ---------- FLOOR GRATE 200,150,26,10 ----------
  r(199, 149, 28, 12, 8);
  r(200, 150, 26, 10, 8);
  for (let i = 0; i < 5; i++) r(202 + i * 5, 152, 3, 6, 0);
  r(199, 149, 28, 1, 7); // lit frame edge

  // ---------- SERVER RACK (Fable 5) 140,58,44,87, bottom y=145 ----------
  // shadow on floor
  r(136, 145, 54, 5, 8);
  r(139, 57, 46, 89, 0);             // outline
  r(140, 58, 44, 87, 8);             // cabinet
  r(141, 59, 42, 2, 7);              // top lit edge
  r(141, 59, 2, 85, 7);              // left lit edge (bulb is left-above)
  // vent strips
  for (let y = 66; y < 84; y += 4) r(146, y, 32, 2, 7);
  for (let y = 98; y < 140; y += 6) { r(146, y, 32, 2, 7); r(146, y + 2, 32, 1, 0); }
  // unit seams
  r(141, 94, 42, 1, 0); r(141, 120, 42, 1, 0);
  // DUST layer on top: noisy 2x2 checker 140,54,44,6
  for (let x = 140; x < 184; x += 4) {
    r(x, 54, 2, 2, 7);
    r(x + 2, 56, 2, 2, 7);
    if ((x >> 2) % 3 === 0) r(x + 1, 55, 2, 2, 6);
  }
  // THE LED — slow breathing pulse, never off (158,86,6,6)
  const led = frame % 40 < 20 ? 13 : 5;
  r(157, 85, 8, 8, 0);               // socket
  r(158, 86, 6, 6, led);
  if (frame % 40 < 20) { // brighter phase: glow halo
    r(156, 88, 2, 2, 5); r(164, 88, 2, 2, 5); r(160, 84, 2, 2, 5); r(160, 92, 2, 2, 5);
  }

  // ---------- WOODEN CRATE 96,120,34,25 (base y=145) ----------
  r(96, 148, 38, 3, 8);              // floor shadow
  r(95, 119, 36, 27, 0);             // outline
  r(96, 120, 34, 25, 6);
  // plank gaps
  r(96, 128, 34, 1, 0); r(96, 136, 34, 1, 0);
  r(107, 120, 1, 25, 0); r(118, 120, 1, 25, 0);
  r(96, 120, 34, 1, 14);             // lit top lip
  // faded stencil marks (Shuki 2000): dark smudge bars
  r(100, 130, 10, 3, 8); r(113, 130, 12, 3, 8);
  // RAG on the crate: gray lump 104,116,16,6 with folds — draped over the lip
  r(103, 114, 18, 9, 0);             // soft outline
  r(104, 115, 16, 7, 7);
  r(102, 117, 3, 4, 7);              // corner flopping over the crate edge
  r(106, 117, 5, 2, 8); r(113, 119, 4, 2, 8); // fold shadows
  r(105, 115, 8, 1, 15); r(111, 116, 4, 1, 15); // catch-light ridge

  // ---------- STEEL DOOR (bunker) 246,52,52,93, bottom y=145 ----------
  r(244, 50, 56, 97, 0);             // 2px outline
  r(246, 52, 52, 93, 7);
  r(247, 53, 50, 2, 15);             // top lit edge
  r(292, 54, 4, 91, 8);              // right shading
  // horizontal reinforcement bands
  r(247, 64, 50, 3, 8); r(247, 132, 50, 3, 8);
  // rivets
  for (let i = 0; i < 6; i++) { r(250 + i * 9, 57, 2, 2, 8); r(250 + i * 9, 139, 2, 2, 8); }
  for (let i = 0; i < 5; i++) { r(249, 70 + i * 14, 2, 2, 8); r(293, 70 + i * 14, 2, 2, 8); }
  // massive hinges (left side)
  r(240, 62, 8, 10, 8); r(240, 62, 8, 2, 7); r(240, 71, 8, 1, 0);
  r(240, 122, 8, 10, 8); r(240, 122, 8, 2, 7); r(240, 131, 8, 1, 0);
  // 4 keyholes, column x=266, y=70/88/106/124, each 6x8, glow rings matching cables
  const glow = [3, 11, 4, 14]; // cyan, white->lt-cyan, red, yellow
  for (let k = 0; k < 4; k++) {
    const ky = 70 + k * 18;
    r(265, ky - 1, 8, 10, glow[k]);  // glow ring
    r(266, ky, 6, 8, 0);             // keyhole
    r(268, ky + 5, 2, 3, glow[k] === 11 ? 15 : glow[k]); // slot glint
  }
  // door shadow on floor
  r(246, 145, 54, 4, 8);

  // ---------- BARE BULB (drawn last: hangs in front of everything) ----------
  r(158, 0, 2, 14, 8);               // wire
  if (bulbOn) {
    r(154, 14, 10, 8, 14);           // bulb
    r(153, 15, 1, 5, 14); r(164, 15, 1, 5, 14); // round-ish sides
    r(156, 15, 3, 2, 15);            // highlight
    r(156, 22, 6, 3, 14);            // glow tip below
    r(150, 18, 3, 1, 14); r(165, 18, 3, 1, 14); // side glow ticks
    r(158, 26, 2, 2, 14);            // falling light spark
  } else {
    r(154, 14, 10, 8, 8);            // dead frame flicker
  }
}
