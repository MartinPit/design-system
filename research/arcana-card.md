# Arcana card — visual references and a rebuild spec

Ticket: [01-arcana-card-references](../wayfinder/tickets/01-arcana-card-references.md) · Branch: `research/arcana-card` · 2026-11-11

Card A is a provenance record, not a retro poster. Its bottom half records who owns it (monogram), what is withheld (redaction strip), who authorises it (seals), and when (date strip). Cream and keylines are the substrate; the gradient is the single colour event. Rebuild that record grammar.

## 1. Type

### Identification

The card's sans is **Marlin Soft SQ** — The Browser Company's Arc identity. Arc's stylesheet still names it (`--fonts-sans: Marlin`, `--fonts-softSans: Marlin Soft SQ`, `--fonts-boostsSoft: Marlin Soft Basic`) and preloads `/fonts/MarlinSoftBasic-Regular.otf` ([arc.net](https://arc.net/)). The family is sold commercially by **FontMesa** (Michael Hagemann) as *Marlin Soft* / *Marlin Soft SQ*, a rounded-corner version of *Marlin Geo*, with a free three-cut *Marlin Soft Basic* sample ([MyFonts](https://www.myfonts.com/collections/marlin-soft-font-fontmesallc/), [FontPath](https://www.fontpath.com/font/T11150/marlin-soft)). The file name matches FontMesa's Basic cut, but Arc's licence is not public. **Do not bundle Marlin; the free cuts are samples, not a project licence.**

The genre is a **soft-square grotesque**: square skeletons, rounded interior corners, geometric terminals, high x-height, tight display tracking. Secondary write-ups disagree on the foundry ([enrichr](https://enrichr.dev/fonts/what-font-does-arc-net-use.html) says "not verified as obtainable"; some call it custom). Treat "Marlin Soft SQ, FontMesa — commercial, unavailable" as the working fact.

Rules from the card: monogram 800 at ≥32px with `-0.02em` to `-0.04em`; headings 700 at `-0.02em`; body 400–500 at `0`; uppercase labels 500–700 at 11–12px with `0.08em`–`0.12em`; dates in tabular mono. Letterspace uppercase only; negative tracking only above 24px; never fake Marlin's rounded corners with CSS on glyphs.

### Three open-licensed pairings

Packages checked against the npm registry and Fontsource API; all **OFL-1.1**. Axes checked against [Google Fonts metadata](https://fonts.google.com/metadata/fonts). Variable families expose a `... Variable` name, e.g. `"Figtree Variable"`.

| # | Display / heading | Text | Label / mono | Packages |
|---|---|---|---|---|
| **A — Soft Square** | **Archivo** (100–900, wdth 62–125): heavy square monogram at 800/wdth 112 | **Figtree** (300–900): closest free warmth to Marlin | **Martian Mono** (100–800, wdth 75–112.5): wide, squared labels | `@fontsource-variable/archivo`, `@fontsource-variable/figtree`, `@fontsource-variable/martian-mono` |
| **B — Swiss Archive** *(recommended)* | **Schibsted Grotesk** (400–900): tight neo-grotesque, high x-height | **Instrument Sans** (400–700, wdth 75–100): workhorse text | **Fragment Mono** (400 + italic): Helvetica-adjacent dates/codes | `@fontsource-variable/schibsted-grotesk`, `@fontsource-variable/instrument-sans`, `@fontsource/fragment-mono` |
| **C — Editorial Grotesque** | **Bricolage Grotesque** (200–800, wdth 75–100, opsz 12–96): real display cut | **Hanken Grotesk** (100–900): warm long-form | **DM Mono** (300/400/500 + italic): typewriter metadata | `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/hanken-grotesk`, `@fontsource/dm-mono` |

Recommendation: **B** — closest to the card's genre and gives the mono a documentary job. Choose **A** only if soft-square warmth is non-negotiable; **C** if long prose matters more than archive discipline. Width-axis families ship separate `wdth.css`/`wght.css` entries; import the one you use.

```css
@import "@fontsource-variable/schibsted-grotesk";
@import "@fontsource-variable/instrument-sans";
@import "@fontsource/fragment-mono/400.css";

:root {
  --font-display: "Schibsted Grotesk Variable", system-ui, sans-serif;
  --font-text: "Instrument Sans Variable", system-ui, sans-serif;
  --font-label: "Fragment Mono", ui-monospace, monospace;
}
.label {
  font: 500 0.6875rem/1.3 var(--font-label);
  letter-spacing: 0.09em; text-transform: uppercase;
  font-variant-numeric: tabular-nums;
}
```

No build: link `https://cdn.jsdelivr.net/npm/@fontsource-variable/schibsted-grotesk@5/index.css`. Keep Marlin only in reference screenshots.

## 2. Gradient form geometry

### Silhouette

Coordinates are normalised to a **100 × 80** box (width × height), placed in the upper ~60% of a 3:4 card with a 9% margin. `y` grows downward.

| Feature | Coordinates | Notes |
|---|---|---|
| Left edge | `x=0`, `y=0 → 61` | Vertical, flush with the text margin |
| Top edge | `y=0`, `x=0 → 30` | Flat for ~30%, then breaks |
| Top arc | `(30,0) → (96,30)`, controls `(56,0)`, `(84,8)` | Wide convex sweep down-right |
| Right lobe | `(96,30) → (72,68)`, controls `(100,47)`, `(90,61)` | Widest `x≈99` at `y≈40` |
| Bottom bow | `(72,68) → (16,74)`, controls `(52,76)`, `(30,79)` | Lowest `y≈78` near `x=30` |
| Tip / cusp | `(16,74) → (0,61)`, controls `(8,71)`, `(3,67)` | Tangent ~27° off vertical: tapered point |

A leaf on its side: long vertical left edge, flat shoulder, one big arc right, deep underside, point at lower left. Bounding box ≈ 100 × 79.

### Colour field — two gradients, not one

A single linear gradient cannot put amber upper-left, magenta/violet lower-left **and** crimson right; hue travels two ways. Use a **base linear at 114°** — `#F2A23C` 0% → `#EA6A2F` 28% → `#D42A7C` 55% → `#A81440` 100% — plus a **radial bloom** at `(14%, 86%)`, radius ~62%: `#7C2FA8` 0% (.92) → `#D42A7C` 42% (.55) → transparent. No grain, highlight or inner shadow; the card is flat print.

```html
<svg viewBox="0 0 100 80" role="img" aria-labelledby="blob">
  <title id="blob">Arcana gradient form</title>
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="0.55">
      <stop offset="0" stop-color="#F2A23C"/><stop offset=".28" stop-color="#EA6A2F"/>
      <stop offset=".55" stop-color="#D42A7C"/><stop offset="1" stop-color="#A81440"/>
    </linearGradient>
    <radialGradient id="cool" cx=".14" cy=".86" r=".62">
      <stop offset="0" stop-color="#7C2FA8" stop-opacity=".92"/>
      <stop offset=".42" stop-color="#D42A7C" stop-opacity=".55"/>
      <stop offset="1" stop-color="#D42A7C" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <path d="M0 0H30C56 0 84 8 96 30C100 47 90 61 72 68C51 76 30 79 16 74C8 71 3 67 0 61Z" fill="url(#base)"/>
  <path d="M0 0H30C56 0 84 8 96 30C100 47 90 61 72 68C51 76 30 79 16 74C8 71 3 67 0 61Z" fill="url(#cool)"/>
</svg>
```

Default `objectBoundingBox` units keep the colour registered to the shape, not the viewport.

### CSS-only approximation

```css
.arcana-form {
  aspect-ratio: 5 / 4;
  border-radius: 0 100% 78% 0 / 0 62% 82% 0;
  background:
    radial-gradient(70% 62% at 14% 86%, #7C2FA8 0%,
      color-mix(in srgb, #D42A7C 65%, transparent) 38%, transparent 72%),
    linear-gradient(114deg, #F2A23C 0%, #EA6A2F 28%, #D42A7C 55%, #A81440 100%);
}
```

`border-radius` longhands give the four corners but **cannot make the lower-left cusp** — at best a square/round corner. Percentages resolve per axis, so the silhouette changes character with aspect ratio and the radial stops drift. Use it only for a small decorative bloom; add `clip-path: path("...")` if the tip matters, at which point SVG is simpler.

### Which survives

| Test | SVG path | CSS border-radius |
|---|---|---|
| Fidelity (cusp, flat top, right lobe) | Exact | Tip becomes a corner; curve varies with aspect |
| Resizing | `viewBox` + `meet`; colour stays registered | Percentages re-map per axis; distorts off 5:4 |
| Dark ink overlaid | Cream plate path stays registered | Plate inherits wrong silhouette |
| Cost | One inline SVG | Cheapest; ornament only |

**Verdict:** SVG is the master. CSS is a fixed-aspect fallback.

Dark-ink rule: `#4A0D63` on the gradient passes only on **amber** (6.55); orange 4.32 (large only), magenta 2.89, violet 1.85, crimson 1.86 fail. Cream on magenta is 4.28 (fails) while pure white is 4.75 (passes). **Keep type off the form**, or set it on a cream-filled copy of the path. On the crimson/violet third, white is the only safe ink.

## 3. Archive grammar

The bottom reads institutional because every element is a **field of a record**, not an ornament.

| Primitive | Build | Convention | Rules |
|---|---|---|---|
| **Keyline box** | `border:1px solid var(--ink); border-radius:0; padding:8px 12px` | Ruled fields on Swiss ID cards ([Tschichold student cards](https://tschicholdarchive.com/w/123627900X)); ruled library forms ([ALA](https://libguides.ala.org/librarycards/history)) | Means "data, not prose". Never box body copy. One weight, no shadow |
| **Seal** | 44–72px circle, two rings, `stroke:currentColor; stroke-width:1.25`, numeral 700, micro caps on `<textPath>`; e.g. `ARC 1` / `ARC 3` | Notary seals — circular, name + number + border ([Texas](https://www.sos.texas.gov/statdoc/notary-seal-list.shtml), [California §8207](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=8207)); circular library ownership stamps ([British Library](https://www.bl.uk/stories/blogs/posts/a-guide-to-british-library-book-stamps)) | Monochrome ink or one accent; never gradient; not a button; label if it encodes series/edition |
| **Label strip** | Grid `auto 1fr`; cells split by `border-left`; mono 11px, `.08em`, `tnum` | Library date-due slip and ticket stub ([Smithsonian](https://blog.library.si.edu/blog/2018/04/10/a-trip-to-the-library/), [Wikimedia](https://commons.wikimedia.org/wiki/Category:Library_date_due_slips)) | One line, no wrap; `DD MMM YYYY` or ISO; divider is a separator |
| **Monogram tile** | 1:1 square, centred 800 letter (the `B`), radius 0–2px | Ex libris ciphers and printer's devices ([LoC](https://blogs.loc.gov/picturethis/2014/11/rising-to-the-bookplate-challenge-a-new-flickr-album/), [Fine Books](https://www.finebooksmagazine.com/issue/bookplate-librarys-most-personal-touch)) | One letter; ink on paper or inverse; no gradient/shadow; it is a stamp, not an avatar |
| **Redaction squares** | Five `.62em` spans, `background:var(--lavender)`, gap `.22em`, `aria-hidden` | FOIA bars — black out, never white out ([DOJ](https://www.justice.gov/oip/blog/foia-post-2008-oip-guidance-segregating-and-marking-documents-release-accordance-open)); lavender here as placeholder | Decorative only; a true redaction is a black bar with an accessible label |
| **Stacked wordmark** | Two uppercase lines, `line-height:.95`, `letter-spacing:.1em`, flush left; e.g. `BROWSER` / `COMPANY` | Institutional letterheads; [Swiss Style](https://www.aboutswitzerland.eda.admin.ch/en/swiss-style-forever-the-story-of-a-graphic-design-tradition) | Align left edges; never centre; not a heading |
| **Date** | Mono, tabular; `Jul 13, 2024` or `2024-07-13` | Library date stamps; specimen labels | One format per surface; no relative dates |

```css
.strip { display:grid; grid-template-columns:auto 1fr; align-items:center; padding:.35rem .75rem;
  border:1px solid #4A0D63; font:400 .6875rem/1.6 "Fragment Mono",monospace;
  letter-spacing:.08em; text-transform:uppercase; font-variant-numeric:tabular-nums; }
.strip > :nth-child(2) { border-left:1px solid #4A0D63; padding-inline:.75rem; }
.redaction { display:inline-flex; gap:.22em; }
.redaction span { inline-size:.62em; block-size:.62em; background:#D8C9EA; border-radius:.06em; }
```

```html
<div class="strip"><span>ARC</span><span>Jul 13, 2024</span></div>
```

Riso is the reference for **flat spot colour and overprint**, not texture: semi-translucent inks and a millimetre or two of misregistration are normal ([Purdue](https://guides.lib.purdue.edu/c.php?g=1478280&p=11039634), [Duplikat](https://www.duplikat.co.uk/riso-print-guide)). Keep fills flat; allow at most a 1px offset on display-size shapes, never on 11px labels.

The composite primitive is the **identity row**: monogram tile + redaction strip + label on one baseline. That is the card's "GIFTED MAGICIAN" line and the most reusable piece.

## 4. Colour

Only cream and ink are literal transcriptions; the rest are proposals keyed to the named hues. The ground is `#F6F1DF`–`#FAF6E8`; `#F8F3E3` is the midpoint.

| Token | Hex | Role | On cream |
|---|---|---|---|
| `paper-0` | `#FCF8EC` | raised | 1.05 |
| `paper-1` | `#F8F3E3` | page | 1.00 |
| `paper-2` | `#EFE7D2` | sunken / stripe | 1.11 |
| `paper-3` | `#E2D7BE` | well / disabled fill | 1.29 |
| `rule-ornament` | `#C9B9A2` | decorative keyline | 1.73 |
| `rule-interactive` | `#94846A` | control boundary (≥3:1) | 3.28 |
| `lavender-200` | `#D8C9EA` | redaction squares | 1.41 |
| `lavender-400` | `#B49BD3` | hover tint | 2.21 |
| `ink-900` | `#3A0A4E` | heavy display | 14.19 |
| `ink-700` | `#4A0D63` | primary text, keylines | 12.38 |
| `ink-500` | `#6B4A78` | secondary text | 6.58 |
| `ink-300` | `#7A5A86` | muted body | 5.21 |
| `ink-200` | `#9A86A2` | disabled (exempt) | 3.00 |
| `neutral-800` | `#3B3226` | neutral heading | 11.33 |
| `neutral-700` | `#5E523E` | neutral body | 6.87 |
| `neutral-600` | `#857659` | neutral border / large text | 4.00 |

Warm neutral ramp: `#FCF8EC`, `#F8F3E3`, `#EFE7D2`, `#E2D7BE`, `#CFC1A4`, `#AC9C80`, `#857659`, `#5E523E`, `#3B3226`, `#241E17`. First four are surfaces; 700–800 are text; 600 is large text or a border; 500 and lighter are decoration only.

| Gradient stop | Hex | Position | Note |
|---|---|---|---|
| Amber | `#F2A23C` | 0% / upper left | ink 6.55; white 2.10 |
| Orange | `#EA6A2F` | 28% | ink 4.32; white 3.18 — large only |
| Hot magenta | `#D42A7C` | 55% / bloom | white 4.75; cream 4.28 |
| Violet | `#7C2FA8` | 14%, 86% core | white 7.42; ink 1.85 |
| Crimson | `#A81440` | 100% / right | white 7.40; ink 1.86 |

Text-safe on cream, strongest first: `#3A0A4E` (14.19), `#4A0D63` (12.38), `#6B4A78` (6.58), `#7A5A86` (5.21). The ink purple is the intended text colour, not a compromise.

## 5. Accessibility

AA needs 4.5:1 for normal text, 3:1 for large (≥24px, or ≥18.66px bold) ([1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)); UI boundaries need 3:1 ([1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).

| Failure | Ratio | Verdict | Smallest fix |
|---|---|---|---|
| Lavender on cream | 1.41 | Fails as text/UI; fine decorative | Keep decorative, `aria-hidden`; never sole meaning |
| Amber on cream | 1.89 | Fails even large | Use `#9C5600` (5.05) for text/icons; keep fill |
| Orange on cream | 2.87 | Fails normal | Use `#B04A13` (4.93) for text; keep fill |
| Magenta on cream | 4.28 | Fails normal by 0.22 | Use `#C41F70` (5.01) for text; keep fill |
| Cream on magenta | 4.28 | Fails normal | Use `#FFFFFF` (4.75), or darken field |
| White on orange | 3.18 | Large only | Ink on orange ≥18.66px bold; no small white |
| White on amber | 2.10 | Fails all sizes | Never type on amber |
| Ornament keyline `#C9B9A2` | 1.73 | Fails 3:1 for controls | Use `#94846A` (3.28) for inputs |
| Disabled `#9A86A2` | 3.00 | Exempt, weak | Add a non-colour cue |

The smallest palette adjustment is **four values**: `#9C5600` (text amber), `#B04A13` (text orange), `#C41F70` (text magenta), `#94846A` (control keyline). Crimson (6.66) and violet (6.69) already pass as text.

**Gradient text rule: no.** Every glyph samples a different ratio, and WCAG applies to images of text. On cream the amber stop is 1.89 — below even the 3:1 large-text floor. Even on ink, the run goes amber 6.55 → orange 4.32 → magenta 2.89, so it fails somewhere. The gradient is a **surface fill only**. If a word must feel chromatic, set it solid `#4A0D63` on a cream plate placed over the gradient — never clip the gradient to the letters.

Use a 2px `#4A0D63` focus ring with 2px offset on cream. On the gradient, use a two-tone ring (2px `#F8F3E3` inside, 1px `#4A0D63` outside) or put the focusable element on a cream plate. Under `forced-colors`, swap the gradient for `Canvas`, ink for `CanvasText`, seals for `Highlight` outlines. Under `prefers-contrast: more`, outline the lavender squares in ink and use the text-safe variants above.

Documented compromise: redaction squares and seals stay `aria-hidden` unless they carry a series number or state; then they get a text label. That is the one place the language spends contrast on atmosphere, not information.

## 6. Could not verify

- **Arc's licence of FontMesa Marlin.** Name and `MarlinSoftBasic-Regular.otf` match FontMesa's catalogue exactly; no first-party licensing statement exists. "Custom" claims are unsupported.
- **Exact card hexes.** The image is absent; cream/ink come from the transcription and gradient stops are proposals, not sampled pixels.
- **Exact silhouette.** The path is a reconstruction from the prose (flat top, wide right arc, deep bow, lower-left point), not a trace.
- **Seal meaning.** `ARC` with `1` and `3` could be series, tier, or decoration; expose the number as `data-series`, invent no semantics.
- **The 11px label face.** Assumed Marlin Soft SQ; it could be another cut of the family.

## Sources

- Type: [arc.net](https://arc.net/) · [FontMesa Marlin Soft](https://www.myfonts.com/collections/marlin-soft-font-fontmesallc/) · [FontPath](https://www.fontpath.com/font/T11150/marlin-soft) · [Creative Market](https://creativemarket.com/fontmesallc/4012274-Marlin-Soft-SQ)
- Packages/licences: [Fontsource](https://fontsource.org/) · [npm](https://www.npmjs.com/) · [Google Fonts metadata](https://fonts.google.com/metadata/fonts) · [SIL OFL](https://openfontlicense.org/)
- Swiss/ID: [Swiss Style (EDA)](https://www.aboutswitzerland.eda.admin.ch/en/swiss-style-forever-the-story-of-a-graphic-design-tradition) · [Poster House](https://www.posterhouse.org/exhibition/the-swiss-grid/) · [Tschichold cards](https://tschicholdarchive.com/w/123627900X)
- Library records: [ALA](https://libguides.ala.org/librarycards/history) · [Smithsonian](https://blog.library.si.edu/blog/2018/04/10/a-trip-to-the-library/) · [Wikimedia date slips](https://commons.wikimedia.org/wiki/Category:Library_date_due_slips) · [British Library stamps](https://www.bl.uk/stories/blogs/posts/a-guide-to-british-library-book-stamps) · [NDL stamps](https://www.ndl.go.jp/en/aboutus/outline/history/seal)
- Riso: [Purdue](https://guides.lib.purdue.edu/c.php?g=1478280&p=11039634) · [Duplikat](https://www.duplikat.co.uk/riso-print-guide)
- Redaction: [DOJ OIP](https://www.justice.gov/oip/blog/foia-post-2008-oip-guidance-segregating-and-marking-documents-release-accordance-open) · [NARA codes](https://www.archives.gov/declassification/iscap/redaction-codes.html)
- Bookplates/seals: [LoC](https://blogs.loc.gov/picturethis/2014/11/rising-to-the-bookplate-challenge-a-new-flickr-album/) · [LoC symbols](https://www.loc.gov/loc/lcib/0002/biback.html) · [Fine Books](https://www.finebooksmagazine.com/issue/bookplate-librarys-most-personal-touch) · [Texas notary](https://www.sos.texas.gov/statdoc/notary-seal-list.shtml) · [California §8207](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=8207)
- WCAG: [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
