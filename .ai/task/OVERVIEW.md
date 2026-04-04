# Active Task Overview

Centralize route theme transitions at the palette layer.

Goals:
- Animate the root `--theme-*` palette tokens instead of animating theme consumer properties.
- Make `--duration-theme-transition` authoritative again for theme changes.
- Remove the descendant-wide theme-transition mechanism that conflicts with component transition classes.
- Avoid broad component-class migration and keep local hover/motion transitions intact.
