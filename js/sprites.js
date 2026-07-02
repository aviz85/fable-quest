// Hero sprite — drawn procedurally, EGA palette indices.
// drawHero(ctx, P, x, y, frame, dir) — x,y is the BOTTOM-CENTER of the hero (feet).
// Hero is ~10px wide, ~28px tall (320x200 space). dir: 1 = facing right, -1 = facing left.
export function drawHero(ctx, P, x, y, frame, dir = 1) {
  const f = Math.floor(frame / 4) % 2; // walk cycle
  const px = (dx, dy, w, h, c) => {
    ctx.fillStyle = P[c];
    ctx.fillRect(Math.round(x + dx * dir - (dir < 0 ? w : 0)), Math.round(y + dy), w, h);
  };
  // legs (jeans, blue)
  px(-4, -8, 3, 8 - f, 1);
  px(1, -8 + f, 3, 8 - f, 1);
  // shoes
  px(-5, -1, 4, 1, 0);
  px(1, -1, 4, 1, 0);
  // torso (hoodie — dark gray with magenta AI-logo pixel)
  px(-5, -18, 10, 10, 8);
  px(-1, -15, 2, 2, 13);
  // arms
  px(-7, -17 + f, 2, 7, 8);
  px(5, -17 - f, 2, 7, 8);
  // hands
  px(-7, -10 + f, 2, 2, 6);
  px(5, -10 - f, 2, 2, 6);
  // head
  px(-3, -26, 7, 8, 6); // skin (brown-ish EGA skin)
  px(-3, -27, 7, 3, 0); // hair
  // eyes (facing dir)
  if (dir >= 0) { px(1, -23, 1, 1, 0); px(3, -23, 1, 1, 0); }
  else { px(0, -23, 1, 1, 0); px(2, -23, 1, 1, 0); }
  // headphones (he's a techie)
  px(-4, -25, 1, 4, 4);
  px(4, -25, 1, 4, 4);
  px(-4, -28, 9, 1, 4);
}
