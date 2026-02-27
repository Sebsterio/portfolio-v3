'use client';

import { TransitionLink } from '@/lib/transitions/TransitionLink';
import { cn } from '@/lib/utils';
import type { DisplayMode } from '@/types';

type DisplayModeSwitcherProps = {
	currentMode: DisplayMode;
	basePath?: string;
	onViewChange?: (view: DisplayMode) => void;
	className?: string;
};

export function DisplayModeSwitcher({ currentMode, basePath = '/projects', onViewChange, className }: DisplayModeSwitcherProps) {
	const views: { mode: DisplayMode; label: string }[] = [
		{ mode: 'timeline', label: 'Timeline' },
		{ mode: 'cards', label: 'Cards' },
		{ mode: 'magazine', label: 'Magazine' },
	];

	const handleClick = (e: React.MouseEvent, view: DisplayMode) => {
		if (onViewChange) {
			e.preventDefault();
			onViewChange(view);
		}
	};

	return (
		<div className='flex gap-4 justify-center'>
			{views.map(({ mode, label }) => (
				<TransitionLink
					key={mode}
					href={`${basePath}?view=${mode}`}
					onClick={(e) => handleClick(e, mode)}
					className={cn(
						'px-6 py-3 rounded-full font-dm-sans text-sm font-semibold transition-all duration-300',
						currentMode === mode
							? 'bg-gradient-to-br from-accent-blue to-accent-cyan text-white'
							: 'bg-white/[0.03] text-chrome-silver/60 hover:text-chrome-silver hover:bg-white/[0.08]'
					)}
				>
					{label}
				</TransitionLink>
			))}
		</div>
	);
}
