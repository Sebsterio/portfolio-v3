# Task: Centralise Internal Layout Styles — COMPLETE

## Steps completed

| Step | Description                                      | Status |
| ---- | ------------------------------------------------ | ------ |
| 1    | Convert stack/container/cluster to `@utility`    | ✅ Done |
| 2    | Add `stack-xs` and `stack-2xl` to scale          | ✅ Done |
| 3    | Align page column spacing (Home + About)         | ✅ Done |
| 4    | Extract `ImpactList` shared component            | ✅ Done |
| 5    | Adopt stack utilities across section-level stacks | ✅ Done |

## Files changed

### layout.css
- All stack/container/cluster utilities converted from plain classes to `@utility`
- `stack-xs` (space-y-3) and `stack-2xl` (space-y-10 md:space-y-12) added
- Comment header updated

### Pages
- `app/(home)/page.tsx` — `space-y-8 md:space-y-12` → `stack-2xl`
- `app/about/page.tsx` — `space-y-10 md:space-y-12` → `stack-2xl`

### New component
- `src/components/ImpactList.tsx` — created (size='sm'|'md')
- `src/components/index.ts` — ImpactList exported

### ImpactList consumers
- `timeline/_components/TimelineProjectPanel.tsx` — inline ul replaced
- `cards/_components/CardsProjectPage.tsx` — inline ul replaced (ProjectCardBack)
- `timeline/_components/TimelineProjectPage.tsx` — inline ul replaced (ExpandedMobileCard, size='sm')

### Stack utility adoptions
- `app/projects/layout.tsx` — space-y-16/8/4 → stack-xl/lg/sm
- `timeline/_components/TimelineProjectPanel.tsx` — space-y-8 → stack-lg
- `timeline/_components/TimelineCollectionPage.tsx` — space-y-8 → stack-lg (outer), space-y-6 → stack-md (mobile)
- `cards/_components/CardsCollectionPage.tsx` — space-y-8 → stack-lg

## Validation
pnpm lint — exit code 0 ✅
