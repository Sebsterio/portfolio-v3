# OVERVIEW

## Objective

Redesign repository documentation so permanent docs are concise, non-duplicative, and derived from current code truth.

## Scope

- Rewrite `README.md`.
- Rewrite `AGENTS.md`.
- Create `docs/PROJECT_BRIEF.md`, `docs/ARCHITECTURE.md`, and `docs/CONVENTIONS.md`.
- Consolidate task-relevant findings from legacy reports into this active task workspace.
- Re-home or prune legacy temporary materials.

## Non-goals

- No code behavior changes.
- No ADR file creation in this pass.
- No roadmap or speculative architecture added to permanent docs.

## Constraints

- Canonical source is code/config on `dev`.
- Permanent docs must describe current reality only.
- Use explicit status labels only where omission would mislead.
- Keep `AGENTS.md` short and procedural.
- Do not leave temporary generated docs in repository root.

## Acceptance criteria

- Permanent docs exist with clear ownership boundaries and minimal duplication.
- `.ai/task/` is the only active task workspace for this pass.
- `.ai/notes/` is supplemental background only.
- Legacy temporary material is either deliberately relocated or removed.
- Paths, commands, links, and factual claims are verified against current repo state.

## Current status

Completed on 2026-03-06.
