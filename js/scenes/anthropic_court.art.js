// anthropic_court.art.js — חצר המנזר (Anthropic monastery inner court)
// Zen clay-brick court: cyan sky, hall gate, library stairs, gong, clerk desk,
// reflection pool with chanting monks, Monk Safek wringing hands.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ============ SKY (0..50) — soft cyan, calm banded gradient ============
  r(0, 0, 320, 22, 3);
  // checkerboard dither transition cyan→light cyan
  for (let x = 0; x < 320; x += 4) r(x, 22 + ((x / 4) % 2) * 2, 4, 2, 11);
  r(0, 26, 320, 24, 11);                           // pale band near roofline
  for (let x = 0; x < 320; x += 4) r(x, 26 + ((x / 4) % 2 ? 2 : 0), 4, 2, 3);

  // drifting cloud (animated) — slow, serene, pre-approved
  const cx = Math.floor(frame / 4) % 400 - 40;
  r(cx, 12, 44, 8, 15); r(cx + 8, 8, 26, 6, 15); r(cx - 8, 16, 18, 5, 15);
  r(cx + 6, 20, 34, 3, 11);
  // second faraway cloud, opposite phase
  const cx2 = 360 - (Math.floor(frame / 6) % 400);
  r(cx2, 26, 30, 5, 15); r(cx2 + 6, 23, 16, 4, 15);

  // sun disc, gentle, top-left
  r(36, 8, 16, 16, 14); r(40, 5, 8, 22, 14); r(33, 12, 22, 8, 14); r(42, 10, 6, 6, 15);

  // ============ TERRACOTTA ROOFLINE over the wall (monastery!) ============
  r(0, 40, 320, 2, 0);                             // ridge line
  r(0, 42, 320, 10, 4);                            // tiled slope
  for (let x = 0; x < 320; x += 10) r(x, 42, 1, 10, 0);     // tile seams
  for (let x = 2; x < 320; x += 10) r(x, 43, 6, 1, 12);     // tile highlights
  r(0, 52, 320, 3, 12);                            // rounded eave tiles
  for (let x = 0; x < 320; x += 10) { r(x, 52, 2, 3, 4); r(x + 4, 53, 4, 2, 4); }
  r(0, 55, 320, 2, 0);                             // eave shadow line

  // ============ REAR CLAY WALL (0,50..145) ============
  r(0, 57, 320, 88, 6);
  r(0, 57, 320, 2, 8);                             // under-eave shade
  // brick courses — subtle: thin dark seams, short staggered ticks
  for (let y = 64; y < 141; y += 13) r(0, y, 320, 1, 8);
  for (let y = 64; y < 141; y += 13) {
    const off = ((y - 64) / 13 % 2) ? 16 : 0;
    for (let x = off; x < 320; x += 32) r(x, y - 6, 1, 6, 8);
  }
  r(0, 141, 320, 4, 8);                            // wall base shadow

  // ============ LIBRARY STAIRS + ARCHED DOOR (up→anthropic_library) ============
  r(34, 70, 30, 56, 8);                            // recess frame
  r(38, 74, 22, 50, 0);                            // dark opening
  r(42, 70, 14, 6, 0); r(45, 67, 8, 5, 0);         // stepped arch top
  r(41, 69, 16, 2, 7); r(44, 66, 10, 2, 7);        // arch stones
  r(35, 71, 2, 55, 7); r(61, 71, 2, 55, 7);        // jamb stones
  // scroll-glow inside (green light of the scriptures)
  r(42, 88, 14, 36, 2);
  r(44, 92, 10, 2, 10); r(44, 98, 10, 2, 10); r(44, 104, 10, 2, 10); r(44, 110, 10, 2, 10); r(44, 116, 10, 2, 10);
  const gl = frame % 30 < 15 ? 10 : 2;             // glow breathes
  r(45, 79, 8, 7, gl);
  // 4 ascending steps up to the door
  r(30, 138, 40, 7, 7); r(30, 138, 40, 2, 15); r(30, 143, 40, 2, 8);
  r(32, 131, 36, 7, 7); r(32, 131, 36, 2, 15); r(32, 136, 36, 2, 8);
  r(34, 124, 32, 7, 7); r(34, 124, 32, 2, 15); r(34, 129, 32, 2, 8);
  r(36, 118, 28, 6, 7); r(36, 118, 28, 2, 15); r(36, 122, 28, 2, 8);

  // ============ HALL GATE (enter→anthropic_hall) 140,58,42,86 ============
  r(136, 54, 50, 92, 8);                           // stone gate frame
  r(138, 56, 46, 2, 7); r(138, 56, 2, 90, 7); r(182, 56, 2, 90, 7);
  r(140, 58, 42, 86, 4);                           // dark red wood double door
  r(139, 57, 44, 1, 0); r(139, 57, 1, 87, 0); r(182, 57, 1, 87, 0);
  r(160, 58, 2, 86, 0);                            // center split
  // wood grain
  r(146, 60, 1, 82, 0); r(153, 60, 1, 82, 0); r(168, 60, 1, 82, 0); r(175, 60, 1, 82, 0);
  // copper bands
  r(140, 70, 42, 4, 14); r(140, 96, 42, 4, 14); r(140, 122, 42, 4, 14);
  r(140, 70, 42, 1, 15); r(140, 96, 42, 1, 15); r(140, 122, 42, 1, 15);
  // ring handles
  r(153, 104, 5, 7, 14); r(155, 106, 2, 3, 4); r(164, 104, 5, 7, 14); r(166, 106, 2, 3, 4);
  // gatehouse pierces the roofline — its own little tiled cap
  r(132, 38, 58, 2, 0);                            // cap ridge
  r(132, 40, 58, 6, 4);                            // cap tiles
  for (let x = 134; x < 188; x += 9) r(x, 40, 1, 6, 0);
  for (let x = 136; x < 188; x += 9) r(x, 41, 5, 1, 12);
  r(132, 46, 58, 2, 12); r(132, 48, 58, 1, 0);     // cap eave + shadow
  // "אולי" plaque (white strip w/ cyan glyph blocks — iconography, no letters)
  r(145, 50, 32, 8, 0); r(146, 51, 30, 6, 15);
  r(150, 52, 4, 4, 3); r(157, 52, 4, 4, 3); r(164, 52, 4, 4, 3); r(171, 52, 3, 4, 3);

  // ============ ARCH COLUMNS 96,58 & 214,58 (10x86) ============
  for (const colx of [96, 214]) {
    r(colx - 1, 57, 12, 88, 0);                    // outline
    r(colx - 3, 53, 16, 6, 7); r(colx - 3, 57, 16, 2, 8);  // cap
    r(colx, 58, 10, 86, 6);                        // clay shaft
    r(colx, 58, 3, 86, 7);                         // lit left face
    r(colx + 8, 58, 2, 86, 8);                     // shaded right
    for (let y = 66; y < 140; y += 16) r(colx + 3, y, 4, 2, 8); // shaft rings
    r(colx - 3, 139, 16, 6, 7); r(colx - 3, 143, 16, 2, 8);     // base
  }
  // stepped arch curves springing from columns toward gate
  r(106, 58, 10, 4, 6); r(114, 61, 8, 4, 6); r(120, 64, 6, 4, 6); r(106, 58, 10, 1, 7); r(114, 61, 8, 1, 7);
  r(204, 58, 10, 4, 6); r(198, 61, 8, 4, 6); r(194, 64, 6, 4, 6); r(204, 58, 10, 1, 7); r(198, 61, 8, 1, 7);

  // hanging Constitution scrolls on the wall (Anthropic identity)
  for (const sx of [113, 197]) {
    r(sx - 1, 68, 12, 3, 6); r(sx - 1, 68, 12, 1, 12);      // wooden rod
    r(sx, 71, 10, 40, 15);                                   // parchment
    r(sx, 71, 1, 40, 7); r(sx + 9, 71, 1, 40, 7);            // edge shade
    for (let y = 75; y < 106; y += 6) r(sx + 2, y, 6, 2, 3); // cyan clause bars
    r(sx + 2, 105, 6, 2, 11);                                // fading last clause
    r(sx - 1, 111, 12, 3, 6);                                // bottom rod
  }
  // small candle niche on the left wall (balances the empty stretch)
  r(74, 84, 14, 18, 8); r(76, 86, 10, 14, 0);      // recess
  r(77, 82, 8, 4, 0); r(78, 80, 6, 3, 0);          // stepped arch top
  r(76, 83, 10, 1, 7); r(78, 81, 6, 1, 7);
  r(79, 94, 4, 5, 15);                             // candle
  const fl = frame % 10 < 5 ? 14 : 12;
  r(80, 91, 2, 3, fl);                             // flame flicker
  // matching niche right of the gong
  r(284, 78, 14, 18, 8); r(286, 80, 10, 14, 0);
  r(287, 76, 8, 4, 0); r(288, 74, 6, 3, 0);
  r(286, 77, 10, 1, 7); r(288, 75, 6, 1, 7);
  r(289, 88, 4, 5, 15);
  r(290, 85, 2, 3, frame % 10 < 5 ? 12 : 14);      // opposite-phase flame

  // paper lanterns on the columns (soft flicker)
  const lt = frame % 24 < 12 ? 14 : 12;
  for (const lx of [98, 216]) {
    r(lx + 2, 62, 2, 3, 0);                                  // hanger
    r(lx, 65, 6, 8, lt); r(lx - 1, 67, 8, 4, lt);            // paper body
    r(lx + 1, 66, 2, 5, 15);                                 // glow
    r(lx + 2, 73, 2, 2, 4);                                  // tassel
  }

  // ============ GONG (frame 232,58,42,50 · disc 236,66,34,34) ============
  r(230, 56, 46, 54, 0);                           // outline
  r(232, 58, 42, 50, 4);                           // dark wood frame
  r(234, 60, 38, 3, 6); r(234, 60, 38, 1, 12);     // top beam
  r(234, 63, 4, 45, 6); r(268, 63, 4, 45, 6);      // side posts
  r(240, 66, 26, 42, 8);                           // shadowed niche
  r(252, 63, 2, 5, 15);                            // hanging cord
  // copper disc — rounded via stacked steps
  r(246, 66, 14, 34, 14);
  r(242, 69, 22, 28, 14);
  r(239, 73, 28, 20, 14);
  r(236, 78, 34, 10, 14);
  r(246, 65, 14, 1, 0); r(240, 68, 6, 1, 0); r(260, 68, 6, 1, 0); // top rim hint
  r(262, 72, 3, 20, 6); r(258, 92, 6, 5, 6);       // right/lower rim shade (roundness)
  r(244, 70, 8, 6, 15);                            // shine (upper-left)
  r(248, 80, 10, 8, 6); r(250, 82, 6, 4, 14);      // boss center
  r(249, 81, 8, 1, 0); r(249, 81, 1, 6, 0);        // boss ring hint
  r(242, 94, 22, 4, 6);                            // lower shade
  // "אין להקיש" tag hanging from frame post
  r(233, 108, 9, 7, 15); r(234, 110, 7, 1, 4); r(234, 113, 5, 1, 4);

  // ============ FLOOR (0,145..200) ============
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 5, 8);                            // far strip darker (perspective)
  r(0, 158, 320, 1, 8); r(0, 184, 320, 1, 8); r(0, 197, 320, 1, 8);
  for (let x = 8; x < 320; x += 24) r(x, 152, 1, 6, 8);
  for (let x = 8; x < 320; x += 24) r(x, 185, 1, 12, 8);

  // ============ STONE PATH — light slabs, worn by hesitant feet ============
  // horizontal walkway 0,168,320,14
  r(0, 168, 320, 14, 7);
  r(0, 168, 320, 1, 8); r(0, 181, 320, 1, 8);
  for (let x = 0; x < 320; x += 20) { r(x + 18, 169, 2, 12, 8); r(x + 2, 169, 14, 1, 15); }
  // vertical path from gate 150,145,24,55 — splits around the pool
  r(150, 145, 24, 4, 7);                            // stub from gate to pool edge
  r(150, 145, 1, 4, 8); r(173, 145, 1, 4, 8);
  r(150, 173, 24, 27, 7);                           // resumes below the pool
  r(150, 173, 1, 27, 8); r(173, 173, 1, 27, 8);
  for (let y = 174; y < 200; y += 7) { r(151, y + 5, 22, 2, 8); r(153, y, 18, 1, 15); }

  // ============ REFLECTION POOL (108,152,104,16 — hero walks in FRONT of it) ============
  r(104, 149, 112, 22, 8);                         // stone border
  r(106, 150, 108, 2, 7);                          // border top light
  r(104, 169, 112, 2, 0);                          // near-edge shadow
  r(108, 152, 104, 16, 3);                         // water
  // gate reflection — soft dark verticals
  r(150, 153, 2, 14, 8); r(158, 153, 2, 11, 8); r(166, 153, 2, 14, 8);
  r(153, 156, 4, 2, 14);                           // copper band shimmer
  // ripple stripes scrolling right
  const roff = (frame * 2) % 26;
  for (let i = -26; i < 104; i += 26) {
    const rx = 108 + i + roff;
    for (const ry of [156, 161, 165]) {
      const x0 = Math.max(rx, 108), x1 = Math.min(rx + 14, 212);
      if (x1 > x0) r(x0, ry, x1 - x0, 2, 11);
    }
  }

  // ============ THREE CHANTING MONKS (116/138/160, y≈118, 10x26 each) ============
  for (let i = 0; i < 3; i++) {
    const mx = 116 + i * 22;
    const sway = (Math.floor(frame / 12) + i) % 2 ? 1 : 0; // alternate 1px sway
    r(mx - 2, 144, 14, 3, 8);                      // sitting shadow
    r(mx - 1, 125, 12, 22, 0);                     // outline
    r(mx, 126, 10, 20, 6);                         // robe body
    r(mx - 2, 139, 14, 7, 6); r(mx - 2, 139, 1, 7, 0); r(mx + 11, 139, 1, 7, 0); // folded legs
    r(mx + 1, 128, 8, 2, 4);                       // collar sash
    r(mx + 3, 130, 4, 8, 4);                       // robe fold
    r(mx + 1 + sway, 117, 8, 9, 7);                // head (swaying)
    r(mx + sway, 116, 10, 2, 8); r(mx + 1 + sway, 118, 8, 1, 8); // shaved crown
    r(mx + 2 + sway, 121, 2, 1, 0); r(mx + 6 + sway, 121, 2, 1, 0); // closed eyes
    r(mx + 3 + sway, 124, 4, 1, 6);                // chin shade
    // chanting mouth — tiny open/close
    if ((Math.floor(frame / 6) + i) % 2) r(mx + 4 + sway, 123, 2, 1, 0);
  }

  // ============ MONK SAFEK (216,116,12,30) — gray robe, unsure of everything ============
  r(214, 144, 16, 3, 8);                           // shadow
  r(215, 123, 14, 24, 0);                          // outline
  r(216, 124, 12, 22, 8);                          // gray robe
  r(217, 126, 2, 18, 7);                           // robe highlight
  r(218, 115, 8, 10, 7);                           // head
  r(217, 114, 10, 2, 8); r(218, 116, 8, 1, 8);     // crown
  r(220, 119, 2, 2, 0); r(224, 119, 1, 2, 0);      // uneven, uncertain eyes
  r(221, 123, 3, 1, 8);                            // worried mouth
  const wring = frame % 16 < 8 ? 0 : 2;            // hand-wringing flicker
  r(217 + wring, 132, 3, 4, 7);
  r(224 - wring, 132, 3, 4, 7);
  r(220, 134, 4, 3, 7);                            // clasped fists

  // ============ CLERK DESK + MONK (desk 250,120,52,26 · monk 262,96,12,26) ============
  const bob = frame % 20 < 10 ? 0 : 1;
  r(261, 103 + bob, 14, 20, 0);                    // outline
  r(262, 104 + bob, 12, 18, 6);                    // robe torso
  r(263, 106 + bob, 10, 2, 4);                     // collar
  r(263, 95 + bob, 10, 10, 7);                     // head (bobbing)
  r(263, 95 + bob, 10, 2, 8); r(264, 97 + bob, 8, 1, 8); // crown
  r(265, 100 + bob, 2, 1, 0); r(269, 100 + bob, 2, 1, 0); // eyes
  r(266, 103 + bob, 3, 1, 6);                      // patient bureaucratic smile
  r(259, 108 + bob, 3, 10, 6); r(274, 108 + bob, 3, 10, 6); // arms
  // desk
  r(248, 118, 56, 3, 0);                           // outline top
  r(250, 120, 52, 26, 6);                          // wood body
  r(250, 120, 52, 4, 7);                           // desktop light
  r(250, 124, 52, 2, 4);                           // trim
  r(254, 130, 44, 12, 4); r(256, 132, 40, 8, 6);   // front panel
  r(249, 121, 1, 25, 0); r(302, 121, 1, 25, 0);    // side outlines
  r(248, 146, 58, 3, 8);                           // desk shadow
  // stack of white forms (טופס אי-מזיקות 3ב)
  r(255, 113, 16, 9, 0); r(256, 114, 14, 8, 15);
  r(257, 116, 12, 1, 7); r(257, 119, 12, 1, 7);
  // tiny bell
  r(286, 113, 6, 7, 14); r(288, 111, 2, 2, 6); r(287, 114, 2, 2, 15); r(288, 120, 2, 1, 0);
  // mallet leaning against the desk at 274,120 — tempting, forbidden
  r(273, 119, 6, 28, 0); r(274, 120, 4, 26, 6); r(275, 121, 1, 24, 12);
  r(271, 114, 10, 9, 0); r(272, 115, 8, 8, 4); r(272, 115, 8, 2, 12);

  // ============ BAMBOO POTS ============
  // left pot 12,128,16,22
  r(11, 127, 18, 24, 0); r(12, 128, 16, 22, 4); r(12, 128, 16, 3, 12); r(14, 132, 3, 16, 4);
  r(16, 104, 2, 26, 2); r(21, 98, 2, 32, 2); r(24, 110, 2, 20, 2);
  r(16, 112, 2, 2, 10); r(21, 108, 2, 2, 10); r(24, 118, 2, 2, 10); // stalk joints
  r(12, 102, 8, 4, 10); r(18, 94, 9, 4, 10); r(22, 106, 8, 3, 10); r(14, 114, 6, 3, 2);
  r(10, 150, 20, 3, 8);                            // pot shadow
  // right pot 296,148,16,22
  r(295, 147, 18, 24, 0); r(296, 148, 16, 22, 4); r(296, 148, 16, 3, 12);
  r(300, 126, 2, 24, 2); r(305, 120, 2, 30, 2); r(308, 132, 2, 18, 2);
  r(300, 134, 2, 2, 10); r(305, 130, 2, 2, 10);    // stalk joints
  r(296, 124, 8, 4, 10); r(302, 116, 9, 4, 10); r(306, 128, 8, 3, 10);
  r(294, 170, 20, 3, 8);                           // pot shadow

  // ============ FAMOUS STAIN (gag) 60,176,10,6 — assessed since 2024 ============
  r(60, 176, 10, 6, 8); r(58, 178, 4, 3, 8); r(66, 174, 5, 3, 8); r(63, 182, 5, 2, 8);
}
