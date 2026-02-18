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
				'px-4 py-2 lg:px-7 lg:py-3 rounded-full',
				'bg-accent-blue/[0.08] border border-accent-blue/25',
				className
			)}
		>
			<div
				className={cn(
					'w-1.5 h-1.5 rounded-full animate-status-pulse',
					'bg-accent-blue shadow-[0_0_15px_rgba(59,130,246,1)]' //
				)}
			/>
			<span
				className={cn(
					'text-accent-blue font-semibold uppercase',
					'text-[10px] lg:text-[11px] tracking-[1.5px] lg:tracking-[2px]' //
				)}
				style={{ lineHeight: 'inherit' }}
			>
				{children}
			</span>
		</div>
	);
}
