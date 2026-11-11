---
id: "06"
title: Decide the documentation page architecture
labels: [wayfinder:grilling]
status: open
assignee: null
blocked-by: []
created: 2026-11-11
closed: null
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
