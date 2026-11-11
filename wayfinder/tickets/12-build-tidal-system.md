---
id: "12"
title: Build the Tidal system and its documentation page
labels: [wayfinder:task]
status: closed
assignee: thinker (implementer subagent, phase A)
blocked-by: ["03", "07", "09", "10"]
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Built on `ds/tidal` in two commits: `22f66ab` (shell, foundations, 13 components) and `61042b7` (all 27, overlays, accessibility page). `npm run verify` passes: lint, typecheck, 39 tests, production build.

- **27 components**, five groups, full documentation contract; registry drives the nav; Overview reports 27 from the registry.
- **Signature surfaces:** the 6-stop ground with three blooms, masked seigaiha in the header band and empty states, glass panels for all body content so cream type never sits on periwinkle/cyan, the orb as decoration, Bodoni wordmark.
- **Audit:** axe-core on the built page, all 36 routes at 360/768/1024/1440 — 144 pairs, 0 violations; 0 page-level overflow; 0 console warnings. Independent re-check at 390 (5 routes) and 1440 (3 routes) with the strict WCAG 2.2 tag set — 0 violations, `scrollWidth === innerWidth`.
- **Keyboard:** Dialog trap/Escape/return, DropdownMenu arrows/Home/End/Escape, Tooltip focus + Escape, Tabs arrows, Toast role/status/dismiss, Select native semantics.
- **Known limits:** the native `<select>` popup is platform-owned and documented rather than simulated; axe is not a committed dependency; the docs index link is plain text on the branch.

Consumed by: ["Verify both branches against the quality bar"](13-verify-quality-bar.md) and ["Publish the linktree entries for both systems"](14-publish-linktree.md).
