# Top nav bar icons

Custom icons for the top bar. Each swaps from its built-in SVG to your image on load.

## Files (filename = key below)
| Key          | Where it shows                         |
|--------------|----------------------------------------|
| `menu`       | Hamburger (mobile nav toggle)          |
| `search`     | Search button                          |
| `chat`       | Chat toggle button                     |
| `daily-case` | "Daily case" bonus pill (left icon)    |
| `rakeback`   | "Rakeback" bonus pill (left icon)      |

→ e.g. `search.svg`, `chat.webp`

## Specs
- **Square 1:1.** Suggested **40 × 40**. `.svg` ideal; transparent `.png`/`.webp` fine.
- Displayed ~18–22 px.

> The wallet **currency icon** and the **Buy Crypto** icon live in `../ui/`.
> Crypto coin logos (BTC, ETH…) live in `../crypto/`.

Files map into `assets/img/manifest.json` under `"topnav"`.
