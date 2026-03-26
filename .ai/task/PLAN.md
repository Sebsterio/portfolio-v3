# PLAN — View Transition Mobile Performance Fixes

## Priority order

1. [Critical] Timeout guard on navigationComplete — JS correctness
2. [High]    Glass compositing hazard — wrapper div + CSS disable
3. [High]    Mobile duration reduction — CSS only
4. [Medium]  animation-fill-mode: both — CSS only
5. [Low]     Slide distance reduction — deferred (see note)

---

## Fix 1 — Timeout guard (Critical · Correctness)

**File:** `src/lib/transitions/components/TransitionProvider.tsx`

**Mechanism:**
In `useTransition`, race `navigationComplete` against a timeout Promise.
If the timeout wins, resolve anyway and warn in dev. Timeout: 1500ms.
Also add `setIsTransitioning(false)` inside the `catch` block of
`executeTransition` to handle the VT-error path.

```ts
// pseudocode
const timeout = new Promise<void>((resolve) => {
  setTimeout(() => {
    if (resolveNavigation.current) {
      devWarn('[Transition] navigationComplete timed out — resolving fallback');
      resolve();
    }
  }, 1500);
});
const guardedComplete = Promise.race([navigationComplete, timeout]);
await executeTransition(action, guardedComplete, config?.skip);
```

The `catch` in `executeTransition` must also call `setIsTransitioning(false)`.

**Risk:** Zero visual regression — affects only the error/hung path.
**Validation:** `pnpm lint` + `pnpm typecheck`.
**Approval required:** No (purely additive, structural).

---

## Fix 2 — Glass compositing hazard (High · GPU compositing)

Two sub-parts: structural (B) + CSS safety layer (A).

### Fix 2a — Wrapper div (Option B)

**Files:**
- `src/app/projects/timeline/_components/TimelineCollectionPage.tsx`
- `src/app/projects/timeline/_components/TimelineProjectPage.tsx`

**Mechanism:**
Move `style={{ viewTransitionName: 'project-card-N' }}` from the glass-surface
element onto a plain wrapping `<div>`. The wrapper has no backdrop-filter. The
glass card is a child; its blurred appearance is baked into the VT snapshot.

TimelineCollectionPage (mobile section):
```tsx
// Before
<TimelineCard ... style={{ viewTransitionName: `project-card-${project.id}` }}>

// After
<div style={{ viewTransitionName: `project-card-${project.id}` }}>
  <TimelineCard ...>
```

TimelineProjectPage ExpandedMobileCard:
```tsx
// Before
<Panel className='glass-radius-2 glass-surface-1 ...' style={{ viewTransitionName: ... }}>

// After
<div style={{ viewTransitionName: `project-card-${p.id}` }}>
  <Panel className='glass-radius-2 glass-surface-1 ...'>
```

CollapsedMobileItem `<button>` keeps its VT name as-is (no blur on it).

**Risk:** Negligible. The morph still works — the wrapper div captures the same
visual bounds. Snapshot includes full glass appearance (baked). No visible change.
**Requires visual confirmation:** Yes — flag for manual check after implementation.
**Approval required:** Yes (structural change to component tree in transition path).

### Fix 2b — CSS safety layer (Option A, belt-and-braces)

**File:** `src/styles/vt-styles.css` (or `utilities.css`)

**Mechanism:**
Add a rule that disables backdrop-filter on glass surfaces while transitioning.
Targets any residual live-element recompositing during the animation phase.
Visually safe: VT hides live elements behind pseudo-elements during animation.

```css
[data-transitioning] .glass-surface-1,
[data-transitioning] .glass-surface-2,
[data-transitioning] .glass-surface-3 {
  backdrop-filter: none;
}
```

**Risk:** Zero visual regression (live elements are hidden during VT animation).
**Approval required:** No (additive CSS, no visible effect under normal conditions).

---

## Fix 3 — Mobile duration reduction (High · Duration)

**File:** `src/styles/vt-styles.css`

**Mechanism:**
Add `@media (pointer: coarse)` block overriding the duration CSS custom properties.
Target: exit ≤150ms, enter ≤280ms. Scoped to touch devices; desktop unchanged.

```css
@media (pointer: coarse) {
  :root {
    --duration-vt-exit:  150ms;
    --duration-vt-enter: 280ms;
  }
}
```

**Risk:** No functional regression. Desktop timing unchanged.
**Approval required:** No (scoped to touch devices, additive).

---

## Fix 4 — animation-fill-mode: both (Medium · CSS paint)

**File:** `src/styles/vt-styles.css`

**Mechanism:**
Add `animation-fill-mode: both` to `::view-transition-old(*)` and
`::view-transition-new(*)` base rules. Prevents elements snapping to their
un-animated state at frame 0 during slide keyframes.

**Risk:** Very low. Best-practice addition; no visible regression expected.
**Approval required:** No (additive).

---

## Fix 5 — Slide distance reduction (Low · CSS paint) — DEFERRED

The `100%` value in `translateX(100%)` is element-own-width, not viewport width.
For per-card VT names this is card-width only. For page-level slots (main, t-list,
m-page) the element IS full-width, so the slide IS full-width on mobile.

Decision: keep at 100% for now. After fixes 1-4 are applied and tested on a
throttled mobile profile, revisit if the full-width slide on page-level slots
(main, t-list) still causes visible jank. If needed, a @media (pointer: coarse)
override of --distance-vt-slide: 45% can be added with minimal risk.

---

## Validation checklist

- [ ] `pnpm lint` — zero errors after every file change
- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm build` — completes
- [ ] Manual: throttled Chrome DevTools mobile (Moto G4) — navigate between
      /, /about, /projects/timeline, /projects/timeline/[slug]
- [ ] Visual confirm: Fix 2a morph still looks correct (wrapper div bounds match)
- [ ] Confirm prefers-reduced-motion: reduce eliminates all animations
- [ ] Simulate hung transition: confirm timeout guard resolves cleanly

---

## Fixes that require explicit visual confirmation before declaring done

- Fix 2a: wrapper div structural change

## Fixes that may proceed after plan approval (low regression)

- Fix 1: timeout guard
- Fix 2b: CSS backdrop-filter disable during transition
- Fix 3: mobile duration reduction
- Fix 4: animation-fill-mode
