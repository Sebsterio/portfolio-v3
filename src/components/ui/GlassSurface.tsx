import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type SurfaceLevel = 1 | 2 | 3;
type ShadowLevel = 0 | 1 | 2;
type RadiusLevel = 1 | 2 | 3;

export type GlassSurfaceProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;

	/**
	 * Background opacity + backdrop filter + border.
	 * 1 = subtle (chips, tags)
	 * 2 = default (cards, panels)   ← default
	 * 3 = strong  (modals, drawers)
	 */
	surface?: SurfaceLevel;

	/**
	 * Box-shadow elevation.
	 * 0 = flat  1 = raised  2 = elevated
	 * Default: 1
	 */
	shadow?: ShadowLevel;

	/**
	 * Border-radius. Required — radius is a deliberate per-component choice.
	 * 1 = rounded-2xl  2 = rounded-3xl/4xl  3 = rounded-[28px]
	 */
	rounded: RadiusLevel;

	/**
	 * Renders diagonal glass-reflection + glass-noise overlays before children.
	 * Default: true. Pass false when the component provides its own decorative layer.
	 */
	decorative?: boolean;

	/**
	 * Renders glass-glint — an animated horizontal sweep on hover.
	 * Requires a `group` context; one is added automatically when set.
	 */
	glint?: boolean;

	/**
	 * Upgrades shadow + highlights border on hover.
	 * Adds `group` automatically.
	 */
	hoverable?: boolean;

	/**
	 * Translates + scales the surface upward on hover, giving physical lift.
	 * Combine with `hoverable` for the full interactive feel.
	 * Adds `group` automatically.
	 */
	hovered?: 'elevated';

	as?: 'div' | 'button' | 'article';
	onClick?: () => void;
};

// ─── Maps ─────────────────────────────────────────────────────────────────────

const surfaceMap: Record<SurfaceLevel, string> = {
	1: 'glass-surface-1',
	2: 'glass-surface-2',
	3: 'glass-surface-3',
};

const shadowMap: Record<ShadowLevel, string> = {
	0: 'glass-shadow-0',
	1: 'glass-shadow-1',
	2: 'glass-shadow-2',
};

const radiusMap: Record<RadiusLevel, string> = {
	1: 'glass-radius-1',
	2: 'glass-radius-2',
	3: 'glass-radius-3',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassSurface — the single glass primitive.
 *
 * Every glass panel, card, and overlay in the app builds on this.
 * It owns: surface level, elevation shadow, border-radius,
 * decorative overlays (reflection + noise), glint, and hover states.
 *
 * Decorative overlays render before {children} in the DOM so they
 * sit behind content without z-index. Content that is absolutely
 * positioned inside the surface still needs `relative` to establish
 * its own stacking context.
 *
 * Adding `glint`, `hoverable`, or `hovered` injects a `group` class
 * so any descendant can respond to surface hover via `group-hover:*`.
 */
export function GlassSurface({
	children,
	className,
	style,
	surface = 2,
	shadow = 1,
	rounded,
	decorative = true,
	glint = false,
	hoverable,
	hovered,
	as,
	onClick,
}: GlassSurfaceProps) {
	const interactive = !!onClick;
	const needsGroup = glint || hoverable || !!hovered;
	const Component = as ?? (interactive ? 'button' : 'div');

	return (
		<Component
			className={cn(
				// Core glass properties
				surfaceMap[surface],
				shadowMap[shadow],
				radiusMap[rounded],
				'relative overflow-hidden',

				// Group context for hover-propagation
				needsGroup && 'group',

				// Single consolidated transition.
				// duration-300 is the default — consumers override via className (tailwind-merge resolves).
				// Arbitrary transition-[...] does NOT emit transition-duration in Tailwind v4,
				// so duration must be set explicitly rather than relying on --tw-duration.
				(hoverable || !!hovered) && 'transition-[transform,box-shadow,border-color] duration-300',

				// Hover: shadow upgrade + border accent
				hoverable && ['hover:glass-shadow-2', 'hover:border-accent-blue/20'],

				// Hover: physical elevation (translate + scale)
				hovered === 'elevated' && [
					'hover:-translate-y-1.5 hover:scale-[1.02] md:hover:-translate-y-2.5',
					interactive && 'active:translate-y-0 active:scale-[0.985]',
				],

				interactive && 'cursor-pointer',
				className,
			)}
			style={style}
			onClick={onClick}
		>
			{/* Decorative overlays — always rendered first so they sit behind content */}
			{decorative && (
				<>
					<div className='glass-reflection overlay-full' aria-hidden />
					<div className='glass-noise overlay-full' aria-hidden />
				</>
			)}

			{glint && <div className='glass-glint group-hover:glass-glint-active' aria-hidden />}

			{children}
		</Component>
	);
}
