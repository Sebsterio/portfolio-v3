# Color System Centralisation

Centralise reusable color ownership in the Tailwind design-system stylesheets and migrate consumers away from hardcoded color literals, arbitrary color utilities, and scattered inline color styles.

Approved implementation scope:
- add missing reusable color/runtime tokens and named utilities in `src/styles`
- migrate shared app-shell, background, and project-route consumers to those tokens/utilities
- materialise the audit brief in `.ai/reports/color-system-audit.md`

Explicit exclusions:
- keep SVG `feDropShadow` literals in `src/app/_components/HamburgerIcon.tsx`
- leave inactive `src/components/background/BubblesBG/*` out of scope
