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

## Styling conventions

- Tailwind classes must remain statically detectable.
- Use `cn()` from `src/lib/utils.ts` for class composition.
- Keep style layers in `src/styles` aligned with current import structure in `globals.css`.
- Inline `style` is limited to cases like `viewTransitionName` where class-based styling is not sufficient.

## React and component conventions

- Default to server components for route files unless client hooks or browser APIs are required.
- Client components must declare `'use client'`.
- Keep components focused and colocate route-specific concerns.

## Validation conventions

- Docs-only changes: validate links, paths, commands, filenames, and factual claims.
- Code/config changes: run the smallest relevant checks.
- Common checks:
  - `pnpm lint`
  - `pnpm test`
  - `pnpm e2e`
  - `pnpm build`

**Validation caveat:**

- In Codex on Windows, sandboxed `pnpm build` may fail with `spawn EPERM`.
- If that occurs, rerun the build with escalated/unsandboxed execution.
- Treat the unsandboxed result as authoritative; the sandbox error is environmental.

## Documentation conventions

- Permanent truth lives in `README.md`, `AGENTS.md`, and `docs/*`.
- `.ai/*` is temporary workspace material and never source of truth.
- `.ai/notes/*` only influences execution when explicitly referenced by `.ai/task/*`.
- Avoid duplication across permanent docs by keeping one owner per concern.
