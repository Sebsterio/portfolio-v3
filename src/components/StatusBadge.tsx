import { cn } from '@/lib/utils';

interface StatusBadgeProps {
	children: string;
	className?: string;
}

export function StatusBadge({ children, className }: StatusBadgeProps) {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-2',
				'rounded-full px-4 py-2 lg:px-7 lg:py-3',
				'border border-accent-blue/25 bg-accent-blue/8',
				className,
			)}
		>
			<div
				className={cn(
					'h-1.5 w-1.5 animate-status-pulse rounded-full',
					'bg-accent-blue shadow-[0_0_15px_rgba(59,130,246,1)]', //
				)}
			/>
			<span
				className={cn(
					'font-semibold text-accent-blue uppercase',
					'text-[10px] tracking-[1.5px] lg:text-[11px] lg:tracking-[2px]', //
				)}
				style={{ lineHeight: 'inherit' }}
			>
				{children}
			</span>
		</div>
	);
}
