# Active Task Plan

1. Extend the root palette transition contract with a dedicated start delay tied to the existing view-transition timing variables.
2. Keep the delay fully centralized on `:root` so the runtime and component classes stay unchanged.
3. Preserve reduced-motion behavior by collapsing both duration and delay.
4. Run the smallest relevant validation and note any environment blockers.
