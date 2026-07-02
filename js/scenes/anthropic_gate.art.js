// anthropic_gate.art.js — שער מנזר החוקה (Anthropic chapter, room 1)
// Twilight zen: clay monastery wall, giant wooden gate with blinking eyes,
// constitution scrolls, stone lanterns with flickering cyan flames, raked sand.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- SKY: twilight gradient 0..60 (fine 2px dither bands) ----------
  r(0, 0, 320, 24, 1);                       // deep blue top
  for (let y = 18; y < 30; y += 2)           // blue → light blue transition
    for (let x = ((y >> 1) % 2) * 2; x < 320; x += 4) r(x, y, 2, 2, 9);
  r(0, 30, 320, 14, 9);                      // light blue band
  for (let y = 42; y < 52; y += 2)           // light blue → cyan transition
    for (let x = ((y >> 1) % 2) * 2; x < 320; x += 4) r(x, y, 2, 2, 3);
  r(0, 52, 320, 8, 3);                       // cyan horizon glow
  for (let x = 2; x < 320; x += 8) r(x, 56, 4, 2, 11);
  // twinkling star (frame-based)
  if (frame % 20 < 10) { r(272, 8, 2, 2, 15); r(270, 9, 6, 1, 15); r(272, 6, 2, 6, 15); }
  else r(272, 8, 2, 2, 9);
  // second faint star
  if ((frame + 10) % 20 < 10) r(40, 14, 2, 2, 11);
  // crescent moon
  r(282, 8, 12, 12, 15);                     // disc
  r(282, 8, 2, 2, 1); r(292, 8, 2, 2, 1);    // round the corners
  r(282, 18, 2, 2, 1); r(292, 18, 2, 2, 1);
  r(278, 5, 12, 12, 1); r(280, 7, 11, 10, 1); // bite → crescent

  // ---------- MONASTERY WALL 0,60..145 (clay P6, shadow strips P8) ----------
  r(0, 60, 320, 85, 6);
  // adobe courses + staggered block joints
  for (let y = 78, row = 0; y < 140; y += 16, row++) {
    r(0, y, 320, 1, 8);
    for (let x = (row % 2) * 22; x < 320; x += 44) r(x, y + 4, 1, 9, 8);
  }
  // sparse clay patch texture
  for (let y = 72; y < 138; y += 13) for (let x = ((y * 11) % 30); x < 320; x += 64) r(x, y, 5, 2, 8);
  // warm top-light on wall under parapet
  r(0, 68, 320, 2, 14);
  // crenellated zen top edge y=60..68 (notched parapet)
  for (let x = 0; x < 320; x += 20) { r(x, 58, 12, 10, 6); r(x, 58, 12, 2, 11); r(x + 12, 60, 8, 8, 8); }
  r(0, 66, 320, 2, 8);                       // parapet shadow line
  // wall base shadow near ground
  r(0, 140, 320, 5, 8);

  // ---------- ROOF over gate 100,52,120,14 (stepped pagoda, upturned eaves) ----------
  r(100, 58, 120, 6, 4); r(100, 58, 120, 2, 12);     // lower tier + lit edge
  r(96, 56, 6, 6, 4); r(218, 56, 6, 6, 4);           // upturned eave corners
  r(96, 56, 6, 2, 12); r(218, 56, 6, 2, 12);
  for (let x = 104; x < 216; x += 8) r(x, 61, 1, 3, 8); // tile ribs
  r(100, 64, 120, 3, 8);                             // eave shadow on wall
  r(96, 64, 128, 1, 0);                              // eave outline
  r(112, 50, 96, 6, 4); r(112, 50, 96, 2, 12);       // upper tier + lit edge
  r(108, 48, 5, 5, 4); r(207, 48, 5, 5, 4);          // upper upturned corners
  r(110, 56, 100, 1, 0);                             // upper tier outline
  r(154, 45, 12, 5, 4); r(158, 41, 4, 4, 14);        // ridge finial, copper cap

  // ---------- THE DOUBLE GATE 120,66,80,84 ----------
  r(118, 64, 84, 88, 0);                     // black outline frame
  r(120, 66, 80, 84, 8);                     // dark recess base
  // wooden planks (two leaves)
  for (let i = 0; i < 4; i++) { r(122 + i * 10, 68, 8, 80, 6); r(162 + i * 10, 68, 8, 80, 6); }
  // plank shadows at bottom of each leaf
  r(122, 138, 76, 10, 8);
  for (let i = 0; i < 4; i++) { r(122 + i * 10, 138, 8, 10, 6); r(162 + i * 10, 138, 8, 10, 6); }
  for (let i = 0; i < 8; i++) r(122 + i * 10 + (i > 3 ? 0 : 0), 68, 1, 80, 8); // plank grooves handled below
  for (let i = 1; i < 4; i++) { r(120 + i * 10, 68, 2, 80, 8); r(160 + i * 10, 68, 2, 80, 8); }
  r(158, 66, 4, 84, 0);                      // central divide x=160
  // horizontal copper bands
  r(122, 74, 76, 3, 14); r(122, 128, 76, 3, 14);
  r(122, 77, 76, 1, 6); r(122, 131, 76, 1, 6);
  // copper handles at (150,110) and (166,110)
  r(149, 109, 8, 8, 0); r(150, 110, 6, 6, 14); r(150, 110, 3, 2, 15);
  r(165, 109, 8, 8, 0); r(166, 110, 6, 6, 14); r(166, 110, 3, 2, 15);
  // safety stickers on the gate (tiny pale plaques)
  r(128, 92, 10, 6, 15); r(129, 94, 8, 1, 8);
  r(182, 96, 10, 6, 15); r(183, 98, 8, 1, 8);

  // ---------- GATE EYES 132,80,16,10 + 172,80,16,10 (blinking) ----------
  const blink = frame % 40 >= 36;
  const eye = (ex) => {
    r(ex - 1, 79, 18, 12, 0);                // dark socket outline
    if (blink) { r(ex, 80, 16, 10, 6); r(ex, 84, 16, 2, 0); } // closed lid
    else {
      r(ex, 80, 16, 10, 15);                 // white
      r(ex + 6, 82, 4, 6, 0);                // pupil 4x6
      r(ex + 6, 82, 2, 2, 8);                // pupil glint
      r(ex, 80, 16, 1, 8);                   // upper lid shade
    }
  };
  eye(132); eye(172);
  // worried eyebrows (tilted inward — permanent mild concern)
  r(133, 76, 10, 2, 0); r(141, 74, 8, 2, 0);
  r(171, 74, 8, 2, 0); r(177, 76, 10, 2, 0);

  // ---------- CONSTITUTION SCROLLS 92,80,20,52 & 208,80,20,52 ----------
  const scroll = (sx) => {
    r(sx - 1, 79, 22, 54, 0);                // outline
    r(sx, 80, 20, 52, 15);                   // parchment
    r(sx, 80, 20, 3, 7); r(sx, 129, 20, 3, 7); // rolled ends
    for (let y = 87; y < 126; y += 6) r(sx + 3, y, 14, 2, 8); // text lines
    r(sx + 3, 87, 14, 2, 4);                 // first clause in red: "אל תזיק"
  };
  scroll(92); scroll(208);

  // ---------- STONE LANTERNS 48,112,14,38 & 258,112,14,38 ----------
  const lantern = (lx, phase) => {
    r(lx + 1, 146, 12, 4, 7); r(lx + 1, 146, 12, 1, 8); // pedestal
    r(lx + 5, 134, 4, 12, 7); r(lx + 5, 134, 1, 12, 15); // post + light edge
    r(lx + 2, 130, 10, 4, 7); r(lx + 2, 130, 10, 1, 15); // platform under firebox
    r(lx, 118, 14, 12, 8);                   // firebox
    r(lx, 118, 14, 1, 7);
    const flick = (frame + phase) % 6 < 3 ? 3 : 11;
    r(lx + 4, 120, 6, 8, flick);             // flame window (certified flame)
    r(lx + 6, 123, 2, 3, 15);                // flame core
    // flame glow cast on wall behind
    if ((frame + phase) % 6 < 3) { r(lx - 3, 121, 3, 6, 12); r(lx + 14, 121, 3, 6, 12); }
    r(lx - 3, 114, 20, 4, 7); r(lx - 3, 114, 20, 1, 15); // sloped cap stone
    r(lx - 1, 112, 16, 2, 7);
    r(lx + 5, 108, 4, 4, 7); r(lx + 6, 106, 2, 2, 7);    // finial
    r(lx - 1, 150, 17, 3, 8);                // ground shadow
    // cool flame-light pool on the sand (flickers with the flame)
    if ((frame + phase) % 6 < 3) { r(lx - 5, 153, 24, 1, 11); r(lx - 2, 155, 18, 1, 11); }
    else r(lx - 3, 154, 20, 1, 11);
  };
  lantern(48, 0); lantern(258, 3);

  // ---------- BONSAI TREE 18,70,36,80 (S-curve trunk, stepped pads) ----------
  r(29, 118, 8, 34, 0); r(31, 118, 5, 34, 8); r(35, 118, 1, 34, 7); // lower trunk
  r(25, 104, 8, 16, 0); r(27, 104, 5, 16, 8); r(31, 104, 1, 16, 7); // bend left
  r(29, 92, 8, 14, 0); r(31, 92, 5, 14, 8);                          // bend back up
  r(36, 96, 10, 3, 8); r(20, 108, 8, 3, 8);                          // side branches
  r(44, 88, 3, 9, 8);  r(19, 100, 3, 9, 8);
  // flat foliage clouds, stepped bonsai pads (rounded: stacked rects)
  const pad = (px, py, pw) => {
    r(px + 3, py - 2, pw - 6, 2, 2);
    r(px, py, pw, 7, 2);
    r(px + 3, py + 7, pw - 6, 2, 2);
    r(px + 3, py - 2, pw - 6, 1, 10);        // top light
    r(px, py, 2, 7, 10);
    r(px + 3, py + 8, pw - 6, 1, 0);         // underside
  };
  pad(22, 72, 30); pad(12, 92, 22); pad(38, 82, 22);
  r(22, 150, 24, 3, 8);                      // tree shadow
  r(26, 148, 16, 3, 7); r(26, 148, 16, 1, 15); // small stone planter rim

  // ---------- SMALL SAFETY SIGN 226,120,26,18 ----------
  r(225, 119, 28, 20, 0);                    // outline
  r(226, 120, 26, 18, 15);
  r(229, 124, 20, 3, 8); r(229, 130, 20, 3, 8); // "text"
  r(237, 138, 4, 10, 8);                     // post

  // ---------- FLOOR: raked sand 145..200 (perspective rake lines) ----------
  r(0, 145, 320, 55, 14);
  r(0, 145, 320, 3, 6);                      // dark strip at wall base (depth)
  // rake lines: continuous gentle waves, spacing widens toward viewer
  const rakeYs = [150, 154, 159, 165, 172, 180, 189, 197];
  for (const y of rakeYs) {
    for (let x = 0; x < 320; x += 8) {
      const wob = ((x + y * 5) % 48) < 24 ? 0 : 1;   // long slow wave
      r(x, y + wob, 8, 1, 6);
    }
  }
  // sand grain dither near the viewer (depth: coarser texture up close)
  for (let y = 176; y < 200; y += 5)
    for (let x = ((y * 7) % 10); x < 320; x += 26) r(x, y + 2, 2, 1, 6);
  // warm light pool on sand in front of open sky gap above gate
  for (let x = 132; x < 190; x += 12) r(x, 147, 6, 1, 15);

  // ---------- STONE PATH to gate (widening downward zigzag) ----------
  const stones = [
    [156, 150, 10, 3], [150, 156, 11, 4], [160, 162, 12, 4],
    [148, 169, 13, 4], [161, 176, 14, 5], [146, 184, 15, 5], [158, 191, 16, 5],
  ];
  for (const [sx, sy, sw, sh] of stones) {
    r(sx, sy + sh - 1, sw, 1, 8);            // stone shadow
    r(sx, sy, sw, sh - 1, 7);
    r(sx, sy, sw, 1, 15);                    // top highlight
  }

  // ---------- GARDEN ROCKS (do not step!) ----------
  r(58, 171, 26, 2, 8);                       // ground shadow
  r(60, 160, 22, 11, 8); r(62, 157, 14, 4, 8); r(62, 160, 18, 2, 7); r(63, 158, 8, 1, 7);
  r(238, 181, 30, 2, 8);                      // ground shadow
  r(240, 168, 26, 13, 8); r(244, 164, 14, 5, 8); r(242, 168, 20, 2, 7); r(245, 165, 8, 1, 7);
  // rake circles around rocks
  r(52, 175, 38, 1, 6); r(232, 185, 42, 1, 6);
}
