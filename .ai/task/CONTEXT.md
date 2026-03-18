# Context: Centralise Layout Styles — Full Audit

## Files read

### Route pages
- `app/(home)/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx` (stub)
- `app/projects/page.tsx` (redirect)
- `app/projects/layout.tsx`
- `app/layout.tsx` (root)

### Shared components
- `components/ui/Card.tsx`, `Panel.tsx`
- `components/InfoCard.tsx`, `ShowcaseCard.tsx`
- `components/Section.tsx`, `SectionHeader.tsx`
- `components/LabeledValueRow.tsx`, `TechCategoryGroup.tsx`
- `components/StatusBadge.tsx`, `ProjectTags.tsx`
- `components/typography/Title.tsx`, `TextBlock.tsx`

### Timeline route
- `timeline/_components/TimelineCard.tsx`
- `timeline/_components/TimelineCollectionPage.tsx`
- `timeline/_components/TimelineProjectPage.tsx`
- `timeline/_components/TimelineProjectPanel.tsx`
- `timeline/_components/TimelineProjectSidebarItem.tsx`

### Cards route
- `cards/_components/CardsCollectionPage.tsx`
- `cards/_components/CardsProjectPage.tsx`

### Magazine route
- `magazine/_components/MagazineCollectionPage.tsx`
- `magazine/_components/MagazineSectionA.tsx`
- `magazine/_components/MagazineSectionB.tsx`

---

## Finding 1 — stack utilities exist but are almost never used

layout.css defines: stack-xs (missing), stack-sm, stack-md, stack-lg, stack-xl
Actual usage in codebase: 0 instances. Everything uses raw `space-y-N` throughout.
This is the primary fragmentation — the vocabulary exists but is not adopted.

## Finding 2 — stack utilities are plain classes, not @utility

Critical issue: `stack-sm/md/lg/xl` are defined with `.stack-sm { @apply ... }`,
not `@utility stack-sm { @apply ... }`.
Per the design system and DESIGN-SYSTEM.md: anything used with responsive modifiers
(e.g. `md:stack-lg`) MUST be `@utility`. Plain classes silently break when used as modifiers.
The overlay helpers (already @utility) and panel-padding (just added, @utility) are correct.
The stack classes are inconsistent with the rest of the system.

## Finding 3 — page column spacing is inconsistent across pages

Home hero left column:    `space-y-8  md:space-y-12`   (32px / 48px)
About main column:        `space-y-10 md:space-y-12`   (40px / 48px)
No matching named utility exists for either value.
These are semantically identical contexts (primary page content column).
Mobile discrepancy (8 vs 10) reads as accidental drift, not intentional design difference.

## Finding 4 — ImpactList markup is triply duplicated

Three components render the same arrow-prefixed bullet list:

TimelineProjectPanel:
  <ul className='space-y-2'>
    <li className='flex items-start gap-3'>
      <span className='mt-1 text-accent-cyan'>→</span>
      <span className='text-chrome-silver/80'>{item}</span>

ProjectCardBack:
  <ul className='space-y-2'>
    {project.impact.map((item) => (
      <li key={item} className='flex items-start gap-3'>
        <span className='mt-1 text-accent-cyan'>→</span>
        <span className='text-sm text-chrome-silver/90 md:text-base'>{item}</span>

ExpandedMobileCard (timeline):
  <ul className='space-y-2'>
    {p.impact.map((item, i) => (
      <li key={i} className='flex items-start gap-2 text-sm'>
        <span className='mt-0.5 shrink-0 text-accent-cyan'>→</span>
        <span className='text-chrome-silver/80'>{item}</span>

Differences: gap-3 vs gap-2 (sm variant), text-sm on the item text (sm variant).
A shared `ImpactList` component with a `size` prop covers all three.

## Finding 5 — showcase card stack gap differs between Home and About

Home (flex-col stack of cards):    `space-y-4 md:space-y-6`
About (CSS grid of cards):         `gap-4 md:gap-6`
These are different CSS properties and different layout contexts. Cannot be unified
into one class. The values are intentionally parallel. Leave as-is.

## Finding 6 — Magazine sections are intentionally bespoke

MagazineSectionA–E are editorial layouts with custom spacing per section.
No attempt to centralise — they are correct to vary.

## Finding 7 — SectionHeader consumer spacing is inline but only used once

`<SectionHeader title={...} className='mb-8' />` — About page only.
Not worth making a default. Ignore.

## Finding 8 — `space-y-3 md:space-y-4` appears in 2 card title blocks

TimelineProjectPanel and ProjectCardFront both have:
`<div className='space-y-3 md:space-y-4'>` for the period/title/company header.
Only 2 hits. Not enough to justify a named utility. Document as a watch pattern.
