# Plan: Centralise Layout Styles — Phase 2

## Steps (in order)

### Step 1 — Convert `stack-*` to `@utility` in layout.css
Currently plain classes → silently broken when used as responsive modifiers.
Convert all four to `@utility` for consistency with overlay-full, panel-padding, etc.
Also convert `container-*` for consistency (even though responsive modifiers are unlikely there).
No visual change. No consumer changes needed.

### Step 2 — Add missing scale entries to layout.css
- `stack-xs` = `space-y-3`  (fills gap below stack-sm; used widely in tight content groups)
- `stack-2xl` = `space-y-10 md:space-y-12`  (page-column rhythm; enables Step 3)

### Step 3 — Align page column spacing (UX)
Home hero left column:  `space-y-8 md:space-y-12`  → `stack-2xl`
About main column:      `space-y-10 md:space-y-12` → `stack-2xl`
Effect: Home mobile spacing increases from 32px to 40px. This is a mild improvement —
the hero column currently feels slightly tighter than the about page at mobile.
Both pages now share the same named rhythm.

### Step 4 — Extract `ImpactList` shared component
New file: `src/components/ImpactList.tsx`
Props: `items: string[]`, `size?: 'sm' | 'md'` (default: 'md')
- 'md' = gap-3, standard text size (TimelineProjectPanel, ProjectCardBack)
- 'sm' = gap-2, text-sm, shrink-0 arrow (ExpandedMobileCard)
Replace the three inline `<ul>` blocks with `<ImpactList items={...} />`.
Export from `src/components/index.ts`.

### Step 5 — Adopt stack utilities across section-level stacks
Replace raw `space-y-N` with named stacks in contexts where the class represents
a genuine content section stack (not micro-spacing inside a component body).

Targets:
- `projects/layout.tsx`         space-y-8 → stack-lg, space-y-4 → stack-sm
- `TimelineCollectionPage.tsx`  space-y-8 → stack-lg (outer wrapper)
- `TimelineProjectPanel.tsx`    space-y-8 → stack-lg (content wrapper)
- `CardsCollectionPage.tsx`     space-y-8 → stack-lg (outer wrapper)

Leave raw values in:
- Deep card-body spacing (space-y-3 inside ProjectCardBack sections, etc.)
- Component-level micro-spacing that doesn't represent a section division
- Magazine sections (intentionally bespoke)

---

## What this does NOT include (and why)

| Pattern                                  | Decision  | Reason                                                       |
| ---------------------------------------- | --------- | ------------------------------------------------------------ |
| `space-y-3 md:space-y-4` title blocks    | Skip      | Only 2 hits, no appropriate named utility maps to it         |
| `gap-4 md:gap-6` card grid               | Skip      | Only 1 hit (About showcase grid), not worth a utility        |
| InfoCard inner body spacing              | Skip      | Content-specific; both values are intentionally different    |
| SectionHeader mb-8 default               | Skip      | Only 1 consumer, inline className is clear enough            |
| Magazine section spacing                 | Skip      | Intentionally bespoke editorial; do not systematise          |
| Root layout body/main spacing            | Skip      | Site-chrome, one-off values, no repetition                   |
| `CaseStudySection` component extraction  | Deferred  | Typography intentionally varies by scale; needs more thought |

---

## Validation
`pnpm lint` after implementation.
