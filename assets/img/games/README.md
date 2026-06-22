# Game card images

Portrait thumbnails for the game cards. A card swaps from its built-in SVG to your
image only once the image loads, so missing files just keep the SVG (never broken).

## Specs
- **Aspect ratio:** 3 : 4 portrait. Suggested **480 × 640** (or 600 × 800).
- **Format:** `.webp` preferred; `.jpg`/`.png` fine.
- **Filename = the id below** (lowercase, hyphenated).

## NodeRoll Originals
`mines` · `crash` · `dice` · `plinko` · `hilo` · `wheel` · `tower` · `keno` · `limbo` · `coinflip`
→ e.g. `mines.webp`, `crash.webp`

## Slots (filename = slugified game name)
`aztec-gold` · `neon-reels` · `cyber-fortune` · `crypto-kong` · `lucky-pharaoh` ·
`frost-wilds` · `diamond-rush` · `voodoo-nights` · `pirate-s-hoard` · `samurai-spins` ·
`golden-yeti` · `midnight-joker` · `inferno-7s` · `stellar-drift` · `rune-bound` · `toxic-reels`

Upload whichever you have — each maps into `assets/img/manifest.json` under `"games"`
(e.g. `"mines": "games/mines.webp"`) and appears automatically.
