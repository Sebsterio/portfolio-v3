# Color Audit Report — portfolio-v3

**Date:** 2026-03-18
**Scope:** Full `src/` tree — TSX, TS, CSS files

---

## Summary

| Metric | Count |
|---|---|
| Total findings | 55 |
| Files affected | 20 |

### Most common raw color patterns

| Pattern | Occurrences |
|---|---|
| `rgba(0,217,255,...)` — non-theme cyan (≠ accent-cyan 6,182,212) | 8 |
| `rgba(0,0,0,...)` — raw black in drop-shadows | 8 |
| `text-white` / `text-white/N` — Tailwind palette, not `text-strong` | 8 |
| `rgba(255,255,255,...)` — raw white in CSS | 6 |
| `rgba(59,130,246,...)`/ `#3b82f6` — accent-blue hardcoded | 6 |
| `rgba(6,182,212,...)` / `#06b6d4` — accent-cyan hardcoded | 4 |
| `rgba(160,160,160,...)` — chrome-mid hardcoded | 4 |
| `bg-white/N` — Tailwind palette white overlays | 3 |
| `bg-black/N` — Tailwind palette black overlays | 2 |

---

## Findings by file

### `src/app/_components/AppHeader.tsx`

**F-01** · L46 · Inline style · gradient
```tsx
backgroundImage: 'linear-gradient(135deg, #f0f0f0 20%, #3b82f6 80%)',
```
Colors: `#f0f0f0` (chrome-silver), `#3b82f6` (accent-blue)
→ `'linear-gradient(135deg, rgb(var(--chrome-silver-rgb)) 20%, rgb(var(--accent-blue-rgb)) 80%)'`

**F-02** · L73 · Inline style · gradient
```tsx
background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
```
Colors: accent-blue → accent-cyan. This is `gradient-primary` in horizontal direction.
→ `'linear-gradient(90deg, rgb(var(--accent-blue-rgb)), rgb(var(--accent-cyan-rgb)))'`

**F-03** · L74 · Inline style · boxShadow
```tsx
boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
```
→ `'0 0 10px rgb(var(--accent-blue-rgb) / 0.5)'`

---

### `src/app/_components/HamburgerIcon.tsx`

**F-04** · L12 · SVG attribute · `floodColor`
```tsx
<feDropShadow ... floodColor='rgb(255,255,255)' floodOpacity='0.1' />
```
→ No clean CSS-variable fix for SVG filter primitives. **See §3 — likely false positive.**

**F-05** · L13 · SVG attribute · `floodColor`
```tsx
<feDropShadow ... floodColor='rgb(59,130,246)' floodOpacity='1' />
```
→ Same constraint as F-04.

---

### `src/components/StatusBadge.tsx`

**F-06** · L22 · Tailwind arbitrary shadow
```tsx
'bg-accent-blue shadow-[0_0_15px_rgba(59,130,246,1)]'
```
Color: accent-blue at full opacity. The system already has `glow-accent-lg` = `box-shadow: 0 0 15px rgb(var(--accent-blue-rgb) / 1.0)`.
→ `'bg-accent-blue glow-accent-lg'`

---

### `src/components/TimelineDot.tsx`

**F-07** · L18 · Tailwind arbitrary `bg-[...]`
```tsx
default: 'bg-[rgb(130,130,130)] shadow-[0_0_2px_1px_rgba(130,130,130,0.8)]',
```
Color `rgb(130,130,130)` — not an exact match to any theme token. Closest: `chrome-dark` (136) or `chrome-mid` (160).
→ Decide which token fits visually, then:
`'bg-chrome-dark shadow-[0_0_2px_1px_rgb(var(--chrome-dark-rgb)/0.8)]'`

**F-08** · L18 · Tailwind arbitrary shadow
Same line as F-07 — the shadow `rgba(130,130,130,0.8)`.
→ Covered by the fix in F-07.

---

### `src/components/background/MetallicOrbsBg.tsx`

**F-09** · L9, L16 · Inline style · background (×2 identical)
```tsx
background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
```
Colors: chrome-silver (240,240,240), chrome-mid (160,160,160)
→
```tsx
`radial-gradient(circle at 30% 30%, rgb(var(--chrome-silver-rgb) / 0.2), rgb(var(--chrome-mid-rgb) / 0.1) 40%, transparent 70%)`
```

---

### `src/components/background/ChromeGradientBg.tsx`

**F-10** · L7–8 · Inline style · background
```tsx
radial-gradient(ellipse at 25% 35%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
radial-gradient(ellipse at 75% 65%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
```
Colors: accent-blue, accent-cyan
→
```tsx
`radial-gradient(ellipse at 25% 35%, rgb(var(--accent-blue-rgb) / 0.15) 0%, transparent 50%),
 radial-gradient(ellipse at 75% 65%, rgb(var(--accent-cyan-rgb) / 0.1) 0%, transparent 50%)`
```

---

### `src/components/background/FloatingShapesBg.tsx`

**F-11** · L8 · Inline style · boxShadow
```tsx
boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
```
→ `'0 0 15px rgb(var(--accent-blue-rgb) / 0.3)'`

**F-12** · L17 · Inline style · boxShadow
```tsx
boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
```
→ `'0 0 15px rgb(var(--accent-cyan-rgb) / 0.3)'`

---

### `src/components/background/QuantumGridBg.tsx`

**F-13** · L7–8 · Inline style · backgroundImage (×2)
```tsx
linear-gradient(rgba(160, 160, 160, 0.08) 1px, transparent 1px),
linear-gradient(90deg, rgba(160, 160, 160, 0.08) 1px, transparent 1px)
```
→ `rgb(var(--chrome-mid-rgb) / 0.08)` in both lines.

---

### `src/components/background/PaerticlesBg.tsx`

**F-14** · L17 · Inline style · boxShadow (conditional)
```tsx
i % 3 === 0 ? '0 0 8px rgba(6, 182, 212, 0.4)' : '0 0 6px rgba(160, 160, 160, 0.25)'
```
→
```tsx
i % 3 === 0
  ? '0 0 8px rgb(var(--accent-cyan-rgb) / 0.4)'
  : '0 0 6px rgb(var(--chrome-mid-rgb) / 0.25)'
```

---

### `src/app/projects/magazine/_components/MagazineSectionA.tsx`

**F-15** · L36 · Tailwind arbitrary `[text-shadow:...]`
```tsx
[text-shadow:0_0_40px_rgba(0,217,255,0.5)]
```
⚠️ `rgba(0,217,255)` ≠ accent-cyan (6,182,212). This is a distinct, brighter cyan used only in magazine decorative titles.
→ Either add `--accent-cyan-vivid-rgb: 0 217 255` to `@theme`, or align to `rgb(var(--accent-cyan-rgb)/0.5)`.

**F-16** · L41 · Tailwind arbitrary `-webkit-text-stroke` and `text-shadow`
```tsx
group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.3)]
group-hover:[text-shadow:0_0_60px_rgba(0,217,255,0.3)]
```
Same non-theme cyan as F-15.

**F-17** · L52 · Tailwind arbitrary shadow
```tsx
shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(102,126,234,0.2)]
```
Black layer: → `rgb(var(--black-rgb)/0.6)`.
`rgba(102,126,234)` = indigo tint — no theme token. See §2F for extraction path.

**F-18** · L65 · Tailwind arbitrary shadow
```tsx
shadow-[0_20px_50px_rgba(0,0,0,0.5)]
```
→ `shadow-[0_20px_50px_rgb(var(--black-rgb)/0.5)]` or named utility `shadow-image-md` — see §2A.

**F-19** · L70 · Tailwind palette class
```tsx
from-white/20 to-transparent
```
**Likely false positive** — see §3.

**F-20** · L78 · Tailwind palette class · `text-white`
→ `text-strong` (= `text-white font-bold`) if bold weight is intended; otherwise `text-chrome-silver`.

---

### `src/app/projects/magazine/_components/MagazineSectionB.tsx`

**F-21** · L20 · Tailwind palette · `text-white/30`
→ `text-chrome-silver/30`

**F-22** · L22 · Tailwind palette · `group-hover:text-white/10`
→ `group-hover:text-chrome-silver/10`

**F-23** · L30 · Tailwind palette · `text-white`
→ `text-strong` or `text-chrome-silver`

**F-24** · L52 · Tailwind arbitrary shadow
```tsx
shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(250,112,154,0.2)]
```
`rgba(250,112,154)` = meco gradient pink — no theme token. See §2F.

**F-25** · L58, L64 · Tailwind arbitrary shadow
```tsx
shadow-[0_20px_50px_rgba(0,0,0,0.5)]
```
→ Same as F-18.

---

### `src/app/projects/magazine/_components/MagazineSectionC.tsx`

**F-26** · L22 · Tailwind arbitrary `-webkit-text-stroke` / `text-shadow`
```tsx
group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.5)]
group-hover:[text-shadow:0_0_50px_rgba(0,217,255,0.3)]
```
Same non-theme cyan as F-15.

**F-27** · L26 · Tailwind palette · `text-white`
→ `text-strong` or `text-chrome-silver`

**F-28** · L46 · Tailwind arbitrary shadow
```tsx
shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(79,172,254,0.2)]
```
`rgba(79,172,254)` ≠ accent-blue (59,130,246). Slightly lighter mid-blue — no token.
→ Black layer: `rgb(var(--black-rgb)/0.6)`. Blue tint: align to `rgb(var(--accent-blue-rgb)/0.2)` or see §2F.

---

### `src/app/projects/magazine/_components/MagazineSectionD.tsx`

**F-29** · L20 · Tailwind arbitrary `-webkit-text-stroke`
```tsx
[-webkit-text-stroke:2px_rgba(255,255,255,0.08)]
group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.2)]
```
White: → `rgb(var(--white-rgb)/0.08)`. Non-theme cyan: → align to `rgb(var(--accent-cyan-rgb)/0.2)` or new `vivid` token.

**F-30** · L28 · Tailwind arbitrary shadow
```tsx
shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(106,17,203,0.2)]
```
`rgba(106,17,203)` = ebit gradient purple — no token. See §2F.

**F-31** · L37 · Tailwind palette · `bg-black/80`
→ `bg-[rgb(var(--black-rgb)/0.8)]` or add `--color-black` to `@theme`. **See §3.**

**F-32** · L38 · Tailwind palette · `text-white`
→ `text-strong` or `text-chrome-silver`

**F-33** · L55 · Tailwind arbitrary shadow
→ Same as F-18.

---

### `src/app/projects/magazine/_components/MagazineSectionE.tsx`

**F-34** · L30 · Tailwind arbitrary `-webkit-text-stroke`
```tsx
[-webkit-text-stroke:2px_rgba(255,255,255,0.1)]
group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.2)]
```
→ Same fixes as F-29.

**F-35** · L34 · Tailwind palette · `to-white`
```tsx
from-accent-cyan to-white
```
→ `to-[rgb(var(--white-rgb))]` for strict compliance, or `to-chrome-silver` if slight softening is acceptable.

**F-36** · L46 · Tailwind arbitrary shadow
```tsx
shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(240,147,251,0.2)]
```
`rgba(240,147,251)` = ao gradient lavender — no token. See §2F.

**F-37** · L51 · Tailwind arbitrary shadow
→ Same as F-18.

**F-38** · L58, L68 · Tailwind palette · `text-white`
→ `text-strong` or `text-chrome-silver`

---

### `src/app/projects/magazine/_components/MagazineSectionMulti.tsx`

**F-39** · L28 · Tailwind palette · `text-white`
→ `text-strong` or `text-chrome-silver`

**F-40** · L64 · Tailwind arbitrary shadow
```tsx
shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(255,236,210,0.2)]
```
`rgba(255,236,210)` = freelance gradient warm-peach — no token. See §2F.

**F-41** · L70 · Tailwind palette · `to-black/30`
**Likely false positive** — see §3.

**F-42** · L75 · Tailwind palette · `border-white/90`
Intentional polaroid photo-paper border effect. **Likely false positive** — see §3.

**F-43** · L77 · Tailwind arbitrary shadow
→ Same as F-18.

---

### `src/app/_components/MobileMenuOverlay.tsx`

**F-44** · L25 · Tailwind palette · `bg-black/80`
```tsx
'bg-black/80 backdrop-blur-md'
```
→ Same as F-31. **See §3.**

---

### `src/components/Button/styles.ts`

**F-45** · L21 · Tailwind palette · `text-white` (cta variant)
→ `text-strong` if bold weight is fine; otherwise `text-[rgb(var(--white-rgb))]`.
**Likely false positive** — see §3.

**F-46** · L25 · Tailwind palette · `text-white` (primary variant)
→ Same as F-45.

**F-47** · L14 · Tailwind palette · `focus-visible:ring-offset-black`
Focus ring offset color. **Likely false positive** — see §3.

**F-48** · L27 · Tailwind palette · `bg-white/3`, `hover:bg-white/8`
```tsx
'bg-white/3 ... hover:bg-white/8'
```
→ `bg-[rgb(var(--white-rgb)/0.03)]` / `hover:bg-[rgb(var(--white-rgb)/0.08)]`.
**Likely false positive** — see §3.

---

### `src/components/typography/Title.tsx`

**F-49** · L16 · Tailwind palette · `via-sky-400`
```tsx
from-accent-blue via-sky-400 to-accent-cyan
```
`sky-400` = `#38bdf8` — Tailwind palette, no theme token.
→ Add `--color-accent-blue-light` (or `--accent-sky-rgb`) to `@theme`, or approximate with `via-accent-cyan/60` to avoid a new token.

---

### `src/styles/system/surfaces.css`

**F-50** · ~L153 · CSS · `.glass-reflection` background
```css
rgba(255, 255, 255, 0.1)  0%,
rgba(255, 255, 255, 0.04) 24%,
```
Inconsistent with surrounding rules that use `rgb(var(--white-rgb) / N)`.
→ `rgb(var(--white-rgb) / 0.10)` and `rgb(var(--white-rgb) / 0.04)`

---

### `src/styles/system/gradients.css`

**F-51** · ~L90 · CSS · `gradient-reflection-diagonal` background
```css
rgba(255, 255, 255, 0.15)  0%,
rgba(255, 255, 255, 0.08) 20%,
```
→ `rgb(var(--white-rgb) / 0.15)` and `rgb(var(--white-rgb) / 0.08)`

**F-52** · ~L73 · Tailwind palette · `to-purple-500/20` in `gradient-primary-soft`
```css
@apply bg-linear-to-br from-accent-blue/30 via-accent-cyan/20 to-purple-500/20;
```
`purple-500` = Tailwind palette — no `accent-purple` in theme.
→ Add `--color-accent-purple: rgb(168 85 247)` to `@theme`, or shift terminal stop to `to-accent-blue/10`.

---

### `src/styles/system/decorative.css`

**F-53** · ~L59 · CSS · `.decorative-faded` background
```css
background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 75%);
```
Also: `@apply text-white/6;` — Tailwind palette white.
→ `rgb(var(--white-rgb) / 0.08)` in the gradient; `text-[rgb(var(--white-rgb)/0.06)]` for the apply.

---

### `src/styles/components.css`

**F-54** · ~L50 · CSS · `.hover-glint::after` (commented out / legacy)
```css
background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
```
This code is inactive. **Low priority.** If ever reactivated: → `rgb(var(--white-rgb) / 0.1)`.

---

### `src/styles/base.css`

**F-55** · L12 · Tailwind palette · `bg-black` (body)
```css
@apply bg-black text-chrome-silver antialiased;
```
`--black-rgb` exists in `:root` but `--color-black` is not promoted to `@theme`.
→ Add `--color-black: rgb(var(--black-rgb))` to `@theme` to make `bg-black` a project alias. Low impact. **See §3.**

---

## Section 2 — Repeated extraction opportunities

### 2A — Raw black drop-shadows
8 instances across magazine files, all `shadow-[0_Npx_Npx_rgba(0,0,0,N)]`.
Extract to named utilities in `effects.css`:
```css
@utility shadow-image-md { box-shadow: 0 20px 50px rgb(var(--black-rgb) / 0.5); }
@utility shadow-image-lg { box-shadow: 0 30px 70px rgb(var(--black-rgb) / 0.6); }
@utility shadow-image-xl { box-shadow: 0 30px 80px rgb(var(--black-rgb) / 0.7); }
```

### 2B — Non-theme editorial cyan `rgba(0,217,255,...)`
8 instances across MagazineSections A, C, D, E — exclusively on decorative mega-title `-webkit-text-stroke` and `text-shadow`.
`rgb(0,217,255)` is ~25% brighter than accent-cyan (6,182,212). Decision needed:
- **Option A:** Add `--accent-cyan-vivid-rgb: 0 217 255` to `@theme` as a named editorial token.
- **Option B:** Align all instances to `--accent-cyan-rgb` (slightly less vivid on the decorative titles).

### 2C — `text-white` in magazine headings
8 instances across all magazine sections. The design system's semantic token `text-strong` maps to `text-white font-bold`. These headings are all bold — `text-strong` is an exact fit and should replace `text-white` throughout the magazine sections.

### 2D — Background-component inline rgba
All 5 background components (Chrome, Metallic, Floating, QuantumGrid, Particles) use hardcoded RGBA values that directly correspond to theme tokens. A single pass to replace with `rgb(var(--TOKEN-rgb) / N)` template literals resolves all 8 findings in one coherent change.

### 2E — Raw white in CSS utility files
4 active instances in: `glass-reflection` (surfaces.css), `gradient-reflection-diagonal` (gradients.css), `decorative-faded` (decorative.css). All inconsistent with the `rgb(var(--white-rgb) / N)` convention already used in the same files for other rules.

### 2F — Per-project image shadow tints
Each magazine section uses a hardcoded RGBA tint in its `shadow-[...]` class that echoes the section's hero gradient. These are not theme colors but are systematically repeatable:

| Section | Tint | Corresponding gradient |
|---|---|---|
| A (Bounce) | `rgba(102,126,234,0.2)` | `--gradient-bounce-main` start |
| B (Meco) | `rgba(250,112,154,0.2)` | `--gradient-meco-main` start |
| C (TT) | `rgba(79,172,254,0.2)` | `--gradient-tt` start |
| D (Ebit) | `rgba(106,17,203,0.2)` | `--gradient-ebit-main` start |
| E (AO) | `rgba(240,147,251,0.2)` | `--gradient-ao-main` start |
| Multi (Freelance) | `rgba(255,236,210,0.2)` | `--gradient-freelance-main` start |

Recommendation: Add `--shadow-tint-bounce-rgb`, `--shadow-tint-meco-rgb`, etc. to `theme.css` alongside the gradient variables. Then the shadow classes become `shadow-[...,rgb(var(--shadow-tint-bounce-rgb)/0.2)]` — and a gradient change automatically updates its matching shadow.

---

## Section 3 — Likely false positives

| Finding | Reason |
|---|---|
| F-04, F-05 — SVG `floodColor` | SVG filter primitives (`feDropShadow`) have limited/inconsistent support for CSS custom properties. `rgb(...)` literals may be the only reliable form. |
| F-19 — `from-white/20` | Very low-opacity decorative image overlay; pure white is semantically intentional. |
| F-41 — `to-black/30` | Image overlay gradient fade; black is the correct semantic value. |
| F-42 — `border-white/90` | Polaroid photo-paper border; `white` (255,255,255) is intentional — `chrome-silver` (240,240,240) would be visually wrong. |
| F-31, F-44 — `bg-black/80` scrims | Mobile menu and section overlay backdrops; semantic meaning is black regardless of tokenization. Resolve by adding `--color-black` to `@theme` (F-55 fix) which makes this compliant automatically. |
| F-45, F-46 — `text-white` in buttons | Button text on gradient backgrounds. `text-strong` adds `font-bold` which may conflict with button's own bold. Manual review before changing. |
| F-47 — `focus-visible:ring-offset-black` | Accessibility focus ring offset. Invisible in practice; standard Tailwind pattern. |
| F-48 — `bg-white/3`, `hover:bg-white/8` | Glass-style surface overlays at very low opacity where white (255) vs chrome-silver (240) makes no perceptible difference. If changed, verify contrast. |
| F-55 — `bg-black` on `<body>` | Resolves automatically if `--color-black` is added to `@theme`. Low risk. |
