---
id: "02"
title: Deconstruct the Tidal card's visual references
labels: [wayfinder:research]
status: open
assignee: null
blocked-by: []
created: 2026-11-11
closed: null
---

## Question

What is actually going on in Card B, and what can be rebuilt as a real system rather than imitated as a picture? Read `wayfinder/references/cards.md` (Card B) first.

Answer:

1. **Pattern.** `Seigaiha` (青海波): the exact construction of overlapping concentric arcs. Give a parameterised SVG tile (scale, stroke width, ring count, overlap) that tiles seamlessly, plus how to fade it, size it in `rem`, and keep it out of text contrast. Note the cultural origin briefly so the docs can credit it.
2. **Surface.** How to produce the indigo→cyan iridescent ground: multi-stop linear gradient, layered radial blooms, `conic-gradient` sheen, or a mesh approximation. Which is cheapest and most stable across browsers? Give colour stops and how to keep a 4.5:1 text zone within a luminous field.
3. **Type.** Identify the display serif on the card (the `Bard` wordmark is a high-contrast Didone-adjacent face) and propose three open-licensed pairings: display serif, text face, and a numeric/label face for `2026.11`-style metadata. Note licensing and `@fontsource` availability.
4. **Glass.** How the translucent orb cluster is built — backdrop blur, inner shadow, specular highlight, layered radial gradients. Give a CSS recipe that degrades to a flat tint when `backdrop-filter` is unsupported.
5. **Accessibility.** Contrast on iridescent and glass surfaces: state the rules for text, focus rings, and borders, and which effects must be dropped under `prefers-reduced-transparency` / `prefers-contrast`.

## Deliverable

`research/tidal-card.md` on branch `research/tidal-card` (already checked out in this worktree). Findings with sources, the SVG tile, the surface recipe, three pairings, glass recipe, and the accessibility rules. No React build, no components.
