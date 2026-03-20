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

The color system has two layers. Use the semantic layer by default; drop to the palette only when
there is no semantic equivalent and the use is genuinely role-free.

**Semantic layer (prefer these)**

| Class | Role | Avoid replacing with |
|---|---|---|
| `text-primary` | Default body text (100%) | `text-chrome-silver` |
| `text-secondary` | Supporting text (80%) | `text-chrome-silver/80` |
| `text-tertiary` | Less-prominent text (70%) | `text-chrome-silver/70` |
| `text-muted` | Low-emphasis text (60%) | `text-chrome-silver/60` |
| `text-subtle` | Very low emphasis (50%) | `text-chrome-silver/50` |
| `text-strong` | High-contrast white | `text-white` |
| `text-accent` | Brand / interactive color | `text-accent-blue` |
| `text-label` | Content-annotation cyan: dates, periods, locations, section subheadings, arrow glyphs | `text-accent-cyan` |

`bg-accent` and `border-accent` are generated automatically from the `--color-accent` token
and should be used in place of `bg-accent-blue` / `border-accent-blue` for interactive chrome
(active states, selection borders, status indicators).

All semantic utilities are defined as `@utility` in `typography.css`, so modifier variants
(`hover:text-primary`, `group-hover:text-label`, `dark:text-muted`, etc.) work correctly.

**When raw palette is appropriate**

- Background / atmosphere decorative components (`FloatingShapesBg`, `PaerticlesBg`) — palette use is intentional; these elements have no semantic role.
- `border-accent-cyan` in editorial layout sections — specific design decision, not a semantic border.
- `bg-chrome-dark` on `TimelineDot` inactive state — a deliberate specific color, not a neutral text tone.
- Any case where the color is the *subject* of the design decision rather than standing in for a role.

**Remapping the brand color**

To shift the brand/interactive color globally, update `--color-accent` in `theme.css`. Components
using `text-accent`, `bg-accent`, and `border-accent` will respond automatically. Components using
raw `accent-blue` palette tokens will not — this asymmetry is by design and documents which uses
are role-based vs palette-specific.

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
