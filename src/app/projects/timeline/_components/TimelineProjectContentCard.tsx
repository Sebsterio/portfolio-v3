import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { InlineList } from '@/components/InlineList';

export const ProjectContentCard = ({ project, className }: { project: Project; className?: string }) => (
	<GlassSurface className={cn('p-8 md:p-12', className)} rounded={1}>
		<div className={cn('gradient-corner-tr gradient-gleam-blue overlay h-48 w-48')} />
		<div className={cn('gradient-corner-bl gradient-gleam-cyan overlay h-48 w-48')} />

		<div className='relative space-y-8'>
			<div className='space-y-3 md:space-y-4'>
				<InlineList.Div className='cluster-md text-sm text-accent-cyan'>{[project.period, project.location]}</InlineList.Div>
				<h2 className='font-urbanist text-3xl leading-tight font-bold text-chrome-silver md:text-5xl'>{project.title}</h2>
				<p className='text-xl text-chrome-silver/80 md:text-2xl'>
					<span className=''>{project.company}</span> <span className='text-chrome-silver/40'>{' - ' + project.label}</span>
				</p>
			</div>

			<p className='text-secondary text-xl leading-relaxed'>{project.intro}</p>

			<div className='grid grid-cols-3 gap-4'>
				{[0, 1, 2].map((i) => (
					<ProjectImage
						key={i}
						src={project.images.screens[i]}
						alt={`Screenshot of ${project.title}`}
						className={cn('surface-glass-2 aspect-video rounded-xl gradient-primary-soft shadow-none', [
							'transition-duration-300 opacity-75 transition-opacity hover:opacity-100',
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
				<ul className='space-y-2'>
					{project.impact.map((item, i) => (
						<li key={i} className='flex items-start gap-3'>
							<span className='mt-1 text-accent-cyan'>→</span>
							<span className='text-chrome-silver/80'>{item}</span>
						</li>
					))}
				</ul>
			</div>

			<ProjectTags size='lg' tags={project.tags} />

			{/* TODO: extract component or styles */}
			{project.link && (
				<a href={project.link} target='_blank' rel='noopener noreferrer' className={cn('button-primary-inline-lg')}>
					Visit Project →
				</a>
			)}
		</div>
	</GlassSurface>
);
