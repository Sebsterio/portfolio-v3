# Plan

## Step 1 — CSS: theme.css
- Add --glass-surface-rgb: 10 10 14 to :root

## Step 2 — CSS: surfaces.css
- Add `position: relative; overflow: hidden` to each glass-surface-N body
- Replace hardcoded rgba() backgrounds with rgb(var(--glass-surface-rgb) / opacity)
- Add --glass-curvature custom property to each glass-surface-N (inset shadow layers)
- Set box-shadow: var(--glass-curvature) on each glass-surface-N
- Rename glass-shadow-0/1/2 → glass-elevation-1/2 (drop 0; flat = no elevation class)
- glass-elevation-N: define --glass-elevation, set box-shadow: var(--glass-elevation), var(--glass-curvature)

## Step 3 — React: CardContainer (new file)
- Create src/components/ui/CardContainer.tsx
- Props: children, className, style, onClick, variant, accent, glint
- Renders: decorative overlays (reflection, noise), glint sweep, accent orb
- Applies: variant interaction classes from VARIANT_MAP

## Step 4 — React: GlassCard
- Rewrite to use CardContainer
- Remove surface/shadow/rounded/hoverable/hovered props
- Keep: title, rounded, variant, accent, glint, onClick, className
- Apply glass-surface-2, glass-elevation-1, glass-radius-N, p-8 in className

## Step 5 — React: ShowcaseCard
- Replace GlassSurface with CardContainer
- Apply surface/elevation/radius/padding directly in className
- Override lifted variant timing (500ms spring) via className

## Step 6 — Consumer: delete GlassSurface.tsx
- Remove src/components/ui/GlassSurface.tsx

## Step 7 — Consumer: CardsCollectionPage
- ProjectCard: replace GlassSurface with CardContainer
- Apply glass-surface-2 glass-elevation-1 glass-radius-3 in className
- Map old hoverable+hovered props to variant="lifted"

## Step 8 — Consumer: CardsProjectPage
- ProjectCardFront + ProjectCardBack: replace glass-raised with CardContainer
- Apply glass-surface-2 glass-elevation-1 glass-radius-2 in className

## Step 9 — Consumer: TimelineProjectContentCard
- Replace GlassSurface with CardContainer
- Apply glass-surface-1 glass-elevation-1 glass-radius-2 in className

## Step 10 — Validation
- Check for any remaining references to GlassSurface, glass-shadow-N, glass-raised
- Run pnpm lint
