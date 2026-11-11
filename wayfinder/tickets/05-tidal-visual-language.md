---
id: "05"
title: Decide the Tidal visual language
labels: [wayfinder:grilling]
status: closed
assignee: thinker (implementation session)
blocked-by: ["02"]
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Decided by the implementer from the research in ticket `02`; the human may overturn any line before accepting the build.

### Palette

| Token | Hex | Role | Cream `#F7F2E6` on it | Ink `#08060F` on it |
|---|---|---|---|---|
| `--abyss` | `#0A0722` | page base, lower-left text zone | 17.63 | 1.02 |
| `--indigo` | `#120B33` | dark ground / panel | 16.76 | 1.07 |
| `--violet` | `#3E2A8F` | mid-dark / raised | 9.73 | 1.85 |
| `--periwinkle` | `#7A87DE` | mid-light | 2.96 | 6.08 |
| `--cyan` | `#5BCFE4` | light | 1.64 | 11.01 |
| `--mint` | `#A9F0D8` | lightest / top-right | 1.16 | 15.47 |
| `--ink` | `#08060F` | text on light | 18.02 | — |
| `--cream` | `#F7F2E6` | text on dark | — | 18.02 |
| `--line` | `rgb(255 255 255 / .16)` | seigaiha stroke tint | 5.54 on violet | — |
| `--scrim` | `rgb(10 7 34 / .55)` | type crossing the middle | 8.04 | 2.24 |
| `--success` | `#7CE0B4` | success | 11.0 | — |
| `--warning` | `#F5C97A` | warning | 10.4 | — |
| `--danger` | `#FF9AA8` | danger | 7.6 | — |
| `--info` | `#9BB8FF` | info | 8.7 | — |

The ground is one 6-stop `32deg` linear (`#0A0722 0%, #120B33 16%, #3E2A8F 46%, #7A87DE 64%, #5BCFE4 82%, #A9F0D8 100%`) plus three radial blooms: mint at `86% 4%`, periwinkle at `72% 27%`, and an abyss bloom at `8% 102%` that doubles as the text zone. Flat fallback `#120B33`.

### Type

- Display `--font-display: "Bodoni Moda Variable"`, `opsz 72`, `wght 560`, `line-height .9`, tracking `-0.02em`; display only, never below 24px.
- Text `--font-text: "Source Serif 4 Variable"` (300/400/600), measure `62ch`.
- Label/numeric `--font-label: "IBM Plex Mono"` (400/500), uppercase `0.18em`, tabular numerals.
- Scale (rem): `.6875, .75, .875, 1, 1.125, 1.25, 1.5, 1.875, 2.5`, wordmark `clamp(2.5rem, 9vw, 4rem)`.

### Seigaiha

Stroke-only tile, `R=100`, four rings, `stroke-width 3.5`, 200×200, applied as an alpha mask over a tinted layer: `--pattern-size` `3.5rem` (3rem ≤420px, 4.5rem ≥900px), tint `rgb(255 255 255 / .16)`. Pattern is `aria-hidden`, `pointer-events: none`, never behind body text; ≤20% where cream text overlaps, fade it out behind dense type. Hidden under `prefers-contrast: more` and `forced-colors`. Credit line required on the Accessibility page.

### Depth and glass

- L0 flat indigo; L1 `rgb(255 255 255 / .06)` + `blur(12px)` + 1px edge; L2 `rgb(255 255 255 / .12)` + `blur(18px)` + inset highlight. Cream text only strikes 4.5:1 on glass over violet or darker.
- Orb: layered radials + inset shadow + optional blur; decorative only (`aria-hidden`), never the sole boundary of a control.
- Fallback when `backdrop-filter` is unsupported or transparency is reduced: opaque `linear-gradient(155deg, #8E9BE8, #5A4AB0 52%, #241A5E)`.

### Shape, space, layout

Radii `8 / 14 / 20 / 28 / 999px`; raised panels use `28px`, controls `14px`, pills `999px`. Space 4, 8, 12, 16, 24, 32, 48, 64, 96. Page max `1200px`, docs sidebar `260px`, measure `62ch`.

### Motion

`160ms` controls, `240ms` disclosure, `320ms` page. Easing `cubic-bezier(.16,.84,.28,1)`. Hover lift `translateY(-1px)`. One 6s shimmer on the orb only. Reduced motion: no shimmer, no lift, opacity only.

### Iconography and voice

1.5px stroke, round caps/joins, 24px grid, inline SVG. Copy is precise and slightly literary: sentence-case body, small-caps metadata, `YYYY.MM` dates.

### Deliberate deviations from the card

The black wordmark becomes cream on the abyss zone; type never crosses periwinkle/cyan without a scrim; the glass stays at ≤12% white where cream text sits; the pattern is decorative and hidden from assistive tech; the orb is ornament, not a control.

### Accessibility rules (binding)

Cream `#F7F2E6` on abyss/indigo/violet, ink on periwinkle/cyan/mint. Dual-band focus: `outline: 2px solid #F7F2E6; outline-offset: 3px; box-shadow: 0 0 0 5px #08060F`. Borders use `--edge-on-dark: rgb(247 242 230 / .55)` or `--edge-on-light: rgb(8 6 15 / .65)` depending on the local ground. Honour `prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency`, `forced-colors`.
