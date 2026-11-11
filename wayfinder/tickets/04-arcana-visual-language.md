---
id: "04"
title: Decide the Arcana visual language
labels: [wayfinder:grilling]
status: closed
assignee: thinker (implementation session)
blocked-by: ["01"]
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Decided by the implementer from the research in ticket `01`; the human may overturn any line before accepting the build. Free rein per system stands.

### Palette

| Token | Hex | Role | On `--paper-1` |
|---|---|---|---|
| `--paper-0` | `#FCF8EC` | raised surface | 1.05 |
| `--paper-1` | `#F8F3E3` | page | — |
| `--paper-2` | `#EFE7D2` | sunken / stripe | 1.11 |
| `--paper-3` | `#E2D7BE` | well / disabled fill | 1.29 |
| `--rule-ornament` | `#C9B9A2` | decorative keyline | 1.73 |
| `--rule-interactive` | `#94846A` | control boundary | 3.28 |
| `--lavender-200` | `#D8C9EA` | redaction squares | 1.41 |
| `--lavender-400` | `#B49BD3` | hover / selection tint | 2.21 |
| `--ink-900` | `#3A0A4E` | heavy display | 14.19 |
| `--ink-700` | `#4A0D63` | primary text, keylines | 12.38 |
| `--ink-500` | `#6B4A78` | secondary text | 6.58 |
| `--ink-300` | `#7A5A86` | muted body | 5.21 |
| `--ink-200` | `#9A86A2` | disabled (exempt) | 3.00 |
| `--success` | `#2E6B4F` | success text/icon | 5.4 |
| `--warning` | `#9C5600` | warning text/icon | 5.05 |
| `--danger` | `#A81440` | danger text/icon | 6.66 |
| `--info` | `#3B5191` | info text/icon | 6.4 |

Gradient stops are **fills only**: `--grad-amber #F2A23C`, `--grad-orange #EA6A2F`, `--grad-magenta #D42A7C`, `--grad-crimson #A81440`, bloom `--grad-violet #7C2FA8`.
Text-safe accent variants: `--accent-amber #9C5600`, `--accent-orange #B04A13`, `--accent-magenta #C41F70`.

### Type

- Display `--font-display: "Schibsted Grotesk Variable"` (700/800), tracking `-0.02em`.
- Text `--font-text: "Instrument Sans Variable"` (400/500/600).
- Label `--font-label: "Fragment Mono"` (400/500), uppercase, `0.09em`, tabular numerals.
- Scale (rem): `.6875, .75, .875, 1, 1.125, 1.25, 1.5, 1.875, 2.5, 3.25`, hero `clamp(2.5rem, 6vw, 4.5rem)`.
- Letterspace uppercase only. Negative tracking only above 24px. No faux-rounded glyphs.

### Shape, space, elevation

- Radii: `0` for every structural container, `2px` for controls, `999px` for seals and avatars. The blob is the only organic shape.
- Space: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Layout: page max `1200px`, docs sidebar `260px`, measure `64ch`.
- Elevation is print, not light: `--shadow-1: 4px 4px 0 rgb(74 13 99 / .10)`, `--shadow-2: 8px 8px 0 rgb(74 13 99 / .14)`. No blur shadows.

### Motion

`120ms` control feedback, `180ms` disclosure, `240ms` page/stamp. Easing `cubic-bezier(.2,.8,.2,1)`. Reveal = opacity + `translateY(6px)`. Reduced motion: opacity only, no movement, no shimmer.

### The gradient form

Master is inline SVG, `viewBox="0 0 100 80"`, path
`M0 0H30C56 0 84 8 96 30C100 47 90 61 72 68C51 76 30 79 16 74C8 71 3 67 0 61Z`
filled with a `114deg` linear (`#F2A23C 0%, #EA6A2F 28%, #D42A7C 55%, #A81440 100%`) plus a radial bloom at `(14%, 86%)`, `#7C2FA8 .92 → #D42A7C .55 → transparent`.
Allowed: system mark, overview hero, one empty state, one selected/decorative card accent. **One per viewport.** Never behind text; text over it sits on a cream plate clipped to the same path. Never a button fill. CSS `border-radius` approximation is ornament-only and must not carry content.

### Archive primitives (required)

Keyline box (1px `--ink-700`, radius 0), seal (44–72px, two rings, numeral + micro caps, monochrome, not a button), label strip (`ARC | date`, split by border-left), monogram tile (1:1, 800 letter, no gradient), redaction squares (`.62em`, `aria-hidden`, decorative only), stacked wordmark (two uppercase lines, left-aligned).

### Iconography and voice

1.5px stroke, square caps/joins, 24px grid, inline SVG. Copy is dry, archival, precise: sentence-case body, uppercase labels, `DD MMM YYYY` dates. No exclamation marks, no emoji.

### Deliberate deviations from the card

Lavender stays decorative; amber/orange/magenta text uses the safe variants; seals and redaction bars are `aria-hidden` unless they encode real state; the blob never carries type; pure black is never used on the gradient.
