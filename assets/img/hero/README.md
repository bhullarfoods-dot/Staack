# Hero banner images

Drop the rotating hero banners here. They show in the 570×265 hero slot as an
auto-rotating carousel. Until files exist, the built-in SVG hero shows instead.

## Files (in display order)
| File | Headline (from your banners) |
|------|------------------------------|
| `hero-1.webp` | BIGGER BETS, BIGGER WINS — Join & Win |
| `hero-2.webp` | Real Wins, Real Fast — Spin Today |
| `hero-3.webp` | YOUR JACKPOT AWAITS TONIGHT — Claim Bonus |
| `hero-4.webp` | SPIN. WIN. REPEAT. — Play Now |

## Specs
- **Aspect ratio:** 570 × 265 (≈2.15:1). Export at 2× (**1140 × 530**) for crisp retina.
- **Format:** `.webp` preferred (smallest); `.jpg`/`.png` also fine — just tell me which
  and I'll match the extension in `assets/img/manifest.json`.
- The headline + CTA are baked into your images, so the site shows the image only
  (no text overlay).

After you upload, the file paths get listed in `assets/img/manifest.json` (relative
to `assets/img/`, e.g. `hero/hero-1.webp`) and the carousel activates automatically.
