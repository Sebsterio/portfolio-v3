import { cn } from '@/lib/utils';

export type GlassProps = {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	texture?: boolean;
	accents?: boolean;
	reflection?: boolean;
	edgeGlow?: boolean;
	/**
	 * Renders the glint sweep overlay on hover.
	 * Automatically adds `group` to the container element.
	 * Default: false
	 */
	glint?: boolean;
	onClick?: () => void;
};

export function Glass({ children, className, style, texture, glint, accents, reflection, edgeGlow, onClick }: GlassProps) {
	return (
		<div
			className={cn(
				reflection && 'glass-decor glass-reflection',
				edgeGlow && 'glass-decor glass-edge',
				accents && 'glass-decor glass-accents',
				glint && 'group',
				onClick && 'cursor-pointer',
				className,
			)}
			style={style}
			onClick={onClick}
		>
			{texture && <div className='overlay-full glass-noise' aria-hidden />}

			{children}

			{glint && <div className='overlay-full glass-glint group-hover:glass-glint-active' aria-hidden />}
		</div>
	);
}
