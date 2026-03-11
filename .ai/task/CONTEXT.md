# CONTEXT

## Current Styles Architecture

`src/styles/globals.css` currently imports styles in this order:

1. `tailwindcss`
2. `tw-animate-css`
3. `theme.css`
4. `base.css`
5. `system/gradients.css`
6. `system/typography.css`
7. `system/effects.css`
8. `system/surfaces.css`
9. `system/motion.css`
10. `system/layout.css`
11. `components.css`
12. `utilities.css`
13. `keyframes.css`
14. `vt-styles.css` with `layer(base)`
15. `vt-keyframes.css` with `layer(base)`
16. `vt-utilities.css`

Current guardrail: preserve this import order unless Gate A finds a specific conflict that requires a narrow change.

## Layer And File Reality

- `base.css` uses `@layer base` and defines root font vars plus global body defaults and border-color compatibility styles.
- `components.css` uses `@layer components` and currently mixes two concerns:
  - shared app-level compositions such as `heading-section`, `status-dot`, `project-image`, and `tech-tag`
  - magazine-only legacy patterns such as `project-decorative-*`, `deco-circle`, and `deco-line`
- `theme.css` holds runtime variables and `@theme` tokens for colors, fonts, background-image tokens, and animation tokens.
- `system/gradients.css`, `system/surfaces.css`, and `system/layout.css` are live and imported.
- `system/motion.css` is imported but empty.
- `utilities.css` is imported but contains only commented-out placeholder ideas, so it is effectively dead space right now.
- Most files in `system/*` are not wrapped in explicit layers and therefore rely on import order for precedence.

## Style Anchors Already Present

- `GlassSurface` is the main shared surface shell: rounded variants plus default `surface-glass-2 backdrop-glass-2 shadow-glass-0`.
- `GlassCard` and deprecated `GlassCard1` build on `GlassSurface` and already centralize part of the glass-card composition.
- `Button` centralizes shared button shell and primary/secondary variants, but includes a drift reference to undefined `interactive-lift`.
- `TextBlock` is the only active consumer of `body-lg`, `body-md`, `text-primary`, `text-tertiary`, and `text-bold`.
- `SectionHeader` is the only active consumer of `heading-section` and `status-dot`.
- `Title` remains a typography anchor for hero/page/projects headings, but its project variant includes an existing inline comment about styles not being picked up.
- `ShowcaseCard` is the clearest shared decorative glass surface outside the project routes.
- Project detail surfaces are split across:
  - `TimelineProjectContentCard`
  - `TimelineProjectPage`
  - `TimelineCollectionPage`
  - `CardsCollectionPage`
  - `CardsProjectPage`

## Live Drift And Dead Space

- `interactive-lift` is referenced in `src/components/Button/styles.ts` and is not defined anywhere under `src/styles` or `src`.
- `system/typography.css` defines many semantic classes that are currently unused, including `display-*`, `heading-*`, `ui-*`, and several text emphasis helpers.
- `system/layout.css` defines helpers such as `stack-*`, `cluster-*`, `container-*`, but most are currently unused.
- `utilities.css` placeholder classes are commented out and not live.
- `motion.css` is empty.
- No cross-file duplicate class definitions were found in `src/styles`.

## High-Risk Areas

- `src/app/projects/cards/_components/CardsProjectPage.tsx`
  - dynamic `viewTransitionName`
  - DOM-measured height assignment via refs
  - 3D flip interaction using `transformStyle`
  - browser-specific backface styles
  - layered background cards with dynamic `transform`
- `src/app/projects/timeline/_components/TimelineProjectPage.tsx`
  - computed height on `TimelineLine`
  - inline `viewTransitionName` on mobile cards
- `src/components/ui/GlassSurface.tsx`
  - existing note that backdrop glitches when the element has a view-transition name
- `src/app/_components/AppHeader.tsx`
  - inline gradient and underline styles that may be semantically movable later, but are not behavior-free enough to auto-replace in Gate A
- `src/components/StatusBadge.tsx`
  - inline `lineHeight: 'inherit'`; safe candidate status remains unresolved until a future gate

## Validation Caveats

Baseline observed during Gate A:

- `pnpm lint`: passes
- `pnpm typecheck`: passes
- `pnpm build`: on Windows Codex, sandboxed execution may fail with `spawn EPERM`; rerun unsandboxed and treat that result as authoritative
- `pnpm e2e`: requires the existing local server workflow; without a server already running on `http://localhost:3000`, Playwright fails with connection refusal

For later implementation gates:

- Use the existing validation path as-is: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm e2e`.
- Do not change Playwright config or server setup in this task.
- If `e2e` cannot run for non-refactor reasons, report that explicitly and continue with the remaining checks.
- Never update snapshots.

## Files Most Likely To Be Touched Later

Styles:

- `src/styles/system/typography.css`
- `src/styles/system/surfaces.css`
- `src/styles/system/effects.css`
- `src/styles/system/layout.css`
- `src/styles/components.css`
- `src/styles/utilities.css`

Shared anchors:

- `src/components/ui/GlassSurface.tsx`
- `src/components/GlassCard.tsx`
- `src/components/ShowcaseCard.tsx`
- `src/components/Button/styles.ts`
- `src/components/typography/TextBlock.tsx`
- `src/components/typography/Title.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/LabeledValueRow.tsx`
- `src/components/ProjectTags.tsx`
- `src/components/TechPill.tsx`
- `src/app/_components/AppHeader.tsx`

Project route surfaces:

- `src/app/projects/timeline/_components/TimelineProjectContentCard.tsx`
- `src/app/projects/timeline/_components/TimelineProjectPage.tsx`
- `src/app/projects/timeline/_components/TimelineCollectionPage.tsx`
- `src/app/projects/cards/_components/CardsCollectionPage.tsx`
- `src/app/projects/cards/_components/CardsProjectPage.tsx`
- `src/app/projects/_components/DisplayModeSwitcher.tsx`

## Gate A Revalidation Rule

All recurrence counts, owner proposals, and candidate statuses used in Gate A are provisional until they are rechecked against the live repo and recorded in `STYLEMAP`.
