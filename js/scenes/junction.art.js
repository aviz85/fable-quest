// junction.art.js — צומת המפורז. Four empires, one cracked plaza, zero queues. Faction: hub.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- 1. SUNSET SKY (0,0,320,55) — P5/P12 dither, P14 band ----------
  r(0, 0, 320, 14, 5);                                    // deep magenta top
  for (let y = 14; y < 34; y += 2) {                      // P5/P12 checker dither
    const o = (y / 2) % 2 ? 2 : 0;
    r(0, y, 320, 2, 5);
    for (let x = o; x < 320; x += 4) r(x, y, 2, 2, 12);
  }
  r(0, 34, 320, 6, 12);
  for (let y = 40; y < 46; y += 2) {                      // P12/P14 checker dither
    const o = (y / 2) % 2 ? 2 : 0;
    r(0, y, 320, 2, 12);
    for (let x = o; x < 320; x += 4) r(x, y, 2, 2, 14);
  }
  r(0, 46, 320, 9, 14);                                   // yellow horizon band y45-55
  // low sun sinking behind the skyline (light source: top)
  r(240, 36, 22, 12, 14); r(244, 33, 14, 18, 14);
  r(247, 38, 8, 8, 15);                                   // hot core

  // ---------- 2. DISTANT SKYLINE (0,40,320,25) — P8 towers, lit windows ----------
  r(0, 52, 320, 13, 8);                                   // skyline base band
  r(6, 42, 14, 23, 8); r(28, 47, 10, 18, 8); r(52, 40, 12, 25, 8);
  r(96, 45, 12, 20, 8); r(112, 41, 8, 24, 8);
  r(204, 44, 10, 21, 8); r(226, 40, 14, 25, 8); r(272, 46, 12, 19, 8);
  r(294, 41, 10, 24, 8); r(160, 43, 8, 22, 8);
  // a few lit windows
  r(9, 46, 2, 2, 14); r(55, 44, 2, 2, 14); r(114, 45, 2, 2, 14);
  r(229, 44, 2, 2, 14); r(296, 46, 2, 2, 14); r(162, 47, 2, 2, 14);
  // haze strip where towers meet plaza
  r(0, 63, 320, 2, 7);

  // ---------- 2b. DISTANT PLAZA GROUND (y65..143) — dusk gray, lightening closer ----------
  r(0, 65, 320, 33, 8);                                   // far ground, dark
  for (let y = 98, o = 0; y < 106; y += 2, o = 1 - o) {   // slim P8→P7 dither seam
    r(0, y, 320, 2, 8);
    for (let x = o * 2; x < 320; x += 4) r(x, y, 2, 2, 7);
  }
  r(0, 106, 320, 37, 7);                                  // near-far ground, calm
  r(0, 118, 320, 1, 8); r(0, 132, 320, 1, 8);             // faint recession joints
  // low perimeter wall far back + faint fence posts (DMZ vibes)
  r(0, 72, 320, 4, 7); r(0, 71, 320, 1, 15); r(0, 76, 320, 1, 0);
  for (let x = 8; x < 320; x += 24) r(x, 66, 2, 6, 8);
  // old ground stains / patchwork on the distant plaza
  r(40, 100, 22, 3, 7); r(230, 88, 18, 3, 7); r(150, 126, 26, 3, 8);
  r(96, 130, 14, 2, 8); r(210, 132, 20, 2, 8);
  // four faction flag poles along the far wall, flags long faded (nobody salutes)
  const flags = [[60, 3], [92, 15], [246, 4], [304, 14]];
  for (const [fx, fc] of flags) {
    r(fx, 78, 2, 26, 8); r(fx, 78, 1, 26, 0);
    r(fx + 2, 79, 8, 5, fc); r(fx + 2, 79, 8, 1, 0); r(fx + 2, 83, 8, 1, 0);
  }
  // a forgotten traffic cone and a crate — DMZ clutter
  r(272, 104, 8, 3, 12); r(274, 100, 4, 4, 12); r(271, 106, 10, 1, 0);
  r(108, 96, 12, 9, 6); r(108, 96, 12, 1, 0); r(108, 104, 12, 1, 0);
  r(108, 96, 1, 9, 0); r(119, 96, 1, 9, 0); r(110, 98, 8, 1, 8);

  // ---------- 3. ANTHROPIC GATE (up) — clay torii arch (125,55,70,88) ----------
  // top beam, curved-ish (stacked rects, wider at top)
  r(118, 53, 84, 5, 6); r(122, 58, 76, 4, 6); r(120, 55, 80, 12, 6);
  r(116, 51, 88, 3, 6);                                   // upswept beam cap
  r(116, 50, 88, 1, 0); r(116, 66, 88, 1, 0);             // beam outlines
  r(118, 52, 84, 2, 14);                                  // sunset catching the top edge
  // pillars
  r(125, 55, 14, 88, 6); r(181, 55, 14, 88, 6);
  r(125, 55, 2, 88, 14);                                  // lit left edges (sun above)
  r(181, 55, 2, 88, 14);
  r(137, 55, 2, 88, 8); r(193, 55, 2, 88, 8);             // shaded right edges
  r(124, 55, 1, 88, 0); r(139, 55, 1, 88, 0);             // outlines
  r(180, 55, 1, 88, 0); r(195, 55, 1, 88, 0);
  // clay wall panel between the pillars (the gate is a building, not a croquet hoop)
  r(139, 66, 42, 77, 6);
  for (let y = 70; y < 140; y += 10) r(140, y, 40, 1, 8); // adobe course lines
  // lintel over doorway
  r(139, 80, 42, 6, 6); r(139, 80, 42, 1, 0); r(139, 85, 42, 1, 0);
  r(141, 68, 38, 2, 14);                                  // sunlit wall top
  // carved Anthropic sigil above the door (cyan diamond-ish)
  r(157, 70, 6, 6, 3); r(159, 68, 2, 2, 3); r(159, 76, 2, 2, 3); r(159, 71, 2, 3, 11);
  // dark doorway opening — hero walks INTO it (145,85,30,58)
  r(145, 85, 30, 58, 8);
  r(145, 85, 30, 22, 0);                                  // deeper dark up top
  r(152, 107, 16, 36, 0);                                 // inner corridor gloom
  r(145, 85, 1, 58, 0); r(174, 85, 1, 58, 0);
  // warm floor glow spilling out of the monastery
  r(150, 138, 20, 5, 6);
  // cyan Constitution scroll banners (135,70,8,40 / 177,70,8,40)
  r(135, 70, 8, 40, 3); r(177, 70, 8, 40, 3);
  r(136, 72, 6, 2, 11); r(178, 72, 6, 2, 11);             // scroll top highlight
  r(136, 78, 6, 1, 11); r(136, 84, 6, 1, 11); r(136, 90, 6, 1, 11); r(136, 96, 6, 1, 11);
  r(178, 78, 6, 1, 11); r(178, 84, 6, 1, 11); r(178, 90, 6, 1, 11); r(178, 96, 6, 1, 11);
  r(135, 70, 1, 40, 0); r(142, 70, 1, 40, 0); r(135, 109, 8, 1, 0);
  r(177, 70, 1, 40, 0); r(184, 70, 1, 40, 0); r(177, 109, 8, 1, 0);
  // pillar bases
  r(122, 140, 20, 4, 8); r(178, 140, 20, 4, 8);
  r(122, 140, 20, 1, 0); r(178, 140, 20, 1, 0);

  // ---------- 4. OPENAI GATE (left) — sterile glass wall (0,50,46,95) ----------
  r(0, 50, 46, 95, 7);                                    // frame
  r(0, 50, 46, 2, 0); r(44, 50, 2, 95, 0);                // outline
  r(2, 54, 42, 80, 11);                                   // glass
  r(14, 54, 3, 80, 7); r(28, 54, 3, 80, 7);               // mullions
  r(2, 76, 42, 2, 7); r(2, 104, 42, 2, 7);                // horizontal mullions
  r(4, 56, 4, 76, 15); r(20, 58, 2, 74, 15);              // glass shine strips
  r(34, 60, 3, 20, 15);
  // small black monolith (30,95,10,34) with ONE blinking eye
  r(30, 95, 10, 34, 0);
  r(30, 95, 1, 34, 8);                                    // faint edge so it reads on glass
  if (frame % 16 < 12) r(34, 102, 2, 2, 12);              // the eye. it judges.
  // "For Your Safety" barrier stubs (0,138,46,6)
  for (let x = 0; x < 46; x += 8) { r(x, 138, 4, 6, 14); r(x + 4, 138, 4, 6, 0); }
  r(0, 137, 46, 1, 0); r(0, 144, 46, 1, 0);

  // ---------- 5. GOOGLE SLIDE MOUTH (enter) — (210,60,54,83) ----------
  // colorful tube rings descending into the ground, narrowing slightly
  const ring = [1, 4, 14, 2, 1];
  for (let i = 0; i < 5; i++) {
    const rw = 54 - i * 2, rx = 210 + i;
    r(rx, 60 + i * 12, rw, 12, ring[i]);
    r(rx, 60 + i * 12, rw, 1, 0);                         // ring seam
    r(rx, 60 + i * 12, 1, 1, 0); r(rx + rw - 1, 71 + i * 12, 1, 1, 0); // corner nicks
  }
  // continuous cylinder shading so the tube reads round, not a bookshelf
  for (let i = 0; i < 5; i++) {
    const rx = 210 + i;
    r(rx + 5, 61 + i * 12, 2, 11, 15);                    // left sheen column
    r(rx + 54 - i * 2 - 6, 61 + i * 12, 3, 11, 8);        // right shade column
  }
  r(209, 59, 56, 1, 0); r(209, 59, 1, 62, 0); r(264, 59, 1, 62, 0);
  // tube bends: last ring meets ground
  r(216, 120, 44, 8, 2); r(216, 120, 44, 1, 0);
  // dark tube mouth at floor level (222,118,30,25)
  r(222, 118, 30, 25, 0);
  r(224, 120, 26, 4, 8);                                  // inner rim
  r(221, 117, 32, 1, 15); r(221, 117, 1, 26, 15);         // rim highlight
  // dusty BETA plaque (218,62,20,8) — Latin block letters, it's essential
  r(217, 61, 22, 10, 7); r(217, 61, 22, 1, 0); r(217, 70, 22, 1, 0);
  r(219, 63, 3, 6, 0); r(224, 63, 3, 6, 0); r(229, 63, 3, 6, 0); r(234, 63, 3, 6, 0);
  // two wilted balloons on strings
  const sag = frame % 20 < 10 ? 0 : 1;                    // one deflates 1px
  r(206, 66, 6, 6 - sag, 4); r(208, 72 - sag, 2, 6 + sag, 0);   // red, drooping left
  r(260, 74, 6, 6, 14); r(262, 80, 1, 8, 0);              // yellow, given up
  r(207, 67, 2, 2, 12); r(261, 75, 2, 2, 15);             // sad little highlights

  // ---------- 6. ROAD TO STREET (right) — (265,120,55,80) ----------
  r(265, 122, 55, 21, 8);                                 // asphalt above floor line
  r(272, 122, 48, 4, 8);                                  // narrowing to horizon-ish
  r(265, 121, 55, 1, 0);

  // ---------- 7. FLOOR / PLAZA (0,143,320,57) ----------
  for (let y = 143; y < 158; y += 2)                      // far strip P7/P8 dither
    for (let x = 0; x < 320; x += 4) { r(x, y, 2, 2, 8); r(x + 2, y, 2, 2, 7); }
  r(0, 158, 320, 42, 7);
  // perspective joint lines, spacing grows toward viewer
  r(0, 158, 320, 1, 8); r(0, 168, 320, 1, 8); r(0, 181, 320, 1, 8);
  // cracks (thin 2px rects, staggered)
  r(30, 162, 18, 1, 8); r(44, 163, 2, 6, 8); r(46, 168, 10, 1, 8);
  r(90, 176, 2, 10, 8); r(84, 184, 14, 1, 8);
  r(238, 158, 1, 8, 8); r(232, 165, 12, 1, 8);
  r(280, 186, 20, 1, 8); r(296, 178, 2, 9, 8);
  r(120, 152, 10, 1, 8); r(196, 148, 8, 1, 8);
  // asphalt road continues on the floor toward right edge (perspective wedge)
  r(268, 143, 52, 8, 8); r(262, 151, 58, 14, 8); r(256, 165, 64, 35, 8);
  r(258, 156, 8, 2, 14); r(272, 170, 10, 2, 14); r(288, 186, 12, 3, 14); // faded lane dashes
  r(256, 165, 1, 35, 0); r(262, 151, 1, 14, 0); r(268, 143, 1, 8, 0);   // road edge

  // grounding shadows under the structures (they live here, they don't hover)
  r(118, 143, 84, 3, 8);                                  // under Anthropic gate
  r(214, 143, 48, 3, 8);                                  // under the slide
  r(0, 145, 46, 2, 8);                                    // under OpenAI barrier

  // ---------- 8. FOUR BORDER LINES converging at THE POINT (160,172) ----------
  r(0, 169, 154, 1, 0); r(0, 173, 154, 1, 0);             // dark edging so paint pops
  r(166, 168, 98, 1, 0); r(166, 172, 98, 1, 0);
  r(157, 146, 1, 22, 0); r(161, 146, 1, 22, 0);
  r(157, 176, 1, 24, 0); r(161, 176, 1, 24, 0);
  r(158, 143, 3, 25, 3);                                  // cyan from Anthropic base, down
  r(0, 170, 154, 3, 15);                                  // white from left edge
  r(158, 176, 3, 24, 4);                                  // red from bottom edge, up
  r(166, 169, 98, 3, 14);                                 // yellow from the slide mouth, left
  // THE POINT — 4-color pinwheel (154,168,12,8), ominously clean
  r(153, 167, 14, 10, 0);                                 // outline pad
  r(154, 168, 6, 4, 3); r(160, 168, 6, 4, 15);
  r(154, 172, 6, 4, 4); r(160, 172, 6, 4, 14);

  // ---------- 9. GUARD POST (58,105,42,45) — abandoned booth ----------
  r(52, 150, 52, 4, 8);                                   // ground shadow
  r(58, 105, 42, 45, 8);                                  // walls
  r(54, 101, 50, 6, 7);                                   // roof
  r(54, 101, 50, 1, 15);                                  // roof sun-edge
  r(54, 101, 1, 6, 0); r(103, 101, 1, 6, 0); r(54, 106, 50, 1, 0);
  r(57, 105, 1, 45, 0); r(99, 105, 1, 45, 0); r(58, 149, 42, 1, 0);
  // cracked window (64,112,20,14)
  r(64, 112, 20, 14, 9);
  r(64, 112, 20, 1, 0); r(64, 125, 20, 1, 0); r(64, 112, 1, 14, 0); r(83, 112, 1, 14, 0);
  r(68, 114, 8, 1, 0); r(74, 115, 1, 6, 0); r(71, 120, 6, 1, 0);      // the crack
  r(66, 113, 2, 10, 15);                                  // glass shine
  // shut brown door
  r(86, 118, 11, 32, 6); r(86, 118, 11, 1, 0); r(86, 118, 1, 32, 0); r(96, 118, 1, 32, 0);
  r(88, 134, 2, 2, 14);                                   // knob
  // yellow "notices" taped on (3 small)
  r(60, 130, 6, 8, 14); r(68, 132, 6, 8, 14); r(76, 129, 6, 8, 14);
  r(61, 132, 4, 1, 0); r(61, 135, 4, 1, 0); r(69, 134, 4, 1, 0);
  r(77, 131, 4, 1, 0); r(77, 134, 4, 1, 0);

  // ---------- 10. SEARCHLIGHT (ANIMATION) — housing on roof (72,93,10,8) ----------
  const bx = ((frame * 3) % 280) + 20;                    // beam sweep target x
  // beam: slanted widening wedge from housing (77,101) down to floor at bx
  for (let i = 0; i < 12; i++) {
    const t = (i + 1) / 12;
    const cx = Math.round(77 + (bx - 77) * t);
    const w = 3 + Math.round(i * 1.6);
    r(Math.round(cx - w / 2), 101 + i * 4, w, 4, 14);
    if (i > 3) r(cx - 1, 101 + i * 4, 3, 4, 15);          // hot core
  }
  r(bx - 12, 149, 26, 3, 14);                             // pool on the floor
  r(bx - 5, 149, 12, 2, 15);
  // housing drawn after beam so it stays crisp
  r(72, 93, 10, 8, 7); r(72, 93, 10, 1, 15); r(72, 93, 1, 8, 0); r(81, 93, 1, 8, 0);
  r(75, 90, 4, 3, 8);                                     // pivot stub

  // ---------- 11. BROKEN BARRIER (100,132,52,5) ----------
  // attached half, raised at an angle (stacked rects)
  r(98, 130, 4, 14, 8);                                   // hinge post
  r(100, 128, 10, 4, 12); r(108, 130, 10, 4, 15); r(116, 132, 10, 4, 12);
  r(100, 127, 26, 1, 0); r(100, 136, 26, 1, 0);
  // snapped half lying on the floor
  r(150, 150, 9, 4, 12); r(159, 150, 9, 4, 15); r(168, 150, 8, 4, 12);
  r(150, 149, 26, 1, 0); r(150, 154, 26, 1, 0);
  r(148, 154, 30, 2, 8);                                  // its little shadow

  // ---------- 12. WELCOME SIGN (276,88,36,30 on pole 292,118,4,30) ----------
  r(292, 118, 4, 30, 8); r(292, 118, 1, 30, 0); r(295, 118, 1, 30, 0);
  r(276, 88, 36, 30, 7);
  r(275, 87, 38, 1, 0); r(275, 87, 1, 32, 0); r(312, 87, 1, 32, 0); r(275, 118, 38, 1, 0);
  r(278, 90, 32, 4, 12);                                  // warning stripe
  // rows of bureaucratic "text" bars, shrinking like fine print
  r(279, 97, 30, 2, 0); r(279, 101, 26, 2, 0); r(279, 105, 30, 1, 0);
  r(279, 108, 22, 1, 0); r(279, 111, 28, 1, 0); r(279, 114, 16, 1, 0);

  // ---------- 13. xAI FLOOR-GATE (down) — hazard ramp (118,182,84,18) ----------
  // painted flame tips licking up at y=178
  r(122, 178, 5, 4, 12); r(134, 176, 4, 6, 12); r(148, 178, 5, 4, 12);
  r(166, 176, 4, 6, 12); r(180, 178, 5, 4, 12); r(192, 177, 4, 5, 12);
  // ramp mouth: alternating red/black diagonal-ish stripes (4px bands, stepped)
  for (let i = 0; i < 21; i++) {
    const sx = 118 + i * 4;
    const c = i % 2 ? 0 : 4;
    r(sx, 182 + (i % 3), 4, 18, c);
  }
  r(118, 181, 84, 1, 0); r(117, 181, 1, 19, 0); r(202, 181, 1, 19, 0);
  r(120, 184, 80, 2, 8);                                  // inner lip shadow (sinking down)
  // meme sticker slapped on the edge (a cat, obviously)
  r(184, 188, 8, 6, 15);
  r(185, 189, 2, 2, 0); r(189, 189, 2, 2, 0); r(186, 192, 4, 1, 0);   // scribble face
  r(184, 187, 2, 1, 0); r(190, 187, 2, 1, 0);             // ears

  // ---------- 14. LOOSE FIBER CABLES (0,196,320,3 + knots) ----------
  r(0, 196, 320, 3, 0);
  r(0, 195, 320, 1, 8);                                   // top sheen
  r(40, 194, 8, 5, 0); r(140, 194, 10, 5, 0); r(250, 194, 8, 5, 0);   // knots
  r(60, 193, 14, 2, 8); r(210, 193, 12, 2, 8);            // stray strands
  if (frame % 10 < 5) r(144, 193, 3, 2, 2);               // blinking green LED
}
