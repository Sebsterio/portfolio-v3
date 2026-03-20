# Task: Color System Modernization — COMPLETED

## Objective

Modernize the CSS color system from Tailwind v3 legacy patterns to idiomatic Tailwind v4 / modern CSS.

## Status: ✅ Complete

## What was done

### theme.css
- Restructured into two explicit blocks: `:root` (runtime override points only) and `@theme` (static tokens)
- All `@theme` color tokens now use direct `oklch()` values — no `var(--*-rgb)` indirection
- `--editorial-cyan-rgb` / `--color-editorial-cyan` retired; replaced with `--color-accent-cyan-bright` in the accent scale
- `--shadow-*-rgb` project variables renamed to `--color-project-*` and moved to a dedicated `:root` section with intent comments
- `--glass-surface-rgb` renamed to `--glass-surface` and documented as an intentional theme override point

### effects.css, surfaces.css, gradients.css, decorative.css, components.css
- All `rgb(var(--*-rgb) / alpha)` expressions replaced with `color-mix(in srgb, <token> <N>%, transparent)`
- All references to `--editorial-cyan-rgb` updated to `--color-accent-cyan-bright`
- All references to `--shadow-*-rgb` updated to `--color-project-*`
- CSS file headers updated to reflect new patterns and note migration history

## Validation
- `pnpm lint` — clean
- PowerShell grep for `rgb(var(` — zero live hits (one intentional prose reference in a gradients.css doc comment)
- No component TSX files changed
- No CSS class names changed
- No `@theme` token names changed (except `editorial-cyan` → `accent-cyan-bright`, which had zero component usage)
