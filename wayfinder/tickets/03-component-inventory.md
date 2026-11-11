---
id: "03"
title: Decide the component inventory and documented states
labels: [wayfinder:grilling]
status: closed
assignee: thinker (implementation session)
blocked-by: []
created: 2026-11-11
closed: 2026-11-11
---

## Question

Which ~25 components does a flashcards-app design system need, and exactly which states must each one document?

Work with the human through the list. A starting candidate, to cut, merge, or extend:

**Actions** — Button (primary/secondary/ghost/destructive; default/hover/active/focus/disabled/loading), IconButton, Link, SegmentedControl.
**Inputs** — TextField, TextArea, Select, Combobox, Checkbox, RadioGroup, Switch, Slider, SearchField, Stepper (number).
**Navigation** — TopBar, SidebarNav, Tabs, Breadcrumb, Pagination.
**Disclosure** — Accordion, Tooltip, Popover, DropdownMenu, Dialog, Toast.
**Display** — Card (deck card, card-face), Badge, Tag/Chip, Avatar, Table, Progress (bar/ring), Skeleton, EmptyState, Stat, Tooltip-rich help.

Decide:

- The final list, with each component's **one-line job** in a flashcards app (e.g. `Card` renders a deck or a study card; `Progress` shows session recall).
- For each: variants, sizes, states, and which are interactive. Loading and error states are easy to skip and expensive to retrofit.
- What counts as *documented*: a live specimen, a state grid, a props table, usage notes, do/don't.
- Which components are **required on both** branches for comparison, and which are optional. The delivery contract is parity at the inventory level even though APIs are free rein.
- The order to build them, foundations first, so a session can stop at a clean boundary.

## Resolution shape

A single table: component, job, variants, sizes, states, required/optional, build order. Record it in the ticket; the build tickets consume it.

## Resolution — 2026-11-11

Decided by the implementer; the human may overturn any line. **All 27 are required on both branches.** Free rein on APIs, so the shared contract is inventory parity, not identical props. Build in this order; foundations first.

| # | Component | Job in a flashcards app | Variants | Sizes | States |
|---|---|---|---|---|---|
| 1 | Button | Commit an action: start a session, save a card | primary / secondary / ghost / danger | sm / md / lg | default, hover, active, focus-visible, disabled, loading |
| 2 | IconButton | Compact action: shuffle, mute, close | solid / ghost | sm / md | default, hover, active, focus-visible, disabled |
| 3 | Link | Navigate away: back to linktree, docs cross-reference | inline / standalone | inherit / sm | default, hover, focus-visible, visited, disabled |
| 4 | TextField | Enter a deck or card name | with label / hint / error | sm / md | default, focus, filled, error, disabled, readonly |
| 5 | TextArea | Write a card's answer | with counter / error | md | default, focus, filled, error, disabled, readonly |
| 6 | Select | Choose a deck, language, or sort order | native-styled / with error | sm / md | default, focus, open, filled, error, disabled |
| 7 | Checkbox | Toggle a filter; select rows | single / indeterminate | sm / md | unchecked, checked, indeterminate, hover, focus, disabled, error |
| 8 | RadioGroup | Pick one study mode | vertical / horizontal | sm / md | unselected, selected, hover, focus, disabled, error |
| 9 | Switch | Turn on reminders or dark surface | on / off | sm / md | on, off, hover, focus, disabled |
| 10 | Slider | Set daily goal or session length | single value | md | default, hover, dragging, focus, disabled |
| 11 | SearchField | Find a deck or card | with clear / with shortcut | md | empty, typing, filled, focus, disabled |
| 12 | SegmentedControl | Switch a local view: list / grid | 2–4 segments | sm / md | selected, unselected, hover, focus, disabled |
| 13 | Tabs | Move between deck sections | underline / pill | md | selected, unselected, hover, focus, disabled |
| 14 | Breadcrumb | Show depth inside the docs | default / collapsed | sm | default, current, hover, focus |
| 15 | Pagination | Move through a long card list | numbered / compact | sm / md | current, default, hover, focus, disabled |
| 16 | Card | Show a deck or a study card | flat / raised / interactive / selected | sm / md / lg | default, hover, selected, focus-visible, disabled |
| 17 | Badge | Mark due count, tier, or status | neutral / accent / success / warning / danger | sm / md | static only |
| 18 | Tag | Label a deck; removable filter | static / removable | sm / md | default, hover, focus, disabled |
| 19 | Avatar | Show a learner or deck owner | image / initials | xs / sm / md / lg | default, fallback, focus (when interactive) |
| 20 | Table | Show study history and card lists | default / striped / compact | md | header, sorted asc/desc, row hover, selected row, empty, loading |
| 21 | Progress | Show session recall or daily goal | bar / ring | sm / md / lg | determinate, indeterminate, complete |
| 22 | Skeleton | Hold space while a deck loads | text / block / circle | sm / md | animated (reduced-motion static) |
| 23 | EmptyState | Empty deck, no results, first run | with / without action | md | default |
| 24 | Tooltip | Explain an icon or a truncated label | top / bottom / left / right | sm | hidden, visible, focus-triggered |
| 25 | Dialog | Confirm delete, rename a deck | sm / md | sm / md | closed, open, focus-trapped, disabled action |
| 26 | DropdownMenu | Row actions: edit, duplicate, delete | default / with separators | sm / md | closed, open, hover, focus, disabled item, danger item |
| 27 | Toast | Confirm a save or a failed sync | success / danger / info | md | entering, visible, dismissed, paused on hover |

Documented = live demo + variant matrix + state grid + props table + two do and two don't + one accessibility note. A component without those is not done.

