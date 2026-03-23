# Plan: Effects & Gradients Cleanup

## Execution order
Steps are ordered by dependency. Read each file immediately before editing it.
Run `pnpm lint` after Step 7. Run a final class-name grep after Step 9.

---

## Step 1 — Rename shadow→glow in effects.css (CSS only, no component changes yet)

File: `src/styles/system/effects.css`

Renames (in the utility definitions section):
  shadow-dot-active      → glow-dot-active
  shadow-dot-inactive    → glow-dot-inactive
  shadow-brand-underline → glow-brand-underline
  shadow-atmosphere-1    → glow-atmosphere-1
  shadow-atmosphere-2    → glow-atmosphere-2
  shadow-particle-accent → glow-particle-accent
  shadow-particle-neutral→ glow-particle-neutral

DROP shadow-status-dot entirely (exact duplicate of glow-accent-lg).

Also apply alpha consolidation in the same pass (see Context.md):
  glow-particle-neutral: 25% → 20%
  glow-atmosphere-1/2:   30% → 20%
  shadow-accent-md:      35% → 40%
  shadow-showcase-badge outer:       35% → 40%,  inner: 15% → 20%
  shadow-showcase-badge-hover outer: 55% → 60%,  inner: 35% → 40%

Update the file header: migration table, glow/shadow section names, shadow-status-dot removal note.

---

## Step 2 — Rename bg-surface-glass → bg-fill in effects.css (CSS only)

File: `src/styles/system/effects.css`

  bg-surface-glass-sm → bg-fill-sm
  bg-surface-glass-md → bg-fill-md
  bg-surface-glass-lg → bg-fill-lg
  bg-surface-glass-xl → bg-fill-xl

Update header.

---

## Step 3 — Relocate glass-glint to surfaces.css

Move `glass-glint` and `glass-glint-active` @utility definitions from effects.css to surfaces.css.
Add them at the bottom of surfaces.css under a new `---- Interaction ----` section.
Remove from effects.css.
Update both file headers.

---

## Step 4 — Relocate focus-ring to utilities.css

Move `focus-ring` @utility from effects.css to utilities.css.
Add a `---- Interaction ----` section in utilities.css.
Remove from effects.css.
Update effects.css header.

---

## Step 5 — Relocate text-glow-editorial to effects.css

Move `.text-glow-editorial` from decorative.css to effects.css.
Place it in the Glow Scale section with a comment: text-shadow variant (vs box-shadow for the others).
Remove from decorative.css.
Update both file headers.

---

## Step 6 — Rename decorative-outline-soft → decorative-outline-mid in CSS

File: `src/styles/system/decorative.css`

  .decorative-outline-soft → .decorative-outline-mid

Update header to reflect: faint(8%), mid(10%), default(15%).

---

## Step 7 — Rename gradient-title-highlight → gradient-accent-sweep in CSS

File: `src/styles/system/gradients.css`

  gradient-title-highlight → gradient-accent-sweep

Update header.

---

## Step 8 — Update component files (all renames from Steps 1–7)

### shadow→glow renames
  TimelineDot.tsx:16       shadow-dot-active    → glow-dot-active
  TimelineDot.tsx:17       shadow-dot-inactive  → glow-dot-inactive
  AppHeader.tsx:59         shadow-brand-underline → glow-brand-underline
  FloatingShapesBg.tsx:5   shadow-atmosphere-1  → glow-atmosphere-1
  FloatingShapesBg.tsx:13  shadow-atmosphere-2  → glow-atmosphere-2
  PaerticlesBg.tsx:11      shadow-particle-accent → glow-particle-accent
  PaerticlesBg.tsx:11      shadow-particle-neutral → glow-particle-neutral
  StatusBadge.tsx:21       shadow-status-dot    → glow-accent-lg  (using the non-dropped utility)

### bg-surface-glass → bg-fill renames
  CardsProjectPage.tsx:108   bg-surface-glass-md → bg-fill-md,  bg-surface-glass-xl → bg-fill-xl
  TimelineProjectPage.tsx:112  hover:bg-surface-glass-sm → hover:bg-fill-sm
  TimelineProjectSidebarItem.tsx:10  hover:bg-surface-glass-sm → hover:bg-fill-sm
  DisplayModeSwitcher.tsx:51  bg-surface-glass-sm → bg-fill-sm,  bg-surface-glass-lg → bg-fill-lg
  Button/styles.ts:29-30    bg-surface-glass-sm → bg-fill-sm,  bg-surface-glass-lg → bg-fill-lg

### decorative-outline-soft → decorative-outline-mid
  MagazineSectionE.tsx:31  decorative-outline-soft → decorative-outline-mid

### gradient-accent-sweep (was gradient-title-highlight)
  Title.tsx  (search for `gradient-title-highlight` — appears in all three variant lineHighlight definitions)

---

## Step 9 — Update migration tables in CSS file headers

effects.css: add all Step 1+2 renames to migration table.
surfaces.css: add glass-glint relocation note.
decorative.css: add decorative-outline-soft rename.
gradients.css: add gradient-title-highlight rename.
utilities.css: add focus-ring relocation note.
CONVENTIONS.md: update any references to renamed classes.
ADR 001: add a brief entry for this cleanup pass.

---

## Step 10 — Validate

pnpm lint — must be clean.

Grep for old names (must all return zero hits in .tsx/.ts/.css, excluding comments/migration tables):
  shadow-status-dot
  shadow-dot-active
  shadow-dot-inactive
  shadow-brand-underline
  shadow-atmosphere-1
  shadow-atmosphere-2
  shadow-particle-accent
  shadow-particle-neutral
  bg-surface-glass
  decorative-outline-soft
  gradient-title-highlight
  glass-glint (in effects.css only — must be gone from there)
  text-glow-editorial (in decorative.css only — must be gone from there)
  focus-ring (in effects.css only — must be gone from there)

---

## Invariants
- No new visual concepts introduced
- No class-name changes other than those listed here
- glass-edge-glow relationship to gradient-reflection-horizontal-strong: document only, no merge
- shadow-showcase-badge name: keep as-is (hybrid shadow+glow, directional layer dominates)
- Editorial shadow alpha values (60%/70% black lift, 20% brand haze): leave unchanged
- glass-surface-* material opacities in surfaces.css: leave unchanged
