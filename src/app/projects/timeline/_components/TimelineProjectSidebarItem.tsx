import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { TimelineDot } from '@/components/TimelineDot';

export const ProjectSidebarItem = ({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) => (
	<button
		onClick={onClick}
		className={cn(
			'relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300',
			isActive ? 'bg-accent-blue/10 border border-accent-blue/30' : 'hover:bg-white/[0.03] border border-transparent'
		)}
		// style={{ viewTransitionName: `project-card-${project.id}` }}
	>
		<TimelineDot active={isActive} size='sm' className='absolute left-[14px] top-1/2 -translate-y-1/2' />

		<div className='space-y-1'>
			<div className='text-xs text-accent-cyan font-dm-sans'>{project.period}</div>
			<div
				className={cn('font-urbanist font-semibold text-sm transition-colors', isActive ? 'text-chrome-silver' : 'text-chrome-silver/60')}
			>
				{project.title}
			</div>
			<div className='text-xs text-chrome-silver/50'>{project.company}</div>
		</div>
	</button>
);
