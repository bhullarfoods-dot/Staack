# Promo card elements

Decorative images for the two side-promo cards (Race / Refer).
They overlay the right side of each card on top of the gradient background.

## Files
| Key    | Card                   | Filename example   |
|--------|------------------------|--------------------|
| `race`  | Race for $50,000       | `race.webp`        |
| `refer` | Earn 30% rakeback      | `refer.webp`       |

## Specs
- **Transparent PNG or WebP** recommended — the gradient shows through.
- **Size:** ~400 × 200 px (or taller if needed). The image sits on the right 45% of the card.
- After uploading, add the path to `assets/img/manifest.json` under `"promos"`:
  ```json
  "promos": {
    "race": "promos/race.webp",
    "refer": "promos/refer.webp"
  }
  ```
