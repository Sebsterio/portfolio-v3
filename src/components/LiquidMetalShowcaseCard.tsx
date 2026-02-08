'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

// text-chrome-silver
// text-chrome-mid
// border-chrome-silver/10
// accent-blue
// accent-cyan

interface LiquidMetalShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const LiquidMetalShowcaseCard: React.FC<LiquidMetalShowcaseCardProps> = ({ icon, title, description, className }) => {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!cardRef.current) return;

		gsap.fromTo(
			cardRef.current,
			{ opacity: 0, x: 60 },
			{
				opacity: 1,
				x: 0,
				duration: 1.5,
				ease: 'power3.out',
				delay: 0.6,
			}
		);
	}, []);

	return (
		<div
			ref={cardRef}
			className={cn(
				'relative p-10 rounded-[28px] overflow-hidden',
				'bg-[rgba(13,13,13,0.6)] backdrop-blur-[30px] backdrop-brightness-[1.15]',
				'border border-chrome-silver/10',
				'shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(240,240,240,0.1)]',
				'transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]',
				'hover:translate-y-[-8px] hover:scale-[1.02] hover:border-accent-blue/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
				className
			)}
		>
			{/* Metallic edge highlight */}
			<div
				className='absolute top-0 left-0 right-0 h-[1px] opacity-50 pointer-events-none'
				style={{
					background: 'linear-gradient(90deg, transparent, rgba(240, 240, 240, 0.4) 50%, transparent)',
				}}
			/>

			<div className='flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-cyan shadow-[0_10px_30px_rgba(59,130,246,0.3)]'>
				<div className='text-[26px]'>{icon}</div>
			</div>

			<h3 className='font-urbanist text-xl font-bold text-chrome-silver mb-3'>{title}</h3>

			<p className='text-[13px] leading-relaxed text-chrome-mid'>{description}</p>
		</div>
	);
};
