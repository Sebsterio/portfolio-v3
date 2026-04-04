# Active Task Overview

Refactor the route-based theme runtime to reduce technical debt without changing the feature behavior.

Goals:
- Use `src/app/projects/_lib.ts` as the server-side source for project theme lookup data.
- Decouple theme routing from `TransitionProvider`.
- Split route resolution, DOM commits, and first-paint bootstrap concerns into clearer boundaries.
- Keep the root `data-theme` contract and the existing palette-layer transition system.
