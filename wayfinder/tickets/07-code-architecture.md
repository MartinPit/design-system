---
id: "07"
title: Decide the code architecture for each branch
labels: [wayfinder:grilling]
status: closed
assignee: thinker (implementation session)
blocked-by: []
created: 2026-11-11
closed: 2026-11-11
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

## Resolution — 2026-11-11

Decided by the implementer; the human may overturn any line. Both branches use the same engineering skeleton but not the same visual tokens.

- **Stack:** Vite + React 19 + TypeScript strict. Node 26 is installed; npm 11.
- **Styling:** **CSS Modules per component + one global `tokens.css`**. Rejected: Tailwind (token indirection fights the docs swatch reader), vanilla-extract (extra build layer for two short-lived branches), styled-components (runtime cost, no benefit here).
- **Tokens:** `src/styles/tokens.css` is the single source of truth. The docs read live values with `getComputedStyle(document.documentElement).getPropertyValue(...)` so a swatch can never lie. Component styles consume only `var(--…)`.
- **Component API:** plain function components; `forwardRef` on every focusable control; `variant` and `size` string unions; `className` appended, not replaced; `...rest` spread onto the native element; `aria-*` passed through untouched. No polymorphic `as` — keep the surface small.
- **Docs registry:** `src/docs/registry.tsx` exports ordered groups. Each entry: `{ id, name, job, Demo, variants, states, props, dos, donts, a11y }`. Demos live in `src/docs/demos/<Name>Demo.tsx`. The sidebar, routes and page all derive from this file.
- **Icons:** inline SVG components in `src/components/Icon/`, 1.5px stroke, `currentColor`; no icon dependency.
- **Accessibility tooling:** `eslint-plugin-jsx-a11y`, a visible `:focus-visible` baseline in `base.css`, skip link, landmark structure. No axe runtime overlay — the verification ticket runs axe against the built page.
- **Testing floor:** Vitest + React Testing Library. Smoke/render test for every component plus keyboard assertions for Dialog (trap + return focus), Tabs (arrow keys), Switch (space/enter), Select (keyboard), Toast (dismiss). `npm run verify` = `lint && typecheck && test && build`.
- **Routing:** a 30-line hash-route hook; no react-router.
- **Folder tree (each branch):**

```
index.html
package.json
tsconfig.json
vite.config.ts
eslint.config.js
README.md
src/
  main.tsx
  App.tsx
  styles/{tokens.css,base.css}
  components/<Name>/{<Name>.tsx,<Name>.module.css,index.ts}
  docs/{registry.tsx,Shell.tsx,tokenData.ts,routes.tsx,Page...}
  docs/demos/<Name>Demo.tsx
  icons/<Name>.tsx
```

- **Branch hygiene:** each branch is standalone, no cross-branch imports, no monorepo. `README.md` names the system, its card, character, commands, and the AA deviations.
