# Hero — BACKGROUND layers

The hero is now built in layers: a **background** (this folder) + a **character**
(`../character/`) + text (heading/subheading/badges/CTA) that I add in code on the
left side. Each slide = one background paired with one character of the same number.

## Files (one per slide, in display order)
| File    | Pairs with         |
|---------|--------------------|
| `bg-1`  | `character/char-1` |
| `bg-2`  | `character/char-2` |
| `bg-3`  | `character/char-3` |
| `bg-4`  | `character/char-4` |

→ e.g. `bg-1.webp`, `bg-2.webp` … (`.jpg`/`.png` also fine)

## Specs
- **Aspect ratio:** ~16:6 wide (the banner is short & wide). Suggested **1600 × 600**.
- The **left ~45%** stays mostly clean/darker so the headline + CTA read clearly on top.
- **Format:** `.webp` preferred (smallest); `.jpg`/`.png` fine.
- Upload as many as you have (1–4). Missing ones are skipped automatically.

After upload, paths get listed in `assets/img/manifest.json` under `"heroBg"`.
