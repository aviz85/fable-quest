// openai_lobby.art.js — לובי מגדל ההדגמה (OpenAI chapter, room 1)
// 320x200 EGA, Sierra SCI0 style. fillRect only.
// Sterile white future: white P15, grays P7/P8, monolith P0, cyan glow P11,
// eye/screens P9, safety red P4.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- ceiling (0..28) ----------
  r(0, 0, 320, 24, 15);
  for (let x = 0; x < 320; x += 64) r(x, 0, 1, 24, 7);      // ceiling panel seams
  r(0, 24, 320, 4, 7);                                       // tech strip
  r(0, 24, 320, 1, 8);
  r(0, 27, 320, 1, 8);

  // recessed lights x=30,90,150,210,270 — the one at 210 flickers (under review)
  for (let i = 0; i < 5; i++) {
    const lx = 30 + i * 60;
    const flicker = lx === 210 && frame % 30 < 3;
    r(lx - 1, 7, 22, 6, 7);                                  // fixture recess
    r(lx, 8, 20, 4, flicker ? 8 : 11);
    if (!flicker) { r(lx + 2, 9, 16, 1, 15); r(lx + 4, 13, 12, 1, 11); } // glow lip
  }

  // ---------- back wall (28..145) — clean, minimalism you pay extra for ----------
  r(0, 28, 320, 117, 15);
  // vertical panel seams — minimalism, but modular minimalism
  for (const px of [64, 128, 256, 300]) r(px, 28, 1, 112, 7);
  r(0, 50, 320, 2, 7);                                       // horizontal accent stripes
  r(0, 95, 320, 2, 7);
  // baseboard
  r(0, 140, 320, 1, 8);
  r(0, 141, 320, 4, 7);
  // "FOR YOUR SAFETY" wall plate above the left barrier
  r(9, 100, 28, 11, 7);
  r(9, 100, 28, 1, 15); r(9, 110, 28, 1, 8);
  r(11, 102, 24, 3, 4);                                      // red band
  r(12, 106, 22, 1, 8); r(12, 108, 16, 1, 8);                // fine-print bars

  // ---------- AC vent (138,30,44,8) — the air you signed for ----------
  r(137, 29, 46, 10, 8);                                     // outline
  r(138, 30, 44, 8, 7);
  for (let i = 0; i < 4; i++) r(141 + i * 11, 32, 8, 4, 8);  // slits
  r(138, 30, 44, 1, 15);                                     // top glint

  // ---------- GPT-8 sign (12,36,86,26) ----------
  r(10, 34, 90, 30, 8);                                      // outer bezel
  r(12, 36, 86, 26, 0);                                      // dark panel
  r(13, 37, 84, 1, 7);                                       // bezel glint
  // "GPT-8" in white 5x7-ish block letters (top area of the panel)
  const L = 15;
  // G (18,40)
  r(18, 40, 8, 2, L); r(18, 42, 2, 8, L); r(18, 48, 8, 2, L); r(24, 44, 2, 6, L); r(22, 44, 4, 2, L);
  // P (30,40)
  r(30, 40, 2, 10, L); r(30, 40, 7, 2, L); r(35, 40, 2, 5, L); r(30, 44, 7, 2, L);
  // T (41,40)
  r(41, 40, 9, 2, L); r(44, 40, 3, 10, L);
  // dash (53,44)
  r(53, 44, 5, 2, L);
  // 8 (61,40)
  r(61, 40, 8, 2, L); r(61, 44, 8, 2, L); r(61, 48, 8, 2, L); r(61, 40, 2, 10, L); r(67, 40, 2, 10, L);
  // eye dot after the 8 (small monolith cameo)
  r(74, 42, 4, 6, 8); r(75, 44, 2, 2, 9);
  // COMING SOON bar — flickers between P11 and P3
  const soon = frame % 20 < 10 ? 11 : 3;
  r(18, 54, 62, 4, soon);
  r(84, 54, 8, 4, 8);                                        // "date TBD" dead segment

  // ---------- THE MONOLITH (196,28,44,117) ----------
  // faint cyan glow spill on the wall left of the monolith (sparse dither)
  for (let y = 34; y < 140; y += 8) r(191, y, 2, 2, 11);
  r(194, 28, 2, 117, 8);                                     // wall seam shadow left
  r(196, 28, 44, 117, 0);
  r(196, 28, 2, 117, 11);                                    // cyan glow edge (left)
  r(198, 28, 1, 117, 3);                                     // glow falloff
  r(239, 28, 1, 117, 8);                                     // right edge sheen
  // the eye — slides between 3 positions, always toward you. obviously.
  const ex = 210 + ((frame >> 3) % 3) * 6;
  r(ex - 1, 59, 10, 10, 8);                                  // socket
  r(ex, 60, 8, 8, 9);
  r(ex + 2, 62, 4, 4, 15);                                   // iris
  r(ex + 3, 63, 2, 2, 0);                                    // pupil
  r(ex + 1, 70, 6, 1, 3);                                    // under-eye glow
  // faint status pinpricks lower down (it does *something*)
  r(206, 110, 2, 2, frame % 40 < 20 ? 2 : 0);
  r(228, 118, 2, 2, frame % 40 >= 20 ? 2 : 0);

  // ---------- NDA kiosk (44,92,34,53) ----------
  r(56, 106, 10, 39, 7);                                     // pedestal leg
  r(56, 106, 2, 39, 15);                                     // leg highlight
  r(64, 106, 2, 39, 8);                                      // leg shade
  r(43, 91, 36, 16, 8);                                      // head outline
  r(44, 92, 34, 14, 7);                                      // sloped head
  r(44, 92, 34, 2, 15);                                      // top light
  r(50, 95, 22, 8, 9);                                       // screen
  r(52, 97, 14, 1, 15);                                      // "scroll to accept" lines
  r(52, 99, 10, 1, 15);
  r(66, 100, 4, 2, frame % 16 < 8 ? 10 : 2);                 // ACCEPT button, breathing
  // chained pen: P8 chain pixel-diagonal down-right to the pen
  r(77, 104, 2, 2, 8); r(75, 106, 2, 2, 8); r(76, 108, 2, 2, 8); r(74, 110, 2, 2, 8); r(75, 112, 2, 2, 8);
  r(74, 110, 3, 8, 0);                                       // the pen (only thing attached to reality)
  r(74, 110, 1, 8, 8);                                       // pen glint
  r(72, 118, 7, 2, 8);                                       // pen shadow on wall
  r(52, 143, 22, 2, 8);                                      // kiosk floor shadow

  // ---------- safety barrier, left exit (6,118,30,27) ----------
  r(6, 130, 4, 12, 7); r(32, 130, 4, 12, 7);                 // legs
  r(6, 130, 1, 12, 8); r(32, 130, 1, 12, 8);
  r(5, 117, 32, 14, 0);                                      // crossbar outline
  // diagonal red/white hazard stripes: each 3px row shifts 2px right
  for (let row = 0; row < 4; row++) {
    r(6, 118 + row * 3, 30, 3, 15);                          // white base row
    for (let x = -12 + row * 2; x < 36; x += 12) {
      const xa = Math.max(6, x + 6), xb = Math.min(36, x + 12);
      if (xb > xa) r(xa, 118 + row * 3, xb - xa, 3, 4);
    }
  }
  r(6, 118, 30, 1, 15);                                      // top glint
  r(6, 140, 32, 5, 7);                                       // base plate
  r(6, 140, 32, 1, 15);
  r(33, 120, 3, 3, frame % 14 < 7 ? 4 : 12);                 // polite pre-alarm LED
  r(4, 145, 36, 2, 8);                                       // floor shadow

  // ---------- reception desk (118,96,84,49), rounded via stepped rects ----------
  r(122, 94, 76, 4, 7);                                      // top counter line
  r(122, 94, 76, 1, 15);
  r(118, 98, 84, 4, 15); r(117, 98, 1, 4, 8); r(202, 98, 1, 4, 8);   // stepped rounding
  r(114, 102, 92, 6, 15); r(113, 102, 1, 6, 8); r(206, 102, 1, 6, 8);
  r(112, 108, 96, 37, 15);                                   // main body
  r(112, 108, 1, 37, 8); r(207, 108, 1, 37, 8);              // side outlines
  r(112, 144, 96, 1, 8);                                     // bottom seam
  r(113, 108, 2, 37, 11);                                    // lit left face edge
  r(203, 108, 4, 37, 7);                                     // shaded right face
  r(116, 109, 88, 2, 7);                                     // shadow under counter lip
  r(116, 112, 88, 1, 7);                                     // front seam lines
  r(116, 134, 88, 1, 7);
  r(116, 135, 88, 9, 7);                                     // darker plinth band
  r(116, 135, 88, 1, 8);
  r(150, 120, 20, 4, 11);                                    // logo stripe
  r(154, 121, 12, 2, 15);                                    // logo core glint
  r(110, 145, 100, 3, 7);                                    // contact shadow

  // ---------- Samantha-bot (148,66,20,32) behind the desk ----------
  r(146, 77, 24, 22, 8);                                     // body outline (P7/P8 so she reads on white)
  r(148, 78, 20, 20, 15);                                    // white torso
  r(148, 78, 2, 20, 7); r(166, 78, 2, 20, 7);                // torso shading
  r(148, 86, 20, 1, 7);                                      // torso seam
  r(152, 89, 12, 3, 11);                                     // badge: Head of First Impressions (beta)
  r(144, 80, 3, 14, 7); r(169, 80, 3, 14, 7);                // arms
  r(144, 80, 3, 1, 8); r(169, 80, 3, 1, 8);
  r(155, 76, 6, 3, 7);                                       // neck
  // screen face 12x10 at (152,66)
  r(151, 65, 14, 12, 0);                                     // bezel
  r(152, 66, 12, 10, 9);
  r(154, 68, 2, 2, 0); r(160, 68, 2, 2, 0);                  // pixel eyes
  // smile that jumps rows — she smiles even when she doesn't
  const smileY = frame % 25 < 13 ? 72 : 73;
  r(155, smileY, 6, 1, 0);
  r(154, smileY - 1, 1, 1, 0); r(161, smileY - 1, 1, 1, 0);  // smile corners
  r(163, 67, 1, 3, 15);                                      // screen glare

  // ---------- too-perfect plant (262,104,26,41) ----------
  // leaves: three symmetric stepped P2 slabs. no leaf ever moves. ever.
  r(269, 104, 12, 8, 2);
  r(266, 110, 18, 9, 2);
  r(263, 117, 24, 10, 2);
  r(269, 104, 12, 1, 10);                                    // top highlight row
  r(266, 110, 2, 9, 10); r(285, 117, 2, 10, 0);              // lit left / dark right
  r(263, 117, 2, 10, 10);
  r(272, 107, 2, 3, 10); r(279, 113, 2, 4, 10);              // leaf glints
  r(268, 120, 3, 2, 10); r(281, 106, 2, 2, 0);               // leaf notches
  r(274, 122, 2, 5, 0);                                      // stem shadow slit
  // pot
  r(261, 126, 28, 20, 8);                                    // outline
  r(262, 127, 26, 18, 7);
  r(262, 127, 26, 2, 15);                                    // rim light
  r(264, 131, 3, 12, 15);                                    // glossy streak
  r(285, 129, 2, 15, 8);                                     // shade side
  r(260, 145, 30, 3, 8);                                     // floor shadow

  // ---------- marble floor (145..200), showroom shine ----------
  r(0, 145, 320, 55, 15);
  r(0, 145, 320, 2, 7);                                      // wall/floor meet
  // vertical light-streak reflections of the ceiling fixtures on the polish
  for (let i = 0; i < 5; i++) {
    const lx = 30 + i * 60;
    if (lx === 210 && frame % 30 < 3) continue;              // dead light, dead streak
    r(lx + 8, 150, 4, 3, 11); r(lx + 7, 155, 6, 2, 11);
    r(lx + 9, 159, 3, 2, 11); r(lx + 8, 163, 4, 1, 11);
  }
  // far floor strip: 2x2 checker dither → reads as depth falling away
  for (let x = 0; x < 320; x += 4) { r(x, 147, 2, 2, 7); r(x + 2, 149, 2, 2, 7); }
  // perspective tile grid: horizontal lines spread toward viewer
  const hy = [153, 164, 178, 194];
  for (const y of hy) r(0, y, 320, 1, 7);
  // vertical grout lines converge slightly toward center (160) — continuous, not brick
  for (let k = -4; k <= 4; k++) {
    const xTop = 160 + k * 34, xBot = 160 + k * 44;
    const seg = [[147, 153], [153, 164], [164, 178], [178, 194], [194, 200]];
    const t = [0, 0.18, 0.42, 0.68, 0.92];
    for (let s = 0; s < 5; s++) {
      const xa = Math.round(xTop + (xBot - xTop) * t[s]);
      r(xa, seg[s][0], 1, seg[s][1] - seg[s][0], 7);
    }
  }
  // reflections on the shine
  r(196, 146, 44, 10, 8);                                    // monolith reflection
  r(198, 156, 40, 4, 7);                                     // reflection falloff
  r(214, 148, 4, 6, 3);                                      // reflected eye glow smear
  r(118, 146, 84, 6, 7);                                     // desk reflection
  r(48, 146, 26, 5, 7);                                      // kiosk reflection
  r(8, 146, 28, 4, 12);                                      // barrier red smear
  // sparkle glints wandering the marble (that clean)
  const g1 = (frame >> 2) % 60;
  r(40 + g1 * 4, 165, 2, 1, 15); r(41 + g1 * 4, 164, 1, 1, 11);
  r(300 - g1 * 3, 182, 2, 1, 15);

  // ---------- entrance mat strip, right edge (300,150,20,42) ----------
  r(299, 149, 21, 44, 7);                                    // trim
  r(300, 150, 20, 42, 8);
  for (let y = 156; y < 190; y += 7) r(300, y, 20, 1, 7);    // mat ribs
  r(300, 150, 20, 2, 7);                                     // worn top edge
}
