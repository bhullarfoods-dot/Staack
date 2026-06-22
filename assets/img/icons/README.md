# Icons (in-house games strip)

Square icons for the 5 quick-play tiles in the sidebar's "In-house games" strip.
A tile swaps from its built-in SVG icon to your image once it loads.

## Files
`mines` · `crash` · `dice` · `plinko` · `hilo`
→ e.g. `mines.webp`, `crash.webp`, `dice.webp`, `plinko.webp`, `hilo.webp`

## Specs
- **Aspect ratio:** 1 : 1 square. Suggested **96 × 96** (or 128 × 128).
- **Format:** `.webp` preferred; `.jpg`/`.png` fine. Transparent PNG works well.

The rest of the UI icons (nav, top bar, etc.) are crisp vector SVG and are best left
as-is — but I can wire any of those to custom images too if you want. Files map into
`assets/img/manifest.json` under `"icons"` (e.g. `"mines": "icons/mines.webp"`).
