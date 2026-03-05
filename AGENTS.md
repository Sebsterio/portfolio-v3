# AGENTS.md

> This consolidated document combines the knowledge from three prior versions of AGENTS.md (AGENTS.0, AGENTS.1, AGENTS.2).
> It is the single source of truth for AI coding agents working in this repository.
> Whenever you update the codebase or the agent workflow, update this file and note the change
> in the changelog section at the end.

---

## 1. Project Overview

**Type:** Personal portfolio / case-study web application

**Stack:** Next.js 15 (App Router), React 19, TypeScript (strict mode), Tailwind CSS v4 (CSS-first), pnpm

**Design Theme:** Liquid Chrome – glass morphism with metallic accents and a three-color gradient system

**Key Packages/Utilities:**

- `tailwind-merge` and `clsx` combined in `cn()` utility
- Custom view transition module (`TransitionProvider`, `TransitionLink`, `useTransitionRouter`, `PageTransition`)
- Playwright visual regression tests

**Important Scripts:**

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm e2e    # runs Playwright full-page VRT
```

Agents must ensure visual output remains unchanged when modifying styles or layout.

---

## 2. Development Workflow

Agents operate in two stages:

1. **Architect** – Analyse repository structure, produce documentation, and plan refactors.
   Related docs: `docs/repo-style-analysis.md`, `docs/design-system-roadmap.md`, `docs/STYLEMAP.md`.
   _No code changes_ should occur during this stage.

2. **Implementer** – Execute refactors or new features following the roadmap. Changes must be
   incremental, commit atomic, and always validated by build, typecheck, and visual tests.

---

## 3. Directory Structure & Routing (current as of March 2026)

```
app/
└── projects/
    ├── layout.tsx                     # [server] Persistent shell: header + PageTransition wrapper
    ├── page.tsx                       # [server] Redirects /projects → /projects/timeline
    ├── _components/
    │   ├── ProjectsPageHeader.tsx     # [server] header; composes ProjectsPageTitle + DisplayModeSwitcher
    │   ├── ProjectsPageTitle.tsx      # [client] reads useParams for slug→name
    │   └── DisplayModeSwitcher.tsx    # [client] reads pathname to switch view mode
    ├── _lib/
    │   ├── projects.ts                # getProjects(), getProject(slug), getProjectName(slug)
    │   └── types.ts                   # Project type definitions
    │
    ├── timeline/                      # timeline view
    │   ├── page.tsx                   # [server] renders TimelineCollectionPage
    │   ├── _components/
    │   │   ├── TimelineCollectionPage.tsx
    │   │   ├── TimelineLayoutClient.tsx  # [client] provides TimelineContext + css shift
    │   │   ├── TimelineProjectPage.tsx
    │   │   ├── TimelineProjectSidebarItem.tsx
    │   │   └── TimelineProjectContentCard.tsx
    │   ├── [slug]/                    # project detail
    │   │   └── page.tsx               # [server] renders TimelineProjectPage
    │   ├── @list/                     # parallel list slot
    │   │   ├── page.tsx               # [server] renders TimelineCollectionPage
    │   │   └── default.tsx            # re-exports page.tsx for Next.js
    │   └── @detail/                   # parallel detail slot
    │       ├── default.tsx            # renders null when no selection
    │       └── [slug]/
    │           └── page.tsx           # [server] project detail
    │
    ├── cards/                         # cards view (formerly "grid")
    │   ├── page.tsx                   # [server] renders CardsCollectionPage
    │   ├── [slug]/                    # static fallback for direct access
    │   │   └── page.tsx
    │   ├── (.)[slug]/                 # intercepting route for in-app navigation
    │   │   └── page.tsx               # wraps GridSingle in GridModal
    │   └── _components/
    │       ├── CardsCollectionPage.tsx
    │       ├── CardsProjectPage.tsx
    │       ├── ProjectCard.tsx
    │       ├── GridSingle.tsx
    │       └── GridModal.tsx
    │
    └── magazine/                      # magazine view (editorial/infinite-scroll)
        ├── page.tsx                   # [server] renders EditorialPage
        └── _components/
            ├── EditorialPage.tsx      # [client] infinite scroll orchestrator
            ├── EditorialBrief.tsx     # [server] static brief sections
            └── EditorialFull.tsx      # [client] lazy-loaded detail via next/dynamic
```

> **Note:** Earlier versions of this doc referenced `grid` and `editorial` instead of
> `cards` and `magazine`. Those directory names may appear in older commits or comments – the current
> names above are authoritative.

---

## 4. Architectural Decisions & Core Rules

### Layout is a URL segment, not a query param

Active display mode is encoded as `/projects/[timeline|cards|magazine]`. This preserves
static generation (using `params`) and keeps all pages pre-rendered. Do **not** move the layout
into a query parameter – it was explicitly evaluated and rejected.

### Static generation everywhere

All `/projects` routes are statically generated at build time. `generateStaticParams` is present
in `timeline/@detail/[slug]/page.tsx` and `cards/[slug]/page.tsx`. Avoid `searchParams` in
server components; reading them forces dynamic rendering and breaks the static guarantee.

### Timeline uses parallel routes for element morphing

`@list` and `@detail` parallel route slots keep the list DOM mounted when selecting an item.
This enables real-element morphs instead of snapshots. The active slug is communicated via
`TimelineContext` from `TimelineLayoutClient`; **do not** rely on `useParams` inside
`TimelineCollectionPage` or related list components (see race condition warning below).

### Cards view uses intercepting routes

`(.)[slug]` intercepts in-app card clicks so the list stays mounted and the card can morph.
A separate static fallback exists at `cards/[slug]/page.tsx` for direct URL access. `GridModal`
must call `router.back()` (not `router.push`) to close – this preserves history and allows
transitions to reverse correctly.

### Magazine is a single infinite-scroll document

There are no individual magazine sub-routes; attempts to navigate to
`/projects/magazine/[slug]` should redirect to `/projects/magazine#slug`. Briefs are server-rendered;
full detail sections mount lazily with IntersectionObserver and `next/dynamic`.

### DisplayModeSwitcher reads pathname, not searchParams

This component uses `usePathname()` to derive and construct paths. It replaces segment 2
without touching search parameters. It does not rely on `useSearchParams`.

### Timeline slug race condition (CRITICAL)

A previous bug occurred when components used `useParams` to read the active slug. During a
view transition, `useParams` could resolve against the previous route, leading to mismatched
styles or layout. The fix is to pass `hasDetail` and `slug` from the server layout into the
client via context (`TimelineLayoutClient`). **Never** reintroduce `useParams` for this state.

### Suspense boundaries for client hooks

Any client component using `useParams`, `useSearchParams`, or `usePathname` must be wrapped
in a `<Suspense>` when rendered by a server component. `ProjectsPageTitle` and
`DisplayModeSwitcher` are examples. Fallbacks should be the component's default (e.g.
`<h1>Projects</h1>`) rather than separate skeletons.

---

## 5. View Transition Module

The repository uses a custom orchestration layer built around `document.startViewTransition`,
defined in `src/lib/transitions/`.

### Components & hooks

- **`TransitionProvider`** – wraps the application root (ideally in `src/app/layout.tsx`); manages transition state, signals readiness,
  and exposes navigation methods.
- **`TransitionLink`** – drop-in wrapper for Next.js `<Link>` that intercepts clicks and wraps
  navigation in a transition.
- **`PageTransition`** – placed around the page content in `src/app/projects/layout.tsx`. Calls
  `useTransitionReady` to inform the provider when the incoming page is painted.
- **`useTransitionRouter`** – imperative API for navigation (`navigate`, `back`, `replace`, `forward`).
- **`useTransitionReady`** – called by `PageTransition` to resolve the navigation promise.

### Behaviour

`document.startViewTransition`'s inner promise is intentionally held open until the incoming
page calls `signalReady` (via `useTransitionReady`). This ensures the animation waits for the
page's content to be ready, not just React's first render.

### Critical: Do Not

- Replace this module with React's `<ViewTransition>` component. React's API operates on
  component state, not App Router navigation, and lacks a `signalReady` mechanism. The two
  can coexist for element-level transitions, but the navigation orchestration layer must
  remain as-is.
- Swap `TransitionLink` or `useTransitionRouter` calls for plain `<Link>` or `useRouter`.
  This silently breaks transitions.

---

## 6. Style System & Tailwind Usage

### Layered architecture

Styling is being refactored into four layers:

1. **theme** – raw tokens only (CSS variables defined in `theme.css`).
2. **system** – reusable primitives (typography scale, layout utilities, surfaces) located
   under `src/styles/system/`.
3. **components** – multi-use patterns in `components.css` (e.g. glass cards, buttons).
4. **utilities** – small escape helpers in `utilities.css`.

Agents should **preserve this direction** and document any deviations.

### Styles directory

Primary styling lives in `src/styles/` with the following key files:

- `base.css`
- `globals.css`
- `theme.css`
- `system/*.css` (effects.css, gradients.css, layout.css, motion.css, surfaces.css, typography.css)
- `components.css`
- `utilities.css`
- `keyframes.css`, `vt-keyframes.css`, `vt-styles.css`, `vt-utilities.css` for view transition animations

### Tailwind config & class usage

Tailwind is configured in CSS-first mode. Classes must be **statically detectable**. Avoid any
runtime/generated class names or template strings like `` `text-${size}` ``. Use static
class strings or `cn()` combinations.

### Class composition with `cn()`

Patterns may span multiple arguments, ternaries, and props. Example:

```tsx
className={cn(
  "flex items-center gap-3",
  isActive && "text-accent-blue",
  isFocused && "ring-2 ring-accent-cyan"
)}
```

Do not assume class clusters reside on one line or inside a single string.

### Styling patterns to centralise

Common clusters include:

- **Typography:** `font-urbanist text-2xl font-bold text-chrome-silver`, etc.
- **Layout:** `flex items-center gap-3`, `grid grid-cols-1 md:grid-cols-2`.
- **Glass surface:** `rounded-2xl bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px] border border-chrome-silver/[0.08]`.
- **Overlays:** gradient gleams, noise textures, reflection highlights.

Agents should refactor duplicates into semantic utilities or components.

---

## 7. Existing Design System Components

The following primitives already exist and must not be broken:

- `GlassSurface`
- `Button` (including variants/link button)
- `TextBlock`
- `SectionHeader`
- `Title`

Study these before creating new abstractions.

---

## 8. Refactor Principles & Safety Rules

1. **Preserve visual appearance.**
2. **Prefer incremental changes; avoid large rewrites.**
3. **Centralise repeated patterns.**
4. **Avoid unnecessary abstractions; prefer composable primitives.**
5. **When automating replacements, validate regex on sample results first.**
6. **Always run build, lint, typecheck, and `pnpm e2e` before finalising.**

### Agents must never:

- Rewrite major components without justification.
- Change visual design intentionally.
- Introduce breaking API changes.
- Rename tokens arbitrarily.
- Remove classes without verifying their usage.

---

## 9. Testing & Visual Regression

Visual regression is mandatory. The `e2e/vrt.spec.ts` file lists snapshot routes:

- `/`
- `/about`
- `/contact`
- `/projects/magazine`
- `/projects/timeline`
- `/projects/timeline/tokensite`
- `/projects/cards`
- `/projects/cards/tokensite`

Run `pnpm e2e` after any styling or layout changes. If tests fail:

1. Inspect visual diffs.
2. Determine if the change is intentional and safe.
3. Revert or adjust accordingly.

---

## 10. Code Conventions & Best Practices

### Naming & exports

- **Files:** camelCase for most modules; lowercase for pages/layouts (page.tsx, layout.tsx, default.tsx).
- **Components:** PascalCase, named exports preferred.
- **Hooks:** camelCase, start with `use`.
- **Types:** PascalCase, use `type` unless extending is required.
- Prefer named exports; default exports only where Next.js requires them.

### Import order

1. React (e.g. `import { useState } from 'react';`)
2. External libraries (`lucide-react`, `motion/react`, etc.)
3. Types (`import type {...} from '@/types';`)
4. Utilities (`cn`, `useTransitionRouter`) from `@/lib`
5. Components (`@/components`)
6. Relative/local imports last.

### TypeScript

- Strict mode enforced.
- Explicit types on props, returns, complex objects.
- Extract reused types to dedicated files.

### Comments

- Minimal and self-documenting code preferred.
- Use brief comments for non-obvious logic or pitfalls only.

### Component organization

- **Colocation:** Place single-consumer components with their consumer unless they exceed ~50
  lines or are clearly shareable.
- **Shared components:** Live in `/components`.
- **Route-specific components:** Inside `_components/` directories under each route.
- **Utilities/logic:** Go in `lib/` or `app/projects/_lib` for project-specific data.

### No inline `style` for transitions

Except for `viewTransitionName` values, styling should use Tailwind classes only.
No CSS modules or styled-components.

### Data fetching

- Use `getProjects()` and `getProject(slug)` only. They are synchronous over a static data
  module – no async/server calls or API routes.
- When needing both a single project and the full list, fetch in parallel:
  ```ts
  const [project, allProjects] = await Promise.all([getProject(slug), getProjects()]);
  ```

### State management

- Prefer local `useState`, refs, or URL state. No global state libraries.

---

## 11. Common Patterns & Solutions

### Responsive breakpoints

Mobile-first approach; typical utilities:

```typescript
className = 'block md:hidden'; // Mobile only
className = 'hidden md:block'; // Desktop only
className = 'hidden lg:block'; // Large desktop only
className = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
```

### Spacing

Use `gap-*` for flex/grid spacing; avoid spreading margins. Common gaps: `gap-6` (1.5rem), `gap-8` (2rem).

### Images

- Always use `FallbackImage` for content images; supply a `fallback` prop.
- Use Next.js `Image` with appropriate `sizes`.
- Provide gradient fallbacks for broken images.

### Transitions & animations

Native View Transition API for navigations; Framer Motion used for complex 3D transforms.
Avoid layout shifts. Test at 60fps.

### Performance

- Route-based code splitting is automatic.
- Lazy-load large components if needed.
- Defer noncritical JS; transitions have priority.

---

## 12. Working with the Project

### Starting dev

```bash
pnpm install
pnpm dev
```

### Key commands

```bash
pnpm build              # Production build
pnpm start              # Production server
pnpm lint               # ESLint
pnpm typecheck          # TypeScript check
pnpm e2e                # Visual regression tests
```

### Adding features

1. **Read existing code and understand patterns.**
2. **Reuse or extend abstractions rather than duplicate.**
3. **Keep solutions simple; avoid over-engineering.**
4. **Type everything.**
5. **Test on multiple viewports.**
6. **Verify transitions work smoothly.**
7. **Update this document if you introduce new patterns.**

### Refactoring

1. **Extract patterns after 3+ repetitions** or when clarity improves.
2. **Prefer composition over inheritance.**
3. **Name abstractions meaningfully.**
4. **Keep files focused on one responsibility.**
5. **Use path aliases** (`@/components`, `@/lib`) for imports.

---

## 13. Communication & Code Style Preferences

### General approach

- Ask clarifying questions when uncertain.
- Propose alternatives and explain tradeoffs.
- Be concise; show code changes with diffs or snippets.

### Code style priorities

- ✅ Explicit over implicit
- ✅ Simple over clever
- ✅ Readable over DRY
- ✅ Practical over theoretical
- ✅ Performance-conscious but not premature

### Anti-patterns to avoid

- ❌ Over-engineering.
- ❌ Premature abstractions.
- ❌ Default exports (except where required).
- ❌ Magic strings/numbers.
- ❌ Tight coupling between components.
- ❌ Unnecessary complexity.

---

## 14. Version Control & History

### Commit style

- **Concise, descriptive** commit messages.
- **Atomic commits** when possible.
- **No WIP commits** on main branches.

### Project evolution highlights

Key milestones inferred from git history:

- Initial Next.js/TS/Tailwind setup and Playwright VRT addition.
- Migration to App Router and introduction of view-mode path segments (not query params).
- Implementation of custom view-transition module orchestrating `document.startViewTransition`.
- Resolution of race conditions (notably the Timeline slug bug using useParams).
- Design system refactor toward layered architecture (theme → system → components → utilities).
- Creation of initial design primitives (GlassSurface, Button, TextBlock, etc.).
- Introduction of AGENTS documentation to guide autonomous agents.

Many of these milestones correspond to the focus areas of the three original AGENTS files:

- AGENTS.0 – styling system and design-system roadmap.
- AGENTS.1 – broad app knowledge and conventions.
- AGENTS.2 – routing structure and view-transition architecture.

---

## 15. Project Goals & Context

### Goals

- Showcase projects with high visual quality.
- Demonstrate technical skill through implementation.
- Create memorable, unique user experience.
- Maintain clean, maintainable codebase.

### Target Audience

- Potential employers/clients
- Technical recruiters
- Fellow developers

### Design Philosophy

- **Clean and professional** over flashy.
- **Functional beauty** – aesthetics serve UX.
- **Performance matters** – smooth > feature-rich.
- **Accessible** but not at cost of design vision.

---

## 16. Questions to Ask When Uncertain

1. **Scope:** "Is this a one-off or will it be reused?"
2. **Performance:** "Will this affect transition smoothness?"
3. **Mobile:** "How should this work on mobile?"
4. **Alternatives:** "Would X approach be simpler?"
5. **Edge cases:** "What if the data is missing/malformed?"

---

## 17. Additional Notes & Tips

- When editing CSS/utility classes, run visual tests to catch regressions early.
- Keep an eye on the `transitioning` dataset attribute on `<html>`; it's used by the
  transitions module for styling/logic.
- If you discover repository information not yet documented, add it here.
- The `/docs` folder contains supporting guides; review during architect stage.
- **Guiding principle:** safety > maintainability > abstraction > automation.

---

## 18. Changelog

- **2026-03-05:** Created merged AGENTS.md by consolidating AGENTS.0, AGENTS.1, and AGENTS.2;
  updated routing terminology (`grid` → `cards`, `editorial` → `magazine`); added project evolution
  section; clarified critical race-condition warnings and view-transition rules.

---

_End of document. Last reviewed: March 5, 2026._
