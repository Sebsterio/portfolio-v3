import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { InlineList } from '@/components/InlineList';

const decorativeGradientClasses = {
	base: cn('absolute w-48 h-48 via-transparent to-transparent'),
	topRight: cn('top-0 right-0 bg-linear-to-bl', 'from-accent-blue/10'),
	bottomLeft: cn('bottom-0 left-0 bg-linear-to-tr', 'from-accent-cyan/10'),
};

export const ProjectContentCard = ({ project, className }: { project: Project; className?: string }) => (
	<GlassSurface className={cn('p-8 md:p-12', className)} rounded='2xl'>
		<div className={cn(decorativeGradientClasses.base, decorativeGradientClasses.topRight)} />
		<div className={cn(decorativeGradientClasses.base, decorativeGradientClasses.bottomLeft)} />

		<div className='relative space-y-8'>
			<div className='space-y-3 md:space-y-4'>
				<InlineList.Div className='flex items-center gap-4 text-sm text-accent-cyan'>{[project.period, project.location]}</InlineList.Div>
				<h2 className='font-urbanist text-3xl md:text-5xl font-bold text-chrome-silver leading-tight'>{project.title}</h2>
				<p className='text-xl md:text-2xl text-chrome-silver/80'>
					<span className=''>{project.company}</span> <span className='text-chrome-silver/40'>{' - ' + project.label}</span>
				</p>
			</div>

			<p className='text-xl text-chrome-silver/80 leading-relaxed'>{project.intro}</p>

			<div className='grid grid-cols-3 gap-4'>
				{[0, 1, 2].map((i) => (
					<ProjectImage
						key={i}
						src={project.images.screens[i]}
						alt={`Screenshot of ${project.title}`}
						className={cn(
							'aspect-video rounded-xl border border-chrome-silver/8',
							'bg-linear-to-br from-accent-blue/30 via-accent-cyan/20 to-purple-500/20',
							'opacity-75 hover:opacity-100 transition-opacity transition-duration-300'
						)}
						fallbackClass='text-white/50 text-sm font-semibold'
						fallbackText='Screenshot Unavailable'
					/>
				))}
			</div>

			<div className='space-y-3'>
				<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Challenge</h3>
				<p className='text-chrome-silver/80 leading-relaxed'>{project.challenge}</p>
			</div>

			<div className='space-y-3'>
				<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Solution</h3>
				<p className='text-chrome-silver/80 leading-relaxed'>{project.solution}</p>
			</div>

			<div className='space-y-4'>
				<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>Impact & Results</h3>
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

			{project.link && (
				<a
					href={project.link}
					target='_blank'
					rel='noopener noreferrer'
					className={cn('inline-flex items-center gap-2 px-8 py-4 rounded-full ', [
						'bg-linear-to-br from-accent-blue to-accent-cyan text-white font-semibold',
					])}
				>
					Visit Project →
				</a>
			)}
		</div>
	</GlassSurface>
);
