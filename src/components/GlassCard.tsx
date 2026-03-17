import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlassSurface } from './ui/GlassSurface';

// ----------------------------------------------------------------------------

type GlassCardProps = {
	title: string;
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export function GlassCard({ title, children, className, style }: GlassCardProps) {
	return (
		<GlassSurface rounded={3} className={cn('p-8', className)} style={style}>
			<div className='overlay-full gradient-reflection-diagonal' />
			<div className='relative z-10'>
				<h3 className='heading-3-compact text-primary mb-6'>{title}</h3>
				{children}
			</div>
		</GlassSurface>
	);
}

export default GlassCard;

// ----------------------------------------------------------------------------

type GlassCard1Props = {
	children: React.ReactNode;
	className?: string;
	withAccent?: boolean;
	accentPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
	style?: React.CSSProperties;
	onClick?: () => void;
};

const accentPositions = {
	'top-right': cn('gradient-corner-tr'),
	'top-left': cn('gradient-corner-tl'),
	'bottom-right': cn('gradient-corner-br'),
	'bottom-left': cn('gradient-corner-bl'),
};

/**
 * 	@deprecated use `GlassCard`
 */
export const GlassCard1 = ({ children, className, style, withAccent, accentPosition = 'top-right', onClick }: GlassCard1Props) => {
	return (
		<GlassSurface
			as={onClick ? 'button' : 'div'}
			rounded={1}
			hoverable // ={!!onClick}
			// interactive={!!onClick}
			{...{ className, style, onClick }}
		>
			{withAccent && <div className={cn('glass-card-accent gradient-gleam-blue', accentPositions[accentPosition])} />}
			{children}
		</GlassSurface>
	);
};
