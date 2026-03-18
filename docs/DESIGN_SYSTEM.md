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
```

| Variable              | Value         |
| --------------------- | ------------- |
| `--accent-blue-rgb`   | `59 130 246`  |
| `--accent-cyan-rgb`   | `6 182 212`   |
| `--chrome-silver-rgb` | `240 240 240` |
| `--chrome-light-rgb`  | `212 212 212` |
| `--chrome-mid-rgb`    | `160 160 160` |
| `--chrome-dark-rgb`   | `136 136 136` |
| `--white-rgb`         | `255 255 255` |

### Static Tailwind tokens (`@theme`)

Used as Tailwind colour utilities: `text-accent-blue`, `bg-accent-cyan`, `border-chrome-silver/20`, etc.

| Token           | Hex       |
| --------------- | --------- |
| `accent-blue`   | `#3b82f6` |
| `accent-cyan`   | `#06b6d4` |
| `chrome-silver` | `#f0f0f0` |
| `chrome-light`  | `#d4d4d4` |
| `chrome-mid`    | `#a0a0a0` |
| `chrome-dark`   | `#888888` |

---

## Glass System

Defined in `system/surfaces.css`.

### Architecture

The glass system is split into three independent axes.
Compose them freely — they do not imply each other.

```
glass-surface-N   background + backdrop-filter + border
glass-shadow-N    box-shadow (elevation + inset edge)
glass-radius-N    border-radius
```

Decorative overlays are separate elements rendered by `GlassSurface`:

```
glass-reflection  diagonal catch-light (135deg gloss)
glass-noise       grain texture
glass-glint       animated horizontal sweep (opt-in)
glass-edge-glow   top-edge accent streak (always explicit in consumer)
```

### Critical constraint — View Transitions + backdrop-filter

`backdrop-filter` and `view-transition-name` cannot coexist on the same element.
`backdrop-filter` must live on a `::before` pseudo-element of the surface, not
on the element that carries `view-transition-name`.

All `glass-surface-N::before` rules handle this automatically.
**Do not apply backdrop-filter directly to any element with a VT name.**

### Surface

`@utility` — supports modifiers (`dark:glass-surface-3`, etc.)

| Class             | Opacity | Blur            | Usage                     |
| ----------------- | ------- | --------------- | ------------------------- |
| `glass-surface-1` | 35%     | 14px            | Chips, tags, pills        |
| `glass-surface-2` | 68%     | 28px + saturate | Cards, panels, sections   |
| `glass-surface-3` | 86%     | 48px + saturate | Modals, drawers, popovers |

Border uses longhand `border-width/style/color` — override `border-color` freely with `border-accent-blue/30`.

### Shadow

`@utility` — supports modifiers (`hover:glass-shadow-2`, `group-hover:glass-shadow-2`)

| Class            | Character                                   |
| ---------------- | ------------------------------------------- |
| `glass-shadow-0` | Inset edge only — truly flat surfaces       |
| `glass-shadow-1` | Contact + ambient + subtle accent haze      |
| `glass-shadow-2` | Contact + deep ambient + strong accent glow |

### Radius

Plain class — never needs modifiers.

| Class            | Value                        |
| ---------------- | ---------------------------- |
| `glass-radius-1` | `rounded-2xl`                |
| `glass-radius-2` | `rounded-3xl md:rounded-4xl` |
| `glass-radius-3` | `rounded-[28px]`             |

### Decorative Overlays

Always applied to `overlay-full` children rendered **before** `{children}` in the DOM.
DOM order ensures they sit behind content without z-index.

```jsx
<div className="overlay-full glass-reflection" aria-hidden />
<div className="overlay-full glass-noise"      aria-hidden />
```

`GlassSurface` renders reflection + noise automatically (`bare` prop opts out).
`glass-edge-glow` is always explicit in the consumer because its position is custom.

### Transition rule

**Transition duration is always set by the consumer, never the primitive.**

`transition-[box-shadow,border-color,transform]` (arbitrary bracket syntax) emits
only `transition-property` in Tailwind v4 — it does NOT emit `transition-duration`.
Always pair it with an explicit `duration-*` class on the same element:

```jsx
// Correct
className = 'transition-[box-shadow,border-color,transform] duration-200 hover:glass-shadow-2';

// Wrong — duration will be 0
className = 'transition-[box-shadow,border-color,transform] hover:glass-shadow-2';
```

---

## React Components

### GlassSurface

`src/components/ui/GlassSurface.tsx` — structural primitive.

Provides: element tree (backdrop pseudo, decorative overlays, children), overflow
clipping, VT/backdrop isolation.

Does NOT provide: surface level, shadow, radius, hover states, transition timing.
Those belong in the consuming component's `className`.

```tsx
<GlassSurface
  className="glass-surface-2 glass-shadow-1 glass-radius-2 ..."
  bare?     // skip built-in reflection + noise
  glint?    // render glass-glint sweep (requires `group` in className)
/>
```

Always a `div`. No polymorphic `as` prop.

### GlassCard

`src/components/ui/GlassCard.tsx` — standard content card.

```tsx
<GlassCard
  title?          // renders heading-3 above children
  rounded?        // 1 | 2 | 3, default: 2
  accent?         // corner gradient orb
  accentPosition? // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  hoverable?      // border + shadow highlight on hover (default: true if onClick)
  onClick?        // makes card interactive
  className?
>
  {children}
</GlassCard>
```

Clickable cards get hover treatment automatically when `onClick` is provided.
Override transition timing via `className`:

```jsx
<GlassCard className="duration-300" onClick={...}>
```

### ShowcaseCard

`src/components/ShowcaseCard.tsx` — feature highlight card with spring elevation and glint.

```tsx
<ShowcaseCard
  icon         // ReactNode — rendered in gradient badge
  title        // string
  description  // string
  className?
/>
```

Uses spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` with `duration-500`.
`glass-edge-glow` is custom-positioned (70% width, centred) — kept explicit here.

---

## Effects

Defined in `system/effects.css`.

### Glow Scale

`@utility` — supports `hover:`, `group-hover:`

```jsx
className = 'glow-accent-sm'; // 0 0 20px / 0.2  — soft ambient
className = 'glow-accent-md'; // 0 0 20px / 0.4  — standard
className = 'glow-accent-lg'; // 0 0 15px / 1.0  — full-opacity
```

### Directional Shadows

`@utility`

```jsx
className = 'shadow-accent-md'; // 0 15px 50px / 0.35
className = 'shadow-accent-lg'; // 0 25px 70px / 0.50
```

### Background Fill

```jsx
className = 'bg-accent-soft'; // accent-blue at 10%
```

### Glint Sweep

`@utility` — requires `group` on parent surface.

```jsx
<div className='glass-glint group-hover:glass-glint-active' aria-hidden />
```

`GlassSurface` renders this automatically when `glint` prop is set.

---

## Gradients

Defined in `system/gradients.css`.

### Brand

```jsx
className = 'gradient-primary'; // blue → cyan, br
className = 'gradient-primary-soft'; // blue/30 → cyan/20 → purple/20
```

### Text Clipping

```jsx
className = 'gradient-text gradient-primary';
```

### Gleam (partial — always needs `from-*`)

```jsx
className = 'gradient-gleam from-accent-blue/10'; // custom
className = 'gradient-gleam-blue'; // preset
className = 'gradient-gleam-cyan'; // preset
```

### Corner Accents (partial — always needs `from-*`)

```jsx
// Apply to overlay children
className = 'gradient-corner-tr from-accent-blue/10';
// Also: gradient-corner-tl, gradient-corner-br, gradient-corner-bl
```

### Reflection Overlays

`@utility` where noted — supports `hover:`, `group-hover:` for animated effects.

```jsx
className = 'gradient-reflection-diagonal'; // 135deg white gloss
className = 'gradient-reflection-horizontal'; // @utility — 90deg accent sweep 25%
className = 'gradient-reflection-horizontal-strong'; // @utility — 90deg accent sweep 80%
className = 'gradient-reflection-light'; // br white/25 → transparent
className = 'gradient-reflection-dark'; // br black/30 → transparent
className = 'gradient-reflection-top'; // to-t white/25 fade
```

---

## Typography

Defined in `system/typography.css`.

### Font Roles

`@utility` — supports `md:font-display` etc.

| Class          | Font     | Usage                     |
| -------------- | -------- | ------------------------- |
| `font-display` | Urbanist | Headings, large display   |
| `font-body`    | DM Sans  | Prose                     |
| `font-ui`      | DM Sans  | Labels, buttons, captions |

### Scale

```jsx
// Display — hero and section titles, responsive
<h1 className="display-1" />   // 5xl → 6xl
<h1 className="display-2" />   // 4xl → 5xl
<h1 className="display-3" />   // 3xl → 4xl

// Heading
<h2 className="heading-1" />   // 3xl bold
<h2 className="heading-2" />   // 2xl bold
<h3 className="heading-3" />   // xl  semibold
// Need bold weight: heading-3 font-bold

// Body
<p className="body-lg" />      // xl  relaxed
<p className="body-md" />      // lg  relaxed
<p className="body-sm" />      // base relaxed
<p className="body-xs" />      // sm  normal

// UI
<span className="ui-button" /> // sm→base bold
<span className="ui-label" />  // sm medium uppercase tracked
<span className="ui-meta" />   // xs tracked
// Compose ui-meta — don't create new variants:
<span className="ui-meta text-accent-cyan" />
<span className="ui-meta text-accent-cyan uppercase tracking-wider" />
```

### Emphasis

```jsx
.text-primary    // chrome-silver       100%
.text-secondary  // chrome-silver/80    80%
.text-tertiary   // chrome-silver/70    70%
.text-muted      // chrome-silver/60    60%
.text-subtle     // chrome-silver/50    50%
.text-strong     // white
.text-bold       // white + bold
.text-accent     // accent-blue
.text-gradient   // gradient-primary clipped to text
```

---

## Layout

Defined in `system/layout.css`.

```jsx
// Page wrapper
<div className="content-container" />   // max-w-350, centered

// Content containers
<div className="container-sm" />   // max-w-2xl  — prose
<div className="container-md" />   // max-w-4xl  — sections
<div className="container-lg" />   // max-w-6xl  — wide layouts

// Vertical rhythm
<div className="stack-sm" />   // space-y-4
<div className="stack-md" />   // space-y-6
<div className="stack-lg" />   // space-y-8
<div className="stack-xl" />   // space-y-12 md:space-y-16

// Horizontal groups
<div className="cluster-sm" />   // flex items-center gap-3
<div className="cluster-md" />   // flex items-center gap-4

// Overlay helpers
<div className="overlay" />        // absolute pointer-events-none
<div className="overlay-full" />   // absolute pointer-events-none inset-0
```

---

## Decorative

Defined in `system/decorative.css`.

```jsx
// Text treatments — pointer-events-none select-none baked in
<div className="decorative-text" />                  // display, black, uppercase
<div className="decorative-text decorative-outline" />        // transparent + white stroke
<div className="decorative-text decorative-outline decorative-outline-hover" /> // + cyan hover
<div className="decorative-text decorative-faded" />          // gradient-clipped fade

// Geometric
<div className="decorative-circle w-48 h-48" />   // position + size in JSX
<div className="decorative-line w-full" />
```

---

## Components

Defined in `components.css`. Shared across multiple components.

### Tag system

Compose surface + size:

```jsx
<span className="surface-tag size-tag-md text-xs font-semibold text-accent-cyan" />
<span className="surface-tag-highlight size-tag-lg text-sm font-semibold text-accent-cyan" />

// surface: surface-tag, surface-tag-highlight (+ hover built in)
// size:    size-tag-sm, size-tag-md, size-tag-lg
```

### Image overlays

```jsx
<div className="image-overlay-dark" />   // overlay-full br black/30 → transparent
<div className="image-overlay-light" />  // overlay-full to-t white/25 fade
```

### Other

```jsx
<span className="status-dot bg-green-400" />   // animated pulse — colour set in JSX
<div className="magazine-image" />             // rounded-2xl + transition
// .image-bg::before                           // static light reflection
// .hover-glint::after                         // animated glint sweep
```

---

## Keyframe Animations

Defined in `theme.css` (`--animate-*`) and `keyframes.css`.

| Class                         | Keyframe        | Duration     |
| ----------------------------- | --------------- | ------------ |
| `animate-gradient-shift`      | `gradientShift` | 3s infinite  |
| `animate-liquid-move`         | `liquidMove`    | 20s infinite |
| `animate-orb-float`           | `orbFloat`      | 25s infinite |
| `animate-status-pulse`        | `statusPulse`   | 2s infinite  |
| `animate-quantum-float`       | `quantumFloat`  | 10s infinite |
| `animate-quantum-shape-float` | `shapeFloat`    | 8s infinite  |
| `animate-shine-sweep`         | `shineSweep`    | 0.8s         |

---

## Upcoming — Architecture Notes

These are not implemented. Noted here to inform architectural decisions.

### Glass neumorphism

Requires independently controllable elevation shadow (outset) and curvature shadow (inset).
Current `glass-shadow-N` bundles both. Future split:

```css
.glass-elevation-raised {
	box-shadow: [outset only];
}
.glass-curvature-convex {
	box-shadow: [inset only];
}
```

### Dynamic theming

Theme colours will be changeable on navigation or animated continuously.
Use `oklch` for all theme variable values — perceptual colour space keeps
`color-mix()` blends consistent across hue shifts.

### Dark / light mode

Glass and neumorphic styles differ in more than colour — gradient and shadow
directions reverse. Plan via CSS custom property aliases reassigned per theme.

### Performance during VT

Add `.vt-active` to `<html>` at transition start, remove on completion.
Use it to reduce backdrop blur and shadow complexity during the ~200ms window.

### Browser feature detection

Plan for `@supports (backdrop-filter: blur())` fallbacks on surfaces.
Fallback: increase background opacity to compensate for missing blur.
