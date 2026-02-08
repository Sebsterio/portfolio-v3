'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// THEME: Quantu₼
export function SidePanel({ children }: { children: React.ReactNode }) {
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
		<div ref={panelRef} className={'relative w-full'}>
			{children}
		</div>
	);
}
