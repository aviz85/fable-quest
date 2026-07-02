// anthropic_garden.art.js — גן המדיטציה (Anthropic zen garden)
// Pastel sky, low clay wall, moss lawn, sakura shedding petals, raked sand,
// stream + bridge to nowhere, stone lantern, Bruria in lotus facing THE STAIN,
// and a three-year tower of risk-assessment reports.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ============ SKY (0..54) — pale cyan, soft banding ============
  r(0, 0, 320, 54, 11);
  r(0, 0, 320, 14, 9);                     // deeper blue up top
  for (let x = 0; x < 320; x += 10) r(x + 4, 14, 6, 2, 9);   // blend row
  for (let x = 6; x < 320; x += 12) r(x, 22, 6, 1, 9);
  for (let x = 0; x < 320; x += 14) r(x + 5, 34, 7, 1, 15);  // pale shimmer
  for (let x = 0; x < 320; x += 6) r(x + (x % 12 ? 0 : 3), 50, 4, 4, 15); // dithered haze above wall
  for (let x = 3; x < 320; x += 12) r(x, 46, 5, 2, 15);

  // sun, soft, upper right
  r(276, 8, 16, 14, 14); r(280, 5, 8, 20, 14); r(272, 12, 24, 7, 14); r(282, 10, 6, 5, 15);

  // one thin drifting cloud (animated)
  const cx = Math.floor(frame / 5) % 400 - 40;
  r(cx, 17, 46, 6, 15); r(cx + 10, 13, 24, 5, 15); r(cx + 30, 20, 14, 4, 15);
  // two distant birds (approved flight path, single file)
  r(150, 26, 4, 1, 0); r(151, 25, 2, 1, 0);
  r(170, 30, 4, 1, 0); r(171, 29, 2, 1, 0);

  // ============ LOW CLAY WALL (0,54..90) ============
  r(0, 54, 320, 36, 6);
  r(0, 54, 320, 3, 15);                    // white cap strip
  r(0, 57, 320, 2, 7);                     // stone under cap
  for (let y = 66; y < 90; y += 10) r(0, y, 320, 1, 8);      // horizontal seams
  for (let y = 66; y < 90; y += 10) {      // vertical seams, staggered ~28px
    const off = ((y / 10) % 2) ? 14 : 0;
    for (let x = off; x < 320; x += 28) r(x, y - 9, 1, 9, 8);
  }
  // sunlit wash on wall, left side (sun is high right but garden glows)
  for (let x = 200; x < 320; x += 8) r(x, 60, 4, 4, 7);
  r(0, 88, 320, 2, 8);                     // wall base shadow

  // culvert where the stream slips out under the wall
  r(244, 76, 26, 14, 8); r(247, 79, 20, 11, 0); r(245, 77, 24, 1, 7);

  // ============ MOSS LAWN MIDGROUND (0,90..145) ============
  r(0, 90, 320, 55, 2);
  r(0, 90, 320, 3, 8);                     // shade at wall foot
  // dithered light — denser toward the viewer
  for (let y = 96; y < 145; y += 4) {
    const step = y < 110 ? 16 : y < 128 ? 10 : 6;
    for (let x = (y * 3) % step; x < 320; x += step) r(x, y, 3, 1, 10);
  }
  // clipped hedge bushes along the wall
  for (const bx of [110, 150, 230]) {
    r(bx, 82, 26, 12, 2); r(bx + 2, 79, 22, 4, 2);
    r(bx + 3, 80, 10, 2, 10); r(bx + 4, 84, 18, 2, 10);
    r(bx, 93, 26, 2, 0);
  }
  // lawn-to-court transition
  r(0, 142, 320, 3, 8);

  // ============ STONE LANTERN (200,96,16,44) on the lawn ============
  r(198, 139, 20, 3, 8);                   // ground shadow
  r(202, 128, 12, 12, 8);                  // base block
  r(203, 128, 10, 2, 7); r(202, 139, 12, 1, 0);
  r(206, 108, 6, 20, 7);                   // pillar
  r(206, 108, 2, 20, 15);                  // pillar lit edge
  r(211, 108, 1, 20, 8);
  r(200, 96, 16, 12, 8);                   // lamp head
  r(199, 95, 18, 1, 0);
  r(197, 93, 22, 3, 7); r(202, 90, 12, 3, 7); r(206, 88, 4, 2, 7); // stepped cap
  r(197, 92, 22, 1, 15);
  const lit = frame % 14 < 7 ? 14 : 12;    // "safety LED" flickers like fire
  r(205, 100, 6, 6, lit);
  if (frame % 14 < 7) r(206, 101, 3, 2, 15);

  // ============ FLOOR BASE — court earth (0,145..200) ============
  r(0, 145, 320, 55, 7);
  r(0, 145, 320, 4, 8);                    // far strip darker
  r(0, 196, 320, 4, 8);                    // near edge shade
  for (let i = 0; i < 12; i++) {           // earth speckles
    r((i * 53) % 240, 150 + ((i * 31) % 46), 3, 1, 8);
    r((i * 37 + 20) % 240, 154 + ((i * 23) % 40), 2, 1, 8);
  }
  // grass tufts at lawn/court seam
  for (let x = 4; x < 240; x += 26) { r(x, 143, 3, 4, 2); r(x + 4, 144, 2, 3, 10); }
  // far-bank lawn continues right of the stream
  r(292, 145, 28, 55, 2);
  for (let y = 148; y < 198; y += 5) {
    for (let x = 292 + (y % 8); x < 320; x += 8) r(x, y, 3, 1, 10);
  }

  // ============ STREAM (from culvert y=90 widening to y=200) ============
  for (let y = 90; y < 200; y += 2) {
    const t = (y - 90) / 110;
    const w = Math.floor(26 + t * 16);           // 26 → 42 wide
    const x0 = Math.floor(246 + t * 8);          // drifts right a touch
    r(x0 - 3, y, w + 6, 2, 8);                   // banks
    r(x0, y, w, 2, 3);                           // water
    r(x0 + 1, y, 2, 2, 11);                      // lit left edge of water
  }
  // ripple stripes scrolling downstream
  for (let i = 0; i < 7; i++) {
    const y = 92 + ((i * 18 + frame * 2) % 106);
    const t = (y - 90) / 110;
    const x0 = Math.floor(246 + t * 8);
    const w = Math.floor(26 + t * 16);
    r(x0 + 4, y, Math.floor(w * 0.4), 1, 11);
    r(x0 + w - 8, y + 3, 5, 1, 11);
  }
  if (frame % 10 < 5) r(252, 92, 8, 2, 15);      // sparkle at culvert mouth

  // ============ FAR BANK GAG WALL (bridge leads to it) ============
  r(296, 100, 24, 45, 6);
  r(296, 100, 24, 2, 15); r(296, 102, 24, 1, 7);
  r(296, 112, 24, 1, 8); r(296, 124, 24, 1, 8); r(296, 136, 24, 1, 8);
  r(304, 103, 1, 9, 8); r(312, 113, 1, 11, 8); r(302, 125, 1, 11, 8);
  r(294, 100, 2, 45, 8);                   // wall edge facing stream

  // ============ RAKED SAND FIELD (66,148,168,52) ============
  r(66, 148, 168, 52, 14);
  r(66, 148, 168, 1, 6); r(66, 148, 1, 52, 6); r(233, 148, 1, 52, 6); // rim
  r(67, 149, 166, 1, 15);                  // inner lit rim
  // rake arcs — continuous stepped curves bowing around the center, every 8px
  for (let i = 0; i < 6; i++) {
    const baseY = 157 + i * 8;
    for (let x = 70; x < 230; x += 4) {
      const d = (x - 150) / 20;
      const dy = Math.round((d * d) / 2.4);
      const yy = baseY - Math.min(dy, 6);
      if (yy > 150 && yy < 198) { r(x, yy, 4, 1, 6); if (i % 2 === 0) r(x, yy + 1, 4, 1, 15); }
    }
  }
  // tiny "do not step" sign staked inside the sand edge
  r(75, 158, 2, 10, 6); r(74, 167, 4, 1, 8);
  r(71, 151, 12, 8, 15); r(70, 150, 14, 1, 0); r(70, 159, 14, 1, 0);
  r(70, 150, 1, 10, 0); r(83, 150, 1, 10, 0);
  r(73, 153, 8, 1, 4); r(73, 156, 6, 1, 4);

  // ============ STONE PATH (the only approved surface) ============
  // horizontal slab path from left edge: 0,172,70,14 — irregular stepping slabs
  for (let i = 0; i < 5; i++) {
    const x = -6 + i * 16;
    const jy = (i % 2) ? 0 : 2;            // stagger up/down
    const jw = (i % 3 === 0) ? 14 : 12;    // vary widths
    r(x, 172 + jy, jw + 2, 13 - jy, 8);    // gap/bed
    r(x + 1, 173 + jy, jw, 10 - jy, 7);    // slab (flat, ground-lying)
    r(x + 2, 173 + jy, jw - 2, 1, 15);     // lit top edge
    r(x + 1, 182, jw, 1, 8);
    r(x + 2, 183, jw - 2, 1, 0);           // soft base outline
  }
  // curve down around the sand: 66,166,20,34 — offset stepping stones
  for (let i = 0; i < 3; i++) {
    const y = 164 + i * 12;
    const jx = (i % 2) ? 68 : 63;          // zigzag
    r(jx - 1, y + 1, 23, 10, 8);
    r(jx, y + 2, 21, 7, 7);
    r(jx + 1, y + 2, 19, 1, 15);
    r(jx + 1, y + 9, 19, 1, 0);
  }
  // pebbles between the slabs
  r(58, 178, 3, 2, 8); r(88, 172, 3, 2, 8); r(92, 190, 3, 2, 8);

  // ============ STONE TILES PATCH + THE STAIN (סטיין-לי) ============
  r(139, 163, 34, 18, 8);                  // bedding shadow
  r(140, 164, 32, 16, 7);                  // tile island in the sand
  r(141, 165, 30, 1, 15);
  r(156, 165, 1, 14, 8); r(141, 171, 30, 1, 8);
  r(140, 179, 32, 1, 0);
  // the stain itself — dark blotch with a black heart and a personality file
  r(148, 168, 14, 8, 8); r(146, 170, 4, 4, 8); r(160, 167, 4, 4, 8);
  r(152, 170, 6, 4, 0); r(150, 172, 3, 2, 0); r(156, 168, 2, 2, 0);

  // ============ BOULDERS ============
  // left boulder 8,150,30,20 — rounded via stepped rects, clearly OFF the path
  r(6, 167, 36, 3, 8);                     // under-shadow
  r(14, 148, 18, 2, 0); r(10, 150, 26, 2, 0); r(7, 152, 32, 16, 0); // dark silhouette = outline
  r(15, 149, 16, 2, 7); r(11, 151, 24, 3, 7); r(9, 154, 28, 12, 7);
  r(16, 149, 12, 1, 15); r(12, 152, 9, 2, 15);  // top glint
  r(11, 162, 25, 4, 8);                    // dark underside
  r(24, 156, 5, 3, 8); r(14, 158, 4, 2, 8);     // pock marks
  // moss patch at its foot
  r(9, 165, 8, 2, 2); r(30, 164, 6, 2, 2);
  // right-front boulder 288,166,26,18 (sits by the stream bank)
  r(286, 181, 32, 4, 8);
  r(293, 165, 17, 3, 7); r(289, 168, 24, 6, 7); r(288, 174, 26, 8, 7);
  r(295, 165, 11, 1, 15); r(291, 169, 7, 2, 15);
  r(290, 178, 22, 4, 8); r(300, 172, 5, 3, 8);
  r(288, 168, 1, 12, 0); r(313, 170, 1, 10, 0);

  // ============ BRURIA IN LOTUS (168,148,14,22) breathing ============
  const br = frame % 20 < 10 ? 0 : 1;      // breath: shoulders rise 1px
  r(164, 168, 22, 3, 8);                   // sitting shadow
  r(165, 166, 21, 4, 7); r(165, 169, 21, 1, 8); // small stone seat pad
  r(168, 156 - br, 14, 14 + br, 6);        // robe torso
  r(166, 164, 18, 6, 6);                   // folded legs spread
  r(167, 165, 16, 1, 8);                   // lap crease
  r(169, 158 - br, 2, 9, 4);               // sash fold
  r(179, 158 - br, 2, 9, 8);               // shade fold
  r(167, 156 - br, 16, 1, 0);              // shoulder outline
  r(171, 148 - br, 8, 9, 7);               // head (facing left, to the stain)
  r(171, 148 - br, 8, 2, 8);               // shaved crown shade
  r(172, 152 - br, 3, 1, 0);               // closed-eye dash
  r(170, 154 - br, 2, 3, 7);               // nose toward the stain
  r(167, 160 - br, 3, 6, 6); r(180, 160 - br, 3, 6, 6); // arms
  r(172, 165, 6, 2, 7);                    // hands in lap

  // ============ REPORT TOWER (190,112,18,58) — taller than Bruria ============
  r(187, 168, 24, 3, 8);                   // shadow
  r(190, 112, 18, 58, 15);                 // paper stack
  r(189, 111, 20, 1, 0); r(189, 111, 1, 60, 0); r(208, 111, 1, 60, 0); // outline
  r(189, 170, 20, 1, 0);
  for (let y = 118; y < 170; y += 6) r(190, y, 18, 1, 8);   // separators
  r(191, 113, 16, 1, 7);
  r(196, 124, 6, 1, 7); r(193, 148, 8, 1, 7);               // page edge hints
  // binder tabs sticking out
  r(186, 128, 4, 3, 4); r(208, 142, 4, 3, 3); r(186, 156, 4, 3, 14);
  // topmost page flaps
  const flap = frame % 16 < 8 ? 0 : 2;
  r(190, 108 - flap, 18, 4 + flap, 15); r(190, 108 - flap, 18, 1, 7);
  r(189, 107 - flap, 20, 1, 0);

  // ============ WOODEN BRIDGE (240,132,52,10) to nowhere ============
  r(238, 143, 56, 3, 0);                   // shadow on water
  r(240, 132, 52, 10, 6);                  // deck
  r(240, 132, 52, 1, 15);                  // top glint
  for (let x = 247; x < 292; x += 8) r(x, 133, 1, 9, 8);    // plank gaps
  r(239, 131, 54, 1, 0); r(239, 141, 54, 1, 0);             // deck outlines
  r(240, 124, 4, 8, 6); r(288, 124, 4, 8, 6);               // rail posts
  r(240, 123, 4, 1, 0); r(288, 123, 4, 1, 0);
  r(240, 126, 52, 2, 6); r(240, 126, 52, 1, 15);            // rail beam
  r(240, 128, 52, 1, 8);

  // ============ MEDITATION BELL (118,160,10,8 on cushion) ============
  r(114, 170, 18, 2, 8);                   // shadow
  r(116, 166, 14, 4, 4);                   // red cushion
  r(116, 166, 14, 1, 12);
  r(118, 160, 10, 8, 14);                  // brass bowl
  r(118, 159, 10, 1, 0);
  r(119, 160, 8, 1, 15); r(120, 161, 4, 2, 15);  // shine
  r(118, 166, 10, 1, 6);
  r(130, 162, 2, 6, 6); r(129, 160, 4, 2, 6);    // tiny striker leaning

  // ============ SAKURA TREE (front of wall, left) ============
  // trunk 44,62,10,84 — brown bark, dark notches
  r(43, 61, 12, 86, 0);                    // trunk outline
  r(44, 62, 10, 84, 6);
  r(45, 64, 2, 80, 14);                    // lit edge
  r(51, 64, 2, 80, 4);                     // shaded edge
  r(48, 72, 4, 4, 8); r(46, 94, 4, 4, 8); r(49, 118, 3, 4, 8); r(46, 136, 4, 4, 8); // bark
  r(38, 145, 22, 4, 8);                    // root shadow
  r(39, 142, 6, 5, 6); r(53, 142, 7, 5, 6);// root flares
  r(39, 142, 6, 1, 14); r(53, 142, 7, 1, 14);
  // branch 54,70,26,5
  r(54, 69, 27, 7, 0); r(54, 70, 26, 5, 6); r(55, 70, 24, 1, 14);
  // canopy 16,34,72,40 — stepped pink cloud
  r(26, 28, 52, 8, 0); r(14, 34, 76, 36, 0); r(20, 68, 62, 8, 0);   // outline mass
  r(8, 42, 10, 18, 0); r(84, 40, 12, 16, 0);
  r(28, 30, 48, 8, 13); r(16, 36, 72, 32, 13); r(22, 66, 58, 8, 13);
  r(10, 44, 10, 14, 13); r(86, 42, 8, 12, 13);   // side puffs
  r(60, 24, 16, 6, 0); r(61, 25, 14, 5, 13);     // top puff
  r(34, 24, 12, 5, 0); r(35, 25, 10, 4, 13);
  // highlights (sun side, upper right)
  r(56, 30, 18, 4, 15); r(70, 38, 14, 4, 15); r(62, 46, 10, 3, 15);
  r(30, 34, 14, 4, 15); r(44, 42, 8, 3, 15);
  // shaded underside
  r(18, 60, 32, 7, 5); r(54, 62, 26, 6, 5); r(28, 50, 10, 5, 5); r(74, 52, 10, 5, 5);
  // gaps of sky peeking through
  r(50, 38, 4, 3, 11); r(26, 46, 3, 3, 11);
  // canopy shadow pooling on the lawn under the tree
  r(18, 140, 60, 4, 8); r(26, 136, 44, 4, 8);

  // ============ FALLING PETALS (signature animation) ============
  const petalX = [24, 44, 62, 82, 36, 72];
  const petalOff = [0, 34, 61, 15, 78, 49];
  for (let i = 0; i < 6; i++) {
    const py = 74 + Math.floor((frame * 1.5 + petalOff[i]) % 100);
    const sway = (Math.floor((frame + i * 7) / 8) % 2) ? 2 : -1;
    r(petalX[i] + sway, py, 3, 2, 13);
    if (i % 2 === 0) r(petalX[i] + sway + 1, py, 1, 1, 15);
  }
  // petals already resting on the ground / path
  r(28, 176, 3, 2, 13); r(52, 188, 3, 2, 13); r(14, 180, 3, 2, 13);
  r(74, 170, 3, 2, 13); r(60, 194, 3, 2, 13); r(90, 150, 3, 2, 13);
}
