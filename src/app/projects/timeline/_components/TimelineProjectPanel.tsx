import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { Panel } from '@/components/ui/Panel';
import { InlineList } from '@/components/InlineList';
import { ImpactList } from '@/components/ImpactList';
import { ExternalLinkButton } from '@/components/Button';

export const TimelineProjectPanel = ({ project, className }: { project: Project; className?: string }) => (
	<Panel className={cn('glass-surface-1 glass-elevation-1 glass-radius-2 panel-padding', className)}>
		<div className='relative stack-lg'>
			<div className='space-y-3 md:space-y-4'>
				<InlineList.Div className='cluster-md text-sm text-accent-cyan'>{[project.period, project.location]}</InlineList.Div>
				<h2 className='font-urbanist text-3xl leading-tight font-bold text-chrome-silver md:text-5xl'>{project.title}</h2>
				<p className='text-xl text-chrome-silver/80 md:text-2xl'>
					<span>{project.company}</span> <span className='text-chrome-silver/40'>{' - ' + project.label}</span>
				</p>
			</div>

			<p className='text-secondary text-xl leading-relaxed'>{project.intro}</p>

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

			<div className='space-y-3'>
				<h3 className='heading-2 text-primary'>The Challenge</h3>
				<p className='text-secondary leading-relaxed'>{project.challenge}</p>
			</div>

			<div className='space-y-3'>
				<h3 className='heading-2 text-primary'>The Solution</h3>
				<p className='text-secondary leading-relaxed'>{project.solution}</p>
			</div>

			<div className='space-y-4'>
				<h3 className='heading-2 text-primary'>Impact & Results</h3>
				<ImpactList items={project.impact} />
			</div>

			<ProjectTags size='lg' tags={project.tags} />

			{project.link && (
				<ExternalLinkButton href={project.link} size='sm'>
					Visit Project →
				</ExternalLinkButton>
			)}
		</div>
	</Panel>
);
