import React from 'react';
import { cn } from '@/lib/utils';

interface ChromeShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const ChromeShowcaseCard: React.FC<ChromeShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<div
			className={cn(
				'group relative p-10 rounded-[28px] overflow-hidden',
				'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px] backdrop-saturate-[180%] backdrop-brightness-[1.15]',
				'border border-chrome-silver/[0.08]',
				'transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
				'hover:translate-y-[-10px] hover:scale-[1.01]',
				'hover:border-accent-blue/30',
				'shadow-[0_20px_60px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(240,240,240,0.12),inset_0_-1px_0_rgba(240,240,240,0.05)]',
				'hover:shadow-[0_30px_80px_rgba(0,0,0,0.6),0_8px_40px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(240,240,240,0.2)]',
				className
			)}
		>
			{/* Diagonal Glare Effect */}
			<div
				className='absolute inset-0 rounded-[28px] pointer-events-none'
				style={{
					background: `linear-gradient(
            135deg,
            rgba(255,255,255,0.15) 0%,
            rgba(255,255,255,0.08) 20%,
            transparent 50%
          )`,
				}}
			/>

			{/* Noise Texture Overlay */}
			<div
				className='absolute inset-0 rounded-[28px] pointer-events-none opacity-[0.02]'
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* Top Edge Glow */}
			<div
				className='absolute top-0 left-[20%] w-[60%] h-[2px] opacity-40 pointer-events-none blur-[2px]'
				style={{
					background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
				}}
			/>

			{/* Animated Shine Effect on Hover */}
			<div
				className='absolute top-0 left-[-100%] w-full h-full pointer-events-none group-hover:left-[100%] transition-all duration-[800ms] ease-out'
				style={{
					background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.25), transparent)',
					transform: 'skewX(-20deg)',
				}}
			/>

			{/* Content */}
			<div className='relative z-10'>
				<div
					className={cn(
						'flex items-center justify-center w-14 h-14 mb-6 rounded-2xl',
						'bg-gradient-to-br from-accent-blue to-accent-cyan',
						'shadow-[0_10px_30px_rgba(59,130,246,0.4),0_0_20px_rgba(59,130,246,0.2)]',
						'group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.6),0_0_30px_rgba(59,130,246,0.4)]',
						'transition-all duration-500',
						'group-hover:scale-110'
					)}
				>
					<div className='text-[26px]'>{icon}</div>
				</div>

				<h3 className='font-urbanist text-xl font-bold text-chrome-silver mb-3'>{title}</h3>

				<p className='text-[13px] leading-relaxed text-chrome-silver/60'>{description}</p>
			</div>
		</div>
	);
};
