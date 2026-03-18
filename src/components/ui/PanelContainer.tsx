import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PanelContainerProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PanelContainer — React primitive for large/primary glass content panels.
 *
 * Distinct from CardContainer in two ways:
 *   1. Decorative layer: noise grain only (no reflection, no glint).
 *      Large panels don't benefit from the diagonal catch-light that reads
 *      well on compact cards — at panel scale it becomes distracting.
 *   2. Static dual accent: fixed top-right blue + bottom-left cyan orbs,
 *      sized proportionally (w-2/5 aspect-square) so they scale with the
 *      panel rather than being fixed pixel dimensions.
 *
 * No variant/interaction styles — panels either have no hover treatment
 * or the consuming component applies its own transform (e.g. TimelineCard).
 *
 * Responsibilities:
 *   - DOM structure: noise overlay, dual accent orbs
 *
 * Does NOT own:
 *   - Surface level (glass-surface-N)     ← via className
 *   - Elevation level (glass-elevation-N) ← via className
 *   - Radius (glass-radius-N)             ← via className
 *   - Padding / layout                    ← via className or consuming component
 *   - Hover / interaction styles          ← consuming component's responsibility
 */
export function PanelContainer({ children, className, style, onClick }: PanelContainerProps) {
	return (
		<div
			className={cn(onClick && 'cursor-pointer', className)}
			style={style}
			onClick={onClick}
		>
			{/* Grain texture — rendered first, sits behind content via DOM order */}
			<div className='overlay-full glass-noise' aria-hidden />

			{/* Static dual accent — proportional size, always top-right + bottom-left */}
			<div className='gradient-corner-tr gradient-gleam-blue overlay aspect-square w-2/5' aria-hidden />
			<div className='gradient-corner-bl gradient-gleam-cyan overlay aspect-square w-2/5' aria-hidden />

			{children}
		</div>
	);
}
