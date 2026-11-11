# Arcana

A design system for a flashcards app, built from **Card A** — the cream archive card with one warm gradient form, a purple monogram, seals, and a ruled label strip.

## Character

Cream and ink, Swiss/editorial, flat print. One gradient event per viewport, never behind type. The archive grammar — keylines, seals, label strips, monogram tiles — carries the identity; colour is spent in one place.

## Run

```bash
npm install
npm run dev       # documentation page
npm run verify    # lint + typecheck + tests + production build
```

## Inside

- `src/styles/tokens.css` — single source of truth for colour, type, shape, space, motion.
- `src/components/` — the Phase A library, CSS Modules per component. Thirteen components are documented now; the full inventory is twenty-seven.
- `src/docs/` — the documentation page and the registry that drives its navigation. Routes: `#/overview`, `#/foundations/<slug>`, `#/components/<slug>`, `#/accessibility`.
- Components in three delivered groups: Actions, Forms, Navigation. Display and Overlay arrive in Phase B.

## Quality bar

WCAG 2.2 AA, visible focus, full keyboard operation, responsive 360–1440, `prefers-reduced-motion`. Deliberate deviations from the card are listed on the documentation page's Accessibility section: lavender stays decorative, amber/orange/magenta text uses text-safe variants, seals and redaction bars are `aria-hidden`, the gradient never carries type.

Tests cover a render smoke test per delivered component and keyboard operation for Tabs and Switch.

## Plan

Seed, decisions, and delivery contract: [`wayfinder/tickets/04-arcana-visual-language.md`](../wayfinder/tickets/04-arcana-visual-language.md) on `main` (the tracker is not copied onto this branch).
