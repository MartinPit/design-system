---
id: "13"
title: Verify both branches against the quality bar
labels: [wayfinder:task]
status: open
assignee: null
blocked-by: ["11", "12"]
created: 2026-11-11
closed: null
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
