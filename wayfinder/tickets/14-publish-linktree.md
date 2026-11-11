---
id: "14"
title: Publish the linktree entries for both systems
labels: [wayfinder:task]
status: closed
assignee: thinker (implementation session)
blocked-by: ["11", "12"]
created: 2026-11-11
closed: 2026-11-11
---

## Question

`main` has a linktree page with placeholders. Once both systems exist, make it the real index.

Update the linktree page:

- One entry per system: name, the one-line character, the card it came from, a live swatch row or small preview, and the exact commands to run that branch.
- A short "what this is" paragraph: two candidate identities for one flashcards app, documentation-only, free rein per system.
- Clearly marked placeholders for future prototypes and designs, so the page can grow without a redesign.
- Accessible by default: landmarks, contrast, keyboard, responsive at 360px.
- Commit the page on `main`, not on a design branch. Do not merge the design branches.

## Resolution shape

The final page structure, the commands it lists, and how future entries are added.

## Resolution — 2026-11-11

`main`'s `index.html` is the design index:

- **Header:** eyebrow, `Two identities for one flashcards app`, one paragraph on what the two branches are.
- **Two entries:** live gradient swatch (the two-field warm form, the 6-stop iridescent ground), name, character, `Branch`, `Seed`, `Type`, `Components 27`, and the exact `git switch … && npm install && npm run dev` commands.
- **Future prototypes and designs:** three dashed placeholders — Arcana study flow, Tidal study flow, a third card direction.
- **How to read a system:** sidebar contents, routes, local-only hosting, no merging.
- **Footer:** links to the map and the card transcription.

Responsive at 390 and 1440; entries are `<article>`s, not self-links (branches are not hosted). Future entries are added by copying an `<article class="card">` block: swatch class, name, character, meta row, commands. The page is plain HTML with no dependencies.
