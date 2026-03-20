# Plan: Complete the Semantic Color Layer

## Steps

### Step 1 — Add --color-accent to @theme (theme.css)
Add directly after --color-accent-purple. Same oklch as accent-blue today.
Comment: "Semantic brand/interactive accent — decoupled from accent-blue palette token."

### Step 2 — Update typography.css
- Remove `.text-accent { @apply text-accent-blue; }` — superseded by @theme-generated utility
- Add `.text-label { @apply text-accent-cyan; }` with role comment
- Update Scale and Brand doc sections to reflect both changes

### Step 3 — Migrate neutral text (text-chrome-silver → semantic)
Rule: text-chrome-silver → text-primary / text-chrome-silver/80 → text-secondary
Files: ShowcaseCard, ImpactList, TimelineProjectPanel, TimelineProjectPage,
       CardsProjectPage, AppHeader, HamburgerIcon, MobileMenuOverlay, DisplayModeSwitcher

### Step 4 — Migrate text-accent-blue → text-accent (semantic text)
Files: TechCategoryGroup, StatusBadge, MobileMenuOverlay (hover state)

### Step 5 — Migrate bg/border-accent-blue → bg/border-accent
Files: StatusBadge, ArrowIndicator, TimelineDot, SectionHeader,
       TimelineProjectSidebarItem, TimelineProjectPage, CardsProjectPage, CardsCollectionPage

### Step 6 — Migrate text-accent-cyan → text-label (content annotation)
Files: ArrowIndicator (glyph), BackLink, ImpactList (arrow glyph), ProjectTags,
       TimelineProjectSidebarItem, TimelineProjectPanel, TimelineProjectPage,
       TimelineCollectionPage, MagazineSectionMulti, MagazineSectionE, MagazineSectionD,
       CardsProjectPage

### Step 7 — Fix HamburgerIcon SVG hardcodes
Replace floodColor='rgb(59,130,246)' with style={{ floodColor: 'var(--color-accent-blue)' }}
Replace floodColor='rgb(255,255,255)' with style={{ floodColor: 'white' }}
Remove floodOpacity from attribute — move to style object

### Step 8 — Update CONVENTIONS.md
Add semantic color layer rules: when to use semantic vs raw palette.

### Step 9 — pnpm lint + verification grep

## Invariants
- Background components (FloatingShapesBg, PaerticlesBg) — leave raw, decorative intent
- border-accent-cyan in MagazineSectionD/Multi — leave raw, editorial design decision
- text-chrome-dark in TimelineDot inactive state — leave raw, specific inactive state color
- All CSS system files (effects, surfaces, gradients, decorative) — no changes needed
