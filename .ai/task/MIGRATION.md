# Design System — Migration Cheatsheet

Find-and-replace these class names across the codebase.
All changes are renames only — no behaviour has changed.

---

## surfaces.css

| Old                   | New                |
| --------------------- | ------------------ |
| `surface-glass-1`     | `glass-surface-1`  |
| `surface-glass-2`     | `glass-surface-2`  |
| `surface-glass-3`     | `glass-surface-3`  |
| `shadow-glass-0`      | `glass-shadow-0`   |
| `shadow-glass-1`      | `glass-shadow-1`   |
| `shadow-glass-2`      | `glass-shadow-2`   |
| `backdrop-glass-0`    | `glass-backdrop-0` |
| `backdrop-glass-1`    | `glass-backdrop-1` |
| `backdrop-glass-2`    | `glass-backdrop-2` |
| `backdrop-glass-3`    | `glass-backdrop-3` |
| `rounded-glass-1`     | `glass-radius-1`   |
| `rounded-glass-2`     | `glass-radius-2`   |
| `rounded-glass-3`     | `glass-radius-3`   |
| `reflection-diagonal` | `glass-reflection` |
| `top-edge-glow`       | `glass-edge-glow`  |
| `noise-overlay`       | `glass-noise`      |

**New composed tiers** — replace common atomic combinations:

| Old combination                                                   | New single class |
| ----------------------------------------------------------------- | ---------------- |
| `surface-glass-1 rounded-glass-1 shadow-glass-0 backdrop-glass-0` | `glass-subtle`   |
| `surface-glass-2 rounded-glass-2 shadow-glass-1 backdrop-glass-1` | `glass-default`  |
| `surface-glass-3 rounded-glass-2 shadow-glass-2 backdrop-glass-2` | `glass-raised`   |

---

## effects.css

| Old                   | New                |
| --------------------- | ------------------ |
| `glow-primary`        | `glow-accent-md`   |
| `glow-primary-soft`   | `glow-accent-sm`   |
| `glow-accent-strong`  | `glow-accent-lg`   |
| `bg-primary-soft`     | `bg-accent-soft`   |
| `reflection-animated` | `reflection-sweep` |

---

## gradients.css

| Old                                   | New                                     |
| ------------------------------------- | --------------------------------------- |
| `reflection-light`                    | `gradient-reflection-light`             |
| `reflection-dark`                     | `gradient-reflection-dark`              |
| `reflection-top`                      | `gradient-reflection-top`               |
| `gradient-reflection-vertical`        | `gradient-reflection-horizontal`        |
| `gradient-reflection-vertical-strong` | `gradient-reflection-horizontal-strong` |

---

## layout.css

| Old                 | New            |
| ------------------- | -------------- |
| `stack-section`     | `stack-xl`     |
| `container-section` | `container-md` |
| `container-wide`    | `container-lg` |

---

## typography.css — deleted classes

These classes are removed. Replace with inline composition in JSX.

| Removed               | Replace with                                        |
| --------------------- | --------------------------------------------------- |
| `ui-meta-accent`      | `ui-meta text-accent-cyan`                          |
| `ui-meta-accent-caps` | `ui-meta text-accent-cyan uppercase tracking-wider` |
| `heading-3-compact`   | `heading-3 font-bold`                               |
| `heading-section`     | `heading-2 flex items-center gap-3`                 |

---

## decorative.css (was components.css legacy)

| Old                                | New                        |
| ---------------------------------- | -------------------------- |
| `project-decorative-text`          | `decorative-text`          |
| `project-decorative-outline`       | `decorative-outline`       |
| `project-decorative-outline-hover` | `decorative-outline-hover` |
| `project-decorative-faded`         | `decorative-faded`         |
| `deco-circle`                      | `decorative-circle`        |
| `deco-line`                        | `decorative-line`          |

---

## components.css — inlined classes

These classes no longer exist. Replace with the equivalent in JSX.

| Removed                       | Replace with                                              |
| ----------------------------- | --------------------------------------------------------- |
| `glass-anchor-reflection`     | `overlay-full gradient-reflection-diagonal`               |
| `project-image-overlay-dark`  | `image-overlay-dark` (already renamed in components.css)  |
| `project-image-overlay-light` | `image-overlay-light` (already renamed in components.css) |

---
