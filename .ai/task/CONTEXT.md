# Active Task Context

- The app already uses `--theme-*` CSS custom properties as the theme source of truth.
- Theme changes are triggered by changing `data-theme` on the root element.
- A descendant-wide transition rule in `src/styles/system/motion.css` is being overridden by component `transition-*` classes, causing inconsistent or abrupt theme changes.
- The fix should be centralized and isolated: animate the root palette tokens directly instead of migrating component classes to carry theme timing.
- Local hover, transform, opacity, and other motion transitions should remain owned by their existing component styles.
