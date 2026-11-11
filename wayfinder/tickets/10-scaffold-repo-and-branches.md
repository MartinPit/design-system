---
id: "10"
title: Scaffold the repo, both branches, and the linktree
labels: [wayfinder:task]
status: closed
assignee: thinker (implementation session)
blocked-by: []
created: 2026-11-11
closed: 2026-11-11
---

## Question

Nothing exists yet but the tracker on `main`. Stand up the repository so every later ticket has somewhere to land.

Do:

1. On `main`: a `README.md` that explains the effort in one screen, the tracker, and how to run each system. A `linktree` page — plain HTML or a minimal Vite project — listing **Arcana** and **Tidal** with their one-line character, plus clearly marked placeholders for future prototypes and designs. It must link to each system's branch README and commands (branches are not hosted; see out of scope). A root `.gitignore`.
2. Create branch `ds/arcana` and branch `ds/tidal` from `main`.
3. On each branch: a Vite + React + TypeScript skeleton that runs with `npm install && npm run dev`, with ESLint, Prettier, a `verify` script stub, and a branch `README.md` naming the system, its card, and its status.
4. Confirm both skeletons build. Do not build components here; that is ticket `11`/`12`.

Keep `main` free of system code. Confirm `git branch --list` shows both branches and `git status` is clean.

## Resolution shape

What exists where, the commands to run each branch, and any setup gotcha (Node version, package manager). Later tickets depend on these exact commands.

## Resolution — 2026-11-11

- `main` has `README.md`, the design index `index.html` (two entries, branch + commands, future-prototype placeholders), `.gitignore`, and the tracker.
- Branches `ds/arcana` (commit `89c3040`) and `ds/tidal` (`d752a7b`) each hold a standalone Vite 8 + React 19 + TypeScript project with ESLint 9, Vitest, font packages, `tokens.css`, `base.css`, and a placeholder `App.tsx`.
- Both branches pass `npm run verify` (lint, typecheck, tests, build). Node 26 / npm 11.
- Commands: `npm install && npm run dev`; `npm run verify`.
- Gotchas: ESLint must stay on `^9` (`eslint-plugin-jsx-a11y` does not yet accept ESLint 10); Fragment Mono ships 400 only, so no `500.css` import.
- Worktrees for the build: `.worktrees/build-arcana` and `.worktrees/build-tidal` (gitignored).
