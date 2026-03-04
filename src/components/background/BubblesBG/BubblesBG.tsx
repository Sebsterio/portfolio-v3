'use client';

export {};

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { bubbleSVG } from './bubbleSVG';

// import './styles.css';

// type Bubble = {
// 	size: number;
// 	x: number;
// 	y: number;
// 	depth: number;
// };

// export default function BubblesBackground() {
// 	const ref = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (!ref.current) return;
// 		const el = ref.current;

// 		const bubbles: Bubble[] = [
// 			{ size: 520, x: 62, y: 12, depth: 0.35 },
// 			{ size: 360, x: 4, y: 58, depth: 0.55 },
// 			{ size: 260, x: 78, y: 72, depth: 0.75 },
// 			{ size: 180, x: 36, y: 84, depth: 1 },
// 			{ size: 120, x: 18, y: 34, depth: 1.25 },
// 			{ size: 90, x: 55, y: 48, depth: 1.45 },
// 		];

// 		bubbles.forEach((b, i) => {
// 			const node = document.createElement('div');
// 			node.style.position = 'absolute';
// 			node.style.left = `${b.x}%`;
// 			node.style.top = `${b.y}%`;
// 			node.style.width = `${b.size}px`;
// 			node.style.height = `${b.size}px`;
// 			node.style.opacity = `${1 - b.depth * 0.12}`;
// 			node.innerHTML = bubbleSVG(b.size, i);

// 			el.appendChild(node);

// 			// Heavy, inertial drift (critical)
// 			gsap.to(node, {
// 				x: () => gsap.utils.random(-90, 90),
// 				y: () => gsap.utils.random(-90, 90),
// 				duration: 65 * b.depth,
// 				ease: 'sine.inOut',
// 				repeat: -1,
// 				yoyo: true,
// 			});

// 			// Almost imperceptible scale breathing
// 			gsap.to(node, {
// 				scale: gsap.utils.random(0.985, 1.015),
// 				duration: 40 * b.depth,
// 				repeat: -1,
// 				yoyo: true,
// 				ease: 'sine.inOut',
// 			});
// 		});

// 		return () => {
// 			el.innerHTML = '';
// 		};
// 	}, []);

// 	return <div ref={ref} className='fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black' />;
// }
