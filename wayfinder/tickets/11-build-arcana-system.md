---
id: "11"
title: Build the Arcana system and its documentation page
labels: [wayfinder:task]
status: open
assignee: null
blocked-by: ["03", "07", "08", "10"]
created: 2026-11-11
closed: null
---

## Question

Build Arcana on branch `ds/arcana` to the delivery contract. Inputs: the visual-language spec (`04`), the component inventory (`03`), the code architecture (`07`), and the approved prototype (`08`).

Ship:

- **Tokens** — colour ramps, type scale, spacing, radii, keylines, motion, elevation, all named and consumed by components.
- **The signature motif** — the gradient form as a reusable, constrained surface, plus the seal/keyline/monogram primitives from the archive grammar.
- **The component library** from the inventory, every documented state, keyboard operable, focus visible.
- **The docs page** from the architecture ticket: Overview, Foundations, every component with specimen + state grid + props table + usage notes, and the accessibility note (including the deliberate deviations from the card).
- A branch `README.md` that names the system, its card, the character in a paragraph, and the commands.

Constraints: responsive 360–1440, WCAG 2.2 AA, `prefers-reduced-motion`, no imports from the other branch. No app screens.

**Budget:** one session. Foundations and the shell first, then components in inventory order, then docs polish. If the session ends with components left, stop at a documented boundary and add a follow-up ticket rather than shipping a half-documented component. Record which components are done, which remain, and any spec deviation in the resolution.
