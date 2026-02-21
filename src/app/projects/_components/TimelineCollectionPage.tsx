'use client';

import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import type { Project } from '../_content';

type TimelineCollectionProps = {
	projects: Project[];
};

export const TimelineCollection = ({ projects }: TimelineCollectionProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='relative max-w-5xl mx-auto'>
			{/* Vertical Timeline Line */}
			<div className='absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-blue/20' />

			<div className='space-y-8'>
				{projects.map((project) => (
					<button
						key={project.id}
						onClick={() => navigate(`/projects/${project.slug}?view=timeline`)}
						className={cn(
							'vt-project-card w-full text-left',
							'relative pl-24 pr-8 py-8',
							'rounded-2xl',
							'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
							'border border-chrome-silver/[0.08]',
							'transition-all duration-300',
							'hover:border-accent-blue/30 hover:translate-x-2'
						)}
					>
						{/* Timeline Dot */}
						<div className='absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]' />

						<div className='space-y-4'>
							<div className='flex items-center gap-4'>
								<span className='text-sm text-accent-cyan font-dm-sans'>{project.period}</span>
								<span className='text-sm text-chrome-silver/50'>•</span>
								<span className='text-sm text-chrome-silver/50'>{project.location}</span>
							</div>

							<h3 className='font-urbanist text-3xl font-bold text-chrome-silver'>{project.title}</h3>

							<p className='text-lg text-chrome-silver/80'>{project.company}</p>

							<p className='text-chrome-silver/60 leading-relaxed max-w-3xl'>{project.summary}</p>

							<div className='flex flex-wrap gap-2 pt-2'>
								{project.tags.slice(0, 4).map((tag) => (
									<span
										key={tag}
										className='px-3 py-1.5 rounded-lg text-sm bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};
