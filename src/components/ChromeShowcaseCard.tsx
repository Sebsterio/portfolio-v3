'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface ChromeShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
	delay?: number;
}

export const ChromeShowcaseCard: React.FC<ChromeShowcaseCardProps> = ({ icon, title, description, className, delay = 0 }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!cardRef.current) return;

		gsap.fromTo(
			cardRef.current,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				delay: 0.9 + delay,
			}
		);
	}, [delay]);

	return (
		<div
			ref={cardRef}
			className={cn(
				'group relative p-10 rounded-[28px] overflow-hidden',
				'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px] backdrop-saturate-[180%] backdrop-brightness-[1.15]',
				'border border-chrome-silver/[0.08]',
				'transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
				'hover:translate-y-[-10px] hover:scale-[1.01]',
				'hover:border-accent-blue/30',
				className
			)}
			style={{
				boxShadow:
					'0 20px 60px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(59, 130, 246, 0.08), inset 0 1px 0 rgba(240, 240, 240, 0.12), inset 0 -1px 0 rgba(240, 240, 240, 0.05)',
			}}
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
					ref={iconRef}
					className={cn(
						'flex items-center justify-center w-14 h-14 mb-6 rounded-2xl',
						'bg-gradient-to-br from-accent-blue to-accent-cyan',
						'transition-all duration-500',
						'group-hover:scale-110'
					)}
					style={{
						boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)',
					}}
				>
					<div className='text-[26px]'>{icon}</div>
				</div>

				<h3 className='font-urbanist text-xl font-bold text-chrome-silver mb-3'>{title}</h3>

				<p className='text-[13px] leading-relaxed text-chrome-silver/60'>{description}</p>
			</div>

			<style jsx>{`
				.group:hover {
					box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 8px 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(240, 240, 240, 0.2);
				}
				.group:hover > div:nth-child(5) > div:first-child {
					box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4);
				}
			`}</style>
		</div>
	);
};
