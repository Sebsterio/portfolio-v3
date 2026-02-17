import plugin from 'tailwindcss/plugin';

/**
 * CAVEAT: `view-transition-name` must be unique per page snapshot.
 * Since we're using fixed names (vt-left, vt-right, etc.),only one element per page should carry each class
 * — which naturally holds true for page-level column slots.
 */

export const viewTransitionPlugin = plugin(({ addUtilities }) => {
	const slots = ['left', 'right', 'bottom', 'top'] as const;

	// Base utilities: vt-left, vt-right, vt-bottom, vt-top
	addUtilities(
		Object.fromEntries(
			slots.map((slot) => [
				`.vt-${slot}`,
				{ 'view-transition-name': `vt-${slot}` }, //
			])
		)
	);
});
