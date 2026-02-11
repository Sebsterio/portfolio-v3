'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ChromeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	children: React.ReactNode;
}

export const ChromeButton = forwardRef<HTMLButtonElement, ChromeButtonProps>(
	({ variant = 'primary', className, children, ...props }, ref) => {
		if (variant === 'primary') {
			return (
				<button
					ref={ref}
					className={cn(
						'px-12 py-5 rounded-full',
						'font-dm-sans text-[15px] font-bold',
						'bg-gradient-to-br from-accent-blue to-accent-cyan',
						'text-white',
						'shadow-[0_15px_50px_rgba(59,130,246,0.35)]',
						'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
						'hover:translate-y-[-4px] hover:scale-[1.02]',
						'hover:shadow-[0_25px_70px_rgba(59,130,246,0.5)]',
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
					'px-12 py-5 rounded-full',
					'font-dm-sans text-[15px] font-bold',
					'bg-white/[0.03] backdrop-blur-[10px]',
					'text-chrome-silver',
					'border-2 border-chrome-silver/15',
					'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
					'hover:bg-white/[0.08] hover:border-chrome-silver/40',
					'hover:translate-y-[-4px] hover:scale-[1.02]',
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
);

ChromeButton.displayName = 'ChromeButton';
