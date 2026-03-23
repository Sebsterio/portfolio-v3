# Task: Theme-Decoupled Token System — COMPLETED

## Status: ✅ Complete

## What was done

### theme.css — complete rewrite
- :root holds only --theme-* palette variables (overridable per-theme)
  --theme-accent-1, --theme-accent-2, --theme-accent-2-vivid
  --theme-neutral-1 through --theme-neutral-4
  --theme-surface
  --color-project-* (unchanged)
- @theme tokens are pure var() aliases — no oklch values duplicated
  --color-accent: var(--theme-accent-1)    ← semantic brand role
  --color-accent-1/2: var(--theme-accent-*)  ← palette access
  --color-neutral-1/2/3/4: var(--theme-neutral-*)
  --color-white/black: direct oklch (absolute, never change)
- Dropped from @theme: accent-sky, accent-purple (only gradient midpoints),
  accent-cyan-bright (no Tailwind utility existed — moved to :root as --theme-accent-2-vivid)

### Typography, base, effects, surfaces, gradients, decorative, components — token renames
- accent-blue → accent-1 throughout
- accent-cyan → accent-2 throughout
- chrome-silver/light/mid/dark → neutral-1/2/3/4 throughout
- --glass-surface → --theme-surface in surfaces.css
- --color-accent-cyan-bright → --theme-accent-2-vivid in decorative.css

### Gradient simplifications
- gradient-primary-soft: dropped purple/20 stop (accent-purple gone) → 2-stop
- gradient-title-highlight: dropped sky midpoint (accent-sky gone) → 2-stop accent-1→accent-2

### Button/styles.ts
- chrome-silver → neutral-1 (missed in previous semantic layer pass)

## Validation
- pnpm lint — clean
- Grep for all old token names — zero live matches

## Net result
To define a new theme: redefine --theme-accent-1, --theme-accent-2,
--theme-neutral-1 through --theme-neutral-4, and --theme-surface in :root
(or a scoped selector). Nothing else needs to change.
