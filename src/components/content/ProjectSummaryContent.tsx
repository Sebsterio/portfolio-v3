import { Project } from '@/types';
import { InlineList } from '@/components/composites/InlineList';
import { ProjectTags } from '@/components/composites/ProjectTags';
import { ProjectImage } from '@/components/primitives/ProjectImage';

export function ProjectSummaryContent({ project }: { project: Project }) {
	return (
		<div className='stack-md pb-2 md:stack-lg'>
			<div className='stack-xs'>
				<InlineList.Div className='ui-label cluster-md tracking-normal text-label normal-case'>
					{[project.period, project.location]}
				</InlineList.Div>
				<h2 className='display-2 leading-tight text-primary'>{project.title}</h2>
				<p className='body-lg text-secondary'>
					<span>{project.company}</span>
					<span className='text-muted'>{` - ${project.label}`}</span>
				</p>
			</div>

			<ProjectImage src={project.images.main} alt={`Screenshot of ${project.title}`} className='h-64 rounded-2xl md:h-80' />

			<p className='body-sm md:body-md text-tertiary'>{project.summary}</p>

			<ProjectTags size='lg' tags={project.tags} />

			<p className='ui-label animate-pulse tracking-normal text-accent normal-case select-none'>Flip card →</p>
		</div>
	);
}
