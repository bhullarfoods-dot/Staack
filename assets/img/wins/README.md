# Live wins — game thumbnails

Small game images for the scrolling "Live wins" ticker under the hero. Each entry swaps
from its built-in SVG glyph to your image once it loads.

## Files (filename = slugified game name)
`aztec-gold` · `crash` · `mines` · `neon-reels` · `crypto-kong` ·
`wheel` · `frost-wilds` · `dice` · `lucky-pharaoh`

→ e.g. `aztec-gold.webp`, `crash.webp`

## Specs
- **Square 1:1.** Suggested **64 × 64**. `.webp`/`.png`/`.jpg` all fine.
- Displayed small (~26 px) in a rounded chip, so keep them punchy.

> Tip: if you'd rather reuse the full game-card art here, just say so and I'll point
> these at `../games/` instead of needing separate uploads.

Files map into `assets/img/manifest.json` under `"wins"`.
