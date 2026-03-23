# Task: Design System — Effects & Gradients Cleanup

## Objective
Fix naming inconsistencies, eliminate duplicates, relocate misplaced classes, and consolidate
alpha values across effects.css, surfaces.css, gradients.css, decorative.css, and their component
consumers. All changes are either pure renames or value consolidations. No new visual concepts.

## Root causes
The system files were authored incrementally and in isolation. Several patterns emerged:
- "shadow" used for both positional (offset) and radial (zero-offset/glow) effects
- Component-specific names leaked into the system layer
- Classes landed in whichever file was open at the time, not where they conceptually belong
- Opacity values chosen per-call-site with no documented scale

## Status: COMPLETE

## Progress
- [x] effects.css — rename shadow→glow, drop shadow-status-dot, alpha consolidation, rename bg-surface-glass→bg-fill, remove glass-glint + focus-ring, add text-glow-editorial to glow section, header update
- [x] surfaces.css — add glass-glint section, header update
- [x] utilities.css — add focus-ring, remove dead commented code
- [x] decorative.css — remove text-glow-editorial definition, rename decorative-outline-soft→mid, header update
- [x] gradients.css — rename gradient-title-highlight→gradient-accent-sweep, header update
- [x] components — all renames (Step 8)
- [x] docs — CONVENTIONS.md glow/shadow convention, ADR addendum
- [x] validate — pnpm lint clean, old-name grep all clear
