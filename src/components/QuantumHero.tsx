'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { QuantumStatusBadge } from './QuantumStatusBadge';

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
		<div ref={heroRef} className={className}>
			<QuantumStatusBadge />

			{/* Main Title */}
			<h1 className={cn('font-exo text-[clamp(56px,8vw,110px)] font-extrabold leading-[1.1] tracking-[-0.02em] uppercase', 'mb-8')}>
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
				Merging modern web technologies and thoughtful design to deliver immersive, visually striking, and highly performant web
				applications that scale.
			</p>
		</div>
	);
}
