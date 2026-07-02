// openai_corridor.art.js — מסדרון הבטיחות (OpenAI demo tower)
// 320x200 EGA, Sierra SCI0 style. Sterile white/glass corridor, 47 safety
// barriers guarding each other, an abandoned confetti cannon, a stuck
// cleaning robot. fillRect only.
export function draw(ctx, P, frame) {
  const r = (x, y, w, h, c) => { ctx.fillStyle = P[c]; ctx.fillRect(x, y, w, h); };

  // ================= ceiling (0..34): sterile panel grid =================
  r(0, 0, 320, 34, 15);
  for (let x = 40; x < 320; x += 40) r(x, 0, 1, 34, 7);   // panel seams
  r(0, 16, 320, 1, 7);                                     // horizontal seam
  // recessed light strips (very faint glow lines)
  for (let x = 8; x < 320; x += 40) r(x, 24, 24, 2, 11);
  // the one flickering panel — maintenance ticket #88,412, status: backlog
  const panelDead = frame % 14 < 3;
  r(120, 2, 38, 13, panelDead ? 8 : 15);
  if (panelDead) r(126, 6, 26, 2, 7);                      // dark tube visible
  r(119, 1, 40, 1, 7); r(119, 15, 40, 1, 7);               // panel frame
  r(119, 1, 1, 15, 7); r(158, 1, 1, 15, 7);
  r(0, 32, 320, 2, 7);                                     // ceiling cove shadow
  // depth cue: corridor recedes left toward the expo — tapered ceiling dither
  for (let x = 0; x < 48; x += 4) {
    const step = x < 16 ? 4 : x < 32 ? 6 : 8;              // dense → sparse
    for (let y = (x / 4) % 2 * 2; y < 32; y += step) r(x, y, 2, 2, 7);
  }
  r(0, 0, 2, 32, 7);

  // ================= glass back wall (34..142) =================
  r(0, 34, 320, 108, 11);                                  // glass base
  // ---- five identical meeting rooms seen through the glass ----
  const cells = [[4, 60], [68, 124], [132, 188], [196, 252], [260, 312]];
  for (let i = 0; i < cells.length; i++) {
    const [cx0, cx1] = cells[i]; const cw = cx1 - cx0; const cc = (cx0 + cx1) >> 1;
    r(cx0, 46, cw, 90, 15);                                // white room interior
    r(cx0, 46, cw, 4, 7);                                  // room ceiling shade
    r(cx0, 126, cw, 10, 7);                                // room floor strip
    r(cx0, 126, cw, 1, 8);
    // wall screen (nobody ever presented on it)
    r(cc - 10, 57, 20, 14, 8);                             // screen bezel shadow
    r(cc - 9, 58, 18, 12, 0);
    const dot = (frame + i * 3) % 24 < 16;                 // standby LED
    r(cc + 5, 66, 2, 2, dot ? 10 : 2);
    // two chairs that never held a human
    r(cc - 14, 102, 6, 10, 8); r(cc - 14, 102, 6, 2, 7);
    r(cc + 8, 102, 6, 10, 8); r(cc + 8, 102, 6, 2, 7);
    r(cc - 13, 112, 4, 2, 0); r(cc + 9, 112, 4, 2, 0);     // chair feet
    // empty table
    r(cc - 17, 110, 34, 6, 7);
    r(cc - 17, 110, 34, 1, 15);                            // table top shine
    r(cc - 17, 115, 34, 1, 8);
    r(cc - 15, 116, 3, 10, 8); r(cc + 12, 116, 3, 10, 8);  // table legs
    // glass glint (short diagonal stepped highlight, top corner)
    r(cx0 + 5 + i, 49, 1, 8, 11); r(cx0 + 7 + i, 57, 1, 8, 11);
    r(cx0 + 9 + i, 65, 1, 6, 11);
  }
  // ---- aluminum mullions ----
  for (const mx of [0, 64, 128, 192, 256, 312]) {
    r(mx, 34, 4, 108, 7);
    r(mx, 34, 1, 108, 15);                                 // lit edge
    r(mx + 3, 34, 1, 108, 8);                              // shadow edge
  }
  r(0, 34, 320, 3, 7); r(0, 34, 320, 1, 15);               // top rail
  r(0, 139, 320, 3, 7); r(0, 139, 320, 1, 15);             // bottom rail

  // ---- warning tapes stretched at random heights (nobody knows why) ----
  for (const [tx, ty, tw] of [[60, 84, 120], [140, 64, 140], [30, 108, 90]]) {
    r(tx, ty, tw, 3, 14);
    for (let x = tx + 5; x < tx + tw; x += 10) r(x, ty, 5, 3, 0);
    r(tx, ty + 3, tw, 1, 8);                               // tape shadow on glass
  }

  // ---- main safety sign: YOUR SAFETY IS OUR PRIORITY №1-47 ----
  r(132, 38, 78, 20, 4);                                   // red frame
  r(134, 40, 74, 16, 15);                                  // white board
  r(137, 43, 8, 8, 4); r(139, 45, 4, 4, 15);               // warning roundel
  r(148, 43, 56, 1, 0); r(148, 46, 48, 1, 0);              // "text" lines
  r(148, 49, 52, 1, 0); r(148, 52, 30, 1, 0);
  r(184, 51, 20, 3, 4);                                    // red "№1-47" tag
  r(132, 58, 78, 1, 8);                                    // sign shadow
  // taped amendment: "priority 48 postponed to next quarter"
  r(196, 57, 13, 9, 8);                                    // note shadow
  r(195, 56, 13, 9, 15);                                   // sticky note
  r(197, 58, 9, 1, 0); r(197, 60, 7, 1, 0);                // tiny print
  r(197, 62, 8, 1, 4);                                     // the red verdict
  r(199, 54, 5, 3, 14);                                    // yellow tape bit

  // ================= exits =================
  // right opening → lobby: solid wall pier + bright doorway cut into it
  r(296, 34, 24, 108, 7);                                  // end wall pier
  r(296, 34, 2, 108, 15);                                  // lit pier edge
  r(303, 48, 3, 96, 8);                                    // jamb shading
  r(306, 50, 14, 92, 15);                                  // bright lobby beyond
  r(306, 50, 3, 92, 11);                                   // depth shade inside
  r(306, 118, 14, 24, 11);                                 // floor glow inside
  r(313, 60, 4, 60, 11);                                   // far lobby glass hint
  r(305, 48, 1, 96, 0); r(306, 48, 14, 2, 0);              // dark door frame
  r(295, 34, 1, 108, 0);                                   // pier outline pops
  // left opening → expo (keynote flashes leak through)
  const expoGlow = frame % 20 < 10 ? 14 : 15;
  r(12, 48, 3, 96, 7); r(14, 48, 1, 96, 8);                // jamb
  r(0, 50, 12, 92, expoGlow);
  r(9, 54, 3, 84, expoGlow === 14 ? 15 : 14);              // inner shimmer
  r(15, 48, 1, 96, 0);

  // ================= shiny floor (142..200) =================
  r(0, 142, 320, 1, 0);                                    // horizon line
  r(0, 143, 320, 57, 7);
  r(0, 143, 320, 9, 15);                                   // far mirror shine
  for (let y = 152; y < 157; y += 2)                       // dithered falloff
    for (let x = (y % 4); x < 320; x += 4) r(x, y, 2, 2, 15);
  // mirror reflection of the glass wall: soft vertical ghosts of mullions
  for (const mx of [0, 64, 128, 192, 256, 312]) {
    r(mx + 1, 143, 2, 12, 11);
    r(mx + 1, 156, 2, 6, 8);
  }
  // perspective seams converging toward (60,120) — polished tile joints
  for (const bx of [-90, 10, 110, 210, 310, 410]) {
    for (let y = 152; y < 200; y += 6) {
      const t = (y - 120) / 80;
      const x = Math.round(60 + (bx - 60) * t);
      if (x >= 0 && x < 320) r(x, y, 1, 6, 8);
    }
  }
  r(0, 168, 320, 1, 8); r(0, 184, 320, 1, 8);              // cross joints
  // specular streaks on the polish
  for (const [gx, gy, gw] of [[44, 156, 12], [100, 163, 14], [154, 172, 16],
    [214, 160, 12], [258, 178, 18], [118, 190, 20], [70, 186, 12]]) {
    r(gx, gy, gw, 1, 15); r(gx + 2, gy + 1, gw - 4, 1, 11);
  }
  // glow spill from the expo doorway on the floor
  if (frame % 20 < 10) { r(0, 143, 18, 5, 14); r(0, 148, 12, 3, 14); }
  // reflection of the right doorway + pier base shadow
  r(308, 143, 10, 10, 15); r(310, 153, 7, 6, 11);
  r(296, 143, 9, 2, 8);
  // near-edge vignette: floor darkens at the very bottom (closer = less lit)
  for (let x = 0; x < 320; x += 4) {
    r(x + (x / 4) % 2 * 2, 196, 2, 2, 8);
    r(x + ((x / 4) + 1) % 2 * 2, 198, 2, 2, 8);
  }

  // ================= the 47 safety barriers (well, five visible) ==========
  // far → near, each one dutifully guarding the next one
  const barriers = [[82, 143, 20, 12], [112, 144, 24, 15], [150, 146, 28, 18],
    [196, 148, 34, 22], [250, 150, 40, 26]];
  for (const [bx, by, bw, bh] of barriers) {
    const signH = Math.max(4, (bh / 5) | 0) + 1;
    const boardH = (bh * 0.45) | 0;
    // floor shadow
    r(bx - 1, by + bh - 2, bw + 2, 3, 8);
    // legs
    r(bx + 1, by + signH, 3, bh - signH, 7); r(bx + 1, by + signH, 1, bh - signH, 15);
    r(bx + bw - 4, by + signH, 3, bh - signH, 7); r(bx + bw - 4, by + signH, 1, bh - signH, 15);
    r(bx, by + signH - 1, 1, bh - signH + 1, 0); r(bx + bw - 1, by + signH - 1, 1, bh - signH + 1, 0);
    // striped board (fake-diagonal: two offset rows of P4/P15)
    r(bx - 1, by + signH - 1, bw + 2, boardH + 2, 0);      // outline
    const rowH = Math.max(2, (boardH / 2) | 0);
    for (let row = 0; row < 2; row++) {
      const yy = by + signH + row * rowH;
      for (let x = 0, k = row; x < bw; x += 6, k++)
        r(bx + x, yy, Math.min(6, bw - x), rowH, k % 2 ? 15 : 4);
    }
    // little "For Your Safety" sign on top
    r(bx + ((bw - 8) >> 1) - 1, by - 1, 10, signH + 1, 0);
    r(bx + ((bw - 8) >> 1), by, 8, signH - 1, 15);
    r(bx + ((bw - 8) >> 1) + 1, by + 1, 6, 1, 0);
    // faint reflection on the polished floor
    r(bx + 2, by + bh + 1, bw - 4, 2, 15);
  }

  // ================= confetti cannon (the hero of this room) ==============
  // scattered confetti — the only joy ever approved, and it was cancelled
  const conf = [[12, 154, 12], [22, 150, 14], [34, 156, 10], [46, 152, 9],
    [58, 158, 13], [66, 154, 12], [16, 166, 14], [30, 170, 9],
    [44, 168, 13], [56, 174, 10], [24, 180, 12], [40, 184, 14],
    [12, 188, 9], [62, 186, 13]];
  for (const [cx, cy, cc] of conf) r(cx, cy, 3, 3, cc);
  // tripod base
  r(20, 139, 22, 10, 0);                                   // outline
  r(21, 140, 20, 8, 7); r(21, 140, 20, 2, 15);
  r(19, 148, 8, 3, 8); r(35, 148, 8, 3, 8);                // splayed feet
  r(18, 150, 26, 2, 8);                                    // ground shadow
  // barrel — many small stepped rects = smooth 45°-ish tube, P12 party red
  const seg = [];
  for (let i = 0; i < 7; i++) seg.push([33 - i * 2, 135 - i * 4.5 | 0, 11, 8]);
  for (const [sx, sy, sw, sh] of seg) r(sx - 1, sy - 1, sw + 2, sh + 2, 0); // outline
  for (const [sx, sy, sw, sh] of seg) {
    r(sx, sy, sw, sh, 12);
    r(sx + 1, sy, 2, sh, 15);                              // long left sheen
    r(sx + sw - 2, sy + 1, 2, sh - 1, 4);                  // shaded side
  }
  r(25, 119, 11, 5, 14); r(26, 119, 2, 5, 15);             // festive band
  // flared muzzle cone (wider than the tube)
  r(18, 106, 15, 4, 0);
  r(19, 107, 13, 2, 12); r(20, 107, 2, 2, 15);
  r(16, 101, 19, 6, 0);                                    // muzzle ring
  r(18, 102, 15, 4, 8);                                    // bore
  r(19, 103, 5, 2, 0);                                     // deep bore
  // one brave confetti flake peeking out of the muzzle
  if (frame % 30 < 15) r(24, 100, 2, 2, 13);

  // ================= stuck cleaning robot (right corner) ==================
  // forever shuttling 20cm in front of the nearest barrier, since 2025
  const ph = frame % 40; const sw2 = frame % 20;
  const rbx = 272 + (ph < 20 ? sw2 : 20 - sw2);
  r(rbx - 2, 184, 24, 3, 8);                               // floor shadow
  r(rbx - 1, 171, 20, 12, 0);                              // outline
  r(rbx, 172, 18, 10, 8);
  r(rbx + 1, 172, 16, 2, 7);                               // top highlight
  r(rbx + 2, 176, 14, 2, 10);                              // sensor strip
  r(rbx + 1, 182, 4, 4, 0); r(rbx + 13, 182, 4, 4, 0);     // wheels
  r(rbx + 2, 183, 1, 1, 7); r(rbx + 14, 183, 1, 1, 7);     // hubcap glints
  if (frame % 8 < 4) { r(rbx + 8, 169, 2, 3, 4); r(rbx + 7, 168, 4, 1, 12); } // panic LED
  else r(rbx + 8, 169, 2, 3, 8);
  r(rbx + 4, 186, 10, 2, 11);                              // its 20cm of pride
}
