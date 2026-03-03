'use client';

import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/lib/transitions/components/TransitionLink';
import { cn } from '@/lib/utils';
import type { DisplayMode } from '@/types';

const views: { mode: DisplayMode; label: string }[] = [
	{ mode: 'timeline', label: 'Timeline' },
	{ mode: 'cards', label: 'Cards' },
	{ mode: 'magazine', label: 'Magazine' },
];

const LAYOUTS = views.map((v) => v.mode);

function getCurrentLayout(pathname: string): DisplayMode {
	const segment = pathname.split('/')[2] as DisplayMode;
	return LAYOUTS.includes(segment) ? segment : 'timeline';
}

function buildTargetPath(pathname: string, next: DisplayMode): string {
	const segments = pathname.split('/');
	segments[2] = next;
	return segments.join('/');
}

type DisplayModeSwitcherProps = {
	onViewChange?: (view: DisplayMode) => void;
	className?: string;
};

export function DisplayModeSwitcher({ onViewChange, className }: DisplayModeSwitcherProps) {
	const pathname = usePathname();
	const currentMode = getCurrentLayout(pathname);

	const handleClick = (e: React.MouseEvent, newMode: DisplayMode) => {
		if (!onViewChange) return;
		e.preventDefault();
		onViewChange(newMode);
	};

	return (
		<div className={cn('flex gap-4', className)}>
			{views.map(({ mode, label }) => (
				<TransitionLink
					key={mode}
					href={buildTargetPath(pathname, mode)}
					onClick={(e) => handleClick(e, mode)}
					className={cn(
						'px-6 py-3 rounded-full font-dm-sans text-sm font-semibold transition-all duration-300',
						currentMode === mode
							? 'bg-linear-to-br from-accent-blue to-accent-cyan text-white'
							: 'bg-white/3 text-chrome-silver/60 hover:text-chrome-silver hover:bg-white/8'
					)}
				>
					{label}
				</TransitionLink>
			))}
		</div>
	);
}
