import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { TimelineDot } from '@/components/TimelineDot';

export const ProjectSidebarItem = ({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) => (
	<button
		onClick={onClick}
		className={cn(
			'relative w-full rounded-xl p-4 pl-10 text-left transition-all duration-300',
			isActive ? 'border border-accent/30 bg-accent/10' : 'border border-transparent hover:bg-fill-sm',
		)}
		// style={{ viewTransitionName: `project-card-${project.id}` }}
	>
		<TimelineDot active={isActive} size={isActive ? 'md' : 'sm'} className='absolute top-1/2 left-[10px] -translate-y-1/2' />

		<div className='space-y-1'>
			<div className='ui-meta text-label'>{project.period}</div>
			<div className={cn('font-urbanist text-sm font-semibold transition-colors', isActive ? 'text-primary' : 'text-muted')}>
				{project.title}
			</div>
			<div className='text-subtle text-xs'>{project.company}</div>
		</div>
	</button>
);
