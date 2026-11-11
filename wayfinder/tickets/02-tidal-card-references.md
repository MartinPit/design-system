---
id: "02"
title: Deconstruct the Tidal card's visual references
labels: [wayfinder:research]
status: closed
assignee: thinker (AFK subagent)
blocked-by: []
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Findings: `research/tidal-card.md` on branch `research/tidal-card`, commit `13dc6d9`. Throwaway branch, not merged; read with `git show research/tidal-card:research/tidal-card.md`.

- **Seigaiha:** stroke-only tile, `R=100`, 4 rings, `stroke-width 3.5`, 200×200; applied at `3.5rem` (3rem mobile / 4.5rem wide) as an alpha mask over a tinted layer. Cream text sits over ≤20% white lines; hide the pattern behind dense type.
- **Ground:** one 6-stop 32° linear (`#0A0722 → #120B33 → #3E2A8F → #7A87DE → #5BCFE4 → #A9F0D8`) plus three radial blooms; the lower-left abyss bloom doubles as the AA text zone.
- **Type:** **Bodoni Moda / Source Serif 4 / IBM Plex Mono** (recommended). Alternatives: Playfair–Newsreader–JetBrains Mono; DM Serif Display–Figtree–Space Mono.
- **Glass:** layered radial highlights, inset shadows, optional `backdrop-filter`; opaque `#8E9BE8 → #5A4AB0 → #241A5E` fallback. Blur is enhancement only.
- **AA:** black on the card's lower-left is 1.07:1 — the reference is internally inconsistent. Type is zoned (cream on abyss/indigo/violet, ink on periwinkle/cyan/mint); a 55% indigo scrim buys 8.04:1 across the middle. Dual-band focus ring. Pattern ≤20% under cream text.

Consumed by: ["Decide the Tidal visual language"](05-tidal-visual-language.md), now unblocked.
