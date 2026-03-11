import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { InlineList } from '@/components/InlineList';

export const ProjectContentCard = ({ project, className }: { project: Project; className?: string }) => (
	<GlassSurface className={cn('p-8 md:p-12', className)} rounded={1}>
		<div className={cn('overlay w-48 h-48 gradient-corner-tr gradient-gleam-blue')} />
		<div className={cn('overlay w-48 h-48 gradient-corner-bl gradient-gleam-cyan')} />

		<div className='relative space-y-8'>
			<div className='space-y-3 md:space-y-4'>
				<InlineList.Div className='flex items-center gap-4 text-sm text-accent-cyan'>{[project.period, project.location]}</InlineList.Div>
				<h2 className='font-urbanist text-3xl md:text-5xl font-bold text-chrome-silver leading-tight'>{project.title}</h2>
				<p className='text-xl md:text-2xl text-chrome-silver/80'>
					<span className=''>{project.company}</span> <span className='text-chrome-silver/40'>{' - ' + project.label}</span>
				</p>
			</div>

			<p className='text-xl text-secondary leading-relaxed'>{project.intro}</p>

			<div className='grid grid-cols-3 gap-4'>
				{[0, 1, 2].map((i) => (
					<ProjectImage
						key={i}
						src={project.images.screens[i]}
						alt={`Screenshot of ${project.title}`}
						className={cn(
							'aspect-video rounded-xl surface-glass-2 shadow-none gradient-primary-soft',
							'opacity-75 hover:opacity-100 transition-opacity transition-duration-300'
						)}
						fallbackClass='text-white/50 text-sm font-semibold'
						fallbackText='Screenshot Unavailable'
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
							<span className='text-accent-cyan mt-1'>→</span>
							<span className='text-chrome-silver/80'>{item}</span>
						</li>
					))}
				</ul>
			</div>

			<ProjectTags tags={project.tags} />

			{/* TODO: extract component or styles */}
			{project.link && (
				<a
					href={project.link}
					target='_blank'
					rel='noopener noreferrer'
					className={cn('inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-primary text-white font-semibold')}
				>
					Visit Project →
				</a>
			)}
		</div>
	</GlassSurface>
);
