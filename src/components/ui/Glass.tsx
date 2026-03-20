import { cn } from '@/lib/utils';

export type GlassProps = {
	children: React.ReactNode;
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
		<div className={cn(onClick && 'cursor-pointer', glint && 'group', className)} style={style} onClick={onClick}>
			{texture && <div className='glass-noise overlay-full' aria-hidden />}

			{accents && <div className='glass-panel-accents overlay-full' aria-hidden />}
			{reflection && <div className='glass-reflection overlay-full' aria-hidden />}
			{edgeGlow && <div className='glass-edge-glow overlay top-0 left-[15%] h-0.5 w-[70%]' aria-hidden />}

			{children}

			{glint && <div className='glass-glint overlay-full group-hover:glass-glint-active' aria-hidden />}
		</div>
	);
}
