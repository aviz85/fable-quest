// anthropic_library.art.js — ספריית המגילות (Anthropic scriptorium)
// Tall warm-dark library: scroll shelves floor-to-ceiling, round stained-glass
// window, dusty light beam, Monk Sofer copying the Constitution by candlelight,
// a dangerously tall pile of 8,999 finished copies, stairs down to the court.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ============ BACK WALL (0..145) — deep night-blue gloom ============
  r(0, 0, 320, 145, 1);
  // darken with sparse checker dither (library gloom, subtler up top)
  for (let y = 18; y < 145; y += 6) {
    for (let x = 76 + ((y / 6) % 2) * 6; x < 248; x += 12) r(x, y, 4, 2, 0);
  }
  // faint stone course lines
  r(74, 60, 176, 1, 0); r(74, 104, 176, 1, 0);
  // warm candle-glow dither on wall behind the desk (subtle, not a blob)
  for (let y = 86; y < 142; y += 4) {
    const hw = Math.min(44, (y - 78) * 2);       // widens downward
    for (let x = 190 - hw; x < 190 + hw; x += 8) r(x + ((y / 4) % 2) * 4, y, 4, 2, 6);
  }

  // ============ CEILING + WOOD BEAMS (0,0,320,18) ============
  r(0, 0, 320, 18, 0);
  r(0, 8, 320, 6, 6);            // main horizontal beam
  r(0, 8, 320, 1, 14);           // candle-lit top edge
  r(0, 13, 320, 1, 8);           // beam underside shade
  for (let x = 20; x < 320; x += 60) { r(x, 0, 8, 18, 6); r(x, 0, 2, 18, 8); r(x + 6, 0, 2, 18, 8); }
  r(0, 16, 320, 2, 0);           // dark seam under ceiling

  // ============ LEFT SCROLL SHELVES (0,18,72,132) ============
  r(0, 18, 74, 132, 6);          // wood case
  r(72, 18, 2, 132, 0);          // right outline
  r(0, 18, 74, 2, 0);            // top outline
  for (let s = 0; s < 6; s++) {
    const sy = 20 + s * 26;
    r(0, sy, 72, 3, 6); r(0, sy, 72, 1, 14); r(0, sy + 2, 72, 1, 8);
  }
  r(24, 20, 2, 128, 8); r(48, 20, 2, 128, 8);   // dividers
  for (let s = 0; s < 5; s++) {
    const sy = 23 + s * 26;
    for (let cxi = 0; cxi < 3; cxi++) {
      const cx = 2 + cxi * 24;
      if ((s === 1 && cxi === 2) || (s === 3 && cxi === 0)) { r(cx, sy, 20, 20, 0); continue; }
      r(cx, sy, 20, 20, 0);      // cell shadow (deep)
      r(cx + 1, sy + 3, 18, 5, 15); r(cx + 1, sy + 3, 3, 5, 14); r(cx + 16, sy + 3, 3, 5, 14);
      r(cx + 1, sy + 10, 18, 5, 7); r(cx + 1, sy + 10, 3, 5, 14); r(cx + 16, sy + 10, 3, 5, 14);
      r(cx + 1, sy + 8, 18, 1, 8);
    }
  }

  // ============ RIGHT SCROLL SHELVES (252,18,68,132) — mirror ============
  r(250, 18, 70, 132, 6);
  r(250, 18, 2, 132, 0);
  r(250, 18, 70, 2, 0);
  for (let s = 0; s < 6; s++) {
    const sy = 20 + s * 26;
    r(252, sy, 68, 3, 6); r(252, sy, 68, 1, 14); r(252, sy + 2, 68, 1, 8);
  }
  r(274, 20, 2, 128, 8); r(298, 20, 2, 128, 8);
  for (let s = 0; s < 5; s++) {
    const sy = 23 + s * 26;
    for (let cxi = 0; cxi < 3; cxi++) {
      const cx = 253 + cxi * 24;
      if (s === 2 && cxi === 1) { // the tilted scroll cell
        r(cx, sy, 20, 20, 0);
        r(cx + 2, sy + 4, 4, 4, 15); r(cx + 5, sy + 7, 4, 4, 15);
        r(cx + 8, sy + 10, 4, 4, 15); r(cx + 11, sy + 13, 4, 4, 15);
        r(cx + 14, sy + 15, 4, 3, 14);
        continue;
      }
      r(cx, sy, 20, 20, 0);
      r(cx + 1, sy + 3, 18, 5, 15); r(cx + 1, sy + 3, 3, 5, 14); r(cx + 16, sy + 3, 3, 5, 14);
      r(cx + 1, sy + 10, 18, 5, 7); r(cx + 1, sy + 10, 3, 5, 14); r(cx + 16, sy + 10, 3, 5, 14);
      r(cx + 1, sy + 8, 18, 1, 8);
    }
  }

  // ============ ROUND STAINED-GLASS WINDOW (136,24,52,52) ============
  // stone ring (octagon of rects)
  r(144, 22, 36, 56, 7); r(136, 30, 52, 40, 7); r(140, 26, 44, 48, 7);
  r(146, 24, 32, 52, 6); r(138, 32, 48, 36, 6); r(142, 28, 40, 44, 6); // wood inner ring
  // glass field (octagonal)
  r(148, 28, 28, 44, 1); r(142, 34, 40, 32, 1); r(145, 31, 34, 38, 1);
  // mosaic squares P3/P11/P14
  const mos = [3, 11, 14, 11, 3, 14];
  for (let iy = 0; iy < 6; iy++) {
    for (let ix = 0; ix < 6; ix++) {
      if ((ix === 0 || ix === 5) && (iy === 0 || iy === 5)) continue;
      r(145 + ix * 6, 33 + iy * 6, 5, 5, mos[(ix + iy * 3) % 6]);
    }
  }
  // leading cross
  r(145, 50, 34, 1, 0); r(161, 33, 1, 34, 0);
  // the Holy Hesitation: monk figure reaching for a door handle — not pressing
  r(155, 38, 6, 5, 15);          // head
  r(154, 43, 8, 14, 11);         // robe
  r(162, 46, 5, 2, 15);          // outstretched arm
  r(168, 44, 3, 10, 6);          // the door
  r(167, 48, 1, 2, 14);          // the handle, forever untouched
  // frame outline
  r(144, 22, 36, 1, 0); r(144, 77, 36, 1, 0); r(136, 30, 1, 40, 0); r(187, 30, 1, 40, 0);

  // ============ LIGHT BEAM (solid dithered shaft, window → floor patch) ============
  // trapezoid: top edge under window (x 148..178), bottom at floor patch (x 146..186)
  for (let y = 78; y < 152; y += 2) {
    const t = (y - 78) / 74;                    // 0 at window, 1 at floor
    const xL = Math.round(148 - 2 * t);
    const xR = Math.round(178 + 8 * t);
    // dithered fill: alternating cyan strips
    for (let x = xL + ((y / 2) % 2) * 4; x < xR; x += 8) r(x, y, 3, 2, 3);
    // bright core strip
    r(xL + Math.round((xR - xL) * 0.35), y, 3, 2, 11);
  }
  // crisp bright edges of the shaft
  for (let y = 78; y < 152; y += 4) {
    const t = (y - 78) / 74;
    r(Math.round(148 - 2 * t), y, 1, 4, 11);
    r(Math.round(178 + 8 * t), y, 1, 4, 11);
  }
  // dust motes drifting in the beam (animated)
  const d = frame % 20;
  r(152 + (d % 12), 84 + d, 1, 1, 15);
  r(160 - (d % 8), 100 + ((d * 2) % 40), 1, 1, 15);
  r(154 + (d % 10), 120 + (d % 24), 1, 1, 15);
  if (d < 10) { r(150, 96, 1, 1, 15); r(166, 132, 1, 1, 15); }

  // ============ STONE FLOOR (0,145,320,55) ============
  r(0, 145, 320, 55, 8);
  r(0, 145, 320, 3, 0);          // far dark strip
  r(0, 148, 320, 2, 7);          // lit slab edge at wall base
  // grooves, wider apart nearer
  r(0, 156, 320, 1, 0); r(0, 168, 320, 1, 0); r(0, 181, 320, 1, 0); r(0, 194, 320, 1, 0);
  for (let x = 14; x < 320; x += 30) r(x, 150, 1, 6, 0);
  for (let x = 28; x < 320; x += 30) r(x, 157, 1, 11, 0);
  for (let x = 14; x < 320; x += 30) r(x, 169, 1, 12, 0);
  for (let x = 28; x < 320; x += 30) r(x, 182, 1, 12, 0);
  // gentle lighter dither around the light patch (tight, subtle)
  for (let y = 150; y < 174; y += 4) {
    for (let x = 142 + ((y / 4) % 2) * 4; x < 192; x += 8) r(x, y, 3, 1, 7);
  }
  // ============ STAINED-GLASS LIGHT PATCH on floor (146,152,40,18) ============
  r(148, 154, 10, 6, 3); r(160, 153, 12, 7, 14); r(174, 154, 10, 6, 3);
  r(150, 161, 12, 7, 14); r(164, 161, 10, 7, 11); r(176, 161, 8, 6, 14);
  r(154, 168, 26, 3, 11);
  r(146, 156, 3, 10, 11); r(184, 156, 3, 8, 11);

  // ============ STAIRWELL DOWN — EXIT (24,150,34,44) ============
  // dark opening cut into the floor, steps descending off-screen
  r(22, 150, 40, 50, 0);
  r(24, 150, 36, 8, 7);  r(24, 157, 36, 1, 15);   // top tread, lit lip
  r(26, 158, 34, 9, 8);  r(26, 158, 34, 1, 7);
  r(28, 167, 32, 10, 8); r(28, 167, 32, 1, 7);
  for (let y = 178; y < 198; y += 4) for (let x = 30; x < 60; x += 8) r(x + ((y / 4) % 2) * 4, y, 4, 2, 8); // fading into dark
  r(22, 150, 2, 50, 8); r(60, 150, 2, 50, 8);     // side walls of the well
  // newel post + brass knob on the right of the opening
  r(60, 134, 4, 18, 6); r(60, 134, 1, 18, 14); r(59, 131, 6, 4, 14); r(59, 131, 6, 1, 15);

  // ============ LOW SCROLL PILE (100,128,24,22) ============
  r(98, 148, 28, 3, 0);          // shadow
  r(100, 143, 24, 6, 15); r(100, 143, 4, 6, 14); r(120, 143, 4, 6, 14);
  r(102, 137, 21, 6, 15); r(102, 137, 4, 6, 14); r(119, 137, 4, 6, 14);
  r(104, 131, 17, 6, 15); r(104, 131, 4, 6, 14); r(117, 131, 4, 6, 14);
  r(100, 148, 24, 1, 7); r(102, 142, 21, 1, 7); r(104, 136, 17, 1, 7);

  // ============ MONK SOFER (behind the desk, hunched, 14x34 @150,116) ============
  r(148, 148, 18, 3, 0);         // floor shadow
  r(150, 116, 14, 34, 6);        // dark robe, hunched (design rect)
  r(150, 116, 1, 34, 0);         // robe deep shade left
  r(161, 118, 2, 32, 8);         // fold right
  r(151, 116, 12, 1, 14);        // candlelit shoulder rim
  r(152, 107, 10, 10, 6);        // hood, bowed forward over the desk
  r(152, 107, 10, 2, 0);         // hood shadow
  r(151, 107, 1, 10, 0); r(162, 107, 1, 10, 0); // hood outline
  r(155, 111, 5, 4, 14);         // pale candlelit face looking down
  r(156, 112, 1, 1, 0); r(158, 112, 1, 1, 0); // tired eyes
  r(155, 114, 5, 1, 8);          // face lower shade

  // ============ SLOPED COPY DESK (128,108,72,40) ============
  r(132, 132, 5, 18, 6); r(190, 132, 5, 18, 6);   // legs to floor
  r(132, 132, 1, 18, 0); r(194, 132, 1, 18, 0);
  r(128, 147, 72, 4, 0);         // ground shadow
  r(128, 122, 72, 12, 6);        // desk body
  r(128, 120, 24, 4, 6); r(150, 117, 26, 5, 6); r(174, 113, 26, 6, 6); // stepped slope up-right
  r(128, 120, 24, 1, 14); r(150, 117, 26, 1, 14); r(174, 113, 26, 1, 14); // lit slope edges
  r(128, 133, 72, 2, 8);         // underside shade
  r(127, 119, 1, 16, 0); r(200, 112, 1, 22, 0);   // side outlines
  r(128, 124, 72, 1, 8);         // apron seam
  // open scroll on the slope
  r(146, 114, 34, 8, 15);
  r(143, 114, 4, 8, 14); r(179, 114, 4, 8, 14);   // rolled ends
  r(149, 116, 24, 1, 0); r(149, 118, 20, 1, 0); r(149, 120, 22, 1, 0); // ink lines
  // ink pot
  r(184, 108, 5, 5, 0); r(185, 108, 3, 1, 8);
  // monk's writing arm + quill over the scroll (trembles — nine years, no coffee)
  const tr = frame % 8 < 4 ? 0 : 1;
  r(160, 117, 8, 3, 6);                          // forearm reaching over desk
  r(167, 115, 3, 3, 14);                         // hand
  r(168 + tr, 107, 2, 8, 15);                    // white quill, trembling
  r(168 + tr, 105, 2, 2, 7);                     // feather tip
  // left hand pinning the scroll
  r(150, 118, 3, 3, 14);

  // ============ CANDLE (188,96,4,14) + FLAME (mandatory animation) ============
  const fl = frame % 6 < 3;
  // compact warm halo behind the flame (dithered diamond)
  for (let gy = 85; gy < 96; gy += 2) {
    const gw = 6 - Math.abs(gy - 90);
    if (gw > 0) for (let gx = 190 - gw; gx < 190 + gw; gx += 2) r(gx + ((gy / 2) % 2), gy, 1, 2, fl ? 14 : 6);
  }
  r(187, 110, 6, 2, 6);                          // holder on desk slope
  r(188, 96, 4, 14, 15);                         // wax body
  r(188, 96, 1, 14, 7);                          // wax shade
  r(189, 108, 2, 2, 15); r(187, 106, 2, 3, 15);  // drips
  r(189, 95, 2, 1, 0);                           // wick
  r(189, 91, 2, 4, fl ? 14 : 12);                // flame
  r(189, 89, 2, 2, fl ? 12 : 14);                // tip flips
  if (fl) r(188, 90, 1, 2, 14); else r(191, 90, 1, 2, 14); // flicker lean

  // ============ TALL SCROLL PILE — 8,999 copies (206,88,26,62) ============
  r(204, 148, 32, 3, 0);         // shadow
  for (let i = 0; i < 10; i++) {
    const py = 144 - i * 6;
    const lean = Math.floor(i / 4);              // leans 2px left toward top
    const px = 208 - lean;
    const c = (i % 3 === 2) ? 7 : 15;
    r(px, py, 24, 5, c);
    r(px, py, 4, 5, 14); r(px + 20, py, 4, 5, 14);
    r(px, py + 4, 24, 1, 8);
  }
  r(205, 82, 22, 5, 15); r(205, 82, 4, 5, 14); r(223, 82, 4, 5, 14); // wobbly top scroll
  r(210, 138, 12, 8, 14); r(211, 139, 10, 6, 0); r(212, 140, 8, 1, 14); r(212, 142, 6, 1, 14); // warning sign

  // ============ LIBRARY LADDER (256,60,10,90) on right shelves ============
  r(256, 60, 3, 90, 6); r(265, 60, 3, 90, 6);   // rails
  r(256, 60, 1, 90, 14); r(265, 60, 1, 90, 14); // lit edges
  for (let y = 68; y < 148; y += 12) { r(258, y, 8, 2, 14); r(258, y + 1, 8, 1, 6); } // rungs
  r(255, 148, 5, 3, 0); r(264, 148, 5, 3, 0);   // feet shadows

  // ============ MOUSE (14,186,6,3) — the fire marshal, peeking ============
  r(8, 190, 8, 6, 0); r(8, 189, 8, 1, 7);        // mouse hole in wall base
  if (frame % 40 < 20) {
    r(14, 186, 6, 3, 8);
    r(13, 185, 3, 3, 8);
    r(13, 185, 1, 1, 15);                        // eye glint
    r(20, 187, 3, 1, 8);                         // tail
    r(12, 187, 1, 1, 7);                         // nose
  }
}
