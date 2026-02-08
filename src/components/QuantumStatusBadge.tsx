import { cn } from '@/lib/utils';

interface QuantumStatusBadgeProps {
	children: string;
	className?: string;
}

export function QuantumStatusBadge({ children, className }: QuantumStatusBadgeProps) {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-2.5 mb-10',
				'px-5 py-2.5 rounded-full',
				'bg-quantum-purple/10 border border-quantum-purple/30',
				className
			)}
		>
			<div className='w-2 h-2 rounded-full bg-quantum-purple animate-status-pulse shadow-[0_0_15px_rgba(178,75,243,1)]' />
			<span className='text-xs tracking-[2px] uppercase' style={{ lineHeight: 'inherit' }}>
				{children}
			</span>
		</div>
	);
}
