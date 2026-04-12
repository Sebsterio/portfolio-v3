import { cn } from '@/lib/utils';
import { Card, type CardProps } from '@/components/primitives/Card';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InfoCardProps = {
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
	 * Interaction pattern. See Card for full docs.
	 * Auto-resolves to 'raised' when onClick is provided.
	 */
	variant?: CardProps['variant'];
	/** Glint sweep on hover. Forwarded to Card. */
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
 * InfoCard — standard glass content card.
 *
 * Provides card layout defaults (surface-2, elevation-1, padding, radius)
 * and the optional title heading pattern. All glass material and interaction
 * logic is delegated to Card.
 *
 * For large/primary content panels (timeline detail, flip cards),
 * use Panel directly.
 */
export function InfoCard({ children, className, style, onClick, title, rounded = 2, variant, glint = false }: InfoCardProps) {
	return (
		<Card
			variant={variant}
			glint={glint}
			onClick={onClick}
			className={cn('glass-surface-2 glass-elevation-1', RADIUS_MAP[rounded], 'padding-card', className)}
			style={style}
		>
			{title && <h3 className='heading-3 mb-6 font-bold text-primary'>{title}</h3>}
			{children}
		</Card>
	);
}

export default InfoCard;
