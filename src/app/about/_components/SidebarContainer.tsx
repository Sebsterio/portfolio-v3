'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SidebarContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function SidebarContainer({ children, className }: SidebarContainerProps) {
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (sidebarRef.current) {
			gsap.fromTo(
				sidebarRef.current,
				{ opacity: 0, x: 60 },
				{
					opacity: 1,
					x: 0,
					duration: 1.5,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					delay: 0.5,
				}
			);
		}
	}, []);

	return (
		<div ref={sidebarRef} className={className}>
			{children}
		</div>
	);
}
