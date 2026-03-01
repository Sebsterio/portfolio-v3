'use client';

import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/lib/transitions/TransitionLink';
import { cn } from '@/lib/utils';
import type { DisplayMode } from '@/types';

const views: { mode: DisplayMode; label: string }[] = [
	{ mode: 'timeline', label: 'Timeline' },
	{ mode: 'cards', label: 'Cards' },
	{ mode: 'magazine', label: 'Magazine' },
];

const LAYOUTS = views.map((v) => v.mode);

function useCurrentLayout(pathname: string): DisplayMode {
	const segment = pathname.split('/')[2] as DisplayMode;
	return LAYOUTS.includes(segment) ? segment : 'timeline';
}

function buildTargetPath(pathname: string, next: DisplayMode): string {
	const segments = pathname.split('/');
	segments[2] = next;
	return segments.join('/');
}

// const handleViewChange = (newView: DisplayMode) => {
// 	// Update URL without full navigation
// 	const url = new URL(window.location.href);
// 	url.searchParams.set('view', newView);
// 	window.history.replaceState({}, '', url);

// 	// Instant view switch with View Transition API
// 	if (document.startViewTransition) {
// 		document.startViewTransition(() => setView(newView));
// 	} else {
// 		setView(newView);
// 	}
// };

type DisplayModeSwitcherProps = {
	onViewChange?: (view: DisplayMode) => void;
	className?: string;
};

export function DisplayModeSwitcher({ onViewChange, className }: DisplayModeSwitcherProps) {
	const pathname = usePathname();
	const currentMode = useCurrentLayout(pathname);

	const handleClick = (e: React.MouseEvent, newMode: DisplayMode) => {
		if (onViewChange) {
			e.preventDefault();
			onViewChange(newMode);
		}
	};

	return (
		<div className={cn('flex gap-4 justify-center', className)}>
			{views.map(({ mode, label }) => (
				<TransitionLink
					key={mode}
					href={buildTargetPath(pathname, mode)}
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

// 'use client';

// import { TransitionLink } from '@/lib/transitions/TransitionLink';
// import { cn } from '@/lib/utils';
// import type { DisplayMode } from '@/types';

// type DisplayModeSwitcherProps = {
// 	currentMode: DisplayMode;
// 	basePath?: string;
// 	onViewChange?: (view: DisplayMode) => void;
// 	className?: string;
// };

// const views: { mode: DisplayMode; label: string }[] = [
// 	{ mode: 'timeline', label: 'Timeline' },
// 	{ mode: 'cards', label: 'Cards' },
// 	{ mode: 'magazine', label: 'Magazine' },
// ];

// export function DisplayModeSwitcher({ currentMode, basePath = '/projects', onViewChange, className }: DisplayModeSwitcherProps) {

// 	const handleClick = (e: React.MouseEvent, view: DisplayMode) => {
// 		if (onViewChange) {
// 			e.preventDefault();
// 			onViewChange(view);
// 		}
// 	};

// 	return (
// 		<div className={cn('flex gap-4 justify-center', className)}>
// 			{views.map(({ mode, label }) => (
// 				<TransitionLink
// 					key={mode}
// 					href={`${basePath}?view=${mode}`}
// 					onClick={(e) => handleClick(e, mode)}
// 					className={cn(
// 						'px-6 py-3 rounded-full font-dm-sans text-sm font-semibold transition-all duration-300',
// 						currentMode === mode
// 							? 'bg-gradient-to-br from-accent-blue to-accent-cyan text-white'
// 							: 'bg-white/[0.03] text-chrome-silver/60 hover:text-chrome-silver hover:bg-white/[0.08]'
// 					)}
// 				>
// 					{label}
// 				</TransitionLink>
// 			))}
// 		</div>
// 	);
// }
