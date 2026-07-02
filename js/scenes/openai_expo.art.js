// openai_expo.art.js — קומת התצוגה (OpenAI expo floor)
// A museum of products that never shipped. Sterile white, spotlights,
// everything behind glass, everything COMING SOON. Faction: OpenAI.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // 4x5 block font (bits MSB-left) for the KEYNOTE / EXIT signage
  const FONT = {
    K: [9, 10, 12, 10, 9], E: [15, 8, 14, 8, 15], Y: [9, 9, 6, 4, 4],
    N: [9, 13, 11, 9, 9], O: [6, 9, 9, 9, 6], T: [15, 6, 6, 6, 6],
    X: [9, 9, 6, 9, 9], I: [14, 4, 4, 4, 14],
  };
  const txt = (s, x, y, c) => {
    for (let i = 0; i < s.length; i++) {
      const g = FONT[s[i]]; if (!g) continue;
      for (let row = 0; row < 5; row++)
        for (let b = 0; b < 4; b++)
          if (g[row] & (8 >> b)) r(x + i * 5 + b, y + row, 1, 1, c);
    }
  };

  // ============ CEILING (0..28) — recessed spots, hype-budget flicker ============
  r(0, 0, 320, 26, 7);
  for (let x = 0; x < 320; x += 40) r(x, 0, 1, 26, 8);       // ceiling panel seams
  r(0, 12, 320, 1, 8);
  r(0, 26, 320, 2, 8);                                       // shadow line under slab
  const spots = [42, 120, 198, 276];
  const flicker = frame % 17 < 2;                             // spot #2 flickers
  for (let i = 0; i < 4; i++) {
    const sx = spots[i];
    r(sx, 20, 12, 4, 8);                                     // recessed housing
    r(sx - 1, 19, 14, 1, 0);
    const lit = (i === 1 && flicker) ? 7 : 15;
    r(sx + 1, 24, 10, 2, lit);                               // light row
  }

  // ============ BACK WALL (28..145) — sterile white, panel seams ============
  r(0, 28, 320, 117, 15);
  for (let x = 64; x < 320; x += 64) r(x, 28, 1, 112, 7);    // vertical panel seams
  // faint gray dither at the very top of the wall (ambient shade)...
  for (let x = 0; x < 320; x += 8) r(x + (Math.floor(x / 8) % 2) * 4, 29, 2, 1, 7);
  r(0, 28, 320, 1, 7);
  // ambient shade: sparse gray dither on the wall BETWEEN the light cones,
  // so the working spots read as bright columns on white
  for (let y = 30; y < 66; y += 3) {
    for (let x = (y % 6); x < 320; x += 6) {
      let nearSpot = false;
      for (let i = 0; i < 4; i++) {
        const lit = !(i === 1 && flicker);
        const half = 12 + Math.floor((y - 28) / 3);           // cone widens downward
        if (lit && Math.abs(x - (spots[i] + 6)) < half) { nearSpot = true; break; }
      }
      if (!nearSpot) r(x, y, 2, 1, 7);
    }
  }
  // upper-corner vignette, heavier
  for (let y = 29; y < 44; y += 2) { r(0, y, 10 - (y - 29) / 2, 1, 7); r(310 + (y - 29) / 2, y, 10, 1, 7); }
  // ...cut by clean light cones under each working spot
  for (let i = 0; i < 4; i++) {
    if (i === 1 && flicker) continue;
    r(spots[i] + 2, 28, 8, 3, 15);
  }
  // baseboard
  r(0, 140, 320, 5, 7);
  r(0, 140, 320, 1, 8);
  r(0, 143, 320, 2, 8);

  // ============ LAUNCH-SCHEDULE BOARD (8..96, 38..92) — all X'd out ============
  r(6, 36, 92, 58, 0);                                       // black frame
  r(8, 38, 88, 54, 15);                                      // board
  r(10, 40, 84, 8, 9);                                       // header bar
  r(14, 42, 20, 4, 15); r(40, 43, 30, 2, 15); r(76, 43, 14, 2, 15); // header block-text
  const X = (bx, by) => {                                     // red X over a 10x6 block
    for (let i = 0; i < 6; i++) { r(bx + i, by + i, 2, 1, 4); r(bx + 8 - i, by + i, 2, 1, 4); }
  };
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const bx = 16 + col * 28, by = 52 + row * 10;
      r(bx, by, 10, 6, 9);                                   // milestone block
      r(bx, by, 10, 1, 11);
      X(bx, by);
    }
  }
  X(46, 62); X(43, 61);                                       // this one was cancelled twice
  r(14, 88, 40, 2, 8);                                        // fine print: "הלו"ז סופי*"
  r(98, 40, 3, 56, 7); r(10, 94, 90, 3, 7);                   // drop shadow on wall

  // ============ KEYNOTE DOUBLE DOOR (196..248, 52..145) ============
  r(250, 56, 3, 87, 7);                                       // drop shadow on wall
  r(194, 50, 56, 95, 0);                                      // outline
  r(196, 52, 52, 93, 14);                                     // gold frame
  r(197, 53, 50, 1, 15); r(197, 53, 1, 92, 15);               // frame shine
  r(246, 54, 2, 91, 6);                                       // frame shade
  r(202, 58, 40, 87, 6);                                      // wooden doors
  r(201, 57, 42, 1, 0); r(201, 57, 1, 88, 0); r(242, 57, 1, 88, 0); // door outline
  r(202, 58, 40, 2, 14);                                      // gold lintel trim
  r(221, 58, 2, 87, 0);                                       // center seam
  r(208, 62, 1, 80, 8); r(214, 62, 1, 80, 8);                 // door panel grain
  r(228, 62, 1, 80, 8); r(236, 62, 1, 80, 8);
  r(216, 98, 4, 8, 14); r(224, 98, 4, 8, 14);                 // handles
  r(217, 99, 1, 6, 15); r(225, 99, 1, 6, 15);
  // sign board above: KEYNOTE
  r(198, 38, 48, 14, 0);
  r(200, 40, 44, 10, 0); r(200, 40, 44, 1, 8);
  txt('KEYNOTE', 205, 42, 14);

  // ============ SERVICE STAIRS (272..318, 60..145) — up to the boardroom ============
  r(270, 58, 50, 87, 0);                                      // opening outline
  r(272, 60, 46, 85, 0);                                      // dark stairwell void
  for (let i = 0; i < 6; i++) {                               // 6 steps ascending right
    const sy = 145 - (i + 1) * 12, sx = 272 + i * 7;
    r(sx, sy + 3, 318 - sx, 9, 8);                            // riser face
    r(sx, sy, 318 - sx, 3, 7);                                // tread
    r(sx, sy, 318 - sx, 1, 15);                               // tread lip
    r(sx, sy, 1, 12, 0);                                      // step leading edge
  }
  // handrail climbing with the steps
  for (let i = 0; i < 6; i++) {
    const hy = 132 - i * 12, hx = 274 + i * 7;
    r(hx, hy - 18, 8, 2, 7); r(hx, hy - 18, 8, 1, 15);
    if (i < 5) r(hx + 7, hy - 28, 1, 12, 8);                  // rail connector
  }
  r(272, 60, 2, 85, 7); r(316, 60, 2, 85, 7);                 // jambs
  // EXIT-style sign above
  r(280, 51, 30, 9, 0); r(281, 52, 28, 7, 10);
  r(283, 54, 8, 3, 15); r(293, 54, 4, 3, 15); r(299, 54, 8, 3, 15); // block glyphs
  r(303, 55, 3, 1, 10); r(305, 54, 1, 3, 15);                 // up-arrow hint

  // ============ CARPET FLOOR (145..200) — corporate gray, perspective ============
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 4, 8);                                       // far strip darker
  // checker dither rows widening toward the viewer
  const rows = [[151, 16], [158, 14], [167, 12], [178, 10], [190, 8]];
  for (let i = 0; i < rows.length; i++) {
    const [ry, step] = rows[i];
    for (let x = (i % 2) * (step >> 1); x < 320; x += step) r(x, ry, 2, 2, 8);
  }
  // light pools under podium fronts
  for (const px of [40, 122, 164]) {
    for (let x = 0; x < 28; x += 4) { r(px + x, 148, 2, 2, 15); r(px + x + 2, 151, 2, 1, 15); r(px + x, 153, 2, 1, 7); }
  }
  // the famous coffee stain (someone waited here a very long time)
  r(210, 170, 16, 6, 8); r(214, 168, 8, 2, 8); r(212, 176, 10, 2, 8); r(224, 172, 4, 3, 8);
  r(216, 172, 4, 2, 6);                                       // dried center

  // ============ WALL EMBLEM — a small monolith with one watching eye ============
  r(162, 48, 22, 26, 0);                                      // black slab
  r(161, 47, 24, 1, 8); r(161, 47, 1, 28, 8); r(184, 47, 1, 28, 8); // soft edge
  r(163, 49, 1, 24, 8);                                       // slab sheen
  r(186, 51, 2, 25, 7);                                       // slab drop shadow
  const eye = frame % 40 < 20 ? 10 : 2;
  r(169, 57, 8, 6, eye); r(171, 59, 4, 2, 15);                // the eye. it sees you.
  r(166, 68, 14, 1, 8); r(168, 70, 10, 1, 8);                 // "for your safety" micro-text
  r(154, 74, 38, 2, 7); r(154, 74, 38, 1, 8);                 // mounting shelf shadow

  // ============ PODIUMS — the museum of vaporware ============
  const podium = (x0, x1) => {
    r(x0 - 1, 117, x1 - x0 + 2, 29, 0);                       // outline
    r(x0, 118, x1 - x0, 27, 15);                              // white face
    r(x0, 118, x1 - x0, 2, 7);                                // top edge
    r(x0 + 6, 118, x1 - x0 - 12, 1, 15);                      // spotlight pool on top
    r(x1 - 4, 120, 4, 25, 7);                                 // right shade
    r(x0 - 2, 145, x1 - x0 + 6, 3, 8);                        // drop shadow on carpet
  };
  const bell = (x0, x1, top) => {                             // glass bell outline
    const w = x1 - x0;
    r(x0 + 6, top, w - 12, 1, 11);                            // dome top
    r(x0 + 3, top + 1, 3, 2, 11); r(x1 - 6, top + 1, 3, 2, 11);
    r(x0 + 1, top + 3, 2, 3, 11); r(x1 - 3, top + 3, 2, 3, 11);
    r(x0, top + 6, 1, 112 - top - 6, 11); r(x1 - 1, top + 6, 1, 112 - top - 6, 11);
    r(x0, 116, w, 2, 11);                                     // base rim
    r(x0 + 1, 115, w - 2, 1, 15);
    r(x0 + 3, top + 4, 2, 10, 15);                            // glass shine
    r(x0 + 8, top + 1, 6, 1, 15);
  };
  const plaque = (x0, x1) => {                                // COMING SOON bar
    r(x0, 124, x1 - x0, 7, 14);
    r(x0, 124, x1 - x0, 1, 15);
    r(x0 + 2, 126, 8, 1, 0); r(x0 + 12, 126, 6, 1, 0);        // block-text dashes
    r(x0 + 2, 128, 5, 1, 0); r(x0 + 9, 128, 9, 1, 0);
  };

  // Podium A + bell — blurry product, blurry on purpose
  podium(36, 72); bell(40, 68, 88); plaque(42, 66);
  for (let y = 100; y < 112; y += 2)
    for (let x = 46 + (y % 4); x < 62; x += 4) r(x, y, 2, 2, (x + y) % 8 < 4 ? 9 : 11);
  r(50, 96, 8, 4, 9); r(48, 98, 12, 3, 11);

  // Podium B + bell — the pulsing one, "almost ready"
  podium(118, 154); bell(122, 150, 86); plaque(124, 148);
  const pulse = frame % 12 < 6;
  for (let y = 98; y < 112; y += 2)
    for (let x = 128 + (y % 4); x < 144; x += 4) r(x, y, 2, 2, (x + y) % 8 < 4 ? 13 : 15);
  r(132, 94, 8, 4, 13);
  r(134, 102, 2, 2, pulse ? 15 : 13); r(138, 106, 2, 2, pulse ? 13 : 15);

  // Podium C — empty. The most honest exhibit on the floor.
  podium(160, 188);
  r(166, 119, 16, 1, 7); r(164, 120, 2, 2, 7); r(182, 120, 2, 2, 7); r(166, 122, 16, 1, 7); // dust ring
  plaque(163, 185);

  // ============ DEFLATED GPT-7 BALLOONS (2..26, 120..148) ============
  r(6, 142, 18, 6, 15); r(8, 144, 6, 1, 0); r(16, 144, 5, 1, 0); r(9, 146, 10, 1, 0); // banner scrap
  r(4, 126, 8, 3, 4); r(3, 128, 11, 7, 4); r(5, 131, 6, 1, 8);       // red, sagging
  r(13, 130, 7, 3, 9); r(12, 132, 10, 6, 9); r(14, 134, 5, 1, 8);    // blue, sadder
  r(19, 124, 6, 3, 14); r(18, 126, 9, 8, 14); r(20, 129, 5, 1, 8);   // yellow, in denial
  r(2, 134, 6, 3, 4); r(1, 136, 8, 5, 4); r(3, 138, 4, 1, 8);        // another red
  r(8, 135, 1, 13, 8); r(16, 138, 1, 10, 8); r(22, 134, 1, 12, 8);   // strings to floor
  r(0, 147, 30, 2, 8);                                                // pile shadow

  // ============ VELVET ROPE — the only tech here that shipped ============
  for (const px of [198, 242]) {
    r(px, 126, 4, 19, 8);                                     // post
    r(px, 126, 1, 19, 7);
    r(px - 1, 124, 6, 3, 14);                                 // brass ball top
    r(px - 1, 144, 6, 2, 0);                                  // base
  }
  r(203, 130, 8, 2, 4); r(210, 132, 8, 2, 4); r(217, 133, 8, 2, 4);   // sagging rope
  r(224, 132, 8, 2, 4); r(231, 130, 10, 2, 4);
  r(204, 130, 6, 1, 12);                                      // rope sheen

  // ============ גדי — one man, three events, zero pulse ============
  const gx = [96, 160, 190][Math.floor(frame / 25) % 3];      // teleporting producer
  r(gx - 1, 144, 18, 3, 8);                                   // shadow
  r(gx + 3, 135, 4, 10, 1); r(gx + 9, 135, 4, 10, 1);         // jeans legs
  r(gx + 3, 144, 5, 2, 0); r(gx + 9, 144, 5, 2, 0);           // shoes
  r(gx + 2, 126, 12, 10, 0);                                  // black staff shirt
  r(gx, 128, 3, 7, 0); r(gx + 13, 127, 3, 5, 0);              // arms (one raised to earpiece)
  r(gx + 14, 124, 2, 4, 6);                                   // hand on headset
  r(gx + 4, 132, 8, 1, 8);                                    // shirt crease
  r(gx + 5, 130, 6, 2, 14); r(gx + 6, 131, 4, 1, 0);          // lanyard of eleven badges
  r(gx + 4, 118, 8, 8, 6);                                    // head
  r(gx + 4, 117, 8, 2, 0);                                    // hair
  r(gx + 3, 118, 1, 5, 0); r(gx + 12, 120, 2, 2, 8);          // headset arc + mic
  r(gx + 12, 122, 3, 1, 8);                                   // mic boom
  r(gx + 5, 121, 2, 1, 0); r(gx + 9, 121, 2, 1, 0);           // stressed eyes
  r(gx + 7, 124, 3, 1, 4);                                    // mid-sentence mouth
  if (frame % 8 < 4) r(gx + 6, 119, 1, 1, 11);                // real-time sweat
}
