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
	background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%,	rgba(255,255,255,0.08) 20%,	transparent 50%)`,
};
const noiseTextureOverlayBgStyles = {
	backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
};
const topEdgeGlowBgStyles = {
	background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
};
const animatedShineEffectStyles = {
	background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.25), transparent)',
	transform: 'skewX(-20deg)',
};

export const ShowcaseCard: React.FC<ChromeShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<GlassSurface
			rounded='4xl/md:5xl'
			className={cn(
				'group p-6 sm:p-8 md:p-10',
				'transition-all transition-duration-600 transition-ease-[cubic-bezier(0.34,1.56,0.64,1)]',
				'hover:scale-[1.01] hover:-translate-y-1.5 md:hover:-translate-y-2.5',
				'shadow-[0_20px_60px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(240,240,240,0.12),inset_0_-1px_0_rgba(240,240,240,0.05)]',
				'hover:shadow-[0_30px_80px_rgba(0,0,0,0.6),0_8px_40px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(240,240,240,0.2)]',
				className
			)}
		>
			{/* Decorative */}

			<div className='absolute inset-0 pointer-events-none' style={diagonalGlareBgStyles} />
			<div className='absolute inset-0 pointer-events-none opacity-[0.02]' style={noiseTextureOverlayBgStyles} />
			<div className='absolute top-0 left-[20%] w-[60%] h-0.5 opacity-40 pointer-events-none blur-[2px]' style={topEdgeGlowBgStyles} />
			<div
				className={cn('absolute top-0 -left-full w-full h-full pointer-events-none group-hover:left-full', [
					'transition-all transition-duration-[800ms] ease-out',
				])}
				style={animatedShineEffectStyles}
			/>

			{/* Content */}

			<div className='relative z-10 flex gap-6'>
				<div // NOTE: setting "mb-6 "here or "mt-6" on next sibling resulted in a flash of old-page on nav to home-page
					className={cn('w-12 h-12 md:w-14 md:h-14 rounded-2xl shrink-0 flex items-center justify-center', [
						'bg-linear-to-br from-accent-blue to-accent-cyan',
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
