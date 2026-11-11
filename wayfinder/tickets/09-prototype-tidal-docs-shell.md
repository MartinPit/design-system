---
id: "09"
title: Prototype the Tidal docs shell and specimen layout
labels: [wayfinder:prototype]
status: open
assignee: null
blocked-by: ["05", "06"]
created: 2026-11-11
closed: null
---

## Question

Does the Tidal visual language survive contact with a documentation page — and does the ornamental surface stay readable at documentation density? Raise the fidelity with a cheap, runnable React artifact, then react to it with the human.

Build in `prototype/` on branch `ds/tidal` (or its own `prototype/tidal-docs` branch if the design branch is busy):

- The docs shell from ticket `06`: header, sidebar nav, content pane, mobile collapse.
- Real Tidal styling from ticket `05`: the iridescent ground, the seigaiha surface at documentation scale, the chosen serif pairing, the superellipse shapes, the glass levels.
- Three sections only: **Overview**, **Colour** (swatch grid over the luminous field), **Buttons** (variant × state grid on glass).
- The orb and the wave field used in context, so their cost is visible — especially whether the pattern competes with body text.
- Realistic flashcards copy.
- Focus rings that survive the luminous background, plus reduced-motion and reduced-transparency fallbacks.

Do not build all 25 components. The question is whether the surface, the type, and the depth system hold together.

## Deliverable

A runnable prototype and a short note in the resolution: what held, what broke, what the build must change. Link assets, do not paste them.
