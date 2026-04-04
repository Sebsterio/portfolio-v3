# Active Task Plan

1. Move the theme-transition contract into a dedicated palette-layer stylesheet imported after the theme files.
2. Register the route-switching `--theme-*` tokens with `@property` and transition them on `:root`.
3. Remove the descendant-wide transition rule from `motion.css`.
4. Revert theme-specific consumer transition edits that were added only to force theme timing.
5. Run the smallest relevant validation and note any environment blockers.
