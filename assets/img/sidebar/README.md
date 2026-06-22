# Sidebar nav icons

Custom icons for the left-sidebar navigation links. Each link swaps from its built-in
SVG to your image once it loads (missing files keep the SVG — never broken).

## Files (filename = key below)
| Key            | Menu label          |
|----------------|---------------------|
| `originals`    | NodeRoll Originals  |
| `top-games`    | Top Games           |
| `new-games`    | New Games           |
| `hot-games`    | Hot Games           |
| `slots`        | Slots               |
| `crash-games`  | Crash Games         |
| `live-casino`  | Live Casino         |
| `favorites`    | Favorites           |
| `providers`    | Providers           |
| `nft-vault`    | NFT Vault           |
| `loyalty`      | Loyalty             |
| `futures`      | Futures             |
| `tournaments`  | Tournaments         |
| `leaderboard`  | Leaderboard         |

→ e.g. `originals.svg`, `top-games.webp`

## Specs
- **Square 1:1.** Suggested **48 × 48** (or 64 × 64). `.svg` is ideal (crisp at any size).
- Transparent background. Single-color or full-color both fine.
- Displayed ~19–20 px, so keep them simple/legible.

Files map into `assets/img/manifest.json` under `"sidebar"`.
