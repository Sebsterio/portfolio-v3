# Task: Complete the Semantic Color Layer — COMPLETED

## Status: ✅ Complete

## What was done

### theme.css
- Added `--color-accent: oklch(0.623 0.188 259.8)` as a dedicated semantic brand token in `@theme`
- Decoupled from `--color-accent-blue` — can now be remapped independently

### typography.css
- Removed `.text-accent` CSS class — superseded by Tailwind-generated `text-accent` utility from `--color-accent`
- Added `@utility text-label { @apply text-accent-cyan; }` — content-annotation role
- Converted entire emphasis scale (`text-primary` through `text-subtle`) and high-contrast scale from plain CSS classes to `@utility` definitions — enables modifier variants (`hover:text-primary`, `group-hover:text-label`, etc.)
- Updated doc header to reflect new Brand / Semantic section

### Component migrations (20 files)

**Neutral text** — `text-chrome-silver` / `text-chrome-silver/N` → semantic emphasis scale:
ShowcaseCard, ImpactList, AppHeader, MobileMenuOverlay, HamburgerIcon, DisplayModeSwitcher,
TimelineProjectPanel, TimelineProjectSidebarItem, CardsProjectPage

**Brand/interactive** — `text/bg/border-accent-blue` → `text/bg/border-accent`:
TechCategoryGroup, StatusBadge, ArrowIndicator, SectionHeader, TimelineDot,
TimelineProjectSidebarItem, TimelineProjectPage, CardsProjectPage, CardsCollectionPage

**Content annotation** — `text-accent-cyan` → `text-label`:
ImpactList, BackLink, ProjectTags, ArrowIndicator, TimelineProjectPanel,
TimelineProjectSidebarItem, TimelineProjectPage, TimelineCollectionPage,
CardsProjectPage, CardsCollectionPage, MagazineSectionA, MagazineSectionB,
MagazineSectionC, MagazineSectionD, MagazineSectionE, MagazineSectionMulti

**SVG hardcodes fixed** — HamburgerIcon:
`floodColor='rgb(59,130,246)'` → `style={{ floodColor: 'var(--color-accent)' }}`
`floodColor='rgb(255,255,255)'` → `style={{ floodColor: 'white' }}`

### docs/CONVENTIONS.md
- Added Color conventions section documenting the two-layer model, the full semantic token table,
  when raw palette is appropriate, and how to remap the brand color globally

## Intentional non-migrations
- `FloatingShapesBg` `border-accent-blue` — decorative, no semantic role
- `border-accent-cyan` in MagazineSectionD — editorial design decision
- `bg-chrome-dark` on TimelineDot inactive — specific named color, not a tone

## Validation
- `pnpm lint` — clean
- Final grep for raw palette violations — 1 hit (FloatingShapesBg, intentional exception)
- No CSS system files changed
