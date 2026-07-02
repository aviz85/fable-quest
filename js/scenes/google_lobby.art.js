// google_lobby.art.js — לובי קמפוס אינסוף (Google act, room 1)
// 320x200 EGA, Sierra SCI0 style. fillRect only.
// Playground-office half-killed by Google: white walls, primary-color circles,
// a yellow slide instead of a door, an eager forms kiosk, dusty BETA signs,
// balloons at 40% helium. Light source: top-center skylight.
// Layout follows design/google_lobby.md — hotspot rects land on these objects.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };
  // Sierra stepped circle out of 2px row strips
  const circ = (cx, cy, rad, c) => {
    for (let dy = -rad; dy <= rad; dy += 2) {
      const hw = Math.floor(Math.sqrt(rad * rad - dy * dy));
      r(cx - hw, cy + dy, hw * 2, 2, c);
    }
  };

  // ================= ceiling (0..14) with skylight =================
  r(0, 0, 320, 14, 7);
  for (let x = 24; x < 320; x += 40) r(x, 0, 1, 12, 8);       // panel seams
  r(118, 1, 84, 10, 0);                                        // skylight frame
  r(120, 2, 80, 8, 11);
  for (let x = 136; x < 200; x += 16) r(x, 2, 2, 8, 7);        // mullions
  r(120, 2, 80, 1, 15);                                        // glare line
  r(122, 4, 22, 1, 15);
  r(0, 12, 320, 2, 8);                                         // cornice

  // ================= white wall (14..145) =================
  r(0, 14, 320, 131, 15);
  // giant primary "brand circles" nobody dusts
  circ(30, 40, 22, 1);  circ(30, 40, 14, 9);                   // blue
  circ(250, 36, 18, 4); circ(250, 36, 11, 12);                 // red
  circ(160, 55, 18, 2); circ(160, 55, 11, 10);                 // green
  // soft shade under the cornice — the wall recedes
  for (let x = 0; x < 320; x += 4) r(x + ((14 >> 1) % 2), 15, 2, 1, 7);
  r(0, 14, 320, 1, 7);
  // ghost frames — posters removed when the products died (brighter white + gray outline)
  const ghost = (gx, gy, gw, gh) => {
    r(gx, gy, gw, 1, 7); r(gx, gy + gh - 1, gw, 1, 7);
    r(gx, gy, 1, gh, 7); r(gx + gw - 1, gy, 1, gh, 7);
    r(gx + (gw >> 1) - 1, gy - 3, 2, 3, 8);                    // the lonely nail
    r(gx + 2, gy + gh, gw - 4, 1, 7);                          // dust line where it leaned
  };
  ghost(104, 88, 22, 16); ghost(198, 86, 18, 14);
  // stopped wall clock — time of the last deprecation
  circ(186, 30, 9, 0);                                         // black rim
  circ(186, 30, 7, 15);                                        // white face
  r(185, 23, 2, 2, 8); r(185, 35, 2, 2, 8);                    // 12 & 6 ticks
  r(180, 29, 2, 2, 8); r(191, 29, 2, 2, 8);                    // 9 & 3 ticks
  r(185, 26, 2, 5, 0);                                         // hour hand — frozen
  r(186, 29, 4, 2, 0);                                         // minute hand — also frozen
  // baseboard
  r(0, 140, 320, 1, 8);
  r(0, 141, 320, 4, 7);
  // scuffs of employees past
  r(190, 136, 12, 1, 7); r(90, 134, 8, 1, 7);

  // ================= right exit gap → google_corridors =================
  r(306, 78, 14, 72, 0);                                       // frame
  r(308, 80, 12, 70, 8);                                       // dark opening
  r(309, 82, 5, 66, 7);                                        // lit corridor sliver
  r(309, 140, 11, 10, 7); r(309, 140, 11, 1, 15);              // corridor floor hint
  // green exit sign with arrow → (spatial: corridor is to the right)
  r(303, 66, 17, 9, 2); r(302, 65, 19, 1, 0); r(302, 75, 19, 1, 0);
  r(302, 65, 1, 11, 0); r(320, 65, 1, 11, 0);
  r(305, 69, 8, 2, 15); r(312, 67, 2, 6, 15); r(314, 68, 2, 4, 15);

  // ================= floor (145..200) =================
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 3, 8);                                        // far edge darker
  for (let x = 0; x < 320; x += 4) r(x, 148, 2, 2, 8);         // dither into light
  r(0, 156, 320, 1, 8); r(0, 168, 320, 1, 8); r(0, 183, 320, 1, 8); // perspective seams
  // skylight pool of light, sparse dither
  for (let y = 160; y <= 176; y += 6) {
    const half = 16 + (y - 160);
    for (let x = 164 - half + ((y / 6) % 2) * 3; x < 164 + half; x += 6) r(x, y, 2, 2, 15);
  }
  // colored carpet dots (playground DNA, sun-faded)
  const dots = [[16, 166, 14], [66, 184, 12], [118, 174, 10], [160, 190, 14], [210, 166, 12], [246, 186, 10], [284, 178, 14]];
  for (const [dx, dy, dc] of dots) { r(dx, dy, 6, 3, dc); r(dx, dy + 3, 6, 1, 8); }

  // ================= THE SLIDE — the official entrance =================
  // ceiling hole rim
  r(50, 12, 30, 2, 8); r(50, 13, 30, 1, 0);
  // vertical drop tube (52,14,26,20)
  r(52, 14, 26, 18, 14);
  r(51, 14, 1, 18, 0); r(78, 14, 1, 18, 0);
  r(52, 14, 3, 18, 6); r(74, 14, 4, 18, 15);                   // shade left, lit right
  r(52, 26, 26, 2, 6);                                         // ring seam
  // continuous S-curve through the design's zig-zag anchors:
  // (52,32)→(58,36)→(72,48)→(60,62)→(48,76), tube width 30
  const sx = (y) => {
    if (y < 36) return 52 + Math.round((y - 32) * 1.5);
    if (y < 48) return 58 + Math.round((y - 36) * 14 / 12);
    if (y < 62) return 72 - Math.round((y - 48) * 12 / 14);
    return 60 - Math.round((y - 62) * 12 / 14);
  };
  for (let y = 32; y < 76; y++) {
    const x = sx(y), xn = sx(Math.min(y + 1, 75));
    r(Math.min(x, xn), y, 30 + Math.abs(x - xn), 1, 14);       // tube row (bridges steps)
    r(x, y, 3, 1, 6);                                          // shaded left flank
    r(x + 21, y, 4, 1, 15);                                    // lit band (inset — wall is white too)
    r(Math.min(x, xn) - 1, y, Math.abs(x - xn) + 1, 1, 0);     // left contour, connected
    r(Math.min(x, xn) + 30, y, Math.abs(x - xn) + 1, 1, 0);    // right contour, connected
    if (y % 15 === 0) r(x + 3, y, 23, 1, 6);                   // ring seams
  }
  // chute column (48,76,34,60) — yellow cylinder down to the mouth
  r(48, 76, 34, 60, 14);
  r(47, 76, 1, 60, 0); r(82, 76, 1, 60, 0);
  r(48, 76, 4, 60, 6);                                         // shaded left
  r(76, 76, 5, 60, 15);                                        // lit right
  for (const ry of [90, 106, 122]) r(52, ry, 24, 1, 6);        // ring seams
  // mouth at floor (44,136,42,14)
  r(44, 136, 42, 14, 14);
  r(43, 135, 44, 1, 0); r(43, 135, 1, 15, 0); r(86, 135, 1, 15, 0);
  r(52, 139, 26, 9, 0);                                        // the dark opening
  r(52, 139, 26, 2, 6);
  r(44, 148, 42, 2, 6);                                        // bottom lip
  r(44, 150, 42, 4, 8);                                        // floor shadow
  // faded "entrance" sign, arrow pointing INTO the slide (leftwards)
  r(88, 70, 18, 10, 7);
  r(87, 69, 20, 1, 8); r(87, 80, 20, 1, 8); r(87, 69, 1, 12, 8); r(106, 69, 1, 12, 8);
  r(93, 74, 10, 2, 8); r(91, 73, 2, 4, 8); r(89, 74, 2, 2, 8); // ← arrow, sun-bleached

  // ================= green beanbag pouf (96,138,34,16) =================
  r(98, 138, 30, 5, 2);
  r(96, 141, 34, 13, 2);
  r(100, 138, 26, 4, 10);                                      // top highlight
  r(97, 137, 28, 1, 0);                                        // top outline
  r(95, 141, 1, 12, 0); r(130, 141, 1, 12, 0);
  r(110, 138, 10, 3, 2); r(110, 140, 10, 1, 0);                // someone-shaped dent
  r(124, 144, 4, 8, 0);                                        // dark side
  r(96, 152, 34, 3, 8);                                        // shadow

  // ================= campus bike, leaning on wall (4,116,40,32) =================
  circ(13, 139, 7, 0); circ(13, 139, 4, 7); r(12, 138, 2, 2, 0);   // back wheel
  circ(35, 139, 7, 0); circ(35, 139, 4, 7); r(34, 138, 2, 2, 0);   // front wheel
  r(6, 144, 14, 3, 7); r(6, 144, 14, 1, 0); r(8, 145, 10, 2, 8);   // flat tire, squashed
  r(10, 122, 10, 2, 4); r(18, 124, 10, 2, 4); r(26, 126, 10, 2, 4); // top tube (red)
  r(12, 124, 2, 14, 4); r(33, 126, 2, 12, 4);                  // seat/head tubes
  r(14, 132, 20, 2, 4);                                        // down tube
  r(6, 118, 9, 3, 0); r(7, 118, 7, 1, 8);                      // saddle
  r(30, 116, 10, 2, 6); r(34, 118, 2, 8, 6);                   // handlebar
  r(30, 149, 12, 2, 8);                                        // shadow (front wheel only — the flat one hugs the floor)

  // ================= reception desk (130..198) =================
  r(132, 150, 64, 4, 8);                                       // shadow
  r(132, 116, 64, 34, 9);                                      // body
  r(131, 116, 1, 34, 0); r(196, 116, 1, 34, 0); r(132, 149, 64, 1, 0);
  r(134, 118, 60, 1, 11);                                      // panel glint
  r(142, 128, 10, 8, 1); r(156, 128, 10, 8, 4);                // four-color front squares
  r(170, 128, 10, 8, 14); r(184, 128, 10, 8, 2);
  r(142, 128, 52, 1, 15);
  // blue counter top (130,110,68,6)
  r(130, 110, 68, 6, 1);
  r(129, 109, 70, 1, 0); r(129, 109, 1, 8, 0); r(198, 109, 1, 8, 0);
  r(130, 110, 68, 1, 9);                                       // top glint
  r(130, 115, 68, 1, 0);
  // reception bell (156,102,10,8) — ring it, nobody's coming
  r(160, 100, 2, 2, 6);                                        // knob
  r(158, 102, 6, 2, 14);
  r(156, 104, 10, 5, 14);
  r(158, 103, 2, 2, 15);                                       // glint
  r(155, 104, 1, 5, 0); r(166, 104, 1, 5, 0);
  r(154, 108, 14, 2, 6); r(154, 110, 14, 1, 0);                // base
  // the note (172,100,12,10) — "לפניות: ראה פתק"
  r(172, 100, 12, 10, 15);
  r(171, 99, 14, 1, 8); r(171, 110, 14, 1, 8); r(171, 99, 1, 12, 8); r(184, 99, 1, 12, 8);
  r(174, 102, 8, 1, 0); r(174, 104, 6, 1, 0); r(174, 106, 7, 1, 0); // polite unreadable text

  // ================= small too-perfect plant (208,136,10,14) =================
  r(210, 136, 6, 5, 2); r(208, 139, 10, 4, 2);
  r(210, 136, 2, 2, 10); r(214, 136, 2, 2, 10);                // symmetric shine
  r(210, 143, 6, 7, 6); r(209, 143, 8, 1, 14);
  r(207, 150, 12, 2, 8);

  // ================= forms kiosk (224,96,40,54) — friendly. doomed. =================
  r(226, 150, 42, 4, 8);                                       // shadow
  r(224, 96, 40, 54, 9);                                       // body
  r(223, 96, 1, 54, 0); r(264, 96, 1, 54, 0); r(224, 95, 40, 1, 0); r(224, 149, 40, 1, 0);
  r(224, 96, 2, 2, 15); r(262, 96, 2, 2, 15);                  // rounded corner nibbles
  r(225, 98, 2, 50, 11);                                       // lit left edge
  r(260, 98, 3, 50, 1);                                        // shaded right
  // screen (232,104,24,16) — the last happy face in the building
  r(230, 102, 28, 20, 0);                                      // bezel
  r(232, 104, 24, 16, 10);
  r(253, 105, 2, 4, 15);                                       // glare
  if (frame % 30 < 15) {                                       // :) eager smile
    r(237, 108, 2, 2, 0); r(249, 108, 2, 2, 0);
    r(240, 114, 8, 2, 0); r(238, 112, 2, 2, 0); r(248, 112, 2, 2, 0);
  } else {                                                     // :O wide-eyed
    r(236, 107, 3, 3, 0); r(249, 107, 3, 3, 0);
    r(242, 112, 4, 4, 0); r(243, 113, 2, 2, 10);
  }
  r(244, 126, 6, 2, frame % 20 < 10 ? 10 : 2);                 // READY led, breathing
  // output slot (232,132,24,5)
  r(232, 132, 24, 5, 0);
  r(231, 131, 26, 1, 7);
  r(232, 137, 24, 2, 7); r(232, 139, 24, 1, 8);                // lip
  // legs
  r(228, 150, 6, 4, 8); r(254, 150, 6, 4, 8);

  // ================= BETA sign (222,72,46,16), crooked, + BETA-on-BETA =================
  const tilt = [[222, 0, 12], [234, 0, 12], [246, 1, 12], [258, 2, 10]];
  for (const [sx, dy, w] of tilt) {
    r(sx, 72 + dy, w, 16, 14);
    r(sx, 72 + dy, w, 1, 15);                                  // top lit
    r(sx, 87 + dy, w, 1, 6);                                   // bottom shade
    r(sx, 71 + dy, w, 1, 0); r(sx, 88 + dy, w, 1, 0);          // outline strips
  }
  r(221, 71, 1, 18, 0); r(268, 73, 1, 18, 0);
  // block letters B E T A (2px strokes)
  const bF = (x, y) => { r(x, y, 2, 8, 0); r(x, y, 5, 2, 0); r(x, y + 3, 5, 2, 0); r(x, y + 6, 5, 2, 0); r(x + 4, y + 1, 2, 2, 0); r(x + 4, y + 4, 2, 2, 0); };
  const eF = (x, y) => { r(x, y, 2, 8, 0); r(x, y, 6, 2, 0); r(x, y + 3, 5, 2, 0); r(x, y + 6, 6, 2, 0); };
  const tF = (x, y) => { r(x, y, 6, 2, 0); r(x + 2, y, 2, 8, 0); };
  const aF = (x, y) => { r(x + 1, y, 4, 2, 0); r(x, y + 2, 2, 6, 0); r(x + 4, y + 2, 2, 6, 0); r(x + 2, y + 4, 2, 2, 0); };
  bF(226, 76); eF(236, 76); tF(246, 77); aF(256, 78);
  // dust drifts on the board
  r(228, 73, 3, 1, 7); r(241, 73, 3, 1, 7); r(252, 74, 3, 1, 7); r(233, 86, 4, 1, 6);
  // the smaller BETA sign stuck on the BETA sign's corner
  r(262, 66, 14, 10, 7);
  r(261, 65, 16, 1, 0); r(261, 76, 16, 1, 0); r(261, 65, 1, 12, 0); r(276, 65, 1, 12, 0);
  r(264, 68, 10, 2, 0); r(264, 72, 7, 1, 8);                   // tinier BETA, unreadable

  // ================= big too-real plant (296,120,16,30) =================
  r(302, 120, 4, 8, 2);                                        // center spike
  r(297, 124, 5, 10, 2); r(306, 124, 5, 10, 2);                // suspiciously symmetric
  r(299, 132, 10, 10, 2);
  r(303, 121, 2, 6, 10); r(298, 126, 2, 5, 10); r(308, 126, 2, 5, 10); // identical highlights
  r(309, 134, 2, 6, 0);                                        // dark side
  r(298, 142, 12, 10, 6);                                      // clay pot
  r(297, 142, 14, 2, 14);                                      // rim
  r(299, 145, 2, 5, 14);                                       // gloss
  r(296, 152, 16, 2, 8);

  // ================= sad balloons at knee height (animated bob) =================
  const balloon = (bx, by, c, hi, phase, endY) => {
    const y = by + (((frame >> 3) + phase) % 2) * 2;
    r(bx + 2, y, 6, 2, c);
    r(bx, y + 2, 10, 8, c);
    r(bx + 2, y + 10, 6, 2, c);
    r(bx + 2, y + 2, 2, 3, hi);                                // shine
    r(bx + 4, y + 12, 2, 2, c);                                // knot
    r(bx + 1, y + 1, 1, 1, 0); r(bx + 8, y + 1, 1, 1, 0);      // corner nicks → rounder
    r(bx + 1, y + 9, 1, 1, 0); r(bx + 8, y + 9, 1, 1, 0);
    for (let sy = y + 14; sy < endY; sy += 4) r(bx + 4 + ((sy >> 2) % 2), sy, 1, 4, 8); // limp string
  };
  balloon(114, 118, 4, 12, 0, 138);                            // red, tied to the pouf
  balloon(200, 124, 1, 9, 1, 150);                             // blue
  balloon(290, 120, 2, 10, 2, 150);                            // green, hiding by the plant
}
