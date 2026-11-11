---
id: "12"
title: Build the Tidal system and its documentation page
labels: [wayfinder:task]
status: open
assignee: null
blocked-by: ["03", "07", "09", "10"]
created: 2026-11-11
closed: null
---

## Question

Build Tidal on branch `ds/tidal` to the delivery contract. Inputs: the visual-language spec (`05`), the component inventory (`03`), the code architecture (`07`), and the approved prototype (`09`).

Ship:

- **Tokens** — iridescent ground stops, surface layers, glass levels, type scale, radii, spacing, motion, all named and consumed.
- **The signature surfaces** — the seigaiha field at documentation scale, the glass elevation system, and the orb, each with a non-`backdrop-filter` fallback.
- **The component library** from the inventory, every documented state, keyboard operable, focus visible over luminous surfaces.
- **The docs page** from the architecture ticket: Overview, Foundations, every component with specimen + state grid + props table + usage notes, and the accessibility note (contrast rules over iridescence, deliberate deviations from the card).
- A branch `README.md` that names the system, its card, the character in a paragraph, and the commands.

Constraints: responsive 360–1440, WCAG 2.2 AA, `prefers-reduced-motion`, `prefers-reduced-transparency`, no imports from the other branch. No app screens.

**Budget:** one session. Foundations and the shell first, then components in inventory order, then docs polish. Stop at a clean boundary and add a follow-up ticket rather than shipping a half-documented component. Record done/remaining and any spec deviation in the resolution.
