import { cn } from '@/lib/utils';
import { CardContainer, type CardContainerProps } from '@/components/ui/CardContainer';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GlassCardProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;

	/** Optional heading rendered above children. */
	title?: string;

	/**
	 * Border-radius level. Default: 2
	 * 1 = rounded-2xl  2 = rounded-3xl/4xl  3 = rounded-[28px]
	 */
	rounded?: 1 | 2 | 3;

	/**
	 * Interaction pattern. See CardContainer for full docs.
	 * Auto-resolves to 'raised' when onClick is provided.
	 */
	variant?: CardContainerProps['variant'];

	/** Glint sweep on hover. Forwarded to CardContainer. */
	glint?: boolean;
};

// ─── Maps ─────────────────────────────────────────────────────────────────────

const RADIUS_MAP: Record<1 | 2 | 3, string> = {
	1: 'glass-radius-1',
	2: 'glass-radius-2',
	3: 'glass-radius-3',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassCard — standard glass content card.
 *
 * Provides card layout defaults (surface-2, elevation-1, padding, radius)
 * and the optional title heading pattern. All glass material and interaction
 * logic is delegated to CardContainer.
 *
 * For large/primary content panels (timeline detail, flip cards),
 * use PanelContainer directly.
 */
export function GlassCard({
	children,
	className,
	style,
	onClick,
	title,
	rounded = 2,
	variant,
	glint = false,
}: GlassCardProps) {
	return (
		<CardContainer
			variant={variant}
			glint={glint}
			onClick={onClick}
			className={cn(
				'glass-surface-2 glass-elevation-1',
				RADIUS_MAP[rounded],
				'p-8',
				className,
			)}
			style={style}
		>
			{title && <h3 className='heading-3 text-primary mb-6 font-bold'>{title}</h3>}
			{children}
		</CardContainer>
	);
}

export default GlassCard;
