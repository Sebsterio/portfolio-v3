import { cn } from '@/lib/utils';
import { type CardVariant, CARD_VARIANT_MAP } from '@/components/ui/cardVariants';
import { Glass } from './Glass';

// ─── Types ────────────────────────────────────────────────────────────────────

export type { CardVariant };

export type CardProps = {
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
	edgeGlow?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Card — React primitive for card-scale glass containers.
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
 * For large/primary content panels, use Panel instead.
 */
export function Card({ children, className, variant, ...props }: CardProps) {
	const resolvedVariant = variant ?? (props.onClick ? 'raised' : 'static');

	return (
		<Glass className={cn(CARD_VARIANT_MAP[resolvedVariant], className)} texture reflection {...props}>
			{children}
		</Glass>
	);
}
