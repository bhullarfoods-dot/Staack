# Staack Casino

Static HTML/CSS/JS casino homepage with inline SVG assets and no external image dependencies.

## Structure

```
index.html            # markup
assets/css/styles.css # theme + layout
assets/js/main.js     # game cards, ticker, avatars, Battle Pass, countdown, confetti
```

## Skills

This project uses Emil Kowalski's design engineering skills for UI polish and animation craft:

- **Design Engineering** (`.claude/skills/emil-design-eng.md`): UI polish, component design, animation decisions, and invisible details that make software feel great. Follow the animation decision framework, easing guidelines, and performance rules when writing CSS/JS animations.
- **Review Animations** (`.claude/skills/review-animations.md`): Strict animation review against a high craft bar. Use when reviewing animation/motion code. Reference standards in `.claude/skills/review-animations-standards.md` for precise values and curves.

### Key animation rules to always follow

- Never use `ease-in` on UI animations — use `ease-out` or custom curves
- Never animate from `scale(0)` — start from `scale(0.95)` + opacity
- UI animations stay under 300ms
- Only animate `transform` and `opacity` for GPU performance
- Honor `prefers-reduced-motion`
- Gate hover animations behind `@media (hover: hover) and (pointer: fine)`
- Use CSS transitions over keyframes for interruptible UI
- Stagger group entrances with 30-80ms delays
