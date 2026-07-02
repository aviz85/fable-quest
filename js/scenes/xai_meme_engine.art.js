// xai_meme_engine.art.js — אולם מנוע הממים. טורבינה שאוכלת אינטרנט. Faction: xai.
let engineOn = true;
export function setEngineOn(b) { engineOn = !!b; }

export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };
  const f = engineOn ? frame : 0; // frozen clock when the engine chokes

  // ---------- 3. BACK WALL first (goes behind everything) ----------
  r(0, 24, 320, 121, 8);
  for (let x = 0; x < 320; x += 48) r(x, 24, 1, 121, 0);        // panel seams
  r(0, 70, 320, 1, 0);                                          // horizontal seam
  // wall darkens toward the floor — hell-glow gradient (P0 dither)
  for (let y = 112; y < 140; y += 2)
    for (let x = (y % 4) * 2; x < 320; x += (y < 126 ? 16 : 8)) r(x, y, 2, 1, 0);
  r(0, 140, 320, 5, 7);                                         // baseboard
  r(0, 140, 320, 1, 0);
  // rust blobs near the floor — the dome sweats
  for (const [rx, ry] of [[70, 128], [76, 133], [222, 130], [98, 136], [258, 134], [16, 131]]) {
    r(rx, ry, 2, 2, 6); r(rx + 3, ry + 2, 2, 2, 6); r(rx + 1, ry + 4, 2, 2, 6);
  }
  // hellish red cast bleeding off the turbine onto the wall (xAI ambience)
  // tight dithered vertical bands hugging the turbine — dense near it, fading out
  for (let y = 46; y < 140; y += 2) {
    r(106, y, 2, 1, 4);                                          // inner band left
    if (y % 4 === 0) r(101, y, 2, 1, 4);                         // mid band (half density)
    if (y % 8 === 0) r(96, y + 1, 2, 1, 4);                      // outer band (sparse)
    r(216, y, 2, 1, 4);                                          // inner band right
    if (y % 4 === 2) r(221, y, 2, 1, 4);
    if (y % 8 === 4) r(226, y, 2, 1, 4);
  }

  // ---------- 1. CEILING + TRUSSES ----------
  r(0, 0, 320, 24, 8);
  r(0, 8, 320, 4, 0); r(0, 18, 320, 4, 0);                      // truss beams
  for (let x = 4; x < 320; x += 16) { r(x, 9, 1, 1, 7); r(x + 8, 19, 1, 1, 7); } // rivets
  r(0, 23, 320, 1, 0);                                          // ceiling/wall break

  // ---------- 2. NEON SIGN "MEME ENGINE v4.20" ----------
  r(94, 2, 132, 18, 0);                                         // board + margin
  r(94, 2, 132, 1, 8); r(94, 19, 132, 1, 8);                    // frame hint
  // block letters, 5px tall caps at y=6..11: MEME ENGINE (rect glyphs)
  const L = (x, seg, c) => { for (const [dx, dy, w, h] of seg) r(x + dx, 6 + dy, w, h, c); };
  const G = {
    M: [[0, 0, 1, 5], [4, 0, 1, 5], [1, 0, 1, 2], [3, 0, 1, 2], [2, 1, 1, 2]],
    E: [[0, 0, 1, 5], [1, 0, 3, 1], [1, 2, 2, 1], [1, 4, 3, 1]],
    N: [[0, 0, 1, 5], [4, 0, 1, 5], [1, 1, 1, 2], [2, 2, 1, 2], [3, 3, 1, 1]],
    G: [[0, 0, 1, 5], [1, 0, 3, 1], [1, 4, 3, 1], [4, 2, 1, 3], [3, 2, 2, 1]],
    I: [[1, 0, 1, 5], [0, 0, 3, 1], [0, 4, 3, 1]],
  };
  L(100, G.M, 12); L(106, G.E, 12); L(112, G.M, 12); L(118, G.E, 12);
  L(128, G.E, 12); L(134, G.N, 12); L(140, G.G, 12); L(146, G.I, 12); L(152, G.N, 12); L(158, G.E, 12);
  // "v4.20" — the right third; flickers into despair
  const vc = (f % 23 < 3) ? 4 : 12;
  r(172, 8, 1, 2, vc); r(173, 10, 1, 1, vc); r(174, 8, 1, 2, vc);          // v
  r(178, 6, 1, 3, vc); r(181, 6, 1, 5, vc); r(178, 8, 4, 1, vc);           // 4
  r(184, 10, 1, 1, vc);                                                     // .
  r(188, 6, 3, 1, vc); r(190, 6, 1, 3, vc); r(188, 8, 3, 1, vc); r(188, 8, 1, 3, vc); r(188, 10, 3, 1, vc); // 2
  r(194, 6, 3, 1, vc); r(194, 10, 3, 1, vc); r(194, 6, 1, 5, vc); r(196, 6, 1, 5, vc); // 0
  // neon glow underline
  r(98, 14, 66, 1, 4); r(170, 14, 30, 1, vc === 4 ? 8 : 4);

  // ---------- 9. WARNING BEACONS (before pipes so pipes overlap ok) ----------
  for (const bx of [84, 238]) {
    r(bx, 34, 10, 4, 8); r(bx, 37, 10, 1, 0);                    // housing
    const lit = f % 6 < 3;
    r(bx + 1, 30, 8, 4, 4); r(bx + 2, 29, 6, 1, 4);              // dome, rounded top
    if (engineOn) r(bx + (lit ? 1 : 5), 30, 4, 4, 12);           // rotating bright half
    // red light wedge cast on the wall below (contiguous stepped cone, sweeps with strobe)
    if (engineOn) {
      const dir = lit ? -1 : 1;
      r(bx + 4 + dir * 2, 38, 3, 2, 4);
      r(bx + 3 + dir * 5, 40, 5, 2, 4);
      r(bx + 2 + dir * 8, 42, 7, 2, 4);
    }
  }

  // ---------- 7. EXHAUST PIPES (rise from turbine top, elbow right) ----------
  r(118, 24, 10, 20, 7); r(118, 24, 10, 1, 0); r(118, 24, 1, 20, 0); r(127, 24, 1, 20, 0);
  r(196, 26, 10, 18, 7); r(196, 26, 1, 18, 0); r(205, 26, 1, 18, 0);
  r(196, 26, 24, 8, 7);                                          // elbow toward the gate
  r(196, 26, 24, 1, 0); r(196, 33, 24, 1, 0); r(219, 26, 1, 8, 0);
  r(120, 26, 6, 1, 15); r(198, 28, 20, 1, 15);                   // top sheen
  r(122, 32, 3, 2, 6); r(200, 38, 3, 2, 6);                      // pipe rust

  // ---------- 5. THE TURBINE (the monster) ----------
  // stepped casing silhouette — round-ish via steps
  r(122, 38, 80, 6, 8);
  r(114, 44, 96, 8, 8);
  r(110, 52, 104, 93, 8);
  // outline
  r(122, 38, 80, 1, 0); r(122, 38, 1, 6, 0); r(201, 38, 1, 6, 0);
  r(114, 44, 8, 1, 0); r(202, 44, 8, 1, 0); r(114, 44, 1, 8, 0); r(209, 44, 1, 8, 0);
  r(110, 52, 4, 1, 0); r(210, 52, 4, 1, 0);
  r(110, 52, 1, 93, 0); r(213, 52, 1, 93, 0);
  // top highlight band
  r(124, 40, 76, 2, 7); r(116, 46, 92, 2, 7);
  // curved shading: left rim lit (P7 dither), right rim dark (P0 dither)
  for (let y = 54; y < 143; y += 2) { r(112, y, 2, 1, 7); r(115, y + 1, 1, 1, 7); }
  for (let y = 54; y < 143; y += 2) { r(210, y, 2, 1, 0); r(207, y + 1, 1, 1, 0); }
  // rivet rows on casing sides
  for (let y = 58; y < 140; y += 12) { r(117, y, 2, 2, 7); r(204, y, 2, 2, 7); }
  // intake ring — stepped black mouth frame with rounded corners
  r(126, 52, 72, 4, 0);
  r(126, 52, 4, 60, 0); r(194, 52, 4, 60, 0);
  r(126, 108, 72, 4, 0);
  // big corner steps — 3 shrinking steps per corner so the mouth reads round
  r(130, 56, 12, 3, 0); r(130, 59, 6, 3, 0); r(130, 62, 3, 3, 0);
  r(182, 56, 12, 3, 0); r(188, 59, 6, 3, 0); r(191, 62, 3, 3, 0);
  r(130, 105, 12, 3, 0); r(130, 102, 6, 3, 0); r(130, 99, 3, 3, 0);
  r(182, 105, 12, 3, 0); r(188, 102, 6, 3, 0); r(191, 99, 3, 3, 0);
  r(124, 62, 2, 40, 7); r(198, 62, 1, 40, 7);                    // ring lip catch-light
  // the void — with a furnace-red inner rim so the mouth reads deep, not flat
  r(130, 56, 64, 52, 0);
  r(131, 57, 62, 1, 4); r(131, 106, 62, 1, 4);
  r(131, 57, 1, 50, 4); r(192, 57, 1, 50, 4);
  // rotating blades — 4 P4 bars cycling, angry
  const ph = Math.floor(f / 2) % 4;
  const cx = 162, cy = 82;
  if (ph === 0) { r(cx - 3, 58, 6, 48, 4); r(132, cy - 3, 60, 6, 4); }              // + shape
  else if (ph === 1) { for (let i = 0; i < 8; i++) { r(cx - 24 + i * 6, cy - 24 + i * 6, 6, 6, 4); r(cx + 18 - i * 6, cy - 24 + i * 6, 6, 6, 4); } } // X shape
  else if (ph === 2) { r(cx - 3, 58, 6, 48, 4); r(132, cy - 3, 60, 6, 4); }
  else { for (let i = 0; i < 8; i++) { r(cx - 24 + i * 6, cy - 24 + i * 6, 6, 6, 4); r(cx + 18 - i * 6, cy - 24 + i * 6, 6, 6, 4); } }
  // blur hint on moving blades
  if (engineOn) { r(134, 60, 4, 2, 12); r(186, 102, 4, 2, 12); }
  // center hub
  r(156, 76, 12, 12, 6); r(156, 76, 12, 1, 0); r(156, 87, 12, 1, 0); r(156, 76, 1, 12, 0); r(167, 76, 1, 12, 0);
  r(161, 81, 2, 2, 14);                                          // the one honest bolt
  // casing lower panel seams
  r(116, 118, 94, 1, 0); r(116, 132, 94, 1, 0);
  r(118, 122, 8, 6, 6); r(196, 124, 6, 6, 6);                    // rust patches

  // ---------- 6. FEED PORT ("הפה") ----------
  r(150, 104, 24, 6, 15);                                        // label plate
  r(150, 104, 24, 1, 0); r(150, 109, 24, 1, 0); r(150, 104, 1, 6, 0); r(173, 104, 1, 6, 0);
  r(152, 106, 8, 1, 0); r(162, 106, 9, 1, 0); r(152, 108, 14, 1, 0); // "אל תכניס איברים. שוב."
  // hazard-striped lip
  for (let x = 144; x < 180; x += 4) { r(x, 112, 2, 3, 14); r(x + 2, 112, 2, 3, 0); }
  r(146, 115, 32, 23, 0);                                        // the slot — the mouth
  r(148, 117, 28, 2, 8);                                         // inner throat hint
  for (let x = 144; x < 180; x += 4) { r(x, 136, 2, 3, 14); r(x + 2, 136, 2, 3, 0); }
  // funnel tray sticking out
  r(150, 139, 24, 3, 7); r(154, 142, 16, 2, 7);
  r(150, 139, 24, 1, 15); r(150, 141, 24, 1, 0); r(154, 143, 16, 1, 0);

  // ---------- 8. HERMETIC GATE (right → hangar) ----------
  r(272, 58, 46, 87, 7);                                         // slab
  r(272, 58, 46, 2, 0); r(272, 58, 2, 87, 0); r(316, 58, 2, 87, 0); r(272, 143, 46, 2, 0); // frame
  r(276, 62, 38, 1, 8); r(276, 138, 38, 1, 8);
  // X-brace — two stepped diagonals
  for (let i = 0; i < 9; i++) { r(276 + i * 4, 66 + i * 8, 5, 5, 8); r(308 - i * 4, 66 + i * 8, 5, 5, 8); }
  // central lock lamp
  r(291, 96, 8, 8, 0);
  r(292, 97, 6, 6, engineOn ? 4 : 10);
  if (engineOn && f % 16 < 8) r(293, 98, 2, 2, 12);              // angry glint
  if (!engineOn) r(293, 98, 2, 2, 15);                           // relieved glint
  // plate above the gate
  r(276, 48, 38, 8, 15);
  r(276, 48, 38, 1, 0); r(276, 55, 38, 1, 0); r(276, 48, 1, 8, 0); r(313, 48, 1, 8, 0);
  r(279, 50, 12, 1, 0); r(293, 50, 17, 1, 0); r(279, 53, 22, 1, 0); // "המעבר ייפתח כשהתוכן ייגמר"
  // meme splats stuck on the door — the spray's victims
  r(279, 72, 8, 6, 15); r(280, 73, 6, 1, 0); r(280, 75, 4, 1, 0); r(281, 77, 2, 1, 12);
  r(300, 88, 8, 6, 15); r(301, 89, 6, 1, 0); r(301, 91, 5, 1, 0); r(302, 92, 2, 1, 10);
  r(284, 118, 8, 6, 15); r(285, 119, 5, 1, 0); r(285, 121, 6, 1, 0); r(286, 122, 2, 1, 14);

  // ---------- 10. GAUGES + COMPRESSOR ----------
  r(228, 112, 38, 33, 7);                                        // compressor box
  r(228, 112, 38, 1, 0); r(228, 112, 1, 33, 0); r(265, 112, 1, 33, 0);
  r(230, 113, 34, 1, 15);                                        // top sheen
  for (let y = 118; y < 142; y += 4) r(232, y, 30, 1, 8);        // vent slats
  // two gauges above — round-ish faces
  for (const gx of [230, 250]) {
    r(gx + 3, 85, 6, 1, 0); r(gx + 1, 86, 10, 1, 0);             // rim top
    r(gx, 87, 12, 8, 0);                                         // rim body
    r(gx + 1, 95, 10, 1, 0); r(gx + 3, 96, 6, 1, 0);             // rim bottom
    r(gx + 2, 87, 8, 1, 15); r(gx + 1, 88, 10, 6, 15); r(gx + 2, 94, 8, 1, 15); // face
    r(gx + 3, 88, 1, 1, 8); r(gx + 5, 87, 2, 1, 8); r(gx + 8, 88, 1, 1, 8);     // tick marks
  }
  r(235, 91, 4, 1, 4); r(238, 89, 1, 2, 4);                      // left needle: pinned hard right
  const tw = (engineOn && f % 8 < 4) ? 1 : 0;                    // right needle twitches
  r(255, 91, 1, 3, 4); r(255 + tw, 89, 1, 2, 4);
  r(240, 100, 12, 6, 14);                                        // "MAX LOLZ" mini-plate
  r(240, 100, 12, 1, 0); r(240, 105, 12, 1, 0); r(240, 100, 1, 6, 0); r(251, 100, 1, 6, 0);
  r(242, 102, 8, 1, 0);                                          // plate text
  r(236, 108, 2, 4, 8); r(254, 108, 2, 4, 8);                    // gauge feed pipes down

  // ---------- 4. SERVER RACKS + WALL MEMES (left) ----------
  for (const rx of [4, 34]) {
    r(rx, 52, 26, 93, 0);                                        // rack body
    r(rx + 1, 53, 24, 1, 8); r(rx + 1, 143, 24, 1, 8);
    for (let y = 58; y < 140; y += 10) {                         // unit rows
      r(rx + 2, y, 22, 1, 8);
      // LED column — blink alternating rows
      const on = engineOn ? ((f % 10 < 5) === ((y / 10 | 0) % 2 === 0)) : ((y / 10 | 0) % 3 === 0);
      r(rx + 4, y + 3, 2, 2, on ? 10 : 2);
      r(rx + 8, y + 3, 2, 2, on ? 2 : 10);
      r(rx + 18, y + 4, 4, 1, 8);                                // handle
    }
  }
  r(30, 52, 4, 93, 8); r(30, 52, 1, 93, 0);                      // gap wall between racks
  // meme cards taped on, crooked
  const meme = (mx, my, face) => {
    r(mx, my, 10, 8, 15);
    r(mx + 1, my + 1, 7, 1, 0); r(mx + 1, my + 3, 5, 1, 0); r(mx + 1, my + 5, 6, 1, 0);
    r(mx + 6, my + 3, 2, 2, face);
  };
  meme(7, 58, 6); meme(19, 70, 6); meme(6, 84, 6);
  meme(38, 62, 6); meme(48, 78, 6); meme(40, 96, 6);
  r(48, 84, 10, 1, 7); r(48, 85, 3, 1, 8);                       // one half-peeled, bottom shifted
  r(18, 110, 10, 8, 15); r(19, 111, 7, 1, 0); r(19, 113, 6, 1, 0); r(24, 115, 2, 2, 6); // low meme

  // ---------- WALL DRESSING — conduits & cables (fills dead wall bands) ----------
  r(66, 24, 4, 116, 7); r(66, 24, 1, 116, 0); r(69, 24, 1, 116, 0);  // vertical conduit
  r(62, 76, 12, 10, 7); r(62, 76, 12, 1, 0); r(62, 85, 12, 1, 0); r(62, 76, 1, 10, 0); r(73, 76, 1, 10, 0); // junction box
  r(65, 80, 6, 3, 0); if (engineOn && f % 14 < 7) r(66, 81, 2, 1, 10); // box status light
  // sagging cable rack→turbine
  r(70, 92, 10, 1, 0); r(80, 93, 12, 1, 0); r(92, 94, 10, 1, 0); r(102, 93, 8, 1, 0);
  // cable turbine→compressor
  r(214, 100, 6, 1, 0); r(220, 101, 4, 1, 0); r(224, 102, 4, 1, 0);
  // taped work-order sheet right of turbine
  r(220, 60, 10, 12, 15); r(221, 62, 8, 1, 0); r(221, 65, 6, 1, 0); r(221, 68, 7, 1, 0);
  r(219, 59, 12, 1, 8);
  // wall vent grille top-left (above the racks)
  r(14, 30, 36, 16, 7); r(14, 30, 36, 1, 0); r(14, 45, 36, 1, 0); r(14, 30, 1, 16, 0); r(49, 30, 1, 16, 0);
  for (let y = 33; y < 44; y += 3) r(16, y, 32, 1, 8);
  r(16, 31, 32, 1, 15);                                          // grille sheen
  // hazard chevrons above the gate — this way to the hangar
  for (let i = 0; i < 3; i++) {
    const chx = 280 + i * 12;
    r(chx, 30, 3, 3, 14); r(chx + 3, 33, 3, 3, 14); r(chx, 36, 3, 3, 14);
  }

  // ---------- 11. STEEL FLOOR ----------
  r(0, 145, 320, 55, 8);
  r(0, 145, 320, 2, 0);                                          // wall/floor break
  // contact shadows under the big objects
  r(6, 145, 56, 3, 0); r(112, 145, 102, 4, 0); r(228, 145, 38, 3, 0); r(274, 145, 42, 3, 0);
  // floor texture — sparse dark speckle, denser near viewer
  for (let y = 164; y < 198; y += 4)
    for (let x = (y % 8) + 3; x < 320; x += (y < 182 ? 26 : 16)) r(x, y, 2, 1, 0);
  r(0, 161, 320, 1, 7); r(0, 177, 320, 1, 7);                    // seam catch-lights
  // plate seams, perspective spread
  r(0, 160, 320, 1, 0); r(0, 176, 320, 1, 0); r(0, 194, 320, 1, 0);
  for (const [sx, sy] of [[52, 148], [150, 148], [252, 148], [30, 162], [130, 164], [236, 166], [70, 180], [190, 182], [300, 180]])
    r(sx, sy, 1, sy < 160 ? 12 : 16, 0);                          // vertical seams
  r(0, 147, 320, 1, 7);                                          // floor catch-light at wall
  // hazard lane — the meme-spray corridor
  for (let x = -8; x < 320; x += 16) {
    for (let i = 0; i < 8; i++) r(x + i, 150 + i, 8, 1, 14);
  }
  r(0, 150, 320, 1, 0); r(0, 158, 320, 1, 0);                    // lane borders
  // oil stain — the tenant
  for (let y = 170; y < 178; y += 2)
    for (let x = 190 + (y % 4); x < 212; x += 4) r(x, y, 2, 2, 0);
  r(196, 172, 8, 3, 0); r(192, 175, 14, 2, 0);
  r(197, 172, 3, 1, 8);                                          // greasy sheen

  // ---------- 12. FLOOR DEBRIS ----------
  r(76, 168, 12, 2, 0);                                          // card shadow
  r(76, 161, 12, 8, 7);                                          // dead meme, face-down
  r(76, 161, 12, 1, 15); r(76, 161, 1, 8, 0); r(87, 161, 1, 8, 0); r(76, 168, 12, 1, 0);
  r(85, 161, 3, 2, 8); r(86, 161, 2, 1, 0);                      // corner curl
  r(70, 166, 1, 1, 14); r(92, 163, 1, 1, 14); r(96, 169, 1, 1, 14); // coughed confetti

  // ---------- 7b. MEME SPRAY (signature animation) ----------
  if (engineOn) {
    const tips = [[220, 28], [220, 31], [206, 40]];
    const stripes = [12, 10, 14];
    for (let i = 0; i < 3; i++) {
      const t = (frame * 4 + i * 48) % 140;
      const mx = tips[i][0] + t;
      const my = tips[i][1] + (t * 0.55 | 0);
      if (mx < 296 && my < 130) {
        r(mx, my, 8, 6, 15);
        r(mx + 1, my + 1, 6, 1, 0); r(mx + 1, my + 3, 4, 1, 0);
        r(mx, my + 5, 8, 1, stripes[i]);
        r(mx - 3, my + 2, 2, 2, 15);                             // motion fleck
      }
    }
    // faint red interior glow under the turbine when running
    r(146, 138, 32, 1, 4);
    // furnace light spilling from the mouth onto the floor plates
    r(150, 147, 24, 1, 4);
    for (let x = 142; x < 182; x += 8) r(x + (frame % 2) * 2, 148, 3, 1, 4);
  }
}
