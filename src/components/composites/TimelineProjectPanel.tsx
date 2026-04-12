import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { ProjectTags } from '@/components/composites/ProjectTags';
import { ProjectImage } from '@/components/primitives/ProjectImage';
import { Panel } from '@/components/primitives/Panel';
import { InlineList } from '@/components/composites/InlineList';
import { ImpactList } from '@/components/composites/ImpactList';
import { CaseStudySection } from '@/components/composites/CaseStudySection';
import { ButtonLinkExternal } from '@/components/primitives';

export const TimelineProjectPanel = ({ project, className }: { project: Project; className?: string }) => (
	<Panel className={cn('glass-surface-1 glass-radius-2 padding-panel glass-elevation-1', className)}>
		<div className='relative stack-lg'>
			<div className='space-y-3 md:space-y-4'>
				<InlineList.Div className='cluster-md text-sm text-label'>{[project.period, project.location]}</InlineList.Div>
				<h2 className='font-urbanist text-3xl leading-tight font-bold text-primary md:text-5xl'>{project.title}</h2>
				<p className='text-xl text-secondary md:text-2xl'>
					<span>{project.company}</span> <span className='text-muted'>{' - ' + project.label}</span>
				</p>
			</div>

			<p className='text-xl leading-relaxed text-secondary'>{project.intro}</p>

			<div className='grid grid-cols-3 gap-4'>
				{[0, 1, 2].map((i) => (
					<ProjectImage
						key={i}
						src={project.images.screens[i]}
						alt={`Screenshot of ${project.title}`}
						className={cn('glass-surface-2 aspect-video rounded-xl gradient-primary-soft shadow-none', [
							'opacity-75 transition-opacity duration-300 hover:opacity-100',
						])}
					/>
				))}
			</div>

			<CaseStudySection label='The Challenge' content={project.challenge} />

			<CaseStudySection label='The Solution' content={project.solution} />

			<div className='space-y-4'>
				<h3 className='heading-2 text-primary'>Impact & Results</h3>
				<ImpactList items={project.impact} />
			</div>

			<ProjectTags size='lg' tags={project.tags} />

			{project.link && (
				<ButtonLinkExternal href={project.link} size='sm'>
					Visit Project →
				</ButtonLinkExternal>
			)}
		</div>
	</Panel>
);
