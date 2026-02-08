'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const navItems = [
	{ label: 'Projects', href: '#projects' },
	{ label: 'About', href: '#about' },
	{ label: 'Contact', href: '#contact' },
];

export function QuantumHeader() {
	const headerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!headerRef.current) return;

		// Animated entrance
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
		<header ref={headerRef} className='py-8'>
			<nav
				className={cn(
					'relative flex justify-between items-center',
					'px-10 py-6 rounded-2xl',
					'bg-[rgba(5,5,10,0.7)] backdrop-blur-[20px]',
					'border border-quantum-purple/20',
					'shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(178,75,243,0.2)]'
				)}
			>
				{/* Top Glow Line */}
				<div
					className='absolute -top-px left-1/2 -translate-x-1/2 w-[200px] h-[2px]'
					style={{
						background: 'linear-gradient(90deg, transparent, #b24bf3, transparent)',
						boxShadow: '0 0 20px #b24bf3',
					}}
				/>

				{/* Logo */}
				<div className='font-exo text-[28px] font-extrabold tracking-[2px]'>
					<span className='bg-gradient-to-r from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'>QUANTUM</span>
				</div>

				{/* Navigation Links */}
				<ul className='flex gap-12 list-none'>
					{navItems.map((item) => (
						<li key={item.label}>
							<a
								href={item.href}
								className='group relative text-white/70 text-[13px] font-semibold tracking-[2px] uppercase transition-all duration-400 hover:text-white'
							>
								{item.label}
								<span className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-quantum-purple to-quantum-magenta transition-all duration-400 group-hover:w-full shadow-[0_0_10px_rgba(178,75,243,1)]' />
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
