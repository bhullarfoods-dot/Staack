# Chat avatars

Avatar images for the community-chat users. Upload as many as you like — each chat
user is assigned one deterministically (same user → same avatar), cycling through the
pool. Until you upload, users get themed glyph avatars automatically.

## Files
Any names — upload a set (e.g. `a1.png`, `a2.png`, … or `avatar-1.webp`, …).
Tell me how many you uploaded (or just say "done") and I'll list them in the manifest.

## Specs
- **Square 1:1.** Suggested **96 × 96** (or 128 × 128).
- Transparent or solid both fine; they're shown in a 30 px rounded square (cropped to fill).
- `.png` / `.webp` / `.jpg` all fine.

Files map into `assets/img/manifest.json` under `"avatars"` (an array of paths).
