# Tidal

A design system for a flashcards app, built from **Card B** — the iridescent membership token with a seigaiha field, a Didone wordmark, and a glass orb.

## Character

Indigo to mint, luminous and layered. A fine seigaiha field over one iridescent ground; cream type lives in the abyss corner, ink on the bright end. Depth is glass, not shadow. Ornament is restrained by one repeating geometry.

## Run

```bash
npm install
npm run dev       # documentation page
npm run verify    # lint + typecheck + tests + production build
```

## Inside

- `src/styles/tokens.css` — single source of truth for colour, type, shape, space, motion.
- `src/components/` — the 27-component library, CSS Modules per component.
- `src/docs/` — the documentation page and the registry that drives its nav.
- 27 components in five groups: Actions, Forms, Navigation, Display, Overlay.

## Quality bar

WCAG 2.2 AA, visible focus, full keyboard operation, responsive 360–1440, `prefers-reduced-motion`, `prefers-reduced-transparency`. Deliberate deviations from the card are listed on the documentation page's Accessibility section: cream replaces the black wordmark, type is zoned by luminance, glass stays at ≤12% white behind cream text, the pattern is decorative and hidden from assistive tech.

## Plan

Seed, decisions, and delivery contract: [`wayfinder/tickets/05-tidal-visual-language.md`](../wayfinder/tickets/05-tidal-visual-language.md) on `main` (the tracker is not copied onto this branch).
