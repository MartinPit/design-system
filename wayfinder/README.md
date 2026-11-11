# Local markdown tracker

This repo has no remote issue tracker, so the wayfinder map lives in markdown next to the work.

## Layout

```
wayfinder/
  map.md                  the map (label: wayfinder:map)
  tickets/
    <id>-<slug>.md        one file per ticket
  references/
    cards.md              canonical transcription of the two reference cards
```

## Ticket file format

```markdown
---
id: "04"
title: Decide the Arcana visual language
labels: [wayfinder:grilling]
status: open          # open | closed
assignee: null        # set to the driving dev's name to claim
blocked-by: ["01"]    # ids only; unblocked when every one is closed
created: 2026-11-11
closed: null
---

## Question

...

## Resolution        # added on close only
```

`wayfinder:` labels are the only labels. No triage labels.

## Operations

- **Frontier** — tickets that are `status: open`, `assignee: null`, and whose every `blocked-by` id is `status: closed`.
- **Claim** — set `assignee:` before doing any work.
- **Resolve** — append `## Resolution`, set `status: closed` and `closed:` date, then add one line to the map's *Decisions so far*. One ticket per session (research tickets excepted).
- **New ticket** — create the file unblocked, then edit `blocked-by` in a second pass once ids exist.
- **Research assets** — findings live in `research/<name>.md` on a throwaway `research/<name>` branch, linked from the ticket. Never merged; a context pointer is enough.
- **Branches** — `main` holds the tracker and the linktree. Design work happens on `ds/arcana` and `ds/tidal`. Keep ticket edits on `main`; do not copy the tracker onto design branches.
- **Parallel sessions** — assignee is the claim; expect other sessions editing these files. Re-read before overwriting.
