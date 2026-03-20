# AGENTS.md

Mandatory operating procedure for coding agents in this repository.

## Core rules

- Canonical source of truth is code and config on the `dev` branch.
- Documentation is derived from code, never the reverse.
- One home per concern. Avoid duplication across permanent docs.
- Keep `AGENTS.md` short, procedural, and deterministic.
- Never leave temporary generated docs in the repository root.

## Required execution flow

1. Ground in current repository truth before planning or editing.
2. Write active task context and steps in `.ai/task/`.
3. Ask and wait for approval before making changes unless explicitly told to proceed.
4. Implement incrementally and keep changes scoped.
5. Run the smallest relevant validation for the change type.

## Documentation ownership

- Authoritative permanent docs are only the files and directories listed below.
- Any other permanent-looking markdown file is non-authoritative unless this section is updated to include it.
- `README.md`: concise human entrypoint (setup, commands, maps, caveats).
- `AGENTS.md`: agent procedure only.
- `docs/PROJECT_BRIEF.md`: current intended experience of implemented surfaces.
- `docs/ARCHITECTURE.md`: current technical structure and invariants.
- `docs/CONVENTIONS.md`: deterministic implementation conventions.
- `docs/adr/`: ADR files only when explicitly approved.

## `.ai` workspace model

- Active task workspace: `.ai/task/`
- Required active task files for this workflow: `OVERVIEW.md`, `PLAN.md`, `CONTEXT.md`
- Supplemental background only: `.ai/notes/`
- Disposable rough work: `.ai/scratch/`
- Temporary audits and reviews: `.ai/reports/`

Files in `.ai/notes/` influence execution only when explicitly referenced by `.ai/task/*`.

## Workflow:

1. Populate `OVERVIEW.md`, `PLAN.md`, and `CONTEXT.md`.
2. Plan first and wait for approval.
3. Implement changes in scoped steps.
4. Summarize results and validation.

## Truthfulness and ambiguity policy

- Permanent docs must describe current reality only.
- Use status labels (`implemented`, `placeholder`, `partial`, `deprecated`, `planned`) only when omission would mislead.
- Do not document placeholders, dead code, or temporary implementations as permanent architecture truth.
- Do not keep future-state notes, design explorations, or tool-environment instructions in permanent docs.
- If an inconsistency may be an intentional requirement, future spec, or durable constraint, stop and ask before classifying it.

## Validation policy

- Docs-only changes: verify links, paths, commands, filenames, and factual claims against current repo state.
- Code or config changes: run the smallest relevant validation for the change.
