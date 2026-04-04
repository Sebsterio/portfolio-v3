# Active Task Context

- `src/lib/theme/runtime.ts` currently mixes project data access, route resolution, DOM mutation, and bootstrap script generation.
- `src/app/layout.tsx` injects the theme bootstrap inline by calling `getThemeBootstrapScript()`.
- `src/lib/transitions/components/TransitionProvider.tsx` currently commits route themes, which couples theme routing to view-transition orchestration.
- `src/app/projects/_lib.ts` already centralizes project-derived lookups and is the preferred server-side boundary for theme data access.
