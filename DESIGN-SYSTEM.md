# Design System Reference

> Theme: **Liquid Chrome** — dark glassmorphic UI, blue/cyan accent.
> Direction: transitioning toward **glass neumorphism** (glass bubble / glass statue aesthetic).

---

## Principles

- **Structure vs appearance** — primitives provide structure, consumers provide appearance
- **Composition over configuration** — prefer small composable classes over large opinionated ones
- **CSS variables throughout** — no hardcoded colour values; all colours via `rgb(var(--*-rgb) / opacity)`
- **Modifier-safe utilities** — anything used with `hover:`, `md:`, `dark:` must be `@utility`, not a plain class
- **Explicit over magic** — transition duration always set at the consumer level, never inside a primitive

---

## Colour Tokens

Defined in `theme.css`.

### Runtime variables (`:root`)
Used in raw CSS expressions. Always use these — never hardcode RGB values.

```css
rgb(var(--accent-blue-rgb) / 0.4)
rgb(var(--accent-cyan-rgb) / 0.3)
rgb(var(--chrome-silver-rgb) / 0.8)
rgb(var(--white-rgb) / 0.15)
rgb(var(--glass-surface-rgb) / 0.68)
```

| Variable | Value |
|---|---|
| `--accent-blue-rgb` | `59 130 246` |
| `--accent-cyan-rgb` | `6 182 212` |
| `--chrome-silver-rgb` | `240 240 240` |
| `--chrome-light-rgb` | `212 212 212` |
| `--chrome-mid-rgb` | `160 160 160` |
| `--chrome-dark-rgb` | `136 136 136` |
| `--white-rgb` | `255 255 255` |
| `--glass-surface-rgb` | `10 10 14` |

`--glass-surface-rgb` is the single override point for dark/light mode theming of all glass surfaces.

### Static Tailwind tokens (`@theme`)
Used as Tailwind colour utilities: `text-accent-blue`, `bg-accent-cyan`, `border-chrome-silver/20`, etc.

| Token | Hex |
|---|---|
| `accent-blue` | `#3b82f6` |
| `accent-cyan` | `#06b6d4` |
| `chrome-silver` | `#f0f0f0` |
| `chrome-light` | `#d4d4d4` |
| `chrome-mid` | `#a0a0a0` |
| `chrome-dark` | `#888888` |

---

## Glass System

Defined in `system/surfaces.css`.

### Three independent CSS axes

```
glass-surface-N    material: background + backdrop-filter + border + curvature (inset shadow)
glass-elevation-N  environment: outset shadow (composes with curvature via CSS custom property)
glass-radius-N     shape: border-radius
```

Compose freely — they do not imply each other.

### Shadow composition

Each `glass-surface-N` defines `--glass-curvature` (inset edge layers) and sets
`box-shadow: var(--glass-curvature)` as its standalone shadow.

Each `glass-elevation-N` defines `--glass-elevation` (outset layers) and sets
`box-shadow: var(--glass-elevation), var(--glass-curvature)`.

When both classes are on the same element, the two axes compose naturally — no
specificity tricks required. Each axis is independently overridable.

### Surface

`@utility` — supports modifiers (`dark:glass-surface-3`, etc.)
All surface utilities include `position: relative` and `overflow: hidden`.

| Class | Opacity | Blur | Usage |
|---|---|---|---|
| `glass-surface-1` | 35% | 14px | Chips, tags, pills, panels (subtle) |
| `glass-surface-2` | 68% | 28px + saturate | Cards, panels, sections |
| `glass-surface-3` | 86% | 48px + saturate | Modals, drawers, popovers |

Border uses longhand `border-width/style/color` — override `border-color` freely with `border-accent-blue/30`.

### Elevation

`@utility` — supports modifiers (`hover:glass-elevation-2`, `group-hover:glass-elevation-2`)

| Class | Character |
|---|---|
| `glass-elevation-1` | Contact + ambient + subtle accent haze |
| `glass-elevation-2` | Contact + deep ambient + strong accent glow |

A flat surface (no elevation class) renders with curvature inset shadow only, from `glass-surface-N`.

### Radius

Plain class — never needs modifiers.

| Class | Value |
|---|---|
| `glass-radius-1` | `rounded-2xl` |
| `glass-radius-2` | `rounded-3xl md:rounded-4xl` |
| `glass-radius-3` | `rounded-[28px]` |

### Decorative overlays

Applied to `overlay-full` children rendered **before** `{children}` in the DOM.
DOM order ensures they sit behind content without z-index.

```jsx
<div className="overlay-full glass-reflection" aria-hidden />  /* diagonal catch-light */
<div className="overlay-full glass-noise"      aria-hidden />  /* grain texture */
<div className="overlay-full glass-panel-accents" aria-hidden /> /* dual radial accent orbs */
```

`glass-panel-accents` is a single full-size overlay with two radial gradients:
top-right blue + bottom-left cyan. Used in `Panel` — not in `Card`.

`glass-edge-glow` is always explicit in the consumer because its position is custom.

### Transition rule

**Transition duration is always set by the consumer, never the primitive.**

Tailwind v4's arbitrary `transition-[box-shadow,...]` syntax emits only
`transition-property` — it does NOT emit `transition-duration`. Always pair
with an explicit `duration-*` class on the same element:

```jsx
// Correct
className="transition-[box-shadow,border-color,transform] duration-200 hover:glass-elevation-2"

// Wrong — duration will be 0
className="transition-[box-shadow,border-color,transform] hover:glass-elevation-2"
```

---

## React Components

### Glass system hierarchy

```
CSS utilities (glass-surface-N, glass-elevation-N, glass-radius-N)
  ↓
Card          src/components/ui/Card.tsx        card-scale primitive
Panel         src/components/ui/Panel.tsx       panel-scale primitive
  ↓
InfoCard      src/components/InfoCard.tsx       standard info card layout
ShowcaseCard  src/components/ShowcaseCard.tsx   feature highlight layout
TimelineCard  src/app/projects/timeline/…       timeline list card layout
TimelineProjectPanel  …                         timeline detail panel layout
```

### Responsibility split

| Concern | Owner |
|---|---|
| `position: relative`, `overflow: hidden` | `glass-surface-N` CSS utility |
| Background, blur, border | `glass-surface-N` |
| Edge curvature (inset shadow) | `glass-surface-N` via `--glass-curvature` |
| Elevation (outset shadow) | `glass-elevation-N` |
| Border-radius | `glass-radius-N` |
| Reflection + noise overlays | `Card` |
| Noise + dual accent overlays | `Panel` |
| Glint sweep | `Card` (`glint` prop) |
| Interaction hover classes | `Card` (`variant` prop) |
| Padding, layout | consuming component |

### `Card`

`src/components/ui/Card.tsx` — primitive for card-scale glass containers.

```tsx
<Card
  variant?   // 'static' | 'raised' | 'lifted' — default: 'static' (auto 'raised' if onClick)
  glint?     // boolean — renders glint sweep; adds `group` automatically
  onClick?
  className? // supply glass-surface-N, glass-elevation-N, glass-radius-N, padding here
/>
```

Renders: `glass-reflection` + `glass-noise` overlays, optional `glass-glint`.

Variant hover patterns (transition lives here, not in CSS):
- `raised` — `duration-200 ease-out`, elevation + border accent
- `lifted` — `duration-300 spring(1.2)`, elevation + border + translate

### `Panel`

`src/components/ui/Panel.tsx` — primitive for large/primary glass content panels.

```tsx
<Panel
  onClick?
  className? // supply glass-surface-N, glass-elevation-N, glass-radius-N, padding here
/>
```

Renders: `glass-noise` + `glass-panel-accents` overlays. No reflection, no glint, no interaction styles.
Consuming components apply their own transforms when interaction is needed (e.g. `TimelineCard`).

### `InfoCard`

`src/components/InfoCard.tsx` — standard glass content card.

```tsx
<InfoCard
  title?     // renders heading-3 above children
  rounded?   // 1 | 2 | 3, default: 2
  variant?   // forwarded to Card
  glint?     // forwarded to Card
  onClick?
  className?
>
  {children}
</InfoCard>
```

Defaults: `glass-surface-2 glass-elevation-1 glass-radius-2 p-8`.

### `ShowcaseCard`

`src/components/ShowcaseCard.tsx` — feature highlight card with spring elevation and glint.

```tsx
<ShowcaseCard
  icon         // ReactNode — rendered in gradient badge
  title        // string
  description  // string
  className?
/>
```

Uses `Card` directly (not `InfoCard`) — layout and timing are specific enough that
`InfoCard` adds no value. Spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` with
`duration-500` (dwell target — fuller spring than `lifted` variant on scan targets).

`glass-edge-glow` is custom-positioned (70% width, centred) — kept explicit here.

---

## Effects

Defined in `system/effects.css`.

### Glow Scale

`@utility` — supports `hover:`, `group-hover:`

```jsx
className="glow-accent-sm"   // 0 0 20px / 0.2  — soft ambient
className="glow-accent-md"   // 0 0 20px / 0.4  — standard
className="glow-accent-lg"   // 0 0 15px / 1.0  — full-opacity
```

### Directional Shadows

`@utility`

```jsx
className="shadow-accent-md"   // 0 15px 50px / 0.35
className="shadow-accent-lg"   // 0 25px 70px / 0.50
```

### Background Fill

```jsx
className="bg-accent-soft"   // accent-blue at 10%
```

### Glint Sweep

`@utility` — requires `group` on parent surface.

```jsx
<div className="glass-glint group-hover:glass-glint-active" aria-hidden />
```

`Card` renders this automatically when `glint` prop is set.

---

## Gradients

Defined in `system/gradients.css`.

### Brand

```jsx
className="gradient-primary"        // blue → cyan, br
className="gradient-primary-soft"   // blue/30 → cyan/20 → purple/20
```

### Text Clipping

```jsx
className="gradient-text gradient-primary"
```

### Reflection Overlays

`@utility` where noted — supports `hover:`, `group-hover:` for animated effects.

```jsx
className="gradient-reflection-diagonal"           // 135deg white gloss
className="gradient-reflection-horizontal"         // @utility — 90deg accent sweep 25%
className="gradient-reflection-horizontal-strong"  // @utility — 90deg accent sweep 80%
className="gradient-reflection-light"              // br white/25 → transparent
className="gradient-reflection-dark"               // br black/30 → transparent
className="gradient-reflection-top"                // to-t white/25 fade
```

---

## Typography

Defined in `system/typography.css`.

### Font Roles

`@utility` — supports `md:font-display` etc.

| Class | Font | Usage |
|---|---|---|
| `font-display` | Urbanist | Headings, large display |
| `font-body` | DM Sans | Prose |
| `font-ui` | DM Sans | Labels, buttons, captions |

### Scale

```jsx
<h1 className="display-1" />   // 5xl → 6xl
<h1 className="display-2" />   // 4xl → 5xl
<h1 className="display-3" />   // 3xl → 4xl

<h2 className="heading-1" />   // 3xl bold
<h2 className="heading-2" />   // 2xl bold
<h3 className="heading-3" />   // xl  semibold

<p className="body-lg" />      // xl  relaxed
<p className="body-md" />      // lg  relaxed
<p className="body-sm" />      // base relaxed
<p className="body-xs" />      // sm  normal

<span className="ui-button" /> // sm→base bold
<span className="ui-label" />  // sm medium uppercase tracked
<span className="ui-meta" />   // xs tracked
```

### Emphasis

```jsx
.text-primary    // chrome-silver       100%
.text-secondary  // chrome-silver/80
.text-tertiary   // chrome-silver/70
.text-muted      // chrome-silver/60
.text-subtle     // chrome-silver/50
.text-strong     // white
.text-bold       // white + bold
.text-accent     // accent-blue
.text-gradient   // gradient-primary clipped to text
```

---

## Layout

Defined in `system/layout.css`.

```jsx
<div className="content-container" />   // max-w-350, centered

<div className="container-sm" />   // max-w-2xl  — prose
<div className="container-md" />   // max-w-4xl  — sections
<div className="container-lg" />   // max-w-6xl  — wide layouts

<div className="stack-sm" />   // space-y-4
<div className="stack-md" />   // space-y-6
<div className="stack-lg" />   // space-y-8
<div className="stack-xl" />   // space-y-12 md:space-y-16

<div className="cluster-sm" />   // flex items-center gap-3
<div className="cluster-md" />   // flex items-center gap-4

<div className="overlay" />        // absolute pointer-events-none
<div className="overlay-full" />   // absolute pointer-events-none inset-0
```

---

## Decorative

Defined in `system/decorative.css`.

```jsx
<div className="decorative-text" />
<div className="decorative-text decorative-outline" />
<div className="decorative-text decorative-outline decorative-outline-hover" />
<div className="decorative-text decorative-faded" />

<div className="decorative-circle w-48 h-48" />
<div className="decorative-line w-full" />
```

---

## Components

Defined in `components.css`.

### Tag system

```jsx
<span className="surface-tag size-tag-md text-xs font-semibold text-accent-cyan" />
<span className="surface-tag-highlight size-tag-lg text-sm font-semibold text-accent-cyan" />

// surface: surface-tag, surface-tag-highlight
// size:    size-tag-sm, size-tag-md, size-tag-lg
```

### Image overlays

```jsx
<div className="image-overlay-dark" />
<div className="image-overlay-light" />
```

---

## Keyframe Animations

| Class | Keyframe | Duration |
|---|---|---|
| `animate-gradient-shift` | `gradientShift` | 3s infinite |
| `animate-liquid-move` | `liquidMove` | 20s infinite |
| `animate-orb-float` | `orbFloat` | 25s infinite |
| `animate-status-pulse` | `statusPulse` | 2s infinite |
| `animate-quantum-float` | `quantumFloat` | 10s infinite |
| `animate-quantum-shape-float` | `shapeFloat` | 8s infinite |
| `animate-shine-sweep` | `shineSweep` | 0.8s |

---

## Upcoming — Architecture Notes

### Glass neumorphism
Requires independently controllable elevation shadow (outset) and curvature shadow (inset).
The `--glass-curvature` / `--glass-elevation` CSS custom property split already supports this.
Future named classes:

```css
.glass-elevation-raised { box-shadow: var(--glass-elevation), var(--glass-curvature) }
.glass-curvature-convex { --glass-curvature: [inset only — more pronounced] }
```

### Dynamic theming
Override `--glass-surface-rgb` at `:root` or on a parent element to shift all surfaces.
Use `oklch` for theme variable values — perceptual colour space keeps `color-mix()` blends
consistent across hue shifts.

### Dark / light mode
Glass styles differ between modes in more than colour — gradient and shadow directions
reverse. Plan via CSS custom property aliases reassigned per theme:

```css
[data-theme="light"] {
  --glass-surface-rgb: 240 240 248;
  --glass-border: oklch(0% 0 0 / 0.08);
}
```

### Performance during VT
Add `.vt-active` to `<html>` at transition start, remove on completion.
Use it to reduce backdrop blur and shadow complexity during the ~200ms window:

```css
.vt-active .glass-surface-N::before {
  backdrop-filter: blur(8px);
}
```

### Browser feature detection
Plan for `@supports (backdrop-filter: blur())` fallbacks.
Fallback: increase background opacity to compensate for missing blur.
