import { cn } from '@/lib/utils';
import { type CardVariant, CARD_VARIANT_MAP } from '@/components/ui/cardVariants';

// ─── Types ────────────────────────────────────────────────────────────────────

export type { CardVariant };

export type CardContainerProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;

	/**
	 * Interaction + animation pattern applied to the container.
	 *
	 *   'static'  — no hover treatment (default when no onClick)
	 *   'raised'  — elevation upgrade + border accent on hover
	 *   'lifted'  — elevation upgrade + border + translate on hover
	 *
	 * Auto-resolves to 'raised' when onClick is provided.
	 * Override explicitly to opt out: variant="static"
	 */
	variant?: CardVariant;

	/**
	 * Renders the glint sweep overlay on hover.
	 * Automatically adds `group` to the container element.
	 * Default: false
	 */
	glint?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CardContainer — React primitive for card-scale glass containers.
 *
 * Responsibilities:
 *   - DOM structure: decorative overlays (reflection, noise), optional glint
 *   - Interaction: hover variant classes (elevation, border, translate)
 *
 * Does NOT own:
 *   - Surface level (glass-surface-N)     ← via className
 *   - Elevation level (glass-elevation-N) ← via className
 *   - Radius (glass-radius-N)             ← via className
 *   - Padding / layout                    ← via className or consuming component
 *
 * For large/primary content panels, use PanelContainer instead.
 */
export function CardContainer({
	children,
	className,
	style,
	onClick,
	variant,
	glint = false,
}: CardContainerProps) {
	const resolvedVariant = variant ?? (onClick ? 'raised' : 'static');

	return (
		<div
			className={cn(
				glint && 'group',
				onClick && 'cursor-pointer',
				CARD_VARIANT_MAP[resolvedVariant],
				className,
			)}
			style={style}
			onClick={onClick}
		>
			{/* Decorative overlays — rendered first so they sit behind content via DOM order */}
			<div className='overlay-full glass-reflection' aria-hidden />
			<div className='overlay-full glass-noise'      aria-hidden />

			{glint && <div className='overlay-full glass-glint group-hover:glass-glint-active' aria-hidden />}

			{children}
		</div>
	);
}
