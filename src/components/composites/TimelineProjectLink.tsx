import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { TimelineDot } from '@/components/primitives/TimelineDot';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';

type TimelineProjectLinkProps = {
	project: Project;
	active?: boolean;
	className?: string;
	href: string;
	scroll?: boolean;
};

export const TimelineProjectLink = ({ project, active, className, href, scroll, ...props }: TimelineProjectLinkProps) => {
	const { navigate, prefetch } = useTransitionRouter();

	return (
		<div // NOTE: using TransitionLink here breaks the theme-transition of the text color (only) of the content
			{...props}
			onClick={() => navigate(href, { scroll })}
			onMouseEnter={() => prefetch(href)}
			className={cn(
				'relative w-full rounded-xl border p-4 pl-10',
				'text-inherit visited:text-inherit',
				'transition-[background-color,border-color] duration-300',
				active
					? 'border-accent/30 bg-accent/10 transitioning:border-transparent transitioning:bg-accent/5'
					: 'border-transparent hover:bg-fill-sm',
				className,
			)}
		>
			<TimelineDot className='absolute top-1/2 left-2.5 -translate-y-1/2' size={active ? 'md' : 'sm'} active={active} />

			<div className='space-y-1 text-left'>
				<div className='ui-meta text-label'>{project.period}</div>
				<div className={cn('font-display text-sm font-semibold', active ? 'text-primary' : 'text-muted')}>{project.title}</div>
				<div className='text-xs text-subtle'>{project.company}</div>
			</div>
		</div>
	);
};
