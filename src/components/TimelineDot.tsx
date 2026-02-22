import { cn } from '@/lib/utils';

type TimelineDotProps = {
	active?: boolean;
	size?: 'sm' | 'md';
	className?: string;
};

export const TimelineDot = ({ active = false, size = 'md', className }: TimelineDotProps) => {
	const sizeClasses = {
		sm: 'w-3 h-3',
		md: 'w-4 h-4',
	};

	return (
		<div
			className={cn(
				'rounded-full transition-all duration-300',
				sizeClasses[size],
				active ? 'bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-chrome-silver/30',
				className
			)}
		/>
	);
};
