# CONTEXT

## Verified current-state facts

- Stack in `package.json`: Next.js `16.1.6`, React `19.2.4`, TypeScript `5.9`, Tailwind CSS v4.
- App routes are under `src/app`.
- Projects mode routes are URL-addressable as:
  - `/projects/timeline`
  - `/projects/cards`
  - `/projects/magazine`
- Implemented detail routes:
  - `/projects/timeline/[slug]`
  - `/projects/cards/[slug]`
- Project data source and helpers:
  - `src/app/projects/_content.ts`
  - `src/app/projects/_lib.ts`
- Transition stack is active in:
  - `src/lib/transitions/components/TransitionProvider.tsx`
  - `src/lib/transitions/components/TransitionLink.tsx`
  - `src/lib/transitions/hooks/useTransitionRouter.ts`
  - `src/lib/transitions/components/PageTransition.tsx`
- Style layering entrypoint is `src/styles/globals.css`.

## Validation observations

- `pnpm lint` runs successfully.
- `pnpm typecheck` currently fails due to script misconfiguration in `package.json` (`tsc -p --noEmit`). <!-- FIXED -->
- `pnpm build` can fail in offline/sandboxed environments due Google Fonts fetch.

## Ambiguity sweep outcomes

- `TimelineLayoutClient`: <!-- FIXED -->
  - User confirmed it is deprecated and will be removed.
  - It is excluded from canonical architecture documentation.
- `src/app/projects/magazine/[slug]/` empty segment: <!-- FIXED -->
  - Directory exists without `page.tsx`.
  - No canonical runtime behavior is documented in permanent docs.
  - Keep as unresolved implementation artifact until explicitly specified.

## Deferred ADR candidates (no ADR files this pass)

- Projects view mode is URL-addressable.
- Navigation uses the custom view-transition layer.
- Styling uses the current Tailwind v4 CSS-first layered structure.

## `.ai/notes` influence rule

Files in `.ai/notes/` are supplemental background. They influence execution only when explicitly referenced by `.ai/task/*`.

<!-- Added at task completion: previously identified issues now resolved. -->

## Issues resolved during this task

- `pnpm typecheck` script misconfiguration has been fixed.
- `TimelineLayoutClient` has been removed.
- obsolete `src/app/projects/magazine/[slug]/` route artifact has been removed.
