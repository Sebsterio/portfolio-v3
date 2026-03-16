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
			<div className='relative hidden w-full vt-t-list xl:block'>
				<TimelineLine position='right' />

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex items-start gap-8'>
							{/* Dot and Date */}
							<div className='relative'>
								<div className='flex w-32 shrink-0 items-start justify-end pt-8'>
									<div className='pr-4 text-sm font-semibold whitespace-nowrap'>
										<span className='text-accent-cyan'>{project.period}</span>
									</div>
								</div>
								<TimelineDot active className='absolute top-8 -right-px z-10 translate-x-1/2' />
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								className={cn('flex-1 p-8 text-left hover:translate-x-2')}
							>
								<div className='relative space-y-4'>
									<InlineList.Div className='cluster-sm text-subtle text-sm'>{[project.location, project.role]}</InlineList.Div>

									<h3 className='heading-1 text-primary'>{project.title}</h3>
									<p className='text-secondary text-lg'>{project.company}</p>
									<p className='text-muted leading-relaxed'>{project.summary}</p>

									<ProjectTags tags={project.tags} limit={4} className='pt-2' />
								</div>
							</GlassCard>
						</div>
					))}
				</div>
			</div>

			{/* Desktop Narrow (rotated dates) */}
			<div className='relative hidden w-full vt-t-list md:block xl:hidden'>
				<TimelineLine className='left-8' />

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex gap-8'>
							{/* Dot and Date (Rotated) */}
							<div className='relative w-8 self-stretch'>
								<div className='absolute top-1/2 left-2 -translate-y-1/2'>
									<div className='origin-center -translate-x-1/2 -rotate-90 text-sm font-semibold tracking-wider whitespace-nowrap'>
										<span className='text-accent-cyan'>{project.period}</span>
									</div>
								</div>
								<TimelineDot active className='absolute top-8 right-[-3px] z-10 translate-x-1/2' />
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								className={cn('w-full p-8 text-left hover:translate-x-2')}
							>
								<div className='relative space-y-4'>
									<InlineList.Div className='cluster-sm text-subtle text-sm'>{[project.location, project.role]}</InlineList.Div>

									<h3 className='heading-1 text-primary'>{project.title}</h3>
									<p className='text-secondary text-lg'>{project.company}</p>
									<p className='text-muted leading-relaxed'>{project.summary}</p>

									<ProjectTags tags={project.tags} limit={4} className='pt-2' />
								</div>
							</GlassCard>
						</div>
					))}
				</div>
			</div>

			{/* Mobile */}
			<div className={cn('relative md:hidden')}>
				<TimelineLine position='left' />

				<div className='space-y-6'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							{/* Dot and Date */}
							<div className='mb-3 flex items-center gap-3'>
								<TimelineDot active />
								<div className='translate-y-px text-xs font-semibold'>
									<span className='text-accent-cyan'>{project.period}</span>
								</div>
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								accentPosition='top-right'
								className={cn('w-full p-6 text-left')}
								style={{
									viewTransitionName: `project-card-${project.id}`,
								}}
							>
								<div className='relative space-y-3'>
									<h3 className='heading-2 text-primary'>{project.title}</h3>
									<p className='text-tertiary'>{project.company}</p>
									<p className='text-muted text-sm leading-relaxed'>{project.summary}</p>

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
