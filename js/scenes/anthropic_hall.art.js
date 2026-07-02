// anthropic_hall.art.js — היכל אב המנזר (Anthropic ceremonial climax hall)
// Dark polished wood, the entire Constitution as the back wall, the Abbot with
// a pulsing cyan halo on a red dais, two monk-tall candles, calibration key #1
// on a tempered-glass stand, the empty debater's cushion, and the doorman monk.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ============ CEILING (0,0,320,20) — deep shadow, beam lines ============
  r(0, 0, 320, 20, 0);
  for (let x = 0; x < 320; x += 40) r(x, 0, 2, 20, 8);   // thin beam lines every 40px
  r(0, 18, 320, 2, 0);                                    // seam under ceiling

  // ============ WALLS BASE (0,20,320,125) — warm clay ============
  r(0, 20, 320, 125, 6);
  // gloom dither near the ceiling (hall height)
  for (let y = 20; y < 36; y += 4) {
    for (let x = ((y / 4) % 2) * 4; x < 320; x += 8) r(x, y, 4, 2, 0);
  }
  // clay seams on side walls (P8)
  r(0, 58, 88, 1, 8); r(0, 96, 88, 1, 8); r(0, 128, 88, 1, 8);
  r(232, 58, 88, 1, 8); r(232, 96, 88, 1, 8); r(232, 128, 88, 1, 8);
  for (let x = 4; x < 88; x += 28) { r(x, 59, 1, 37, 8); r(x + 14, 97, 1, 31, 8); }
  for (let x = 236; x < 320; x += 28) { r(x, 59, 1, 37, 8); r(x + 14, 97, 1, 31, 8); }
  // wall base skirting
  r(0, 141, 320, 4, 8); r(0, 141, 320, 1, 0);

  // ============ HIGH WINDOWS (30,8,18,26 / 272,8,18,26) ============
  const win = (wx) => {
    r(wx - 2, 6, 22, 30, 15);          // white frame
    r(wx - 2, 6, 22, 1, 7); r(wx - 2, 35, 22, 1, 7);
    r(wx, 8, 18, 26, 3);               // cyan glass
    r(wx + 2, 10, 3, 22, 11);          // glass shine
    r(wx + 8, 8, 2, 26, 15);           // mullion
    r(wx, 20, 18, 2, 15);
    r(wx - 3, 5, 24, 1, 0); r(wx - 3, 36, 24, 1, 0); // outline
    r(wx - 3, 5, 1, 32, 0); r(wx + 20, 5, 1, 32, 0);
  };
  win(30); win(272);

  // ============ DIAGONAL LIGHT BEAMS (windows → floor, BEHIND scroll & columns) ============
  // left beam: (44,30) → (110,150); right beam: (262,30) → (200,150)
  for (let by = 30; by < 150; by += 2) {
    const t = by - 30;
    const lx = 44 + Math.floor(t * 0.55);
    const rx = 262 - Math.floor(t * 0.52);
    r(lx, by, 6, 2, 11); r(lx + 9, by, 2, 2, 11);        // solid shaft + thin echo
    r(rx, by, 6, 2, 11); r(rx - 5, by, 2, 2, 11);
  }

  // ============ CONSTITUTION SCROLL WALL (88,20,144,100) ============
  r(86, 14, 148, 110, 0);              // dark recess outline behind scroll
  r(88, 16, 144, 6, 7);                // rolled top end
  r(88, 16, 144, 1, 15); r(88, 21, 144, 1, 8);
  r(88, 116, 144, 6, 7);               // rolled bottom end
  r(88, 116, 144, 1, 15); r(88, 121, 144, 1, 8);
  r(84, 15, 4, 8, 6); r(232, 15, 4, 8, 6);     // wooden roller knobs
  r(84, 115, 4, 8, 6); r(232, 115, 4, 8, 6);
  r(88, 22, 144, 94, 15);              // the parchment itself
  r(88, 22, 3, 94, 7); r(229, 22, 3, 94, 7);   // curled edges shade
  // four million clauses = P8 text lines every 5px, in paragraphs
  for (let y = 27; y < 112; y += 5) {
    const li = (y - 27) / 5;
    if (li === 4 || li === 10 || li === 14) continue;    // paragraph breaks
    const ind = (li % 3) * 4;                            // paragraph indents
    r(96 + ind, y, 124 - ind - ((y * 7) % 18), 2, 8);
  }
  // THE clause everyone argues about — short, red, mid-scroll
  r(120, 62, 58, 2, 4); r(182, 62, 14, 2, 4);
  r(150, 24, 20, 2, 8);                // title bar centered
  // two wax seals at the bottom of the parchment
  r(102, 106, 5, 5, 4); r(103, 107, 2, 2, 12);
  r(212, 106, 5, 5, 4); r(213, 107, 2, 2, 12);
  // soft curl shadow above the bottom roller (parchment bulge)
  r(91, 113, 138, 1, 7);

  // dust flicker in the left beam (frame%20<3) — the only free citizens here
  if (frame % 20 < 3) {
    r(60, 62, 1, 1, 15); r(72, 88, 1, 1, 15); r(84, 112, 1, 1, 15); r(94, 134, 1, 1, 15);
  }
  const dm = frame % 24;
  r(50 + Math.floor(dm / 2), 44 + dm * 3, 1, 1, 15);     // one drifting mote

  // ============ DOUBLE COLUMNS (x=18,56,250,288, 12x121) ============
  const col = (cx) => {
    r(cx - 2, 20, 16, 6, 7);           // cap
    r(cx - 2, 20, 16, 1, 15); r(cx - 2, 25, 16, 1, 8);
    r(cx, 24, 12, 121, 6);             // shaft
    r(cx, 24, 2, 121, 14);             // warm lit edge
    r(cx + 9, 24, 3, 121, 8);          // shade edge
    r(cx - 1, 24, 1, 121, 0); r(cx + 12, 24, 1, 121, 0);
    r(cx - 2, 140, 16, 6, 7);          // base plinth
    r(cx - 2, 140, 16, 1, 15); r(cx - 2, 145, 16, 1, 0);
  };
  col(18); col(56); col(250); col(288);

  // ============ DARK WOOD FLOOR (0,145,320,55) ============
  r(0, 145, 320, 55, 6);
  r(0, 145, 320, 3, 8);                // dark strip at wall base (depth)
  r(0, 148, 320, 1, 14);               // candle-lit slab lip
  // long planks: horizontal seams (P4 = dark grooves), perspective spacing
  r(0, 156, 320, 1, 4); r(0, 168, 320, 1, 4); r(0, 181, 320, 1, 4); r(0, 195, 320, 1, 4);
  // sparse staggered end-joints (long floorboards, not bricks)
  for (let x = 54; x < 320; x += 96) r(x, 149, 1, 7, 4);
  for (let x = 20; x < 320; x += 96) r(x, 157, 1, 11, 4);
  for (let x = 78; x < 320; x += 96) r(x, 169, 1, 12, 4);
  for (let x = 40; x < 320; x += 96) r(x, 182, 1, 13, 4);
  // wood grain ticks (subtle)
  for (let x = 12; x < 320; x += 52) { r(x, 162, 10, 1, 8); r(x + 26, 175, 12, 1, 8); r(x + 8, 189, 10, 1, 8); }
  // a few polish sheen glints only
  r(70, 160, 8, 1, 14); r(246, 172, 8, 1, 14); r(30, 186, 6, 1, 14); r(284, 190, 6, 1, 14);
  // pooled light where the beams land
  r(100, 150, 22, 3, 14); r(104, 153, 14, 2, 11);
  r(192, 150, 22, 3, 14); r(196, 153, 14, 2, 11);

  // ============ DAIS (108,118,104,28) + STEPS ============
  r(106, 117, 108, 30, 0);             // outline
  r(108, 118, 104, 28, 4);             // red ceremonial platform
  for (let y = 126; y < 142; y += 8) { // sparse woven texture (calm, not noisy)
    for (let x = 118 + ((y / 8) % 2) * 8; x < 202; x += 16) r(x, y, 3, 1, 0);
  }
  r(110, 121, 100, 1, 12);             // second sheen line under the lit edge
  r(108, 118, 104, 2, 12);             // lit top edge
  r(108, 142, 104, 4, 6);              // front edge highlight (wood trim)
  r(108, 142, 104, 1, 14);
  r(128, 146, 64, 4, 6);               // step 1
  r(128, 146, 64, 1, 14); r(127, 146, 1, 4, 0); r(192, 146, 1, 4, 0);
  r(136, 150, 48, 3, 8);               // step 2
  r(136, 150, 48, 1, 7); r(135, 150, 1, 3, 0); r(184, 150, 1, 3, 0);
  r(124, 153, 72, 2, 0);               // ground shadow

  // ============ GIANT CANDLES (112,74,8,44 / 200,74,8,44) ============
  const fl = frame % 6 < 3;            // flicker: height 6↔9
  const candle = (cx, fx) => {
    r(cx - 4, 116, 16, 4, 6);          // stand on the dais lip
    r(cx - 4, 116, 16, 1, 14); r(cx - 5, 115, 18, 1, 0);
    r(cx, 74, 8, 44, 15);              // monk-tall wax pillar
    r(cx, 74, 2, 44, 7);               // shade side
    r(cx + 6, 80, 2, 6, 7); r(cx + 5, 96, 2, 8, 7); // drips
    r(cx - 1, 74, 1, 44, 0); r(cx + 8, 74, 1, 44, 0);
    r(cx + 3, 72, 2, 2, 0);            // wick
    // flame P14 core / P12 tip / P15 heart, flickering height
    if (fl) {
      r(fx - 1, 68, 6, 5, 14); r(fx, 66, 4, 8, 14);
      r(fx + 1, 63, 2, 3, 12); r(fx + 1, 69, 2, 3, 15);
    } else {
      r(fx - 1, 70, 6, 4, 14); r(fx, 68, 4, 6, 14);
      r(fx + 1, 66, 2, 2, 12); r(fx + 1, 70, 2, 2, 15);
    }
    // warm glow halo on the parchment around the flame
    r(fx - 3, 66, 1, 2, 14); r(fx + 6, 65, 1, 2, 14);
    r(fx - 2, 62, 1, 1, 14); r(fx + 5, 61, 1, 1, 14); r(fx + 2, 59, 1, 1, 14);
  };
  candle(112, 114); candle(200, 202);

  // ============ ABBOT CLAUDE-ELIYAHU (152,90,14,30) on the dais ============
  const tilt = frame % 32 < 8 ? 1 : 0;         // head tilts 1px when "thinking"
  const pulse = frame % 16 < 8;                // halo pulse ±1px
  r(146, 116, 26, 8, 4);               // cushion
  r(146, 116, 26, 1, 12); r(145, 116, 1, 8, 0); r(172, 116, 1, 8, 0); r(146, 123, 26, 1, 0);
  r(152, 97, 14, 23, 6);               // brown robe, seated
  r(152, 97, 2, 23, 0);                // robe deep fold
  r(163, 99, 3, 21, 8);                // fold right
  r(150, 108, 4, 8, 6); r(164, 108, 4, 8, 6);  // sleeves resting
  r(151, 115, 4, 2, 7); r(164, 115, 4, 2, 7);  // calm hands
  r(155 + tilt, 90, 8, 8, 7);          // gray head, slightly tilted
  r(156 + tilt, 92, 2, 1, 0); r(160 + tilt, 92, 2, 1, 0); // careful eyes
  r(155 + tilt, 96, 8, 2, 15);         // white beard (2px)
  r(156 + tilt, 98, 6, 2, 15);
  // cyan halo — ring of rects around the head, pulsing radius
  const hr = pulse ? 8 : 7;
  const hcx = 159 + tilt, hcy = 92;
  r(hcx - hr + 2, hcy - hr, hr * 2 - 4, 1, 3);       // top
  r(hcx - hr + 2, hcy + hr, hr * 2 - 4, 1, 3);       // bottom
  r(hcx - hr, hcy - hr + 2, 1, hr * 2 - 4, 3);       // left
  r(hcx + hr, hcy - hr + 2, 1, hr * 2 - 4, 3);       // right
  r(hcx - hr + 1, hcy - hr + 1, 1, 1, 3); r(hcx + hr - 1, hcy - hr + 1, 1, 1, 3);
  r(hcx - hr + 1, hcy + hr - 1, 1, 1, 3); r(hcx + hr - 1, hcy + hr - 1, 1, 1, 3);
  if (pulse) { r(hcx - 1, hcy - hr - 1, 3, 1, 11); } // bright crest at peak

  // ============ FLOOR REFLECTIONS (polished wood — vertical streaks) ============
  r(113, 148, 1, 20, 8); r(116, 148, 1, 16, 8); r(119, 148, 1, 12, 8); // left candle
  r(201, 148, 1, 20, 8); r(204, 148, 1, 16, 8); r(207, 148, 1, 12, 8); // right candle
  if (fl) { r(115, 148, 1, 10, 14); r(203, 148, 1, 10, 14); }          // flame glints
  const rip = pulse ? 1 : 0;                          // abbot's reflection ripples with halo
  r(152 + rip, 148, 1, 24, 8); r(155 + rip, 148, 1, 20, 8);
  r(158 + rip, 148, 1, 22, 8); r(161 + rip, 148, 1, 18, 8); r(164 + rip, 148, 1, 14, 8);
  r(159 + rip, 148, 1, 8, 3);                         // faint cyan halo in the polish

  // ============ KEY #1 ON GLASS STAND (stand 236,120,14,26 · key 238,112,10,8) ============
  r(234, 146, 18, 3, 0);               // shadow on floor
  r(236, 120, 14, 26, 11);             // tempered glass column
  r(238, 122, 2, 22, 15);              // glint stripe
  r(244, 126, 1, 1, 15);               // THE glint pixel
  r(235, 120, 1, 26, 3); r(250, 120, 1, 26, 3);      // glass edges
  r(235, 119, 16, 1, 15);              // lit rim
  r(236, 110, 14, 2, 7);               // display plate
  // copper calibration key, carved like a scroll
  r(238, 112, 4, 6, 14);               // bow (ring)
  r(239, 114, 2, 2, 6);                // ring hole
  r(242, 114, 6, 2, 14);               // shaft
  r(246, 116, 2, 3, 14);               // teeth
  r(244, 116, 1, 2, 14);
  r(238, 112, 4, 1, 15);               // copper shine
  if (frame % 14 < 4) { r(241, 110, 1, 1, 15); r(248, 113, 1, 1, 15); } // sparkle

  // ============ DEBATER'S CUSHION — the hot seat (148,164,24,10) ============
  r(146, 173, 28, 3, 0);               // shadow
  r(148, 164, 24, 10, 4);              // red cushion
  r(148, 164, 24, 2, 12);              // top light
  r(148, 164, 24, 1, 6);               // brown trim top
  r(148, 173, 24, 1, 6);               // brown trim bottom
  r(147, 164, 1, 10, 0); r(172, 164, 1, 10, 0);
  r(158, 167, 4, 4, 12);               // center button

  // ============ DOORMAN MONK (36,122,12,28) — bows 1px ============
  const bow = frame % 24 < 6 ? 1 : 0;
  r(33, 148, 18, 3, 0);                // floor shadow
  r(36, 130 + bow, 12, 20 - bow, 6);   // brown robe body
  r(37, 128 + bow, 10, 3, 6);          // shoulders
  r(36, 130 + bow, 1, 20 - bow, 0);    // outline left
  r(47, 130 + bow, 1, 20 - bow, 0);    // outline right
  r(43, 132 + bow, 2, 16, 8);          // robe fold
  r(38, 143 + bow, 8, 1, 14);          // rope belt
  r(37, 148, 4, 2, 0); r(43, 148, 4, 2, 0);            // sandaled feet
  r(39, 121 + bow, 6, 8, 7);           // gray head
  r(38, 120 + bow, 8, 3, 6);           // brown hood over the head
  r(38, 120 + bow, 8, 1, 0);           // hood rim shadow
  r(40, 125 + bow, 1, 1, 0); r(43, 125 + bow, 1, 1, 0); // apologetic eyes
  r(46, 132 + bow, 5, 7, 15);          // tiny clipboard
  r(46, 132 + bow, 5, 1, 7);
  r(47, 134 + bow, 3, 1, 8); r(47, 136 + bow, 3, 1, 8); // checklist lines
  r(45, 134 + bow, 2, 4, 7);           // holding hand

  // ============ EXIT THRESHOLD down→court (140,196,40,4) ============
  r(140, 196, 40, 4, 0);
  r(138, 196, 2, 4, 8); r(180, 196, 2, 4, 8);
}
