---
id: "04"
title: Decide the Arcana visual language
labels: [wayfinder:grilling]
status: open
assignee: null
blocked-by: ["01"]
created: 2026-11-11
closed: null
---

## Question

Turn Card A from an image into a decided system. Read the research findings from ticket `01` ("Deconstruct the Arcana card's visual references") and `wayfinder/references/cards.md` before the session.

Decide, with the human:

- **Palette.** Cream ground, ink purple, lavender, and the three-stop gradient (amber → magenta → crimson). Build full ramps: surface layers (page / raised / sunken), text (primary / secondary / disabled), border, accent, semantic states (success / warning / danger / info) that still feel archival rather than generic. Give hex and the roles.
- **Type.** Pick one pairing from the research. Define the scale, weights, tracking rules (when letterspacing is mandatory), and the uppercase-label convention.
- **Shape and grid.** Radii (the blob is asymmetric — is the whole system asymmetric?), the 4/8 spacing rhythm, container widths, and the keyline grammar (when a 1px box is the right container).
- **The gradient blob as a motif.** Where it is allowed (system mark, page hero, empty state, selected deck), how it is constrained, and whether it is decoration only or carries meaning. This is the crux: the card is one big gradient gesture, and a system cannot afford that everywhere.
- **Elevation and texture.** Flat print with keylines, or a whisper of paper shadow? No glass, no glow.
- **Motion.** Durations, easing, what moves (stamp, reveal, slide), and the reduced-motion fallback.
- **Iconography and voice.** Icon stroke and corner language; docs copy tone (dry, archival, precise).
- **AA compromises.** Which card colours must shift, and the documented rule.

## Resolution shape

A compact spec in the ticket: token names and values, type table, shape rules, motif rules, motion table, and the list of deliberate deviations from the card. Enough for a prototype ticket to build without guessing.
