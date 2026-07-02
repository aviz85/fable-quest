// cafe_main.art.js — אינטרנט קפה שוקי 2000 (hub)
// 320x200 EGA, Sierra SCI0 style. fillRect only.
export function draw(ctx, P, frame, opts = {}) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- ceiling (0..12) ----------
  r(0, 0, 320, 12, 8);
  r(0, 10, 320, 2, 0);            // ceiling/wall shadow line
  for (let x = 6; x < 320; x += 40) r(x, 3, 22, 2, 7); // ceiling panel seams

  // ---------- back wall (12..145), brown with peeling wallpaper ----------
  r(0, 12, 320, 133, 6);
  // irregular peeling-wallpaper stripes (thin, uneven — not prison bars)
  const stripes = [[24, 1, 131], [55, 2, 90], [96, 1, 131], [131, 2, 70], [170, 1, 131], [214, 2, 100], [258, 1, 131], [289, 2, 80], [310, 1, 131]];
  for (const [sx, sw, sl] of stripes) r(sx, 12, sw, sl, 8);
  r(0, 56, 320, 2, 8);                                     // wallpaper border line
  r(0, 58, 320, 1, 14);                                    // faded gold trim under it
  // peeling patches (plaster showing through)
  r(70, 118, 16, 14, 7); r(70, 118, 16, 2, 8); r(83, 116, 5, 5, 8);
  r(300, 60, 12, 9, 7); r(300, 60, 3, 9, 8);
  // wall clock (stopped, obviously)
  r(172, 20, 20, 20, 0);
  r(174, 22, 16, 16, 15);
  r(181, 24, 2, 6, 0); r(183, 29, 5, 2, 0);   // hands
  r(181, 23, 2, 1, 8); r(181, 36, 2, 1, 8); r(175, 29, 1, 2, 8); r(188, 29, 1, 2, 8); // ticks
  // grime line along baseboard
  r(0, 132, 320, 4, 8);
  // corner shading — room gets darker at the edges (depth)
  r(0, 12, 2, 133, 8); r(318, 12, 2, 133, 8);
  // shadow dither just under the ceiling
  for (let x = 0; x < 320; x += 4) { r(x, 12, 2, 2, 8); r(x + 2, 14, 2, 1, 8); }
  // ceiling smoke stain above the coffee machine
  r(14, 12, 30, 3, 8); r(20, 15, 18, 2, 8); r(26, 17, 8, 1, 8);
  // menu board on the wall over the counter (prices from another era)
  r(42, 60, 34, 30, 0);                        // frame
  r(44, 62, 30, 26, 8);
  r(46, 64, 26, 4, 14);                        // header bar
  r(46, 71, 18, 2, 15); r(68, 71, 4, 2, 12);   // item + price
  r(46, 76, 14, 2, 15); r(66, 76, 6, 2, 12);
  r(46, 81, 20, 2, 15); r(70, 81, 2, 2, 12);
  // sagging cable strung along the wall (phone → CRTs → stairs)
  r(106, 62, 22, 1, 0); r(128, 64, 22, 1, 0); r(150, 66, 18, 1, 0);
  r(168, 64, 26, 1, 0); r(194, 62, 26, 1, 0); r(220, 60, 8, 1, 0);
  r(105, 60, 2, 3, 8); r(219, 58, 2, 3, 8);    // wall clips
  // ---------- wheezing AC unit (right of clock) with animated drip ----------
  r(194, 13, 26, 17, 0);                       // outline
  r(195, 14, 24, 15, 7);
  r(195, 14, 24, 2, 15);                       // top highlight
  for (let vy = 18; vy < 27; vy += 3) r(197, vy, 17, 1, 8); // vents
  r(215, 17, 3, 3, frame % 40 < 20 ? 10 : 8);  // lazy status LED
  r(197, 29, 21, 1, 8);                        // drip stain lip
  const dripY = 31 + (frame * 3) % 52;         // drop falling between the CRTs
  r(201, dripY, 2, 3, 11);
  r(199, 84, 6, 2, 8);                         // damp patch where it lands

  // ---------- hanging bulb (cord + bulb, flicker frame%20<18) ----------
  r(160, 6, 2, 8, 0);
  r(157, 13, 8, 3, 8);                       // socket
  const lit = frame % 20 < 18;
  r(158, 16, 6, 8, lit ? 14 : 6);
  if (lit) {
    r(160, 18, 2, 4, 15);                    // filament glint
    r(154, 19, 3, 2, 14); r(165, 19, 3, 2, 14); // tiny halo
    r(159, 25, 4, 2, 14);
    // warm glow speckle on the wall around the bulb
    r(148, 30, 2, 2, 14); r(172, 32, 2, 2, 14); r(156, 38, 2, 2, 14);
    r(168, 44, 2, 2, 14); r(150, 48, 2, 2, 14); r(176, 52, 2, 2, 14);
  }
  r(157, 15, 1, 9, 0); r(164, 15, 1, 9, 0);  // bulb outline sides

  // ---------- neon sign over the counter (coffee cup icon, flickers) ----------
  r(14, 20, 56, 22, 0); r(13, 19, 58, 1, 8); r(13, 42, 58, 1, 8);
  const neonOn = frame % 30 < 26;
  if (neonOn) {
    r(22, 30, 14, 8, 12);                    // cup
    r(36, 32, 3, 4, 12);                     // handle
    r(24, 24, 2, 4, 14); r(28, 23, 2, 5, 14); r(32, 24, 2, 4, 14); // steam
    r(44, 24, 22, 3, 5);                     // "2000" bar
    r(44, 30, 16, 3, 12);
    r(44, 36, 20, 3, 5);
  } else {
    r(22, 30, 14, 8, 8); r(44, 24, 22, 3, 8);
  }

  // ---------- street door (left edge, 0,60,14,85) ----------
  r(0, 58, 16, 87, 0);                        // frame
  r(0, 60, 14, 85, 2);
  r(3, 68, 8, 14, 9);                         // window pane
  r(3, 68, 3, 5, 11);                         // glint
  r(2, 90, 10, 24, 0); r(3, 91, 8, 22, 2);    // lower panel
  r(10, 108, 3, 4, 14);                       // handle
  r(14, 58, 2, 87, 8);                        // jamb shadow

  // ---------- red pay phone (86,52,18,32) ----------
  r(85, 51, 20, 34, 0);                       // outline
  r(86, 52, 18, 32, 4);
  r(87, 53, 16, 2, 12);                       // top highlight
  r(90, 58, 10, 8, 0);                        // display
  r(91, 59, 4, 2, 10);
  for (let ky = 0; ky < 3; ky++) for (let kx = 0; kx < 3; kx++) r(90 + kx * 4, 69 + ky * 4, 2, 2, 15); // keypad
  r(83, 54, 3, 15, 0);                        // handset
  r(82, 53, 5, 3, 0);
  for (let k = 0; k < 8; k++) r(84 + (k % 2) * 3, 70 + k * 3, 2, 2, 0); // zigzag cord

  // ---------- bulletin board (118,42,48,38) ----------
  r(116, 40, 52, 42, 0);                      // frame
  r(118, 42, 48, 38, 6);
  for (let i = 0; i < 30; i++) r(119 + (i * 13) % 46, 43 + (i * 7) % 36, 1, 1, 8); // cork speckle
  r(122, 46, 10, 12, 14); r(123, 48, 8, 1, 0); r(123, 51, 8, 1, 0);  // notes
  r(136, 44, 12, 9, 15); r(137, 46, 10, 1, 0); r(137, 49, 7, 1, 0);
  r(151, 47, 11, 13, 12); r(152, 50, 9, 1, 0); r(152, 54, 6, 1, 0);
  r(124, 62, 13, 10, 10); r(125, 64, 11, 1, 0); r(125, 67, 8, 1, 0);
  r(142, 60, 10, 14, 14); r(143, 63, 8, 1, 0); r(143, 66, 8, 1, 0); r(143, 69, 5, 1, 0);
  r(155, 64, 9, 9, 15); r(156, 66, 7, 1, 0);
  r(127, 45, 2, 2, 4); r(140, 43, 2, 2, 4); r(156, 46, 2, 2, 4); // pins

  // ---------- broken window + sunset (222,28,76,60) ----------
  r(220, 26, 80, 64, 0);                      // outer outline
  r(222, 28, 76, 60, 6);                      // wooden frame
  r(226, 32, 68, 52, 5);                      // sunset base
  // dithered sunset bands (2x2 checker)
  for (let y = 32; y < 84; y += 2) {
    for (let x = 226 + (y % 4); x < 294; x += 4) {
      const c = y < 46 ? 5 : y < 60 ? 12 : y < 72 ? 12 : 14;
      const base = y < 46 ? 1 : y < 60 ? 5 : y < 72 ? 14 : 12;
      r(x, y, 2, 2, c); if (x + 2 < 294) r(x + 2, y, 2, 2, base);
    }
  }
  r(236, 46, 12, 9, 14); r(238, 44, 8, 13, 14);        // setting sun
  // TLV skyline silhouette at the bottom of the view
  r(226, 74, 10, 10, 0); r(240, 70, 8, 14, 0); r(252, 76, 12, 8, 0); r(270, 72, 9, 12, 0); r(284, 77, 10, 7, 0);
  r(242, 72, 2, 2, 14); r(272, 74, 2, 2, 14);          // lit windows
  // glass teeth around the hole (P15/P7)
  r(226, 32, 5, 5, 11); r(227, 37, 3, 4, 15); r(228, 41, 1, 3, 7);
  r(244, 32, 4, 4, 15); r(245, 36, 2, 3, 7);
  r(262, 32, 6, 3, 11); r(264, 35, 3, 4, 15);
  r(288, 32, 6, 4, 11); r(290, 36, 3, 4, 15); r(291, 40, 2, 3, 7);
  r(226, 76, 3, 8, 15); r(227, 72, 2, 4, 7);
  r(290, 76, 4, 8, 11); r(288, 80, 2, 4, 15);
  r(226, 54, 3, 8, 15); r(291, 50, 3, 9, 11);
  // window cross-bar stumps (broken muntins)
  r(258, 32, 3, 6, 6); r(258, 78, 3, 6, 6);

  // ---------- crashed drone stuck in the window (244,52,30,18) ----------
  r(242, 52, 34, 16, 0);                      // heavy outline blob
  r(244, 54, 30, 12, 7);                      // body
  r(245, 54, 28, 2, 15);                      // top highlight
  r(246, 62, 26, 4, 8);                       // belly shade
  r(241, 57, 4, 7, 8);                        // crumpled nose
  r(255, 57, 12, 5, 0);                       // dark vent
  r(257, 58, 2, 2, 10); r(261, 58, 2, 2, 10); // status pixels
  // broken rotor arm sticking up (stepped diagonal)
  r(266, 49, 3, 5, 0); r(269, 45, 3, 5, 0); r(272, 41, 3, 5, 0);
  r(268, 39, 13, 2, 0);                       // bent rotor blade
  r(279, 36, 2, 4, 0);
  // dangling second rotor
  r(248, 67, 2, 6, 0); r(244, 72, 9, 2, 0);
  // blinking red LED — the main animation
  const led = frame % 10 < 5;
  r(248, 57, 4, 4, led ? 4 : 0);
  if (led) { r(246, 58, 2, 2, 12); r(252, 58, 2, 2, 12); r(249, 55, 2, 2, 12); }
  // impact cracks on remaining glass
  r(238, 50, 6, 1, 15); r(234, 47, 4, 1, 15); r(276, 62, 6, 1, 15); r(282, 66, 5, 1, 15);

  // ---------- basement stair opening (296,100,24,45) ----------
  r(292, 94, 28, 53, 0);                      // dark trim outline
  r(294, 96, 26, 51, 6);                      // wooden door frame
  r(294, 96, 2, 51, 14);                      // lit jamb edge (light from the bulb)
  r(296, 100, 24, 45, 0);                     // darkness
  r(297, 108, 20, 4, 8); r(297, 108, 20, 1, 7); // top step
  r(300, 119, 17, 4, 8); r(300, 119, 17, 1, 7);
  r(304, 130, 13, 3, 8);
  r(308, 139, 9, 2, 8);
  r(296, 100, 24, 2, 6);                      // inner lintel
  r(298, 90, 18, 8, 14); r(299, 92, 7, 1, 0); r(308, 92, 6, 1, 0); r(299, 95, 12, 1, 0); // sign
  r(298, 98, 18, 1, 0);

  // ---------- baseboard ----------
  r(0, 141, 320, 1, 0);
  r(0, 142, 320, 3, 8);

  // ---------- tile floor with perspective (145..200) ----------
  const rows = [[145, 8, 16], [153, 10, 20], [163, 12, 24], [175, 14, 29], [189, 11, 34]];
  for (let i = 0; i < rows.length; i++) {
    const [ry, rh, tw] = rows[i];
    const x0 = 160 - Math.ceil(170 / tw) * tw;
    for (let x = x0, k = 0; x < 320; x += tw, k++) r(x, ry, tw, rh, (k + i) % 2 ? 8 : 7);
    r(0, ry, 320, 1, 8);                      // grout line
  }
  // scuff marks + drain on the tiles
  r(100, 168, 8, 1, 8); r(118, 180, 10, 1, 8);
  r(60, 176, 10, 6, 8); r(62, 178, 6, 2, 0);   // floor drain
  // faint warm glint under the hanging bulb (very sparse)
  if (lit) {
    r(150, 150, 2, 1, 14); r(162, 152, 2, 1, 14); r(172, 149, 2, 1, 14);
    r(146, 158, 2, 1, 14); r(158, 161, 2, 1, 14); r(170, 157, 2, 1, 14);
    r(154, 168, 2, 1, 14); r(166, 171, 2, 1, 14);
  }
  // welcome mat by the street door
  r(2, 148, 26, 11, 0);                        // border
  r(3, 149, 24, 9, 4);
  r(5, 151, 20, 5, 12);                        // faded center
  r(8, 153, 5, 1, 4); r(16, 153, 6, 1, 4);     // worn-out pattern

  // ---------- coffee machine (12,70,26,32) behind the counter ----------
  r(11, 69, 28, 34, 0);                       // outline
  r(12, 70, 26, 32, 8);
  r(13, 70, 24, 2, 7);                        // top highlight
  r(15, 76, 20, 12, 0);                       // panel
  r(17, 78, 4, 3, 4);                         // broken-since-2019 light
  r(24, 78, 9, 2, 10); r(24, 82, 7, 2, 2);    // dead readout
  r(20, 92, 10, 4, 7); r(23, 96, 4, 4, 6);    // spout + cup
  // steam — rises with frame
  const sy1 = 66 - (frame % 30);
  const sy2 = 66 - ((frame + 15) % 30);
  if (sy1 > 44) { r(22, sy1, 6, 2, 7); r(26, sy1 - 4, 4, 2, 7); }
  if (sy2 > 44) { r(18, sy2, 5, 2, 7); r(24, sy2 - 3, 4, 2, 7); }

  // ---------- counter (2,98,72,62) ----------
  r(1, 97, 74, 64, 0);                        // outline
  r(2, 98, 72, 8, 7);                         // top
  r(2, 98, 72, 2, 15);                        // top highlight
  r(2, 106, 72, 54, 6);                       // wooden front
  for (let x = 12; x < 72; x += 15) r(x, 108, 2, 50, 8); // planks
  r(2, 106, 72, 2, 8);                        // lip shadow
  r(6, 116, 20, 12, 8); r(7, 117, 18, 10, 6); // cubby with card stack
  r(9, 122, 12, 3, 9); r(9, 119, 12, 3, 15);  // internet-hour cards
  r(40, 114, 24, 16, 8); r(41, 115, 22, 14, 6); // dusty sign panel
  r(44, 119, 16, 2, 14); r(44, 124, 12, 2, 14);
  r(2, 160, 76, 3, 8);                        // floor shadow
  // dust motes on counter top
  r(20, 99, 3, 1, 8); r(48, 100, 4, 1, 8); r(62, 99, 3, 1, 8);
  // ancient cash register on the counter
  r(47, 84, 20, 15, 0);                       // outline
  r(48, 85, 18, 13, 8);
  r(48, 85, 18, 2, 7);                        // top light
  r(50, 88, 12, 3, 2); r(51, 89, 6, 1, 10);   // green display
  for (let ky = 0; ky < 2; ky++) for (let kx = 0; kx < 4; kx++) r(50 + kx * 4, 93 + ky * 3, 2, 2, 7); // keys
  r(63, 92, 3, 6, 6);                         // crank handle

  // ---------- CRT row: table 140,112,90,10 + three monitors ----------
  r(139, 111, 92, 12, 0);                     // table outline
  r(140, 112, 90, 10, 6);
  r(140, 112, 90, 2, 7);                      // table top edge
  r(142, 122, 5, 23, 6); r(142, 122, 5, 2, 8);  // legs
  r(223, 122, 5, 23, 6); r(223, 122, 5, 2, 8);
  r(182, 122, 4, 20, 8);                      // back middle leg (darker, further)
  r(138, 145, 96, 3, 8);                      // shadow on floor
  const mons = [145, 175, 205];
  for (let m = 0; m < 3; m++) {
    const x0 = mons[m];
    r(x0 - 1, 87, 24, 24, 0);                 // outline
    r(x0, 88, 22, 22, 7);                     // case
    r(x0 + 19, 88, 3, 22, 8);                 // side shade
    r(x0 + 2, 90, 18, 15, 0);                 // bezel
    const dead = m === 1 && frame % 14 < 3;   // middle screen flickers out
    r(x0 + 3, 91, 16, 13, dead ? 0 : 2);
    if (!dead) {
      const scroll = (frame >> 2) % 4;
      for (let l = 0; l < 3; l++) r(x0 + 4, 92 + ((l * 4 + scroll) % 12), 6 + ((l + m) % 3) * 3, 1, 10);
      r(x0 + 4 + ((frame >> 3) % 8), 101, 2, 2, 10); // cursor
    }
    r(x0 + 8, 106, 8, 2, 8);                  // chin vent
    r(x0 + 6, 110, 10, 2, 8);                 // stand
    r(x0 + 3, 113, 16, 3, 7); r(x0 + 3, 113, 16, 1, 8); // keyboard on table
  }
  // cables drooping behind the table
  r(150, 123, 1, 8, 0); r(180, 123, 1, 10, 0); r(210, 123, 1, 7, 0);

  // ---------- mismatched chairs in front of the CRTs (closer = lower) ----------
  const chairs = [[148, 6], [178, 4], [208, 6]];
  for (const [cx, cc] of chairs) {
    r(cx, 124, 3, 12, 0);                     // backrest post
    r(cx, 124, 14, 3, cc); r(cx, 124, 14, 1, 0); // back top rail
    r(cx - 1, 133, 17, 5, cc);                // seat
    r(cx - 1, 133, 17, 1, 15);                // seat highlight
    r(cx - 1, 137, 17, 1, 0);                 // seat edge
    r(cx, 138, 2, 11, 0); r(cx + 12, 138, 2, 11, 0); // legs
    r(cx - 1, 148, 17, 2, 8);                 // floor shadow
  }
  // middle chair knocked slightly askew (one leg kicked out)
  r(190, 141, 2, 8, 0);

  // ---------- overflowing trash bin left of the table ----------
  r(118, 126, 16, 20, 0);                     // outline
  r(119, 127, 14, 18, 8);
  r(119, 127, 3, 18, 7);                      // lit side
  r(118, 126, 16, 2, 7);                      // rim
  r(120, 122, 5, 5, 15); r(126, 120, 6, 6, 7); // crumpled paper overflow
  r(130, 124, 4, 4, 15);
  r(133, 143, 6, 4, 15); r(134, 146, 4, 1, 8); // one that missed
  r(117, 145, 18, 2, 8);                      // floor shadow

  // ---------- Yankale's squeegee leaning on the wall (below the window) ----------
  r(240, 96, 2, 10, 7); r(238, 106, 2, 12, 7); r(236, 118, 2, 12, 7); r(234, 130, 2, 11, 7); // handle
  r(241, 96, 1, 10, 8); r(239, 106, 1, 12, 8); r(237, 118, 1, 12, 8); r(235, 130, 1, 11, 8); // handle shade
  r(240, 94, 3, 3, 8);                        // hook end
  r(228, 138, 14, 3, 0); r(228, 141, 14, 2, 8); // rubber squeegee head
  r(232, 143, 6, 2, 8);                        // its shadow bleeding onto the floor line

  // ---------- glass shards on floor (232,150,60,22) ----------
  const shard = [[234, 152, 4, 2, 15], [242, 156, 3, 3, 11], [252, 151, 5, 2, 7], [260, 158, 4, 2, 15],
    [270, 153, 3, 2, 11], [280, 160, 5, 3, 15], [238, 164, 4, 2, 7], [250, 166, 3, 2, 15],
    [266, 168, 5, 2, 11], [284, 155, 3, 2, 7], [246, 160, 2, 2, 15], [276, 166, 3, 2, 15]];
  for (const [sx, sy, sw, sh, sc] of shard) { r(sx, sy, sw, sh, sc); r(sx + 1, sy + sh, sw - 1, 1, 8); }
  // roaming glint on the glass (catchlight cycles between shards)
  const g = shard[(frame >> 4) % shard.length];
  r(g[0], g[1] - 1, 2, 1, 15);

  // ---------- classified envelope (250,171,14,8) under a shard — gone once taken ----------
  if (!opts.envelopeTaken) {
    r(249, 170, 16, 10, 0);                   // outline
    r(250, 171, 14, 8, 14);
    r(250, 174, 14, 2, 4);                    // red CLASSIFIED stripe
    r(252, 172, 4, 1, 6);                     // hummus stain
    r(258, 169, 7, 3, 11);                    // glass shard on its corner
    r(259, 172, 4, 1, 15);
  }
}
