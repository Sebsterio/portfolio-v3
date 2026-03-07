# PLAN

1. Build active task workspace files and capture verified context.
2. Perform ambiguity sweep for non-canonical artifacts and avoid encoding uncertain behavior as permanent truth.
3. Rewrite permanent docs by ownership:
   - `README.md`
   - `AGENTS.md`
   - `docs/PROJECT_BRIEF.md`
   - `docs/ARCHITECTURE.md`
   - `docs/CONVENTIONS.md`
4. Re-home supplemental non-active materials to `.ai/notes/` when useful.
5. Prune legacy temporary reports that no longer support active work.
6. Run docs-only verification pass for links, paths, commands, and factual claims.

## Dependencies

- Verified code truth from `src/app`, `src/lib`, `src/styles`, `package.json`, and test configs.
- User clarification for ambiguity handling.

## Approval checkpoints

- Ambiguity sweep for possible requirement-like leftovers.
- ADR files remain deferred in this pass.
