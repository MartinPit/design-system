# Tidal card — visual references, rebuilt as a system

Ticket 02 · branch `research/tidal-card` · 2026-11-11 · CSS/SVG only, no React or build.

Card B is a portrait membership token: iridescent indigo→mint ground, full-card seigaiha, black Didone-adjacent wordmark, glass orb. This note turns each into a parameterised recipe and records where the reference cannot be reproduced.

**Bottom line.** Stroke-only seigaiha; linear plus three radial blooms; cream wordmark (black on indigo is 1.07:1); type zoned by luminance; glass as enhancement.

## 1. Seigaiha

### Construction

JAANUS: “arches of concentric circles superimposed … so that only the upper portion of each set of circles is visible”, with “the tiles of every other row straddl[ing] the meeting point of every two tiles below” ([JAANUS](https://www.aisf.or.jp/~jaanus/deta/s/seigaiha.htm)). Japanese Wikipedia calls it semicircles stacked threefold ([青海波](https://ja.wikipedia.org/wiki/%E9%9D%92%E6%B5%B7%E6%B3%A2)).

For fan radius `R`:

- Rings are semicircles of radius `r = i·R/n`, opening upward.
- One ring: `M cx-r,cy A r,r 0 0 1 cx+r,cy`.
- Rows sit `R` apart; alternate rows offset `R`; horizontal period `2R`.
- The lower row's apex touches the cusp between two fans above.

No arc exists below its baseline, so a stroke-only tile needs no fill or occlusion — which is why it can sit over a gradient. Canonical tile `2R × 2R`: one fan at `(R,R)`, two half-fans at `(0,2R)` and `(2R,2R)`.

### Parameterised SVG tile

`R = 100`, four rings, stroke `3.5`, 200×200 tile. Save as `seigaiha.svg` (white strokes, transparent ground). For an inline preview, change `stroke` to `currentColor`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <pattern id="seigaiha" width="200" height="200" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round">
        <!-- row baseline y=100, offset 100 -->
        <path d="M75 100A25 25 0 0 1 125 100"/>
        <path d="M50 100A50 50 0 0 1 150 100"/>
        <path d="M25 100A75 75 0 0 1 175 100"/>
        <path d="M0 100A100 100 0 0 1 200 100"/>
        <!-- row baseline y=200, offset 0: centres x=0 and x=200 -->
        <path d="M-25 200A25 25 0 0 1 25 200"/>
        <path d="M-50 200A50 50 0 0 1 50 200"/>
        <path d="M-75 200A75 75 0 0 1 75 200"/>
        <path d="M-100 200A100 100 0 0 1 100 200"/>
        <path d="M175 200A25 25 0 0 1 225 200"/>
        <path d="M150 200A50 50 0 0 1 250 200"/>
        <path d="M125 200A75 75 0 0 1 275 200"/>
        <path d="M100 200A100 100 0 0 1 300 200"/>
      </g>
    </pattern>
  </defs>
  <rect width="200" height="200" fill="url(#seigaiha)"/>
</svg>
```

| Parameter | Default | Effect |
|---|---|---|
| `R` | 100 | Fan radius; tile width `2R` |
| `n` | 4 | Ring count; radii `R/4 … R` |
| `stroke-width` | 3.5 | ≈1px at a 3.5rem tile |
| row pitch `p` | `R` | `p < R` = denser, arcs cross; `p > R` = gaps |
| row offset | `R` | Half-fan stagger; cusp lands on the apex below |

The classic stagger is 50% of the fan width; vertical interleave is `1 − p/R`, zero at the classic pitch. For `p ≠ R`, use a `2R × 2p` tile and draw the two-row group at `y−2p`, `y`, `y+2p`; at `p = R` two rows suffice. Rendered at 2×2 and at 3.5rem scale in headless Chromium: seams continuous.

### Production layer, fade and rem sizing

Use the tile as an alpha mask over a tinted layer, not an element background: the tile stays square, `background-color` does the tinting, and the fade is a second cheap mask.

```css
.tidal-pattern-fade {          /* optional full-bleed fade */
  position: absolute; inset: 0; pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, #000 0 46%, transparent 78%);
          mask-image: linear-gradient(180deg, #000 0 46%, transparent 78%);
}
.tidal-pattern {
  position: absolute; inset: 0; pointer-events: none;
  background-color: rgb(255 255 255 / .16);   /* line opacity lives here */
  -webkit-mask: url("/patterns/seigaiha.svg") 0 0 / var(--pattern-size, 3.5rem) var(--pattern-size, 3.5rem) repeat;
          mask: url("/patterns/seigaiha.svg") 0 0 / var(--pattern-size, 3.5rem) var(--pattern-size, 3.5rem) repeat;
}
.tidal-card { --pattern-size: 3.5rem; }        /* 56px tile, R = 28px */
@media (max-width: 420px) { .tidal-card { --pattern-size: 3rem; } }
@media (min-width: 900px)  { .tidal-card { --pattern-size: 4.5rem; } }
```

At 3.5rem the stroke is `3.5/200 × 56 ≈ 0.98px`; at 3rem, 0.84px. Do not go below 3rem at this stroke, or raise it to 4. Unprefixed `mask` needs Chrome 120 / Safari 15.4; the `-webkit-` line covers older Safari ([BCD](https://github.com/mdn/browser-compat-data/blob/main/css/properties/mask-image.json)). Keep it `aria-hidden` and `pointer-events: none`.

### Keeping it out of text contrast

A 20% white line lifts the ground under a glyph to `#6555a5` on violet and `#413c5c` on indigo:

| Line (white 20%) over | Cream on the line | Ink on the line |
|---|---|---|
| indigo `#120B33` | 9.28:1 | fails |
| violet `#3E2A8F` | **5.54:1** | fails |
| periwinkle `#7A87DE` | fails | 8.02:1 |
| cyan `#5BCFE4` | fails | 12.42:1 |

So **≤20% where cream text overlaps; ≤30% only where ink text overlaps.** At 30% over violet, cream falls to 4.18:1. If the pattern must be stronger, fade it out behind the type block. Avoid `mix-blend-mode`: it creates stacking contexts and makes the effective colour unmeasurable.

### Credit line

> Seigaiha (青海波), the Japanese “blue ocean wave” motif: concentric semicircles in staggered rows, used in China to map the sea and in Japan from the Heian court; the name is tied to the *gagaku* dance whose costumes bore it, with a competing etymology from Edo lacquerer Seikai Kanshichi. Construction after [JAANUS](https://www.aisf.or.jp/~jaanus/deta/s/seigaiha.htm) and [File:Seigaiha.svg](https://commons.wikimedia.org/wiki/File:Seigaiha.svg) (public domain).

## 2. The iridescent ground

One six-stop `linear-gradient` at 32° (indigo lower-left → mint upper-right) plus three radial blooms: mint/cyan top-right, periwinkle upper-middle, and an **abyss bloom at lower-left that doubles as the text zone**. Four images, one background layer, no extra DOM, no blend modes, no backdrop sampling.

```css
.tidal-ground {
  background-color: #120B33;                 /* flat fallback / forced colours */
  background-image:
    radial-gradient(90% 72% at 86% 4%,  rgb(169 240 216 / .95) 0%, rgb(169 240 216 / .55) 22%, transparent 58%),
    radial-gradient(62% 54% at 72% 27%, rgb(122 135 222 / .50) 0%, transparent 70%),
    radial-gradient(86% 76% at 8% 102%, #0A0722 0%, rgb(10 7 34 / .78) 40%, transparent 72%),
    linear-gradient(32deg,
      #0A0722 0%, #120B33 16%, #3E2A8F 46%,
      #7A87DE 64%, #5BCFE4 82%, #A9F0D8 100%);
}
```

First image on top; the opaque linear stays last. The abyss bloom solves black-on-indigo: type sits in a dark corner, not a panel.

| Technique | Cost | Support | Verdict |
|---|---|---|---|
| One 6-stop `linear-gradient` | 1 image, 1 paint | universal | Base; cheapest |
| + 2–3 radial blooms | 3–4 images, 1 layer | universal | **Recommended**; mesh-like |
| `conic-gradient` sheen | 1 more image | Chrome 69 / FF 83 / Safari 12.1 | Stable; seam risk, low value |
| “Mesh” with 5+ radials | 5+ images | universal | Same cost class; use 3 |
| `backdrop-filter` on the ground | samples backdrop each frame | Baseline 2024 | Never for the ground |
| Animated `background-position` | repaints a full-size layer | universal | Avoid; transform a pseudo instead |

There is no widely supported native mesh primitive; stacked radials are the portable approximation ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient)). Gradient support is universal ([BCD](https://github.com/mdn/browser-compat-data/blob/main/css/types/gradient.json)).

### A 4.5:1 text zone inside the light

Contrast belongs to the **effective background**, not the token; test the least-contrasting area of a gradient ([1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).

- **Zone it.** Cream on abyss/indigo/violet is 9.73–17.63:1; ink on periwinkle/cyan/mint is 6.08–15.47:1. Keep the wordmark and metadata in the abyss bloom. Free, and it preserves the iridescence.
- **If type must cross the middle**, use a local scrim: `rgb(10 7 34 / .55)` over the worst-case periwinkle gives `#414380`, where cream is **8.04:1**; 35% gives 5.45:1. Do not rely on `text-shadow`: a wide halo counts as background, and a blurred glow has no measurable edge ([1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).
- **Do not use black on the lower-left.** It is 1.07:1 on indigo, 1.85:1 on violet. The reference is internally inconsistent with AA: “black wordmark” and “deep indigo at lower left” cannot both hold.

## 3. Type

The image is not in the repo, so the face cannot be identified from pixels. The attributes — high contrast, hairline serifs, Didone-adjacent, large — point to the Bodoni/Didot family. The closest open-licensed match is **Bodoni Moda**: a true Didone with `opsz` 6–96 and `wght` 400–900 ([Fontsource](https://api.fontsource.org/v1/fonts/bodoni-moda)). If the original is a commercial Didot or Bodoni, it cannot ship; specify the open substitute and treat “Bard” as a wordmark drawn in it.

All three pairings below are **OFL-1.1** (Fontsource wrappers are MIT; the font files are OFL). Packages verified at 5.3.x on 2026-11-11.

| # | Display | Text | Numeric / label |
|---|---|---|---|
| 1 | **Bodoni Moda**<br>`@fontsource-variable/bodoni-moda` | **Source Serif 4**<br>`@fontsource-variable/source-serif-4` | **IBM Plex Mono**<br>`@fontsource/ibm-plex-mono` |
| 2 | **Playfair Display**<br>`@fontsource-variable/playfair-display` | **Newsreader**<br>`@fontsource-variable/newsreader` | **JetBrains Mono**<br>`@fontsource-variable/jetbrains-mono` |
| 3 | **DM Serif Display**<br>`@fontsource/dm-serif-display` | **Figtree**<br>`@fontsource-variable/figtree` | **Space Mono**<br>`@fontsource/space-mono` |

`@fontsource-variable/dm-serif-display` does **not** exist; Space Mono has 400/700 only. Axes/weights: Bodoni Moda 6–96 `opsz`, 400–900; Source Serif 4 8–60 `opsz`, 200–900; Newsreader 200–800; JetBrains Mono 100–800.

```css
@import "@fontsource-variable/bodoni-moda/standard.css"; /* opsz + wght */
@import "@fontsource-variable/source-serif-4/standard.css";
@import "@fontsource/ibm-plex-mono/400.css";
@import "@fontsource/ibm-plex-mono/500.css";

.tidal-wordmark {
  font-family: "Bodoni Moda Variable", "Bodoni Moda", Didot, "Times New Roman", serif;
  font-variation-settings: "opsz" 72, "wght" 560;
  font-size: clamp(2.5rem, 9vw, 4rem);
  line-height: .9;
  letter-spacing: -.02em;
}
.tidal-meta {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: .6875rem;              /* 11px */
  letter-spacing: .18em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
}
```

The variable family name ends in “Variable” ([CSS](https://cdn.jsdelivr.net/npm/@fontsource-variable/bodoni-moda@5.3.0/index.css)). For a no-build page, link the same CSS from jsDelivr. Bodoni's hairlines vanish below ~24px; keep it display-only.

## 4. Glass

A bubble: milky tint, specular, inner glow, inset shadow; blur is optional.

```css
.tidal-orb {
  position: relative; border-radius: 50%;
  background:
    radial-gradient(circle at 32% 24%, rgb(255 255 255 / .72) 0 6%, rgb(255 255 255 / .18) 16%, transparent 34%),
    radial-gradient(circle at 68% 76%, rgb(169 240 216 / .35), transparent 58%),
    linear-gradient(155deg, rgb(255 255 255 / .16), rgb(255 255 255 / .03) 48%, rgb(10 7 30 / .28));
  border: 1px solid rgb(255 255 255 / .5);
  box-shadow:
    inset 0 1px 1px rgb(255 255 255 / .75),
    inset 0 -14px 26px rgb(10 7 30 / .38),
    0 16px 36px rgb(5 4 14 / .42);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
          backdrop-filter: blur(14px) saturate(140%);
}
```

Without blur, a translucent orb shows sharp detail through itself and stops reading as glass. Use an opaque tint that keeps the light direction:

```css
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .tidal-orb {
    background:
      radial-gradient(circle at 32% 24%, rgb(255 255 255 / .55), transparent 36%),
      linear-gradient(155deg, #8E9BE8, #5A4AB0 52%, #241A5E);
    border-color: rgb(255 255 255 / .45);
  }
}
```

Two traps. `backdrop-filter` samples only up to the nearest **backdrop root**: an ancestor with `opacity < 1`, `filter`, `mask`, or `clip-path` limits or kills the blur ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)). The pattern layer uses masks, so keep it a sibling. And white frost **reduces** contrast for cream text: on violet, cream falls from 9.73:1 to 6.98:1 at 12% white and **4.42:1** at 28%. Keep glass ≤12% white for cream text, or shade it dark; ink text gains as the glass whitens (4.08:1 at 28%).

## 5. Accessibility

- **Text:** 4.5:1 normal; 3:1 large (≥24px, or ≥18.66px bold) ([1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)). Test the least-contrasting pixel under the glyphs. The pattern line is background: at 20% white, cream on the violet line is 5.54:1, the ceiling behind light text. `2026.11` at 11px is normal text.
- **Focus:** a two-colour ring is robust: cream and ink are 18:1 apart, so one band clears 3:1 against any solid local background ([C40](https://www.w3.org/WAI/WCAG22/Techniques/css/C40)). It must not be clipped or covered ([2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)); with `overflow: hidden`, use an inner wrapper or a negative offset.
- **Borders:** one alpha cannot do both ends. Cream 55% over violet is 4.05:1 but 1.92:1 over periwinkle and 1.14:1 over mint; ink 65% over periwinkle is 3.65:1 but invisible on indigo. Use `--edge-on-dark: rgb(247 242 230 / .55)` and `--edge-on-light: rgb(8 6 15 / .65)`. A card edge is decorative when content identifies it; a glass **button** is not, so give it a dual edge or place it on the dark side.

```css
:where(a, button, [tabindex]):focus-visible {
  outline: 2px solid #F7F2E6;
  outline-offset: 3px;
  box-shadow: 0 0 0 5px #08060F;   /* outer ink band */
}
@media (forced-colors: active) {
  :where(a, button, [tabindex]):focus-visible {
    outline: 3px solid Highlight;
    box-shadow: none;              /* box-shadow is forced to none */
  }
}
```

2.4.13 (AAA) asks for a 2px perimeter and a 3:1 change in the focused pixels; the dual band meets both at the gradient's extremes ([2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)).

```css
@media (prefers-reduced-transparency: reduce) {
  .tidal-orb { -webkit-backdrop-filter: none; backdrop-filter: none;
               background: linear-gradient(155deg, #8E9BE8, #5A4AB0 52%, #241A5E); }
}
@media (prefers-contrast: more) {
  .tidal-pattern { background-color: rgb(255 255 255 / .06); }
  .tidal-orb { -webkit-backdrop-filter: none; backdrop-filter: none;
               background: #2A2370; border: 2px solid #F7F2E6; }
}
@media (forced-colors: active) {
  .tidal-pattern { display: none; }
  .tidal-orb { border: 2px solid CanvasText; }
}
```

- **Reduced transparency:** drop blur, translucent fills, stacked `opacity`; keep painted gradients. Chrome 118+ only, Firefox behind a flag, Safari unsupported — it cannot be the only reason the design passes ([BCD](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/media.json)).
- **`prefers-contrast: more`:** text ≥7:1, 2px opaque borders, no pattern behind type, opaque glass. Chrome 96+, Firefox 101+, Safari 14.1+.
- **`forced-colors`:** gradients (non-url `background-image`), `box-shadow`, and `text-shadow` are forced away; hide decorative pattern/glow and keep a system-colour boundary ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)). Never rely on `box-shadow` alone for focus.

## Palette

Ratios use WCAG relative luminance; they are approximate on a gradient. Do not round up at a threshold.

| Token | Hex | Role | Ink `#08060F` | Cream `#F7F2E6` |
|---|---|---|---|---|
| `--tidal-abyss` | `#0A0722` | Lower-left text zone | 1.02:1 | **17.63:1** |
| `--tidal-indigo` | `#120B33` | Base / dark ground | 1.07:1 | **16.76:1** |
| `--tidal-violet` | `#3E2A8F` | Mid-dark | 1.85:1 | **9.73:1** |
| `--tidal-periwinkle` | `#7A87DE` | Mid-light | **6.08:1** | 2.96:1 |
| `--tidal-cyan` | `#5BCFE4` | Light | **11.01:1** | 1.64:1 |
| `--tidal-mint` | `#A9F0D8` | Lightest / top-right | **15.47:1** | 1.16:1 |
| `--tidal-ink` | `#08060F` | Text on light | — | 18.02:1 |
| `--tidal-cream` | `#F7F2E6` | Text on dark | 18.02:1 | — |
| `--tidal-line` | white 20% | Seigaiha line | — | 5.54:1 on violet |
| `--tidal-scrim` | indigo 55% over periwinkle → `#414380` | Type crossing the middle | 2.24:1 | **8.04:1** |
| `--tidal-glass` | white 12% over violet → `#55449c` | Glass, light text | 2.58:1 | **6.98:1** |

## Sources

- [JAANUS, *seigaiha*](https://www.aisf.or.jp/~jaanus/deta/s/seigaiha.htm) · [青海波, Japanese Wikipedia](https://ja.wikipedia.org/wiki/%E9%9D%92%E6%B5%B7%E6%B3%A2) · [File:Seigaiha.svg](https://commons.wikimedia.org/wiki/File:Seigaiha.svg)
- [MDN `backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) · [`radial-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient) · [`mask-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image) · [`prefers-reduced-transparency`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) · [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) · [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) · [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) · [C40](https://www.w3.org/WAI/WCAG22/Techniques/css/C40) · [Fontsource API](https://api.fontsource.org/) · [OFL 1.1](https://openfontlicense.org/)

Browser support comes from MDN's [browser-compat-data](https://github.com/mdn/browser-compat-data); packages were checked on npm and Fontsource at 5.3.x.

## Could not verify

- The exact display face: image unavailable; identification is attribute-based.
- Seigaiha's symbolic reading (calm sea, peace) is widely repeated but not in the sources above; the credit line avoids asserting it.
- “Cheapest” is a paint-cost argument, not a measured benchmark.
