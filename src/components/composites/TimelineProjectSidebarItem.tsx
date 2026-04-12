import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { TimelineDot } from '@/components/primitives/TimelineDot';

export const ProjectSidebarItem = ({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) => (
	<button
		onClick={onClick}
		className={cn(
			'relative w-full rounded-xl p-4 pl-10 text-left',
			'transition-[background-color,border-color,opacity] duration-300',
			isActive
				? ['border border-accent/30 bg-accent/10', 'transitioning:border-transparent transitioning:bg-accent/5']
				: 'border border-transparent hover:bg-fill-sm',
		)}
	>
		<TimelineDot active={isActive} size={isActive ? 'md' : 'sm'} className='absolute top-1/2 left-2.5 -translate-y-1/2' />

		<div className='space-y-1'>
			<div className='ui-meta text-label'>{project.period}</div>
			<div className={cn('font-urbanist text-sm font-semibold transition-colors', isActive ? 'text-primary' : 'text-muted')}>
				{project.title}
			</div>
			<div className='text-xs text-subtle'>{project.company}</div>
		</div>
	</button>
);
