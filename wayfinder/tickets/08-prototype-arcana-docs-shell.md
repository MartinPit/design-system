---
id: "08"
title: Prototype the Arcana docs shell and specimen layout
labels: [wayfinder:prototype]
status: closed
assignee: thinker (implementation session)
blocked-by: ["04", "06"]
created: 2026-11-11
closed: 2026-11-11
---

## Question

Does the Arcana visual language survive contact with a documentation page? Raise the fidelity of the discussion with a cheap, runnable React artifact, then react to it with the human.

Build in `prototype/` on branch `ds/arcana` (or its own `prototype/arcana-docs` branch if the design branch is busy):

- The docs shell from ticket `06`: header, sidebar nav, content pane, mobile collapse.
- Real Arcana styling from ticket `04`: cream ground, ink purple, the chosen type pairing, keyline grammar, spacing rhythm.
- Three sections only: **Overview**, **Colour** (swatch grid), **Buttons** (variant × state grid).
- At least one appearance of the gradient blob used as the system mark or page accent, so its constraints are visible in context.
- Realistic flashcards copy so the page does not read as lorem ipsum.
- Focus states and reduced-motion behaviour working, because they are easy to fake and expensive to retrofit.

Do not build all 25 components. The question is whether the shell, the type, and the motif hold together — not whether the library is done.

## Deliverable

A runnable prototype and a short note in the ticket's resolution: what held, what broke, what the build must change. Screenshots or a captured page welcome, linked, not pasted.

## Resolution — 2026-11-11

Not run as a separate HITL artifact. The user invoked `implement-spec` for the whole map, so the shell was built directly inside ["Build the Arcana system and its documentation page"](11-build-arcana-system.md) and reviewed as the finished docs page. The visual-language spec (`04`) and docs architecture (`06`) carry the decisions that the prototype would have tested. If the shell needs a reaction loop, reopen this ticket with the built page as the artifact.
