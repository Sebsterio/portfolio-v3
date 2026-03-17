import React from 'react';
import { cn } from '@/lib/utils';
import { GlassSurface } from './ui/GlassSurface';

interface ChromeShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const ShowcaseCard: React.FC<ChromeShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<GlassSurface
			rounded={2}
			className={cn('group p-6 sm:p-8 md:p-10', [
				'transition-duration-600 transition-ease-[cubic-bezier(0.34,1.56,0.64,1)] transition-all',
				'glass-shadow-1 hover:glass-shadow-2 hover:-translate-y-1.5 hover:scale-[1.01] md:hover:-translate-y-2.5',
				className,
			])}
		>
			{/* Decorative */}
			<div className={cn('overlay-full gradient-reflection-diagonal')} />
			<div className={cn('glass-noise overlay-full')} />
			<div className={cn('glass-edge-glow overlay top-0 left-[20%] h-0.5 w-[60%]')} />
			<div className={cn('glass-glint group-hover:glass-glint-active')} />

			{/* Content */}

			<div className='relative z-10 flex gap-6'>
				<div // NOTE: setting "mb-6 "here or "mt-6" on next sibling resulted in a flash of old-page on nav to home-page
					className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl md:h-14 md:w-14', [
						'gradient-primary',
						'shadow-[0_10px_30px_rgba(59,130,246,0.4),0_0_20px_rgba(59,130,246,0.2)]',
						'group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.6),0_0_30px_rgba(59,130,246,0.4)]',
						'transition-duration-500 transition-all group-hover:scale-110',
					])}
				>
					<div className='text-[26px]'>{icon}</div>
				</div>
				<div>
					<h3 className='mb-2 font-urbanist text-lg font-bold text-chrome-silver md:mb-3 md:text-xl'>{title}</h3>
					<p className='text-muted text-[13px] leading-relaxed md:text-[14px]'>{description}</p>
				</div>
			</div>
		</GlassSurface>
	);
};
