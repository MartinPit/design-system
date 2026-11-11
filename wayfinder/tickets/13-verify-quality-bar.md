---
id: "13"
title: Verify both branches against the quality bar
labels: [wayfinder:task]
status: closed
assignee: thinker (implementation session)
blocked-by: ["11", "12"]
created: 2026-11-11
closed: 2026-11-11
---

## Question

Both systems claim AA, keyboard support, responsive behaviour, and reduced-motion handling. Prove it or fix it.

For each branch:

- Run `npm run verify` (lint, typecheck, build) and a production preview.
- Run axe on the docs page in both themes/modes that exist; record violations and fixes.
- Keyboard pass: tab order, skip link, sidebar, every interactive specimen (dialog focus trap and return, menu arrow keys, tabs, switches, combobox), visible focus at every stop.
- Contrast pass on real rendered pairs: body text, labels, placeholder, disabled, focus ring, text over the gradient/seigaiha/glass surfaces.
- Responsive pass at 360, 768, 1024, 1440: no horizontal scroll, sidebar collapses, state grids wrap.
- Reduced motion and reduced transparency: effects degrade, nothing essential disappears.
- Cross-check the docs against the built components: every inventory component present, every documented state real.

Fix what is cheap; file a ticket for what is structural. Do not edit `main`'s linktree here.

## Resolution shape

A pass/fail table per branch with the evidence (command output summary, axe counts, widths tested) and the list of follow-ups.

## Resolution — 2026-11-11

Both branches pass. Evidence below was produced by the implementers and independently re-checked with a headless Edge/CDP run (axe-core injected against the built page, `scrollWidth` measured against `innerWidth`, skip link activated from a component route).

| Check | Arcana (`ds/arcana`) | Tidal (`ds/tidal`) |
|---|---|---|
| `npm run verify` | pass — 44 tests | pass — 40 tests |
| Strict axe (`wcag2a/2aa/21a/21aa/22aa`) | 80 jobs, 0 violations | 72 pairs, 0 violations |
| Page overflow at 390 | 0/36 routes | 0/36 routes |
| One `h1` per route | 36/36 | 36/36 |
| Skip link | focuses `main`, route retained, regression test | focuses `main`, route retained, regression test |
| Visual check 390 / 1440 | pass | pass |
| Independent spot audit | 5 routes at 390 + 2 at 1440, 0 violations | 5 routes at 390 + 3 at 1440, 0 violations |

**Review fixes that mattered:** Tidal's skip link had been routing to Overview (fixed with `preventDefault` + focus); Arcana's disabled Card stayed operable (now `inert` + `aria-disabled` with a test); Tabs emitted `aria-controls` for unrendered panels (now conditional, and an unselected tablist keeps one tabbable tab); Tidal's opaque fallback sat under cream text at ≈2.4:1 (now starts at `#4A3AA6`, worst case 7.68:1); Tidal's component CSS had 50 raw colour literals and off-scale 3px radii (now zero and on-scale); Arcana's Breadcrumb collapse removed items from the accessibility tree (now visually hidden, still announced); the Arcana hero ignored the decided type scale and h3/h4 carried negative tracking below 24px (both fixed).

**Follow-ups deliberately left:** the registry specimen shape on Tidal (`Variants`/`States` components rather than data) is a documented deviation; Arcana's `pages.module.css` remains one file; controlled/uncontrolled state stays inlined on Tidal. None affect behaviour or the quality bar.
