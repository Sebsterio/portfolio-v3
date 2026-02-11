'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeaderContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function HeaderContainer({ children, className }: HeaderContainerProps) {
	const headerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!headerRef.current) return;

		gsap.fromTo(
			headerRef.current,
			{
				opacity: 0,
				y: -100,
				scaleY: 0,
			},
			{
				opacity: 1,
				y: 0,
				scaleY: 1,
				duration: 1.5,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				transformOrigin: 'top',
			}
		);
	}, []);

	return (
		<header ref={headerRef} className={className}>
			{children}
		</header>
	);
}
