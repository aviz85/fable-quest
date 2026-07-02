// google_corridors.art.js — מסדרונות האינסוף (Google chapter)
// 320x200 EGA, Sierra SCI0. fillRect only.
// Infinite white corridor: identical kitchenette doorways receding toward a
// vanishing point at (160,98), primary-color lintels (branding never dies),
// a red beta slide that goes UP, the "אינסוף-3" meeting door (in use since
// 2023), two signs pointing at each other, a plastic-wrapped orange couch,
// and צחי — the employee with no team, forever checking both directions.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };
  const line = (x0, y0, x1, y1, c, t = 1) => {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (let i = 0; i <= n; i++)
      r(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), t, t, c);
  };

  // ---------- base planes: everything white, corridor perspective ----------
  r(0, 0, 320, 145, 15);                                       // ceiling + walls
  // ceiling corner edges → converge to back wall top (140..180, y84)
  line(0, 0, 140, 84, 7); line(319, 0, 180, 84, 7);
  // ceiling panel seam rows, shortening toward center
  for (const y of [6, 16, 26, 36]) {
    const lx = Math.round(140 * y / 84);
    r(lx, y, 320 - 2 * lx, 1, 7);
  }
  // converging ceiling seams from top edge toward VP
  for (const sx of [64, 256]) {
    const ex = sx + (160 - sx) * 84 / 98;
    line(sx, 0, ex, 82, 7);
  }
  // fluorescent strips (the middle one flickers, of course)
  for (const [fx, mid] of [[60, 0], [148, 1], [236, 0]]) {
    r(fx - 1, 7, 26, 5, 7);
    r(fx, 8, 24, 3, mid && frame % 13 < 2 ? 8 : 11);
  }
  // deeper, smaller strips down the corridor spine
  r(152, 26, 16, 2, 11); r(156, 40, 10, 2, 11);

  // near-corner shading — the corridor frames itself
  r(0, 44, 2, 101, 7); r(318, 44, 2, 101, 7);

  // ---------- wall seams converging toward VP ----------
  line(0, 56, 138, 88, 7); line(0, 122, 138, 111, 7);
  line(319, 56, 182, 88, 7); line(319, 122, 182, 111, 7);

  // ---------- back wall / vanishing point (140..180, y84..120) ----------
  r(140, 84, 40, 36, 7);
  r(140, 84, 2, 36, 8); r(178, 84, 2, 36, 8);                  // side shade
  r(139, 83, 42, 1, 8);
  r(154, 88, 12, 1, 11);                                       // far fluorescent
  // microscopic brand strip over the far doorway
  r(154, 106, 3, 2, 1); r(157, 106, 3, 2, 4); r(160, 106, 3, 2, 14); r(163, 106, 3, 2, 2);
  r(158, 110, 4, 10, 8);                                       // doorway to... more corridor
  r(159, 111, 2, 9, 0);                                        // and it's dark in there

  // ---------- kitchenette helper ----------
  const kitchen = (x, y, w, h, lintelC, f) => {
    r(x - 1, y - 1, w + 2, h + 1, 0);                          // outline
    r(x, y, w, h, 7);                                          // frame
    r(x + f, y + f, w - 2 * f, h - f, 8);                      // dark interior
    r(x - 1, y - 5, w + 2, 4, lintelC);                        // identity bar
    r(x - 1, y - 6, w + 2, 1, 0);
  };
  // left wall: A, B (mostly behind the slide), C
  kitchen(6, 78, 34, 67, 1, 3);
  r(11, 112, 24, 4, 11); r(11, 116, 24, 1, 7);                 // counter A
  r(13, 100, 7, 12, 7); r(14, 102, 5, 4, 0); r(15, 108, 2, 1, 4); // dead machine
  kitchen(58, 88, 24, 50, 4, 2);
  r(62, 114, 16, 3, 11);
  kitchen(104, 94, 16, 36, 14, 2);
  r(107, 114, 10, 3, 11);
  // right wall: E, D (the D one still smells of coffee)
  kitchen(246, 88, 22, 50, 14, 2);
  r(250, 112, 14, 3, 11);
  kitchen(286, 78, 32, 67, 2, 3);
  r(292, 112, 22, 4, 11); r(292, 116, 22, 1, 7);               // counter D
  r(296, 98, 10, 14, 7); r(298, 102, 5, 5, 0);                 // living machine
  r(298, 108, 4, 3, 14);                                       // warm glow
  r(300, 94 + ((frame >> 2) % 2), 2, 2, 7);                    // steam. real steam.

  // ---------- floor: gray carpet with perspective wedge ----------
  r(0, 145, 320, 55, 7);
  for (let y = 120; y < 145; y++) {
    const t = (y - 120) / 25;
    const lx = Math.round(140 * (1 - t));
    r(lx, y, 320 - 2 * lx, 1, 7);
  }
  // far floor reads darker (dither strips)
  for (let y = 121; y < 133; y += 2) {
    const t = (y - 120) / 25;
    const lx = Math.round(140 * (1 - t));
    r(lx, y, 320 - 2 * lx, 1, 8);
  }
  // baseboards along the wall-floor edge
  line(0, 141, 138, 117, 7, 2); line(0, 144, 140, 120, 8);
  line(319, 141, 182, 117, 7, 2); line(319, 144, 180, 120, 8);
  r(140, 118, 40, 2, 7); r(140, 120, 40, 1, 8);
  // carpet seams converging to VP
  for (const xb of [50, 105, 215, 270]) {
    const xt = Math.round(160 + (xb - 160) * 22 / 102);
    line(xb, 199, xt, 122, 8);
  }
  // 2x2 dither rows, widening toward the player
  for (const [y, step, off] of [[150, 36, 6], [158, 30, 16], [168, 26, 4], [180, 22, 12], [192, 18, 2]])
    for (let x = off; x < 320; x += step) r(x, y, 2, 2, 8);

  // THE LINE: a navigation stripe that navigates to itself
  r(0, 170, 250, 3, 1);                                        // out...
  r(250, 170, 4, 15, 1);                                       // the "turn"
  r(0, 182, 250, 3, 1);                                        // ...and back
  // the runner pixel, eternally commuting
  const gp = (frame * 3) % 524;
  let gx, gy;
  if (gp < 250) { gx = gp; gy = 170; }
  else if (gp < 262) { gx = 250; gy = 170 + (gp - 250); }
  else { gx = 250 - (gp - 262); gy = 182; }
  r(gx, gy, 3, 3, 9);
  // worn patch where צחי has stood through eight reorgs
  r(178, 150, 20, 8, 8);
  r(180, 152, 16, 4, 7);

  // ---------- THE SLIDE (red, beta, goes up; x46..100) ----------
  r(44, 42, 38, 4, 8); r(46, 42, 34, 2, 0);                    // ceiling hole rim
  // tube arc faked with stepped segments drifting right on the way down
  const segs = [[46, 44, 28, 12], [49, 56, 30, 12], [53, 68, 32, 12], [57, 80, 34, 13], [61, 93, 36, 13]];
  for (const [sx, sy, sw, sh] of segs) {
    r(sx - 2, sy, sw + 4, sh, 0);                              // outline
    r(sx, sy, sw, sh, 4);                                      // tube body
    r(sx + 2, sy, 4, sh, 12);                                  // shine strip
    r(sx + sw - 4, sy, 3, sh, 8);                              // shaded edge
    r(sx, sy + sh - 2, sw, 1, 12);                             // seam highlight
  }
  // mouth block on the floor
  r(58, 106, 42, 42, 4);
  r(58, 106, 3, 42, 12);                                       // mouth-block shine
  r(58, 106, 42, 2, 12);
  r(56, 106, 2, 42, 0); r(100, 106, 2, 42, 0); r(58, 146, 42, 2, 0);
  r(62, 110, 34, 2, 14); r(62, 110, 2, 36, 14); r(94, 110, 2, 36, 14); // safety rim
  r(64, 112, 30, 33, 0);                                       // the hole. it goes UP.
  r(66, 114, 26, 2, 8); r(68, 120, 22, 1, 8);
  // anti-gravity glint rising in the dark (beta physics)
  const uy = 142 - (frame % 16) * 2;
  if (uy > 114) r(74, uy, 4, 2, 12);
  r(54, 148, 52, 3, 8);                                        // contact shadow
  // sign on the tube: UP. because beta.
  r(48, 96, 18, 12, 0);
  r(55, 99, 3, 6, 15); r(54, 100, 1, 2, 15); r(58, 100, 1, 2, 15);
  r(51, 106, 12, 1, 15);
  // dusty beta tag + string
  r(80, 60, 8, 1, 8);
  r(88, 58, 8, 5, 15); r(87, 57, 10, 1, 8); r(87, 63, 10, 1, 8);
  r(89, 59, 2, 1, 8); r(93, 61, 2, 1, 8);

  // ---------- meeting-room double door "אינסוף-3" (x196..240) ----------
  r(189, 63, 58, 85, 8);                                       // alcove edge
  r(190, 64, 56, 82, 15);                                      // facing wall panel
  r(195, 69, 46, 1, 0); r(195, 69, 1, 76, 0); r(240, 69, 1, 76, 0);
  r(196, 70, 44, 75, 7);                                       // frame
  r(199, 73, 38, 72, 15);                                      // doors
  r(217, 73, 2, 72, 0);                                        // center seam
  r(205, 80, 6, 14, 11); r(225, 80, 6, 14, 11);                // glass slits
  r(204, 79, 8, 1, 8); r(224, 79, 8, 1, 8);
  r(211, 110, 4, 3, 8); r(221, 110, 4, 3, 8);                  // handles
  r(199, 143, 38, 2, 7);                                       // kick plate
  r(188, 145, 60, 3, 8);                                       // shadow
  // sign board above: אינסוף-3 (in fluent rectangle)
  r(197, 57, 42, 12, 0);
  r(202, 60, 6, 5, 15); r(204, 62, 2, 1, 0);                   // ∞ loop 1
  r(210, 60, 6, 5, 15); r(212, 62, 2, 1, 0);                   // ∞ loop 2
  r(220, 62, 5, 1, 15);                                        // dash
  r(231, 60, 2, 5, 15); r(228, 60, 3, 1, 15); r(228, 62, 3, 1, 15); r(228, 64, 3, 1, 15); // 3
  // "בשימוש" LED — blinking since 2023
  r(215, 51, 6, 6, 0);
  r(216, 52, 4, 4, frame % 20 < 10 ? 4 : 8);

  // ---------- contradictory direction signs (they point at each other) ----------
  r(128, 38, 1, 8, 8); r(190, 38, 1, 8, 8);                    // stems
  r(109, 45, 42, 14, 0); r(110, 46, 40, 12, 15);               // sign 1
  r(114, 48, 20, 1, 8);
  r(116, 51, 16, 2, 0); r(132, 49, 2, 6, 0); r(134, 50, 2, 4, 0); r(136, 51, 2, 2, 0); // →
  r(120, 55, 16, 1, 8);
  r(169, 45, 42, 14, 0); r(170, 46, 40, 12, 15);               // sign 2
  r(186, 48, 18, 1, 8);
  r(180, 51, 16, 2, 0); r(178, 49, 2, 6, 0); r(176, 50, 2, 4, 0); r(174, 51, 2, 2, 0); // ←
  r(184, 55, 16, 1, 8);

  // ---------- orange couch, still in its wrapper (x118..166) ----------
  r(116, 148, 52, 3, 8);                                       // shadow
  r(120, 116, 44, 10, 14);                                     // backrest
  r(119, 115, 46, 1, 0); r(119, 115, 1, 11, 0); r(164, 115, 1, 11, 0);
  r(121, 117, 42, 1, 15);                                      // nylon sheen
  r(141, 116, 2, 10, 6);                                       // backrest seam
  r(118, 126, 6, 22, 6); r(160, 126, 6, 22, 6);                // armrests
  r(117, 125, 1, 23, 0); r(166, 125, 1, 23, 0);
  r(118, 125, 6, 1, 0); r(160, 125, 6, 1, 0);
  r(124, 136, 36, 12, 6);                                      // base
  r(124, 124, 17, 12, 14); r(143, 124, 17, 12, 14);            // cushions
  r(141, 124, 2, 12, 6);                                       // cushion gap
  r(124, 123, 36, 1, 0); r(118, 147, 48, 1, 0);
  r(124, 124, 36, 1, 15);                                      // plastic sheen
  // the wrap glint, sliding along nylon nobody ever touched
  const gl = 124 + (frame % 16) * 2;
  r(gl, 127, 2, 1, 15); r(Math.min(gl + 5, 158), 130, 2, 1, 15);

  // ---------- plastic plant (x170..188) ----------
  r(169, 148, 16, 2, 8);                                       // shadow
  r(172, 112, 10, 8, 2); r(170, 118, 13, 9, 2); r(168, 126, 14, 10, 2);
  r(178, 114, 4, 4, 10);                                       // the 2024 "fresh" leaf
  r(173, 112, 8, 1, 8);                                        // dust
  r(170, 135, 14, 2, 6); r(171, 137, 12, 11, 6);               // pot
  r(170, 135, 1, 13, 0); r(183, 135, 1, 13, 0); r(171, 147, 12, 1, 0);
  r(172, 137, 2, 8, 14);                                       // pot gloss

  // ---------- צחי — the employee with no team (feet y150, x182..194) ----------
  const hd = Math.floor(frame / 12) % 2 ? 2 : -2;              // left... right... left...
  r(181, 149, 14, 3, 8);                                       // contact shadow
  r(183, 148, 5, 2, 0); r(189, 148, 5, 2, 0);                  // shoes
  r(184, 141, 4, 8, 1); r(189, 141, 4, 8, 1);                  // jeans
  r(182, 131, 1, 10, 0); r(194, 131, 1, 10, 0);                // torso outline
  r(183, 131, 11, 10, 15);                                     // shirt
  r(194, 134, 2, 5, 15); r(196, 138, 1, 2, 6);                 // arm + hand
  r(186, 132, 1, 2, 4); r(190, 132, 1, 2, 4);                  // lanyard
  r(184, 133, 8, 6, 0); r(185, 134, 6, 4, 15);                 // the blank badge
  r(187, 130, 4, 2, 6);                                        // neck
  r(185 + hd, 123, 8, 3, 7);                                   // hair
  r(185 + hd, 125, 8, 6, 6);                                   // head
  const ex = hd > 0 ? 190 : 185;                               // eyes toward the void
  r(ex + hd, 127, 1, 1, 0); r(ex + hd + 3, 127, 1, 1, 0);
  // coffee cup — the one constant in his life
  r(195, 137, 3, 4, 15); r(195, 141, 3, 1, 0); r(198, 138, 1, 2, 0);
  r(196, 133 - ((frame >> 3) % 2), 1, 2, 7);                   // lukewarm steam
}
