import { cn } from '@/lib/utils';

interface StatusBadgeProps {
	children: string;
	className?: string;
}

export function StatusBadge({ children, className }: StatusBadgeProps) {
	return (
		<div
			className={cn(
				'inline-block rounded-full border border-accent/25 bg-accent/8',
				'space-x-2 px-4 py-2 text-[10px] tracking-[1.5px]',
				'lg:space-x-3 lg:px-7 lg:py-3 lg:text-[12px] lg:tracking-[2px]',
				className,
			)}
		>
			<span className='inline-block h-1.5 w-1.5 animate-status-pulse rounded-full bg-accent glow-accent-lg' />
			<span className='inline-block font-semibold text-accent uppercase lg:align-[-1px]'>{children}</span>
		</div>
	);
}
