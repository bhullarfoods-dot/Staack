# Hero — CHARACTER cutouts

Transparent character art that sits on the **right side** of each hero slide, on top
of its background (`../bg/`). Each character pairs with the background of the same number.

## Files (one per slide, in display order)
| File      | Pairs with   |
|-----------|--------------|
| `char-1`  | `bg/bg-1`    |
| `char-2`  | `bg/bg-2`    |
| `char-3`  | `bg/bg-3`    |
| `char-4`  | `bg/bg-4`    |

→ e.g. `char-1.webp`, `char-1.png`

## Specs
- **Transparent PNG or WebP** (no background — it overlays the bg).
- **Portrait-ish**, tall enough to fill the banner height. Suggested **~700 × 700+**.
- Subject framed to the **right**; it's anchored to the right edge of the banner.
- Upload as many as you have. A slide still works with only a background (no character).

After upload, paths get listed in `assets/img/manifest.json` under `"heroChar"`.
