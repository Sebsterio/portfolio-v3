'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function HeroContainer({ children, className }: HeroContainerProps) {
	const heroRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!heroRef.current) return;

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
			{children}
		</div>
	);
}
