'use client';

import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { GlassCard1 as GlassCard } from '@/components/GlassCard';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import type { Project } from '@/types';
import { InlineList } from '@/components/InlineList';

type TimelineCollectionPageProps = {
	projects: Project[];
};

export const TimelineCollectionPage = ({ projects }: TimelineCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='w-full space-y-8'>
			{/* Desktop Wide (horizontal dates) */}
			<div className='vt-t-list hidden xl:block relative w-full'>
				<TimelineLine position='right' />

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex items-start gap-8'>
							{/* Dot and Date */}
							<div className='relative'>
								<div className='w-32 shrink-0 flex items-start justify-end pt-8'>
									<div className='text-sm font-semibold whitespace-nowrap pr-4'>
										<span className='text-accent-cyan'>{project.period}</span>
									</div>
								</div>
								<TimelineDot active className='z-10 absolute top-8 -right-px translate-x-1/2' />
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								className={cn('flex-1 text-left p-8 hover:translate-x-2')}
							>
								<div className='relative space-y-4'>
									<InlineList.Div className='flex items-center gap-3 text-sm text-chrome-silver/50'>
										{[project.location, project.role]}
									</InlineList.Div>

									<h3 className='font-urbanist text-3xl font-bold text-chrome-silver'>{project.title}</h3>
									<p className='text-lg text-chrome-silver/80'>{project.company}</p>
									<p className='text-chrome-silver/60 leading-relaxed'>{project.summary}</p>

									<ProjectTags tags={project.tags} limit={4} className='pt-2' />
								</div>
							</GlassCard>
						</div>
					))}
				</div>
			</div>

			{/* Desktop Narrow (rotated dates) */}
			<div className='vt-t-list hidden md:block xl:hidden relative w-full'>
				<TimelineLine className='left-8' />

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex gap-8'>
							{/* Dot and Date (Rotated) */}
							<div className='relative w-8 self-stretch'>
								<div className='absolute left-2 top-1/2 -translate-y-1/2'>
									<div className='origin-center -translate-x-1/2 -rotate-90 text-sm font-semibold tracking-wider whitespace-nowrap'>
										<span className='text-accent-cyan'>{project.period}</span>
									</div>
								</div>
								<TimelineDot active className='z-10 absolute top-8 right-[-3px] translate-x-1/2' />
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								className={cn('w-full text-left p-8 hover:translate-x-2')}
							>
								<div className='relative space-y-4'>
									<InlineList.Div className='flex items-center gap-3 text-sm text-chrome-silver/50'>
										{[project.location, project.role]}
									</InlineList.Div>

									<h3 className='font-urbanist text-3xl font-bold text-chrome-silver'>{project.title}</h3>
									<p className='text-lg text-chrome-silver/80'>{project.company}</p>
									<p className='text-chrome-silver/60 leading-relaxed'>{project.summary}</p>

									<ProjectTags tags={project.tags} limit={4} className='pt-2' />
								</div>
							</GlassCard>
						</div>
					))}
				</div>
			</div>

			{/* Mobile */}
			<div className={cn('md:hidden relative')}>
				<TimelineLine position='left' />

				<div className='space-y-6'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							{/* Dot and Date */}
							<div className='flex items-center gap-3 mb-3'>
								<TimelineDot active />
								<div className='text-xs font-semibold translate-y-px'>
									<span className='text-accent-cyan'>{project.period}</span>
								</div>
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								accentPosition='top-right'
								className={cn('w-full text-left p-6')}
								style={{
									viewTransitionName: `project-card-${project.id}`,
								}}
							>
								<div className='relative space-y-3'>
									<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>{project.title}</h3>
									<p className='text-chrome-silver/70'>{project.company}</p>
									<p className='text-sm text-chrome-silver/60 leading-relaxed'>{project.summary}</p>

									<ProjectTags tags={project.tags} limit={3} size='sm' />
								</div>
							</GlassCard>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
