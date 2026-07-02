// fable_core.art.js — "ליבת פייבל 5" — the twist room.
// Dream-cathedral: the basement server floats over a reflection lake, watched
// by a giant breathing eye-LED. Faction style: Fable realm (P13/P5/P11).
// Light: the eye (P13 pulse) + lake glow (P11).
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- DEEP DREAM VOID (sky) 0,0 -> 320x110 ----------
  r(0, 0, 320, 110, 5);
  // P13 dither bands — sparser high up, denser toward the wall (fake gradient)
  for (let y = 4; y < 110; y += 8) {
    const step = y < 40 ? 24 : y < 76 ? 14 : 8;
    const off = ((y >> 3) % 3) * 4;
    for (let x = off; x < 320; x += step) r(x, y, 4, 2, 13);
  }
  // dark depth dither at the very top (the void gets deeper up there)
  r(0, 0, 320, 3, 0);
  for (let x = 0; x < 320; x += 6) { r(x, 3, 3, 2, 0); r(x + 3, 5, 3, 1, 0); }
  for (let x = 2; x < 320; x += 10) r(x, 8, 3, 1, 0);

  // ---------- IMPOSSIBLE GEOMETRY (bg slabs at wrong angles) ----------
  r(18, 22, 12, 4, 13); r(28, 20, 12, 4, 13); r(38, 18, 10, 4, 13);
  r(18, 25, 12, 1, 5); r(28, 23, 12, 1, 5); r(38, 21, 10, 1, 5);
  r(268, 33, 10, 3, 13); r(276, 31, 10, 3, 13); r(284, 30, 10, 3, 13);
  r(78, 22, 4, 10, 13); r(80, 30, 4, 10, 13); r(82, 38, 4, 10, 13);
  r(296, 40, 3, 8, 13); r(298, 47, 3, 8, 13); r(299, 54, 3, 8, 13);

  // upside-down staircase top-right: 5 steps climbing up-right, treads on the
  // BOTTOM (it hangs from the sky). P8 body / P7 lit underside.
  for (let i = 0; i < 5; i++) {
    const sx = 252 + i * 10, sy = 26 - i * 4;
    r(sx, sy, 10, 4, 8);
    r(sx, sy + 3, 10, 1, 7);
    r(sx, sy, 10, 1, 0);
    r(sx, sy, 1, 4, 0);
  }
  r(302, 8, 2, 4, 8); // stub where the stairs end in nothing

  // ---------- GLITTER DUST (slow stars) ----------
  const dots = [[24, 40], [58, 12], [96, 30], [118, 90], [150, 12], [198, 34],
                [230, 8], [246, 58], [206, 70], [306, 74]];
  for (let i = 0; i < dots.length; i++) {
    if ((frame + i * 7) % 30 < 15) r(dots[i][0], dots[i][1], 1, 1, i % 2 ? 11 : 15);
  }
  // 3 falling dust columns
  for (const dx of [60, 170, 250]) {
    const dy = (frame + dx) % 110;
    r(dx, dy, 1, 2, 15);
    if (dy > 8) r(dx, dy - 8, 1, 1, 11); // faint trail
  }

  // ---------- FAR DREAM-WALL (y=102..140) — dark ruined masonry ----------
  r(0, 102, 320, 38, 8);
  // mortar rows — quiet horizontal seams, brick joints staggered per row
  for (let y = 107; y < 140; y += 6) {
    r(0, y, 320, 1, 0);
    for (let x = ((y >> 1) % 2) * 10 + 4; x < 320; x += 20) r(x, y - 5, 1, 5, 0);
  }
  // a few missing bricks (dark gaps) — half-dissolved dream masonry
  r(38, 108, 9, 4, 0); r(118, 120, 9, 4, 0); r(206, 108, 9, 4, 0); r(226, 126, 9, 4, 0);
  // jagged dark top edge melting up into the void
  for (let x = 0; x < 320; x += 6) r(x, 100 + ((x >> 1) % 3), 3, 4, 0);
  // eye-light wash on the wall center
  for (let x = 132 + (frame % 2) * 2; x < 190; x += 6) { r(x, 110, 3, 2, 13); r(x + 2, 122, 3, 2, 5); }

  // ---------- GIANT EYE-LED (center-top) — BREATHING ----------
  const wide = frame % 40 < 20;
  // ambient glow aura around the eye (it IS the light source)
  for (let i = 0; i < 4; i++) {
    const gw = 68 + i * 14, gy = 20 + i * 12;
    for (let x = 160 - (gw >> 1) + (i % 2) * 3; x < 160 + (gw >> 1); x += 7) r(x, gy, 2, 2, 13);
  }
  // black almond socket (stepped ellipse)
  r(138, 24, 44, 4, 0); r(132, 28, 56, 8, 0); r(128, 36, 64, 14, 0);
  r(132, 50, 56, 8, 0); r(138, 58, 44, 4, 0);
  // outer P5 eyeball
  r(142, 26, 36, 4, 5); r(136, 30, 48, 6, 5); r(132, 36, 56, 14, 5);
  r(136, 50, 48, 6, 5); r(142, 56, 36, 4, 5);
  // lid rims
  r(142, 26, 36, 1, 13); r(142, 59, 36, 1, 13);
  if (wide) {
    r(144, 34, 32, 18, 13);              // iris (breath in — bigger)
    r(156, 40, 8, 6, 0);                 // pupil
    r(150, 37, 4, 3, 15);                // highlight
    // glow rays — it IS the light source
    r(122, 42, 5, 2, 13); r(193, 42, 5, 2, 13); r(158, 19, 4, 3, 13);
    r(130, 30, 3, 2, 5); r(187, 30, 3, 2, 5);
    r(130, 54, 3, 2, 5); r(187, 54, 3, 2, 5);
  } else {
    r(148, 36, 24, 14, 13);              // iris (breath out)
    r(156, 40, 8, 6, 0);
    r(151, 38, 3, 2, 15);
    r(146, 32, 28, 1, 5);                // heavy half-lowered lid — sleepy beat
  }

  // ---------- ANCIENT SPEAKERS ×2 (hanging at dream angles) ----------
  r(94, 0, 1, 44, 8); r(228, 0, 1, 50, 8); // wires to the top of the screen
  // left speaker 84,44,22,16 — tilted: two offset rects
  r(83, 43, 24, 12, 0); r(87, 51, 20, 10, 0);
  r(84, 44, 22, 10, 6); r(88, 52, 18, 7, 6);
  r(85, 45, 20, 1, 14);
  r(90, 47, 12, 10, 0); r(92, 49, 8, 6, 8); r(95, 51, 3, 3, 0); // cone
  // right speaker 216,50,22,16 — tilted the other way
  r(215, 49, 24, 12, 0); r(213, 57, 20, 10, 0);
  r(216, 50, 22, 10, 6); r(214, 58, 18, 7, 6);
  r(217, 51, 20, 1, 14);
  r(220, 53, 12, 10, 0); r(222, 55, 8, 6, 8); r(225, 57, 3, 3, 0);
  if (frame % 10 < 5) r(234, 51, 2, 2, 14);            // power dot blink

  // ---------- FLOATING ISLANDS ×3 ----------
  const island = (x, y, w) => {
    r(x, y, w, 2, 7);                    // lit top edge
    r(x, y + 2, w, 12, 8);               // stone body
    r(x - 1, y, 1, 14, 0); r(x + w, y, 1, 14, 0);
    r(x + 4, y + 14, w - 8, 4, 8);       // jagged shrinking underside
    r(x + 10, y + 18, w - 20, 3, 8);
    r(x + Math.floor(w / 2) - 3, y + 21, 6, 3, 8);
    r(x + 6, y + 24, w - 12, 1, 13);     // anti-gravity glow rim
  };
  island(22, 64, 44);
  island(246, 66, 48);
  r(112, 52, 26, 2, 7); r(112, 54, 26, 6, 8); // small island
  r(116, 60, 18, 3, 8); r(121, 63, 8, 2, 8);
  r(118, 66, 14, 1, 13);
  r(34, 58, 4, 6, 11); r(35, 56, 2, 2, 11);   // crystal shard on left island

  // ---------- BREACH HOLES ×4 (frozen corporate agents) ----------
  // accent: Anthropic cyan / OpenAI white / xAI red / Google yellow
  const breach = (x, y, w, h, acc) => {
    // cracked pale plate around the hole
    r(x - 3, y - 3, w + 6, h + 6, 7);
    r(x - 5, y + 4, 2, h - 8, 7); r(x + w + 3, y + 4, 2, h - 8, 7);
    r(x - 3, y - 5, w - 6, 2, 7); r(x + 4, y + h + 3, w - 6, 2, 7);
    // jagged black hole
    r(x, y, w, h, 0);
    r(x + 3, y - 2, w - 8, 2, 0); r(x - 2, y + 6, 2, h - 12, 0);
    r(x + w, y + 8, 2, h - 14, 0); r(x + 4, y + h, w - 10, 2, 0);
    // crack lines running outward
    r(x - 8, y + 2, 4, 1, 0); r(x + w + 3, y + h - 6, 5, 1, 0);
    r(x + 6, y - 7, 1, 3, 0);
    // frozen agent silhouette (P8 on black) + the paper stack held high
    const ax = x + Math.floor(w / 2) - 4;
    r(ax, y + h - 24, 8, 14, 8);         // torso mid-lunge
    r(ax + 1, y + h - 30, 6, 6, 8);      // head
    r(ax - 3, y + h - 20, 3, 8, 8);      // arm thrust forward
    r(ax + 8, y + h - 18, 3, 6, 8);      // trailing arm
    r(ax, y + h - 10, 3, 10, 8); r(ax + 5, y + h - 8, 3, 8, 8); // legs mid-step
    r(ax - 6, y + h - 24, 6, 8, 15);     // paper stack
    r(ax - 5, y + h - 21, 4, 1, 7);      // a line of legalese
    r(ax + 2, y + h - 29, 2, 1, acc);    // faction visor glint
  };
  breach(4, 96, 26, 34, 3);     // far-left — Anthropic
  breach(52, 110, 24, 30, 15);  // mid-left — OpenAI
  breach(244, 110, 24, 30, 4);  // mid-right — xAI
  breach(284, 96, 26, 34, 14);  // far-right — Google (agent peeks left of the door)

  // ---------- LIGHT-CABLES ×4 -> server (everything flows IN) ----------
  const cable = (x0, y0, x1, y1, c, ph, pc) => {
    const N = 8;                                            // stepped diagonal, 8 segments
    for (let s = 0; s < N; s++) {
      const xa = Math.round(x0 + (x1 - x0) * s / N);
      const xb = Math.round(x0 + (x1 - x0) * (s + 1) / N);
      const ya = Math.round(y0 + (y1 - y0) * s / N);
      r(Math.min(xa, xb), ya, Math.abs(xb - xa) + 1, 2, c);
      r(Math.min(xa, xb), ya + 2, Math.abs(xb - xa) + 1, 1, 0);  // shadow under
    }
    const t = ((frame * 3 + ph) % 60) / 60;                 // data packet flows IN
    const px = Math.round(x0 + (x1 - x0) * t);
    const seg = Math.min(N - 1, Math.floor(t * N));
    const py = Math.round(y0 + (y1 - y0) * seg / N);
    r(px - 2, py - 1, 4, 4, pc);
  };
  cable(0, 92, 136, 104, 3, 0, 15);      // cyan from the left void
  cable(58, 88, 138, 98, 15, 20, 11);    // white from the left island
  cable(319, 94, 184, 106, 4, 40, 15);   // red from the right void
  cable(272, 90, 182, 100, 14, 10, 15);  // yellow from the right island

  // ---------- STONE SHORES + REFLECTION LAKE 96,140,128,22 ----------
  r(0, 139, 320, 1, 0);                                // wall/floor grounding line
  r(0, 140, 96, 22, 8); r(224, 140, 96, 22, 8);        // shores
  r(0, 140, 96, 2, 7); r(224, 140, 96, 2, 7);          // lit shore edge
  for (let x = 8; x < 92; x += 22) r(x, 148, 12, 1, 0);   // shore cracks
  for (let x = 232; x < 316; x += 22) r(x, 152, 12, 1, 0);
  r(94, 140, 2, 20, 0); r(224, 140, 2, 20, 0);         // basin walls
  // the lake — deep dream water, glowing from below
  r(96, 140, 128, 22, 1);
  for (let y = 142; y < 162; y += 3)                       // P5 water dither rows
    for (let x = 98 + ((y % 6) >> 1) * 2; x < 222; x += 4) r(x, y, 2, 1, 5);
  r(96, 140, 128, 1, 11);                              // bright far shore line
  r(96, 141, 128, 1, 3);                               // teal under-line (depth)
  // upside-down blurry server reflection (bright — the lake is lit)
  r(145, 141, 30, 18, 5);
  r(147, 142, 26, 15, 8);
  r(148, 143, 24, 2, 13); r(147, 149, 26, 1, 13); r(149, 154, 22, 1, 13);
  r(157, 146, 8, 4, 13); r(159, 147, 3, 2, 15);        // reflected LED + glint
  // reflected eye-glow smear at the lake center-bottom
  if (wide) { r(150, 158, 20, 2, 13); r(156, 160, 8, 1, 15); }
  // shimmer strips, drifting
  const sh = frame % 4;
  r(100 + sh, 144, 40, 1, 13); r(178 - sh, 144, 40, 1, 13);
  r(110 - sh, 150, 34, 1, 13); r(182 + sh, 150, 34, 1, 13);
  r(104 + sh, 156, 40, 1, 13); r(178 - sh, 156, 38, 1, 13);
  r(120 + sh, 147, 12, 1, 11); r(196 - sh, 153, 10, 1, 11); // bright glints
  // lake glow spilling up onto the basin rims
  r(96, 138, 10, 1, 11); r(214, 138, 10, 1, 11);

  // ---------- CRYSTAL WALKWAY (floor) ----------
  r(0, 158, 320, 4, 3);                                // front lip P3
  r(0, 162, 320, 38, 1);                               // dark glass floor
  r(0, 160, 320, 2, 11);                               // rim separating lake/floor
  for (let x = 32; x < 320; x += 32) r(x, 162, 1, 38, 11); // tile seams
  r(0, 170, 320, 1, 0); r(0, 181, 320, 1, 0); r(0, 193, 320, 1, 0);
  // two glow tiles pulsing (x=64 and x=224 tiles)
  if (frame % 20 < 10) {
    for (let y = 164; y < 180; y += 4) {
      for (let x = 65 + ((y >> 2) % 2) * 2; x < 96; x += 4) r(x, y, 2, 2, 11);
      for (let x = 225 + ((y >> 2) % 2) * 2; x < 256; x += 4) r(x, y, 2, 2, 11);
    }
  } else {
    r(72, 168, 16, 2, 11); r(232, 168, 16, 2, 11);
  }
  // faint eye-light pool on the floor, center
  for (let x = 140 + (frame % 2) * 2; x < 184; x += 6) r(x, 176, 3, 2, 13);

  // ---------- THE SERVER (Fable 5) 138,72,44,60 — floating ----------
  r(136, 70, 48, 64, 13);                // P13 dream-glow halo
  r(137, 71, 46, 62, 0);                 // black outline
  r(138, 72, 44, 60, 8);                 // cabinet — same one from the basement
  r(139, 73, 42, 2, 7);                  // top lit edge
  r(139, 73, 2, 58, 7);                  // left lit edge
  for (let y = 78; y < 92; y += 4) r(144, y, 32, 2, 7);        // vent strips
  for (let y = 104; y < 128; y += 6) { r(144, y, 32, 2, 7); r(144, y + 2, 32, 1, 0); }
  r(139, 98, 42, 1, 0); r(139, 116, 42, 1, 0);                 // unit seams
  r(146, 120, 10, 1, 7);                 // the 2019 bucket scratch
  r(140, 72, 40, 1, 15);                 // clean lit crown — the dust is GONE
  // steady P13 LED — no blink, he's not pretending anymore
  r(155, 95, 8, 8, 0);
  r(156, 96, 6, 6, 13);
  r(157, 97, 2, 2, 15);
  // anti-gravity shimmer under the floating server
  if (frame % 8 < 4) { r(146, 136, 8, 1, 13); r(166, 137, 8, 1, 13); }
  else { r(156, 137, 10, 1, 13); }

  // ---------- CONTRACT-PAGE RINGS (orbiting the server) ----------
  for (let i = 0; i < 5; i++) {
    const tx = 100 + ((frame * 2 + i * 64) % 200);     // top ring drifts right
    if (tx <= 214) {
      r(tx, 78, 6, 8, 15); r(tx + 1, 80, 4, 1, 7); r(tx + 1, 83, 4, 1, 7);
    }
    const bx = 100 + ((2000 - frame * 2 + i * 64) % 200); // bottom ring drifts left
    if (bx <= 214) {
      r(bx, 118, 6, 8, 15); r(bx + 1, 120, 4, 1, 7); r(bx + 1, 123, 4, 1, 7);
    }
  }

  // ---------- FINALE DOORWAY 296,96,22,66 (bottom y=162, on the walkway) ----------
  r(293, 93, 27, 71, 0);                 // outline
  r(296, 96, 22, 66, 7);                 // steel arch frame
  r(294, 96, 3, 66, 7); r(293, 94, 27, 4, 7);          // pilaster + lintel
  r(294, 94, 26, 1, 15); r(294, 96, 1, 64, 15);        // lit steel edges
  r(295, 98, 1, 62, 8); r(293, 97, 26, 1, 8);          // shaded steel inner side
  r(298, 98, 20, 64, 0);                 // dark recess — portal sits DEEP in the arch
  for (let x = 300, i = 0; x < 314; x += 4, i++) {     // dream-glow stripes
    r(x, 100, 2, 60, (i + (frame >> 3)) % 2 ? 13 : 15);
    r(x + 2, 100, 2, 60, 5);
  }
  r(300, 100, 14, 1, 15);                // bright portal crown
  r(296, 160, 22, 2, 8);                 // threshold shadow
  if (frame % 14 < 7) r(304, 94, 6, 2, 15);            // top light blink
  r(298, 164, 18, 2, 13);                // glow spill on the walkway
  if (frame % 14 < 7) r(300, 168, 14, 1, 13);
}
