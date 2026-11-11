---
labels: [wayfinder:map]
created: 2026-11-11
---

# Map — two identities for one flashcards app

## Destination

Two candidate identities for one flashcards app, delivered as two complete design systems on separate branches:

- **Arcana** (`ds/arcana`) — the cream/editorial, archival, warm-gradient direction read from Card A.
- **Tidal** (`ds/tidal`) — the dark, iridescent, ornamental seigaiha direction read from Card B.

A branch reaches the end when it holds a Vite + React + TypeScript project with a full token layer, a 27-component library documenting every state, and a documentation showcase page (Foundations + Components — no app screens), clearing the quality bar below. `main` holds a design index that lists both systems with their run commands and placeholders for future prototypes and designs.

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
- **Delivered 2026-11-11.** All 14 tickets closed. Arcana at `4a6a1d4`, Tidal at `75c3725`; `main` carries the design index. Implementer worktrees removed; `research/*` branches remain as context pointers only.
- **Published 2026-11-11** (requested follow-up, beyond the map): both systems are live on GitHub Pages from a single `gh-pages` branch — `/arcana/`, `/tidal/`, index at the root. The design branches remain unmerged.

## Decisions so far

<!-- one line per closed ticket: name, gist, link to the ticket file -->

- [Deconstruct the Arcana card's visual references](tickets/01-arcana-card-references.md): Marlin Soft SQ is commercial, so Arcana substitutes an OFL grotesque; the gradient is two fields, and four palette values buy AA.
- [Deconstruct the Tidal card's visual references](tickets/02-tidal-card-references.md): seigaiha is a stroke-only masked tile, the ground is one linear plus three blooms with an abyss text zone, and glass is enhancement only.
- [Decide the component inventory and documented states](tickets/03-component-inventory.md): 27 required components in five groups, each with variants, sizes, states, and a documentation contract.
- [Decide the Arcana visual language](tickets/04-arcana-visual-language.md): cream/ink archive palette with four text-safe accent values, a grotesque + mono pairing, zero-radius keylines, and one gradient form per viewport.
- [Decide the Tidal visual language](tickets/05-tidal-visual-language.md): an iridescent 6-stop ground with an abyss text zone, a masked seigaiha at 3.5rem, four glass levels, and a Didone display face.
- [Decide the documentation page architecture](tickets/06-docs-page-architecture.md): hash-routed docs shell, seven foundation pages, 27 component pages on one contract, responsive at 360–1440.
- [Decide the code architecture for each branch](tickets/07-code-architecture.md): Vite + React 19 + TS strict, CSS Modules over a tokens.css source of truth, a registry-driven docs app, Vitest floor.
- [Scaffold the repo, both branches, and the linktree](tickets/10-scaffold-repo-and-branches.md): main index plus two standalone Vite projects, both green on `npm run verify`, with the ESLint 9 and Fragment Mono gotchas recorded.
- [Prototype the Arcana docs shell and specimen layout](tickets/08-prototype-arcana-docs-shell.md): folded into the Arcana build; reviewed as the finished docs page.
- [Prototype the Tidal docs shell and specimen layout](tickets/09-prototype-tidal-docs-shell.md): folded into the Tidal build; reviewed as the finished docs page.
- [Build the Arcana system and its documentation page](tickets/11-build-arcana-system.md): 27 components and seven foundation pages on `ds/arcana`, 44 tests, strict axe 0 violations, archive character confirmed at 390 and 1440.
- [Build the Tidal system and its documentation page](tickets/12-build-tidal-system.md): 27 components on `ds/tidal`, 40 tests, strict axe 0 violations, iridescent identity held with body content on dark panels.
- [Verify both branches against the quality bar](tickets/13-verify-quality-bar.md): both branches green — 44/40 tests, strict axe 0 violations, no overflow, skip links and disabled states fixed, review defects closed.
- [Publish the linktree entries for both systems](tickets/14-publish-linktree.md): `main`'s design index carries both systems with live swatches, commands, and placeholders for future prototypes.

## Not yet specified

None. The route is walked; every ticket is closed. Anything below is a deliberate boundary, not fog.

## Out of scope

- **App screens and clickable prototypes** in either system — the docs page is the deliverable (Q8). Future prototypes appear only as linktree placeholders, built later.
- **A shared component package or monorepo** — free rein per system (Q9); the two branches stay independent.
- **Merging either design branch into `main`.**
- **A second light/dark mode per system** — each ships its primary mode (Arcana light, Tidal dark) with reduced-motion/contrast/transparency variants, not a full second theme.
- **Copyable code samples in the docs** — specimens are live demos plus props tables; no snippet playground.
- **A third card direction** — only the two requested identities were built; the index carries a placeholder for it.
