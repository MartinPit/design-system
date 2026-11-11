---
id: "07"
title: Decide the code architecture for each branch
labels: [wayfinder:grilling]
status: open
assignee: null
blocked-by: []
created: 2026-11-11
closed: null
---

## Question

Two independent Vite + React + TypeScript projects, free rein per system, but each must be maintainable and both must clear the quality bar. Decide the engineering shape.

Decide, with the human:

- **Styling strategy per branch.** CSS Modules + custom properties, plain CSS layers, vanilla-extract, or Tailwind. The two branches may choose differently, but each choice must be documented in that branch's README. Weigh: token discoverability, state styling, bundle simplicity, and how well the docs page can show tokens.
- **Token layer.** Where tokens live (`src/tokens/*.css` or TS objects → CSS vars), naming convention, and how the docs page reads values so the displayed swatch and the applied style cannot drift.
- **Component API conventions.** `forwardRef`, polymorphic `as`, `variant`/`size` props, controlled/uncontrolled inputs, `aria-*` pass-through. Free rein on names, but internal consistency per branch.
- **Docs data model.** A registry that drives sidebars, specimen pages, and state grids from one source, so adding a component updates the nav. Who owns the specimen definition, the component file or the docs file?
- **Iconography.** Inline SVG components versus a library; tree-shaking; how to restyle per system.
- **Accessibility tooling.** `eslint-plugin-jsx-a11y`, axe in a test or dev overlay, focus-visible baseline, reduced-motion utilities.
- **Testing.** What is worth testing — component render smoke tests, keyboard interaction tests, or none. Choose a floor that fits the schedule.
- **Scripts.** `dev`, `build`, `preview`, `lint`, `typecheck`, and a single `verify` that runs them all.
- **Branch hygiene.** Shared `.gitignore`, no cross-branch imports, README per branch explaining the system in one screen.

## Resolution shape

One short architecture decision per bullet, including the rejected options and why, plus the folder tree for each branch. This ticket unblocks both build tickets.
