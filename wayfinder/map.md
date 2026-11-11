---
labels: [wayfinder:map]
created: 2026-11-11
---

# Map — two identities for one flashcards app

## Destination

Two candidate identities for one flashcards app, delivered as two complete design systems on separate branches:

- **Arcana** (`ds/arcana`) — the cream/editorial, archival, warm-gradient direction read from Card A.
- **Tidal** (`ds/tidal`) — the dark, iridescent, ornamental seigaiha direction read from Card B.

A branch reaches the end when it holds a Vite + React + TypeScript project with a full token layer, a ~25-component library documenting every state, and a documentation showcase page (Foundations + Components — no app screens), clearing the quality bar below. `main` holds a linktree page that links to both systems and to future prototypes and designs.

## Notes

- **Domain:** flashcards app — decks, study sessions, recall, spaced repetition. The systems are candidates for one product; the docs describe the system, not the product's screens.
- **Free rein per system (Q9):** token names, type, shape, motion, ornament, and component APIs may diverge. What is shared is the delivery contract: tokens + ~25 components with states + a docs page + the quality bar.
- **Stack:** Vite + React + TypeScript, one project per branch.
- **Quality bar:** WCAG 2.2 AA, visible focus, full keyboard operation, `prefers-reduced-motion`, responsive 360–1440px. Any deliberate contrast compromise is documented on the system's own page.
- **Reference cards:** `wayfinder/references/cards.md` is canonical; the original image exists only in the originating chat.
- **Tracker:** local markdown, operations in `wayfinder/README.md`.
- **Execution is carried in this effort** — the default planning-only rule is overridden: build tickets are in scope. Planning still happens first, one decision per ticket.
- **Skills:** grilling + domain-modeling for HITL tickets, research for AFK tickets, prototype for shells and signature surfaces.
- **Branches:** `ds/arcana`, `ds/tidal`, throwaway `research/*`. The tracker stays on `main`.

## Decisions so far

<!-- one line per closed ticket: name, gist, link to the ticket file -->

- [Deconstruct the Arcana card's visual references](tickets/01-arcana-card-references.md): Marlin Soft SQ is commercial, so Arcana substitutes an OFL grotesque; the gradient is two fields, and four palette values buy AA.

## Not yet specified

- **Docs template divergence** — whether the two documentation pages share one structural template skinned twice, or diverge in layout logic. Graduates once the docs architecture and both visual languages are settled.
- **Iconography** — inline SVG set drawn per system versus a licensed icon library restyled per system.
- **Density and spacing** — the editorial system likely breathes; the ornamental one may compress. Scales are named in the visual-language tickets, but the resulting docs density is not yet visible.
- **Code samples in docs** — whether specimens carry copyable React snippets or only live demos and prop tables.
- **Linktree treatment** — a plain index versus a page that previews each system with live swatches and screenshots. Graduates after both builds exist.
- **Motion vocabularies** — beyond duration and easing, whether Tidal gets an iridescent shimmer and Arcana a stamp/print reveal.
- **Dark/light variants** — whether each system ships a second mode beyond its primary (Arcana light-first, Tidal dark-first).
- **Accessibility verification method** — automated axe pass versus a manual keyboard and contrast audit, or both.

## Out of scope

- **App screens and clickable prototypes** in either system — the docs page is the deliverable (Q8). Future prototypes appear only as linktree placeholders, built later.
- **Deploying the branches** — no hosting; the linktree on `main` is the index (Q11).
- **A shared component package or monorepo** — free rein per system (Q9); the two branches stay independent.
- **Merging either design branch into `main`.**
