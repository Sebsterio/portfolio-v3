# Context: Documentation Cleanup

## Repo truth verified

- `src/app/projects/page.tsx` redirects `/projects` to `/projects/timeline`.
- `src/app/projects/magazine/[slug]/page.tsx` exists and redirects to an anchor in `/projects/magazine`.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`.
- `vitest.config.mts` includes `src/**/*.test.{ts,tsx}` and the only current matching test file is `src/temp/TestComponent.test.tsx`.
- `README.md` currently duplicates agent workflow rules already owned by `AGENTS.md`.
- `docs/CONVENTIONS.md` currently contains Codex/sandbox-specific build guidance that is not repository truth.

## Relevant docs

- `AGENTS.md`
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/CONVENTIONS.md`

## Open question

- Which design-system file, if any, should remain part of the authoritative permanent doc set?
