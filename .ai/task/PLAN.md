# Active Task Plan

1. Extend `src/app/projects/_lib.ts` with synchronous project-theme lookup helpers.
2. Refactor `src/lib/theme/*` so route parsing, root theme commits, and bootstrap rendering are separated.
3. Move theme route commits out of `TransitionProvider` and mount a dedicated root controller from `src/app/layout.tsx`.
4. Update tests for the new boundaries and run the smallest relevant validation if the environment allows it.
