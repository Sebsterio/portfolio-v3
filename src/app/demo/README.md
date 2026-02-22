# Projects Page - Design Concepts

Three interactive UX concepts for your portfolio's projects page, built with your existing Chrome theme and design system.

## Installation

1. Copy the entire `projects-demo` folder to your `app/` directory:
   ```
   app/projects-demo/
   ```

2. Visit: `http://localhost:3000/projects-demo`

3. Toggle between concepts using the buttons at the top

## Concepts Overview

### 1. Card Expansion (Immersive)
- **Grid of glass cards** with hover effects
- **Click card** → Expands fullscreen with backdrop blur
- **Framer Motion layoutId** for smooth morphing animation
- **Modal** contains full case study
- **Best for**: Visual impact, emphasis on individual projects

**Interactions:**
- Hover: Card lifts, blue accent glow
- Click: Fullscreen expansion
- Close: Click backdrop or X button

---

### 2. Split Timeline (Information-Dense)
- **Left sidebar**: Vertical timeline with dates
- **Right pane**: Case study detail
- **View Transition API ready** (vt-left/vt-right classes)
- **Sticky timeline** for easy navigation
- **Best for**: Professional portfolios, emphasis on chronology

**Interactions:**
- Click timeline item → Content slides horizontally
- Scroll right pane independently
- Timeline stays fixed for easy jumping

---

### 3. 3D Card Deck (Spatial/Interactive)
- **Card stack** with depth perspective
- **Flip animation** reveals case study on reverse
- **Swipe navigation** or arrow buttons
- **Background cards** create depth effect
- **Best for**: Creative portfolios, memorable experience

**Interactions:**
- Click card → Flips to reveal case study
- Arrow keys/buttons → Navigate cards
- Indicator dots → Jump to specific project
- Cards have physics-based spring animation

---

## Design System Integration

All concepts use your existing:
- ✅ Chrome glass cards (`bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]`)
- ✅ Accent colors (`accent-blue`, `accent-cyan`)
- ✅ Typography (`font-urbanist`, `font-dm-sans`)
- ✅ Border styles (`border-chrome-silver/[0.08]`)
- ✅ Hover effects and transitions

## Data Structure

Projects data in `projects.ts` includes:
- **Title, company, period, location**
- **Tags** (tech stack)
- **Summary** (one-liner)
- **Problem/Approach/Solution** (case study)
- **Impact** (measurable results)
- **Link** (optional)

Each description is ~2x longer than CV for case study depth.

## Customization

### Add Screenshots
Add to project data:
```typescript
screenshots: ['/images/project-1.png', '/images/project-2.png']
```

Then render in concepts:
```tsx
{project.screenshots?.map((src, i) => (
  <img key={i} src={src} alt="" className="rounded-xl" />
))}
```

### Adjust Colors
Change accent colors in concepts:
- `accent-blue` → Your color
- `accent-cyan` → Your secondary color

### Modify Animations
Framer Motion props in each concept:
```tsx
transition={{ duration: 0.6, type: 'spring' }}
```

## Next Steps

1. **Choose a concept** based on your preference
2. **Add real screenshots** to project data
3. **Fine-tune animations** to your taste
4. **Move chosen concept** to `app/projects/page.tsx`
5. **Remove demo switcher** and unused concepts

## Technical Notes

- **Concept 1 (Expansion)**: Uses Framer Motion `layoutId` for morphing
- **Concept 2 (Timeline)**: Compatible with View Transition API (vt-* classes ready)
- **Concept 3 (Deck)**: Uses CSS 3D transforms + Framer Motion physics

All concepts are fully responsive and work on mobile.

---

**Recommendation**: Start with **Concept 2 (Timeline)** if unsure - it's most professional and works best for case studies. Use **Concept 3 (Deck)** if you want to stand out with creative interaction.
