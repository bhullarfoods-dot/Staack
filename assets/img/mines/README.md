# Mines board characters

Two characters that flank the Mines board (one on the left, one on the right). They sit
behind/beside the tiles and are **only shown on wide screens** (≥1480px) so they never
overlap the board on smaller screens.

## Files (filename = key)
| Key     | Side              |
|---------|-------------------|
| `left`  | Left of the board |
| `right` | Right of the board|

→ e.g. `left.png`, `right.png`

## Specs
- **Transparent PNG/WebP**, portrait/full-body. Suggested **~500–800 px tall**.
- `left` should face right, `right` should face left (toward the board) if possible.

Files map into `assets/img/manifest.json` under `"mines"`.
