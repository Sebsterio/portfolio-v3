import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

type TimelineLineProps = {
	position: 'left' | 'center';
	fadeEnds?: boolean;
	className?: string;
	style?: CSSProperties;
};

const positions = {
	left: 'left-[7px]',
	center: 'left-4',
};

export const TimelineLine = ({ position, fadeEnds = true, className, ...rest }: TimelineLineProps) => (
	<div
		className={cn('absolute top-0 bottom-0 w-[2px]', positions[position], className)}
		{...rest} //
	>
		{fadeEnds ? (
			<>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan to-transparent' />
				<div className='absolute inset-0 bg-gradient-to-b from-accent-blue/80 via-accent-cyan to-accent-blue/20' />
			</>
		) : (
			<div className='absolute inset-0 bg-gradient-to-b from-accent-blue/80 via-accent-cyan to-transparent' />
		)}
	</div>
);
