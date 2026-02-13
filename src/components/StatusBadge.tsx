import { cn } from '@/lib/utils';

interface StatusBadgeProps {
	children: string;
	className?: string;
}

export function StatusBadge({ children, className }: StatusBadgeProps) {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-2.5 mb-9',
				'px-7 py-3 rounded-full',
				'bg-accent-blue/[0.08] border border-accent-blue/25',
				className
			)}
		>
			<div className='w-1.5 h-1.5 rounded-full bg-accent-blue animate-status-pulse shadow-[0_0_15px_rgba(59,130,246,1)]' />
			<span className='text-accent-blue font-semibold text-[11px] tracking-[2px] uppercase' style={{ lineHeight: 'inherit' }}>
				{children}
			</span>
		</div>
	);
}
