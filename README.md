# Staack Casino — Homepage

A self-contained, responsive homepage for a fictional online casino, inspired by the
attached **kas.casino** case study (dark neon theme, Battle Pass reward mechanic,
vibrant game cards).

Everything is integrated — there are **no external image dependencies**. All game
thumbnails, characters, medals and banners are generated with inline SVG / CSS
gradients, so the page renders correctly fully offline (only the web font is remote).

## Sections
- **Header** — logo, game search, Login / Sign Up, scrollable category bar (Lobby, Hot, New, Slots, Live Casino, Jackpot, Bonus buy, Providers).
- **Hero banner** — "Unlimited Cash · Unlimited Staack" with a tropical illustration and a floating live-win chip.
- **Live wins ticker** — auto-scrolling marquee of randomized wins.
- **Hot** & **New Games** — horizontally scrollable card rows with arrow navigation and hover "Play".
- **Step into the Future** — value-proposition split section.
- **Promotions** — welcome offer with live countdown, $500,000 MEGA jackpot, and an avatar customizer.
- **Battle Pass** — Season 2 card with current reward medal, progress bar and a 12-level reward track (claimed / current / locked).
- **Payments strip** + **footer**.

## Run
Open `index.html` in any browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure
```
index.html            # markup
assets/css/styles.css # theme + layout (palette from the case study spec)
assets/js/main.js     # generated game cards, ticker, avatars, Battle Pass, countdown, confetti
```
