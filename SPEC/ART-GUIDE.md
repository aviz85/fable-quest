# ART-GUIDE — painting like it's 1989

You are painting a 320x200 EGA background, Sierra SCI0 era (King's Quest IV, Space Quest III, Leisure Suit Larry 2). Your only brush is `fillRect`. That's how they did it. Sort of.

## The palette (P[0]..P[15]) — EGA, sacred, no other colors

| i | color | use for |
|---|-------|---------|
| 0 | black | outlines, night sky, shadows, screens |
| 1 | blue | night, water, corporate carpets, jeans |
| 2 | green | terminals, plants, matrix vibes |
| 3 | cyan | Anthropic vibes, sky accents, hologram |
| 4 | red | alarms, xAI lava, danger |
| 5 | magenta | neon, sci-fi glow, weird AI stuff |
| 6 | brown | wood, desert, skin, coffee |
| 7 | light gray | walls, concrete, metal |
| 8 | dark gray | shadows on walls, server racks |
| 9 | light blue | day sky, screens glow |
| 10 | light green | LEDs, grass highlight, terminal text |
| 11 | light cyan | highlights, glass, ice |
| 12 | light red | neon signs, warning lights |
| 13 | light magenta | vaporwave, portals, Fable-glow |
| 14 | yellow | light sources, sand, gold, Google-ish |
| 15 | white | highlights, clouds, eyes, text-glow |

## Composition recipe (follow it!)

1. **Layers back-to-front**: sky/ceiling → far wall/horizon → mid objects → floor → near objects.
2. **Floor occupies y=145..200** (the hero walks in y 150..192). Give it perspective: darker/narrower strips further away.
3. **Horizon/wall line around y=100-145.**
4. **Big readable shapes** — a door is ~36x80. Hero is 10 wide, 28 tall; a chair ~20x24; a desk ~60x28. Draw the hero-scale in your head.
5. **Fake dithering** for gradients: alternate 2px-wide vertical strips of two colors, or a checkerboard of 2x2 rects (keep it cheap — big rects, not per-pixel loops... but a `for` loop drawing strips is fine).
6. **Outlines**: 1-2px black (P[0]) rect edges around objects make them pop, very Sierra.
7. **Light**: pick a light source; put P[15]/P[14] highlights on top edges, P[8]/P[0] shadow under objects (a flat dark ellipse ≈ a 30x4 rect).
8. **Depth trick**: overlapping objects + things lower on screen = closer + slightly bigger.
9. **Animate something**: blinking LED, flickering neon, scrolling terminal text (green rects), steam (offset by frame), pulsing portal: `const pulse = frame % 20 < 10 ? 13 : 5;`
10. **Sign text**: you can't draw Hebrew letters — suggest signage with colored bars/blocks, or simple LATIN block letters if essential (rect-built, 5x7 grid). Prefer iconography.

## Faction visual identities

- **Hub / תל אביב 2027**: Bauhaus + neon + shwarma stands, sunset P[5]/P[12]/P[14] dithered sky.
- **Anthropic**: warm clay/terracotta P[6]+cyan P[3]/P[11], zen minimalism, soft lighting, scrolls of "Constitution" on walls, friendly.
- **OpenAI**: sterile white/gray P[7]/P[15]/P[8], endless glass, a giant black monolith with one glowing eye, everything "For Your Safety" barriered.
- **xAI**: red/black P[4]/P[12]/P[0] rocket-factory chaos, sparks, memes taped to server racks, a flamethrower on a wall mount.
- **Google**: primary colors P[1]/P[4]/P[14]/P[2] on white, playground-office with slides, but everything is deprecated/half-shut-down, dusty beta signs.
- **Fable realm (finale)**: dream-logic P[13]/P[5]/P[11], floating islands, impossible geometry, storybook glow.

## Sanity loop (MANDATORY)

```
node tools/render-scene.mjs <id>          # writes out/renders/<id>.png + black-pixel %
# LOOK at the png with the Read tool
node tools/render-scene.mjs <id> --hero   # check scale vs hero
```
Iterate at least twice. If black/unpainted > 40% and it's not a cave — fix it. If it looks like abstract art instead of a place — fix it. Ask yourself: "would 12-year-old me in 1989 know exactly where I am?"
