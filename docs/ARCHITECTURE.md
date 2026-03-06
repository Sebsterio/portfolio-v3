# ARCHITECTURE

## Scope

This document describes current technical structure only.

Source of truth is the code on `dev`.

## App route structure

Routes are implemented under `src/app`.

```text
/
|-- layout.tsx
|-- (home)/page.tsx
|-- about/page.tsx
|-- contact/page.tsx
`-- projects/
    |-- layout.tsx
    |-- page.tsx                  -> redirects to /projects/timeline
    |-- timeline/page.tsx
    |-- timeline/[slug]/page.tsx
    |-- cards/page.tsx
    |-- cards/[slug]/page.tsx
    `-- magazine/page.tsx
```

## Boundaries

- Route `page.tsx` files are server components by default.
- Interactive page sections are client components (`'use client'`).
- Root layout mounts the transition provider in `src/app/layout.tsx`.

## Data flow

- Project data is defined in `src/app/projects/_content.ts`.
- Data access is through `getProjects()` and `getProject(slug)` in `src/app/projects/_lib.ts`.
- Detail pages generate static params from project slugs.

## Navigation and transitions

- Transition orchestration lives in `src/lib/transitions/`.
- `TransitionProvider` coordinates route transitions and readiness signaling.
- `TransitionLink` and `useTransitionRouter` are the transition-aware navigation API.
- `PageTransition` calls `useTransitionReady()` so transitions wait for destination readiness.

## Styling structure

Global styles are imported from `src/styles/globals.css` using layered files:

- `theme.css`
- `base.css`
- `system/*.css`
- `components.css`
- `utilities.css`
- view-transition CSS files (`vt-*.css`)

Tailwind is used in CSS-first mode with static class detection.

## Test and validation surface

- Visual regression tests: `e2e/tests/vrt.spec.ts`.
- Unit test config: `vitest.config.mts` (`src/**/*.test.{ts,tsx}`).
- Lint config: `eslint.config.mjs`.

## Invariants

- Projects view mode is URL-addressable under `/projects/{timeline|cards|magazine}`.
- Internal navigation should use transition-aware APIs.
- Permanent docs are derived from implementation, not from prior prose.
