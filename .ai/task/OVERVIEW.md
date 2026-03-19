# Task: Full Layout System — Phases 1–4 — COMPLETE

## All steps completed

### Phase 1 — layout.css rewritten
- Full token vocabulary: stack-2xs through stack-2xl, cluster-xs/sm/md/lg,
  padding-card / padding-card-lg / padding-panel, all as @utility
- panel-padding removed (renamed to padding-panel)
- Comment header documents all tokens with semantic descriptions

### Phase 2 — Component padding defaults
- InfoCard:                p-8           → padding-card
- ShowcaseCard:            p-6 sm:p-8 md:p-10  → padding-card-lg
- TimelineCard:            p-8           → padding-card
- ProjectCard:             p-8           → padding-card
- TimelineProjectPanel:    panel-padding → padding-panel
- ProjectCardFront/Back:   panel-padding → padding-panel

### Phase 3 — New components
- CaseStudySection created (src/components/CaseStudySection.tsx)
  size='md' — heading-2, body text (TimelineProjectPanel)
  size='sm' — heading-3 bold, body-sm (ExpandedMobileCard)
- Section reworked: optional title prop renders SectionHeader internally,
  stack-lg spacing between header and content
- Both exported from src/components/index.ts
- TimelineProjectPanel: inline heading+body pairs → CaseStudySection
- TimelineProjectPage: ImpactSection local component removed, replaced with CaseStudySection size='sm'

### Phase 4 — Page migration
- about/page.tsx: Section + SectionHeader inline pattern → Section title= API; SectionHeader import removed
- UnderConstructionPage.tsx: space-y-10 → stack-2xl

## Validation
pnpm lint — exit code 0 ✅
