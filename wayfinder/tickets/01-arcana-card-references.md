---
id: "01"
title: Deconstruct the Arcana card's visual references
labels: [wayfinder:research]
status: closed
assignee: thinker (AFK subagent)
blocked-by: []
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Findings: `research/arcana-card.md` on branch `research/arcana-card`, commit `9314d41`. The branch is throwaway and is not merged; read it with `git show research/arcana-card:research/arcana-card.md`.

- **Type:** the card's sans is **Marlin Soft SQ** (FontMesa, commercial; Arc preloads a Basic sample cut — not bundleable). Recommended OFL substitute: **Schibsted Grotesk / Instrument Sans / Fragment Mono** (Swiss Archive). Alternatives: Archivo–Figtree–Martian Mono (Soft Square); Bricolage Grotesque–Hanken Grotesk–DM Mono (Editorial).
- **The gradient is two fields, not one:** a 114° linear base plus a radial bloom at `(14%, 86%)`. Dark ink `#4A0D63` passes only on the amber end (6.55:1); keep type off the form or on a cream plate clipped to the path.
- **The palette is narrower than it looks:** lavender 1.41:1, amber 1.89:1, magenta-on-cream 4.28:1. Four adjusted values buy AA text: `#9C5600`, `#B04A13`, `#C41F70`, `#94846A`. Gradient text is out entirely.
- **Unverified:** Arc's actual Marlin licence, exact card hexes and silhouette (image absent), the seal numbering, and whether the 11px label face is Marlin.

Consumed by: ["Decide the Arcana visual language"](04-arcana-visual-language.md), now unblocked.
