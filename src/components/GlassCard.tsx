import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlassSurface, type GlassSurfaceProps } from '@/components/ui/GlassSurface';

// ─── Types ────────────────────────────────────────────────────────────────────

type AccentPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

type GlassCardProps = {
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
	/** Optional heading rendered above children. */
	title?: string;
	/** Border-radius level passed to GlassSurface. Default: 2 */
	rounded?: GlassSurfaceProps['rounded'];
	/** Renders a corner gradient accent orb. Default: false */
	accent?: boolean;
	accentPosition?: AccentPosition;
	/** Hover highlight. Defaults to true when onClick is provided. */
	hoverable?: boolean;
	onClick?: () => void;
};

// ─── Maps ─────────────────────────────────────────────────────────────────────

const accentMap: Record<AccentPosition, string> = {
	'top-right': 'gradient-corner-tr gradient-gleam-blue',
	'top-left': 'gradient-corner-tl gradient-gleam-blue',
	'bottom-right': 'gradient-corner-br gradient-gleam-cyan',
	'bottom-left': 'gradient-corner-bl gradient-gleam-cyan',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassCard — standard glass content card.
 *
 * Wraps GlassSurface. Provides the `title` heading pattern,
 * optional corner accent, and click/hover support.
 *
 * Supersedes the deprecated GlassCard1. Migration:
 *   withAccent      → accent
 *   accentPosition  → accentPosition   (identical)
 *   onClick         → onClick          (identical)
 *   rounded         → rounded          (was hardcoded 1 → now default 2)
 */
export function GlassCard({
	children,
	className,
	style,
	title,
	rounded = 2,
	accent = false,
	accentPosition = 'top-right',
	hoverable,
	onClick,
}: GlassCardProps) {
	return (
		<GlassSurface
			rounded={rounded}
			hoverable={hoverable ?? !!onClick}
			onClick={onClick}
			className={cn('p-8 duration-200', className)}
			style={style}
		>
			{accent && <div className={cn('overlay h-40 w-40', accentMap[accentPosition])} aria-hidden />}

			{title && <h3 className='heading-3 text-primary mb-6 font-bold'>{title}</h3>}

			{children}
		</GlassSurface>
	);
}

export default GlassCard;
