# CONVENTIONS

## Scope

Deterministic implementation conventions for current codebase behavior.

## Naming and placement

- Next.js route files use reserved lowercase names (`page.tsx`, `layout.tsx`, `default.tsx`, etc.).
- Route-local components live under route `_components/` folders.
- Shared components live in `src/components`.
- Shared utilities and infrastructure live in `src/lib`.
- Shared types live in `src/types`.

## Data conventions

- Projects data source is `src/app/projects/_content.ts`.
- Use `getProjects()` and `getProject(slug)` from `src/app/projects/_lib.ts`.
- For slug pages, use `generateStaticParams()` from project slugs.

## Navigation conventions

- Use `TransitionLink` for link-based internal navigation where transitions should apply.
- Use `useTransitionRouter` for imperative navigation.
- Keep transition readiness signaling through `PageTransition` and `useTransitionReady`.
- Do not replace transition-aware navigation with plain `next/link` or `useRouter` in transition flows.
- External URLs and static file links are outside transition flows.

## Styling conventions

- Tailwind classes must remain statically detectable.
- Use `cn()` from `src/lib/utils.ts` for class composition.
- Keep style layers in `src/styles` aligned with current import structure in `globals.css`.
- Inline `style` is limited to cases like `viewTransitionName` where class-based styling is not sufficient.

## Color conventions

### Token architecture

Three layers. One-way dependency: components → `@theme` → `:root`.

```
:root   --theme-*       oklch values, per-theme overridable
@theme  --color-*       var() aliases → :root, generates Tailwind utilities
CSS/TSX                 reference @theme tokens only
```

**To create a new theme:** redefine these `:root` variables in a selector (e.g. `[data-theme="warm"]`):
`--theme-accent-1`, `--theme-accent-2`, `--theme-neutral-1/2/3/4`, `--theme-surface`.
Nothing else changes.

---

### Semantic utilities — always prefer these in components

Defined as `@utility` in `typography.css` so modifier variants work (`hover:`, `group-hover:`, `dark:`).

| Utility | Role | Raw equivalent (do not use) |
|---|---|---|
| `text-primary` | Default body text | `text-neutral-1` |
| `text-secondary` | Supporting text 80% | `text-neutral-1/80` |
| `text-tertiary` | 70% | `text-neutral-1/70` |
| `text-muted` | Low emphasis 60% | `text-neutral-1/60` |
| `text-subtle` | Very low 50% | `text-neutral-1/50` |
| `text-strong` | White, normal weight | `text-white` |
| `text-bold` | White, bold | `text-white font-bold` |
| `text-accent` | Brand / interactive | `text-accent-1` |
| `text-label` | Content annotation — dates, periods, locations, subheadings, arrow glyphs | `text-accent-2` |

`bg-accent` and `border-accent` are Tailwind-generated from `--color-accent` and should be used
for interactive chrome (active states, selection borders, status indicators).

---

### When to use raw palette tokens

- Background / atmosphere decorative components — no semantic role, palette use is intentional
- `border-accent-2` in editorial layout borders — specific design decision
- Any case where the color *is* the design decision, not a role substitution


## React and component conventions

- Default to server components for route files unless client hooks or browser APIs are required.
- Client components must declare `'use client'`.
- Keep components focused and colocate route-specific concerns.

## Validation conventions

- Docs-only changes: validate links, paths, commands, filenames, and factual claims.
- Code/config changes: run the smallest relevant checks.
- Common checks:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm e2e`
  - `pnpm build`

**Validation caveat:**

- `pnpm build` does not replace `pnpm typecheck`.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so the Next build can pass while the repo is still TypeScript-invalid.

## Documentation conventions

- Authoritative permanent docs are the files explicitly listed in `AGENTS.md`.
- `docs/*` is not authoritative by default.
- `.ai/*` is temporary workspace material and never source of truth.
- `.ai/notes/*` only influences execution when explicitly referenced by `.ai/task/*`.
- Avoid duplication across permanent docs by keeping one owner per concern.
