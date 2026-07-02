// openai_boardroom.art.js — חדר הישיבות של הדלת המסתובבת (OpenAI chapter)
// 320x200 EGA, Sierra SCI0 style. fillRect only.
// Sterile white/gray P7/P15/P8, golden revolving door P14, status lamp P10/P4,
// five identical board members clapping in perfect sync. Forever.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- ceiling (0..14) ----------
  r(0, 0, 320, 14, 15);
  for (let x = 0; x < 320; x += 64) r(x, 0, 1, 14, 7);       // panel seams
  for (let x = 20; x < 320; x += 40) {                       // recessed spots
    r(x - 1, 5, 6, 4, 7);
    r(x, 6, 4, 2, 11);
  }
  r(0, 12, 320, 2, 7);                                       // cornice
  r(0, 13, 320, 1, 8);

  // ---------- back wall (14..145) ----------
  r(0, 14, 320, 131, 7);
  for (let x = 52; x < 320; x += 52) r(x, 14, 1, 131, 8);    // panel seams
  r(0, 138, 320, 1, 8);                                      // baseboard
  r(0, 139, 320, 6, 15);

  // ---------- panoramic windows: 3 panes (10,24) (76,24) (142,24), 58x68 ----------
  const panes = [[10, 24], [76, 24], [142, 24]];
  for (const [wx, wy] of panes) {
    r(wx - 2, wy - 2, 62, 72, 8);                            // frame
    r(wx, wy, 58, 68, 9);                                    // sky
    // far white-city band behind everything
    r(wx, 74, 58, 18, 7);
    r(wx, 74, 58, 1, 15);
    // white-city skyline: towers of varying heights on base y=70
    const tw = [[4, 48, 9, 15], [16, 40, 10, 7], [29, 54, 8, 15], [40, 34, 11, 7]];
    for (const [ox, ty, w, face] of tw) {
      const tx = wx + ox;
      r(tx, ty, w, 92 - ty, face);                           // tower body (to window sill)
      r(tx, ty, w, 1, 15);                                   // sunlit roof
      r(tx + w - 1, ty + 1, 1, 91 - ty, 8);                  // shade face
      const wc = face === 15 ? 7 : 15;
      for (let yy = ty + 6; yy < 68; yy += 12) r(tx + 2, yy, w - 5, 1, wc); // floor bands (sparse)
    }
    r(wx, 70, 58, 1, 11);                                    // haze line at base y=70
    r(wx, 88, 58, 4, 7);                                     // lower city murk
  }
  // hype-fog: 3px white strip drifting across the panes, clipped per pane
  const fogX = 10 + ((frame * 1) % 190);
  for (const [wx] of panes) {
    const a = Math.max(fogX, wx), b = Math.min(fogX + 34, wx + 58);
    if (b > a) { r(a, 56, b - a, 3, 15); r(a, 59, b - a, 1, 11); }
  }
  // mullions + sills
  for (const [wx, wy] of panes) {
    r(wx + 28, wy, 2, 68, 8);
    r(wx, wy + 33, 58, 2, 8);
    r(wx - 2, wy + 66, 62, 4, 7);                            // sill
    r(wx - 2, wy + 66, 62, 1, 15);                           // sill glint
  }

  // ---------- sign "DAYS SINCE LAST CEO: 0" (204,16,72,12) ----------
  r(202, 14, 76, 16, 8);                                     // bezel
  r(204, 16, 72, 12, 0);                                     // black panel
  r(204, 16, 72, 1, 7);                                      // bezel glint
  // hinted yellow block "letters"
  for (let i = 0; i < 9; i++) r(208 + i * 6, 19, 4, 2, 14);
  for (let i = 0; i < 6; i++) r(208 + i * 6, 23, 4, 2, 14);
  r(258, 22, 2, 4, 14);                                      // the colon
  // the eternal 0 (264,18,8,8) — blinks, updated in real time
  const zc = frame % 20 < 10 ? 14 : 12;
  r(264, 18, 8, 8, zc); r(266, 20, 4, 4, 0);

  // ---------- wall screen: the graph that only goes up (206,34,52,44) ----------
  r(204, 32, 56, 48, 8);                                     // case
  r(206, 34, 52, 44, 0);                                     // screen
  r(206, 34, 52, 1, 7);                                      // case glint
  r(210, 38, 30, 2, 15);                                     // "UP AND TO THE RIGHT" bar
  // ghost of last quarter's graph (also only went up)
  for (let i = 0; i < 11; i++) r(210 + i * 4, 72 - i * 3, 4, 1, 2);
  // staircase from (210,72), one step per 30 frames, wraps at the top. nobody notices.
  const shown = (Math.floor(frame / 30) % 11) + 1;
  for (let i = 0; i < shown; i++) {
    const gx = 210 + i * 4, gy = 72 - i * 3;
    r(gx, gy, 4, 2, 10);                                     // tread
    if (i > 0) r(gx, gy, 1, 3, 10);                          // riser
  }
  r(210 + (shown - 1) * 4 + 2, 72 - (shown - 1) * 3 - 2, 2, 2, frame % 10 < 5 ? 15 : 10); // live tick
  r(208, 74, 48, 1, 8);                                      // dead baseline (no axes — axes are for people without vision)

  // ---------- emergency stairwell, left edge (0,58,22,86) ----------
  r(0, 54, 27, 92, 8);                                       // opening trim
  r(23, 54, 4, 92, 7);                                       // right jamb
  r(26, 54, 1, 92, 15);                                      // jamb highlight
  r(0, 54, 23, 4, 7);                                        // lintel
  r(0, 58, 23, 86, 0);                                       // dark opening
  r(0, 58, 23, 6, 8);                                        // inner ceiling gloom
  for (let i = 0; i < 6; i++) {                              // steps descending into gloom
    const sw = 21 - i * 3;
    r(0, 96 + i * 8, sw, 3, i < 2 ? 7 : 8);                  // lit tread
    r(0, 99 + i * 8, sw, 1, 0);                              // nosing shadow
  }
  r(16, 70, 2, 28, 8);                                       // newel post
  r(6, 76, 10, 2, 8); r(2, 80, 6, 2, 8);                     // sloping handrail
  r(3, 47, 18, 10, 2);                                       // green EXIT box — the only honest sign here
  r(4, 48, 16, 8, 10);
  r(6, 50, 2, 4, 0); r(9, 50, 2, 4, 0); r(12, 50, 2, 4, 0); r(15, 50, 2, 4, 0);
  if (frame % 40 < 36) r(4, 48, 16, 1, 15);                  // sign flicker — it's still honest, just tired

  // ---------- golden revolving door (262,56,46,88 → floor y=144) ----------
  r(260, 54, 50, 92, 8);                                     // wall shadow seam
  r(262, 56, 46, 88, 14);                                    // thick gold frame
  r(263, 57, 44, 1, 15);                                     // gold top glint
  r(262, 56, 1, 88, 15);                                     // gold left glint
  r(266, 60, 38, 80, 6);                                     // dark interior
  for (let x = 268; x < 302; x += 4) r(x, 63, 2, 77, 0);     // interior depth dither
  r(266, 60, 38, 3, 0);                                      // interior top gloom
  r(267, 63, 2, 77, 11);                                     // curved-glass sheen, left
  r(301, 63, 2, 77, 11);                                     // curved-glass sheen, right
  // the wings — 4 phases, spinning careers since 2023
  const ph = Math.floor(frame / 4) % 4;
  if (ph === 0) {
    r(283, 60, 4, 80, 14); r(283, 60, 1, 80, 15);
  } else if (ph === 1) {
    r(272, 60, 4, 40, 14); r(292, 100, 4, 40, 14);
    r(272, 60, 1, 40, 15); r(292, 100, 1, 40, 15);
  } else if (ph === 2) {
    r(266, 98, 38, 4, 14); r(266, 98, 38, 1, 15);
  } else {
    r(292, 60, 4, 40, 14); r(272, 100, 4, 40, 14);
    r(292, 60, 1, 40, 15); r(272, 100, 1, 40, 15);
  }
  r(283, 98, 4, 4, 0);                                       // central axle
  if (frame % 16 < 2) { r(263, 57, 3, 3, 15); r(304, 138, 3, 3, 15); } // 24k sparkle

  // ---------- status lamp above the door (276,40,18,12) ----------
  const lit = frame % 200;
  const on = lit < 60;                                       // green = employed (6s), red = fired (14s)
  const lampC = on ? 10 : 4;
  if (frame % 6 < 3) r(274, 38, 22, 16, lampC);              // glow halo
  r(275, 39, 20, 14, 8);                                     // housing
  r(277, 41, 16, 10, lampC);                                 // the bulb that rules them all
  r(278, 42, 6, 2, 15);                                      // hot spot
  r(280, 32, 2, 7, 8);                                       // conduit to the board's schedule

  // ---------- board members (5, identical, terrifying) ----------
  const bx = [68, 102, 136, 170, 204];
  const clap = frame % 10 < 5;
  for (const hx of bx) {
    r(hx - 2, 90, 10, 16, 8);                                // seated body
    r(hx - 2, 90, 10, 1, 7);                                 // shoulder light
    r(hx + 1, 96, 4, 2, 15);                                 // identical badge
    r(hx - 1, 83, 8, 8, 0);                                  // head outline
    r(hx, 84, 6, 6, 12);                                     // head
    r(hx + 1, 86, 1, 1, 0); r(hx + 4, 86, 1, 1, 0);          // eyes (all watching)
    // mechanical applause — every hand in the exact same phase. that's the scary part.
    if (clap) { r(hx + 1, 79, 2, 2, 12); r(hx + 3, 79, 2, 2, 12); }
    else { r(hx - 5, 82, 2, 2, 12); r(hx + 9, 82, 2, 2, 12); }
  }

  // ---------- boardroom table (runway-length, black, polished) ----------
  r(55, 105, 182, 14, 8);                                    // outline
  r(56, 106, 180, 12, 0);                                    // slab
  r(56, 106, 180, 1, 15);                                    // edge shine
  r(70, 109, 26, 3, 8);                                      // your career's reflection
  r(130, 112, 40, 2, 8);
  r(196, 109, 22, 3, 8);
  r(64, 118, 4, 30, 0); r(150, 118, 4, 30, 0); r(224, 118, 4, 30, 0); // legs to y=148
  r(64, 118, 1, 30, 8); r(150, 118, 1, 30, 8); r(224, 118, 1, 30, 8);

  // ---------- floor (145..200): polished tiles ----------
  r(0, 145, 320, 55, 7);
  // far strip: thin seam + 2x2 checker dither falling away into depth
  r(0, 145, 320, 1, 8);
  for (let x = 0; x < 320; x += 8) r(x + 2, 147, 2, 1, 8);
  // tile rows spread toward the viewer (perspective)
  const rows = [150, 158, 169, 183, 199];
  for (const y of rows) r(0, y, 320, 1, 8);
  // tile columns converge toward center x=160 — smooth 2px-stepped diagonals, real perspective
  for (let k = -4; k <= 4; k++) {
    const xTop = 160 + k * 38, xBot = 160 + k * 50;
    for (let y = 148; y < 200; y += 2) {
      const xa = Math.round(xTop + (xBot - xTop) * (y - 148) / 52);
      if (xa >= 0 && xa < 320) r(xa, y, 1, 2, 8);
    }
  }
  // diagonal gloss streaks (8x1 steps)
  for (let i = 0; i < 5; i++) { r(36 + i * 8, 158 + i * 2, 8, 1, 15); }
  for (let i = 0; i < 5; i++) { r(236 + i * 8, 172 + i * 2, 8, 1, 15); }
  for (let i = 0; i < 4; i++) { r(120 + i * 8, 184 + i * 2, 8, 1, 15); }
  r(262, 146, 46, 8, 14);                                    // gold door reflection
  r(266, 154, 38, 4, 6);
  r(276, 147, 16, 3, on ? 10 : 4);                           // lamp smear on the shine
  r(52, 148, 190, 2, 8);                                     // table shadow

  // ---------- executive chairs, near side (backs 14x22 at y=124→146) ----------
  for (const cx of [70, 110, 150, 190]) {
    r(cx + 1, 120, 12, 5, 0);                                // headrest outline
    r(cx + 2, 121, 10, 3, 8);                                // headrest
    r(cx + 2, 121, 10, 1, 7);
    r(cx - 1, 124, 16, 23, 0);                               // outline
    r(cx, 125, 14, 21, 8);                                   // back
    r(cx + 6, 127, 2, 17, 0);                                // spine stripe
    r(cx, 125, 14, 1, 7);                                    // top light
    r(cx - 3, 133, 3, 2, 8); r(cx + 14, 133, 3, 2, 8);       // armrests
    r(cx - 3, 135, 1, 4, 0); r(cx + 16, 135, 1, 4, 0);       // armrest drops
    r(cx + 5, 146, 4, 3, 0);                                 // gas-lift post
    r(cx - 2, 149, 18, 2, 8);                                // five-star base shadow
  }
  // "FOR YOUR SAFETY" velvet rope in front of the golden door
  r(258, 136, 3, 15, 8); r(258, 135, 3, 2, 14);              // post L
  r(311, 136, 3, 15, 8); r(311, 135, 3, 2, 14);              // post R
  r(261, 141, 17, 2, 4); r(278, 143, 17, 2, 4); r(295, 141, 16, 2, 4); // sagging rope
  r(258, 151, 56, 1, 8);                                     // posts' floor shadow

  // ---------- the CEO (246,116,10,28) — exists only while the lamp is green ----------
  if (on) {
    r(246, 140, 10, 4, 8);                                   // floor contact shadow
    r(248, 116, 6, 7, 12);                                   // head
    r(249, 118, 1, 1, 0); r(252, 118, 1, 1, 0);              // eyes
    r(250, 121, 2, 1, 15);                                   // keynote smile
    r(246, 123, 10, 11, 8);                                  // gray tee (billions in casual)
    r(246, 123, 1, 11, 7);
    r(247, 134, 3, 10, 0); r(252, 134, 3, 10, 0);            // pants
    r(247, 143, 3, 1, 15); r(252, 143, 3, 1, 15);            // white sneakers
    r(244, 125, 2, 7, 12); r(256, 125, 2, 7, 12);            // arms, mid-gesture
  }
}
