import { cn } from '@/lib/utils';

type TimelineDotProps = {
	active?: boolean;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
};

const sizeClasses = {
	sm: 'w-2 h-2 ml-[3px]',
	md: 'w-3 h-3 ml-px',
	lg: 'w-4 h-4',
};

const stateClasses = {
	active: 'bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]',
	// default: 'bg-chrome-silver/30',
	default: 'bg-[rgb(130,130,130)] shadow-[0_0_2px_1px_rgba(130,130,130,0.8)]',
};

export const TimelineDot = ({ active = false, size = 'lg', className }: TimelineDotProps) => {
	return (
		<div
			className={cn(
				'rounded-full transition-all transition-duration-300',
				sizeClasses[size],
				stateClasses[active ? 'active' : 'default'],
				className
			)}
		/>
	);
};
