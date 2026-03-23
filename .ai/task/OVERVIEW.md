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

## Status: READY
