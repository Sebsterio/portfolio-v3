import React from 'react';
import { cn } from '@/lib/utils';
import { GlassSurface } from './ui/GlassSurface';

interface ChromeShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

const diagonalGlareBgStyles = {
	// REFACTORED: using reflection-diagonal utility
};
const noiseTextureOverlayBgStyles = {
	// REFACTORED: using noise-overlay utility
};
const topEdgeGlowBgStyles = {
	// REFACTORED: using top-edge-glow utility
};
const animatedShineEffectStyles = {
	// REFACTORED: using reflection-animated utility
};

export const ShowcaseCard: React.FC<ChromeShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<GlassSurface
			rounded='4xl/md:5xl'
			className={cn(
				'group p-6 sm:p-8 md:p-10',
				'transition-all transition-duration-600 transition-ease-[cubic-bezier(0.34,1.56,0.64,1)]',
				'shadow-glass-1 hover:shadow-glass-2 hover:scale-[1.01] hover:-translate-y-1.5 md:hover:-translate-y-2.5',
				className
			)}
		>
			{/* Decorative */}

			<div className={cn('overlay-full reflection-diagonal')} />
			<div className={cn('overlay-full noise-overlay')} />
			<div className={cn('overlay top-0 left-[20%] w-[60%] h-0.5 top-edge-glow')} />
			<div className={cn('overlay top-0 -left-full w-full h-full group-hover:left-full reflection-animated transition-all')} />

			{/* Content */}

			<div className='relative z-10 flex gap-6'>
				<div // NOTE: setting "mb-6 "here or "mt-6" on next sibling resulted in a flash of old-page on nav to home-page
					className={cn('w-12 h-12 md:w-14 md:h-14 rounded-2xl shrink-0 flex items-center justify-center', [
						'gradient-primary',
						'shadow-[0_10px_30px_rgba(59,130,246,0.4),0_0_20px_rgba(59,130,246,0.2)]',
						'group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.6),0_0_30px_rgba(59,130,246,0.4)]',
						'group-hover:scale-110 transition-all transition-duration-500',
					])}
				>
					<div className='text-[26px]'>{icon}</div>
				</div>
				<div>
					<h3 className='mb-2 md:mb-3 font-urbanist text-lg md:text-xl font-bold text-chrome-silver'>{title}</h3>
					<p className='text-[13px] md:text-[14px] leading-relaxed text-chrome-silver/60'>{description}</p>
				</div>
			</div>
		</GlassSurface>
	);
};
