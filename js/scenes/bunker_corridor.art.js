// bunker_corridor.art.js — "מסדרון הבונקר" — Fable dream-void passage
// Sierra SCI0 style. Faction: fable (P13/P5/P11 dream logic).
// Light: glowing tile path (P11) + breathing white-pink portal at far right (P13/P15).
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- VOID (whole bg): P5 base + P13 2x2 checker, loose diagonal bands, denser up top ----------
  r(0, 0, 320, 200, 5);
  for (let y = 0; y < 200; y += 4) {
    const step = y < 70 ? 12 : y < 140 ? 18 : 26;
    for (let x = (y >> 1) % step; x < 320; x += step) {
      if (((x + y) & 63) < 34) { // diagonal band gate
        r(x, y, 2, 2, 13);
        if (y < 50 && ((x + y) & 63) < 8) r(x + 4, y + 2, 2, 2, 13);
      }
    }
  }

  // ---------- SLOW STARS: 10 twinkling 2x2 P15 dots, each on its own phase ----------
  const stars = [[14, 8], [104, 14], [156, 6], [190, 22], [238, 8], [286, 26], [120, 62], [22, 84], [270, 70], [180, 44]];
  for (let i = 0; i < stars.length; i++) {
    if ((frame + i * 7) % 60 < 40) r(stars[i][0], stars[i][1], 2, 2, 15);
  }

  // ---------- GIANT STORYBOOKS (bg), floating, slight bob ----------
  const bob = frame % 80 < 40 ? 0 : 1;
  // book A: ~30,18,54,34 (high, clear of door #1)
  r(29, 19 + bob, 27, 30, 0);              // left page outline
  r(30, 20 + bob, 25, 28, 15);
  r(31, 18 + bob, 22, 4, 15);              // page tilt step
  r(55, 16 + bob, 4, 32, 7);               // spine ridge
  r(59, 16 + bob, 26, 30, 15);             // right page
  r(58, 15 + bob, 28, 1, 0); r(85, 15 + bob, 1, 32, 0); r(59, 46 + bob, 26, 1, 0);
  for (let i = 0; i < 5; i++) {            // text lines P8
    r(33, 24 + bob + i * 5, 18, 1, 8);
    r(62, 21 + bob + i * 5, 20, 1, 8);
  }
  r(30, 48 + bob, 55, 2, 8);               // book underside shadow
  // book B: 226,20,48,30 (opposite bob phase)
  const bob2 = frame % 80 < 40 ? 1 : 0;
  r(225, 24 + bob2, 24, 25, 0);
  r(226, 25 + bob2, 22, 23, 15);
  r(227, 23 + bob2, 19, 4, 15);
  r(248, 22 + bob2, 4, 27, 7);
  r(252, 22 + bob2, 22, 25, 15);
  r(251, 21 + bob2, 24, 1, 0); r(274, 21 + bob2, 1, 27, 0); r(252, 47 + bob2, 22, 1, 0);
  for (let i = 0; i < 4; i++) {
    r(229, 29 + bob2 + i * 5, 16, 1, 8);
    r(255, 27 + bob2 + i * 5, 16, 1, 8);
  }
  r(226, 49 + bob2, 48, 2, 8);

  // ---------- FIBER CABLES (far pair): drawn BEHIND stairs/doors/islands ----------
  const cable = (pts, c) => {
    for (let s = 0; s < pts.length - 1; s++) {
      const x0 = pts[s][0], y0 = pts[s][1], x1 = pts[s + 1][0], y1 = pts[s + 1][1];
      const n = Math.max(1, Math.round(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) / 3));
      for (let i = 0; i <= n; i++) {
        r(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), 3, 3, c);
      }
    }
  };
  // cyan: top-left (0,52) → steps down-right → exits right at (320,150)
  cable([[0, 52], [80, 74], [160, 104], [240, 132], [302, 150]], 3);
  // white: from under the stairs (96,100) → (320,156)
  cable([[96, 100], [180, 124], [262, 140], [304, 156]], 15);

  // ---------- UPSIDE-DOWN STAIRCASE: (96,96) climbing up-right to (150,34), treads facing DOWN ----------
  for (let i = 0; i < 6; i++) {
    const sx = 96 + i * 10, sy = 96 - i * 11;
    r(sx - 1, sy - 10, 18, 11, 0);         // outline
    r(sx, sy - 9, 16, 9, 8);               // step body
    r(sx, sy - 2, 16, 2, 7);               // lit BOTTOM edge (upside down!)
    r(sx + 10, sy - 20, 6, 11, 8);         // riser connecting up to next step
    r(sx + 10, sy - 20, 1, 11, 0);
  }
  // faint P13 shimmer under the top step (ends in void) + glow drips — the stairs HANG
  if (frame % 40 < 20) r(152, 26, 8, 1, 13);
  r(102, 98, 1, 3, 13); r(132, 65, 1, 3, 13); r(152, 43, 1, 3, 13);

  // ---------- FLOATING DOOR #1 (tilted, knob on wrong side): 40,58,26,44 ----------
  // lean faked with 3 vertical slabs stepping DOWN 2px to the right — ONE silhouette
  r(39, 57, 11, 46, 0); r(48, 59, 11, 46, 0); r(57, 61, 10, 46, 0);  // stepped outline
  r(40, 58, 9, 44, 6); r(48, 60, 10, 44, 6); r(58, 62, 8, 44, 6);    // wood (slabs touch — no inner black)
  r(40, 58, 9, 2, 12); r(49, 60, 9, 2, 12); r(58, 62, 8, 2, 12);     // top catch-light steps
  r(43, 66, 18, 12, 8); r(44, 67, 16, 10, 6);                        // upper panel (spans the door)
  r(43, 84, 18, 12, 8); r(44, 85, 16, 10, 6);                        // lower panel
  r(44, 79, 4, 5, 14); r(44, 83, 4, 1, 0); r(45, 80, 2, 2, 15);      // knob at 44,80 — LEFT (wrong)
  r(46, 110, 26, 2, 8);                                              // shadow puddle — it floats

  // ---------- FLOATING DOOR #2 (UPSIDE-DOWN — the death): 196,40,26,44 ----------
  r(194, 38, 30, 48, 13);                  // thin P13 glow outline
  r(195, 39, 28, 46, 0);                   // black outline
  r(196, 40, 26, 44, 6);
  // inverted panels (panel gap at top where bottom rail should be)
  r(199, 46, 20, 14, 8); r(200, 47, 18, 12, 6);
  r(199, 64, 20, 16, 8); r(200, 65, 18, 14, 6);
  r(215, 42, 5, 5, 14);                    // knob at TOP-right = upside down
  r(215, 42, 5, 1, 0); r(219, 42, 1, 5, 0);
  r(216, 43, 2, 2, 15);                    // knob glint — it wants you to try
  r(197, 41, 24, 1, 7);                    // sheen along (now-)top edge
  r(198, 88, 24, 2, 8);                    // shadow below — hangs over the path

  // ---------- FLOATING STONE ISLANDS ----------
  // island A: 8,128,64,20 — jagged floating rock
  r(7, 127, 66, 22, 0);                    // silhouette outline
  r(8, 128, 64, 20, 8);
  r(8, 128, 64, 3, 7);                     // top surface
  r(8, 128, 64, 1, 15);                    // dream rim-light
  r(7, 127, 8, 4, 5); r(64, 127, 9, 5, 5); // void bites the corners
  r(30, 127, 6, 2, 5); r(48, 127, 4, 1, 5); // ragged top silhouette
  r(7, 140, 4, 9, 5); r(68, 138, 5, 11, 5); // ragged sides — rock, not furniture
  r(15, 129, 6, 2, 7);
  r(24, 135, 2, 2, 0); r(26, 137, 2, 3, 0); r(28, 140, 2, 2, 0); // diagonal crack (stepped)
  r(46, 133, 2, 2, 0); r(48, 135, 2, 3, 0); r(50, 138, 3, 2, 0);
  r(26, 135, 2, 2, 7); r(48, 133, 2, 2, 7); // lit crack lips
  r(18, 134, 5, 2, 7); r(58, 137, 5, 2, 7); r(36, 141, 6, 2, 7); // stone facets
  r(14, 148, 50, 4, 8); r(13, 148, 52, 1, 0); // taper step 1
  r(26, 152, 28, 3, 8);                    // taper step 2
  r(36, 155, 12, 2, 8);                    // taper tip
  r(14, 151, 50, 1, 13); r(26, 154, 28, 1, 13); r(36, 156, 12, 1, 13); // glow fringe underside
  // island C: 282,120,30,14
  r(281, 119, 32, 16, 0);
  r(282, 120, 30, 14, 8);
  r(282, 120, 30, 3, 7);
  r(282, 120, 30, 1, 15);
  r(288, 134, 18, 3, 8);
  r(288, 137, 18, 1, 13);
  // island B (main walk island): 78,142,196,58 → merges into floor
  r(78, 142, 196, 34, 8);                  // body y142..176
  r(78, 142, 196, 3, 7);                   // top surface strip
  r(78, 142, 196, 1, 15);                  // rim-light
  r(78, 142, 1, 34, 0);                    // left cliff edge
  r(79, 145, 2, 31, 7);                    // lit cliff face
  r(78, 176, 1, 4, 13);                    // glow fringe at left base
  // dithered P8/P5 texture on island B top (142..176)
  for (let y = 148; y < 176; y += 4) {
    for (let x = 82 + (y % 8); x < 272; x += 16) r(x, y, 2, 2, 5);
  }
  // ---------- FLOOR APRON (walkable): 0,176 → 320x24 solid P8, reads as shadow-stone ----------
  r(0, 176, 320, 24, 8);
  r(0, 176, 320, 1, 7);                    // lit lip
  r(0, 186, 320, 1, 0);                    // perspective seam
  r(0, 194, 320, 1, 0);
  // sparse P5 dream-speckle on apron
  for (let x = 4; x < 320; x += 30) r(x + (x % 7), 180 + ((x * 3) % 14), 3, 2, 5);

  // ---------- STAIRS-UP HOLE (exit up → cafe_basement): 84,120,30,26 — boring concrete ----------
  r(83, 118, 32, 28, 0);                   // dark opening
  for (let i = 0; i < 4; i++) {            // faint P7 steps rising LEFT into the dark
    r(86 + i * 6, 138 - i * 5, 26 - i * 6, 3, 7);
    r(86 + i * 6, 141 - i * 5, 26 - i * 6, 2, 8);
  }
  r(83, 144, 32, 2, 7);                    // threshold lip on island B top

  // ---------- FIBER CABLES (near pair) — all four flow RIGHT into the braid ----------
  // red: left edge (0,170) along floor → (320,162)
  cable([[0, 170], [140, 167], [302, 162]], 4);
  // yellow: enters upper-left, arches tight OVER door #1 (~36..70,50..58) → right (320,168)
  cable([[0, 96], [20, 74], [34, 56]], 14);
  r(34, 52, 10, 3, 14); r(42, 48, 22, 3, 14); r(62, 52, 10, 3, 14);  // the arch itself
  r(34, 52, 3, 8, 14); r(69, 52, 3, 8, 14);
  cable([[70, 58], [74, 90], [78, 126], [82, 150], [126, 157], [204, 160], [260, 164], [302, 168]], 14);
  // braid ties where all four converge (x≈288..300)
  r(287, 146, 2, 26, 15); r(294, 149, 2, 22, 13);
  if (frame % 16 < 8) r(290, 154, 2, 2, 11);

  // ---------- GLOWING TILE PATH: 8 tiles 18x8 at y=160 — light walks you RIGHT ----------
  const lit = ((frame / 8) | 0) % 8;
  for (let i = 0; i < 8; i++) {
    const tx = 90 + i * 26;
    r(tx - 1, 159, 20, 10, 3);             // P3 edge
    r(tx, 160, 18, 8, i === lit ? 15 : 11);
    if (i === lit) {                       // halo around the lit tile
      r(tx - 3, 162, 2, 4, 11); r(tx + 19, 162, 2, 4, 11);
      r(tx + 4, 157, 10, 2, 11); r(tx + 4, 169, 10, 2, 11);
    }
  }

  // ---------- VOID DRIPS: the room leaks light (1px P13 trickles from island undersides) ----------
  const drips = [[20, 153], [52, 156], [70, 153], [286, 138]];
  for (let i = 0; i < drips.length; i++) {
    const dy = (frame * 3 + i * 20) % 40;
    const y0 = drips[i][1] + dy;
    if (y0 < 173) r(drips[i][0], y0, 1, 4, 13);
  }

  // ---------- PORTAL (exit right → fable_core): 296,96,24,80, breathing halo ----------
  const swap = frame % 30 < 15;
  for (let x = 296; x < 320; x += 2) {
    if (x >= 304 && x < 312) continue;     // core drawn after
    const inner = (x >= 300 && x < 316);
    r(x, 96, 2, 80, ((x >> 1) % 2 === 0) === swap ? 13 : (inner ? 13 : 5));
  }
  r(300, 90, 16, 6, 13); r(304, 86, 8, 4, swap ? 13 : 5); // rounded gate top
  r(304, 96, 8, 80, 15);                   // white core
  r(305, 92, 6, 4, 15);
  r(306, 100 + (frame % 20 < 10 ? 0 : 4), 4, 6, 13); // inner ripple
  r(290, 176, 34, 3, 13);                  // light pooling on floor
  r(296, 179, 24, 2, 11);
  r(292, 110, 2, 2, 15); r(293, 148, 2, 2, 13); // stray sparkles
}
