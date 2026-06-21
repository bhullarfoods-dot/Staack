# NodeRoll — Crypto Casino & Sportsbook

A self-contained, responsive **app-shell interface** for a fictional crypto casino,
designed around a locked brand palette and a single typeface. Inspired by the
attached Ribbon Designs (SnegBet) case study — left-nav + top-bar + live-chat layout,
in-house originals, NFT levels and a sportsbook.

Everything is integrated — there are **no image dependencies**. Game thumbnails,
avatars, coins, NFT cards and the hero mascot orb are generated with inline SVG / CSS
gradients, so the page renders fully offline (only the Bebas Neue web font is remote).

## Brand system

| Token | Hex | Role |
|-------|-----|------|
| MIDNIGHT | `#0a092c` | **Page background / base** |
| TWILIGHT | `#33264a` | Elevated surfaces |
| PLASMA | `#4405e4` | Primary brand |
| PULSE | `#f50bba` | Accent / CTA |
| NEON | `#13aded` | Info / glow |
| VAPOR | `#efedf6` | Text / light foreground |

- **Typeface:** `Bebas Neue` only — hierarchy is built from size, letter-spacing and
  opacity (the family ships a single weight).
- **Logo:** text-only, pure white, Bebas Neue.
- **Hero banner:** exactly **570 × 265px** (verified), responsive below.

## Views (switch via the left sidebar / Casino–Sports toggle / avatar)

- **Casino** — winners live feed, 570×265 hero banner, quick category cards, and
  horizontally scrollable rows: NodeRoll Originals, Hot, New, Slots.
- **Originals** — a **playable Mines** mini-game: bet amount, bomb count, place bet,
  reveal gems/bombs, climbing multiplier strip, plus a live bets table.
- **Sports** — sport icon bar, sportsbook hero, Top / Live match cards with clickable
  1·X·2 odds and a Hot Combos bar.
- **Account** — profile, NFT level progression, gaming statistics, security (password /
  2FA) and an NFT collection strip.

Shared chrome: top bar (logo, ROLL coin ticker with live price, Buy, bonus countdowns,
language, auth, utilities), left navigation sidebar, and a **live chat** sidebar with a
seeded conversation that keeps receiving messages (and lets you send your own).

## Run

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or just open `index.html` in any modern browser.

## Structure

```
index.html             # app shell (top bar, sidebar, chat, empty view containers)
assets/css/styles.css  # brand theme, layout & responsive rules
assets/js/main.js      # view rendering, generated art, Mines game, chat & winners feeds
```

> Concept / portfolio interface. 18+ — for demonstration only. Play responsibly.
