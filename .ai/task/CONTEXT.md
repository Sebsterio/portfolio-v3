# Context: Effects & Gradients Cleanup

## Semantic contract: shadow vs glow
The distinction that must be enforced throughout:
- `shadow-*` = box-shadow WITH x/y offset — directional, creates lift/depth
- `glow-*`   = box-shadow WITHOUT offset (0 0 ...) — radial, creates ambient light

This is the convention used by Tailwind, Material Design, and every major design token system.
Violating it forces readers to inspect CSS to understand what a class does.

## Complete misnamed-class inventory

Classes currently prefixed `shadow-` that produce ZERO-OFFSET glows:

  shadow-status-dot        0 0 15px accent-1 100%      → EXACT DUPLICATE of glow-accent-lg
  shadow-dot-active        0 0 12px accent-1 80%        → rename: glow-dot-active
  shadow-dot-inactive      0 0 2px 1px neutral-4 80%   → rename: glow-dot-inactive
  shadow-brand-underline   0 0 10px accent-1 50%        → rename: glow-brand-underline
  shadow-atmosphere-1      0 0 15px accent-1 30%        → rename: glow-atmosphere-1
  shadow-atmosphere-2      0 0 15px accent-2 30%        → rename: glow-atmosphere-2
  shadow-particle-accent   0 0 8px  accent-2 40%        → rename: glow-particle-accent
  shadow-particle-neutral  0 0 6px  neutral-3 25%       → rename: glow-particle-neutral

Classes correctly named `shadow-*` (have offset, keep as-is):
  shadow-accent-md/lg, shadow-image-*, shadow-showcase-badge*, shadow-editorial-*

## Exact duplicate
  glow-accent-lg      0 0 15px var(--color-accent-1)   [effects.css]
  shadow-status-dot   0 0 15px var(--color-accent-1)   [effects.css]
→ Drop shadow-status-dot. StatusBadge.tsx:21 uses `shadow-status-dot` → update to `glow-accent-lg`.

## bg-surface-glass naming collision
`bg-surface-glass-sm/md/lg/xl` (effects.css) — white translucent fills for interactive elements.
`glass-surface-*` (surfaces.css) — the glass material system.
Same prefix, completely different things. Rename to `bg-fill-sm/md/lg/xl`.

Users:
  CardsProjectPage.tsx:108    bg-surface-glass-md hover:bg-surface-glass-xl
  TimelineProjectPage.tsx:112 hover:bg-surface-glass-sm
  TimelineProjectSidebarItem.tsx:10  hover:bg-surface-glass-sm
  DisplayModeSwitcher.tsx:51  bg-surface-glass-sm hover:bg-surface-glass-lg
  Button/styles.ts:29-30      bg-surface-glass-sm, hover:bg-surface-glass-lg

## Misplaced classes
Three classes are in the wrong file:

  focus-ring              effects.css → utilities.css
                          It is interactive-state behaviour, not a visual effect.

  glass-glint             effects.css → surfaces.css
  glass-glint-active      effects.css → surfaces.css
                          They are glass surface interaction, always used on glass surface children.

  text-glow-editorial     decorative.css → effects.css
                          It applies text-shadow — an effect. The glow scale is in effects.css.
                          It references --theme-accent-2-vivid, already used by decorative.css;
                          effects.css using it too is fine.

## Decorative outline scale naming
Three opacity levels exist; two use near-synonyms:
  decorative-outline-faint  8%   ]
  decorative-outline-soft   10%  ]  "faint" and "soft" read as synonyms
  decorative-outline        15%  ]

Rename `decorative-outline-soft` → `decorative-outline-mid`.
Result: faint(8%), mid(10%), (default/15%).
User: MagazineSectionE.tsx:31 uses `decorative-outline-soft` → update to `decorative-outline-mid`.

## gradient-title-highlight rename
`gradient-primary`         accent-1→accent-2, bg-linear-to-br
`gradient-title-highlight` accent-1→accent-2, bg-linear-to-r  + animated bg-size sweep

Both produce the same colors. The lr direction is load-bearing for the animation sweep.
`gradient-title-highlight` leaks a use-case into a role-name layer.
Rename → `gradient-accent-sweep`.
User: Title.tsx (all three variants use it in lineHighlight).

## Alpha consolidation
Current glow/shadow alpha values in effects.css — too many arbitrary steps:
  20%  glow-accent-sm          ← keep (ambient)
  25%  glow-particle-neutral   ← consolidate to 20%
  30%  glow-atmosphere-1/2     ← consolidate to 20% (ambient)
  35%  shadow-accent-md        ← consolidate to 40%
  40%  glow-accent-md, glow-particle-accent  ← keep (standard)
  50%  shadow-accent-lg, glow-brand-underline ← keep (strong directional)
  55%  shadow-showcase-badge-hover outer ← consolidate to 60%
  60%  (target strong level)
  80%  glow-dot-active         ← keep (intentionally intense for timeline dot)
 100%  glow-accent-lg          ← keep (full intensity)

Target: ambient=20%, standard=40%, strong=50-60%.
The showcase-badge outer+inner layers get rationalized: 35%/15% → 40%/20% (normal), 55%/35% → 60%/40% (hover).
These are minor visual changes on a small badge shadow, acceptable per project guidelines.

## glass-edge-glow note
glass-edge-glow (surfaces.css) and gradient-reflection-horizontal-strong (gradients.css) are
conceptually the same pattern (90deg accent sweep) at different intensities. They are currently
in different files for valid reasons (one is a glass surface decoration, one is a generic utility)
and should not be merged — but this relationship should be documented in both file headers.
This is a documentation task only, no code change.
