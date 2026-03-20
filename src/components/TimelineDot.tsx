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
	active: 'bg-accent-blue shadow-dot-active',
	default: 'bg-chrome-dark shadow-dot-inactive',
};

export const TimelineDot = ({ active = false, size = 'lg', className }: TimelineDotProps) => {
	return (
		<div
			className={cn(
				'transition-duration-300 rounded-full transition-all',
				sizeClasses[size],
				stateClasses[active ? 'active' : 'default'],
				className,
			)}
		/>
	);
};
