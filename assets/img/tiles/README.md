# In-house game tiles (3D icons)

The 5 quick-play icons in the sidebar's "In-house games" strip. Each tile swaps from
its gradient glyph to your 3D icon once it loads.

## Files (filename = key)
`mines` · `crash` · `dice` · `plinko` · `hilo`
→ e.g. `mines.png`, `crash.png`, `dice.png`, `plinko.png`, `hilo.png`

## Specs
- **Square 1:1.** Suggested **128 × 128**. Transparent PNG/WebP ideal (shown ~48 px).
- 3D / rendered style is perfect here.

Files map into `assets/img/manifest.json` under `"icons"` (e.g. `"mines": "tiles/mines.png"`).
