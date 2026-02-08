'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ContentContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function ContentContainer({ children, className }: ContentContainerProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			gsap.fromTo(
				contentRef.current,
				{ opacity: 0, x: -60 },
				{
					opacity: 1,
					x: 0,
					duration: 1.5,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					delay: 0.3,
				}
			);
		}
	}, []);

	return (
		<div ref={contentRef} className={className}>
			{children}
		</div>
	);
}
