# Design system explorations

Two candidate identities for one flashcards app, built from two reference cards. Each system lives on its own branch, read from its own seed card, and ships a full component library with a documentation page.

| System | Branch | Seed | Character |
|---|---|---|---|
| **Arcana** | `ds/arcana` | Card A | Cream, warm gradient, archive grammar, Swiss editorial |
| **Tidal** | `ds/tidal` | Card B | Iridescent ground, seigaiha field, glass depth, display serif |

Open `index.html` for the design index. It lists both systems, how to run them, and the placeholders for future prototypes.

## Run a system

- **Live:** [Arcana](https://martinpit.github.io/design-system/arcana/) · [Tidal](https://martinpit.github.io/design-system/tidal/)
- **Locally:**

```bash
git switch ds/arcana && npm install && npm run dev
git switch ds/tidal  && npm install && npm run dev
```

Each branch has its own README and its own `npm run verify`.

## The plan

The wayfinder map and its tickets live in [`wayfinder/`](wayfinder/map.md). The canonical transcription of the two cards is [`wayfinder/references/cards.md`](wayfinder/references/cards.md) — the original image exists only in the originating chat.

## Notes

- One app, two identities. Free rein per system; the shared contract is tokens + 27 components with states + a docs page + WCAG 2.2 AA.
- Docs-only: no app screens or clickable prototype. Future prototypes get a placeholder on the index.
- Hosted on GitHub Pages from a single `gh-pages` branch that carries both builds; the design branches themselves never merge.
- Neither design branch merges into `main`.
