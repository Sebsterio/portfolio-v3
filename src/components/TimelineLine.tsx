import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

type TimelineLineProps = {
	position?: 'left' | 'center' | 'right';
	fadeEnds?: boolean;
	className?: string;
	style?: CSSProperties;
};

const positions = {
	left: 'left-[7px]',
	center: 'left-4',
	right: 'left-32',
};

export const TimelineLine = ({ position, fadeEnds = true, className, ...rest }: TimelineLineProps) => (
	<div
		className={cn('absolute top-0 bottom-0 w-[2px]', position && positions[position], className)}
		{...rest} //
	>
		{fadeEnds ? (
			<>
				<div className='absolute inset-0 bg-linear-to-b from-transparent via-accent-2 to-transparent' />
				<div className='absolute inset-0 bg-linear-to-b from-accent-1/80 via-accent-2 to-accent-1/20' />
			</>
		) : (
			<div className='absolute inset-0 bg-linear-to-b from-accent-1/80 via-accent-2 to-transparent' />
		)}
	</div>
);
