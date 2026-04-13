import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

type TimelineLineProps = {
	className?: string;
	style?: CSSProperties;
};

export const TimelineLine = ({ className, ...rest }: TimelineLineProps) => {
	return (
		<div className={cn('absolute top-0 bottom-0 w-0.5', className)} {...rest}>
			<div className='absolute inset-0 bg-linear-to-b from-accent-1/80 via-accent-2 to-accent-1/20' />
		</div>
	);
};
