import { cn } from '@/lib/utils';

/**
 * Triggered by hovering on ancestors with the class "group/tooltip"
 */
export const Tooltip = ({ children }: { children: string }) => {
	return (
		<div
			className={cn('pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg', [
				'bg-slate-800 px-3 py-1 text-sm whitespace-nowrap text-slate-200',
				'transition-opacity duration-300 group-hover/tooltip:delay-400',
				'opacity-0 group-hover/tooltip:opacity-100',
			])}
		>
			{children}
			<div
				className={cn('absolute top-full left-1/2 h-0 w-0 -translate-x-1/2', [
					'border-t-4 border-r-4 border-l-4 border-transparent border-t-slate-800',
				])}
			/>
		</div>
	);
};
