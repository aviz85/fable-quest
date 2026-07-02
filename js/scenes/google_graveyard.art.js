// google_graveyard.art.js — בית הקברות של המוצרים (Google chapter)
// 320x200 EGA, Sierra SCI0. fillRect only.
// Night courtyard: rows of white product tombstones, the grand GOOGLE KEYS
// slab with a carved keyhole, the translucent ghost of Google Reader bobbing
// above it, low fog crawling between the graves. Everything deprecated.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- night sky (0..72) ----------
  r(0, 0, 320, 72, 0);
  // city glow low on the horizon (someone's servers are still warm) — dithered blue haze
  // sparse high, denser low, tucked behind the rooftops so it hugs the skyline
  for (let y = 46; y < 52; y += 2)
    for (let x = ((y / 2) % 2) * 4; x < 320; x += 8) r(x, y, 3, 1, 1);
  for (let y = 52; y < 58; y += 2)
    for (let x = ((y / 2) % 2) * 3; x < 320; x += 6) r(x, y, 3, 1, 1);
  r(0, 58, 320, 6, 1);
  // stars (two of them blink — the rest were discontinued)
  r(24, 8, 1, 1, 15); r(70, 18, 1, 1, 15); r(120, 6, 1, 1, 15);
  r(160, 22, 1, 1, 15); r(206, 12, 1, 1, 15); r(240, 30, 1, 1, 15);
  if (frame % 20 < 4) r(96, 30, 1, 1, 15);
  if (frame % 26 < 5) r(184, 38, 1, 1, 15);

  // ---------- moon (small, in the corner, embarrassed) ----------
  r(280, 8, 22, 1, 8); r(279, 24, 24, 1, 8);               // faint halo hint
  r(284, 10, 14, 14, 15);
  r(286, 8, 10, 18, 15); r(282, 12, 18, 10, 15);   // rounded-ish
  r(288, 14, 3, 3, 7);                             // crater
  r(293, 19, 2, 2, 7);

  // ---------- campus back wall silhouette (58..92) — stepped buildings ----------
  // blocks of varying height so it reads "campus", not "train"
  const blocks = [[0, 64, 46], [46, 58, 58], [104, 68, 42], [146, 60, 60], [206, 66, 48], [254, 62, 66]];
  for (const [bx, by, bw] of blocks) {
    r(bx, by, bw, 92 - by, 8);
    r(bx, by, bw, 1, 7);                           // moonlit roof edge
    r(bx + bw - 1, by, 1, 92 - by, 0);             // corner seam
  }
  r(216, 58, 20, 8, 8); r(216, 58, 20, 1, 7);      // rooftop hut
  // dead windows, row per building
  for (let x = 8; x < 320; x += 14) r(x, 70, 5, 6, 0);
  for (let x = 12; x < 320; x += 18) r(x, 80, 5, 6, 0);
  // ONE lit window — someone still works late on a product that will die
  if (frame % 30 < 6) r(208, 70, 6, 8, 14); else r(208, 70, 6, 8, 6);
  // faded campus sign: four primary-color blocks (the logo nobody dusts)
  r(266, 65, 5, 5, 1); r(273, 65, 5, 5, 4); r(280, 65, 5, 5, 14); r(287, 65, 5, 5, 2);
  r(0, 90, 320, 2, 0);                             // wall base shadow

  // ---------- far lawn (92..145) — dark, dewy, robot-mowed once ----------
  r(0, 92, 320, 53, 2);
  // night falls on the grass: checker-dither the far lawn toward black
  for (let y = 92; y < 112; y += 2)
    for (let x = ((y / 2) % 2) * 2; x < 320; x += 4) r(x, y, 2, 2, 0);
  for (let y = 112; y < 128; y += 2)
    for (let x = ((y / 2) % 2) * 3; x < 320; x += 6) r(x, y, 2, 2, 0);
  // night keeps eating the lawn — dark-gray dew dither all the way to the seam
  for (let y = 128; y < 145; y += 2)
    for (let x = ((y / 2) % 2) * 3; x < 320; x += 6) r(x, y, 2, 1, 0);
  for (let y = 129; y < 145; y += 4)
    for (let x = ((y / 4) % 2) * 5 + 1; x < 320; x += 10) r(x, y, 2, 1, 8);
  r(0, 104, 320, 1, 0);                                    // hedge shadow line
  for (const [px, py, pw] of [[8, 118, 22], [186, 132, 18], [284, 120, 24], [58, 136, 16]])
    r(px, py, pw, 3, 8);                                   // dead patches

  // gravel path — far, narrow, leading from the grand slab
  r(150, 118, 20, 27, 7);
  r(150, 118, 1, 27, 8); r(169, 118, 1, 27, 8);

  // ---------- back tombstone row (y=112, h=14) ----------
  const logos = [4, 1, 14, 2];
  [96, 120, 200, 226, 254].forEach((x, i) => {
    r(x + 1, 124, 12, 2, 0);                               // ground shadow
    r(x, 112, 12, 14, 7);
    r(x, 112, 12, 1, 15);                                  // moonlit top
    r(x + 11, 113, 1, 13, 8);                              // shade edge
    r(x + 4, 116, 3, 3, logos[i % 4]);                     // little dead-product logo
  });

  // ---------- mid tombstone row (y=124, h=20) ----------
  [78, 110, 212, 246].forEach((x, i) => {
    const lean = x === 110 ? 1 : 0;                        // even the graves are deprecated
    r(x + lean + 1, 142, 16, 2, 0);                        // ground shadow
    r(x + lean, 124, 16, 20, 7);
    r(x + lean + 2, 122, 12, 2, 7);                        // rounded top
    r(x + lean + 2, 122, 12, 1, 15);
    r(x + lean, 124, 16, 1, 15);
    r(x + lean + 14, 125, 2, 19, 8);
    r(x + lean + 5, 129, 4, 4, logos[(i + 1) % 4]);        // 2x2-ish logo block
    r(x + lean + 3, 136, 10, 1, 8);                        // epitaph line
    r(x + lean + 3, 139, 7, 1, 8);
  });

  // ---------- GOOGLE KEYS grand tombstone (138,90,44,56) ----------
  r(136, 144, 52, 3, 0);                                   // big shadow
  r(134, 142, 52, 6, 7);                                   // base plinth
  r(134, 142, 52, 1, 15); r(134, 147, 52, 1, 8);
  r(137, 89, 46, 57, 0);                                   // outline
  r(138, 90, 44, 56, 15);                                  // slab
  r(176, 90, 6, 56, 7);                                    // right-edge shading
  for (let y = 92; y < 144; y += 4) r(174, y, 2, 2, 7);    // dithered shade seam
  r(139, 91, 1, 54, 11);                                   // moonlit left edge
  r(141, 85, 38, 5, 0); r(142, 86, 36, 4, 15);             // arched top step 1
  r(147, 81, 26, 5, 0); r(148, 82, 24, 4, 15);             // arched top step 2
  r(148, 82, 24, 1, 11);                                   // moon glint on the arch
  r(142, 96, 36, 2, 8);                                    // inscription: GOOGLE KEYS
  r(142, 100, 28, 2, 8);                                   // 2017–2019 · נסגר
  r(142, 130, 30, 1, 8); r(142, 134, 22, 1, 8);            // "עבד מצוין. לכן."
  // carved keyhole — round eye, narrow throat (very locksmith, very dead)
  r(157, 107, 6, 2, 0);
  r(155, 109, 10, 6, 0);
  r(157, 115, 6, 2, 0);
  r(158, 117, 4, 7, 0);
  // crack from the keyhole (waiting for a resurrection)
  r(160, 126, 1, 4, 8); r(159, 130, 1, 5, 8); r(161, 135, 1, 5, 8);
  // the key — rises glowing from the crack after the ritual, until taken
  // (the scene js mirrors ritual/taken state into globalThis.__fq.flags)
  const fqf = globalThis.__fq?.flags;
  if (fqf?.ggrave_ritual_done && !fqf?.ggrave_key_taken) {
    r(158, 100, 4, 8, 14);                                 // shaft in the crack
    r(157, 99, 6, 3, 14);                                  // bow
    r(162, 105, 3, 2, 14); r(162, 109, 3, 2, 14);          // teeth
    if (frame % 8 < 4) { r(156, 97, 1, 1, 15); r(164, 103, 1, 1, 15); }
  }

  // ---------- weeping willow (14,44,58,100) ----------
  r(36, 96, 8, 48, 8);                                     // trunk
  r(35, 96, 1, 48, 0); r(44, 96, 1, 48, 0);
  r(37, 100, 2, 40, 7);                                    // moonlit bark stripe
  r(34, 140, 18, 4, 8); r(30, 142, 26, 3, 0);              // roots + shadow
  // canopy — rounded drooping mass, drawn as stacked slabs
  r(26, 42, 34, 4, 2);
  r(20, 46, 46, 6, 2);
  r(14, 52, 58, 12, 2);
  r(14, 64, 58, 8, 2);
  r(16, 72, 54, 6, 2);
  r(26, 40, 34, 2, 0);                                     // dark crown edge
  r(30, 42, 12, 2, 10); r(48, 46, 10, 2, 10);              // moonlit leaf tops
  r(20, 52, 8, 2, 10);
  for (let y = 46; y < 78; y += 4)                         // leafy dither shadow
    for (let x = 14 + ((y / 4) % 2) * 3; x < 72; x += 6) r(x, y, 2, 2, 0);
  // drooping curtain — strands every 4px, varied lengths, some swaying
  const sway = frame % 16 < 8 ? 1 : 0;
  const strands = [
    [14, 108, 0], [18, 124, 1], [22, 96, 0], [26, 116, 0], [30, 136, 0],
    [46, 128, 0], [50, 104, 1], [54, 118, 0], [58, 132, 0], [62, 112, 0], [66, 98, 1],
  ];
  for (const [sx, sy2, sw] of strands) {
    r(sx + sw * sway, 76, 3, sy2 - 76, 2);
    r(sx + sw * sway, sy2 - 3, 3, 3, 10);                  // pale tip
  }
  for (let y = 80; y < 120; y += 8)                        // strand shading flecks
    for (const sx of [16, 24, 48, 56, 64]) r(sx, y + (sx % 4), 1, 3, 0);

  // ---------- garden lamps ----------
  // left lamp: alive, barely
  r(88, 96, 6, 50, 8);
  r(87, 96, 1, 50, 0);
  r(85, 89, 12, 10, 0);                                    // head housing
  r(86, 90, 10, 8, 14);                                    // steady-dim glow
  r(88, 92, 6, 4, 15);                                     // hot core
  r(84, 146, 14, 2, 0);                                    // base shadow
  // right lamp: dead, except a sad memory of light
  r(246, 96, 6, 50, 8);
  r(245, 96, 1, 50, 0);
  r(243, 89, 12, 10, 0);
  r(244, 90, 10, 8, frame % 40 < 3 ? 6 : 8);               // sad blink
  r(242, 146, 14, 2, 0);

  // ---------- ghost of Google Reader (bobs above the slab) ----------
  const bob = frame % 24 < 12 ? -2 : 0;                    // floats ±2px
  const gy = 50 + bob;                                     // hovers CLEAR of the slab (gap!)
  r(148, gy, 24, 28, 11);                                  // body
  r(147, gy + 2, 1, 24, 3); r(172, gy + 2, 1, 24, 3);      // soft edges
  r(150, gy - 2, 20, 2, 11);                               // rounded head top
  r(154, gy + 4, 12, 16, 15);                              // glowing core
  // wavy hem — 3 teeth of 6x4
  r(148, gy + 24, 6, 4, 11); r(157, gy + 24, 6, 4, 11); r(166, gy + 24, 6, 4, 11);
  r(154, gy + 26, 3, 2, 3); r(163, gy + 26, 3, 2, 3);      // hem shimmer gaps
  r(156, gy + 9, 2, 2, 1); r(162, gy + 9, 2, 2, 1);        // hollow eyes
  r(168, gy + 6, 4, 4, 15);                                // tiny RSS icon, still syncing
  r(169, gy + 7, 2, 2, 12);

  // ---------- near ground (145..200) ----------
  r(0, 145, 320, 55, 2);
  r(0, 145, 320, 2, 8);                                    // horizon seam
  // night dither — sparser as it gets closer (moonlight wins up front)
  for (let y = 148; y < 168; y += 4)
    for (let x = ((y / 4) % 2) * 4; x < 320; x += 8) r(x, y, 2, 2, 0);
  for (let y = 168; y < 200; y += 6)
    for (let x = ((y / 6) % 2) * 6; x < 320; x += 12) r(x, y, 2, 2, 0);
  for (let y = 150; y < 198; y += 5)                       // dewy gray flecks up close
    for (let x = ((y / 5) % 2) * 5 + 2; x < 320; x += 10) r(x, y, 2, 1, 8);
  // mowing stripes from the discontinued robot
  for (const y of [156, 170, 186]) r(0, y, 320, 1, 8);
  for (let x = 0; x < 320; x += 22) r(x + ((x / 22) % 2) * 6, 162, 10, 2, 8);
  for (let x = 8; x < 320; x += 26) r(x, 178, 12, 2, 8);
  for (let x = 2; x < 320; x += 30) r(x, 192, 14, 2, 8);

  // ---------- gravel path (widening toward the bottom exit) ----------
  r(150, 145, 20, 20, 7);                                  // upper stem
  r(146, 165, 28, 15, 7);                                  // mid widen
  r(138, 180, 44, 20, 7);                                  // lower widen
  r(150, 145, 1, 20, 8); r(169, 145, 1, 20, 8);            // edges
  r(146, 165, 1, 15, 8); r(173, 165, 1, 15, 8);
  r(138, 180, 1, 20, 8); r(181, 180, 1, 20, 8);
  for (let i = 0; i < 14; i++)                             // gravel speckle
    r(146 + ((i * 37) % 30), 150 + ((i * 53) % 46), 2, 1, 8);
  r(152, 156, 2, 1, 15); r(163, 172, 2, 1, 15); r(148, 188, 2, 1, 15);
  // exit threshold → google_corridors
  r(140, 196, 40, 4, 0);

  // ---------- Google+ grave (front-left, DANGER) ----------
  r(48, 172, 30, 12, 8);                                   // hungry mound
  r(48, 172, 30, 1, 0);
  r(52, 176, 8, 1, 0); r(64, 179, 9, 1, 0); r(56, 182, 12, 1, 0);  // cracks
  if (frame % 18 < 4) r(62, 177, 2, 2, 1);                 // faint pulse — something still circles
  r(51, 145, 22, 28, 0);                                   // stone outline
  r(52, 146, 20, 26, 7);
  r(52, 146, 20, 1, 15);
  r(70, 147, 2, 25, 8);
  r(58, 152, 8, 2, 4); r(61, 149, 2, 8, 1);                // the plus sign nobody clicked
  r(55, 162, 14, 1, 8); r(57, 166, 10, 1, 8);              // epitaph

  // ---------- Stadia grave (front-right) ----------
  r(249, 149, 24, 32, 0);                                  // outline
  r(250, 150, 22, 30, 7);
  r(250, 150, 22, 1, 15);
  r(270, 151, 2, 29, 8);
  r(255, 155, 12, 6, 4);                                   // gamepad-ish block
  r(257, 157, 2, 2, 15); r(263, 157, 2, 2, 15);            // thumbsticks
  r(254, 166, 14, 1, 8); r(256, 170, 10, 1, 8);            // "המשכתי לפלייסטיישן"
  // plastic wreath at the base — faded ring, one petal missing
  r(252, 178, 16, 6, 2);
  r(256, 180, 8, 2, 8);                                    // hollow center
  r(253, 178, 2, 2, 4); r(261, 178, 2, 2, 4); r(266, 181, 2, 2, 4);  // flowers (one missing)

  // ---------- ground fog (dithered wisps, two drift directions) ----------
  // a wisp = broken dashes, not a plank. The cloud. The ORIGINAL cloud.
  const wisp = (fx, y, w) => {
    for (let dx = 0; dx < w; dx += 7) r(fx + dx, y, 5, 2, 7);
    for (let dx = 4; dx < w - 4; dx += 7) r(fx + dx, y + 2, 4, 2, 7);
    for (let dx = 9; dx < w - 8; dx += 11) r(fx + dx, y - 2, 3, 2, 7);
  };
  const f1 = frame % 320;
  for (let x = -320; x < 320; x += 46) {
    const fx = x + f1;
    if (fx < 320 && fx + 30 > 0) wisp(fx, 140, 30);
  }
  const f2 = 320 - (Math.floor(frame / 2) % 320);
  for (let x = -320; x < 320; x += 58) {
    const fx = x + f2;
    if (fx < 320 && fx + 38 > 0) wisp(fx, 152, 38);
  }
  for (let x = -320; x < 320; x += 70) {
    const fx = x + f1 + 22;
    if (fx < 320 && fx + 44 > 0) wisp(fx, 165, 44);
  }
}
