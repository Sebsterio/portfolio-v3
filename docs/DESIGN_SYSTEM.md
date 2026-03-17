# Design System Reference

> Theme: **Liquid Chrome** — dark, glassmorphic, blue/cyan accent.

---

## Colour Tokens

Defined in `theme.css`. Always use tokens — never hardcode RGB values.

| Token           | Value     | Usage                              |
| --------------- | --------- | ---------------------------------- |
| `accent-blue`   | `#3b82f6` | Primary accent, glows, gradients   |
| `accent-cyan`   | `#06b6d4` | Secondary accent, tags, highlights |
| `chrome-silver` | `#f0f0f0` | Default body text                  |
| `chrome-light`  | `#d4d4d4` | Supporting text                    |
| `chrome-mid`    | `#a0a0a0` | Muted text                         |
| `chrome-dark`   | `#888888` | Subtle text                        |

CSS variables for use in raw `rgb()` expressions:

```css
rgb(var(--accent-blue-rgb) / 0.4)
rgb(var(--accent-cyan-rgb) / 0.3)
rgb(var(--chrome-silver-rgb) / 0.8)
rgb(var(--white-rgb) / 0.15)
```

---

## Typography

Defined in `system/typography.css`.

### Font Roles

| Class          | Font     | Usage                     |
| -------------- | -------- | ------------------------- |
| `font-display` | Urbanist | Headings, display text    |
| `font-body`    | DM Sans  | Prose, paragraphs         |
| `font-ui`      | DM Sans  | Labels, buttons, captions |

### Display Scale

Large hero and section titles. Responsive by default.

```jsx
<h1 className="display-1">...</h1>   // 5xl → 6xl
<h1 className="display-2">...</h1>   // 4xl → 5xl
<h1 className="display-3">...</h1>   // 3xl → 4xl
```

### Heading Scale

```jsx
<h2 className="heading-1">...</h2>   // 3xl, bold
<h2 className="heading-2">...</h2>   // 2xl, bold
<h3 className="heading-3">...</h3>   // xl,  semibold
// Need tighter weight? Compose: heading-3 font-bold
```

### Body Scale

```jsx
<p className="body-lg">...</p>   // xl,   relaxed leading
<p className="body-md">...</p>   // lg,   relaxed leading
<p className="body-sm">...</p>   // base, relaxed leading
<p className="body-xs">...</p>   // sm,   normal leading
```

### UI Scale

```jsx
<span className="ui-button">...</span>   // sm→base, bold
<span className="ui-label">...</span>    // sm, medium, uppercase, tracked
<span className="ui-meta">...</span>     // xs, tracked
```

Compose `ui-meta` with Tailwind utilities — don't create new variants:

```jsx
<span className="ui-meta text-accent-cyan">...</span>
<span className="ui-meta text-accent-cyan uppercase tracking-wider">...</span>
```

### Emphasis Scale

```jsx
<p className="text-primary">...</p>    // chrome-silver      100%
<p className="text-secondary">...</p>  // chrome-silver/80    80%
<p className="text-tertiary">...</p>   // chrome-silver/70    70%
<p className="text-muted">...</p>      // chrome-silver/60    60%
<p className="text-subtle">...</p>     // chrome-silver/50    50%
```

### High-Contrast & Brand

```jsx
<span className="text-strong">...</span>     // white
<span className="text-bold">...</span>       // white + bold
<span className="text-accent">...</span>     // accent-blue
<span className="text-gradient">...</span>   // gradient-primary clipped to text
```

---

## Glass System

Defined in `system/surfaces.css`.

### Composed Tiers — reach for these first

| Class           | Usage                               |
| --------------- | ----------------------------------- |
| `glass-subtle`  | Chips, tags, inline badges          |
| `glass-default` | Cards, panels, content sections     |
| `glass-raised`  | Modals, popovers, elevated surfaces |

Each tier bundles surface + shadow + backdrop + radius at a coherent intensity.
Use modifier support freely:

```jsx
<div className="glass-default hover:glass-raised transition-all">
```

### Atomic Classes — surgical overrides only

**Surface** (background + border):

```jsx
glass-surface-1   // 40% opacity bg, 6% border
glass-surface-2   // 60% opacity bg, 8% border
glass-surface-3   // 80% opacity bg, 12% border
```

**Shadow:**

```jsx
glass-shadow-0    // subtle lift
glass-shadow-1    // standard card
glass-shadow-2    // strong elevated
```

**Backdrop:**

```jsx
glass-backdrop-0  // blur 20px
glass-backdrop-1  // blur 30px + brightness
glass-backdrop-2  // blur 40px + saturate + brightness  (= backdrop-blur-2xl)
glass-backdrop-3  // blur 60px
```

**Radius:**

```jsx
glass-radius-1    // rounded-2xl
glass-radius-2    // rounded-3xl md:rounded-4xl
glass-radius-3    // rounded-[28px]
```

### Decorative Overlays

Apply to absolute-positioned child elements with `overlay-full`:

```jsx
<div className="overlay-full glass-reflection pointer-events-none" />
<div className="overlay-full glass-edge-glow pointer-events-none" />
<div className="overlay-full glass-noise pointer-events-none" />
```

---

## Effects

Defined in `system/effects.css`.

### Glow Scale

```jsx
className="glow-accent-sm"   // 0 0 20px accent / 0.2  — soft ambient
className="glow-accent-md"   // 0 0 20px accent / 0.4  — standard interactive
className="glow-accent-lg"   // 0 0 15px accent / 1.0  — full-opacity strong
```

Supports modifiers:

```jsx
className="hover:glow-accent-md transition-shadow"
```

### Directional Shadows

```jsx
className="shadow-accent-md"   // 0 15px 50px — card lift
className="shadow-accent-lg"   // 0 25px 70px — card hover lift
```

### Background Fill

```jsx
className="bg-accent-soft"   // accent-blue at 10% opacity
```

### Animated Overlay

```jsx
// Apply to an absolutely-positioned child element.
// Drive position via JS or group-hover.
<div className="reflection-sweep" />
```

---

## Gradients

Defined in `system/gradients.css`.

### Brand Gradients

```jsx
className="gradient-primary"        // blue → cyan, br
className="gradient-primary-soft"   // blue/30 → cyan/20 → purple/20, br
```

### Text Clipping

```jsx
className="gradient-text gradient-primary"
className="gradient-text gradient-primary-soft"
```

### Gleam System

`gradient-gleam` is a **partial** — always combine with a `from-*` colour:

```jsx
className="gradient-gleam from-accent-blue/10"   // custom
className="gradient-gleam-blue"                   // preset
className="gradient-gleam-cyan"                   // preset
```

### Corner Accents

Partials — always add a `from-*` colour. Apply to absolute-positioned children:

```jsx
className="gradient-corner-tr from-accent-blue/10"
className="gradient-corner-bl from-accent-cyan/10"
// also: gradient-corner-tl, gradient-corner-br
```

### Reflection Overlays

```jsx
// Apply to overlay-full children
className="gradient-reflection-diagonal"          // 135deg white gloss — glass surfaces
className="gradient-reflection-horizontal"        // 90deg accent sweep, 25% opacity
className="gradient-reflection-horizontal-strong" // 90deg accent sweep, 80% opacity
className="gradient-reflection-light"             // br white/25 → transparent
className="gradient-reflection-dark"              // br black/30 → transparent
className="gradient-reflection-top"               // to-t white/25 fade at top
```

---

## Layout

Defined in `system/layout.css`.

### Page Wrapper

```jsx
<div className="content-container">   // max-w-350, centered
```

### Content Containers

```jsx
<div className="container-sm">   // max-w-2xl  — prose, narrow columns
<div className="container-md">   // max-w-4xl  — standard sections
<div className="container-lg">   // max-w-6xl  — wide, multi-column
```

### Stack (vertical rhythm)

```jsx
<div className="stack-sm">   // space-y-4
<div className="stack-md">   // space-y-6
<div className="stack-lg">   // space-y-8
<div className="stack-xl">   // space-y-12 md:space-y-16
```

### Cluster (horizontal groups)

```jsx
<div className="cluster-sm">   // flex items-center gap-3
<div className="cluster-md">   // flex items-center gap-4
```

### Overlay Helpers

```jsx
<div className="overlay">        // absolute + pointer-events-none
<div className="overlay-full">   // absolute + pointer-events-none + inset-0
```

---

## Decorative

Defined in `system/decorative.css`.

### Text Treatments

```jsx
// Always non-interactive (pointer-events-none select-none baked in)
<div className="decorative-text">...</div>           // display font, black, uppercase, tight

<div className="decorative-text decorative-outline">...</div>
// transparent fill + white stroke at 15%

<div className="decorative-text decorative-outline decorative-outline-hover">...</div>
// + animated cyan stroke on hover

<div className="decorative-text decorative-faded">...</div>
// gradient-clipped near-transparent fill
```

### Geometric Elements

```jsx
// Position and size in JSX
<div className="decorative-circle w-48 h-48" />
<div className="decorative-line w-full" />
```

---

## Components

Defined in `components.css`. Classes shared across multiple components.

```jsx
<span className="status-dot bg-green-400" />   // animated pulse dot; colour set in JSX

// Image layers — apply to overlay-full children
<div className="image-overlay-dark" />
<div className="image-overlay-light" />

// Glass surface overlays
<div className="glass-anchor-reflection" />    // overlay-full + gradient-reflection-diagonal
<div className="glass-card-accent" />          // overlay + w-32 h-32 anchor; gradient in JSX

// Image wrappers
<div className="magazine-image">...</div>      // rounded-2xl + transition
// Apply to the wrapper element itself:
.image-bg::before                              // static light reflection
.hover-glint::after                            // animated glint sweep on hover

// Tag system — compose surface + size
<span className="surface-tag size-tag-md">...</span>
<span className="surface-tag-highlight size-tag-lg">...</span>
// surface: surface-tag, surface-tag-highlight
// size:    size-tag-sm, size-tag-md, size-tag-lg
```
