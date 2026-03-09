# STYLEMAP

Gate A draft map of safe find patterns, provisional replacement recipes, and explicit exceptions. This document is derived from the live repo state.

All recurrence counts, owner proposals, and candidate statuses below are provisional and must be revalidated against the live repo during Gate A before any implementation gate begins.

## Rules

- Exact clusters are eligible for `regex` or `codemod` by default.
- Near-exact clusters are documentation/manual-review candidates only.
- Do not auto-migrate near-exact patterns unless Gate A explicitly resolves the semantic differences.
- Do not introduce a new semantic class unless an existing class cannot express the pattern, the pattern is durable and reusable, and the name reflects meaning rather than local appearance.
- Do not replace a short, readable utility cluster unless Gate A proves a clear maintainability win and a better long-term owner.
- Status vocabulary:
  - `qualified`
  - `prequalified-exception-manual-review`
  - `skip-unless-Gate-A-finds-more-reuse`
  - `skip`

## Candidate Ledger

| Cluster or pattern | Count | Files / components | Proposed owner | Method | Status | Gate A note |
| --- | ---: | --- | --- | --- | --- | --- |
| `font-urbanist text-2xl font-bold text-chrome-silver` | 5 | `CardsCollectionPage`, `TimelineCollectionPage`, `TimelineProjectContentCard` | `src/styles/system/typography.css` | `regex` only if exact meaning holds | `prequalified-exception-manual-review` | exact cluster, but meaning may differ between card titles and section headings |
| `font-urbanist text-lg font-bold text-chrome-silver` | 4 | `TimelineProjectPage`, `GlassCard` | `src/styles/system/typography.css` | `manual` | `prequalified-exception-manual-review` | exact cluster, mixed title/subheading role |
| `text-sm md:text-base leading-relaxed text-chrome-silver/75` | 6 | `MagazineSectionA/B/C/D/E/Multi` | `src/styles/components.css` | `regex` only if exact magazine body role is confirmed | `prequalified-exception-manual-review` | route-local exact cluster, not yet app-wide |
| `text-xs text-accent-cyan font-dm-sans` | 3 | `CardsCollectionPage`, `TimelineProjectPage`, `TimelineProjectSidebarItem` | `src/styles/system/typography.css` | `regex` only if exact metadata meaning is confirmed | `prequalified-exception-manual-review` | likely stable metadata family, needs recheck |
| `overlay-full reflection-diagonal` | 2 | `GlassCard`, `ShowcaseCard` | `src/styles/components.css` | `manual` | `skip-unless-Gate-A-finds-more-reuse` | below non-layout threshold |
| Gradient CTA family | 3 variants | `TimelineProjectContentCard`, `TimelineProjectPage`, `CardsProjectPage` | `src/styles/components.css` | `manual` | `skip-unless-Gate-A-finds-more-reuse` | near-exact family, split across args, not automation-safe |
| Tag-pill family | 2 main variants | `ProjectTags`, `TechPill` | `src/styles/components.css` | `manual` | `skip-unless-Gate-A-finds-more-reuse` | near-exact family with different visual density and meaning |
| `flex flex-wrap gap-2` | 3 | `ProjectTags`, `TechCategoryGroup`, `TechTags` | undecided between `components.css` and `system/layout.css` | `manual` | `skip-unless-Gate-A-finds-more-reuse` | layout cluster below Gate D threshold |
| `flex items-center gap-3` | 4 | `TimelineCollectionPage`, `TimelineProjectPage`, `heading-section` composition | `src/styles/system/layout.css` | `manual` | `prequalified-exception-manual-review` | exact count meets reuse count, but semantics are mixed |
| `flex items-center gap-4` | 2 | `CardsProjectPage`, `TimelineProjectContentCard` | `src/styles/system/layout.css` | `manual` | `skip-unless-Gate-A-finds-more-reuse` | below Gate D threshold |
| `interactive-lift` | 1 reference, 0 defs | `Button/styles.ts` | none by default | `manual` | `skip` | provisional Gate A classification: dead drift unless more evidence appears |

## Find Patterns

These are repo-derived searches to reuse during later gates.

### Exact cluster searches

```powershell
rg -n "font-urbanist text-2xl font-bold text-chrome-silver" src
rg -n "font-urbanist text-lg font-bold text-chrome-silver" src
rg -n "text-sm md:text-base leading-relaxed text-chrome-silver/75" src
rg -n "text-xs text-accent-cyan font-dm-sans" src
rg -n "overlay-full reflection-diagonal" src
rg -n "interactive-lift" src
```

### Near-exact family searches

```powershell
rg -n "gradient-primary text-white" src
rg -n "bg-accent-blue/10" src/components src/app/projects
rg -n "flex flex-wrap gap-2" src/components src/app/projects
rg -n "flex items-center gap-3" src/components src/app/projects
rg -n "flex items-center gap-4" src/components src/app/projects
```

### Exception searches

```powershell
rg -n "viewTransitionName|transformStyle|backfaceVisibility|WebkitBackfaceVisibility" src
rg -n "style=\{" src/app/projects src/components src/app/_components
```

## Replacement Recipes

These are provisional recipes only. No replacement is approved until Gate A revalidation is complete.

### Exact clusters

1. Revalidate recurrence and meaning.
2. Confirm the owner file is clearer than raw utilities.
3. Prefer existing semantic classes first.
4. If no existing class fits and the pattern meets the naming rule, add a narrowly named semantic class.
5. Migrate exact contiguous uses with `regex` only after validating a sample set.
6. If the exact cluster is split across `cn()` arguments, prefer a codemod or manual edit instead of regex.

### Near-exact families

1. Document the variants first.
2. Resolve semantic differences explicitly.
3. If the differences remain meaningful, keep raw utilities.
4. If a family later becomes exact enough and durable enough, reclassify it in Gate A before migration.

### interactive-lift

Current repo evidence:

- Referenced in `src/components/Button/styles.ts`
- No definition found anywhere under `src/styles`

Default future action:

- treat as dead drift
- prefer removal or remapping to existing explicit hover classes already present in button styles
- do not create a new `interactive-lift` primitive unless Gate A finds broader durable reuse

## Candidate Automation Buckets

### Regex candidates

Only if Gate A confirms one stable meaning:

- `font-urbanist text-2xl font-bold text-chrome-silver`
- `text-sm md:text-base leading-relaxed text-chrome-silver/75`
- `text-xs text-accent-cyan font-dm-sans`

### Codemod candidates

No preapproved codemod targets yet.

Potential future codemod territory only if Gate A resolves semantics:

- exact clusters split across multiple `cn()` arguments
- exact clusters embedded in arrays or object maps

### Manual-only candidates

- `font-urbanist text-lg font-bold text-chrome-silver`
- `overlay-full reflection-diagonal`
- gradient CTA family
- tag-pill family
- layout cluster candidates
- any style inside exception territory
- any pattern that remains near-exact after Gate A review

## Exceptions And Do-Not-Replace Rules

Do not replace these by default:

- inline `viewTransitionName`
- `transformStyle`
- `backfaceVisibility`
- `WebkitBackfaceVisibility`
- DOM-measured height assignment
- 3D depth transforms
- backdrop styles coupled to VT behavior
- template-literal class families whose exact semantics are unresolved

High-risk files:

- `src/app/projects/cards/_components/CardsProjectPage.tsx`
- `src/app/projects/timeline/_components/TimelineProjectPage.tsx`
- `src/components/ui/GlassSurface.tsx`

Manual-review files:

- `src/app/_components/AppHeader.tsx`
- `src/components/ShowcaseCard.tsx`
- `src/components/StatusBadge.tsx`
- `src/components/typography/Title.tsx`
- `src/app/projects/magazine/_components/*`

## Verification Checklist

### Gate A

- verify file paths and commands in docs
- verify recurrence counts against current repo
- verify candidate statuses and owner proposals
- stop and request approval before editing `src/**`

### Later implementation gates

- run `pnpm lint`
- run `pnpm typecheck`
- run `pnpm build`
- run `pnpm e2e` using the existing local server workflow
- if `build` fails because Google Fonts cannot be fetched offline, report that exact cause
- if `e2e` cannot run for non-refactor reasons, report that explicitly and continue
- never update snapshots

## Batch Reporting Template

Each implementation batch should report:

- objective
- exact files to edit
- replacement rules to apply
- exceptions intentionally skipped
- validation commands
- result summary
- visual diff summary
- recommendation for next smallest batch
