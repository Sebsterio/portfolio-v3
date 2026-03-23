import { Glass, GlassProps } from './Glass';

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Panel — React primitive for large/primary glass content panels.
 */
export function Panel({ children, ...props }: GlassProps) {
	return (
		<Glass texture accents {...props}>
			{children}
		</Glass>
	);
}
