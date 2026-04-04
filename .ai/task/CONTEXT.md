# Active Task Context

- The app now animates theme changes by transitioning the root `--theme-*` palette tokens.
- The remaining UX issue is timing overlap: the token interpolation begins too early and visually competes with the route view transition.
- The fix should remain centralized in the root palette transition contract.
- Existing runtime theme resolution and component-local hover/motion transitions should remain unchanged.
- The delay can be soft and intentionally noticeable as long as the overall handoff feels smooth.
