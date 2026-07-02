// fable_finale.art.js — פתח הבונקר — המהלך האחרון
// The bunker mouth seen from INSIDE. Giant round steel door half-open (swung
// inward-left); through the gap — four corporate agents crammed behind
// 40,000-page contract stacks. Front: the shiniest tile floor in the game.
// Purple-pink dream glow (Fable's core, below us) spills in from the edges.
// Animations: glow breathing, emergency light blink, flying contract pages,
// bucket steam, speaker pulse, threshold shimmer.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ============ CEILING / ROCK (0,0,320,22) ============
  r(0, 0, 320, 22, 8);
  for (let x = 0; x < 320; x += 36) r(x, 0, 2, 22, 7);        // concrete seams
  r(0, 20, 320, 2, 0);                                         // seam under ceiling
  // two hairline cracks
  r(58, 2, 1, 6, 0); r(59, 8, 1, 5, 0); r(58, 13, 1, 5, 0); r(60, 4, 2, 1, 0);
  r(238, 3, 1, 5, 0); r(237, 8, 1, 6, 0); r(238, 14, 1, 4, 0); r(236, 10, 2, 1, 0);

  // ============ BACK WALL (0,22,320,114) — riveted bunker panels ============
  r(0, 22, 320, 114, 8);
  for (let px = 2; px < 320; px += 40) {
    r(px, 26, 36, 52, 7);                                      // upper plate row
    r(px, 26, 36, 1, 15); r(px, 77, 36, 1, 0);                 // lit top / dark bottom
    r(px, 82, 36, 50, 7);                                      // lower plate row
    r(px, 82, 36, 1, 15); r(px, 131, 36, 1, 0);
    // rivet dots at plate corners
    for (const [rx, ry] of [[px + 2, 28], [px + 32, 28], [px + 2, 74], [px + 32, 74],
                            [px + 2, 84], [px + 32, 84], [px + 2, 128], [px + 32, 128]])
      r(rx, ry, 2, 2, 0);
  }
  // gloom dither near the ceiling
  for (let x = 0; x < 320; x += 8) r(x + ((x / 8) % 2) * 4, 23, 4, 2, 0);
  // hazard chevron posts flanking the door (very bunker)
  for (const hx of [102, 210]) {
    r(hx - 1, 96, 10, 40, 0);
    for (let y = 97; y < 135; y += 8) { r(hx, y, 8, 4, 14); r(hx, y + 4, 8, 4, 0); }
    r(hx, 96, 8, 1, 15);
  }
  // conduit pipe running down the left wall, with junction box + valve
  r(66, 22, 5, 114, 7); r(66, 22, 1, 114, 15); r(70, 22, 1, 114, 8);
  r(64, 34, 9, 3, 8); r(64, 96, 9, 3, 8);                      // brackets
  r(62, 58, 13, 14, 0); r(63, 59, 11, 12, 8); r(64, 60, 9, 2, 7); // junction box
  r(66, 64, 5, 5, 4); r(67, 65, 1, 1, 12);                     // valve wheel
  // faded stencil plate on the right wall (bunker level marker)
  r(228, 46, 26, 18, 0); r(229, 47, 24, 16, 7); r(230, 48, 22, 2, 8);
  r(233, 52, 4, 9, 8); r(240, 52, 2, 9, 8); r(245, 52, 4, 9, 8); // blocky "I0I" glyphs
  // dream-crack in the back wall — reality coming apart at the seams (pulses)
  const dc = frame % 30 < 15 ? 13 : 5;
  r(44, 88, 1, 8, dc); r(45, 96, 1, 6, dc); r(43, 102, 1, 7, dc);
  r(44, 109, 2, 5, dc); r(46, 114, 1, 8, dc);
  r(42, 94, 2, 1, dc); r(47, 106, 2, 1, dc);
  if (frame % 30 < 15) { r(43, 90, 1, 3, 15); r(44, 111, 1, 2, 15); }
  // skirting at wall base
  r(0, 136, 320, 9, 7); r(0, 136, 320, 1, 0); r(0, 143, 320, 2, 8);
  r(42, 136, 1, 9, dc);                                        // crack continues into skirting

  // ============ SHINY TILE FLOOR (0,145,320,55) ============
  r(0, 145, 320, 55, 11);
  r(0, 145, 320, 2, 3);                                        // dark seam at wall base
  // horizontal grout lines, perspective spacing
  for (const gy of [152, 159, 168, 179, 192]) r(0, gy, 320, 1, 3);
  // vertical grout fanning out from center
  const bands = [[147, 152], [153, 159], [160, 168], [169, 179], [180, 192], [193, 200]];
  for (let k = -6; k <= 6; k++) {
    if (k === 0) continue;
    for (const [y0, y1] of bands) {
      const f = 0.62 + ((y0 + y1) / 2 - 145) / 55 * 0.75;
      const gx = Math.round(160 + k * 26 * f);
      if (gx > 0 && gx < 320) r(gx, y0, 1, y1 - y0, 3);
    }
  }
  // far strip of floor reads darker (depth) — dense→sparse P3 dither on P11
  for (let x = 0; x < 320; x += 4) { r(x, 146, 2, 1, 3); r(x + 2, 147, 2, 1, 3); }
  for (let x = 0; x < 320; x += 4) r(x + ((x / 4) % 2) * 2, 148, 2, 1, 3);
  for (let x = 2; x < 320; x += 8) r(x, 150, 2, 1, 3);
  for (let x = 6; x < 320; x += 12) r(x, 154, 2, 1, 3);
  // hazard posts mirrored on the polish
  for (const hx of [102, 210]) {
    r(hx + 1, 147, 6, 2, 14); r(hx + 2, 150, 4, 2, 3); r(hx + 2, 153, 4, 1, 14);
  }
  // polish glints
  r(148, 163, 6, 1, 15); r(170, 172, 6, 1, 15); r(132, 184, 5, 1, 15);
  r(268, 152, 6, 1, 15); r(282, 160, 5, 1, 15);
  r(60, 175, 6, 1, 15); r(230, 186, 6, 1, 15);

  // ============ PURPLE DREAM GLOW — breathing side spills ============
  const gw = 22 + (frame % 20 < 10 ? 2 : 0);                   // glow breathes ±2px
  for (const left of [true, false]) {
    const x0 = left ? 0 : 320 - gw;
    r(x0, 120, gw, 80, 5);                                     // deep magenta base
    r(left ? 0 : 320 - gw + 8, 120, gw - 8, 80, 13);           // bright core band
    // clean 2px-strip dither edge P5→wall
    const ex = left ? gw : 320 - gw - 2;
    for (let y = 120; y < 200; y += 4) r(ex, y, 2, 2, 5);
    const ex2 = left ? gw + 2 : 320 - gw - 4;
    for (let y = 122; y < 200; y += 4) r(ex2, y, 2, 2, 5);
    // hot rim at the very screen edge (dithered so it glows, not glares)
    r(left ? 0 : 318, 124, 2, 72, 15);
    for (let y = 126; y < 194; y += 4) r(left ? 2 : 316, y, 1, 2, 15);
  }

  // ============ ROUND STEEL DOOR — stepped-rect "circle", centered 160,88 ====
  const outer = [[30, 4, 20], [34, 4, 30], [38, 4, 37], [42, 4, 42], [46, 6, 45], [52, 68, 48],
                 [120, 6, 45], [126, 4, 42], [130, 4, 37], [134, 4, 30], [138, 8, 20]];
  const inner = [[36, 4, 24], [40, 4, 33], [44, 4, 39], [48, 6, 42], [54, 64, 44],
                 [118, 6, 42], [124, 4, 39], [128, 4, 33], [132, 4, 24]];
  for (const [y, h, hw] of outer) r(160 - hw - 2, y - 1, hw * 2 + 4, h + 2, 0);  // black outline
  for (const [y, h, hw] of outer) r(160 - hw, y, hw * 2, h, 7);                  // steel ring
  r(113, 52, 3, 68, 15); r(122, 36, 3, 4, 15); r(116, 44, 3, 6, 15); // lit left arc
  r(204, 52, 3, 68, 8); r(199, 122, 4, 6, 8); r(196, 128, 4, 4, 8);  // shaded right arc
  for (const [y, h, hw] of inner) r(160 - hw, y, hw * 2, h, 8);                  // inner face
  // door slab detail: concentric rivet arc + panel ring on the slab (left of gap)
  for (const [rx, ry] of [[142, 40], [128, 48], [122, 62], [120, 84], [122, 106], [128, 120], [142, 128]]) {
    r(rx, ry, 3, 3, 0); r(rx, ry, 1, 1, 15);
  }
  r(126, 56, 1, 60, 0);                                        // inner panel seam arc
  r(130, 50, 24, 1, 0); r(130, 122, 24, 1, 0);

  // ============ OPEN GAP → OUTSIDE (170,44,~34,92) — night + paper chaos =====
  for (const [y, h, hw] of inner) {
    const y0 = Math.max(y, 44), y1 = Math.min(y + h, 136);
    if (y1 > y0) r(170, y0, 160 + hw - 170, y1 - y0, 0);
  }
  // faint stars / drifting paper flecks in the night outside
  r(176, 50, 1, 1, 15); r(192, 58, 1, 1, 7); r(184, 66, 2, 1, 15); r(198, 52, 1, 1, 7);
  r(174, 60, 1, 1, 7); r(196, 70, 2, 1, 15); r(188, 48, 1, 1, 15);
  r(172, 74, 30, 1, 8);                                        // paper-strewn horizon line
  for (let x = 173; x < 200; x += 5) r(x, 76, 3, 1, 7);        // ground litter of pages

  // ============ FOUR AGENTS peering through the gap ============
  // ties/trims: P3 Anthropic · P15 OpenAI · P4 xAI · P14 Google
  const agents = [[172, 88, 22, 3], [180, 84, 26, 15], [188, 88, 22, 4], [196, 86, 24, 14]];
  for (const [ax, ay, ah, tie] of agents) {
    r(ax, ay + 5, 8, ah - 5, 8);                               // suit body
    r(ax, ay + 5, 8, 1, 7);                                    // shoulder light
    r(ax + 2, ay, 4, 5, 7);                                    // head
    r(ax + 3, ay + 2, 1, 1, 0); r(ax + 5, ay + 2, 1, 1, 0);    // beady eyes
    r(ax + 3, ay + 6, 2, 6, tie);                              // brand tie
  }
  r(181, 96, 4, 5, 15); r(182, 97, 2, 1, 8); r(182, 99, 2, 1, 8); // clipboard (agent 2)

  // ============ CONTRACT STACKS — 40,000 pages ============
  for (const [sx, sy, sw, sh] of [[172, 116, 10, 20], [186, 112, 12, 24], [198, 118, 8, 18]]) {
    r(sx - 1, sy - 1, sw + 2, sh + 1, 0);                      // outline
    r(sx, sy, sw, sh, 15);                                     // paper block
    for (let y = sy + 2; y < sy + sh; y += 2) r(sx, y, sw, 1, 7); // page lines
    r(sx, sy, sw, 1, 15);
  }
  // flying loose pages (animation)
  const drift = (frame * 3) % 30;
  r(174 + drift, 106, 2, 1, 15);
  r(198 - Math.floor(drift / 2), 100, 2, 1, 15);
  r(180 + Math.floor(drift / 3), 111, 1, 1, 7);

  // ============ DOOR SLAB EDGE (swung inward-left) ============
  r(166, 44, 4, 92, 7);                                        // door thickness edge
  r(166, 44, 1, 92, 15);                                       // lit rim
  r(169, 44, 1, 92, 0);                                        // black boundary to gap
  // wheel-handle: P6 cross on the slab
  r(150, 74, 20, 2, 0); r(156, 68, 8, 20, 0);                  // handle shadow backing
  r(152, 76, 16, 4, 6); r(158, 70, 4, 16, 6);
  r(152, 76, 16, 1, 14); r(158, 70, 1, 16, 14);                // brass glint
  r(158, 76, 4, 4, 0);                                         // hub

  // ============ EMPTY HOOK + sign-sized ghost shadow (the loudest hint) =======
  r(134, 62, 2, 2, 0);                                         // mounting bolt
  r(134, 64, 2, 9, 6); r(134, 71, 5, 2, 6);                    // hook shaft + curled tip
  r(138, 69, 1, 2, 6);
  r(134, 64, 1, 9, 14);                                        // brass glint
  r(132, 76, 10, 12, 7);                                       // faint clean patch — exactly sign-sized
  r(132, 76, 2, 2, 0); r(140, 76, 2, 2, 0);                    // ghost corners
  r(132, 86, 2, 2, 0); r(140, 86, 2, 2, 0);

  // ============ EMERGENCY LIGHT above the door ============
  r(158, 22, 4, 4, 7);                                         // bracket
  const lit = frame % 8 < 4;
  r(149, 25, 22, 10, 0);                                       // housing outline
  r(150, 26, 20, 8, 8);                                        // casing
  r(154, 28, 12, 5, lit ? 12 : 4);                             // lens blinks P12↔P4
  if (lit) {
    r(156, 29, 4, 2, 15);                                      // hot core
    r(146, 27, 3, 2, 12); r(171, 27, 3, 2, 12);                // side flare
    r(134, 36, 52, 2, 4);                                      // red flicker on door top
  }

  // ============ UNDER-DOOR PURPLE SEEP (110,140,100,6) ============
  const seep = frame % 20 < 10 ? 0 : 1;
  r(118 - seep, 141, 84 + seep * 2, 3, 13);
  for (let x = 112; x < 208; x += 6) r(x, 140, 3, 1, 13);      // dithered top edge
  for (let x = 112; x < 208; x += 6) r(x, 144, 3, 2, 5);       // dither fringe
  r(150, 141, 20, 2, 15);                                      // hot center

  // ============ THREE STEPS up to the door (drawn over the seep fringe) ======
  // widest at the bottom (closest), narrowing up to the door — solid block first
  r(125, 143, 70, 18, 0);                                      // full black backing
  r(126, 144, 68, 5, 7); r(126, 144, 68, 1, 15); r(126, 148, 68, 1, 8); // top step
  r(132, 150, 56, 5, 8); r(132, 150, 56, 1, 11); r(132, 154, 56, 1, 0); // mid step (shaded)
  r(140, 156, 40, 4, 7); r(140, 156, 40, 1, 15); r(140, 159, 40, 1, 8); // bottom step
  // worn middle (a million technician steps)
  r(148, 145, 24, 2, 8); r(152, 151, 16, 2, 7); r(154, 157, 12, 1, 8);
  // contact shadow of the half-open door slab falling on the top step
  r(128, 144, 36, 1, 8);
  // purple rim-light licking the bottom step edge (the core is below us)
  r(146, 160, 28, 1, 13);
  // faint glow reflection smeared on the polish below the steps
  for (let x = 148; x < 172; x += 6) r(x, 162, 3, 1, 13);
  for (let x = 152; x < 170; x += 8) r(x, 165, 2, 1, 13);

  // ============ AGENTS' REFLECTION on the shiny floor (below the steps) ======
  for (let x = 174; x < 202; x += 7) {                         // faint upside-down smears
    r(x, 161, 3, 6, 7); r(x + 1, 167, 1, 3, 7);
  }
  r(181, 162, 1, 4, 3); r(195, 162, 1, 4, 4);                  // hint of tie colors
  // dim reflection of the steel door frame on the polish — vertical shafts
  r(120, 161, 2, 9, 7); r(121, 170, 1, 5, 7);
  r(198, 161, 2, 9, 7); r(199, 170, 1, 5, 7);

  // ============ CLEANING CART + STEAMING BUCKET (destiny parked) ============
  r(261, 115, 38, 28, 0);                                      // outline
  r(262, 116, 36, 26, 6);                                      // cart body
  r(262, 116, 36, 2, 14);                                      // worn top edge
  r(264, 122, 32, 1, 8); r(264, 132, 32, 1, 8);                // shelf lines
  r(266, 124, 8, 7, 7); r(276, 124, 6, 7, 4); r(284, 124, 9, 7, 3); // bottles
  r(258, 112, 4, 16, 8); r(258, 112, 4, 1, 15);                // handle-bar
  r(264, 140, 4, 4, 0); r(292, 140, 4, 4, 0);                  // wheels
  r(265, 141, 1, 1, 15); r(293, 141, 1, 1, 15);                // wheel glints
  r(262, 144, 36, 2, 8);                                       // cart shadow
  // the bucket that knows
  r(269, 107, 14, 12, 0);
  r(270, 108, 12, 10, 7); r(270, 108, 12, 2, 11);              // water surface
  r(271, 109, 4, 1, 15);
  r(270, 106, 12, 2, 8);                                       // rim
  // steam (animation) — rising, flickering
  const sy = 104 - (frame % 12);
  if (frame % 4 < 3) { r(274, sy, 1, 2, 15); r(278, sy - 4, 1, 2, 15); }
  r(276, 100 - (frame % 8), 1, 1, 7);

  // ============ SPEAKERS at dream-wrong angles (Fable's voice) ============
  const speaker = (sx0, sy0, tilt) => {
    r(sx0 - 1, sy0 - 1, 18, 8, 0); r(sx0 + tilt - 1, sy0 + 5, 18, 8, 0); // outline (tilted)
    r(sx0, sy0, 16, 6, 6); r(sx0 + tilt, sy0 + 6, 16, 6, 6);   // wooden box, 2px skew
    r(sx0, sy0, 16, 1, 14);                                    // lit top
    r(sx0 + tilt, sy0 + 11, 16, 1, 0);
    r(sx0 + 4, sy0 + 2, 10, 8, 8);                             // cone outer
    r(sx0 + 6, sy0 + 4, 6, 4, 0);                              // cone throat
    r(sx0 + 8, sy0 + 5, 2, 2, 7);                              // dust cap
    if (frame % 30 < 6) {                                      // P13 voice pulse ring
      r(sx0 + 1, sy0 - 4, 14, 1, 13); r(sx0 + tilt + 1, sy0 + 14, 14, 1, 13);
      r(sx0 - 4, sy0 + 2, 1, 8, 13); r(sx0 + 20, sy0 + 2, 1, 8, 13);
    }
  };
  speaker(34, 38, 2); speaker(282, 52, -2);
  // hanging wires from ceiling
  r(41, 22, 1, 16, 0); r(290, 22, 1, 30, 0);

  // ============ FLOATING TILE SHARD — dream-logic, gravity is a suggestion ====
  const bob = frame % 16 < 8 ? 0 : 1;
  r(52, 170 + bob, 12, 3, 11); r(52, 170 + bob, 12, 1, 15);    // the tile, hovering
  r(52, 172 + bob, 12, 1, 3);
  r(54, 178, 10, 1, 3);                                        // hole it left in the floor
  r(54, 179, 10, 1, 8);
  for (let x = 53; x < 63; x += 4) r(x, 175 + bob, 1, 1, 13);  // purple motes beneath it

  // ============ WORN WALK-PATH (threshold → steps, 20 years of sponja) =======
  r(154, 160, 14, 1, 3); r(150, 169, 20, 1, 3);
  r(148, 180, 26, 1, 3); r(146, 193, 30, 1, 3);

  // ============ DOWN-EXIT THRESHOLD → fable_core (glowing strip) ============
  r(128, 195, 64, 1, 5);
  r(130, 196, 60, 4, frame % 20 < 10 ? 13 : 5);
  for (let x = 132; x < 188; x += 8) r(x + (frame % 8), 197, 2, 2, 15);
}
