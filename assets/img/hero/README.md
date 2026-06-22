# Hero banners (layered)

The hero is now a **peek carousel** (1 full banner + ~75% of the next, auto-scrolling).
Each slide is built from **separate layers** so you have full control:

- **Background** → upload to [`bg/`](./bg) (`bg-1 … bg-4`)
- **Character** → upload to [`character/`](./character) (`char-1 … char-4`, transparent)
- **Text** (heading, subheading, badges, CTA) is rendered by the site on the left side —
  unique per slide, shared layout. Tell me any copy you want changed.

Until you upload backgrounds, each slide shows an on-brand gradient placeholder with the
text + CTA already in place, so the layout is fully visible.

> The old composite banners (`nrbanner1–4.png`) are no longer used — they had the text
> baked in, which conflicts with the new text overlay. You can delete them or leave them.
