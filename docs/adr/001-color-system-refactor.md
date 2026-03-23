# ADR 001 — Color System Refactor

**Status:** Accepted | **Branch:** dev

## Context

Tailwind v3-era codebase. Every color needed two parallel variables (`--*-rgb` for CSS alpha, `--color-*` for Tailwind). Colors were named by appearance (`accent-blue`, `chrome-silver`). No semantic tokens for accent roles. SVG hardcodes. Background components not on the token system.

## Decisions

**1. Three-layer architecture**
```
:root   --theme-*    oklch values — only layer that changes per theme
@theme  --color-*    var() aliases → :root — generates Tailwind utilities
components/CSS       reference @theme tokens only, never :root directly
```
This constraint ensures a full theme swap is a single `:root` override block.

**2. Drop `*-rgb` pattern**
Replaced with `color-mix(in srgb, var(--color-*) N%, transparent)`. `in srgb` preserves existing rendered output. Tailwind v4 resolves opacity modifiers the same way internally.

**3. Role-neutral palette names**
`accent-blue/cyan → accent-1/2`, `chrome-* → neutral-1/2/3/4`. Intentionally generic — future themes may not be blue or grey. `accent-sky` and `accent-purple` dropped (were gradient midpoints only; simplified to 2-stop gradients, no perceptible change). `accent-cyan-bright` has no Tailwind utility — kept in `:root` only as `--theme-accent-2-vivid`, consumed raw by `decorative.css`.

**4. `--color-accent` semantic alias**
Single remapping point for the brand/interactive color. Components using `text-accent`, `bg-accent`, `border-accent` respond to theme changes. Components using raw `accent-1` by design are documented as intentional raw-palette uses.

**5. `@utility` with direct CSS properties — not `@apply`**
`@apply` on Tailwind-generated tokens inside `@utility` silently produces empty rules in Tailwind v4. All semantic text utilities (`text-primary` → `text-subtle`, `text-label`) use `color: var(--color-*)` directly.

**6. Decorative hover: `.group:hover .class`, not `.class:hover`**
Decorative text has `pointer-events-none`, so self-hover never fires. All `decorative-outline-*-hover` classes are activated by a `.group` ancestor.

**7. Project brand colors are `:root`-only, not `@theme`**
`--color-project-*` values are per-project identity colors for editorial glow shadows. Named by project, not role. They sit in `:root` so they can be overridden per-theme independently, but they generate no Tailwind utilities (consumed only by `.shadow-editorial-*` in `effects.css`).

## Adding a theme
Define these in a selector (e.g. `[data-theme="warm"]`) in `:root` or a themes CSS file:
`--theme-accent-1`, `--theme-accent-2`, `--theme-neutral-1/2/3/4`, `--theme-surface`.
Optionally override `--theme-accent-2-vivid` and `--color-project-*`. Nothing else changes.

## Known deferred work
`--background-image-gradient-*` tokens in `@theme` still contain hardcoded hex values. These are per-project brand assets, not theme palette — separate concern.

---

## Addendum — Effects & Gradients Cleanup

**Enforced `glow-` vs `shadow-` naming split.** `glow-*` = zero-offset radial. `shadow-*` = offset directional. Previously mixed.

**Renames:** `shadow-dot-active/inactive → glow-dot-active/inactive`, `shadow-brand-underline → glow-brand-underline`, `shadow-atmosphere-1/2 → glow-atmosphere-1/2`, `shadow-particle-accent/neutral → glow-particle-accent/neutral`. `shadow-status-dot` dropped (was exact duplicate of `glow-accent-lg`).

**`bg-surface-glass-*` renamed to `bg-fill-*`** to eliminate collision with `glass-surface-*` (glass material system).

**Class relocations:** `glass-glint/glass-glint-active` → `surfaces.css` (glass interaction belongs with glass system). `focus-ring` → `utilities.css` (interaction behaviour, not a visual effect). `text-glow-editorial` → `effects.css` (glow belongs with glow scale).

**`decorative-outline-soft` → `decorative-outline-mid`** to disambiguate from `decorative-outline-faint` (two near-synonyms at 8%/10%).

**`gradient-title-highlight` → `gradient-accent-sweep`** to remove use-case encoding from the gradient layer.

**Alpha consolidation in effects.css:** ambient glows at 20%, standard at 40%, strong at 50–60%. Removed arbitrary intermediate steps (25%, 30%, 35%, 55%).

