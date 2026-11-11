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
- `src/components/` — the full 27-component inventory, CSS Modules per component: Actions, Forms, Navigation, Display and Overlay.
- `src/docs/` — the hash-routed documentation page, foundations read from live tokens, and the registry that drives nav and specimens.
- `src/icons/` — inline SVG icons at 1.5px stroke; no icon dependency.

Every page follows the same contract: live demo, variant matrix, forced state grid, props table, two do and two don't, and one accessibility note. Overlays use opaque abyss surfaces, never the luminous middle of the ground.

## Routes

`#/overview`, `#/foundations/<colour|type|space|shape|elevation|motion|icons>`,
`#/components/<button|icon-button|link|text-field|text-area|select|checkbox|radio-group|switch|slider|search-field|segmented-control|tabs|breadcrumb|pagination|card|badge|tag|avatar|table|progress|skeleton|empty-state|tooltip|dialog|dropdown-menu|toast>`,
`#/accessibility`.

Unknown hashes fall back to Overview. The sidebar is fixed at ≥1024px, a collapsible rail from 768–1023px, and a `Contents` disclosure below 768px that closes on navigation.

## Quality bar

WCAG 2.2 AA, visible focus, full keyboard operation, responsive 360–1440, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`, `forced-colors`. The final pass ran strict axe-core rules (WCAG 2.0/2.1/2.2 A and AA) against the built page across all 36 routes at 390 and 1440 with zero violations and zero page overflow, plus keyboard checks for Dialog, DropdownMenu, Tooltip, Tabs, Toast and Select. Deliberate deviations from the card are listed on the Accessibility page: cream replaces the black wordmark, type is zoned by luminance, glass stays at ≤12% white behind cream text, the pattern is decorative and hidden from assistive tech.

## Plan

Seed, decisions, and delivery contract: [`wayfinder/tickets/05-tidal-visual-language.md`](../wayfinder/tickets/05-tidal-visual-language.md) on `main` (the tracker is not copied onto this branch).
