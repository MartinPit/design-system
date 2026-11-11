---
id: "01"
title: Deconstruct the Arcana card's visual references
labels: [wayfinder:research]
status: open
assignee: null
blocked-by: []
created: 2026-11-11
closed: null
---

## Question

What is actually going on in Card A, and what can be rebuilt as a real system rather than imitated as a picture? Read `wayfinder/references/cards.md` (Card A) first.

Answer:

1. **Type.** Identify the card's sans (it is The Browser Company's ARC identity) or the closest genre — neo-grotesque with geometric terminals, tight spacing, uppercase letterspaced labels. Propose three open-licensed pairings that can carry a documentation page: a display/heading face, a text face, and a label/mono face. Note licensing and where to bundle them from (`@fontsource/*` preferred).
2. **The gradient form.** Describe its geometry precisely enough to rebuild: the asymmetric radii, the arc of the top edge, the scoop of the bottom, where each colour stop sits. Then propose two constructions — an SVG path with a gradient fill, and a CSS-only version with `border-radius` longhands plus layered gradients — and say which survives resizing and dark ink overlaid on it.
3. **The archive grammar.** What makes the bottom of the card read as institutional? The seal badges, the keyline strip, the stacked wordmark, the redaction squares, the date. Find the visual conventions (Swiss ID cards, library due-date cards, riso print, archives) and name the reusable primitives: keyline box, seal, label strip, monogram tile.
4. **Colour.** Extract hex values for cream, ink purple, lavender, and the gradient stops from the transcription plus any source imagery; then propose a neutral ramp and a contrast-safe text colour for use on cream.
5. **Accessibility.** Where does the card's palette fail WCAG AA, and what is the smallest defensible adjustment? Gradient text is likely out; state the rule.

## Deliverable

`research/arcana-card.md` on branch `research/arcana-card` (already checked out in this worktree). Findings with sources, the three pairings, both constructions, extracted palette, and the AA rule. No React build, no components.
