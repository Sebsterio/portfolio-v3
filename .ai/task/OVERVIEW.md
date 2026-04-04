# Active Task Overview

Delay the centralized root palette transition so it does not compete with view transitions.

Goals:
- Keep theme animation centralized at the `--theme-*` token layer.
- Start the slow color interpolation only after the route view transition has mostly finished.
- Preserve high perceived performance and a seamless handoff from page transition to color transition.
- Avoid reintroducing consumer-side transition hacks or broad component-class migration.
