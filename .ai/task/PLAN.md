# Plan: Color System Modernization

## Steps

### Step 1 — Verify oklch values (no file changes)

Before touching code, confirm the two non-canonical oklch values are visually correct:
- `accent-cyan-bright` (#00d9ff): render a swatch with `oklch(0.838 0.144 217)` in browser devtools
- `glass-surface` (#0a0a0e): render swatch with `oklch(0.055 0.003 264)`

If either value shifts perceptibly from the current hex, adjust before proceeding.

---

### Step 2 — Restructure `theme.css`

Restructure into three logical blocks:

**Block A — Theme override points (`:root`)**
Only variables that need to be overridable at runtime (for future theming).
- `--glass-surface`: oklch value (renamed from `--glass-surface-rgb`)
- Project brand color variables, renamed `--color-project-{name}` and expressed as oklch

**Block B — `@theme` static tokens**
All `--color-*` tokens expressed as direct `oklch(...)` values. No `var()` indirection.
- Rename `--color-editorial-cyan` → `--color-accent-cyan-bright`
- Remove all `--color-*: rgb(var(--*-rgb))` patterns

**Block C — Background images and animations (unchanged)**

Changes summary:
- Remove: all `--*-rgb` entries from `:root`
- Remove: `--color-editorial-cyan` from `@theme`
- Add: `--color-accent-cyan-bright: oklch(0.838 0.144 217)` to `@theme`
- Rename: `--shadow-*-rgb` → `--color-project-*` in `:root`, expressed as oklch
- Rename: `--glass-surface-rgb` → `--glass-surface` in `:root`, expressed as oklch
- Update: all `--color-*: rgb(var(...))` → direct `oklch(...)` values
- Add: section comment documenting `:root` as "runtime override points"

---

### Step 3 — Migrate `effects.css`

Mechanical find-and-replace on all `@utility` and plain class definitions.

Pattern: `rgb(var(--{name}-rgb) / {alpha})` → `color-mix(in srgb, var(--color-{name}) {alpha*100}%, transparent)`

Affected utilities/classes:
- `glow-accent-sm/md/lg`
- `shadow-accent-md/lg` and all other `shadow-*` @utilities
- `.shadow-editorial-bounce/meco/tt/ebit/ao/freelance` (reference project color tokens)
- `bg-accent-soft`, `bg-surface-glass-*`
- `gradient-reflection-horizontal`, `gradient-reflection-horizontal-strong`
- `gradient-brand-logo`, `gradient-brand-underline`
- `gradient-atmosphere-chrome`, `gradient-atmosphere-metallic-orb`, `gradient-atmosphere-grid`
- `gradient-reflection-diagonal`

---

### Step 4 — Migrate `surfaces.css`

Same pattern. Affected:
- `glass-surface-1/2/3` background, border-color, curvature values
- `glass-elevation-1/2` elevation values
- `.glass-reflection`, `.glass-edge-glow`, `.glass-panel-accents`

Note: `--glass-surface` is now a direct CSS variable (set in `:root`) referencing an oklch color.
The `glass-surface-*` utilities will use `color-mix()` against it:
```css
background: color-mix(in srgb, var(--glass-surface) 35%, transparent);
```

---

### Step 5 — Migrate `decorative.css`

Four targeted replacements:
- `.decorative-outline-editorial-hover:hover` — two `--editorial-cyan-rgb` refs → `--color-accent-cyan-bright`
- `.decorative-outline-editorial-strong-hover:hover` — two refs
- `.decorative-outline-editorial-soft-hover:hover` — one ref
- `.text-glow-editorial` — one ref

The `-webkit-text-stroke` syntax doesn't use alpha, so direct `var(--color-accent-cyan-bright)`.
The `text-shadow` and `text-stroke` values with alpha use `color-mix()`.

---

### Step 6 — Migrate `gradients.css`

Remaining raw `rgb(var(...))` usages in the commented-out block need no action (they're dead code).
Active utilities: `gradient-brand-logo`, `gradient-brand-underline`, `gradient-atmosphere-*`, reflection utilities.

---

### Step 7 — Audit `components.css`

Search for any residual `-rgb` patterns. Based on review, none expected — but confirm.

---

### Step 8 — Validation

```
pnpm lint
```

Search for residual `-rgb` pattern:
```
grep -r "\-rgb" src/styles/
```

Expected: zero matches (except `--glass-surface` and project color `:root` vars, which are now renamed).

---

### Step 9 — Update documentation in CSS headers

- `theme.css`: update section comments to describe new structure
- `surfaces.css`: add explicit comment on `--glass-surface` as a runtime override point
- `decorative.css`: update migration table to reflect `editorial-cyan` → `accent-cyan-bright`
- `effects.css`: update migration table

---

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| `oklch` value for `accent-cyan-bright` renders noticeably different | Low | Verify in browser (Step 1) before committing |
| `color-mix()` produces different alpha rendering vs `rgb()` / `srgb` | Very low | `in srgb` is equivalent to the alpha-channel approach; test visually |
| Missed `-rgb` usage somewhere | Low | Step 8 grep catches any stragglers |
| Background images in `@theme` break (they use hard-coded hex not `*-rgb`) | None | Background images don't use `*-rgb` variables |

## Validation

`pnpm lint` after Steps 2, 5 (or after each step if preferred).
Visual spot-check in browser on home and project pages after Step 6.
