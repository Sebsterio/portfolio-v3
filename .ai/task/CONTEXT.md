# Context

## Architecture decisions (approved)

### Responsibility split
- glass-surface-N (CSS only)  →  material: background, blur, border, edge curvature (inset shadow)
- glass-radius-N  (CSS only)  →  shape: border-radius
- glass-elevation-N (CSS only) →  environment: outset shadow; composes with curvature via CSS custom property
- CardContainer (React)       →  DOM structure: decorative overlays, glint, accent orb, interaction classes
- GlassCard (React)           →  card layout: surface+elevation defaults, padding, optional title
- ShowcaseCard (React)        →  showcase layout (uses CardContainer directly)

### No GlassSurface React component
All GlassSurface responsibilities are pure CSS.
The `relative overflow-hidden` invariant moves into the glass-surface-N utility body.
GlassSurface.tsx is deleted; consumers use CardContainer or raw CSS utilities.

### Shadow composition via CSS custom property
glass-surface-N defines --glass-curvature and sets box-shadow: var(--glass-curvature).
glass-elevation-N sets box-shadow: var(--glass-elevation), var(--glass-curvature).
Both can be authored independently but compose naturally on one element.
Unblocks future neumorphism (curvature axis independently controllable).

### glass-shadow-N renamed to glass-elevation-N
Semantic rename. glass-shadow-0 retired (flat = no elevation class, curvature still present from surface).

### --glass-surface-rgb token
Added to :root in theme.css. Unblocks future dynamic theming and dark mode.
Surface utilities use rgb(var(--glass-surface-rgb) / opacity).

### CardContainer variant API
variant: 'static' | 'raised' | 'lifted'
Auto-resolves to 'raised' when onClick is provided.
Transition duration + easing live in CardContainer's VARIANT_MAP — not in primitives.

### GlassCard accent prop
accent?: AccentPosition (single prop, position = enable)
Replaces old accent: boolean + accentPosition: AccentPosition pair.

## Known bugs being fixed
- glass-raised (nonexistent class) used in CardsProjectPage flip card faces
- glass-shadow-N renamed throughout to glass-elevation-N

## Files NOT touched
- effects.css, gradients.css, typography.css, layout.css, decorative.css
- All page files except consumer components listed in PLAN.md
