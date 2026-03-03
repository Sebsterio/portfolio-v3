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

const diagonalGlareBgStyles = {
	background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 20%, transparent 50%)`,
};

export function GlassCard({ title, children, className, style }: GlassCardProps) {
	return (
		<GlassSurface rounded='5xl' className={cn('p-8', className)} style={style}>
			<div className='absolute inset-0  pointer-events-none' style={diagonalGlareBgStyles} />
			<div className='relative z-10'>
				<h3 className='mb-6 font-urbanist text-lg font-bold text-chrome-silver'>{title}</h3>
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

const accentGradientClasses = cn('from-accent-blue/10 via-transparent to-transparent');

const accentPositions = {
	'top-right': cn('top-0 right-0 bg-linear-to-bl'),
	'top-left': cn('top-0 left-0 bg-linear-to-br'),
	'bottom-right': cn('bottom-0 right-0 bg-linear-to-tl'),
	'bottom-left': cn('bottom-0 left-0 bg-linear-to-tr'),
};

/**
 * 	@deprecated use `GlassCard`
 */
export const GlassCard1 = ({ children, className, style, withAccent, accentPosition = 'top-right', onClick }: GlassCard1Props) => {
	return (
		<GlassSurface
			as={onClick ? 'button' : 'div'}
			rounded='2xl'
			hoverable // ={!!onClick}
			// interactive={!!onClick}
			{...{ className, style, onClick }}
		>
			{withAccent && <div className={cn('absolute w-32 h-32', accentGradientClasses, accentPositions[accentPosition])} />}
			{children}
		</GlassSurface>
	);
};
