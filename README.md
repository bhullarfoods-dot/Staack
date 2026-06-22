# NodeRoll — Crypto Casino

A self-contained, responsive front-end for a fictional crypto casino & sportsbook,
built to reference the SNEGBET / Ribbon Designs case study (sidebar nav · coin/balance
top bar · game lobby · live-chat rail · in-house game boards · loyalty dashboard).

Everything renders offline — there are **no external image dependencies**. All game
art, mascots, coins, icons and badges are drawn with CSS gradients + glyphs. The only
remote asset is the web font.

## Brand

Theme is built entirely around the supplied brand palette, with the **darkest** colour
as the page base, as specified.

| Token | Hex | Role |
|------|------|------|
| MIDNIGHT | `#0a092c` | page background / base (darkest) |
| TWILIGHT | `#33264a` | surfaces |
| PLASMA | `#4405e4` | primary / CTAs |
| PULSE | `#f50bba` | accent |
| NEON | `#13aded` | accent |
| VAPOR | `#efedf6` | light text |

- **Font:** `Bebas Neue` only, across the whole UI. Hierarchy is built from size,
  colour, spacing and layout (Bebas ships a single weight). System fonts are used
  *only* as a per-glyph fallback for decorative symbols Bebas doesn't include.
- **Logo:** text-only, white, Bebas Neue ("NodeRoll").
- **Hero banner:** exactly **570 × 265 px** (scales down by aspect-ratio on narrow
  viewports).
- Two tiny **semantic** accents sit outside the palette by intent — coin/jackpot gold
  and live/win green — matching the reference. Say the word to make it 100% brand-pure.

## Sections

- **Sidebar** — logo, in-house game strip, Casino/Sports toggle, category nav, loyalty
  links, Buy Crypto.
- **Top bar** — NODE coin price + Buy, bonus countdowns, players-online, balance +
  deposit, search/chat, Log in / Sign up, account avatar.
- **Hero row** — 570×265 welcome-bonus banner + side promos.
- **Live wins** — auto-scrolling winners marquee (pauses on hover).
- **NodeRoll Originals** — scrollable game rail.
- **Play now · Mines** — a working demo of the Mines original: adjustable mines,
  provably-fair-style multipliers, reveal / cash-out, profit readout.
- **Top / New / Slots** game grids.
- **Promo trio** — Casino · Sports · Futures (distinct, one "coming soon").
- **Loyalty** — bento dashboard (level track, stats, rewards).
- **Live chat** — seeded community chat with ambient messages + send; collapsible.

## Run

Open `index.html` in any browser, or serve it:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Structure

```
index.html             # markup / app shell
assets/css/styles.css  # brand tokens, Bebas type system, components, motion
assets/js/main.js      # generated cards/winners/chat, Mines game, toggles, counters
```

## Craft notes

Built applying the repo's design skills (`impeccable`, `design-taste-frontend`,
`emil-design-eng`, `ui-ux-pro-max`, `karpathy-guidelines`):

- Contrast-checked text; controlled (not excessive) neon glow.
- Motion uses exponential ease-out curves, `<300ms` UI timings, `scale(.97)` press
  feedback, staggered reveals, and a full `prefers-reduced-motion` fallback.
- Only `transform` / `opacity` are animated; ambient blobs are fixed & non-interactive.
- Semantic z-index scale; responsive collapse of chat → sidebar down to mobile.
