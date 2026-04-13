import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { TimelineDot } from '@/components/primitives/TimelineDot';

type TimelineProjectLinkProps = {
	project: Project;
	active?: boolean;
	onClick: () => void;
	className?: string;
};

export const TimelineProjectLink = ({ project, active, className, ...props }: TimelineProjectLinkProps) => (
	<button
		{...props}
		className={cn(
			'relative w-full rounded-xl border p-4 pl-10',
			'transition-[background-color,border-color,opacity] duration-300',
			active
				? ['border-accent/30 bg-accent/10', 'transitioning:border-transparent transitioning:bg-accent/5']
				: 'border-transparent hover:bg-fill-sm',
			className,
		)}
	>
		<TimelineDot className='absolute top-1/2 left-2.5 -translate-y-1/2' size={active ? 'md' : 'sm'} active={active} />

		<div className='space-y-1 text-left'>
			<div className='ui-meta text-label'>{project.period}</div>
			<div className={cn('font-display text-sm font-semibold transition-colors', active ? 'text-primary' : 'text-muted')}>
				{project.title}
			</div>
			<div className='text-xs text-subtle'>{project.company}</div>
		</div>
	</button>
);
