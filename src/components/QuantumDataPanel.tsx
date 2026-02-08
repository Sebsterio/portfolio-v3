'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const metrics = [
	{ value: '15+', label: 'Years XP' },
	{ value: '120+', label: 'Projects' },
	{ value: '25+', label: 'Tech Stack' },
	{ value: '100%', label: 'Satisfaction' },
];

export function QuantumDataPanel() {
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!panelRef.current) return;

		// Animated entrance
		gsap.fromTo(
			panelRef.current,
			{
				opacity: 0,
				x: 100,
				filter: 'blur(20px)',
			},
			{
				opacity: 1,
				x: 0,
				filter: 'blur(0px)',
				duration: 1.5,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				delay: 0.6,
			}
		);
	}, []);

	return (
		<div
			ref={panelRef}
			className={cn(
				'relative w-full p-10 rounded-3xl',
				// 'bg-[rgba(5,5,10,0.7)]',
				'bg-gradient-to-br from-quantum-purple/5 to-quantum-magenta/5',
				'backdrop-blur-[20px] border border-quantum-purple/20',
				'shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(178,75,243,0.2)]',
				'transition-all duration-500'
			)}
		>
			{/* Metrics Grid */}
			<div className='w-full'>
				{metrics.map((metric, index) => (
					<div
						key={metric.label}
						className={cn('flex justify-between items-center', 'py-5 border-b border-quantum-purple/10', 'last:border-b-0')}
						style={{
							animation: `fadeInUp 0.8s ease-out ${0.8 + index * 0.1}s backwards`,
						}}
					>
						<span className='text-[13px] tracking-wider text-white/60 uppercase'>{metric.label}</span>
						<span
							className={cn(
								'font-exo text-[32px]/[32px] font-extrabold',
								'bg-gradient-to-br from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'
							)}
						>
							{metric.value}
						</span>
					</div>
				))}
			</div>

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
