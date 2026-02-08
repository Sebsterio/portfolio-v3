'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function QuantumBackground() {
	const particlesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!particlesRef.current) return;

		// Generate quantum particles
		for (let i = 0; i < 30; i++) {
			const particle = document.createElement('div');
			particle.className = cn('absolute w-[3px] h-[3px] rounded-full', 'bg-quantum-purple opacity-0', 'animate-quantum-float');
			particle.style.left = `${Math.random() * 100}%`;
			particle.style.top = `${Math.random() * 100}%`;
			particle.style.animationDelay = `${Math.random() * 10}s`;
			particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
			particle.style.boxShadow = '0 0 10px rgba(178, 75, 243, 1), 0 0 20px rgba(178, 75, 243, 1)';

			particlesRef.current.appendChild(particle);
		}

		// Cleanup
		return () => {
			if (particlesRef.current) {
				particlesRef.current.innerHTML = '';
			}
		};
	}, []);

	return (
		<>
			{/* 3D Grid Background */}
			<div
				className='absolute inset-0 opacity-30 animate-grid-perspective'
				style={{
					backgroundImage: `
            linear-gradient(rgba(178, 75, 243, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(178, 75, 243, 0.1) 1px, transparent 1px)
          `,
					backgroundSize: '60px 60px',
					transform: 'rotateX(60deg) scale(2)',
					transformOrigin: 'center center',
				}}
			/>

			{/* Quantum Particles Container */}
			<div ref={particlesRef} className='absolute inset-0' />

			{/* Floating Geometric Shapes */}
			<div
				className='absolute w-[100px] h-[100px] border-2 border-quantum-purple/30 
                   top-[20%] right-[15%] rotate-45 animate-shape-float'
			/>
			<div
				className='absolute w-[150px] h-[150px] border-2 border-quantum-purple/30 
                   bottom-[20%] left-[10%] rounded-full'
				style={{
					animation: 'shapeFloat 10s ease-in-out infinite 2s',
				}}
			/>
		</>
	);
}
