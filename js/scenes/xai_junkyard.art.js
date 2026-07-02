// xai_junkyard.art.js — מגרש הגרוטאות. מאדים מדומה, שקיעה תמידית. Faction: xai.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- 1. MARS SKY — horizontal dithered bands, eternal sunset ----------
  r(0, 0, 320, 28, 4);                                    // deep red top
  r(0, 28, 320, 24, 4);                                   // base for dither band
  for (let y = 28; y < 52; y += 2)                        // P4/P6 checkerboard dither
    for (let x = ((y >> 1) & 1) * 2; x < 320; x += 4) r(x, y, 2, 2, 6);
  r(0, 52, 320, 22, 6);                                   // brown mid band
  for (let y = 74; y < 86; y += 2)                        // P6/P12 checkerboard dither
    for (let x = ((y >> 1) & 1) * 2; x < 320; x += 4) r(x, y, 2, 2, 12);
  r(0, 86, 320, 6, 12);                                   // light-red glow line at horizon

  // far martian plain (y92-145) — imported dirt, the distant part
  r(0, 92, 320, 53, 6);
  for (let y = 96; y < 145; y += 4)                       // darkening dither toward floor line
    for (let x = (y % 8); x < 320; x += (y < 118 ? 14 : 8)) r(x, y, 2, 2, 4);
  // distant junk silhouettes on the horizon
  r(6, 94, 18, 6, 8); r(12, 91, 8, 4, 8); r(96, 95, 24, 5, 8); r(104, 92, 10, 4, 8);
  r(160, 94, 14, 5, 8); r(300, 94, 16, 6, 8);
  r(90, 116, 30, 8, 8); r(98, 112, 12, 5, 8);             // mid-distance heap left of sign
  r(90, 116, 30, 1, 0); r(98, 112, 12, 1, 0);
  r(88, 124, 34, 2, 0);                                   // contact shadow — it sits, not floats

  // ---------- 2. FAKE DOME — faint dashed symmetric arc + duct-tape patch ----------
  const arc = [[124, 196, 4], [88, 124, 7], [196, 232, 7], [56, 88, 11], [232, 264, 11],
               [30, 56, 16], [264, 290, 16], [10, 30, 22], [290, 310, 22]];
  for (const [x0, x1, ay] of arc)
    for (let x = x0; x < x1; x += 8) r(x, ay, 4, 1, 11);  // dashed, see-through
  r(250, 12, 12, 4, 7); r(250, 12, 12, 1, 8);             // the patch. glue. budget.

  // ---------- 3. DISTANT SCRAP MOUND + RISING SMOKE (animated) ----------
  r(244, 78, 34, 14, 8); r(250, 74, 20, 6, 8); r(256, 71, 8, 4, 8);
  r(248, 80, 4, 3, 0); r(262, 76, 5, 2, 0);               // dark junk lumps
  for (let i = 0; i < 4; i++) {                           // smoke puffs drifting up
    const t = (frame * 2 + i * 16) % 60;
    const py = 78 - t;
    if (py > 24) r(255 + (((i + (frame >> 3)) % 3) - 1) * 3, py, 4, 6, 0);
  }

  // ---------- 4. RUSTY CRANE (right, behind everything) ----------
  r(286, 38, 8, 107, 14);                                 // mast (goes down to ground line)
  r(286, 38, 1, 107, 0); r(293, 38, 1, 107, 0);           // mast outline
  r(288, 58, 4, 5, 6); r(287, 92, 5, 4, 6); r(289, 118, 4, 6, 6); // rust stains
  r(222, 44, 72, 6, 14);                                  // horizontal arm
  r(222, 44, 72, 1, 0); r(222, 49, 72, 1, 0); r(222, 44, 1, 6, 0);
  for (let x = 228; x < 286; x += 12) r(x, 46, 2, 2, 0);  // truss holes
  r(238, 46, 6, 3, 6); r(266, 45, 5, 3, 6);               // rust on arm
  r(232, 50, 1, 46, 0);                                   // cable, 1px, three years
  r(230, 96, 5, 4, 8);                                    // the hook
  r(226, 100, 14, 12, 7);                                 // half a rocket engine, waiting
  r(226, 100, 14, 1, 0); r(226, 111, 14, 1, 0); r(226, 100, 1, 12, 0); r(239, 100, 1, 12, 0);
  r(229, 104, 8, 2, 8); r(231, 108, 4, 2, 0);             // engine detail

  // ---------- 7. SIGN: "DAYS WITHOUT EXPLOSION: 0" ----------
  r(136, 78, 4, 18, 8); r(200, 78, 4, 18, 8);             // legs down to y96
  r(128, 40, 84, 38, 0);                                  // black board
  r(128, 40, 84, 2, 14); r(128, 76, 84, 2, 14);           // yellow frame
  r(128, 40, 2, 38, 14); r(210, 40, 2, 38, 14);
  for (let i = 0; i < 8; i++) r(134 + i * 9, 46, 6, 6, 15);   // "text" row 1
  for (let i = 0; i < 6; i++) r(134 + i * 9, 56, 6, 6, 15);   // "text" row 2
  const dig = frame % 12 < 6 ? 12 : 4;                    // the digit. it stopped believing.
  r(192, 56, 10, 14, dig); r(195, 59, 4, 8, 0);           // hollow zero
  r(146, 77, 24, 8, 15); r(148, 79, 20, 4, 0); r(151, 80, 4, 2, 15); r(159, 80, 4, 2, 15); // note taped to board edge

  // ---------- 5. ROCKET 1 — nose-planted skeleton (DEATH lives here) ----------
  // splayed fins up top — legs of a cockroach that gave up
  r(27, 22, 5, 6, 8); r(30, 27, 5, 6, 8); r(33, 32, 5, 6, 8); r(36, 36, 5, 6, 8);   // left fin
  r(70, 22, 5, 6, 8); r(67, 27, 5, 6, 8); r(64, 32, 5, 6, 8); r(61, 36, 5, 6, 8);   // right fin
  r(48, 24, 6, 16, 8);                                                              // middle fin, straight up
  r(27, 22, 5, 1, 0); r(27, 22, 1, 6, 0); r(74, 22, 1, 6, 0); r(70, 22, 5, 1, 0);
  r(48, 24, 6, 1, 0); r(48, 24, 1, 16, 0); r(53, 24, 1, 16, 0);
  // leaning stepped body — wide broken tail up, narrow buried nose down
  r(36, 40, 30, 20, 7);
  r(38, 60, 27, 20, 7);
  r(41, 80, 23, 20, 7);
  r(44, 100, 19, 20, 7);
  r(45, 120, 16, 25, 7);
  // sunset catch-light on the left rail, fading as it goes down
  r(37, 41, 2, 18, 15); r(39, 61, 2, 18, 15); r(42, 81, 2, 18, 11);
  // ribs P8 across the hull
  r(38, 46, 26, 2, 8); r(40, 62, 23, 2, 8); r(43, 78, 19, 2, 8);
  r(45, 92, 17, 2, 8); r(46, 106, 15, 2, 8);
  // torn skeleton holes — sky shows through the carcass
  r(44, 50, 15, 7, 6); r(43, 49, 17, 1, 0); r(43, 57, 17, 1, 0); r(43, 50, 1, 7, 0);
  r(50, 70, 12, 7, 6); r(49, 69, 14, 1, 0); r(49, 77, 14, 1, 0); r(49, 70, 1, 7, 0);
  r(46, 94, 9, 6, 6); r(45, 93, 11, 1, 0); r(45, 100, 11, 1, 0);
  // rust streaks
  r(55, 64, 6, 4, 6); r(48, 110, 5, 4, 6); r(58, 84, 4, 4, 6);
  // outlines follow the lean
  r(36, 40, 30, 1, 0); r(36, 40, 1, 20, 0); r(65, 40, 1, 20, 0);
  r(38, 60, 1, 20, 0); r(64, 60, 1, 20, 0); r(36, 59, 3, 1, 0);
  r(41, 80, 1, 20, 0); r(63, 80, 1, 20, 0); r(38, 79, 4, 1, 0);
  r(44, 100, 1, 20, 0); r(62, 100, 1, 20, 0); r(41, 99, 4, 1, 0);
  r(45, 120, 1, 25, 0); r(60, 120, 1, 25, 0); r(61, 119, 2, 1, 0);
  // the black opening at the base — the invitation
  r(46, 118, 13, 26, 0);
  if (frame % 30 < 8) r(48, 138, 9, 2, 4);                // residual ignition, flickering awake. hint.
  // warning sign on a post beside the hatch
  r(64, 130, 1, 15, 8);
  r(61, 124, 8, 7, 15); r(62, 125, 6, 5, 4); r(63, 126, 4, 3, 15);

  // ---------- 6. ROCKET 2 — lying down since 2026, in front of sign legs ----------
  r(130, 100, 84, 32, 8);                                 // main tube
  for (let x = 142; x < 214; x += 16) r(x, 100, 3, 32, 7);// hull rings
  r(130, 102, 84, 2, 7);                                  // top sheen
  // crushed nose (left) — stepped shrinking plates
  r(122, 104, 8, 24, 7); r(118, 108, 4, 16, 7);
  r(122, 104, 8, 1, 0); r(118, 108, 4, 1, 0); r(118, 108, 1, 16, 0); r(118, 123, 4, 1, 0); r(122, 127, 8, 1, 0);
  // engine nozzle (right) — dark stepped bell
  r(214, 102, 6, 28, 0); r(220, 106, 6, 20, 0);
  r(221, 110, 4, 12, 8);                                  // inner rim catch-light
  // outline + contact shadow so eighty tons actually touch the ground
  r(130, 99, 84, 1, 0); r(130, 131, 84, 1, 0); r(214, 101, 6, 1, 0); r(214, 130, 6, 1, 0);
  r(120, 128, 104, 4, 8); r(126, 132, 94, 3, 8);
  // graffiti meme blocks — "ממ", the most accurate monument on earth
  r(150, 108, 10, 8, 12); r(152, 110, 3, 6, 8); r(157, 110, 3, 4, 8);
  r(164, 108, 10, 8, 12); r(166, 110, 3, 6, 8); r(171, 110, 3, 4, 8);
  r(178, 110, 12, 4, 12); r(181, 111, 2, 2, 8);

  // ---------- 12. MARTIAN GROUND (imported dirt, full arnona) ----------
  r(0, 145, 320, 55, 4);
  r(0, 145, 320, 3, 8);                                   // horizon-floor line
  for (let y = 152; y < 200; y += 4) {                    // P6 dither, denser near viewer
    const step = y < 168 ? 12 : y < 184 ? 8 : 6;
    for (let x = (y % 8); x < 320; x += step) r(x, y, 2, 2, 6);
  }
  r(0, 166, 130, 1, 8); r(180, 178, 140, 1, 8); r(40, 190, 120, 1, 8); // cracks
  r(70, 158, 4, 3, 6); r(178, 160, 5, 3, 6); r(250, 168, 4, 3, 6);
  r(24, 184, 5, 3, 6); r(140, 186, 4, 3, 6); r(296, 186, 5, 3, 6);    // scattered rocks
  // raised dirt around the buried nose
  r(34, 140, 36, 7, 6); r(30, 143, 46, 4, 6); r(34, 140, 36, 1, 8);
  // drag trail from the pit toward the tire
  r(122, 168, 60, 3, 6); r(180, 164, 50, 3, 6); r(228, 160, 38, 3, 6);

  // ---------- 9. ROVER IN THE PIT (still transmitting. nobody listens.) ----------
  r(88, 150, 34, 24, 6);                                  // the pit
  r(90, 152, 30, 20, 0);                                  // pit shadow depth
  r(88, 150, 34, 1, 8); r(88, 173, 34, 1, 8);             // pit rim
  r(96, 156, 16, 8, 7);                                   // rover body
  r(96, 156, 16, 1, 15); r(96, 163, 16, 1, 8);            // top light / belly shade
  r(97, 158, 4, 3, 9); r(103, 158, 4, 3, 9);              // sensor windows
  r(96, 163, 3, 3, 0); r(102, 163, 3, 3, 0); r(109, 163, 3, 3, 0); // sunken wheels
  r(104, 146, 1, 10, 8);                                  // antenna
  if (frame % 40 < 4) r(103, 144, 3, 3, 12);              // sad LED. every four seconds.

  // ---------- 8. GIANT TIRE (survived three explosions and one funding round) ----------
  r(266, 150, 44, 4, 8);                                  // ground shadow
  r(276, 108, 26, 4, 0); r(270, 112, 38, 6, 0);           // rounded black ring, stacked
  r(264, 118, 48, 20, 0);
  r(270, 138, 38, 8, 0); r(276, 146, 26, 4, 0); r(282, 150, 14, 2, 0);
  // tread notches only along the outer rim (it's a tire, not a cage)
  for (let x = 278; x < 302; x += 6) { r(x, 108, 2, 4, 8); r(x, 148, 2, 4, 8); }
  r(268, 114, 2, 4, 8); r(272, 110, 2, 4, 8); r(306, 110, 2, 4, 8); r(310, 116, 2, 4, 8);
  r(264, 124, 3, 8, 8); r(309, 124, 3, 8, 8);
  r(272, 112, 8, 3, 8); r(270, 116, 4, 6, 8);             // sunset crescent highlight, upper-left
  r(278, 118, 22, 24, 8);                                 // gray sidewall ring around the hub
  r(282, 122, 14, 16, 6);                                 // the hole — dirt shows through
  r(283, 122, 12, 2, 0); r(282, 122, 2, 16, 0);           // hole inner shadow
  r(287, 128, 5, 3, 4);                                   // warm dirt seen through, small

  // ---------- 11. SCRAP PILES — three billion dollars, stacked like after a holiday ----------
  // left pile (x0-40, y140-178)
  r(0, 148, 40, 30, 8);
  r(2, 142, 22, 10, 7); r(24, 146, 14, 8, 6); r(6, 158, 18, 10, 7);
  r(28, 160, 10, 12, 6); r(0, 168, 14, 10, 7);
  r(2, 142, 22, 1, 0); r(24, 146, 14, 1, 0); r(6, 158, 18, 1, 0); r(0, 168, 14, 1, 0);
  r(8, 148, 12, 12, 14); r(8, 148, 12, 2, 15); r(8, 159, 12, 1, 0); r(8, 148, 1, 12, 0); r(19, 148, 1, 12, 0); // yellow drum
  r(10, 152, 8, 2, 6);                                    // rust stripe on drum
  r(30, 150, 2, 8, 8); r(34, 148, 2, 10, 8);              // engine ribs poking out
  r(0, 176, 44, 3, 8);                                    // pile ground shadow
  // right pile (x196-248, y150-186)
  r(196, 156, 52, 28, 8);
  r(198, 152, 20, 12, 7); r(222, 150, 18, 10, 6); r(238, 158, 10, 16, 7);
  r(198, 152, 20, 1, 0); r(222, 150, 18, 1, 0); r(238, 158, 10, 1, 0);
  r(204, 156, 16, 22, 4);                                 // crushed red barrel
  r(204, 156, 16, 1, 0); r(204, 177, 16, 1, 0); r(204, 156, 1, 22, 0); r(219, 156, 1, 22, 0);
  r(206, 160, 3, 3, 0); r(212, 160, 3, 3, 0); r(209, 163, 3, 3, 0);   // "X" on barrel
  r(206, 166, 3, 3, 0); r(212, 166, 3, 3, 0);
  r(204, 170, 16, 2, 8);                                  // crush dent
  r(228, 162, 2, 14, 8); r(232, 160, 2, 16, 8); r(236, 164, 2, 12, 8); // engine ribs
  r(224, 174, 18, 8, 7); r(224, 174, 18, 1, 0);           // flat panel at base
  r(196, 184, 54, 3, 8);                                  // pile ground shadow

  // ---------- 10. THE HANDLE — the only clean thing for a kilometer ----------
  r(148, 173, 12, 2, 8);                                  // its little shadow
  r(150, 166, 8, 4, 15);                                  // brushed chrome
  r(150, 170, 8, 2, 7);                                   // lower stripe
  r(150, 166, 8, 1, 11);                                  // ice glint on top
  const spots = [[147, 163], [160, 165], [146, 173], [159, 172]];
  const s = spots[Math.floor((frame % 20) / 5)];
  r(s[0], s[1], 1, 1, 15);                                // diamond-in-a-dumpster sparkle

  // ---------- foreground depth — dark rim at the very bottom edge ----------
  for (let x = 0; x < 320; x += 4) { r(x, 196, 2, 2, 8); r(x + 2, 198, 2, 2, 8); }
  r(58, 193, 10, 5, 6); r(58, 193, 10, 1, 8); r(60, 195, 6, 3, 0);   // near rock, cracked
  r(238, 194, 8, 4, 6); r(238, 194, 8, 1, 8);                        // near rock
}
