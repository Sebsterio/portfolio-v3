# Style Audit

Gate A audit of the live repo state for the style-system refactor. This report is derived from code and config currently present in the repository.

All recurrence counts, owner proposals, and candidate statuses here are provisional and must be revalidated against the live repo before any implementation gate begins.

## Scope

Primary inspection targets:

- `src/styles/**`
- `src/components/**`
- `src/app/projects/**`
- `e2e/tests/vrt.spec.ts`
- files using `cn()`

## Style File Tree

```text
src/styles/
|-- base.css
|-- components.css
|-- globals.css
|-- keyframes.css
|-- theme.css
|-- utilities.css
|-- vt-keyframes.css
|-- vt-styles.css
|-- vt-utilities.css
`-- system/
    |-- effects.css
    |-- gradients.css
    |-- layout.css
    |-- motion.css
    |-- surfaces.css
    `-- typography.css
```

## globals.css Import Order

Current `src/styles/globals.css` order:

1. `@import 'tailwindcss';`
2. `@import 'tw-animate-css';`
3. `@import './theme.css';`
4. `@import './base.css';`
5. `@import './system/gradients.css';`
6. `@import './system/typography.css';`
7. `@import './system/effects.css';`
8. `@import './system/surfaces.css';`
9. `@import './system/motion.css';`
10. `@import './system/layout.css';`
11. `@import './components.css';`
12. `@import './utilities.css';`
13. `@import './keyframes.css';`
14. `@import './vt-styles.css' layer(base);`
15. `@import './vt-keyframes.css' layer(base);`
16. `@import './vt-utilities.css';`

Gate A conclusion: preserve this order unless a specific repo-proven conflict requires a narrow change. No evidence currently supports a broad relayering pass.

## Actual Role Of Each Style File

| File | Imported | Actual role in repo | Current status |
| --- | --- | --- | --- |
| `src/styles/theme.css` | yes | runtime vars plus `@theme` tokens for fonts, colors, background-image tokens, animation tokens | active |
| `src/styles/base.css` | yes | `@layer base` font vars, body defaults, border-color compatibility shim | active |
| `src/styles/components.css` | yes | shared component compositions plus magazine-only legacy classes | active but mixed ownership |
| `src/styles/utilities.css` | yes | commented-out placeholder ideas only | imported but effectively dead |
| `src/styles/keyframes.css` | yes | non-view-transition keyframes referenced by theme animation tokens | active |
| `src/styles/vt-styles.css` | yes | view-transition slot rules and base VT vars | active |
| `src/styles/vt-keyframes.css` | yes | view-transition keyframes | active |
| `src/styles/vt-utilities.css` | yes | `@utility` helpers for `view-transition-name` | active |
| `src/styles/system/gradients.css` | yes | gradient and reflection primitives, text-gradient helpers | active |
| `src/styles/system/typography.css` | yes | semantic typography and text-emphasis helpers | partially active, mostly unused |
| `src/styles/system/effects.css` | yes | glow, accent shadows, reflection animation, soft background helpers | partially active |
| `src/styles/system/surfaces.css` | yes | glass surfaces, rounded scales, shadows, backdrop primitives, overlays | active |
| `src/styles/system/layout.css` | yes | content container, overlay helpers, stack/cluster/container helpers | partially active |
| `src/styles/system/motion.css` | yes | no content | empty |

## Current Status Of system/*

- `system/gradients.css` is live and meaningful.
- `system/surfaces.css` is the most clearly canonical system layer today.
- `system/layout.css` has a useful core (`content-container`, `overlay`, `overlay-full`) plus several unused helpers.
- `system/effects.css` is partially canonical, but usage is narrow.
- `system/typography.css` is aspirational in parts: many classes are defined but only a small subset is actually used.
- `system/motion.css` is empty and should not drive any implementation assumptions.

## Typography Primitives Already Present

Defined in `system/typography.css`:

- `display-1`, `display-2`, `display-3`
- `heading-1`, `heading-2`, `heading-3`
- `body-lg`, `body-md`, `body-sm`, `body-xs`
- `ui-button`, `ui-label`, `ui-meta`
- `text-primary`, `text-secondary`, `text-tertiary`, `text-muted`, `text-subtle`
- `text-strong`, `text-bold`, `text-accent`, `text-gradient`

Observed active consumers:

- `TextBlock` uses `body-lg`, `body-md`, `text-primary`, `text-tertiary`, `text-bold`
- `LabeledValueRow` uses `gradient-text gradient-primary`, not `text-gradient`
- `SectionHeader` uses `heading-section` from `components.css`, not `heading-*`
- `Title` still uses raw utility clusters, not `display-*` or `heading-*`

Gate A implication: typography definitions are not enough to treat them as canonical migration targets. Usage truth must win.

## Surface / Glass / Overlay Primitives Already Present

Clearly active shared primitives:

- `rounded-glass-1`, `rounded-glass-2`, `rounded-glass-3`
- `surface-glass-1`, `surface-glass-2`, `surface-glass-3`
- `shadow-glass-0`, `shadow-glass-1`, `shadow-glass-2`
- `backdrop-glass-0`, `backdrop-glass-1`, `backdrop-glass-2`, `backdrop-glass-3`
- `overlay`, `overlay-full`
- `gradient-corner-tr`, `gradient-corner-tl`, `gradient-corner-br`, `gradient-corner-bl`
- `gradient-primary`, `gradient-primary-soft`
- `gradient-gleam-blue`, `gradient-gleam-cyan`
- `reflection-diagonal`
- `noise-overlay`
- `top-edge-glow`
- `reflection-animated`

Primary consumers:

- `GlassSurface`
- `GlassCard`
- `ShowcaseCard`
- `TimelineProjectContentCard`
- `AppHeader`
- parts of `CardsProjectPage`

## Duplicated, Dead, And Conflicting Definitions

No cross-file duplicate class definitions were found in `src/styles`.

Dead or effectively dead areas:

- `src/styles/system/motion.css` is empty.
- `src/styles/utilities.css` contains only commented-out placeholder definitions.
- Unused typography helpers include `display-*`, `heading-*`, `ui-*`, `text-secondary`, `text-muted`, `text-subtle`, `text-strong`, `text-accent`, `text-gradient`.
- Unused layout helpers include `stack-*`, `cluster-*`, `container-section`, `container-wide`.

Drift and unresolved issues:

- `interactive-lift` is referenced in `src/components/Button/styles.ts` and is undefined anywhere in repo CSS.
- `src/components/typography/Title.tsx` contains an existing inline note that the `projects` normal gradient styles are not being picked up.
- `components.css` currently owns both shared component patterns and magazine-only route-specific legacy, which blurs ownership.

## Top Repeated JSX Utility Clusters

These counts come from the current repo state and remain provisional until rechecked in Gate A execution.

| Cluster | Count | Files / components | Notes |
| --- | ---: | --- | --- |
| `text-sm md:text-base leading-relaxed text-chrome-silver/75` | 6 | `MagazineSectionA/B/C/D/E/Multi` | exact, route-local magazine body text |
| `font-urbanist text-2xl font-bold text-chrome-silver` | 5 | `CardsCollectionPage`, `TimelineCollectionPage`, `TimelineProjectContentCard` | exact, mixed project-title/section-heading usage |
| `font-urbanist text-lg font-bold text-chrome-silver` | 4 | `TimelineProjectPage`, `GlassCard` | exact, mixed card-title/section-subheading usage |
| `flex items-center gap-3` | 4 | `TimelineCollectionPage`, `TimelineProjectPage`, `components.css` via `heading-section` | exact but mixed semantics |
| `text-xs text-accent-cyan font-dm-sans` | 3 | `CardsCollectionPage`, `TimelineProjectPage`, `TimelineProjectSidebarItem` | exact, likely metadata family |
| `text-chrome-silver/80 leading-relaxed` | 6 | `TimelineProjectContentCard`, `TimelineProjectPage` | near-exact family because size/structure varies around it |
| `flex flex-wrap gap-2` | 3 | `ProjectTags`, `TechCategoryGroup`, `TechTags` | exact layout cluster but mixed visual purpose |
| gradient CTA family | 3 variants | `TimelineProjectContentCard`, `TimelineProjectPage`, `CardsProjectPage` | near-exact split family, not automation-safe yet |
| tag-pill family | 2 main variants | `ProjectTags`, `TechPill` | near-exact, different density and meaning |

## Risks To Tailwind Static Detection

- `CardsProjectPage` uses a static `Record<string, string>` for gradient classes. The strings are still literal and detectable today, but any refactor must avoid generating class names dynamically.
- Several components split classes across `cn()` arguments or arrays, which makes naive regex replacement unsafe.
- Magazine sections use template literals that append conditional classes such as `mb-6`; these are not good automation targets without manual review.
- `Title` already includes a note that one gradient class path is not being picked up, so typography refactors there need verification.
- Any refactor must keep Tailwind-visible class strings static and literal.

## High-Risk Exception Territory

Do not treat these as normal replacement candidates:

- dynamic `viewTransitionName`
- `transformStyle`
- `backfaceVisibility`
- `WebkitBackfaceVisibility`
- DOM-measured height assignment
- 3D depth transforms
- backdrop styles coupled to VT behavior

Primary files:

- `src/app/projects/cards/_components/CardsProjectPage.tsx`
- `src/app/projects/timeline/_components/TimelineProjectPage.tsx`
- `src/components/ui/GlassSurface.tsx`

## Proposed Ownership Boundaries

### theme

- Raw CSS variables and `@theme` tokens only.
- No semantic component classes.

### system

- Cross-route primitives with stable meaning.
- Live examples already fitting this boundary: glass surfaces, overlay helpers, gradient helpers, `content-container`.
- Typography should move here only when real shared usage is proven, not just because a class already exists in `system/typography.css`.

### components

- Shared compositions that bundle multiple system primitives into recognizable app patterns.
- Magazine-only legacy patterns stay here until or unless later evidence proves they deserve promotion.

### utilities

- Small escape hatches only.
- Current file is effectively dead; do not use it as a dumping ground for pattern libraries.

## Validation Baseline

- `pnpm lint`: passes
- `pnpm typecheck`: passes
- `pnpm build`: offline font fetch failure from `next/font/google`
- `pnpm e2e`: requires an already-running local server on `http://localhost:3000`

Gate A conclusion: the repo already has a partial design system, but the most stable truth is in surfaces and a few component anchors, not in the full semantic typography/layout scaffolding currently present in CSS.
