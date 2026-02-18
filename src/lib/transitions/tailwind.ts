import plugin from 'tailwindcss/plugin';

const SLOTS = ['left', 'right', 'bottom', 'top'] as const;

/**
 * Shared transtion utilities (vt-background, vt-sidepanel)
 * - Enables smooth morphing of elements across pages
 * - NOTE: slots must be unique per page snapshot.
 */
export const viewTransitionPlugin = plugin(({ addUtilities }) => {
	addUtilities(
		Object.fromEntries(
			SLOTS.map((slot) => [
				`.vt-${slot}`,
				{ 'view-transition-name': `vt-${slot}` }, //
			])
		)
	);
});
