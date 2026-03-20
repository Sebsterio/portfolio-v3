import { Glass, GlassProps } from './Glass';

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Panel — React primitive for large/primary glass content panels.
 *
 * Distinct from Card in two ways:
 *   1. Decorative layer: noise + dual accent only (no reflection, no glint).
 *      Large panels don't benefit from the diagonal catch-light that reads
 *      well on compact cards — at panel scale it becomes distracting.
 *   2. Dual accent: single overlay (glass-panel-accents) with radial gradients
 *      at top-right (blue) and bottom-left (cyan). Proportional and soft —
 *      scales naturally with the panel without fixed pixel sizes.
 *
 * No variant/interaction styles — panels either have no hover treatment
 * or the consuming component applies its own transform (e.g. TimelineCard).
 *
 * Does NOT own:
 *   - Surface level (glass-surface-N)     ← via className
 *   - Elevation level (glass-elevation-N) ← via className
 *   - Radius (glass-radius-N)             ← via className
 *   - Padding / layout                    ← via className or consuming component
 *   - Hover / interaction styles          ← consuming component's responsibility
 */
export function Panel({ children, ...props }: GlassProps) {
	return (
		<Glass texture accents {...props}>
			{children}
		</Glass>
	);
}
