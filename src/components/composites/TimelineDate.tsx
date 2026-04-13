import { cn } from '@/lib/utils';
import { TimelineDot } from '@/components/primitives/TimelineDot';

type TimeLineDateProps = {
	period: string;
	className?: string;
};

const TimelineDateWide = ({ period, className }: TimeLineDateProps) => (
	<div className={cn('relative', className)}>
		<div className='flex w-32 shrink-0 items-start justify-end pt-8'>
			<span className='pr-4 text-sm font-semibold whitespace-nowrap text-label'>{period}</span>
		</div>
		<TimelineDot active className='absolute top-8 -right-px z-10 translate-x-1/2' />
	</div>
);

const TimelineDateNarrow = ({ period, className }: TimeLineDateProps) => (
	<div className={cn('relative w-8 self-stretch', className)}>
		<div className='absolute top-1/2 left-2 -translate-y-1/2'>
			<span className='block origin-center -translate-x-1/2 -rotate-90 text-sm font-semibold tracking-wider whitespace-nowrap text-label'>
				{period}
			</span>
		</div>
		<TimelineDot active className='absolute top-8 -right-0.75 z-10 translate-x-1/2' />
	</div>
);

const TimelineDateMobile = ({ period, className }: TimeLineDateProps) => (
	<div className={cn('flex items-center gap-3', className)}>
		<TimelineDot active />
		<span className='translate-y-px text-sm font-semibold text-label'>{period}</span>
	</div>
);

export const TimelineDate = {
	Wide: TimelineDateWide,
	Narrow: TimelineDateNarrow,
	Mobile: TimelineDateMobile,
};
