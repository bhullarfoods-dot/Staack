# Newsletter Image Assets

Drop your images into **this folder** (`newsletter/images/`) using the **exact filenames** below.
The newsletter HTML already points at these files, so once they're uploaded they'll appear automatically.

> **Important — email images must be hosted online.** Email clients can't load images
> from your computer. These files are referenced via your GitHub Pages URL:
> `https://bhullarfoods-dot.github.io/staack/newsletter/images/<filename>`
> They will only render once this branch is deployed to GitHub Pages (see note at the bottom).

| Filename | Where it appears | Recommended size | Notes |
|---|---|---|---|
| `logo.png` | Top brand bar + footer | 340 × 100 px (PNG, transparent) | Your Staack Games logo/wordmark. Transparent background. |
| `hero.jpg` | Hero background behind the headline | 1200 × 720 px (JPG) | A bold casino/character/background scene. Keep the center-top fairly dark so the white headline stays readable. |
| `project-noderoll.jpg` | "Noderoll" project card | 1024 × 640 px (JPG) | Best screenshot/cover from the Noderoll Behance project. |
| `project-wingg.jpg` | "WIN.GG" project card | 1024 × 640 px (JPG) | Best cover from the WIN.GG Behance project. |
| `project-swipebet.jpg` | "Swipe Bet" project card | 1024 × 640 px (JPG) | Best cover from the Swipe Bet Behance project. |
| `project-icons.jpg` | "Slot Thumbnails & Game Icons" card | 1024 × 640 px (JPG) | A grid/mockup of your slot thumbnails & icons. |

## Tips
- Keep each file **under ~400 KB** so the email loads fast and doesn't get clipped.
- Use the **exact filenames** above (lowercase, with hyphens) — the HTML is case-sensitive.
- JPG for photos/screenshots, PNG for the logo (transparency).
- 2× the display size (shown in "recommended size") keeps images crisp on retina screens.

## How to upload (easiest)
Open the upload page for this folder and drag your files in:
`https://github.com/bhullarfoods-dot/staack/upload/claude/html-email-newsletter-06poy3/newsletter/images`

## Making the images go live
The site's GitHub Pages deploy currently runs from a different branch. To serve these
images at the URL above, this `claude/html-email-newsletter-06poy3` branch needs to be
deployed to GitHub Pages (or merged into the deployed branch). Ask Claude to wire this
up if you'd like the images live for testing.
