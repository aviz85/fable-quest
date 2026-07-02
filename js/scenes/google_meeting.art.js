// google_meeting.art.js — חדר הישיבות אינסוף-3 (Google act)
// 320x200 EGA, Sierra SCI0. fillRect only. Layout follows design/google_meeting.md EXACTLY:
//   giant videocall screen 96,30..224,92 · plaque 112,96..208,114 · glass board 14,38..86,104
//   window 238,36..306,104 · side table 252,106..306,145 · elliptical table 84..236,124..152
//   head chair 60..82,112..156 · spider phone 150..170,132..142 · rec light 294..302,6..12
// Animations: recording light, freezing middle head + spinner, cycling committee name,
//             live-call dot, ghost sliding down the courtyard slide, spider-phone LED.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ================= 1. CEILING (0..22) =================
  r(0, 0, 320, 22, 15);
  // recessed panel seams
  for (let x = 20; x < 320; x += 60) r(x, 0, 1, 20, 7);
  r(0, 3, 320, 1, 7);
  // two recessed light strips (P7 housings, inner white rows)
  for (const lx of [70, 200]) {
    r(lx, 8, 50, 5, 7);
    r(lx + 2, 9, 46, 3, 15);
    r(lx + 2, 12, 46, 1, 14);           // warm under-glow
    r(lx, 8, 50, 1, 8);                 // housing shadow lip
  }
  r(0, 20, 320, 2, 7);                  // ceiling/wall shadow seam

  // ---- 2. recording light (294..302, 6..12) — red since 2023 ----
  r(293, 5, 10, 8, 8);                  // mount shadow
  r(294, 6, 8, 6, 0);                   // housing
  r(296, 7, 4, 3, frame % 12 < 6 ? 4 : 8);
  if (frame % 12 < 6) r(297, 6, 2, 1, 12); // hot glint when on

  // ================= 3. BACK WALL (22..145) =================
  r(0, 22, 320, 123, 15);
  // Google primary trim stripe
  r(0, 24, 320, 4, 1);                  // blue band
  r(0, 28, 320, 1, 4);                  // red pin-line
  r(0, 29, 320, 1, 14);                 // yellow pin-line
  // faint wall panel seams (keeps the white from being empty)
  for (let x = 8; x < 320; x += 78) r(x, 32, 1, 106, 7);
  r(0, 138, 320, 2, 7);                 // wall foot shading
  r(0, 140, 320, 5, 7);                 // baseboard
  r(0, 140, 320, 1, 8);
  r(0, 144, 320, 1, 8);

  // ================= 6. GLASS BOARD (14..86, 38..104) =================
  r(12, 36, 76, 72, 8);                 // drop shadow behind
  r(14, 38, 72, 66, 7);                 // frame
  r(17, 41, 66, 60, 11);                // glass
  // stepped diagonal highlight streak
  for (let i = 0; i < 12; i++) r(64 - i * 4, 44 + i * 4, 4, 1, 15);
  for (let i = 0; i < 9; i++) r(76 - i * 4, 46 + i * 4, 3, 1, 15);
  // half-erased flowchart: 2 solid boxes, 3 ghost outlines
  r(22, 48, 14, 9, 8);                  // שלב 1 — solid
  r(24, 50, 10, 1, 11); r(24, 53, 8, 1, 11);
  r(58, 84, 14, 9, 8);                  // שלב 4 — solid
  r(60, 86, 10, 1, 11); r(60, 89, 8, 1, 11);
  // ghosts (1px outlines only)
  const ghost = (gx, gy) => { r(gx, gy, 14, 1, 7); r(gx, gy + 8, 14, 1, 7); r(gx, gy, 1, 9, 7); r(gx + 13, gy, 1, 9, 7); };
  ghost(46, 48); ghost(24, 66); ghost(52, 66);
  // connector remnants
  r(36, 52, 10, 1, 8); r(38, 75, 14, 1, 7);
  // lone red arrow pointing OFF the board into the wall
  r(66, 60, 14, 2, 4); r(78, 58, 2, 6, 4); r(80, 59, 2, 4, 4); r(82, 60, 2, 2, 4);
  // marker tray + one dead red marker
  r(16, 104, 68, 3, 7); r(16, 106, 68, 1, 8);
  r(30, 102, 12, 2, 4); r(40, 102, 2, 2, 8);

  // ================= 4. GIANT VIDEOCALL SCREEN (96..224, 30..92) =================
  r(94, 92, 132, 3, 8);                 // shadow under screen
  r(96, 30, 128, 62, 0);                // bezel
  r(99, 33, 122, 56, 8);                // interior
  // call-title strip (y=36..44): green block-text + blinking LIVE dot
  r(102, 36, 76, 6, 10);
  r(104, 38, 20, 2, 8); r(128, 38, 12, 2, 8); r(144, 38, 26, 2, 8);
  r(182, 37, 5, 5, frame % 16 < 8 ? 4 : 8);   // live dot
  r(190, 38, 28, 3, 7);                        // timer readout (six hours...)
  // three video squares 36x28 at y=48..76
  const vx = [102, 142, 182];
  const shirt = [1, 7, 2];              // blue / gray / green shirts
  for (let i = 0; i < 3; i++) {
    const x = vx[i];
    r(x, 48, 36, 28, 9);                // video bg
    r(x + 8, 70, 20, 6, shirt[i]);      // shoulders
    r(x + 12, 57, 12, 10, 6);           // face
    r(x + 12, 55, 12, 3, 0);            // hair slab
    r(x + 14, 60, 2, 2, 0); r(x + 20, 60, 2, 2, 0); // eyes
    r(x + 15, 65, 6, 1, 0);             // mouth
    r(x, 48, 36, 1, 15);                // top glare
    r(x, 75, 36, 1, 8);                 // bottom vignette
  }
  // middle head FREEZES: pixelation blocks + orbiting spinner
  if (frame % 50 < 22) {
    r(146, 52, 6, 4, 8); r(158, 58, 6, 4, 7); r(150, 64, 6, 4, 8);
    r(164, 50, 6, 4, 7); r(144, 68, 6, 4, 8);
    const orb = [[158, 58], [160, 58], [162, 58], [162, 60], [162, 62], [160, 62], [158, 62], [158, 60]];
    const o = orb[frame % 8];
    r(o[0], o[1], 2, 2, 15);            // spinner pixel
  }

  // ================= 5. COMMITTEE NAME PLAQUE (112..208, 96..114) =================
  r(111, 95, 98, 20, 0);                // frame
  r(112, 96, 96, 18, 14);               // yellow board
  r(112, 96, 96, 1, 15);                // top shine
  // TOP ROW cycles — the committee renaming itself in realtime
  const namePat = [
    [6, 10, 8, 14, 6],
    [12, 6, 16, 8],
    [8, 8, 8, 8, 8],
    [18, 6, 10, 12],
  ][Math.floor(frame / 35) % 4];
  let nx = 118;
  for (const w of namePat) { r(nx, 99, w, 3, 0); nx += w + 4; }
  // BOTTOM ROW constant ("ועדת" never changes)
  r(118, 106, 14, 3, 0); r(136, 106, 22, 3, 0); r(162, 106, 10, 3, 0); r(176, 106, 18, 3, 0);
  // pile of discarded plaque slats below-right
  r(200, 116, 10, 24, 8);
  r(199, 120, 12, 2, 7); r(199, 127, 12, 2, 7); r(199, 134, 12, 2, 7);
  r(200, 116, 10, 1, 0);

  // ================= 7. WINDOW TO COURTYARD (238..306, 36..104) =================
  r(236, 34, 72, 74, 8);                // recess shadow
  r(238, 36, 68, 68, 7);                // frame
  r(241, 39, 62, 62, 9);                // sky
  r(241, 70, 62, 31, 3);                // lawn (too-perfect corporate turf)
  r(241, 70, 62, 1, 10);                // lawn edge highlight
  for (let x = 244; x < 300; x += 9) r(x, 76 + (x % 3) * 6, 2, 1, 10); // grass tufts
  // sun sliver + cloud
  r(246, 43, 8, 4, 14); r(266, 46, 14, 3, 15);
  // abandoned slide (P12 per design): stepped diagonal from y=60 to lawn
  const slide = [];
  for (let i = 0; i < 7; i++) slide.push([288 - i * 6, 58 + i * 5]);
  r(292, 52, 6, 8, 12);                 // slide mouth (from floor 2)
  for (const [sx, sy] of slide) { r(sx, sy, 8, 4, 12); r(sx, sy + 4, 8, 1, 4); }
  r(244, 90, 14, 3, 7);                 // puddle of dust at the bottom
  r(246, 89, 10, 1, 8);
  // support posts
  r(250, 93, 2, 8, 8); r(284, 74, 2, 27, 8);
  // ghost "wheee" pixel — slides down once every ~6s
  {
    const t = frame % 60;
    if (t < 7) { const g = slide[t]; r(g[0] + 3, g[1] - 2, 2, 2, 15); }
  }
  // window cross mullion (over the view)
  r(238, 68, 68, 2, 7); r(271, 36, 2, 68, 7);
  r(238, 36, 68, 1, 15); r(238, 103, 68, 1, 8);

  // ================= 13. FLOOR (145..200) =================
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 2, 8);                 // wall contact shadow
  // sparse carpet dither (1px flecks, staggered)
  for (let y = 151; y < 200; y += 7)
    for (let x = ((y / 7) % 2) * 12 + 5; x < 320; x += 30) r(x, y, 1, 1, 8);
  // perspective seams
  r(0, 162, 320, 1, 8); r(0, 182, 320, 1, 8);
  for (let x = 20; x < 320; x += 40) r(x, 163, 1, 37, 8);
  // blue accent carpet tile
  r(40, 170, 16, 8, 1); r(40, 170, 16, 1, 9);
  // scuff arc — the pacing route of presenters past
  for (let i = 0; i < 9; i++) r(70 + i * 22, 172 + Math.round(Math.sin(i * 0.7) * 4), 8, 1, 8);
  // ---- 14. bottom exit threshold ----
  r(120, 196, 80, 4, 8);
  r(120, 196, 80, 1, 0);

  // ================= 8. SIDE TABLE + SANDWICH TRAY (252..306) =================
  r(255, 124, 4, 21, 6); r(299, 124, 4, 21, 6);   // wooden legs
  r(255, 124, 4, 21, 6); r(255, 124, 1, 21, 14);  // leg highlights
  r(299, 124, 1, 21, 14);
  r(257, 128, 44, 2, 8);                           // stretcher bar shadow
  r(252, 117, 54, 7, 6);                           // wood slab
  r(252, 117, 54, 1, 14);                          // top light
  r(252, 123, 54, 1, 0);                           // outline
  r(251, 117, 1, 7, 0); r(306, 117, 1, 7, 0);      // side outlines
  r(250, 145, 58, 3, 8);                           // floor shadow
  // empty tray: 36x5 at y=113..118 — crumbs + one crumpled napkin
  r(262, 113, 36, 5, 7);
  r(262, 113, 36, 1, 15); r(262, 117, 36, 1, 8);
  r(266, 115, 1, 1, 6); r(271, 114, 1, 1, 6); r(276, 116, 1, 1, 6);
  r(283, 115, 1, 1, 6); r(288, 114, 1, 1, 6); r(293, 116, 1, 1, 6);
  r(285, 112, 5, 3, 15); r(286, 111, 3, 1, 15);   // napkin, squeezed dry

  // ================= 12a. REGULAR CHAIRS behind the table (backs peek over it) ==
  for (const cx of [110, 140, 196, 226]) {
    r(cx + 1, 115, 10, 3, 8);           // rounded top
    r(cx, 118, 12, 12, 8);              // back (bottom hidden by table)
    r(cx + 1, 115, 10, 1, 7);           // top edge light
    r(cx, 118, 1, 12, 0); r(cx + 11, 118, 1, 12, 0);
    r(cx + 3, 121, 6, 1, 0);            // lumbar seam
  }

  // wall clock (225..235, 108..122) — hour six and counting
  r(225, 108, 10, 14, 0);
  r(227, 107, 6, 1, 0); r(227, 122, 6, 1, 0);      // rounded top/bottom
  r(226, 109, 8, 12, 15);
  r(229, 110, 1, 1, 8); r(229, 119, 1, 1, 8);      // 12 & 6 ticks
  r(227, 114, 1, 1, 8); r(232, 114, 1, 1, 8);      // 9 & 3 ticks
  r(229, 111, 1, 4, 0);                            // minute hand up
  r(230, 114, 3, 1, 0);                            // hour hand — pointing at despair
  r(233, 109 + (frame % 8), 1, 1, 4);              // red second-dot crawling down

  // ================= 9. ELLIPTICAL CONFERENCE TABLE =================
  r(90, 152, 140, 6, 8);                // shadow band under table
  r(104, 158, 112, 4, 8);               // deeper core shadow
  // stepped fake ellipse, white top
  r(104, 124, 112, 4, 15);
  r(92, 128, 136, 4, 15);
  r(84, 132, 152, 14, 15);
  r(92, 146, 136, 4, 15);
  r(104, 150, 112, 2, 15);
  // rims: light gray on lower steps + contour
  r(92, 149, 136, 1, 7);
  r(104, 151, 112, 1, 7);
  r(104, 123, 112, 1, 7);               // top contour
  r(92, 127, 12, 1, 7); r(216, 127, 12, 1, 7);   // step contours
  r(84, 131, 8, 1, 7); r(228, 131, 8, 1, 7);
  r(84, 132, 1, 14, 7); r(235, 132, 1, 14, 7);
  r(104, 152, 112, 1, 8);               // under-lip
  // pedestal legs — the table does not float, it merely wishes to
  for (const lx of [136, 174]) {
    r(lx - 2, 164, 14, 3, 8);           // foot shadow
    r(lx, 153, 10, 12, 8);              // column
    r(lx, 153, 1, 12, 7);               // lit edge
    r(lx + 9, 153, 1, 12, 0);           // dark edge
    r(lx - 1, 163, 12, 2, 0);           // base plate
  }
  // shading dither on the near half of the tabletop (sells the ellipse)
  for (let x = 88; x < 232; x += 4) r(x, 147, 2, 1, 7);
  for (let x = 106; x < 214; x += 4) r(x + 2, 150, 2, 1, 7);
  // subtle sheen + scattered meeting debris
  r(120, 127, 60, 1, 11);
  r(196, 136, 10, 3, 15); r(196, 136, 10, 1, 7);  // untouched agenda paper
  r(110, 140, 8, 2, 15); r(110, 140, 8, 1, 7);    // another handout

  // ---- 10. spider phone (150..170, 132..142) — on a call since 2023 ----
  r(154, 134, 12, 5, 0);                // body slab
  r(150, 140, 3, 2, 0); r(167, 140, 3, 2, 0); r(158, 130, 3, 2, 0); // leg nubs
  r(156, 132, 8, 2, 0);
  r(163, 135, 2, 2, frame % 8 < 4 ? 10 : 2);      // LED — heart that gave up
  r(155, 134, 4, 1, 8);                 // speaker grill hint

  // ================= 11. HEAD CHAIR (60..82, 112..156) — nobody survived it ====
  r(62, 154, 20, 3, 8);                 // floor shadow
  r(62, 112, 18, 28, 0);                // tall black back
  r(63, 113, 2, 26, 8);                 // sheen edge
  r(60, 128, 3, 6, 8); r(79, 128, 4, 6, 8);       // arm nubs
  r(64, 140, 14, 6, 0);                 // seat
  r(70, 146, 3, 8, 0);                  // stem
  r(64, 152, 16, 4, 0);                 // star base
  r(60, 154, 4, 2, 0); r(78, 154, 4, 2, 0);
  r(68, 116, 6, 2, 7);                  // "שמור ליו\"ר" label plate

  // ================= 12b. FRONT CHAIRS (this side of the table) =================
  for (const cx of [118, 188]) {
    r(cx, 168, 18, 3, 8);               // floor shadow
    r(cx + 1, 150, 14, 12, 8);          // back
    r(cx + 1, 150, 14, 1, 7);
    r(cx, 162, 16, 5, 8);               // seat
    r(cx, 162, 16, 1, 7);
    r(cx + 6, 167, 4, 4, 0);            // base
    r(cx + 2, 170, 12, 2, 0);
    r(cx, 150, 1, 17, 0); r(cx + 15, 150, 1, 17, 0);
  }
}
