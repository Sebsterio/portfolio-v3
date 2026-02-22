'use client';

import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import type { DisplayMode } from '../types';

type DisplayModeSwitcherProps = {
	currentMode: DisplayMode;
	basePath?: string;
};

const views: { value: DisplayMode; label: string }[] = [
	{ value: 'timeline', label: 'Timeline' },
	{ value: 'cards', label: 'Cards' },
	{ value: 'magazine', label: 'Magazine' },
];

export const DisplayModeSwitcher = ({ currentMode, basePath = '/projects' }: DisplayModeSwitcherProps) => {
	const { navigate } = useTransitionRouter();

	const handleModeChange = (view: DisplayMode) => {
		navigate(`${basePath}?view=${view}`);
	};

	return (
		<div className='flex gap-3 justify-center mb-8'>
			{views.map(({ value, label }) => (
				<button
					key={value}
					onClick={() => handleModeChange(value)}
					className={cn(
						'px-6 py-3 rounded-full font-dm-sans text-sm font-semibold transition-all duration-300',
						currentMode === value
							? 'bg-gradient-to-br from-accent-blue to-accent-cyan text-white'
							: 'bg-white/[0.03] text-chrome-silver/60 hover:text-chrome-silver hover:bg-white/[0.08]'
					)}
				>
					{label}
				</button>
			))}
		</div>
	);
};
