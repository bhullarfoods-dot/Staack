# Sidebar — missing icons

These sidebar nav items still show the built-in vector glyph because no real icon
was uploaded for them. Drop a file using the filename below (any of `.svg` / `.png`
/ `.webp`) and tell me — I'll wire each into the manifest.

## Specs (all of them)
- **Square 1:1.** Suggested **48 × 48** (or 64 × 64).
- **`.svg` preferred** (crisp at any size, follows theme colour).
- Transparent background.
- Single-colour outline ideal — the existing sidebar icons are filled monochrome
  white glyphs, so match that style for visual consistency.

## Files to upload

### Group headers
| Key             | Label / what it represents             |
|-----------------|----------------------------------------|
| `g-predictions` | Predictions group head (chart/forecast)|
| `g-rtp`         | Live RTP single pill (gauge/speedometer)|

### Casino sub-items
| Key         | Label      |
|-------------|------------|
| `roulette`  | Roulette   |
| `blackjack` | Blackjack  |
| `baccarat`  | Baccarat   |

### Sportsbook sub-items
| Key          | Label        |
|--------------|--------------|
| `soccer`     | Soccer       |
| `basketball` | Basketball   |
| `tennis`     | Tennis       |
| `cricket`    | Cricket      |
| `baseball`   | Baseball     |
| `hockey`     | Ice Hockey   |
| `mma`        | MMA          |
| `ttennis`    | Table Tennis |
| `horse`      | Horse Racing |

### Predictions sub-items
| Key        | Label    |
|------------|----------|
| `politics` | Politics |

> Files go in **this folder** (`assets/img/sidebar-extras/`). After upload, I'll add
> each path to `assets/img/manifest.json` under the existing `"sidebar"` map.
