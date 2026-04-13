import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { Panel } from '@/components/primitives/Panel';
import { InlineList } from '@/components/composites/InlineList';
import { ProjectTags } from '@/components/composites/ProjectTags';
import { ArrowIndicator } from '@/components/primitives/ArrowIndicator';

type TimelineCardProps = {
	project: Project;
	limit?: number;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
};

export function TimelineCard({ project, className, limit, ...props }: TimelineCardProps) {
	return (
		<Panel
			{...props}
			className={cn(
				'glass-surface-2 glass-radius-2 padding-card text-left glass-elevation-1',
				'transition-[translate] duration-200 ease-out hover:translate-x-4',
				className,
			)}
		>
			<div className='relative space-y-3 md:space-y-4'>
				<InlineList.Div className='cluster-sm hidden text-sm text-subtle md:flex'>{[project.location, project.role]}</InlineList.Div>
				<h3 className='heading-2 md:heading-1 text-primary'>{project.title}</h3>
				<p className='text-tertiary md:text-lg md:text-secondary'>{project.company}</p>
				<p className='text-sm leading-relaxed text-muted md:text-base'>{project.summary}</p>
				<ProjectTags tags={project.tags} limit={limit} className='pt-2' size='lg' />
				<ArrowIndicator aria-label={`View ${project.title}`} className='absolute right-0 bottom-0 group-hover:translate-x-1' />
			</div>
		</Panel>
	);
}
