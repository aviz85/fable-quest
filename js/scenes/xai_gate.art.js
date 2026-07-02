// xai_gate.art.js — שער מגרש הגרוטאות. Mars on a Purim budget. Faction: xai.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- 1. FAKE-DOME BLACK SKY (0,0,320,50) + red haze band ----------
  r(0, 0, 320, 42, 0);
  for (let y = 42; y < 50; y += 2) {                       // red haze dither rows
    r(0, y, 320, 2, y % 4 === 0 ? 4 : 0);
    for (let x = (y % 4); x < 320; x += 6) r(x, y, 3, 2, y % 4 === 0 ? 0 : 4);
  }
  // dark murk between dome and ridges: quiet black→red gradient (y50..92)
  r(0, 50, 320, 42, 0);
  for (let y = 54; y < 72; y += 4)                          // very sparse red dust
    for (let x = ((y / 4) % 2) * 8 + 2; x < 320; x += 16) r(x, y, 2, 1, 4);
  for (let y = 72; y < 82; y += 2)                          // dither ramps up near horizon
    for (let x = ((y / 2) % 2) * 5; x < 320; x += 10) r(x, y, 3, 2, 4);
  r(0, 82, 320, 10, 4);                                     // solid dusk glow hugging the ridges
  for (let x = 0; x < 320; x += 6) r(x + ((x / 6) % 2) * 2, 82, 3, 2, 0); // soft top edge

  // ---------- 2. HAND-PAINTED STARS (top-left, 8,4..90,26) ----------
  const star = (x, y, c) => { r(x, y, 2, 2, c); r(x - 2, y, 2, 2, c); r(x + 2, y, 2, 2, c); r(x, y - 2, 2, 2, c); r(x, y + 2, 2, 2, c); };
  star(12, 8, 15); star(46, 6, 15); star(80, 10, 15); star(54, 22, 15);
  // peeling star at (30,12): half white, half gray, shifted 1px
  r(30, 12, 2, 2, 15); r(28, 12, 2, 2, 15); r(30, 10, 2, 2, 15);
  r(33, 13, 2, 2, 7); r(31, 15, 2, 2, 7);
  // upside-down star at (66,18): long arm points UP
  r(66, 18, 2, 2, 15); r(64, 18, 2, 2, 15); r(68, 18, 2, 2, 15);
  r(66, 20, 2, 2, 15); r(66, 16, 2, 2, 15); r(66, 12, 2, 4, 15);

  // ---------- 3. PAINTED EARTH, velcroed on (250,10,14,10) ----------
  r(250, 10, 14, 10, 9); r(252, 8, 10, 14, 9);
  r(253, 12, 5, 4, 1); r(258, 15, 4, 3, 1);                // continents-ish blobs
  r(249, 14, 16, 2, 7);                                    // the velcro strip. authentic.

  // ---------- 4. DOME SEAM where "space" ends (288,0,2,110) ----------
  r(288, 0, 2, 110, 8);
  r(290, 2, 1, 106, 0);                                    // shadow of the tarp fold
  r(292, 30, 8, 6, 7); r(292, 30, 8, 1, 0); r(292, 35, 8, 1, 0); // duct-tape patch
  r(293, 32, 6, 1, 8);

  // ---------- 5. DISTANT RED RIDGES (0,92,320,20) jagged top ----------
  r(0, 92, 320, 20, 4);
  // stepped ridge silhouette bites rising above the line (dark-edged so they read on the glow)
  const peak = (x, y, w, h) => { r(x, y, w, h, 4); r(x, y - 1, w, 1, 0); r(x + 1, y, w - 2, 1, 8); };
  peak(0, 88, 26, 4); peak(40, 84, 30, 8); peak(92, 89, 22, 3);
  peak(130, 86, 24, 6); peak(232, 88, 26, 4); peak(300, 85, 20, 7);
  r(0, 92, 320, 1, 8);                                     // ridge shade line
  r(42, 83, 12, 1, 12); r(132, 85, 10, 1, 12); r(302, 84, 8, 1, 12); // dusk light on peaks

  // ---------- 5b. DISTANT MARS PLAIN behind the fences (y112..146) ----------
  r(0, 112, 320, 34, 4);
  for (let y = 112; y < 146; y += 3)                        // darker than the near floor
    for (let x = ((y / 3) % 2) * 4; x < 320; x += 8) r(x, y, 3, 1, 0);
  // far junk piles rotting beyond the fence
  const pile = (x, y, w, h) => { r(x, y, w, h, 8); r(x, y, w, 1, 0); r(x + 2, y - 3, w - 8, 3, 8); };
  pile(8, 122, 30, 10); pile(70, 128, 24, 8); pile(126, 120, 26, 12); pile(288, 124, 26, 10);
  r(20, 116, 3, 6, 8); r(136, 112, 3, 8, 8);                // sticking-up girders

  // ---------- 6. ROCKET SKELETON, lying down (10,72,110,34) ----------
  r(20, 76, 100, 26, 8);                                   // hull
  r(10, 80, 12, 18, 7);                                    // blunted nose cone
  r(11, 81, 2, 16, 15); r(9, 79, 1, 20, 0); r(10, 79, 12, 1, 0); r(10, 98, 12, 1, 0);
  r(20, 75, 100, 1, 0); r(20, 101, 100, 1, 0); r(119, 76, 1, 26, 0);
  for (let i = 0; i < 6; i++) {                            // exposed ribs, sky showing through the top
    r(28 + i * 16, 76, 4, 26, 7);
    r(33 + i * 16, 77, 10, 8, 0);                          // torn-open gaps between ribs
  }
  r(20, 76, 100, 1, 12);                                   // haze catching the top curve
  r(60, 84, 14, 10, 0);                                    // the gaping hole
  r(60, 84, 14, 1, 8); r(60, 84, 1, 10, 8);
  // spray tag under the hole: "flight 4 — almost" (bars)
  r(80, 92, 18, 2, 15); r(80, 96, 12, 2, 15);
  r(16, 102, 100, 3, 0);                                   // grounding shadow

  // ---------- 7. CHAIN-LINK FENCES (left 0,96,168,50 / right 262,96,58,50) ----------
  const fence = (fx, fw) => {
    r(fx, 96, fw, 1, 7);                                   // top rail
    for (let y = 98; y < 146; y += 3)                      // mesh dot-dither
      for (let x = fx + ((y / 3) % 2 ? 0 : 2); x < fx + fw; x += 4) r(x, y, 1, 1, 8);
    for (let x = fx; x < fx + fw; x += 34) { r(x, 96, 3, 50, 8); r(x, 96, 1, 50, 0); }
  };
  fence(0, 168); fence(262, 58);

  // ---------- 8. MEMES ON THE FENCE — 144p archaeology ----------
  const meme = (x, y, tilt) => {
    r(x, y + tilt, 16, 12, 15);
    r(x, y + tilt, 16, 1, 7); r(x, y + tilt, 1, 12, 7);    // curled paper edge
    r(x + 2, y + 3 + tilt, 12, 2, 8); r(x + 2, y + 7 + tilt, 9, 2, 8);
  };
  meme(20, 104, 0); meme(58, 110, 0); meme(96, 102, 0);
  meme(134, 112, 2);                                       // the crooked one
  meme(272, 106, 0); meme(298, 112, 0);

  // ---------- 9. THE ROCKET ARCH — legs (168,58 / 262,58, 18x88) ----------
  const leg = (lx, wobble) => {
    r(lx + wobble, 58, 18, 30, 7);                          // top segment (maybe shifted)
    r(lx, 88, 18, 58, 7);                                   // lower segments
    for (let y = 62; y < 146; y += 12) r(lx + (y < 88 ? wobble : 0), y, 18, 2, 8); // stacked rings
    r(lx + wobble, 58, 2, 30, 15); r(lx, 88, 2, 58, 15);    // neon-lit left edges
    r(lx + wobble + 16, 58, 2, 30, 8); r(lx + 16, 88, 2, 58, 8);
    r(lx + wobble - 1, 58, 1, 30, 0); r(lx + wobble + 18, 58, 1, 30, 0);
    r(lx - 1, 88, 1, 58, 0); r(lx + 18, 88, 1, 58, 0);
    r(lx + 4, 134, 10, 12, 8);                              // inverted nozzle at the base
    r(lx + 2, 144, 14, 2, 8); r(lx + 3, 133, 12, 1, 0);
    r(lx + 2, 146, 14, 2, 0);                               // base shadow
  };
  leg(168, 0); leg(262, -2);                                // right leg leans. of course it does.

  // ---------- 10. ARCH BEAM — half a rocket, horizontal (168,50,112,16) ----------
  r(168, 50, 112, 16, 8);
  r(168, 50, 112, 2, 7);                                    // top curve highlight
  r(168, 49, 112, 1, 0); r(168, 66, 112, 1, 0);
  r(167, 49, 1, 18, 0); r(280, 49, 1, 18, 0);
  for (let x = 188; x < 280; x += 20) r(x, 51, 1, 14, 14);  // glowing weld seams
  // the welded-on microwave (it still works)
  r(282, 44, 14, 10, 7); r(282, 44, 14, 1, 0); r(282, 53, 14, 1, 0);
  r(284, 46, 7, 6, 0); if (frame % 30 < 15) r(292, 47, 2, 2, 10);

  // ---------- 11. NEON SIGN on the beam (190,54,68,10) — flickers like a stock in freefall ----------
  r(189, 53, 70, 12, 8);
  const neon = frame % 47 > 44 ? 0 : (frame % 14 < 9 ? 12 : 4); // occasional short-circuit
  r(191, 55, 64, 8, neon);
  if (neon === 12) { r(193, 56, 60, 1, 15); }               // hot tube core when bright
  r(196, 58, 10, 2, 0); r(210, 58, 14, 2, 0); r(228, 58, 8, 2, 0); r(240, 58, 12, 2, 0); // letter bars
  if (neon === 12) { r(191, 66, 64, 2, 4); r(205, 68, 36, 1, 4); } // red glow bleeding under the sign

  // ---------- 12. WELDING SPARKS falling from the beam ----------
  const sy = 66 + ((frame * 3) % 60);
  if (sy <= 126) {
    r(215 + (frame % 5) - 2, sy, 2, 2, 14);
    r(212 + (frame % 3), sy + 6, 1, 2, 14);
    r(218 - (frame % 3), sy + 11, 1, 1, 12);
  }
  if (frame % 8 < 3) { r(214, 64, 4, 2, 15); r(213, 66, 6, 1, 14); } // weld point flash

  // ---------- 13. MARS DIRT FLOOR (0,146,320,54) ----------
  r(0, 146, 320, 54, 4);
  r(0, 146, 320, 2, 8);                                     // dark seam at the fence line
  r(0, 148, 320, 4, 8);                                     // far dirt strip, cooler
  for (let x = 2; x < 320; x += 8) r(x, 149, 3, 1, 4);      // broken so it reads as ground
  r(0, 172, 320, 1, 6); r(0, 186, 320, 1, 6);               // faint perspective ruts
  for (let y = 150; y < 200; y += 3)                        // brown dust dither, offset rows
    for (let x = ((y / 3) % 3) * 2; x < 320; x += 6) r(x, y, 2, 1, 6);
  // rover tracks heading through the gate (someone drove in once) — dashed, converging away
  for (let y = 152; y < 200; y += 7) {
    const sp = (y - 152) / 6;                               // tracks splay apart as they near us
    r(197 - sp, y, 3, 4, 8); r(207 + sp, y, 3, 4, 8);
    r(198 - sp, y + 1, 1, 2, 0); r(208 + sp, y + 1, 1, 2, 0);
  }
  // scattered rocks
  const rock = (x, y) => { r(x, y, 10, 5, 8); r(x + 1, y - 1, 6, 1, 8); r(x + 1, y, 4, 1, 7); r(x - 1, y + 4, 13, 2, 0); };
  rock(28, 160); rock(148, 176); rock(250, 168); rock(96, 190);
  // buried satellite dish (70,168,18,8) — the previous "real Mars soon"
  r(70, 168, 18, 8, 7); r(70, 168, 18, 2, 15); r(69, 167, 20, 1, 0);
  r(74, 164, 3, 5, 8); r(68, 175, 22, 2, 0);
  r(0, 198, 320, 2, 6);                                     // nearest dirt band, warm

  // ---------- 14. GATE OPENING between the legs (x 186..262) — junkyard beyond ----------
  r(186, 92, 76, 54, 4);                                    // mars murk seen through the arch
  r(186, 92, 76, 3, 8);                                     // far haze line
  r(196, 100, 14, 8, 8); r(232, 96, 18, 12, 8);             // junk silhouettes beyond
  r(214, 104, 10, 5, 0); r(236, 98, 4, 4, 0);
  r(224, 92, 3, 16, 7);                                     // a crane mast, far off

  // ---------- 15. RUSTY — roast-bot, 1.5 tons of ego (204,98,28,48) ----------
  r(202, 144, 32, 4, 0);                                    // ground shadow
  r(204, 140, 28, 6, 0);                                    // tank treads
  r(206, 141, 2, 2, 8); r(212, 141, 2, 2, 8); r(218, 141, 2, 2, 8); r(224, 141, 2, 2, 8); r(228, 141, 2, 2, 8);
  r(204, 116, 28, 24, 6);                                   // square body
  r(203, 115, 30, 1, 0); r(203, 115, 1, 26, 0); r(232, 115, 1, 26, 0);
  r(206, 118, 5, 4, 4); r(222, 126, 6, 5, 4); r(212, 133, 4, 3, 4); // rust blooms
  r(204, 116, 28, 1, 12);                                   // neon rim light on shoulders
  r(208, 122, 8, 6, 15); r(209, 124, 6, 1, 8); r(209, 126, 4, 1, 8); // employee-of-the-month sticker
  // arms: one on hip, one pointing at YOU
  r(198, 120, 6, 3, 8); r(196, 123, 4, 8, 8); r(196, 130, 5, 4, 7);
  r(232, 122, 10, 3, 8); r(241, 121, 4, 4, 7);              // the accusing finger
  // head 18x14
  r(208, 100, 18, 14, 8);
  r(207, 99, 20, 1, 0); r(207, 99, 1, 16, 0); r(226, 99, 1, 16, 0); r(208, 114, 18, 2, 0); // neck shadow
  r(208, 100, 18, 1, 7);
  r(211, 103, 3, 3, 15);                                    // good eye
  r(219, 103, 3, 3, 8); r(220, 104, 1, 1, 0);               // the burnt one
  // mouth-screen (211,108,12,6) — flickers while it talks trash
  r(210, 107, 14, 8, 0);
  if (frame % 6 < 3) { r(211, 108, 12, 6, 12); r(212, 110, 3, 2, 15); r(217, 109, 4, 2, 15); }
  else { r(211, 108, 12, 6, 4); r(213, 110, 8, 1, 12); }
  // bent antenna: up from (226,94), snaps right at 90
  r(226, 90, 1, 9, 7); r(227, 88, 4, 1, 7); r(230, 87, 2, 2, 12);

  // ---------- 16. RED SMOKE FLARE (36,128,8,16) + 70% of the atmosphere ----------
  r(34, 142, 12, 3, 0);                                     // shadow
  r(36, 128, 8, 16, 12); r(35, 127, 10, 1, 0); r(35, 127, 1, 17, 0); r(44, 127, 1, 17, 0);
  r(37, 129, 2, 14, 15);                                    // hot cylinder edge
  const sw = frame % 20 < 10 ? 1 : -1;                      // smoke sway
  const wobs = [0, 1, 2, 2, 1, 0, -1, -2, -2, -1];          // lazy S-curve drift
  for (let i = 0; i < 10; i++) {                            // broken puffs, NOT a pillar
    const py = 120 - i * 5 - (frame % 5);                   // puffs actually rise
    if (py < 66) continue;
    const wob = wobs[(i + ((frame / 5) | 0)) % 10] * sw;
    const pw = 2 + ((i / 3) | 0);                           // widens as it climbs
    r(38 + wob - ((pw / 2) | 0), py, pw, 2, i % 2 ? 4 : 12);
    if (i % 3 === 1) r(40 + wob, py - 2, 1, 1, 12);         // stray wisp
  }
  r(38, 124, 3, 4, 12); r(39, 125, 1, 2, 4);                // smoke rooted to the nozzle
  r(37 + sw, 122, 2, 2, 15);                                // white-hot only right at the nozzle
  r(33, 60, 12, 6, 4); r(36 + sw, 61, 6, 3, 12);            // smoke head flattening under the dome
  r(42 - sw, 57, 7, 4, 4); r(28, 62, 6, 3, 4);

  // ---------- 17. WELCOME SIGN (118,116,34,24) — broken corner shown proudly ----------
  r(132, 140, 4, 10, 8); r(132, 140, 1, 10, 0); r(135, 140, 1, 10, 0); // pole
  r(130, 148, 8, 3, 0);                                     // pole shadow
  r(118, 116, 34, 24, 7);
  r(117, 115, 36, 1, 0); r(117, 115, 1, 26, 0); r(152, 115, 1, 26, 0); r(117, 140, 36, 1, 0);
  r(120, 118, 30, 2, 12);                                   // warning header stripe
  r(120, 123, 28, 2, 0); r(120, 128, 24, 2, 0); r(120, 133, 29, 2, 0); // bureaucratic text bars
  r(146, 116, 6, 7, 4); r(145, 122, 7, 1, 0); r(145, 116, 1, 7, 0);    // bitten corner ("battle damage")

  // ---------- 18. LOOSE JUNK so the yard reads as a yard ----------
  r(160, 152, 12, 5, 8); r(159, 156, 14, 2, 0); r(162, 150, 4, 2, 7);  // dead thruster
  r(288, 152, 16, 4, 7); r(288, 151, 16, 1, 15); r(287, 155, 18, 2, 0); // dropped panel
  r(292, 148, 3, 4, 4);                                     // rusty bolt on top
}
