---
id: "11"
title: Build the Arcana system and its documentation page
labels: [wayfinder:task]
status: closed
assignee: thinker (implementer subagent, phase A)
blocked-by: ["03", "07", "08", "10"]
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Built on `ds/arcana` in three commits: `77ae6a4` (shell, foundations, 13 components), `1301f80` (all 27, overlays, accessibility page), `4215637` (strict-axe fixes). `npm run verify` passes: lint, typecheck, 38 tests, production build.

- **27 components**, five groups, every page with demo, variants, state grid, props table, do/don't, accessibility note. Registry drives nav; no dead routes.
- **Foundations:** Overview, Colour, Type, Space, Shape, Elevation, Motion, Icons; colour values and contrast read live from computed custom properties.
- **Audit:** strict axe tags (`wcag2a/2aa/21a/21aa/22aa`) across 36 routes × 390 and 1440, plus 4 routes × 768 and 1024 — 80 jobs, 0 violations, 0 scroll-width failures. Independently re-checked at 390 on Overview and Avatar after the fix.
- **Visual check:** Edge/CDP captures at 390 and 1440 confirm the archive character, one-column specimens on mobile, no page overflow, one `h1` per route.
- **Deviations:** the header's "Design index" is plain text (the link lives on `main` and cannot resolve from a branch); overlay state grids use inline previews while the real modal/menu is on the live demo; SegmentedControl/Tabs' "pill" variant stays at the 2px control radius because pills are reserved for seals and avatars.

Consumed by: ["Verify both branches against the quality bar"](13-verify-quality-bar.md) and ["Publish the linktree entries for both systems"](14-publish-linktree.md).
