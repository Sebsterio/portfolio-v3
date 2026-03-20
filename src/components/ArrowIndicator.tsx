import { cn } from '@/lib/utils';

type ArrowIndicatorProps = {
	className?: string;
	onClick?: () => void;
	'aria-label'?: string;
};

/**
 * ArrowIndicator — visual affordance for interactive cards.
 *
 * Rendered as a `<button>` so keyboard users have a discrete focus target
 * inside the card surface. Click events bubble to the card container, so
 * keyboard activation (Enter/Space) triggers the container's onClick without
 * needing a separate handler here. Do not pass onClick when used inside a
 * clickable container — it would double-fire on pointer click.
 *
 * Pass onClick only for standalone usage outside a clickable container.
 */
export const ArrowIndicator = ({ className, onClick, 'aria-label': ariaLabel }: ArrowIndicatorProps) => (
	<button
		type='button'
		aria-label={ariaLabel}
		onClick={onClick}
		tabIndex={0}
		className={cn(
			'focus-ring',
			'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full',
			'border border-accent-blue/30 bg-accent-blue/10 text-xl text-accent-cyan',
			'transition-all duration-300',
			className,
		)}
	>
		→
	</button>
);
