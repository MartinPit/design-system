---
id: "05"
title: Decide the Tidal visual language
labels: [wayfinder:grilling]
status: open
assignee: null
blocked-by: ["02"]
created: 2026-11-11
closed: null
---

## Question

Turn Card B from an image into a decided system. Read the research findings from ticket `02` ("Deconstruct the Tidal card's visual references") and `wayfinder/references/cards.md` before the session.

Decide, with the human:

- **Palette.** The indigo→cyan→mint ground, and the solid colours a UI actually needs: page, raised surface, sunken, text, border, accent, and semantic states. How much iridescence is allowed on a surface, given text must stay AA.
- **Type.** Pick the display serif and text pairing from the research. Define the scale, the small-caps metadata convention (`Member Since` / `2026.11`), and the numeric style.
- **The seigaiha surface.** Scale, stroke weight, opacity, and where it may appear (page background, card surface, section divider, empty state). Whether it animates. How it behaves behind text.
- **Glass and depth.** How many elevation levels, what each one blurs/tints, and the non-`backdrop-filter` fallback. The orb from the card: component, decoration, or both.
- **Shape.** The superellipse corner language, radii scale, and whether containers are uniformly rounded or vary by level.
- **Motion.** Durations, easing, the shimmer rule, and the reduced-motion / reduced-transparency fallbacks.
- **Iconography and voice.** Icon language (line weight, glow or no glow); docs copy tone (precise, slightly literary).
- **AA compromises.** Rules for text, focus rings, and borders over luminous surfaces.

## Resolution shape

A compact spec in the ticket: token names and values, type table, surface rules, glass levels, motion table, and deliberate deviations from the card. Enough for a prototype ticket to build without guessing.
