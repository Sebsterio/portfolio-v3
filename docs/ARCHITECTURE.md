# ARCHITECTURE

## Scope

This document describes current technical structure only.

Source of truth is the code on `dev`.

## App directory structure

Routes are implemented under `src/app`.

```text
src/
|-- app/
|   |-- layout.tsx
|   |-- (home)/page.tsx
|   |-- about/page.tsx
|   |-- contact/page.tsx
|   `-- projects/
|       |-- layout.tsx
|       |-- page.tsx                  -> redirects to /projects/timeline
|       |-- timeline/page.tsx
|       |-- timeline/[slug]/page.tsx
|       |-- cards/page.tsx
|       |-- cards/[slug]/page.tsx
|       |-- magazine/page.tsx
|       `-- magazine/[slug]/page.tsx  -> redirects to /projects/magazine#project-{id}
|-- components/
|-- config/
|-- content/
|-- lib/
|-- styles/
`-- types/
```

## Boundaries

- Route `page.tsx` files are server components by default.
- Interactive page sections are client components (`'use client'`).
- Root layout mounts the transition provider and the root theme runtime in `src/app/layout.tsx`.

## Data flow

- Project data is defined in `src/content/projects.ts`.
- Data access is through helpers in `src/app/projects/_lib.ts`.
- Project-owned route theme lookup is derived in `src/app/projects/_lib.ts` through `getProjectThemeBySlug(slug)` and `getProjectThemeLookup()`.
- Timeline and cards detail pages generate static params from project slugs.
- Magazine slug routes generate static params from project slugs, then redirect to anchored sections in the magazine page.

## Route theme runtime

- Theme activation contract is the root `data-theme` attribute on `document.documentElement`.
- Only `/projects/timeline/[slug]` and `/projects/cards/[slug]` resolve a named project theme.
- Theme resolution logic lives in `src/lib/theme/runtime.ts` and consumes a provided slug-to-theme lookup.
- Root layout passes the project theme lookup to:
  - `ThemeBootstrapScript` for first-paint theme assignment before hydration
  - `ThemeRouteController` for client-side route changes
- `TransitionProvider` does not own theme changes.

## Navigation and transitions

- Transition orchestration lives in `src/lib/transitions/`.
- `TransitionProvider` coordinates route transitions and readiness signaling.
- `TransitionLink` and `useTransitionRouter` are the transition-aware navigation API.
- `PageTransition` calls `useTransitionReady()` so transitions wait for destination readiness.

## Styling structure

Global styles are imported from `src/styles/globals.css` using layered files:

- `theme.css`
- `themes.css`
- `theme-transition.css`
- `base.css`
- `system/*.css`
- `components.css`
- `utilities.css`
- view-transition CSS files (`vt-*.css`)

Tailwind is used in CSS-first mode with static class detection.

## Test and validation surface

- Visual regression tests: `e2e/tests/vrt.spec.ts`.
- Unit test config: `vitest.config.mts` (`src/**/*.test.{ts,tsx}`).
- Current targeted unit tests include project/theme helpers under `src/app/projects` and `src/lib/theme`.
- Lint config: `eslint.config.mjs`.

## Invariants

- Projects view mode is URL-addressable under `/projects/{timeline|cards|magazine}`.
- Internal navigation should use transition-aware APIs.
- Root theme writes stay centralized and only mutate the root `data-theme` attribute via the theme runtime.
- Theme animation is driven at the palette layer in `src/styles/theme-transition.css`, not by per-component theme transition rules.
- Permanent docs are derived from implementation, not from prior prose.
