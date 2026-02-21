'use client';

import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import type { ViewMode } from '../types';

type ViewSwitcherProps = {
	currentView: ViewMode;
	basePath?: string;
};

const views: { value: ViewMode; label: string }[] = [
	{ value: 'timeline', label: 'Timeline' },
	{ value: 'cards', label: 'Cards' },
	{ value: 'magazine', label: 'Magazine' },
];

export const ViewSwitcher = ({ currentView, basePath = '/projects' }: ViewSwitcherProps) => {
	const { navigate } = useTransitionRouter();

	const handleViewChange = (view: ViewMode) => {
		navigate(`${basePath}?view=${view}`);
	};

	return (
		<div className='flex gap-3 justify-center mb-8'>
			{views.map(({ value, label }) => (
				<button
					key={value}
					onClick={() => handleViewChange(value)}
					className={cn(
						'px-6 py-3 rounded-full font-dm-sans text-sm font-semibold transition-all duration-300',
						currentView === value
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
