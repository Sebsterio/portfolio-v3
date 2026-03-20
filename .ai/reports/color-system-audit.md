# Color System Centralisation Audit Brief

## Summary

- Canonical baseline is `dev` commit `595b394`.
- Color ownership is partially centralised already in `src/styles/theme.css` and `src/styles/system/*.css`.
- Main sources of drift are inline gradients/shadows, arbitrary Tailwind color values, default Tailwind palette bypasses, and route-level editorial effects.
- Highest-risk areas are magazine decorative strokes/glows and atmospheric background opacity stacks.
- Baseline before refactor: `pnpm lint` and `pnpm typecheck` passed on March 20, 2026.

## Recommended implementation direction

- Keep reusable raw color ownership in `src/styles/theme.css`.
- Keep reusable gradients in `src/styles/system/gradients.css`.
- Keep reusable glows/shadows/scrims in `src/styles/system/effects.css`.
- Keep reusable decorative stroke/glow treatments in `src/styles/system/decorative.css`.
- Keep glass/image/tag composite classes in `src/styles/system/surfaces.css` and `src/styles/components.css`.
- Convert app, component, and route consumers to consume named theme-backed utilities instead of literals.

## Exceptions

- Keep literal SVG `feDropShadow` colors in `src/app/_components/HamburgerIcon.tsx`.
- Exclude inactive `src/components/background/BubblesBG/*` from the refactor.
