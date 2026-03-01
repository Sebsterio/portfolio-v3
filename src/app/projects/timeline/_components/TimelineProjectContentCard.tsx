import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { ProjectTags } from '@/components/ProjectTags';
import { GlassCard1 as GlassCard } from '@/components/GlassCard';

export const ProjectContentCard = ({ project, className }: { project: Project; className?: string }) => (
	<GlassCard className={cn('p-8 md:p-12 space-y-8', className)}>
		{/* Decorative gradients */}
		<div className='gradient-accent-tr' />
		<div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-cyan/10 to-transparent rounded-2xl' />

		<div className='relative space-y-8'>
			<div className='space-y-4'>
				<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider'>
					{project.company} · {project.role}
				</div>
				<p className='text-lg text-chrome-silver/70'>
					{project.period} · {project.location}
				</p>
				<p className='text-xl text-chrome-silver/80 leading-relaxed'>{project.intro}</p>
			</div>

			{/* Screenshots Placeholder */}
			<div className='grid grid-cols-3 gap-4'>
				{[1, 2, 3].map((i) => (
					<div key={i} className='aspect-video rounded-xl glass-card flex items-center justify-center text-chrome-silver/30 text-sm'>
						Screenshot {i}
					</div>
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
					className={cn(
						'inline-flex items-center gap-2 px-8 py-4 rounded-full',
						'bg-gradient-to-br from-accent-blue to-accent-cyan',
						'text-white font-semibold',
						'hover:scale-105 transition-transform duration-300'
					)}
				>
					Visit Project →
				</a>
			)}
		</div>
	</GlassCard>
);
