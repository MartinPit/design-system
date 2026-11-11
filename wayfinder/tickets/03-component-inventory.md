---
id: "03"
title: Decide the component inventory and documented states
labels: [wayfinder:grilling]
status: open
assignee: null
blocked-by: []
created: 2026-11-11
closed: null
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
