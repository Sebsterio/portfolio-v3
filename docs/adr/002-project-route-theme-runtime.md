# ADR 002 - Project Route Theme Runtime

**Status:** Accepted | **Branch:** dev

## Context

Project detail routes need a route-owned theme without introducing multiple theme owners, nested theme regions, or component-level token mutation.

The first implementation mixed project data access, route parsing, DOM writes, bootstrap script generation, and transition orchestration across unrelated modules. That made the root runtime harder to reason about and increased the chance of future drift.

## Decisions

**1. Project theme data is derived at the projects data boundary**

`src/app/projects/_content.ts` remains the source of raw project metadata. `src/app/projects/_lib.ts` is the server-side access layer for project-derived lookups, including project theme lookup helpers.

**2. Theme activation is only a root `data-theme` write**

The runtime never mutates theme tokens inline. It only sets or removes `data-theme` on `document.documentElement`.

**3. Theme routing is independent from view-transition orchestration**

`TransitionProvider` owns view transitions only. Root theme commits are handled by `ThemeRouteController`, mounted separately from the root layout.

**4. First-paint theme assignment stays inline but isolated**

`ThemeBootstrapScript` performs the pre-hydration root theme assignment using the same serialized slug-to-theme lookup that the client controller receives. This avoids initial theme flash without spreading bootstrap logic through unrelated modules.

**5. Theme animation is owned by the palette layer**

`src/styles/theme-transition.css` animates the root `--theme-*` tokens. Components keep ownership of their local motion transitions and do not implement separate theme timing rules.

## Consequences

- Future theme changes should start from `src/app/projects/_lib.ts`, `src/lib/theme/runtime.ts`, and `src/app/layout.tsx`.
- New project themes should not be wired through `TransitionProvider` or ad hoc component effects.
- If pre-hydration theme behavior changes, update `ThemeBootstrapScript` and the shared theme lookup together.
