'use client';

import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-items';

export function QuantumHeader() {
	return (
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
				<span className='bg-gradient-to-r from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'>PORTFOLIO</span>
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
							<span
								className={cn(
									'absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-full',
									'bg-gradient-to-r from-quantum-purple to-quantum-magenta',
									'transition-all duration-400',
									'shadow-[0_0_10px_rgba(178,75,243,1)]'
								)}
							/>
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
