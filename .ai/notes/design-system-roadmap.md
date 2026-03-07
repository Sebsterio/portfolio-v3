# Design System Refactor Roadmap

## 1. Purpose

This document defines the **strategic roadmap for refactoring the project's styling architecture** into a consistent design system.

The goal is to:

- reduce duplicated Tailwind utility clusters
- centralize styling primitives
- improve semantic clarity
- preserve the current visual design
- perform migrations with **minimal manual intervention**

The codebase uses:

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind v4 (CSS-first configuration)**
- **tailwind-merge**
- `cn()` utility for class composition
- **Playwright VRT** (`pnpm e2e`)

Refactors must preserve compatibility with this stack.

---

# 2. Current Situation

The styling system evolved organically and now contains:

### Utility clusters in JSX

Examples repeatedly found in components:

Typography clusters

```
font-urbanist text-2xl font-bold text-chrome-silver
text-sm md:text-base leading-relaxed text-chrome-silver/75
uppercase tracking-wider text-accent-cyan
```

Layout clusters

```
flex items-center gap-3
space-y-6
max-w-4xl mx-auto
```

Surface clusters

```
rounded-2xl backdrop-blur-xl border border-chrome-silver/10
shadow-[...]
bg-[rgba(...)]
```

Glass UI decorations

```
reflection gradients
noise overlay
corner gradients
shine animation
```

These patterns occur in many files and should be centralized.

---

# 3. Architectural Direction

The refactor moves the project toward a **layered styling architecture**.

```
theme → design tokens
system → reusable styling primitives
components → component patterns
utilities → minimal escape hatches
```

### theme

Location:

```
src/styles/theme.css
```

Contains only **raw design tokens**:

- color variables
- rgb channel variables
- background-image tokens
- radii
- shared gradients

Example:

```
--color-accent-blue
--color-accent-cyan
--color-chrome-silver
```

No semantic classes should exist here.

---

### system

Location:

```
src/styles/system/
```

Contains **semantic primitives used across many components**.

Examples:

Typography scale

```
heading-1
heading-2
body-md
ui-label
ui-meta
```

Layout primitives

```
stack-sm
stack-md
cluster-sm
content-container
```

Optional:

```
surface primitives
```

These should be composable.

---

### components

Location:

```
src/styles/components.css
```

Contains **component-level patterns**.

Examples:

```
heading-section
status-dot
project decorative text
glass decoration patterns
```

These represent patterns used in multiple components but not globally reusable primitives.

---

### utilities

Location:

```
src/styles/utilities.css
```

Contains minimal helpers:

Examples

```
content-container
glow-primary
bg-primary-soft
```

Utilities must remain small and avoid becoming a dumping ground.

---

# 4. Known Design System Elements

Some primitives already exist or partially exist.

### Typography

Fonts:

```
font-urbanist
font-dm-sans
```

Frequent text styles:

```
uppercase tracking-wider
leading-relaxed
text-sm / text-base / text-lg / text-xl
```

Repeated headings:

```
font-urbanist text-2xl font-bold
```

Repeated meta labels:

```
text-xs uppercase tracking-wider
```

---

### Glass surface system

Glass UI primitives exist or were recently extracted.

Examples:

```
rounded-glass-*
backdrop-glass-*
shadow-glass-*
surface-glass-*
```

These form the visual identity of the UI.

---

### Gradient utilities

Examples

```
gradient-primary
gradient-primary-soft
gradient-text
gradient-corner-*
gradient-gleam-*
```

Used heavily in project cards and decorative surfaces.

---

### Decorative overlays

Patterns include:

```
noise-overlay
reflection-diagonal
reflection-top
reflection-animated
top-edge-glow
```

These represent glass decoration patterns.

---

# 5. Known Components Acting as Design System Primitives

The following components already behave like system elements.

```
GlassSurface
Button
TextBlock
SectionHeader
Title
```

These components define styling conventions that should guide the design system.

---

# 6. Refactor Strategy

The refactor must proceed **incrementally**.

Large rewrites are not allowed.

Each phase must pass:

```
pnpm build
pnpm e2e
```

---

# Phase 0 – Repository Style Audit

Before modifying code, the agent must analyze the repository.

Tasks

Inspect

```
src/styles/**
```

Determine

- existing directory structure
- import order in global.css
- duplicated class definitions
- unused style files
- existing system primitives
- components acting as style anchors

Produce

```
docs/style-audit.md
```

---

# Phase 1 – Typography System

Typography is the most duplicated styling pattern.

Goals

Create a **complete semantic scale** representing current usage.

Examples

```
display-1
display-2
heading-1
heading-2
heading-3
body-lg
body-md
body-sm
ui-label
ui-meta
```

Requirements

- avoid collisions
- maintain current sizes and weights
- migrate repeated clusters safely

Migration approach

Prefer replacing **frequent clusters**.

Example

Replace

```
font-urbanist text-2xl font-bold text-chrome-silver
```

With

```
heading-2
```

But only if safe.

---

# Phase 2 – Surface / Glass System

Centralize glass UI primitives.

Target components

```
ShowcaseCard
TimelineProjectContentCard
```

Goals

- remove inline style objects
- reuse existing surface utilities
- maintain hover and shine animations

Composition remains in JSX.

Example

```
surface-glass-2 backdrop-glass-2 shadow-glass-1 rounded-glass-2
```

---

# Phase 3 – Layout Primitives

Layout duplication appears frequently.

Examples

```
flex items-center gap-3
space-y-6
max-w-4xl mx-auto
```

If patterns appear across multiple files, introduce primitives.

Example

```
cluster-sm
stack-md
content-container
```

Migration must remain conservative.

---

# Phase 4 – StyleMap Generation

Generate

```
docs/STYLEMAP.md
```

This document must contain:

Search patterns

Examples

```
font-urbanist + text-2xl + font-bold
uppercase + tracking-wider
leading-relaxed + text-sm
```

Replacement classes

```
heading-2
ui-label
body-sm
```

Safety notes

```
do not replace dynamic classes
skip clusters with size variations
```

Verification checklist

```
pnpm build
pnpm e2e
```

---

# 7. Automation Strategy

Because class clusters may appear:

- in different order
- across multiple `cn()` arguments
- split across components

Migration should use:

1. AST-aware transforms when possible
2. regex only when validated
3. manual exceptions when required

---

# 8. Verification

Every migration step must run:

```
pnpm build
pnpm e2e
```

Playwright VRT must show **no visual regressions**.

---

# 9. Success Criteria

The refactor is successful when:

- repeated utility clusters are reduced
- typography scale is centralized
- glass surfaces use shared primitives
- JSX becomes more semantic
- VRT confirms no visual regressions

---

# 10. Guiding Principle

This refactor prioritizes:

```
safety > automation > abstraction
```

No stylistic redesign is allowed.

The goal is **architecture clarity and maintainability**, not visual change.

---

If you want, the next thing I can generate (and this one will **massively help Codex**) is:

**`docs/STYLEMAP.md`**

That file will contain **actual regex patterns and cluster maps derived from your earlier search results**, which Codex can directly use to automate 70–80% of the migration safely.
