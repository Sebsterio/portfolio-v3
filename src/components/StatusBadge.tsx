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
				'border border-accent/25 bg-accent/8',
				className,
			)}
		>
			<div
				className={cn(
					'h-1.5 w-1.5 animate-status-pulse rounded-full',
					'bg-accent shadow-status-dot',
				)}
			/>
			<span
				className={cn(
					'font-semibold text-accent uppercase',
					'text-[10px] tracking-[1.5px] lg:text-[11px] lg:tracking-[2px]', //
				)}
				style={{ lineHeight: 'inherit' }}
			>
				{children}
			</span>
		</div>
	);
}
