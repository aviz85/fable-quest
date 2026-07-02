// cafe_backroom.art.js — המחסן האחורי של יענקל'ה
// Sierra SCI0 style EGA background. Faction: hub.
// Light: swinging bare bulb (center) + small window top-right dropping a holy
// diagonal beam exactly on the mop.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ---------- animation params ----------
  // swinging bulb: smooth-ish pendulum, period 40 frames, amplitude ±3px
  const t = frame % 40;
  const swayTable = [0, 1, 2, 3, 3, 3, 2, 1, 0, -1, -2, -3, -3, -3, -2, -1];
  const sway = swayTable[Math.floor(t / 2.5) % 16];
  const shimmer = frame % 20 < 10;

  // ---------- ceiling (dim, beams) ----------
  r(0, 0, 320, 38, 8);
  r(0, 0, 320, 5, 0);             // deep shadow at the very top
  // subtle ceiling dither below the shadow
  for (let x = 0; x < 320; x += 8) { r(x + 2, 5, 4, 2, 0); }
  r(0, 10, 320, 3, 0);   // beam
  r(0, 26, 320, 3, 0);   // beam
  r(0, 13, 320, 1, 7);   // light catch under beam
  r(0, 29, 320, 1, 7);

  // ---------- back wall: concrete ----------
  r(0, 38, 320, 104, 7);
  // concrete block joints
  for (let y = 54; y < 142; y += 22) r(0, y, 320, 1, 8);
  for (let row = 0; row < 4; row++) {
    for (let x = ((row % 2) * 20); x < 320; x += 40) r(x, 54 + row * 22, 1, 22, 8);
  }
  // damp stains (fixed pseudo-random blocks)
  const stains = [[10, 44], [220, 46], [300, 60], [118, 120], [206, 126], [232, 88], [4, 120], [296, 118], [182, 44]];
  for (const [sx, sy] of stains) { r(sx, sy, 12, 8, 8); r(sx + 2, sy + 8, 8, 3, 8); }
  // baseline shadow where wall meets floor
  r(0, 139, 320, 3, 8);

  // ---------- floor: concrete, perspective ----------
  r(0, 142, 320, 16, 8);          // far strip darker
  r(0, 158, 320, 42, 7);          // near
  // dither the transition
  for (let x = 0; x < 320; x += 4) r(x + (x % 8 ? 0 : 2), 156, 2, 2, 8);
  // thin perspective lines
  r(0, 150, 320, 1, 0);
  r(0, 163, 320, 1, 8);
  r(0, 176, 320, 1, 8);
  r(0, 190, 320, 1, 8);
  // floor cracks
  r(60, 180, 14, 1, 8); r(74, 181, 8, 1, 8);
  r(210, 168, 10, 1, 8); r(96, 192, 12, 1, 8);
  // converging concrete seams (perspective)
  for (let i = 0; i < 6; i++) {
    r(44 + i * 7, 198 - i * 9, 7, 1, 8);
    r(276 - i * 7, 198 - i * 9, 7, 1, 8);
  }

  // ---------- doorway left -> cafe_main ----------
  r(0, 50, 40, 92, 6);            // outer jamb wood
  r(0, 50, 40, 3, 0); r(33, 53, 5, 89, 0);   // lintel + right jamb outline
  r(0, 53, 2, 89, 0);
  r(2, 58, 31, 84, 0);            // dark opening
  // warm cafe light flooding in, falling off to the right
  r(2, 58, 12, 84, 14);
  r(14, 58, 8, 84, 6);
  for (let y = 58; y < 142; y += 4) {           // dithered falloff bands
    r(14, y + ((y >> 2) % 2) * 2, 3, 2, 14);
    r(22, y + (((y >> 2) + 1) % 2) * 2, 3, 2, 6);
  }
  // glimpse of the cafe: counter + espresso machine silhouette
  r(2, 108, 14, 3, 6); r(2, 111, 14, 31, 8);
  r(4, 96, 8, 12, 8); r(5, 92, 4, 4, 8);
  // warm light pooling out onto the storeroom floor (trapezoid)
  r(2, 142, 34, 3, 14);
  r(4, 145, 30, 3, 14);
  r(8, 148, 24, 2, 6);
  for (let x = 10; x < 30; x += 4) r(x, 150, 2, 2, 6);

  // ---------- window (tzohar) top-right ----------
  r(248, 6, 34, 26, 8);           // recessed niche in the wall
  r(250, 8, 30, 22, 0);           // frame
  r(252, 10, 26, 18, 9);          // sky
  r(252, 14, 26, 2, 15);          // cloud streak
  r(264, 10, 2, 18, 0);           // mullion
  r(252, 18, 26, 1, 0);
  r(254, 24, 22, 4, 8);           // grime on lower pane
  r(248, 30, 34, 3, 7); r(248, 33, 34, 1, 0);   // sill

  // ---------- HOLY LIGHT BEAM: window -> mop ----------
  // solid diagonal shaft built from offset parallelogram slices, widening as it falls
  for (let i = 0; i < 20; i++) {
    const lx = 254 + ((i * 3) >> 1);          // drifts right toward the mop
    const ly = 30 + i * 6;
    const w = 10 + (i >> 2);                  // widens with distance
    r(lx, ly, w, 6, 11);                      // soft body
    r(lx + 2, ly, w - 5, 6, 15);              // hot core
    if (i % 2) r(lx - 2, ly + 2, 2, 4, 11);   // ragged dusty edge
    else r(lx + w, ly, 2, 4, 11);
  }
  // dust motes drifting down the beam
  const mote = frame % 24;
  r(258 + ((mote * 3) >> 1), 34 + mote * 5, 2, 2, 15);
  r(264 + (((mote + 12) % 24) * 3 >> 1), 34 + ((mote + 12) % 24) * 5, 1, 2, 14);
  // glow pooling on the floor around the mop head
  r(266, 148, 38, 4, 11); r(272, 150, 28, 3, 15); r(270, 153, 32, 2, 11);

  // ---------- metal shelves + cleaning bottles ----------
  // legs
  r(42, 48, 3, 92, 0); r(111, 48, 3, 92, 0);
  // shelf plates (3 levels)
  for (const sy of [58, 88, 118]) {
    r(42, sy, 72, 4, 8);
    r(42, sy, 72, 1, 7);          // top edge catch
    r(42, sy + 4, 72, 1, 0);      // underside outline
  }
  // bottles: rows sit on plates (rows at y=44,74,104, each 14 tall)
  const bottleCols = [2, 4, 9, 12, 10, 5];
  for (let row = 0; row < 3; row++) {
    const by = 44 + row * 30;
    for (let i = 0; i < 8; i++) {
      const bx = 47 + i * 8;
      const c = bottleCols[(i + row) % 6];
      r(bx, by + 3, 6, 11, c);        // body
      r(bx + 1, by, 4, 3, 15);        // cap
      r(bx, by + 3, 1, 11, 0);        // left outline
      r(bx + 1, by + 5, 1, 6, 15);    // highlight
    }
  }
  // the unlabeled purple one that bubbles by itself (bottom row, glows)
  r(95, 107, 6, 11, 5); r(96, 104, 4, 3, 15);
  if (frame % 30 < 6) r(97, 102, 2, 2, 13);   // a bubble escapes
  // "לא!" note taped to it — tiny white tag
  r(94, 112, 8, 4, 15); r(96, 113, 4, 1, 0);

  // shelf cast shadow on floor — sways OPPOSITE to the bulb
  r(48 - sway, 150, 60, 4, 0);

  // ---------- cork board ----------
  r(124, 48, 56, 46, 0);          // frame outline
  r(126, 50, 52, 42, 6);          // cork
  r(126, 50, 52, 2, 14);          // top light catch
  // shuki's notes (white, scribbled)
  const notes = [[130, 56], [146, 54], [132, 74]];
  for (const [nx, ny] of notes) {
    r(nx, ny, 12, 10, 15);
    r(nx + 2, ny + 2, 8, 1, 0);
    r(nx + 2, ny + 4, 6, 1, 0);
    r(nx + 2, ny + 6, 8, 1, 0);
    r(nx + 5, ny - 1, 2, 2, 4);   // pin
  }
  // extra angry underline on the thermostat note
  r(132, 64, 8, 1, 4);

  // ---------- thermostat (DO NOT TOUCH) ----------
  r(195, 63, 16, 22, 0);          // outline
  r(196, 64, 14, 20, 15);         // box
  r(199, 66, 8, 6, 2);            // little green window
  if (frame % 50 < 4) r(199, 66, 8, 6, 10);   // it... blinked?
  r(200, 76, 6, 6, 0);            // dial
  r(202, 74, 2, 4, 7);            // dial notch
  r(198, 86, 10, 2, 8);           // wall shadow under it

  // ---------- bare bulb on a wire (SWINGING) ----------
  const bx = 166 + sway;
  r(164, 29, 5, 3, 0);                         // ceiling junction box
  r(166 + ((sway / 2) | 0), 32, 1, 13, 0);     // wire top half
  r(bx, 45, 1, 6, 0);                          // wire bottom half
  // halo — big warm dithered burst so the bulb reads as THE light source
  r(bx - 9, 53, 2, 8, 14); r(bx + 8, 53, 2, 8, 14);
  r(bx - 2, 45, 5, 3, 14); r(bx - 2, 65, 5, 3, 14);
  r(bx - 7, 48, 3, 3, 14); r(bx + 5, 48, 3, 3, 14);
  r(bx - 7, 63, 3, 3, 14); r(bx + 5, 63, 3, 3, 14);
  r(bx - 12, 56, 2, 2, 14); r(bx + 11, 56, 2, 2, 14);
  // bulb with outline
  r(bx - 5, 51, 11, 13, 0);
  r(bx - 4, 52, 9, 11, 14);
  r(bx - 3, 53, 7, 6, 15);        // hot white heart of the bulb
  r(bx - 2, 49, 5, 3, 8);         // socket
  // light kiss on the ceiling beam above
  r(bx - 10, 33, 21, 2, 7);

  // ---------- lottery ticket (pinned right of notes, in front) ----------
  r(160, 68, 12, 16, 14);
  r(160, 68, 12, 1, 0); r(160, 83, 12, 1, 0); r(160, 68, 1, 16, 0); r(171, 68, 1, 16, 0);
  r(162, 72, 8, 2, 4); r(164, 76, 6, 2, 4);   // diagonal-ish red stripe (2 rects)
  r(165, 66, 2, 3, 12);                       // pin
  r(162, 79, 8, 1, 0);                        // fine print

  // ---------- cleaning cart (yellow, loyal, squeaky) ----------
  r(184, 102, 56, 2, 0);          // top outline
  r(186, 104, 52, 46, 14);        // body
  r(186, 104, 52, 2, 15);         // top light catch
  r(184, 104, 2, 46, 0); r(238, 104, 2, 46, 0);   // side outlines
  // sunken bucket on top
  r(200, 100, 20, 6, 0);
  r(202, 101, 16, 4, 7);
  r(204, 102, 12, 2, 8);          // murky water
  // handle (left)
  r(180, 108, 2, 26, 0); r(180, 106, 8, 2, 0);
  // drawers
  r(190, 112, 20, 10, 6); r(190, 126, 20, 10, 6);
  r(190, 112, 20, 1, 0); r(190, 126, 20, 1, 0);
  r(198, 116, 4, 2, 0); r(198, 130, 4, 2, 0);     // drawer pulls
  // rag hanging off the side
  r(226, 104, 10, 12, 7); r(226, 104, 10, 2, 15);
  // wheels
  r(190, 150, 8, 8, 0); r(226, 150, 8, 8, 0);
  r(192, 152, 3, 3, 8); r(228, 152, 3, 3, 8);     // hubs
  // cart shadow
  r(188, 158, 52, 3, 8);

  // ---------- wet floor sign (THE weapon) ----------
  // folding A-frame: tall YELLOW trapezoid face, thin black outline, red stripe, icon
  for (let i = 0; i < 6; i++) {
    const sw = 12 + i * 2, sx = 248 - i, sy = 116 + i * 6;
    r(sx, sy, sw, 6, 0);            // black outline row
    r(sx + 1, sy, sw - 2, 6, 14);   // yellow face
  }
  r(244, 151, 20, 1, 0);            // bottom outline
  r(250, 113, 8, 3, 0); r(251, 114, 6, 2, 14);   // hinge cap
  r(250, 118, 3, 2, 15);            // plastic sheen
  // slipping man, mid-worst-moment, black on yellow
  r(252, 122, 4, 3, 0);             // head
  r(249, 127, 10, 2, 0);            // flailing torso
  r(246, 124, 3, 2, 0);             // arm thrown back
  r(258, 130, 4, 2, 0);             // doomed leg
  r(249, 132, 3, 2, 0);             // other doomed leg
  r(247, 137, 14, 3, 4);            // red warning stripe
  r(245, 143, 18, 3, 4);            // second red stripe, wider
  // splayed A-frame feet
  r(243, 152, 4, 3, 0); r(261, 152, 4, 3, 0);
  r(246, 154, 24, 2, 8);            // shadow

  // ---------- THE MOP (holy, spotlit) ----------
  // slight lean: two offset handle rects, black-edged so it pops in the beam
  r(288, 74, 1, 37, 0); r(286, 111, 1, 37, 0);
  r(285, 74, 3, 37, 6);
  r(283, 111, 3, 37, 6);
  r(285, 74, 1, 37, 14);          // beam catches the handle
  r(283, 111, 1, 37, 14);
  // mop head
  r(278, 146, 14, 4, 7);
  r(278, 150, 2, 8, 15); r(281, 150, 2, 8, 15); r(284, 150, 2, 8, 15); r(287, 150, 2, 8, 15); r(290, 150, 2, 8, 15);
  r(277, 145, 16, 1, 0);          // head outline
  // mop shadow (short — the light is on it, of course)
  r(280, 158, 18, 2, 8);

  // ---------- wet stain (it always comes back) ----------
  r(132, 168, 44, 14, 1);
  r(128, 170, 4, 10, 1); r(176, 170, 6, 10, 1);   // rounded sides
  r(138, 166, 32, 2, 1); r(140, 182, 28, 2, 1);   // blobby top/bottom
  // dithered soggy edge blending into the concrete
  for (let x = 130; x < 178; x += 4) { r(x, 166, 2, 2, 1); r(x + 2, 182, 2, 2, 1); }
  if (shimmer) { r(142, 172, 8, 2, 11); r(158, 176, 8, 2, 11); }
  else { r(150, 174, 8, 2, 11); r(166, 171, 5, 2, 11); }

  // ---------- old cardboard boxes (bottom-left depth) ----------
  r(8, 150, 34, 30, 6);
  r(8, 150, 34, 2, 0); r(8, 150, 2, 30, 0); r(40, 150, 2, 30, 0);
  r(8, 164, 34, 1, 0);            // box separation — it's a stack
  r(12, 154, 12, 4, 7);           // faded label
  r(14, 168, 16, 4, 7);
  r(24, 145, 22, 7, 6); r(24, 145, 22, 1, 0);     // small box on top
  r(10, 180, 36, 3, 8);           // shadow

  // ---------- pooled bulb light on floor (sways with bulb) ----------
  for (let x = 0; x < 34; x += 4) r(150 + sway + x, 160 + (x % 8 ? 1 : 0), 2, 2, 15);
  r(156 + sway, 163, 22, 1, 15);
  for (let x = 0; x < 22; x += 4) r(156 + sway + x, 164, 2, 1, 7);
}
