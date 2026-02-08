'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface QuantumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	children: React.ReactNode;
}

export const QuantumButton = forwardRef<HTMLButtonElement, QuantumButtonProps>(
	({ variant = 'primary', className, children, ...props }, ref) => {
		if (variant === 'primary') {
			return (
				<button
					ref={ref}
					className={cn(
						'relative px-10 py-5 rounded-xl overflow-hidden',
						'font-exo text-[15px] font-semibold tracking-wide',
						'bg-gradient-to-br from-quantum-purple to-quantum-magenta',
						'text-white transition-all duration-500',
						// 'shadow-[0_10px_40px_rgba(178,75,243,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]',
						'shadow-[0_10px_40px_rgba(178,75,243,0.4)]',
						'hover:translate-y-[-5px] hover:scale-105',
						'hover:shadow-[0_20px_60px_rgba(178,75,243,0.6),0_0_0_1px_rgba(255,255,255,0.2)_inset]',
						// 'before:absolute before:inset-0',
						// 'before:bg-gradient-to-br before:from-quantum-magenta before:to-quantum-blue',
						// 'before:opacity-0 before:transition-opacity before:duration-500',
						// 'hover:before:opacity-100',
						className
					)}
					{...props}
				>
					<span className='relative z-10'>{children}</span>
				</button>
			);
		}

		return (
			<button
				ref={ref}
				className={cn(
					'px-10 py-5 rounded-xl',
					'font-exo text-[15px] font-semibold tracking-wide',
					'bg-transparent backdrop-blur-[10px]',
					'text-white border-2 border-quantum-purple/50',
					'transition-all duration-500',
					'hover:bg-quantum-purple/10 hover:border-quantum-purple',
					'hover:translate-y-[-5px] hover:scale-105',
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
);

QuantumButton.displayName = 'QuantumButton';
