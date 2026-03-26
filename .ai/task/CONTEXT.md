# CONTEXT — Audit Findings

## A. Transition mechanics

- Sequence in `transition()`: `setIsTransitioning(true)` → create `navigationComplete`
  Promise → `executeTransition()` (synchronous `startViewTransition` call) → `setIsTransitioning(false)`
- `document.startViewTransition` is called synchronously inside `executeTransition` — no
  async gap before the snapshot capture. Correct.
- `signalReady` (resolves `navigationComplete`) fires from `useLayoutEffect` in
  `useTransitionReady`, which is called from `PageTransition`. Purely DOM-render-dependent.
- **No timeout guard**: if `useTransitionReady` never fires, `navigationComplete` never
  resolves. `startViewTransition.finished` hangs indefinitely. `setIsTransitioning` is
  stuck `true` forever. Confirmed Critical.

## B. CSS animation budget

- Durations: exit 200ms, enter 400ms — no mobile override.
- All keyframes use `translateX`/`translateY` — GPU-composited. OK.
- `--distance-vt-slide: 100%` — this is 100% of the element's own width (NOT viewport
  width). The user confirmed this. For page-level slots (`main`, `t-list`, `m-page`),
  the elements ARE full-width on mobile, so the slide is effectively full-viewport-width
  for those slots. For per-card VT names, it is card-width only.
- No `animation-fill-mode: both` on transition rules — potential frame-0 flash on slides.
- Named slots active: `t-list`, `t-detail`, `m-page`, `main`, `left`, `right`, `top`,
  `bottom`, `p-header`. Per-element dynamic names: `project-card-${id}`.

## C. Mobile compositing hazard — glass-surface on VT-named elements

Two patterns confirmed in code:

1. `TimelineCollectionPage` (mobile only, `md:hidden` div):
   `<TimelineCard style={{ viewTransitionName: 'project-card-N' }}>` 
   TimelineCard → Panel → Glass → the named div has `glass-surface-2`
   (backdrop-filter: blur(28px) saturate(1.2) brightness(1.04)).

2. `TimelineProjectPage` `ExpandedMobileCard`:
   `<Panel style={{ viewTransitionName: 'project-card-N' }}>` 
   Panel → Glass → the named div has `glass-surface-1`
   (backdrop-filter: blur(14px)).

The `CollapsedMobileItem` `<button>` also carries the matching VT name but has
no backdrop-filter on it. That element is fine.

Root cause of hazard: when a VT-named element has `backdrop-filter`, the browser
cannot produce a fully independent flat raster for the `::view-transition-old`
snapshot — the blur depends on whatever is painted behind the element at capture
time, and some browsers re-composite per-frame during the animation rather than
truly baking it into a static bitmap. On mobile GPUs, this causes dropped frames.

User direction: keep the blur and the VT names. Explore:
  (a) Disabling blur during transitions via `[data-transitioning]` CSS selector.
  (b) Moving backdrop-filter to a full-size child so the VT-named element itself
      has no filter, but the snapshot captures the blurred child.

Analysis of both approaches:

**Option A — [data-transitioning] CSS disable:**
TransitionProvider already sets `document.documentElement.dataset.transitioning = 'true'`
via a `useEffect`. Timing: this fires AFTER `setIsTransitioning(true)`, which happens
BEFORE `startViewTransition`. However, `useEffect` is async — it runs after paint.
`startViewTransition` captures its old snapshot synchronously before any React re-renders
propagate. So `data-transitioning` will NOT be set at snapshot-capture time. The
attribute will only be set during or after the animation phase.

Implication: Option A does not prevent the compositing hazard at snapshot time,
but it DOES reduce overhead during the animation phase (if any live re-compositing
occurs). It is a partial mitigation, not a full fix. It is also visually safe because
VT hides live elements behind pseudo-elements during animation, so disabling blur on
live elements mid-animation is invisible to the user.

**Option B — Wrapper div (VT name on a plain ancestor):**
Move `viewTransitionName` from the `glass-surface-*` element to a plain outer wrapper
div. The wrapper has no backdrop-filter. The glass card becomes a child.
Result: the VT-named element's snapshot is captured as a flat raster of its children
(which includes the glass visual at capture time — the blur appearance is baked in).
During animation, `::view-transition-old`/`::view-transition-new` are flat bitmaps;
no live `backdrop-filter` needs recompositing per frame.
This fully eliminates the compositing hazard with zero visual change.
Structural requirement: the wrapper div must not use `display: contents` (breaks VT).
It needs to match the card's natural layout bounds — `block` display with the same
width/margin as the card works correctly.

**Recommendation: Option B (wrapper div).**
It is the only approach that fully removes the GPU compositing hazard.
Option A can be added as an additional safety layer (belt-and-braces), costs one
CSS rule, and handles any residual live-element recompositing during the animation.

## D. JavaScript overhead

- Context is split (state vs methods) — `isTransitioning` changes don't propagate
  to method consumers. Correct architecture.
- `setIsTransitioning(false)` is only in the `await` chain after `executeTransition`.
  A hung `navigationComplete` leaves it permanently `true`.
- No unhandled rejection escapes (try/catch in `executeTransition`). But the catch
  does not call `setIsTransitioning(false)` either — a caught VT error also leaves
  state stuck. Confirmed.

## E. AppBackground

- No `view-transition-name` on any AppBackground element. Inert to VT system. OK.
- `MetallicOrbsBg`: two divs with `filter: blur(80px)` — continuously painted but
  not inside any named VT slot. Not a VT compositing issue.
- `QuantumGridBg` / `FloatingShapesBg`: `willChange: 'transform'` on animated shapes.
  These are pre-promoted to their own GPU layers, which is correct for animated elements.
  Not a VT issue.

## Correction from initial audit

Initial audit incorrectly stated `--distance-vt-slide: 100%` is viewport width.
It is element-own-width. For page-level full-width slots the effect is equivalent,
but this does not affect per-card VT-name slides.
