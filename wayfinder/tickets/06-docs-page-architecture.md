---
id: "06"
title: Decide the documentation page architecture
labels: [wayfinder:grilling]
status: closed
assignee: thinker (implementation session)
blocked-by: []
created: 2026-11-11
closed: 2026-11-11
---

## Question

Both branches ship one documentation showcase page. What is inside it, and how is it laid out? No app screens — this page is the system talking about itself.

Decide, with the human:

- **IA.** Expected sections: Overview (what the system is, the one-paragraph character, the card it came from), Foundations (colour, type, spacing, radii, elevation, motion, iconography), Components (the inventory from ticket `03`), and a closing note on accessibility. Add, cut, or reorder.
- **Navigation.** Single scrolling page with anchors, routed sections, or a fixed sidebar with content pane? What the mobile nav becomes at 360px.
- **Specimen anatomy.** The unit every component gets: live demo, state grid, variant matrix, props table, usage notes, do/don't. What is mandatory and what is optional. How a state grid shows hover/focus/disabled honestly.
- **Foundations presentation.** How tokens are shown — swatch grid with names and values, type specimens at real sizes, spacing ruler, motion samples. Whether values are copyable.
- **Page chrome.** Header, footer, "back to linktree" link, system name and version, a persistent reminder of which card seeded it.
- **Content.** The flashcards vocabulary used in specimens and examples — deck names, card faces, study session labels. Whether copy is English-only.
- **Responsive and a11y of the docs page itself.** Target widths, sidebar collapse, skip link, landmark structure.
- **Length.** A realistic section count so the build tickets can be sliced.

## Resolution shape

An outline with every section, the specimen contract, the nav model, and a build order. Put the outline in the ticket; prototypes consume it.

## Resolution — 2026-11-11

Decided by the implementer; the human may overturn any line.

### Route model

One Vite app per branch, hash routing, no router dependency: `#/overview`, `#/foundations/<slug>`, `#/components/<slug>`, `#/accessibility`. Unknown hash falls back to Overview. Each route is short enough to read in one screen.

### Shell

- **Header:** system wordmark, line `A design system for a flashcards app`, `v1.0`, a `← Design index` link back to `main`'s linktree, and a theme/label chip naming the seed card.
- **Sidebar:** fixed `260px` at ≥1024; a collapsible rail 768–1023; below 768 a top `Contents` disclosure that closes on navigation. Skip link first in tab order.
- **Content:** max `72ch` for prose, full width for state grids; each section ends with a hairline.
- **Footer:** seed card credit, licence note, `Built 2026`.

### Sidebar outline

1. **Overview**
2. **Foundations** — Colour, Type, Space, Shape, Elevation, Motion, Icons
3. **Components** — Actions (Button, IconButton, Link), Forms (TextField, TextArea, Select, Checkbox, RadioGroup, Switch, Slider, SearchField), Navigation (SegmentedControl, Tabs, Breadcrumb, Pagination), Display (Card, Badge, Tag, Avatar, Table, Progress, Skeleton, EmptyState), Overlay (Tooltip, Dialog, DropdownMenu, Toast)
4. **Accessibility**

### Overview page

Name and one-paragraph character; a small seed-card graphic (SVG, not the original image); three principles; a stats row (`27 components`, token count, `AA`); one sentence on how to read the page.

### Foundation pages

- **Colour:** swatch grid, each showing name, resolved hex, role, and contrast on the page ground. Values are read from computed CSS custom properties, never duplicated.
- **Type:** display, heading, body, label specimens at real sizes with token names; tracking rules.
- **Space:** a ruler of the scale and a live inset demo.
- **Shape:** radius tiles and the keyline/edge rules.
- **Elevation:** side-by-side samples at each level.
- **Motion:** a play control per duration/easing pair; disabled under reduced motion.
- **Icons:** the full inline set at 20/24px with names.

### Component page contract

Every component page has, in order: name and one-line job; live demo; variant matrix; state grid (every state visible at once, not only on hover); props table (name, type, default, description); two do / two don't; one accessibility note. The page reads from the docs registry, so nav and content cannot drift.

### Content

Use flashcards vocabulary, never lorem ipsum: decks `Kanji N3`, `Spanish Verbs`, `Biology 101`; cards `to remember` / `la llave`; metrics `142 cards due`, `12-day streak`, `98% recall`. English only. Dates in the system's date style.

### Responsive and accessibility of the docs page

Targets 360 / 768 / 1024 / 1440. No horizontal scroll; state grids wrap; tables scroll inside their own box. Landmarks (`header`, `nav`, `main`, `footer`), one `h1` per route, visible focus, `prefers-reduced-motion`. The page itself must pass the bar it documents.
