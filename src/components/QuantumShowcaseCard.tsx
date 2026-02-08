'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface QuantumShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const QuantumShowcaseCard: React.FC<QuantumShowcaseCardProps> = ({ icon, title, description, className }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!cardRef.current) return;

		gsap.fromTo(
			cardRef.current,
			{ opacity: 0, x: 60 },
			{
				opacity: 1,
				x: 0,
				duration: 1.5,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				delay: 0.8,
			}
		);
	}, []);

	return (
		<div
			ref={cardRef}
			className={cn(
				'group relative p-10 rounded-[28px] overflow-hidden',
				'bg-[rgba(5,5,10,0.7)] backdrop-blur-[40px] backdrop-saturate-[180%]',
				'border border-quantum-purple/10',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(178,75,243,0.1),inset_0_1px_0_rgba(178,75,243,0.2),inset_0_-1px_0_rgba(178,75,243,0.05)]',
				'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
				'hover:translate-y-[-10px] hover:scale-[1.01]',
				'hover:border-quantum-purple/40',
				'hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_8px_40px_rgba(178,75,243,0.3),inset_0_1px_0_rgba(178,75,243,0.4)]',
				className
			)}
		>
			{/* Diagonal Glare Effect */}
			<div
				className='absolute inset-0 rounded-[28px] pointer-events-none'
				style={{
					background: `linear-gradient(
						135deg,
						rgba(255,255,255,0.1) 0%,
						rgba(255,255,255,0.05) 20%,
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
					background: 'linear-gradient(90deg, transparent, rgba(178, 75, 243, 0.8), transparent)',
				}}
			/>

			{/* Animated Shine Effect on Hover */}
			<div
				className='absolute top-0 left-[-100%] w-full h-full pointer-events-none group-hover:left-[100%] transition-all duration-[800ms] ease-out'
				style={{
					background: 'linear-gradient(90deg, transparent, rgba(178, 75, 243, 0.2), transparent)',
					transform: 'skewX(-20deg)',
				}}
			/>

			{/* Content */}
			<div className='relative z-10'>
				<div
					ref={iconRef}
					className='flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-quantum-purple to-quantum-magenta shadow-[0_10px_30px_rgba(178,75,243,0.4),0_0_20px_rgba(178,75,243,0.2)] group-hover:shadow-[0_12px_40px_rgba(178,75,243,0.6),0_0_30px_rgba(178,75,243,0.4)] group-hover:scale-105 transition-all duration-500'
				>
					<div className='text-[26px]'>{icon}</div>
				</div>

				<h3 className='font-exo text-xl font-bold text-white mb-3'>{title}</h3>

				<p className='text-[13px] leading-relaxed text-white/70'>{description}</p>
			</div>
		</div>
	);
};
