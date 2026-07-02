// xai_truck.art.js — רחבת הטנדר החשמלי. כיפת מאדים מזויפת, טנדר משולש, קהל מבובות. Faction: xai.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- 1. DOME SKY (y0-80) — deep space, painted-on star trail ----------
  r(0, 0, 320, 80, 0);
  // fake star-trail: diagonal band from (20,10) to (300,55), suspiciously even spacing
  for (let i = 0; i < 29; i++) {
    const sx = 20 + i * 10;
    const sy = 10 + Math.floor(i * 1.6);
    r(sx, sy, 1, 1, 15);
    r(sx + 4, sy + 3, 1, 1, 7);
    if (i % 3 === 0) r(sx + 6, sy - 4, 1, 1, 7);
  }
  // two stars stutter — the dome projector needs maintenance
  const st = frame % 14 < 7;
  r(120, 26, 2, 2, st ? 15 : 8);
  r(220, 42, 2, 2, st ? 8 : 15);
  // one "star" is clearly a screw head
  r(250, 20, 4, 4, 7); r(251, 21, 2, 1, 8); r(251, 22, 2, 1, 8);

  // ---------- 2. DOME RIBS — curvature, budget edition ----------
  for (const ry of [18, 42, 66]) {
    r(30, ry, 260, 2, 8);
    r(12, ry + 2, 18, 2, 8); r(290, ry + 2, 18, 2, 8);   // stepped edges
    r(0, ry + 4, 12, 2, 8); r(308, ry + 4, 12, 2, 8);
  }

  // ---------- 3. MARS BACK WALL (y80-145) ----------
  r(0, 80, 320, 65, 4);
  r(0, 80, 320, 6, 8);                                    // shadow band under dome edge
  for (let y = 92; y < 145; y += 9)                       // faint dirt texture on wall
    for (let x = (y % 16); x < 320; x += 40) r(x, y, 2, 1, 8);
  // distant rocket skeletons (thin verticals + nose blobs), one at a Pisa angle
  r(8, 100, 4, 24, 8); r(7, 96, 6, 5, 8);
  r(40, 102, 4, 22, 8); r(39, 98, 6, 5, 8);
  r(44, 108, 3, 16, 8);                                   // the leaning one
  r(46, 103, 4, 6, 8);
  r(272, 100, 4, 24, 8); r(271, 96, 6, 5, 8);

  // ---------- 4. RED DISPLAY SPOTS — vertical light columns on the back wall ----------
  const beam = (hx, on) => {
    r(hx - 7, 2, 14, 5, 8); r(hx - 7, 2, 14, 1, 7);       // housing
    r(hx - 2, 7, 4, 2, on ? 12 : 8);                       // lens
    if (!on) return;
    // slim dithered column falling straight down the dome + wall
    for (let y = 9; y < 132; y += 4) {
      const w = 6 + ((y / 14) | 0) * 2;                    // gentle widening
      const x0 = hx - (w >> 1);
      r(x0, y, w, 4, 4);                                   // dark red body
      r(hx - 1, y, 2, 4, 12);                              // hot core
      if (y % 8 === 1) { r(x0, y, 1, 4, 12); r(x0 + w - 1, y, 1, 4, 12); } // shimmer edges
    }
    // red splash pool where the light lands
    r(hx - 12, 130, 24, 3, 12); r(hx - 16, 133, 32, 2, 4);
  };
  beam(107, true);
  beam(217, frame % 23 < 21);                              // blinks off. unpaid bill.

  // ---------- 9. "UNBREAKABLE GLASS — TRUST US" SIGN (x8-86, y44-92) ----------
  r(8, 44, 78, 48, 0);                                    // frame
  r(10, 46, 74, 44, 15);                                  // board
  for (let i = 0; i < 7; i++) r(14 + i * 10, 52, 7, 8, 4);   // "UNBREAKABLE"
  for (let i = 0; i < 5; i++) r(14 + i * 10, 64, 7, 8, 4);   // "GLASS"
  for (let i = 0; i < 6; i++) r(16 + i * 9, 78, 6, 4, 8);    // "TRUST US" (smaller, quieter)
  // crack on the SIGN, from top-right, taped over
  r(80, 48, 1, 4, 8); r(77, 52, 3, 1, 8); r(74, 53, 3, 1, 8); r(70, 54, 4, 1, 8); r(66, 55, 4, 1, 8);
  r(70, 50, 3, 4, 14); r(73, 52, 3, 4, 14); r(76, 54, 3, 4, 14);  // the tape. on the sign.
  r(76, 48, 3, 3, 14);

  // ---------- 5. PODIUM (x96-240, y132-150) ----------
  r(96, 132, 144, 6, 7);                                  // top slab
  r(96, 132, 144, 1, 0);                                  // top edge line
  r(96, 133, 144, 1, 15);                                 // catch-light
  r(96, 138, 144, 12, 8);                                 // front face
  r(96, 149, 144, 1, 0);
  for (let i = 0; i < 3; i++) r(150 + i * 9, 140, 6, 6, 15); // "MVP" block letters
  r(152 + 0, 142, 2, 2, 8); r(161, 142, 2, 2, 8); r(170, 142, 2, 2, 8);

  // ---------- 6. THE TRUCK — flat planes, knife angles, zero handles ----------
  // stepped wedge: rear slope 104→88 (fine 8px steps), peak, long knife nose down to 108
  for (let i = 0; i < 8; i++) {                           // rear slope up
    const tx = 104 + i * 8, tt = 104 - i * 2;
    r(tx, tt, 8, 132 - tt, 7);
    r(tx, tt, 8, 1, 0); r(tx + 8, tt - 2, 1, 2, 0);       // stepped outline
    r(tx + 1, tt + 1, 7, 1, 15);                          // steel catch-light on every step
  }
  r(168, 88, 14, 44, 7); r(168, 88, 14, 1, 0);            // the peak
  r(169, 89, 12, 1, 15);
  for (let i = 0; i < 5; i++) {                           // front knife slope down
    const tx = 182 + i * 10, tt = 92 + i * 4;
    r(tx, tt, 10, 132 - tt, 7);
    r(tx, tt, 10, 1, 0); r(tx, tt - 4, 1, 4, 0);
  }
  // lower facet — under-shadow plane
  r(104, 118, 128, 14, 8);
  r(104, 118, 128, 1, 0);                                 // fold seam line
  r(104, 104, 1, 28, 0); r(231, 108, 1, 24, 0);           // side edges
  r(104, 131, 128, 1, 0);                                 // bottom seam
  // light bar at the nose (P12) + tail light at the rear (P4)
  r(226, 110, 6, 3, 12); r(226, 110, 6, 1, 15);
  r(105, 106, 3, 3, 4);
  // door seams (fold lines) — two doors, zero apologies
  r(132, 106, 1, 25, 0); r(168, 110, 1, 21, 0); r(204, 106, 1, 25, 0);
  // NO handles: two conspicuous holes where handles should be
  r(140, 112, 6, 3, 0); r(196, 112, 6, 3, 0);
  // red display-light splash on the roof planes (the spots earn their electricity)
  r(120, 101, 14, 1, 12); r(136, 97, 12, 1, 12);
  r(196, 97, 12, 1, 12); r(210, 102, 10, 1, 12);
  // shadow on the podium slab under the truck
  r(108, 132, 122, 4, 0);
  // wheels — black slabs, P8 hub
  r(112, 124, 20, 14, 0); r(119, 129, 4, 4, 8);
  r(204, 124, 20, 14, 0); r(211, 129, 4, 4, 8);

  // ---------- 7. WINDSHIELD (x150-192, y92-110) — invincible. allegedly. ----------
  r(150, 92, 42, 18, 11);
  r(150, 92, 42, 1, 0); r(150, 109, 42, 1, 0); r(150, 92, 1, 18, 0); r(191, 92, 1, 18, 0);
  r(152, 94, 2, 2, 8);                                    // the old chip. from the original demo.
  // ---------- 8. THE KEY on the dash — welded, glowing, taunting ----------
  const kc = frame % 10 < 5 ? 14 : 15;
  r(166, 100, 10, 4, kc);                                 // key body
  r(168, 104, 2, 2, kc); r(172, 104, 2, 2, kc);           // teeth
  r(164, 106, 14, 1, 8);                                  // the weld bead. "ניצחת בקרב, לא במלחמה."
  // glint of invincibility, sweeping (drawn after key so it passes over it)
  const gx = 150 + (frame * 2) % 42;
  if (gx < 189) { r(gx, 93, 2, 8, 15); r(gx + 2, 101, 2, 8, 15); }

  // ---------- 12. MARS DIRT FLOOR (y145-200) ----------
  r(0, 145, 320, 55, 4);
  r(0, 145, 320, 2, 8);                                   // wall-floor line
  for (let y = 152; y < 200; y += 6) {                    // dirt clumps, denser near viewer
    const step = y < 168 ? 26 : y < 184 ? 16 : 11;
    for (let x = (y * 3 % 13); x < 320; x += step) r(x, y, 2, 2, 8);
  }
  r(0, 162, 320, 1, 8); r(0, 181, 320, 1, 8);             // perspective ridges in the dirt
  // scattered warmer pebbles
  r(60, 160, 3, 2, 6); r(230, 172, 4, 2, 6); r(120, 190, 4, 3, 6); r(290, 184, 3, 2, 6);
  // tire tracks: the truck was DRIVEN up there. warranty void.
  r(148, 196, 2, 4, 8); r(150, 188, 2, 8, 8); r(146, 180, 2, 8, 8); r(142, 172, 2, 8, 8);
  r(138, 164, 2, 8, 8); r(134, 156, 2, 8, 8); r(132, 150, 2, 6, 8);
  r(178, 196, 2, 4, 8); r(180, 188, 2, 8, 8); r(184, 180, 2, 8, 8); r(188, 172, 2, 8, 8);
  r(192, 164, 2, 8, 8); r(196, 156, 2, 8, 8); r(198, 150, 2, 6, 8);
  // the scorch mark. someone already tried. you feel a kinship. and dread.
  r(90, 168, 14, 6, 8); r(92, 169, 10, 4, 0); r(95, 170, 4, 2, 8);
  // podium ground shadow
  r(94, 150, 148, 3, 8);

  // ---------- 10. MANNEQUIN FANS — the only crowd that never asks "when" ----------
  const fan = (x, backwards, sign) => {
    r(x + 2, 124, 6, 6, 6);                               // head
    if (backwards) { r(x + 2, 126, 1, 1, 15); }           // face on the wrong side
    else { r(x + 4, 126, 1, 1, 15); r(x + 6, 126, 1, 1, 15); }
    r(x + 1, 130, 8, 12, 1);                              // torso
    r(x + 1, 130, 8, 1, 9);                               // shoulder light
    r(x - 1, 116, 2, 12, 6); r(x + 9, 116, 2, 12, 6);     // arms up, frozen mid-worship
    r(x - 1, 115, 2, 2, 6); r(x + 9, 115, 2, 2, 6);       // hands
    r(x, 128, 2, 3, 6); r(x + 8, 128, 2, 3, 6);           // shoulders connect
    r(x + 2, 142, 2, 8, 1); r(x + 6, 142, 2, 8, 1);       // legs
    r(x + 1, 149, 8, 2, 0);                               // little shadow
    if (sign) {                                            // the fan-sign, with heart
      r(x - 3, 113, 10, 8, 0);                             // outline
      r(x - 2, 114, 8, 6, 15);
      r(x, 116, 2, 2, 4); r(x + 3, 116, 2, 2, 4);          // the heart. two pixels of devotion.
      r(x + 1, 118, 3, 1, 4);
      r(x + 1, 121, 1, 2, 6);                              // stick
    }
  };
  fan(31, false, false);
  fan(46, false, true);                                   // the sign holder
  fan(61, true, false);                                   // head on backwards. "מהזווית של המצלמה זה מדהים."
  // group B: one standing, one down since last demo
  fan(262, false, false);
  r(252, 144, 12, 6, 1);                                  // the fallen one, horizontal
  r(252, 144, 4, 4, 6);                                   // head, on the floor
  r(254, 145, 1, 1, 15);                                  // still smiling at the ceiling
  r(251, 149, 14, 2, 8);                                  // shadow. known issue. severity: cosmetic.

  // ---------- 11. SERVICE CRANE (x282-318) ----------
  r(296, 56, 4, 94, 8);                                   // mast
  r(296, 56, 1, 94, 0); r(299, 56, 1, 94, 0);
  for (let y = 64; y < 145; y += 14) r(297, y, 2, 2, 0);  // truss holes
  r(250, 60, 50, 5, 8);                                   // arm reaching left
  r(250, 60, 50, 1, 0); r(250, 64, 50, 1, 0);
  const sway = frame % 16 < 8 ? 1 : -1;
  r(252 + sway, 65, 1, 13, 6);                            // cable
  r(250 + sway, 78, 5, 5, 6);                             // the hook
  r(251 + sway, 79, 3, 2, 14);                            // hook glint
  r(302, 96, 8, 8, 14);                                   // "DO NOT" sign...
  r(302, 100, 8, 4, 8);                                   // ...bottom half missing. do not WHAT.
  r(303, 97, 6, 2, 0);                                    // remaining letters
  r(284, 140, 34, 10, 8);                                 // crane base block
  r(284, 140, 34, 1, 7); r(284, 149, 34, 1, 0);
  r(288, 143, 4, 4, 0); r(308, 143, 4, 4, 0);             // base bolts
}
