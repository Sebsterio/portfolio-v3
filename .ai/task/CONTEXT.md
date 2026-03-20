# Context: Color System Modernization

## Current architecture

```
:root { --accent-blue-rgb: 59 130 246; }           ← runtime CSS variable (channels only)
@theme { --color-accent-blue: rgb(var(--accent-blue-rgb)); }  ← Tailwind token
```

Raw CSS alpha usage pattern:
```css
box-shadow: 0 0 20px rgb(var(--accent-blue-rgb) / 0.2);
```

## Why the *-rgb tier exists (and why it can go)

In Tailwind v3, the RGB-channel pattern was required for opacity modifiers (`bg-accent-blue/50`) to work.
In v4, Tailwind resolves opacity via `color-mix()` internally — no channel trick needed.

The *-rgb tier still serves one real purpose in this codebase: enabling alpha variations in *raw CSS*
(box-shadow, gradient stops, text-stroke). With modern CSS `color-mix()` available (and confirmed
in-scope), this purpose can be served directly:

```css
/* before */  rgb(var(--accent-blue-rgb) / 0.2)
/* after  */  color-mix(in srgb, var(--color-accent-blue) 20%, transparent)
```

## editorial-cyan situation

`:root` defines `--editorial-cyan-rgb: 0 217 255`.
`@theme` defines `--color-editorial-cyan: rgb(var(--editorial-cyan-rgb))`.
Only used in `decorative.css` — 4 classes:
  - `.decorative-outline-editorial-hover:hover`
  - `.decorative-outline-editorial-strong-hover:hover`
  - `.decorative-outline-editorial-soft-hover:hover`
  - `.text-glow-editorial`

No component TSX files reference editorial-cyan or its variable. Collapse is safe.

Decision: fold into accent scale as `accent-cyan-bright`. Class names retain the `editorial`
label because it describes *design role* (dramatic large-type treatments), not the color name.

## Project brand colors

`:root` defines shadow-*-rgb variables for per-project colored glow shadows:
`--shadow-bounce-rgb`, `--shadow-meco-rgb`, `--shadow-tt-rgb`, `--shadow-ebit-rgb`,
`--shadow-ao-rgb`, `--shadow-freelance-rgb`.

These are project accent colors (not just shadow values). They are used *only* in
`.shadow-editorial-*` classes in `effects.css` with the pattern `rgb(var(--shadow-*-rgb) / 0.2)`.
After migration: `color-mix(in srgb, var(--color-project-*) 20%, transparent)`.
Rename in `:root` from `--shadow-*-rgb` to `--color-project-*` and move to a dedicated section.

## glass-surface override point

`--glass-surface-rgb: 10 10 14` is an intentional `:root` override point for future theme switching.
After migration: rename to `--glass-surface: oklch(0.055 0 0)` (approximate for #0a0a0e).
Document explicitly in `surfaces.css` as a theme override point.

## oklch source values (Tailwind v4 canonical where available)

| Token | Current hex | oklch |
|---|---|---|
| accent-blue | #3b82f6 (TW blue-500) | oklch(0.623 0.188 264.05) |
| accent-cyan | #06b6d4 (TW cyan-500) | oklch(0.715 0.131 200.35) |
| accent-sky | #38bdf8 (TW sky-400) | oklch(0.756 0.120 213.30) |
| accent-purple | #a855f7 (TW purple-500) | oklch(0.603 0.259 307.52) |
| accent-cyan-bright | #00d9ff (custom) | oklch(0.838 0.144 217) ← verify in browser |
| chrome-silver | #f0f0f0 | oklch(0.961 0 0) |
| chrome-light | #d4d4d4 | oklch(0.847 0 0) |
| chrome-mid | #a0a0a0 | oklch(0.660 0 0) |
| chrome-dark | #888888 | oklch(0.573 0 0) |
| white | #ffffff | oklch(1.000 0 0) |
| black | #000000 | oklch(0 0 0) |
| glass-surface | #0a0a0e | oklch(0.055 0.003 264) ← verify |

**NOTE:** For Tailwind standard colors (accent-blue/cyan/sky/purple) the values above are
canonical from Tailwind v4 source. For accent-cyan-bright and glass-surface, verify visually
in-browser before committing to confirm no perceptible shift.

## color-mix() convention

Use `in srgb` for all alpha-only operations (shadows, borders, fills, text-stroke):
```css
color-mix(in srgb, var(--color-accent-blue) 20%, transparent)
```
Equivalent to `rgb(59 130 246 / 0.2)`. The `in srgb` ensures predictable results matching
the existing rendered appearance.

## Zero-change guarantee

No class names change. No JSX changes. No @theme token names change (except
`editorial-cyan` → `accent-cyan-bright` which has zero component usage).
