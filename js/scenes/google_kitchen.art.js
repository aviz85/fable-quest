// google_kitchen.art.js — המטבחון האחרון (Google chapter)
// 320x200 EGA, Sierra SCI0. fillRect only.
// The last functioning micro-kitchen on campus: aggressively cheerful primary
// colors over creeping decay. Yellow wall, dead-product whiteboard, one last
// snack, a lying coffee machine, a memorial candle, a laptop nobody logged out
// of since 2023, a chair that spins alone, and a beta juice that kills you.
// Animations: flickering fixture, lying progress bar, glinting snack, candle
// flame, orbiting chair highlight, pulsing beta bottle.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- 1. ceiling (0..24) ----------
  r(0, 0, 320, 22, 15);
  for (let x = 24; x < 320; x += 48) r(x, 0, 1, 22, 7);        // panel seams
  r(0, 22, 320, 2, 7);                                          // shadow seam
  r(0, 23, 320, 1, 8);
  // fluorescent fixtures (right one: facilities ticket open since 2022)
  const fixt = (x, on) => {
    r(x - 1, 4, 42, 1, 8);
    r(x, 5, 40, 4, 7);
    r(x + 1, 9, 38, 2, on ? 15 : 7);
    if (on) r(x + 4, 11, 32, 1, 14);                            // warm spill
  };
  fixt(60, true);
  fixt(210, !(frame % 23 < 2));

  // ---------- 2. back wall (24..145) — bold Google yellow ----------
  r(0, 24, 320, 121, 14);
  r(0, 26, 320, 4, 15);                                         // accent stripe
  r(0, 30, 320, 1, 6);                                          // stripe underside
  // faint grime dither near the baseboard (the decay is creeping up)
  for (let x = 0; x < 320; x += 6) r(x + ((x / 6) % 2) * 2, 136, 2, 2, 6);
  r(0, 139, 320, 1, 0);
  r(0, 140, 320, 5, 6);                                         // baseboard
  r(0, 140, 320, 1, 15);                                        // baseboard glint

  // playful primary dots on the wall (the brand never stops smiling)
  for (let i = 0; i < 4; i++) r(195 + i * 12, 39, 10, 10, 0);   // outlines
  r(196, 40, 8, 8, 1); r(208, 40, 8, 8, 4); r(220, 40, 8, 8, 14); r(232, 40, 8, 8, 2);
  r(198, 42, 2, 2, 9); r(210, 42, 2, 2, 12); r(222, 42, 2, 2, 15); r(234, 42, 2, 2, 10);
  // stopped wall clock above the coffee machine (it shows the time of the last re-org)
  r(30, 36, 18, 18, 0);                                         // outline
  r(31, 37, 16, 16, 15);                                        // face
  r(30, 36, 2, 2, 14); r(46, 36, 2, 2, 14);                     // fake-round corners
  r(30, 52, 2, 2, 14); r(46, 52, 2, 2, 14);
  r(38, 39, 2, 6, 0);                                           // minute hand (stuck)
  r(39, 44, 5, 2, 0);                                           // hour hand (also stuck)
  r(38, 44, 2, 2, 4);                                           // hub
  // sun-faded ghost of a removed poster ("OKRs 2022") — only the tape remains
  r(190, 56, 32, 24, 15);
  for (let y = 58; y < 78; y += 2)
    for (let x = 191 + ((y / 2) % 2); x < 221; x += 2) r(x, y, 1, 1, 14);
  r(189, 55, 34, 1, 6); r(189, 80, 34, 1, 6);                   // dust outline
  r(189, 55, 1, 26, 6); r(222, 55, 1, 26, 6);
  r(189, 54, 5, 3, 7); r(219, 54, 5, 3, 7);                     // dried tape corners
  // a curling taped notice by the fridge (nobody reads it)
  r(228, 60, 16, 20, 15);
  r(228, 60, 16, 1, 7); r(243, 60, 1, 20, 7);
  r(230, 64, 12, 1, 8); r(230, 67, 12, 1, 8); r(230, 70, 9, 1, 8); r(230, 73, 11, 1, 8);
  r(233, 58, 6, 3, 7);                                          // yellowed tape
  r(228, 78, 4, 2, 7);                                          // curling corner

  // ---------- 12. left exit (0..6, 60..145) → google_corridors ----------
  r(0, 58, 8, 2, 0);
  r(0, 60, 6, 85, 8);                                           // dark gap
  r(5, 60, 3, 85, 7);                                           // jamb
  r(5, 60, 1, 85, 15);                                          // jamb glint
  r(0, 100, 4, 2, 7);                                           // corridor hint

  // ---------- 3. whiteboard — the dead product (104..180, 28..56) ----------
  r(102, 26, 80, 32, 0);                                        // outline
  r(103, 27, 78, 30, 7);                                        // frame 2px
  r(105, 29, 74, 26, 15);                                       // board
  r(105, 29, 74, 1, 11);                                        // glass sheen
  // P1 flowchart: 4 boxes (6x5) + P8 connector lines
  r(112, 33, 6, 5, 1); r(132, 33, 6, 5, 1);
  r(112, 45, 6, 5, 1); r(132, 45, 6, 5, 1);
  r(118, 35, 14, 1, 8);                                         // top link
  r(118, 47, 14, 1, 8);                                         // bottom link
  r(114, 38, 1, 7, 8); r(134, 38, 1, 7, 8);                     // vertical links
  // huge red X over the whole diagram (stepped 2px diagonals)
  for (let i = 0; i < 12; i++) {
    r(108 + i * 3, 31 + i * 2, 3, 2, 4);
    r(141 - i * 3, 31 + i * 2, 3, 2, 4);
  }
  // tiny green scribble bottom-right ("RIP")
  r(168, 50, 2, 3, 2); r(171, 50, 1, 3, 2); r(173, 50, 2, 3, 2);
  // marker tray with one dead marker
  r(108, 56, 68, 3, 8);
  r(108, 58, 68, 1, 0);
  r(150, 55, 9, 2, 4); r(158, 55, 2, 2, 0);                     // red marker, capped

  // ---------- 4. snack shelves (108..176, 60..106) ----------
  const shelf = (y) => {
    r(106, y, 72, 3, 15);
    r(106, y + 3, 72, 1, 7);                                    // underside shadow
    r(106, y - 1, 72, 1, 0);                                    // top edge
    r(106, y, 1, 4, 0); r(177, y, 1, 4, 0);                     // bracket caps
  };
  shelf(78); shelf(104);
  // bowl helper: stacked rects faking a hemisphere; interior P8 = EMPTY
  const bowl = (x, c, w) => {
    r(x + 2, 68, w - 4, 2, c);                                  // rim
    r(x + 1, 70, w - 2, 4, c);
    r(x + 3, 74, w - 6, 3, c);
    r(x + 3, 68, w - 6, 2, 8);                                  // empty interior
    r(x + 1, 77, w - 2, 1, 0);                                  // base line
  };
  bowl(110, 4, 20);                                             // red — empty
  bowl(132, 2, 20);                                             // green — empty
  bowl(154, 1, 20);                                             // blue — empty
  // bottom shelf: THE yellow bowl with the last snack in history
  r(134, 95, 20, 2, 14); r(133, 97, 22, 4, 14); r(135, 101, 18, 3, 14);
  r(135, 95, 18, 2, 8);                                         // mostly empty too
  r(133, 103, 22, 1, 0);
  r(141, 93, 5, 4, 6);                                          // the snack
  if (frame % 14 < 7) r(142, 93, 1, 1, 15);                     // it glitters
  r(118, 102, 8, 2, 8); r(160, 102, 6, 2, 8);                   // dust where bowls were

  // ---------- 6a. memorial sign (62..96, 76..100) ----------
  r(61, 75, 37, 27, 0);                                         // frame 1px
  r(62, 76, 35, 25, 15);                                        // plaque
  r(63, 77, 33, 1, 7);
  // three rows of block-text ("שורד מ-2019")
  for (let i = 0; i < 5; i++) r(66 + i * 5, 81, 3, 3, 0);
  for (let i = 0; i < 6; i++) r(65 + i * 5, 87, 3, 3, 0);
  for (let i = 0; i < 4; i++) r(69 + i * 5, 93, 3, 3, 0);

  // ---------- 5. counter (8..100) + coffee machine ----------
  // counter body first (front), then slab top
  r(8, 116, 92, 29, 7);                                         // body
  r(8, 116, 92, 2, 8);                                          // under-lip shadow
  r(10, 120, 42, 23, 8);                                        // door seams
  r(11, 121, 40, 21, 7);
  r(56, 120, 42, 23, 8);
  r(57, 121, 40, 21, 7);
  r(29, 129, 4, 2, 8); r(75, 129, 4, 2, 8);                     // handles
  r(8, 143, 92, 2, 8);                                          // kick shadow
  r(7, 110, 94, 6, 15);                                         // slab top
  r(7, 110, 94, 1, 0);                                          // thin top edge
  r(7, 115, 94, 1, 7);
  r(6, 145, 96, 3, 7);                                          // floor shadow

  // coffee machine (20..56, 68..110): the liar
  r(19, 67, 39, 44, 0);                                         // outline
  r(20, 68, 37, 42, 7);                                         // body
  r(20, 68, 37, 3, 0);                                          // top vent
  r(22, 69, 2, 1, 8); r(28, 69, 2, 1, 8); r(34, 69, 2, 1, 8); r(40, 69, 2, 1, 8); r(46, 69, 2, 1, 8); r(52, 69, 2, 1, 8);
  r(21, 71, 35, 1, 15);                                         // top glint
  // screen: "עדכון גרסה 4 מתוך 512"
  r(25, 75, 26, 15, 0);                                         // screen bezel
  r(26, 76, 24, 12, 0);
  r(28, 78, 14, 2, 10);                                         // block-text row
  r(44, 78, 4, 2, 10);
  r(28, 81, 8, 1, 10);
  // the progress bar. frozen at 12px. once every ~4s it lies.
  r(27, 84, 22, 3, 8);                                          // groove
  r(27, 84, frame % 40 === 0 ? 13 : 12, 3, 10);                 // "progress"
  // chrome drip zone + spout + abandoned cup
  r(24, 92, 30, 8, 11);
  r(24, 99, 30, 1, 8);
  r(36, 92, 6, 4, 0);                                           // spout
  r(37, 96, 4, 1, 8);
  r(34, 101, 10, 8, 15);                                        // the waiting cup
  r(34, 101, 10, 1, 8); r(33, 108, 12, 1, 0);
  r(44, 103, 2, 4, 15);                                         // handle
  r(20, 108, 37, 2, 8);                                         // machine base shadow

  // ---------- 6b. candle on the counter (76..84, 98..110) ----------
  r(75, 108, 11, 2, 8);                                         // wax puddle
  r(78, 100, 4, 10, 15);                                        // wax cylinder
  r(78, 100, 1, 10, 7);                                         // shading
  r(79, 98, 2, 2, 0);                                           // wick
  r(79, 95, 2, 3, frame % 6 < 3 ? 14 : 12);                     // the flame
  if (frame % 6 < 3) r(79, 94, 1, 1, 15);                       // flame tip

  // ---------- 7. bar table + laptop (182..242) ----------
  r(208, 114, 8, 31, 8);                                        // single leg
  r(209, 114, 2, 31, 7);                                        // leg glint
  r(204, 143, 16, 2, 0);                                        // foot
  r(200, 145, 24, 3, 7);                                        // floor shadow
  r(181, 109, 62, 6, 0);                                        // top outline
  r(182, 110, 60, 4, 6);                                        // round-ish slab
  r(182, 110, 60, 1, 7);                                        // rim
  r(184, 113, 56, 1, 8);
  // laptop: Ariel L.'s eternal calendar
  r(197, 83, 33, 24, 0);                                        // screen frame
  r(200, 86, 27, 18, 9);                                        // glow interior
  // 3x4 calendar grid (6x4 blocks); one meeting still blinking for a ghost
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 4; col++) {
      const ghost = row === 1 && col === 2;
      r(201 + col * 7, 88 + row * 5, 6, 4, ghost && frame % 10 < 5 ? 12 : 15);
    }
  r(196, 106, 34, 4, 7);                                        // base
  r(196, 106, 34, 1, 15);                                       // keyboard glint
  r(196, 109, 34, 1, 8);

  // ---------- 8. the spinning chair (164..184, 112..145) ----------
  r(170, 141, 12, 2, 0);                                        // star base bars
  r(166, 143, 20, 2, 0);
  r(174, 116, 4, 25, 8);                                        // stem
  r(175, 116, 1, 25, 7);
  r(165, 111, 18, 1, 0);                                        // seat rim
  r(166, 112, 16, 4, 0);                                        // seat slab
  r(167, 112, 14, 1, 4);                                        // worn red cushion edge
  // the orbiting highlight — it spins alone; it doesn't care
  const spin = Math.floor(frame / 5) % 4;
  if (spin === 0) r(166, 113, 2, 2, 7);                         // left
  else if (spin === 1) r(172, 114, 3, 1, 7);                    // front
  else if (spin === 2) r(180, 113, 2, 2, 7);                    // right
  else r(172, 112, 3, 1, 7);                                    // back
  r(163, 145, 24, 2, 7);                                        // floor shadow

  // ---------- 9. glass fridge (248..300, 58..145) ----------
  r(246, 56, 56, 91, 0);                                        // outline
  r(248, 58, 52, 87, 7);                                        // frame 3px
  r(251, 61, 46, 81, 11);                                       // glass interior
  r(251, 61, 46, 2, 3);                                         // top chill
  // 3 shelves
  r(251, 86, 46, 2, 7); r(251, 108, 46, 2, 7); r(251, 132, 46, 2, 7);
  // top shelf bottles (4x10)
  const caps = [2, 1, 4, 2, 1, 4];
  for (let i = 0; i < 6; i++) { r(254 + i * 7, 76, 4, 10, caps[i]); r(255 + i * 7, 74, 2, 2, caps[i]); }
  // middle shelf: bottles + THE beta bottle on its display stand
  r(254, 98, 4, 10, 1); r(255, 96, 2, 2, 1);
  r(286, 98, 4, 10, 4); r(287, 96, 2, 2, 4);
  r(266, 106, 12, 2, 15);                                       // display stand
  r(268, 92, 8, 14, 10);                                        // Google Juice — beta
  r(270, 89, 4, 3, 10);                                         // neck
  r(269, 94, 2, 6, 2);                                          // liquid shading
  if (frame % 8 < 4) { r(267, 91, 1, 1, 15); r(276, 96, 1, 1, 15); } // the halo
  r(266, 110, 12, 4, 0);                                        // the "beta" tag
  r(268, 111, 8, 1, 15);
  // bottom shelf bottles
  for (let i = 0; i < 5; i++) { r(256 + i * 8, 122, 4, 10, caps[i + 1]); r(257 + i * 8, 120, 2, 2, caps[i + 1]); }
  // glass streaks (stepped diagonals, drawn over — reflections)
  for (let i = 0; i < 9; i++) { r(254 + i * 2, 118 - i * 6, 1, 4, 15); r(284 + i, 130 - i * 7, 1, 3, 15); }
  r(294, 78, 3, 44, 8);                                         // door handle
  r(294, 78, 1, 44, 15);
  r(247, 145, 54, 3, 7);                                        // floor shadow

  // ---------- 11. floor (145..200) ----------
  r(0, 145, 320, 55, 15);
  r(0, 145, 320, 2, 7);                                         // wall meet
  r(0, 162, 320, 1, 7); r(0, 180, 320, 1, 7);                   // horizontal grout
  // vertical grout, fanning wider toward the viewer
  for (let k = -5; k <= 5; k++) {
    const xt = 160 + k * 32, xb = 160 + k * 42;
    r(xt, 147, 1, 15, 7);
    r(Math.round(xt + (xb - xt) * 0.45), 162, 1, 18, 7);
    r(xb, 180, 1, 20, 7);
  }
  // a designer's last stand: one playful green accent tile
  r(128, 168, 16, 8, 2);
  r(128, 168, 16, 1, 10); r(128, 175, 16, 1, 8);
  // scuff trail: the pilgrimage route, left exit → snack shelves
  r(10, 158, 14, 2, 7); r(28, 156, 18, 2, 7); r(50, 155, 16, 1, 7);
  r(70, 153, 20, 2, 7); r(96, 152, 18, 1, 7); r(118, 150, 16, 2, 7);
  r(30, 159, 8, 1, 8); r(76, 155, 8, 1, 8); r(122, 152, 6, 1, 8);

  // ---------- 10. recycling bins (foreground, 6..66, 152..190) ----------
  const bins = [1, 2, 14, 4];
  for (let i = 0; i < 4; i++) {
    const bx = 6 + i * 15;
    r(bx - 1, 159, 15, 32, 0);                                  // outline
    r(bx, 160, 13, 30, bins[i]);
    r(bx, 160, 13, 2, 0);                                       // rim
    r(bx + 1, 162, 2, 26, bins[i] === 14 ? 15 : 11);            // side sheen
    r(bx + 3, 172, 7, 6, 15);                                   // label block
    r(bx + 4, 174, 5, 1, 0); r(bx + 4, 176, 3, 1, 0);
    // the exact same trash overflowing from all four
    r(bx + 1, 154, 10, 6, 8);
    r(bx + 3, 151, 6, 4, 8);
    r(bx + 4, 152, 2, 1, 7);                                    // crumple highlight
    r(bx + 7, 152, 4, 3, 15);                                   // paper corner
    r(bx + 7, 152, 4, 1, 7);
    r(bx - 1, 190, 15, 2, 7);                                   // floor shadow
  }
  // dust nobody vacuums, right side
  r(268, 184, 22, 2, 7); r(300, 170, 14, 1, 7); r(236, 156, 12, 1, 7);
  // ambient occlusion: sparse dither where the floor meets the wall (depth)
  for (let x = 0; x < 320; x += 8) r(x + ((x / 8) % 2) * 4, 148, 2, 1, 7);
  // wall outlet on the baseboard (something must feed the eternal laptop)
  r(232, 133, 8, 8, 7); r(232, 133, 8, 1, 15); r(234, 135, 1, 2, 0); r(237, 135, 1, 2, 0);
  r(234, 138, 3, 1, 0);
  // its cable, drooping up to the bar table like a life-support line
  r(236, 130, 1, 3, 8); r(234, 126, 2, 4, 8); r(231, 121, 3, 5, 8); r(229, 115, 2, 6, 8);
}
