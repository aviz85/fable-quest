// openai_stage.art.js — במת הקינוט (OpenAI chapter, keynote stage)
// 320x200 EGA, Sierra SCI0. fillRect only.
// Dark keynote hall: black P0, silhouette gray P8, spotlights P15/P7,
// ice-blue screen P9/P11, hype yellow P14.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };
  // fake-transparent light: 1px-on / 1px-off vertical strips
  const dith = (x, y, w, h, c) => { for (let i = 0; i < w; i += 2) r(x + i, y, 1, h, c); };

  // ---------- void ----------
  r(0, 0, 320, 200, 0);

  // ---------- ceiling rig (0..20) ----------
  r(0, 6, 320, 3, 8);                                          // lighting truss
  for (let x = 16; x < 320; x += 32) r(x, 5, 1, 5, 8);         // truss ties
  for (const lx of [40, 104, 189, 250]) {                      // spot fixtures
    r(lx - 4, 9, 8, 6, 7);
    r(lx - 3, 10, 6, 2, 8);
    r(lx - 2, 15, 4, 2, 14);                                   // hot lens
  }

  // ---------- acoustic curtains, both wings (y 18..128) ----------
  for (let x = 4; x < 54; x += 8) r(x, 18, 2, 110, 8);
  for (let x = 268; x < 318; x += 8) r(x, 18, 2, 110, 8);

  // ---------- GIANT SCREEN (58,18,204,76) ----------
  r(54, 14, 212, 84, 8);                                       // bezel
  r(56, 16, 208, 80, 0);                                       // inner shadow gap
  r(58, 18, 204, 76, 1);                                       // deep-blue field
  r(58, 18, 204, 1, 9);                                        // top screen glow line
  // corporate logo block (140,26,24,8)
  r(140, 26, 24, 8, 15);
  r(142, 28, 8, 4, 9);                                         // logo "eye" notch
  // THE GRAPH — only goes up. steps P9 from (70,84) to (246,34)
  let gx = 70, gy = 84;
  for (let i = 0; i < 8; i++) {
    r(gx, gy, 22, 3, 9);
    r(gx, gy, 22, 1, 11);                                      // lit top edge
    if (i < 7) r(gx + 20, gy - 6, 3, 9, 9);
    gx += 22; gy -= 6;
  }
  r(70, 88, 176, 1, 8);                                        // graph baseline shade
  // axis ticks — investor-grade rigor
  for (let tx = 70; tx <= 246; tx += 44) r(tx, 90, 1, 3, 8);
  // blinking endpoint — the future, live
  if (frame % 8 < 4) { r(243, 31, 6, 6, 15); } else { r(244, 32, 4, 4, 9); }
  // "SOON" — yellow block letters, drifting 1px (a promise that moves)
  const dx = frame % 20 < 10 ? 0 : 1;
  const S = (x, y) => { r(x, y, 9, 2, 14); r(x, y, 2, 6, 14); r(x, y + 5, 9, 2, 14); r(x + 7, y + 6, 2, 5, 14); r(x, y + 10, 9, 2, 14); };
  const O = (x, y) => { r(x, y, 9, 2, 14); r(x, y + 10, 9, 2, 14); r(x, y, 2, 12, 14); r(x + 7, y, 2, 12, 14); };
  const N = (x, y) => { r(x, y, 2, 12, 14); r(x + 7, y, 2, 12, 14); r(x + 2, y + 2, 2, 4, 14); r(x + 4, y + 5, 2, 4, 14); };
  S(197 + dx, 66); O(210 + dx, 66); O(223 + dx, 66); N(236 + dx, 66);
  // screen light spilling into the dark hall below the bezel
  dith(58, 98, 204, 3, 1);
  dith(70, 101, 180, 2, 1);

  // ---------- spotlight beams (dithered = fake translucent) ----------
  // smooth cone: short slices, width grows with y.
  // beams are invisible against the lit screen (58..262 x 18..96) — clip there.
  const beam = (cx, y0, y1, w0, w1, c) => {
    for (let y = y0; y < y1; y += 4) {
      const t = (y - y0) / (y1 - y0);
      const w = Math.round(w0 + (w1 - w0) * t);
      const step = y < 96 ? 4 : 2;
      for (let i = 0; i < w; i += step) {
        const px = cx - (w >> 1) + i;
        if (y < 96 && y >= 18 && px >= 56 && px < 264) continue;   // behind screen glare
        r(px, y, 1, Math.min(4, y1 - y), c);
      }
    }
  };
  beam(189, 16, 148, 4, 34, 7);                                // center beam → pedestal
  beam(189, 96, 148, 6, 10, 15);                               // hot core below screen
  // stepped cone edges — very Sierra, reads as a real trapezoid of light
  const edges = (cx, y0, y1, w0, w1, c) => {
    for (let y = y0; y < y1; y += 6) {
      const t = (y - y0) / (y1 - y0);
      const w = Math.round(w0 + (w1 - w0) * t);
      const lx = cx - (w >> 1), rx = cx + (w >> 1);
      if (!(y < 96 && y >= 18 && lx >= 56 && lx < 264)) r(lx, y, 1, 6, c);
      if (!(y < 96 && y >= 18 && rx >= 56 && rx < 264)) r(rx, y, 1, 6, c);
    }
  };
  edges(189, 16, 148, 4, 34, 7);
  beam(104, 16, 150, 4, 30, 7);                                // left beam → presenter
  edges(104, 16, 150, 4, 30, 7);
  // roving beam — scans the crowd for the most excited face
  const bx = 44 + (frame * 3) % 200;
  beam(bx, 16, 200, 4, 26, 7);

  // ---------- stage floor (128..180) ----------
  r(0, 128, 320, 52, 8);                                       // dark stage boards
  dith(62, 129, 196, 4, 1);                                    // screen glow spilling on upstage boards
  r(132, 128, 86, 52, 7);                                      // lit center apron
  dith(120, 128, 12, 52, 7);                                   // blended apron edges
  dith(218, 128, 12, 52, 7);
  r(0, 128, 320, 3, 0);                                        // upstage shadow line
  r(0, 154, 320, 1, 0);                                        // board seam
  r(0, 168, 320, 1, 0);                                        // board seam (closer)
  // light pools
  r(166, 148, 48, 10, 15);                                     // under pedestal
  r(160, 158, 60, 3, 7);
  r(90, 150, 38, 8, 15);                                       // under presenter
  r(86, 158, 46, 3, 7);
  // stage lip
  r(0, 180, 320, 2, 15);

  // ---------- cleaning cart, your getaway vehicle (12,134,34,26) ----------
  r(11, 133, 36, 24, 0);                                       // outline
  r(12, 134, 34, 22, 7);
  r(12, 134, 34, 2, 15);                                       // top glint
  r(13, 140, 32, 1, 8);                                        // rail seam
  r(14, 145, 12, 8, 8);                                        // gray-water hatch
  // yellow bucket riding shotgun (16,128,10,8)
  r(15, 127, 12, 10, 0);
  r(16, 128, 10, 8, 14);
  r(17, 129, 8, 2, 8);                                         // murky water. perfect.
  // mop stored head-up in the cart — stepped diagonal handle out of the rig
  r(42, 128, 2, 7, 6); r(40, 122, 2, 7, 6); r(38, 116, 2, 7, 6); r(36, 110, 2, 7, 6);
  r(31, 102, 12, 8, 8);                                        // rag mop head, proudly gray
  r(32, 103, 2, 6, 7); r(36, 103, 2, 6, 7); r(40, 103, 2, 6, 7);
  r(31, 109, 12, 1, 0);
  // wheels
  r(15, 156, 5, 4, 0); r(38, 156, 5, 4, 0);
  r(10, 160, 40, 2, 0);                                        // floor shadow

  // ---------- lectern (78,132,26,22) ----------
  r(77, 131, 28, 24, 0);
  r(78, 132, 26, 22, 8);
  r(78, 132, 26, 2, 7);                                        // top edge catches light
  r(86, 140, 10, 5, 15);                                       // tiny logo plate
  r(88, 141, 6, 1, 8);

  // ---------- THE PRESENTER — silhouette in the beam (96,116,14,38) ----------
  // stepped halo glow (widest at chest height)
  dith(97, 112, 12, 8, 15);
  dith(93, 120, 20, 20, 15);
  dith(95, 140, 16, 14, 15);
  r(98, 116, 8, 7, 0);                                         // charismatic head
  r(100, 115, 4, 1, 0);                                        // great hair
  r(97, 123, 10, 3, 0);                                        // shoulders
  r(98, 126, 8, 14, 0);                                        // torso
  r(98, 140, 3, 14, 0); r(103, 140, 3, 14, 0);                 // legs
  r(97, 153, 4, 2, 0); r(103, 153, 4, 2, 0);                   // stage-shoe glam
  const arm = frame % 14 < 7 ? 0 : 2;                          // the pitch gesture
  r(105, 121 + arm, 5, 3, 0);                                  // raised arm
  r(109, 116 + arm, 3, 7, 0);                                  // forearm
  r(108, 113 + arm, 5, 4, 8);                                  // microphone
  r(109, 114 + arm, 2, 1, 15);                                 // mic glint

  // ---------- glass pedestal (176,108,26,46) ----------
  r(175, 107, 28, 44, 8);                                      // glass outline
  r(176, 108, 26, 43, 11);                                     // glass column
  r(178, 110, 2, 39, 15); r(190, 110, 2, 39, 15);              // vertical glints
  r(199, 110, 2, 39, 3);                                       // shaded edge
  r(170, 150, 38, 6, 8);                                       // base plinth
  r(170, 150, 38, 1, 15);
  // CALIBRATION KEY #2 (183,102,12,6) — the only real thing in the building
  r(182, 101, 14, 8, 0);                                       // outline
  r(183, 102, 12, 6, 15);                                      // chrome body
  r(185, 104, 3, 2, 11);                                       // chrome cool spot
  r(192, 103, 2, 2, 11);
  // MANDATORY sparkle — a glint orbiting the key
  if (frame % 10 < 3) {
    const sp = [[180, 99], [197, 100], [181, 109], [196, 108]][(frame >> 1) % 4];
    r(sp[0], sp[1], 2, 2, 15);
    r(sp[0] + 1, sp[1] - 1, 1, 1, 15);
  }

  // ---------- 'DO NOT SHIP' sign (206,120,34,18) ----------
  r(220, 138, 3, 12, 8);                                       // stand leg
  r(216, 149, 11, 2, 8);                                       // stand foot
  r(205, 119, 36, 20, 0);                                      // plate outline
  r(206, 120, 34, 18, 14);                                     // yellow plate
  r(208, 123, 30, 2, 0);                                       // DO NOT
  r(208, 127, 22, 2, 0);                                       // SHIP
  r(208, 132, 30, 3, 4);                                       // red warning bar
  r(206, 120, 34, 1, 15);                                      // glint

  // ---------- stage stairs, exit down (288,150,32,30) ----------
  r(287, 149, 33, 12, 0);
  r(288, 150, 32, 10, 8);
  r(288, 150, 32, 2, 7);
  r(297, 160, 23, 12, 0);
  r(298, 161, 22, 9, 8);
  r(298, 161, 22, 2, 7);
  r(307, 170, 13, 12, 0);
  r(308, 171, 12, 9, 8);
  r(308, 171, 12, 2, 7);
  r(284, 138, 3, 42, 7);                                       // railing post
  r(284, 138, 36, 3, 7);                                       // railing top
  r(284, 138, 36, 1, 15);

  // ---------- usher of Hype Security (296,158,10,22) ----------
  r(298, 158, 6, 5, 0);                                        // head
  r(296, 163, 10, 12, 0);                                      // torso
  r(297, 166, 8, 3, 14);                                       // hi-vis vest stripe
  r(297, 175, 4, 5, 0); r(301, 175, 4, 5, 0);                  // legs

  // ---------- confetti, still deciding whether to land ----------
  const conf = [
    [64, 98, 4], [82, 122, 9], [98, 104, 14], [118, 136, 10], [131, 99, 9],
    [148, 118, 4], [160, 142, 14], [172, 96, 10], [190, 130, 9], [205, 100, 14],
    [222, 144, 4], [236, 112, 10], [248, 126, 14], [258, 102, 9],
  ];
  for (const [cx, cy, cc] of conf) {
    if ((frame + cx) % 16 < 8 || cx % 3 !== 0) r(cx, cy, 2, 2, cc);
  }

  // ---------- the crowd (0,182,320,18) — two rows of hype ----------
  r(0, 182, 320, 18, 8);                                       // house gloom
  for (let i = 0; i < 23; i++) {                               // back row of heads
    const hx = 2 + i * 14;
    const hop = (i === 7 && frame % 30 < 6) ? 1 : 0;           // one fan can't even
    r(hx, 184 - hop, 10, 8, 0);
    r(hx + 2, 182 - hop, 6, 3, 0);
  }
  for (let i = 0; i < 23; i++) {                               // front row, offset
    const hx = 9 + i * 14;
    const hop = (i === 15 && frame % 30 >= 15 && frame % 30 < 21) ? 1 : 0;
    r(hx - 1, 192 - hop, 12, 8, 0);
    r(hx + 1, 190 - hop, 8, 3, 0);
  }
}
