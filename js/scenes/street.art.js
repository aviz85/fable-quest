// street.art.js — רחוב אלנבי, 2027. Bauhaus + neon + shwarma. Faction: hub.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- 1. SKY — dithered sunset (light source: upper-left) ----------
  r(0, 0, 320, 25, 5);                                   // deep magenta top
  for (let y = 25; y < 45; y += 2)                       // P5/P12 strip dither
    for (let x = 0; x < 320; x += 4) { r(x, y, 2, 2, 5); r(x + 2, y, 2, 2, 12); }
  r(0, 45, 320, 13, 12);                                 // light red band
  for (let y = 58; y < 70; y += 2)                       // P12/P14 strip dither
    for (let x = 0; x < 320; x += 4) { r(x, y, 2, 2, 12); r(x + 2, y, 2, 2, 14); }
  r(0, 70, 320, 8, 14);                                  // yellow glow line
  // setting sun, upper-left (the light source)
  r(30, 14, 24, 18, 14); r(34, 10, 16, 26, 14); r(26, 18, 32, 10, 14);
  r(38, 16, 8, 14, 15); r(34, 20, 16, 6, 15);            // hot core
  r(14, 22, 8, 2, 14); r(62, 22, 8, 2, 14); r(40, 2, 4, 4, 14); // rays
  // thin dusk cloud streaks + birds heading home
  r(120, 8, 46, 2, 12); r(150, 12, 30, 2, 12); r(210, 6, 38, 2, 12); r(250, 16, 26, 2, 12);
  r(190, 20, 3, 1, 0); r(193, 19, 3, 1, 0); r(196, 20, 3, 1, 0);   // bird
  r(228, 28, 3, 1, 0); r(231, 27, 3, 1, 0); r(234, 28, 3, 1, 0);   // bird

  // ---------- 2. FAR SKYLINE in the gap (x110..170) ----------
  r(112, 62, 16, 48, 8); r(130, 50, 14, 60, 8); r(148, 68, 20, 42, 8); r(160, 40, 12, 70, 8);
  r(126, 74, 6, 36, 0); r(154, 56, 6, 54, 0);            // nearer dark towers for depth
  // tiny lit windows
  r(115, 70, 2, 3, 14); r(121, 82, 2, 3, 14); r(134, 58, 2, 3, 14);
  r(138, 74, 2, 3, 14); r(152, 76, 2, 3, 14); r(163, 48, 2, 3, 14); r(163, 62, 2, 3, 14);
  // side street receding between the two Bauhaus buildings
  r(110, 100, 62, 45, 0);                                // shadowed alley walls
  r(112, 100, 60, 2, 8);                                 // rooftop lip catching light
  r(136, 102, 14, 10, 8);                                // far facade at end of street
  r(139, 104, 3, 4, 14); r(144, 104, 3, 4, 14);          //   lit windows there
  // road widening toward viewer (dusk-lit trapezoid)
  r(141, 112, 6, 4, 8);
  r(138, 116, 12, 5, 7);
  r(133, 121, 22, 7, 7);
  r(127, 128, 34, 8, 7);
  r(121, 136, 46, 9, 7);
  r(143, 120, 2, 25, 8);                                 // center line in shade
  r(142, 112, 2, 2, 14); r(147, 124, 3, 2, 14);          // distant streetlamp glows
  // lit windows on the alley walls (aligned rows)
  r(115, 106, 3, 4, 14); r(115, 118, 3, 4, 14); r(115, 130, 3, 4, 14);
  r(163, 106, 3, 4, 14); r(163, 118, 3, 4, 14);

  // ---------- 3. BAUHAUS BUILDING LEFT (x0-112, y45-145) ----------
  r(0, 45, 112, 100, 15);                                // white face
  r(104, 45, 8, 100, 7);                                 // right-edge shading (light from left)
  r(0, 45, 112, 2, 0); r(110, 45, 2, 100, 0);            // outline
  // peeling plaster patches
  r(8, 58, 14, 6, 7); r(70, 90, 10, 8, 7); r(30, 128, 8, 5, 7); r(90, 60, 7, 9, 7);
  // rounded balconies — 3 stepped rects each, top-lit, with railing lines
  for (let by = 60; by <= 110; by += 25) {
    r(60, by - 4, 42, 4, 0);                             // dark doorway behind balcony
    r(58, by + 8, 44, 8, 7); r(62, by + 4, 40, 4, 7); r(66, by, 36, 4, 15);
    r(58, by + 15, 44, 2, 0);                            // shadow under balcony
    r(58, by + 8, 2, 8, 0); r(62, by + 4, 2, 4, 0);      // rounded left steps outline
    r(66, by, 2, 4, 0);
    for (let bx = 70; bx < 100; bx += 6) r(bx, by - 3, 1, 3, 0); // railing bars
  }
  // windows 8x10, mostly dark, a few lit
  const litL = [1, 4];
  for (let i = 0; i < 6; i++) {
    const wx = 10 + (i % 3) * 16, wy = 62 + Math.floor(i / 3) * 26;
    r(wx, wy, 8, 10, litL.includes(i) ? 14 : 0);
    r(wx, wy, 8, 1, 8);                                  // lintel shadow
  }
  r(10, 114, 8, 10, 0); r(26, 114, 8, 10, 14); r(42, 114, 8, 10, 0);

  // ---------- 5. BAUHAUS BUILDING RIGHT (x252-320, y55-145) — in shadow ----------
  r(252, 55, 68, 90, 7);
  r(252, 55, 4, 90, 8);                                  // left edge darker (faces away from sun)
  r(252, 55, 68, 2, 0); r(252, 55, 2, 90, 0);            // outline
  // mirrored balconies with white highlights (stepped, outlined, railed)
  for (let by = 68; by <= 118; by += 25) {
    r(256, by - 4, 34, 4, 0);                            // dark doorway behind
    r(256, by + 8, 38, 7, 8); r(256, by + 4, 34, 4, 7); r(256, by, 30, 4, 15);
    r(256, by + 15, 38, 2, 0);                           // shadow under balcony
    r(293, by + 8, 1, 7, 0); r(289, by + 4, 1, 4, 0); r(285, by, 1, 4, 0); // rounded right steps
    for (let bx = 260; bx < 284; bx += 6) r(bx, by - 3, 1, 3, 0);          // railing bars
  }
  // windows, a couple lit
  r(298, 66, 8, 10, 0); r(298, 92, 8, 10, 14); r(298, 118, 8, 10, 0);
  r(298, 66, 8, 1, 0); r(298, 92, 8, 1, 0); r(298, 118, 8, 1, 8);

  // ---------- 6. ELECTRIC POLE + CABLE CHAOS ----------
  // cables sag in steps toward both buildings (behind pole, y32-56)
  const sag = (x1, y1, x2, y2, steps) => {
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = Math.round(x1 + (x2 - x1) * t);
      const y = Math.round(y1 + (y2 - y1) * t + Math.sin(t * Math.PI) * 5);
      r(x, y, Math.ceil(Math.abs(x2 - x1) / steps) + 1, 1, 0);
    }
  };
  sag(0, 34, 118, 32, 10); sag(0, 44, 118, 40, 10);
  sag(124, 32, 252, 42, 10); sag(124, 40, 252, 56, 10);
  sag(124, 48, 174, 76, 6);                              // one cable stolen down to the stand
  r(118, 30, 6, 120, 8);                                 // pole
  r(118, 30, 6, 2, 0); r(118, 30, 1, 120, 0);            // pole outline hints
  r(110, 33, 22, 3, 8); r(112, 40, 18, 3, 8);            // crossarms
  // transformer box + blinking LED
  r(114, 60, 14, 15, 8); r(114, 60, 14, 2, 0); r(114, 74, 14, 1, 0);
  if (frame % 20 < 10) r(119, 66, 3, 3, 12);

  // ---------- 7+8. SHAWARMA STAND (x170-250, y80-150) ----------
  // neon sign board
  r(173, 78, 74, 19, 0);                                 // black board w/ margin
  const neon = frame % 14 < 7 ? 12 : 13;
  // "letters" = bar blocks, 3rd one burnt out (P8) — it's Tel Aviv
  for (let i = 0; i < 6; i++) {
    const c = i === 2 ? 8 : neon;
    const lx = 179 + i * 11;
    r(lx, 82, 7, 10, c); r(lx + 2, 84, 3, 6, 0);         // hollow block letter
  }
  r(173, 78, 74, 1, neon); r(173, 96, 74, 1, neon);      // neon tube border
  // stand back wall (shade under roof)
  r(170, 100, 80, 26, 8);
  // heat element behind spit (red glow bars)
  r(179, 105, 4, 22, 4); r(180, 107, 2, 18, 12);
  // spit pole
  r(189, 100, 2, 28, 7); r(187, 99, 6, 2, 7);            // top handle
  // meat cone x183-197, y105-126 with animated roasting stripes
  r(184, 105, 12, 5, 6); r(183, 110, 14, 8, 6); r(184, 118, 12, 4, 6); r(185, 122, 10, 4, 6);
  const off = (frame * 2) % 6;
  for (let sy = 105 + off; sy < 126; sy += 6) {
    const w = sy < 110 ? 10 : sy < 118 ? 12 : sy < 122 ? 10 : 8;
    r(190 - w / 2, sy, w, 2, 14);
  }
  r(185, 107, 3, 1, 12); r(185, 115, 2, 1, 12);          // seared glow near heat element
  r(183, 105, 1, 21, 0); r(196, 105, 1, 21, 0);          // cone outline
  r(186, 126, 8, 1, 0);                                  // drip pan hint
  // sechach roof y96-108
  r(168, 97, 84, 12, 6);
  for (let x = 170; x < 250; x += 6) r(x, 99, 3, 8, 14);
  r(168, 97, 84, 1, 0); r(168, 108, 84, 1, 0);
  // ---------- 9. SHLOMO behind counter (hotspot 214,103,20,24) ----------
  const nudge = frame % 30 < 4 ? -4 : 0;                 // arm nudges the spit every ~3s
  r(218, 107, 12, 10, 6);                                // round head, tucked under the roof
  r(219, 106, 10, 1, 0); r(217, 109, 1, 6, 0); r(230, 109, 1, 6, 0);
  r(220, 110, 2, 2, 0); r(226, 110, 2, 2, 0);            // eyes
  r(220, 114, 8, 2, 0);                                  // mustache
  r(216, 117, 16, 10, 15);                               // white apron body
  r(216, 117, 16, 1, 0); r(216, 117, 1, 10, 0); r(231, 117, 1, 10, 0);
  r(212 + nudge, 118, 5, 3, 6);                          // left arm (toward spit)
  r(231, 119, 4, 3, 6);                                  // right arm
  // counter y125-150 (in front of Shlomo)
  r(170, 125, 80, 25, 6);
  r(170, 125, 80, 2, 15);                                // lit top edge
  r(170, 125, 1, 25, 0); r(249, 125, 1, 25, 0); r(170, 149, 80, 1, 0); r(170, 127, 80, 1, 0);
  r(176, 132, 20, 3, 8); r(220, 138, 16, 3, 8);          // counter grime panels
  // stand posts
  r(170, 109, 3, 16, 6); r(247, 109, 3, 16, 6);

  // ---------- 12. SIDEWALK (y145-200) — paving slabs + checker dither ----------
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 1, 15);                                 // sunlit curb lip
  r(0, 146, 320, 2, 8);                                  // curb line
  // paving slab joints, spaced wider toward viewer; staggered vertical joints
  const joints = [152, 158, 166, 176, 188];
  let prev = 148;
  for (let j = 0; j <= joints.length; j++) {
    const jy = j < joints.length ? joints[j] : 200;
    if (j < joints.length) r(0, jy, 320, 1, 8);
    const slabW = 24 + j * 10;                           // slabs grow closer
    for (let x = (j % 2) * (slabW >> 1); x < 320; x += slabW) r(x, prev + 1, 1, jy - prev - 1, 8);
    // 2x2 checker dither: dense far (darker), sparse near (lit by sunset)
    const cell = 2 + (joints.length - j) * 2;
    for (let y = prev + 2; y < jy - 1; y += 4)
      for (let x = ((y >> 1) % 2) * cell; x < 320; x += cell * 2) r(x, y, 2, 2, 8);
    prev = jy;
  }
  // plastic crates against the left building (Tel Aviv essentials)
  r(94, 132, 14, 8, 1); r(94, 140, 14, 8, 1);
  r(94, 132, 14, 1, 9); r(94, 140, 14, 1, 9);            // lit top edges
  r(94, 132, 1, 16, 0); r(107, 132, 1, 16, 0); r(94, 147, 14, 1, 0); r(94, 139, 14, 1, 0);
  r(97, 134, 2, 4, 0); r(102, 134, 2, 4, 0); r(97, 142, 2, 4, 0); r(102, 142, 2, 4, 0); // slots
  // historic grease stain near the stand
  r(200, 168, 20, 6, 8); r(204, 166, 10, 2, 8); r(206, 174, 8, 2, 8);
  // long shadows from sunset (cast right-ward from stand & pole)
  r(250, 150, 30, 3, 8); r(124, 150, 20, 2, 8);

  // ---------- 4. WAR POSTERS on left wall (x14-58, y102-140) ----------
  r(14, 103, 20, 26, 15);                                // poster 1 (white, crooked)
  r(15, 102, 19, 2, 15);
  r(16, 106, 16, 3, 4); r(16, 112, 14, 2, 0); r(16, 116, 16, 2, 0); r(16, 120, 10, 2, 0);
  r(16, 124, 15, 2, 4);
  r(30, 125, 4, 4, 7);                                   // peeling corner
  r(38, 108, 20, 30, 14);                                // poster 2 (yellow)
  r(40, 112, 16, 3, 0); r(40, 118, 12, 2, 4); r(40, 122, 16, 2, 0); r(40, 127, 14, 2, 0);
  r(40, 132, 8, 2, 4);
  r(14, 103, 1, 26, 0); r(38, 108, 1, 30, 0);            // poster edges

  // ---------- 10. WAYMO parked (x22-88, y126-154) — closest object left ----------
  r(30, 155, 56, 4, 8);                                  // ground shadow
  // spinning lidar x50-58 y120-126 (black casing so it pops off the white wall)
  r(48, 118, 12, 9, 0);
  const lhalf = frame % 6 < 3;
  r(50, 120, 4, 6, lhalf ? 13 : 5); r(54, 120, 4, 6, lhalf ? 5 : 13);
  r(46, 126, 16, 3, 7); r(46, 126, 16, 1, 15);           // lidar mount
  // rounded white pod (stacked rects)
  r(30, 129, 48, 6, 15);
  r(24, 134, 60, 8, 15);
  r(22, 141, 64, 9, 15);
  r(24, 149, 60, 3, 7);                                  // under-shadow band
  r(22, 141, 2, 9, 7); r(84, 141, 2, 9, 7);              // side shading
  // outline
  r(30, 128, 48, 1, 0); r(28, 133, 4, 1, 0); r(76, 133, 4, 1, 0);
  r(22, 140, 4, 1, 0); r(82, 140, 4, 1, 0); r(22, 141, 1, 9, 0); r(85, 141, 1, 9, 0);
  // windows P11
  r(32, 131, 14, 8, 11); r(48, 131, 12, 8, 11); r(62, 131, 14, 8, 11);
  r(46, 131, 2, 8, 0); r(60, 131, 2, 8, 0);
  // sensor "eyes" front + the smiling bumper
  r(24, 143, 4, 3, 0); r(30, 144, 3, 2, 0);
  r(26, 147, 12, 2, 0);                                  // the smile. it's not a good smile.
  // wheels y148-154
  r(30, 148, 10, 6, 0); r(66, 148, 10, 6, 0);
  r(33, 150, 4, 2, 8); r(69, 150, 4, 2, 8);              // hubcaps
  // charging cable to the pole (stealing electricity)
  r(88, 146, 30, 1, 0); r(117, 130, 1, 17, 0);

  // electric pole base standing ON the sidewalk (redrawn over it) + shadow
  r(118, 145, 6, 7, 8); r(118, 145, 1, 7, 0);
  r(124, 151, 14, 2, 8);                                 // pole shadow cast right

  // ---------- 11. STREET CAT (x256-268, y150-158) ----------
  r(256, 152, 10, 5, 0);                                 // body
  r(264, 149, 4, 4, 0);                                  // head
  r(264, 147, 1, 2, 0); r(267, 147, 1, 2, 0);            // ears
  r(255, 147, 1, 6, 0);                                  // tail up
  r(257, 156, 1, 2, 0); r(263, 156, 1, 2, 0);            // legs
  if (frame % 40 >= 3) { r(265, 150, 1, 1, 14); r(267, 150, 1, 1, 14); } // eyes (blink)
}
