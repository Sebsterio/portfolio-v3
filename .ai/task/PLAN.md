# PLAN

## Gate A

Objective: produce the planning artifacts only, grounded in live repo state, then stop for approval.

Outputs:

- `.ai/task/OVERVIEW.md`
- `.ai/task/CONTEXT.md`
- `.ai/task/PLAN.md`
- `.ai/reports/style-audit.md`
- `.ai/reports/STYLEMAP.md`

Required Gate A work:

- Record the actual style file tree and import order.
- Separate canonical anchors from drift, dead space, and page-local legacy.
- Document no-go inline-style exceptions and behavior-coupled areas.
- Revalidate provisional recurrence counts and candidate statuses against the live repo.
- Resolve `interactive-lift` as dead drift or an intended missing primitive, with a default future action.

Approval checkpoint:

- Stop after Gate A and request approval before any implementation edits under `src/**`.

## Gate B

Objective: typography normalization only for Gate A approved targets.

Planned batches:

1. Normalize owner files first.
   - Edit only the minimum CSS definitions needed in `system/typography.css` or `components.css`.
   - Preserve the current `globals.css` import order unless Gate A proved a narrow, necessary conflict.
2. Migrate approved exact clusters in shared anchors and project surfaces.
   - Exact clusters may use regex or codemod if they remain exact in real usage.
   - Near-exact patterns remain manual-review only unless Gate A resolves their semantic differences.

Validation after each batch:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm e2e` using the existing local server workflow

Stop and ask if:

- visual drift is unexpected
- a new semantic primitive would need to be invented
- the cluster is semantically ambiguous
- an inline style appears behavior-coupled

## Gate C

Objective: normalize repeatable surface and decoration patterns only where Gate A proved durable shared meaning.

Planned batches:

1. Shared surface shells
   - `GlassSurface`
   - `GlassCard`
   - safe shared decorative overlays already acting like primitives
2. Qualified project-route surface compositions
   - only if evidence shows cross-component reuse with stable meaning

Validation after each batch:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm e2e` using the existing local server workflow

Manual-review hotspots:

- `CardsProjectPage`
- `TimelineProjectPage`
- `AppHeader`
- `ShowcaseCard`
- magazine-only decorative surfaces

## Gate D

Objective: optional conservative layout abstraction only if Gates B/C leave a very small number of clearly semantic layout patterns with strong reuse.

Rules:

- Skip Gate D entirely unless the remaining layout repetition is small, exact, and clearly more maintainable as named primitives.
- Do not abstract short readable layout clusters by default.
- Near-exact layout families remain manual-review only.

Likely candidates to reassess, not pre-approved:

- `flex flex-wrap gap-2`
- `flex items-center gap-3`
- `flex items-center gap-4`

## Safe Automation Opportunities

- Regex candidates are limited to exact, contiguous class clusters that Gate A confirms have one meaning.
- Codemod candidates are reserved for exact patterns that are split across `cn()` arguments but still semantically exact after Gate A review.
- Manual edits are required for near-exact families, inline-style exceptions, route-local magazine treatments, and anything touching transition or 3D behavior.

## Stop-And-Ask Conditions

- Validation shows unexpected visual drift.
- A replacement requires inventing a new semantic primitive.
- A repeated cluster is semantically ambiguous.
- An inline style appears coupled to measurement, animation, view transitions, 3D, or interaction state.
- A proposed ownership move would require changing `globals.css` import order without a narrow, repo-proven conflict.

## Required Batch Output Template

For each future implementation batch, report:

- objective
- exact files to edit
- replacement rules to apply
- exceptions intentionally skipped
- validation commands
- result summary
- visual diff summary
- recommendation for next smallest batch

## Validation Baseline To Carry Forward

- `pnpm lint` currently passes.
- `pnpm typecheck` currently passes.
- `pnpm build` in Windows Codex may fail in sandbox with `spawn EPERM`; rerun unsandboxed and treat that result as authoritative.
- `pnpm e2e` depends on the existing local server workflow and fails if no app is running on `http://localhost:3000`.
