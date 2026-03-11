# OVERVIEW

## Objective

Complete Gate A for the style-system refactor: validate the live styling architecture, record repo-derived evidence for any future abstraction, and prepare a safe execution spec that stops for approval before any implementation edits under `src/**`.

## Scope

- Docs-only for this gate.
- Populate `.ai/task/OVERVIEW.md`, `.ai/task/CONTEXT.md`, `.ai/task/PLAN.md`.
- Create `.ai/reports/style-audit.md` and `.ai/reports/STYLEMAP.md`.
- Base all conclusions on the current repository state, with background notes treated as supplemental only.

## Restrictions

- Do not edit implementation files in this gate.
- Preserve the current `src/styles/globals.css` import order unless Gate A finds a specific, repo-proven conflict that requires a narrow change. No broad relayering pass.
- Future implementation scope stays limited to CSS files, `className` strings, and only those inline-style removals that Gate A proves are not behavior-coupled.
- Do not introduce a new semantic class unless an existing class cannot express the pattern, the pattern is durable and reusable, and the name reflects meaning rather than local appearance.
- Do not replace a short, readable utility cluster with a semantic class unless Gate A proves a clear maintainability win and a better long-term owner.
- Exact clusters are automation candidates; near-exact clusters are manual-review candidates only until Gate A resolves their semantic differences.
- Do not change route structure, transition-aware navigation flow, URL-addressable project modes, project data flow, or snapshots.
- Do not change Playwright or local server setup in this task.

## Acceptance Bar

- Every required Gate A artifact exists and is grounded in the live repo.
- The audit documents the actual style file tree, import order, active primitives, drift, dead space, and high-risk exception territory.
- `STYLEMAP` records provisional evidence for each candidate replacement: exact cluster, recurrence count, files/components, proposed owner, migration method, and status.
- `interactive-lift` is explicitly classified as dead drift or a missing intended primitive, with a default future action.
- The plan includes explicit approval checkpoints, stop-and-ask conditions, validation rules, and per-batch reporting requirements.
- Gate A ends with a hard stop before any `src/**` changes.

## Known Risks

- `src/app/projects/cards/_components/CardsProjectPage.tsx` contains dynamic `viewTransitionName`, DOM-measured height, `transformStyle`, `backfaceVisibility`, `WebkitBackfaceVisibility`, and depth transforms.
- `src/app/projects/timeline/_components/TimelineProjectPage.tsx` mixes `viewTransitionName` with computed height for timeline layout.
- `src/components/ui/GlassSurface.tsx` carries an existing note that backdrop behavior glitches when a view-transition name is involved.
- `src/styles/system/typography.css` defines many semantic classes that are not yet broadly consumed, so definitions are not proof of canonical usage.
- `src/components/Button/styles.ts` references `interactive-lift`, which is currently undefined anywhere in `src/styles`.

## Known Exceptions

- Keep inline `viewTransitionName` styles in exception territory by default.
- Keep `transformStyle`, `backfaceVisibility`, `WebkitBackfaceVisibility`, and DOM-measured height assignment untouched unless separately approved.
- Treat motion/background style objects and other rendering-coupled inline styles as manual-review exceptions.

## Referenced Inputs

- Repo instructions: `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, `docs/PROJECT_BRIEF.md`.
- Supplemental notes referenced for this task: `.ai/notes/design-system-refactor.md`, `.ai/notes/design-system-roadmap.md`, `.ai/notes/repo-style-analysis.md`.
- Canonical truth for Gate A remains live code and config on the current repo state.
