'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface QuantumHeroProps {
	className?: string;
}

export function QuantumHero({ className }: QuantumHeroProps) {
	const heroRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!heroRef.current) return;

		// Animated entrance
		gsap.fromTo(
			heroRef.current,
			{
				opacity: 0,
				x: -100,
				filter: 'blur(20px)',
			},
			{
				opacity: 1,
				x: 0,
				filter: 'blur(0px)',
				duration: 1.5,
				ease: 'elastic.out(1, 0.55)',
				delay: 0.3,
			}
		);
	}, []);

	return (
		<div ref={heroRef} className={cn(/* 'max-w-4xl', */ className)}>
			{/* Status Badge */}
			<div
				className={cn(
					'inline-flex items-center gap-2.5 mb-10',
					'px-5 py-2.5 rounded-full',
					'bg-quantum-purple/10 border border-quantum-purple/30'
				)}
			>
				<div className='w-2 h-2 rounded-full bg-quantum-purple animate-status-pulse shadow-[0_0_15px_rgba(178,75,243,1)]' />
				<span className='text-xs tracking-[2px] uppercase' style={{ lineHeight: 'inherit' }}>
					Available for Projects
				</span>
			</div>

			{/* Main Title */}
			<h1 className={cn('font-exo text-[clamp(56px,8vw,110px)] font-extrabold leading-[1.1] tracking-[-0.02em]', 'mb-8')}>
				NEXT-GEN
				<br />
				<span
					className='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue bg-clip-text text-transparent animate-gradient-shift'
					style={{ backgroundSize: '200% 200%' }}
				>
					DIGITAL
				</span>
				<br />
				EXPERIENCE
			</h1>

			{/* Subtitle */}
			<p className='text-xl leading-relaxed text-white/70 max-w-xl'>
				Pioneering the intersection of art and code. Specialized in creating immersive, high-performance web experiences that transcend
				conventional boundaries.
			</p>
		</div>
	);
}
