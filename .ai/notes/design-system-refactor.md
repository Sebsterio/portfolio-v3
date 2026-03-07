# Design System Refactor Playbook (Tailwind v4, CSS-first)

## High-level objective
Centralize repeated styling into a pragmatic design system with minimal manual edits and **no visual changes**.
Prefer: codemods, safe regex, repo-wide search/replace, and incremental commits.

We already have **Playwright full-page VRT** enabled: run `pnpm e2e`.

## Ground rules (non-negotiable)
- No intentional UI/UX redesign.
- Avoid manual per-component tweaks unless unavoidable.
- Prefer refactoring repeated *clusters* into semantic classes, but keep final composition in JSX for now.
- Tailwind v4 must still statically see the relevant classes (avoid dynamic string generation).
- Always run:
  - `pnpm lint` (or `pnpm -s lint`) if available
  - `pnpm typecheck` (or `pnpm -s typecheck`)
  - `pnpm build`
  - `pnpm e2e` (Playwright VRT)
  after meaningful changes.

## Important nuance: clusters are not ordered and may be split
Do NOT assume class clusters appear:
- in a fixed order
- on the same line
- in a single string literal
- in the same file

They may be:
- spread across `cn()` arguments / arrays
- combined via props (`className` passed down)
- conditionally appended
- composed via a base component (e.g. GlassSurface)

Therefore:
- prefer **AST-aware codemods** where possible
- otherwise use **tested regex** and **narrow replacements**
- when clustering is required, match by:
  - “contains” logic (search for multiple tokens in any order)
  - or safe regex (only if validated on a sample set first)

## Phase 0 — Discover current styles structure (required first step)
Because the repo changed incrementally and prior guidance moved files around, do NOT trust documentation.

Tasks:
1) Inspect `src/styles/**` and produce a report:
   - file tree
   - what each file contains (tokens vs system vs components vs utilities)
   - what is imported by `src/styles/global.css` and in what order
2) Identify “empty / dead / duplicated” files (example: `components.css` may currently be empty).
3) Identify conflicting definitions (duplicate class names, e.g. `text-primary` defined twice).
4) Identify “system folder” status: is `src/styles/system/*` in use and imported?

Deliverable: `docs/style-audit.md` with findings + proposed fixes.

## Canonical spec for where things belong
Use this as the target architecture (but adjust to reality with minimal disruption):

### src/styles/theme.css
- Raw design tokens as CSS variables:
  - colors (including `--*-rgb` channels if needed)
  - radii scale if tokenized
  - shadow tokens if represented as vars
  - background-image tokens that are stable

### src/styles/system/*.css
- “System primitives”: composable semantic classes used widely:
  - typography scale (`typography.css`)
  - layout primitives (`layout.css`) if needed
  - (optional) surfaces if you decide they are cross-app primitives

### src/styles/components.css
- Component-pattern compositions (e.g. “section header”, “status dot”, “project decorative text”).
- Also OK to place the “glass decoration system” here if it’s clearly an app-level pattern.

### src/styles/utilities.css
- Small escape hatches and rare helpers (e.g. `.content-container`, tiny `glow-*`).
- Must remain small; do not dump pattern libraries here.

## global.css import order (how to decide)
The correct order depends on how Tailwind v4 layers are used, but conceptually:

1) Tailwind base import(s)
2) Theme tokens (variables) that other CSS consumes
3) System primitives (typography/layout)
4) Base styles
5) Component pattern styles
6) Utilities / escape hatches
7) Keyframes + view-transition utilities where appropriate

But: **use actual layering rules** (`@layer base|components|utilities`) to ensure predictable precedence.
If files don’t declare layers, import order becomes the fallback — and matters.

Deliverable: Codex should propose the final `global.css` order and/or add `@layer` wrappers to make it robust.

## Phase 1 — Typography (focus area)
We already ran global searches for typography-related utilities:
- `font-*` usage concentrated in `font-urbanist` and `font-dm-sans`
- repeated combos include: `uppercase tracking-*`, `leading-relaxed`, common text sizes
- repeated headings: `font-urbanist text-2xl font-bold` etc.
- current `TextBlock`, `Button`, `SectionHeader`, `Title` contain canonical patterns.

### Typography system requirements
- Provide a complete but minimal scale covering current usage:
  - display / headings / body / UI labels / meta
- Avoid duplicates and naming collisions.
- Migration must minimize manual edits:
  - Replace frequent clusters with semantic classes using codemods or safe search/replace.
  - When clusters vary (e.g. sizes change), migrate only when confident.

Acceptance:
- Typography CSS has no collisions.
- No visual regressions in VRT (`pnpm e2e`).

## Phase 2 — Surfaces / glass / gradients
We already centralized many glass-like patterns around `GlassSurface`.
Next: centralize repeated decoration patterns and remove inline style objects where there is a semantic class.

Key targets:
- `ShowcaseCard`
- `ProjectContentCard` (timeline project content card)

Constraints:
- Keep composable classes in JSX for now (no single mega utility yet).
- Prefer pseudo-elements for overlays only if it reduces JSX repetition and is safe with Tailwind v4 + VRT.

Acceptance:
- fewer inline style props
- same hover/shine behavior
- VRT passes

## Phase 3 — STYLEMAP and codemod safety
Create a `docs/STYLEMAP.md` with:
- “Find patterns” (multi-token searches and/or regex)
- “Replacement recipes”
- “Exceptions” (places where not safe to replace)
- “Verification checklist” (pnpm build + pnpm e2e)

The STYLEMAP must be generated from the repo state, not from memory.

## Implementation approach (Codex)
Codex should:
1) Run Phase 0 audit first.
2) Propose a minimal set of moves/edits that result in the canonical spec.
3) Implement in small commits:
   - audit + structure fixes
   - typography cleanup
   - typography migration
   - component refactors
4) After each commit: run checks including `pnpm e2e`.
5) Output:
   - changed files list
   - replacement maps
   - before/after examples
