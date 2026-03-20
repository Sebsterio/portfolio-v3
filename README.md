# portfolio-v3

Personal portfolio and case-study site built with Next.js App Router.

## Quick start

1. `pnpm install`
2. `pnpm dev`
3. Open `http://localhost:3000`

## Commands

- `pnpm dev` - start local development server
- `pnpm lint` - run ESLint
- `pnpm typecheck` - run TypeScript check
- `pnpm test` - run Vitest tests
- `pnpm e2e` - run Playwright visual regression tests
- `pnpm build` - run production build
- `pnpm start` - start production server

## Repo map

- `src/app` - App Router routes, layouts, and route-scoped modules
- `src/components` - shared UI components
- `src/lib` - shared utilities and transition orchestration
- `src/styles` - global and system CSS layers
- `e2e` - Playwright VRT tests and helpers
- `docs` - permanent repository documentation
- `.ai` - temporary task workspace and support material

## Documentation map

- `README.md` - concise human entrypoint
- `AGENTS.md` - mandatory agent operating procedure
- `docs/PROJECT_BRIEF.md` - current product/site intent for implemented surfaces
- `docs/ARCHITECTURE.md` - current technical structure
- `docs/CONVENTIONS.md` - deterministic implementation conventions
- `docs/adr/` - ADR location (no ADR files yet)
- `.ai/task/` - active task workspace
- `.ai/notes/` - supplemental background material
- `.ai/scratch/` - disposable rough work
- `.ai/reports/` - temporary audits and review outputs

## Agent workflow

- Plan first, wait for approval, then implement.
- Code on the `dev` branch is canonical.

---

## E2E

Run Playwright via a wrapper:

```bash
pnpm e2e [flags] [playwright args]  # Example: `pnpm e2e --full --dev --ui`
```

| Behavior                | Flags                                        | Result               |
| ----------------------- | -------------------------------------------- | -------------------- |
| Update snapshots        | `--update`, `-U`                             | `--update-snapshots` |
| Use dev server          | `--dev`, `-D`                                | `DEV=1`              |
| Select preset projects  | `--[mode]`, `-[M]` (e.g. `--mobile`, `-M`)   | `MODE=[mode]`        |
| Select specific project | `--project [project]`, `--project=[project]` | arg passed through   |
| Pass-through arguments  | `--ui`, unknown args                         | arg passed through   |

**Modes:** `quick` · `responsive` · `mobile` · `vendors` · `full`
