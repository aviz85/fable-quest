// xai_hangar.art.js — האנגר הרקטות. A cathedral of ambition on an empty stomach. Faction: xai.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // tiny 5x5 block font (LATIN only, per art guide)
  const G = {
    T: ['#####', '..#..', '..#..', '..#..', '..#..'],
    R: ['####.', '#...#', '####.', '#..#.', '#...#'],
    U: ['#...#', '#...#', '#...#', '#...#', '.###.'],
    C: ['.####', '#....', '#....', '#....', '.####'],
    K: ['#..#.', '#.#..', '##...', '#.#..', '#..#.'],
    M: ['#...#', '##.##', '#.#.#', '#...#', '#...#'],
    A: ['.###.', '#...#', '#####', '#...#', '#...#'],
    S: ['.####', '#....', '.###.', '....#', '####.'],
    '1': ['..#..', '.##..', '..#..', '..#..', '.###.'],
  };
  const text = (s, tx, ty, c) => {
    for (let i = 0; i < s.length; i++) {
      const g = G[s[i]]; if (!g) continue;
      for (let gy = 0; gy < 5; gy++) for (let gx = 0; gx < 5; gx++)
        if (g[gy][gx] === '#') r(tx + i * 6 + gx, ty + gy, 1, 1, c);
    }
  };

  // ---------- 1. CEILING + TRUSSES (0,0,320,30) ----------
  r(0, 0, 320, 30, 8);
  r(0, 8, 320, 4, 0); r(0, 22, 320, 4, 0);                  // truss chords
  for (let x = 0; x < 320; x += 24) {                        // diagonal lattice between chords
    r(x + 2, 12, 3, 3, 0); r(x + 6, 15, 3, 3, 0); r(x + 10, 18, 3, 3, 0);
    r(x + 14, 15, 3, 3, 0); r(x + 18, 12, 3, 3, 0);
  }
  r(0, 12, 320, 1, 7); r(0, 26, 320, 1, 7);                  // catch-light under chords
  r(140, 8, 2, 22, 6); r(139, 26, 4, 4, 6);                  // rust drip streak

  // ---------- 3. SIDE WALLS — corrugated metal (drawn before the mouth frame) ----------
  r(0, 30, 70, 115, 8); r(250, 30, 70, 115, 8);
  for (let x = 0; x < 70; x += 10) r(x, 30, 1, 115, 0);      // left seams
  for (let x = 250; x < 320; x += 10) r(x, 30, 1, 115, 0);   // right seams
  r(0, 30, 70, 2, 7); r(250, 30, 70, 2, 7);                  // top lip highlight
  // red sunset spill grazing the walls next to the mouth
  for (let y = 60; y < 140; y += 4) { r(64, y, 4, 2, 4); r(251, y + 2, 4, 2, 4); }

  // right wall: spray-painted TRUCK + arrow (signage budget went to memes)
  text('TRUCK', 262, 44, 15);
  r(262, 58, 34, 4, 4);                                      // arrow shaft
  r(296, 54, 4, 12, 4); r(300, 57, 4, 6, 4); r(304, 59, 3, 2, 4); // arrow head, spray-blobby
  r(263, 62, 2, 5, 4); r(280, 62, 1, 4, 4);                  // paint drips

  // ---------- 2. HANGAR MOUTH — fake-Mars sunset (interior x=82..238, y=30..145) ----------
  r(82, 30, 156, 20, 0);                                     // space-black top band
  r(82, 50, 156, 30, 4);                                     // deep red
  r(82, 80, 156, 25, 4);                                     // checker band base
  for (let y = 80; y < 105; y += 2)                          // red/lightred checker dither
    for (let x = 82 + (y % 4 === 0 ? 0 : 2); x < 238; x += 4) r(x, y, 2, 2, 12);
  r(82, 105, 156, 20, 12);                                   // bright band
  for (let y = 125; y < 138; y += 2)                         // horizon glow dither
    for (let x = 82 + (y % 4 === 0 ? 0 : 2); x < 238; x += 4) r(x, y, 2, 2, 14);
  // sunset shimmer: two glow pixels trade places
  if (frame % 14 < 7) { r(108, 128, 2, 2, 14); r(196, 132, 2, 2, 12); }
  else { r(108, 128, 2, 2, 12); r(196, 132, 2, 2, 14); }
  // the "projector sun" — a fat setting half-disc behind the yard
  r(209, 104, 12, 2, 14); r(205, 106, 20, 2, 14); r(202, 108, 26, 2, 14);
  r(200, 110, 30, 4, 14); r(199, 114, 32, 6, 14); r(198, 120, 34, 18, 14);
  r(207, 110, 16, 28, 15); r(211, 106, 8, 32, 15);           // white-hot core
  r(197, 124, 1, 14, 12); r(232, 124, 1, 14, 12);            // red rim bleed
  for (let x = 186; x < 246; x += 6) r(x, 136, 3, 1, 15);    // glare shimmer on the mars dust
  r(82, 138, 156, 7, 8);                                     // dark ground strip beyond
  r(82, 137, 156, 1, 6);                                     // dusty edge where mars "ends"
  // distant rocket skeleton silhouette, black against the sun
  r(212, 106, 6, 32, 0); r(208, 114, 14, 2, 0); r(208, 126, 14, 2, 0); r(213, 102, 4, 4, 0);
  r(202, 134, 28, 4, 0);                                     // its launch mound
  // mouth frame columns
  r(70, 30, 12, 115, 0); r(238, 30, 12, 115, 0);
  r(80, 30, 2, 115, 8); r(238, 30, 2, 8, 8);                 // inner-edge relief
  r(70, 30, 2, 115, 7); r(248, 30, 2, 115, 7);               // outer catch-light
  r(70, 28, 182, 2, 0);                                      // header beam over the mouth

  // ---------- 6. TOOL WALL + LEHAVIOR SHRINE (4,40 → 66,120) ----------
  r(4, 40, 62, 80, 7);
  r(4, 40, 62, 1, 0); r(4, 119, 62, 1, 0); r(4, 40, 1, 80, 0); r(65, 40, 1, 80, 0);
  for (let y = 46; y < 116; y += 8) for (let x = 9; x < 64; x += 8) r(x, y, 1, 1, 8); // peg holes
  // painted silhouettes of long-stolen tools
  r(10, 48, 12, 4, 8); r(20, 46, 4, 3, 8);                   // wrench ghost
  r(36, 46, 10, 4, 8); r(40, 50, 3, 8, 8);                   // hammer ghost
  r(12, 60, 14, 4, 8); r(12, 63, 10, 2, 8);                  // saw ghost
  r(44, 60, 3, 10, 8); r(42, 58, 7, 3, 8);                   // screwdriver ghost
  // THE FLAMETHROWER — the one tool that can complain in fire
  r(16, 72, 8, 8, 8); r(15, 71, 10, 1, 0); r(15, 71, 1, 10, 0); // fuel tank bump
  r(20, 74, 26, 10, 4);                                      // red body
  r(19, 73, 28, 1, 0); r(19, 84, 28, 1, 0); r(19, 73, 1, 12, 0); // outline
  r(21, 75, 24, 2, 12);                                      // top gleam
  r(30, 84, 4, 4, 4); r(29, 87, 6, 1, 0);                    // grip
  r(46, 76, 8, 4, 14); r(46, 75, 8, 1, 0); r(46, 80, 8, 1, 0); r(54, 75, 1, 6, 0); // nozzle
  r(55, 77, 1, 2, frame % 6 < 3 ? 14 : 12);                  // pilot light, proudly lit
  // the sign (hotspot: 16,88 → 52,100)
  r(16, 90, 36, 8, 15);
  r(15, 89, 38, 1, 0); r(15, 98, 38, 1, 0); r(15, 89, 1, 10, 0); r(52, 89, 1, 10, 0);
  r(19, 92, 22, 1, 0); r(19, 95, 28, 1, 0);                  // bureaucratic text bars

  // ---------- 11. FLOOR (y=145..200) ----------
  r(0, 145, 320, 55, 8);
  r(0, 145, 320, 2, 0);                                      // seam at wall base
  r(0, 158, 320, 1, 0); r(0, 174, 320, 1, 0);                // perspective seams in the slab
  for (let y = 156; y < 200; y += 4)                         // concrete texture, denser as it nears
    for (let x = ((y / 4) % 3) * 3; x < 320; x += (y < 172 ? 16 : 9)) r(x, y, 2, 1, 7);
  // red sunset spill through the mouth — one coherent checker-dithered pool of fake dusk
  for (let row = 0; row < 12; row++) {
    const y = 147 + row * 2;
    const half = 56 + row * 4;                               // trapezoid widening toward viewer
    const xs = Math.ceil((158 - half) / 4) * 4;
    for (let x = xs; x < 158 + half; x += 4)
      if (((x >> 2) + row) % 2 === 0) r(x, y, 4, 2, row < 3 ? 12 : 4);
  }
  r(84, 146, 152, 1, 12);                                    // hot line at the door sill
  // scorch blast-ring under the rocket (someone tested something once)
  for (let x = 134; x < 186; x += 6) { r(x, 151, 3, 1, 0); r(x + 3, 165, 3, 1, 0); }
  r(127, 153, 3, 2, 0); r(190, 153, 3, 2, 0);
  for (let y = 155; y < 163; y += 3) { r(125, y, 2, 2, 0); r(192, y, 2, 2, 0); }
  r(128, 163, 4, 2, 0); r(187, 163, 4, 2, 0);
  for (let x = 138; x < 182; x += 8) { r(x, 155, 4, 2, 4); r(x + 4, 159, 4, 2, 4); r(x + 2, 162, 3, 1, 6); }
  // tire tracks: two parallel dashed lines veering left toward the forklift
  for (let i = 0; i < 8; i++) {
    const tx = i * 3;
    r(118 - tx, 148 + i * 6, 2, 4, 0);
    r(130 - tx, 148 + i * 6, 2, 4, 0);
  }
  // oil stain
  r(90, 178, 14, 6, 0); r(92, 176, 10, 2, 0); r(94, 184, 8, 2, 0);
  // safety stripe, abandoned at 60%
  r(0, 190, 44, 3, 14); r(58, 190, 36, 3, 14); r(108, 190, 30, 3, 14); r(152, 190, 18, 3, 14);

  // ---------- 4. THE ROCKET + SCAFFOLDING (x=126..194, y=35..145) ----------
  r(138, 46, 44, 99, 7);                                     // hull cylinder
  r(137, 46, 1, 99, 0); r(182, 46, 1, 99, 0);                // hull outlines
  r(174, 46, 8, 99, 8);                                      // right-side shading
  // ragged unfinished rim — bitten steps, no nose cone, no shame
  r(138, 42, 8, 4, 7); r(152, 38, 10, 8, 7); r(168, 40, 8, 6, 7);
  r(146, 44, 6, 2, 8); r(162, 42, 6, 4, 8); r(176, 44, 6, 2, 8);
  r(138, 41, 8, 1, 0); r(152, 37, 10, 1, 0); r(168, 39, 8, 1, 0); // rim outlines
  r(148, 46, 2, 3, 0); r(166, 44, 2, 4, 0);                  // torn notches
  r(142, 38, 4, 107, 15);                                    // full-height highlight strip
  r(180, 50, 2, 95, 12);                                     // sunset rim light on the shaded flank
  r(138, 50, 1, 95, 12);                                     // faint red kiss on the left edge too
  for (let y = 58; y < 140; y += 22) r(139, y, 43, 1, 8);    // hull ring seams
  // dangling cables from the ragged rim (middle one sways)
  const sway = frame % 16 < 8 ? 1 : -1;
  r(150, 40, 1, 32, 8); r(163 + sway, 39, 1, 33, 8); r(176, 41, 1, 31, 8);
  r(149, 71, 2, 2, 14); r(162 + sway, 71, 2, 2, 14); r(175, 71, 2, 2, 14); // connectors
  // stencil: MARS 1 — the 1 painted over a patch that said something shorter
  text('MARS', 146, 88, 0);
  r(172, 86, 9, 9, 15); r(172, 86, 9, 1, 7);                 // the guilty patch
  text('1', 174, 88, 0);
  // fins
  r(130, 118, 10, 27, 4); r(180, 118, 10, 27, 4);
  r(129, 117, 12, 1, 0); r(129, 117, 1, 28, 0); r(179, 117, 1, 28, 0); r(190, 117, 1, 28, 0);
  r(131, 119, 2, 24, 12);                                    // fin edge light
  // scaffolding
  r(126, 60, 3, 85, 8); r(192, 60, 3, 85, 8);                // verticals
  r(125, 60, 1, 85, 0); r(195, 60, 1, 85, 0);
  r(126, 66, 68, 4, 6); r(126, 65, 68, 1, 0); r(126, 70, 68, 1, 0);   // upper plank y=70
  r(126, 101, 68, 4, 6); r(126, 100, 68, 1, 0); r(126, 105, 68, 1, 0); // lower plank y=105
  r(126, 143, 70, 3, 0);                                     // grounding shadow

  // ---------- 5. WELDER ON THE UPPER PLANK — same seam, two weeks ----------
  r(131, 60, 7, 6, 0); r(133, 57, 5, 4, 0);                  // crouched body + masked head
  r(134, 58, 3, 1, 7);                                       // visor glint
  r(137, 62, 3, 2, 0);                                       // arm to the torch
  if (frame % 9 < 2) {                                       // welding flash
    r(139, 62, 4, 3, 15); r(138, 61, 6, 1, 14);
    r(140, 66, 1, 2, 14);
  } else r(140, 63, 1, 1, 9);                                // dim torch tip
  // falling sparks, staggered
  const sp = (frame * 4) % 48;
  if (frame % 9 < 5) { r(140, 76 + sp % 34, 1, 2, 14); r(142, 92 + sp % 22, 1, 1, 14); r(138, 110 + sp % 12, 1, 1, 12); }

  // ---------- 10. FORKLIFT — abandoned mid-task, like everything here ----------
  r(78, 142, 44, 4, 0);                                      // ground shadow
  r(76, 95, 2, 43, 7); r(80, 95, 2, 43, 7);                  // mast verticals (lit vs the dark column)
  r(78, 95, 2, 43, 0);                                       // dark channel between rails
  r(76, 95, 6, 2, 7); r(76, 112, 6, 1, 15); r(76, 126, 6, 1, 15); // cross ties
  r(70, 136, 14, 2, 7); r(70, 138, 14, 1, 0);                // forks
  r(84, 120, 32, 18, 14);                                    // body
  r(83, 119, 34, 1, 0); r(83, 119, 1, 20, 0); r(116, 119, 1, 20, 0); r(84, 138, 32, 1, 0);
  r(85, 121, 30, 2, 15);                                     // top gleam
  r(98, 112, 12, 8, 8); r(97, 111, 14, 1, 0); r(97, 111, 1, 9, 0); r(110, 111, 1, 9, 0); // empty seat + back
  r(90, 124, 8, 5, 8); r(89, 123, 10, 1, 0);                 // engine hatch
  r(84, 137, 8, 8, 0); r(106, 137, 8, 8, 0);                 // wheels
  r(86, 139, 3, 3, 8); r(108, 139, 3, 3, 8);                 // hubs
  r(81, 105, 3, 4, 4);                                       // sticky note: "back in 5 — 2025"

  // ---------- 7. NADAV + CRATE — counting other people's calories ----------
  r(226, 143, 30, 4, 0);                                     // shadow
  r(228, 128, 24, 17, 6);                                    // wooden crate
  r(227, 127, 26, 1, 0); r(227, 127, 1, 18, 0); r(252, 127, 1, 18, 0);
  r(228, 133, 24, 1, 8); r(228, 139, 24, 1, 8);              // slats
  r(236, 128, 1, 17, 8); r(244, 128, 1, 17, 8);
  const dip = frame % 20 < 10 ? 1 : 0;                       // micro-sleep head dip
  r(232, 118, 12, 12, 8);                                    // hoodie torso, folded forward
  r(231, 117, 14, 1, 0); r(231, 117, 1, 13, 0); r(244, 117, 1, 13, 0); r(232, 129, 12, 1, 0); // outline vs the gray wall
  r(230, 120, 3, 8, 8); r(229, 119, 1, 9, 0);                // slumped shoulders
  r(233, 121, 10, 1, 7); r(236, 122, 4, 6, 7);               // hoodie string + kangaroo pocket
  r(233, 110 + dip, 10, 9, 8);                               // hood (UP)
  r(232, 109 + dip, 12, 1, 0); r(232, 109 + dip, 1, 10, 0); r(243, 109 + dip, 1, 10, 0);
  r(234, 111 + dip, 8, 1, 7);                                // hood rim catching weld light
  r(236, 113 + dip, 5, 4, 6);                                // face sliver
  r(237, 114 + dip, 1, 1, 0);                                // one open eye, counting
  r(233, 130, 4, 13, 1); r(240, 130, 4, 13, 1);              // jeans, legs down the crate
  r(232, 143, 5, 2, 0); r(239, 143, 5, 2, 0);                // shoes, feet at 145

  // ---------- 8. THE MICROWAVE — it has seen things ----------
  r(258, 140, 24, 5, 8); r(257, 139, 26, 1, 0);              // stand
  r(256, 118, 28, 22, 7);                                    // box
  r(255, 117, 30, 1, 0); r(255, 117, 1, 24, 0); r(284, 117, 1, 24, 0); r(256, 139, 28, 1, 0);
  r(271, 119, 1, 20, 0);                                     // door ajar: the 1px gap
  r(259, 123, 10, 9, 0);                                     // door window
  r(261, 127, 3, 2, 6); r(265, 125, 2, 2, 6); r(263, 129, 2, 1, 6); // crusted noodle cluster
  if (frame % 10 < 5) { r(275, 122, 2, 2, 12); r(279, 122, 2, 2, 12); } // 88:88 blink
  else { r(277, 122, 2, 2, 12); }
  r(274, 128, 8, 1, 8); r(274, 131, 8, 1, 8);                // dead buttons
  r(256, 118, 4, 3, 6); r(280, 136, 4, 3, 6);                // rust patches
  r(257, 119, 26, 1, 15);                                    // top edge catching weld light

  // ---------- 9. PIZZA-BOX TOWER — load-bearing garbage ----------
  r(290, 143, 30, 4, 0);                                     // shadow
  for (let i = 0; i < 9; i++) {
    const bx = 294 - ((i / 4) | 0);                          // leaning 2px left as it rises
    const by = 140 - i * 5;
    r(bx, by, 24, 5, i % 2 ? 14 : 6);
    r(bx, by, 24, 1, 0);                                     // lid line
    r(bx - 1, by + 1, 1, 4, 0); r(bx + 24, by + 1, 1, 4, 0);
  }
  r(292, 88, 24, 8, 8); r(291, 87, 26, 1, 0);                // top lid, open
  r(293, 96, 22, 3, 0);                                      // empty inside. of course.
  r(303, 82, 1, 6, 7); r(304, 82, 3, 3, 15);                 // napkin pixel-flag

  // ---------- memes taped to the walls (the real load-bearing culture) ----------
  const meme = (x, y, tilt) => {
    r(x, y + tilt, 14, 11, 15);
    r(x, y + tilt, 14, 1, 7); r(x, y + tilt, 1, 11, 7);      // curled edge
    r(x + 2, y + 3 + tilt, 10, 2, 8); r(x + 2, y + 7 + tilt, 7, 2, 8);
    r(x + 5, y - 1 + tilt, 4, 2, 11);                        // tape
  };
  meme(10, 126, 0); meme(34, 128, 1);                        // under the tool wall
  meme(254, 78, 0); meme(254, 96, 2);                        // right wall gallery
  meme(71, 96, 0);                                           // one on the mouth column itself

  // ---------- loose hangar grit ----------
  r(178, 148, 10, 3, 8); r(177, 150, 12, 2, 0);              // dropped hull plate
  r(60, 128, 8, 6, 8); r(59, 133, 10, 2, 0); r(62, 126, 3, 2, 7); // dead pump under tool wall
  r(216, 150, 4, 2, 6); r(230, 156, 3, 2, 6);                // stray rust flakes
}
