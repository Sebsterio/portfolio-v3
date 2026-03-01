'use client';

import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { GlassCard1 as GlassCard } from '@/components/GlassCard';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import type { Project } from '@/types';

type TimelineCollectionPageProps = {
	projects: Project[];
	activeSlug?: string;
};

export const TimelineCollectionPage = ({ projects, activeSlug }: TimelineCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='w-full space-y-8'>
			{/* Desktop Wide (horizontal dates) */}
			<div
				className='vt-main hidden xl:block relative w-full'
				// className={cn(/* 'vt-main', */ 'hidden xl:block relative w-full')} //
			>
				<TimelineLine position='center' className='left-32' />

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex items-start gap-8'>
							{/* Date */}
							<div className='w-32 flex-shrink-0 flex items-start justify-end pt-8'>
								<div className='text-sm font-semibold text-accent-cyan whitespace-nowrap pr-4'>{project.period.replace(' – ', ' - ')}</div>
							</div>

							{/* Dot */}
							<TimelineDot active className='absolute left-[127px] top-8 z-10' />

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								className={cn('flex-1 text-left p-8 hover:translate-x-2')}
								// style={{ viewTransitionName: `project-card-${project.id}` }}
							>
								<div className='relative space-y-4'>
									<div className='flex items-center gap-3 text-sm text-chrome-silver/50'>
										<span>{project.location}</span>
										<span>•</span>
										<span>{project.role}</span>
									</div>

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
			<div
				className='vt-main hidden md:block xl:hidden relative w-full pl-8'
				// className={cn(/* 'vt-main', */ 'hidden md:block xl:hidden relative w-full pl-8')}
			>
				<TimelineLine position='left' />

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex items-start gap-8'>
							{/* Rotated Date */}
							<div className='absolute left-0 top-8'>
								<div
									className='text-sm font-semibold text-accent-cyan whitespace-nowrap origin-top-left -rotate-90'
									style={{ transform: 'rotate(-90deg) translateX(-100%)' }}
								>
									{project.period.replace(' – ', ' - ')}
								</div>
							</div>

							{/* Dot */}
							<TimelineDot active className='absolute left-[7px] top-8 z-10' />

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								className={cn('w-full text-left ml-8 p-8 hover:translate-x-2')}
							>
								<div className='relative space-y-4'>
									<div className='flex items-center gap-3 text-sm text-chrome-silver/50'>
										<span>{project.location}</span>
										<span>•</span>
										<span>{project.role}</span>
									</div>

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
			<div className={cn(/* 'vt-main', */ 'md:hidden relative')}>
				<TimelineLine position='left' />

				<div className='space-y-6'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							{/* Date and Dot */}
							<div className='flex items-center gap-3 mb-3'>
								<TimelineDot active />
								<div className='text-xs font-semibold text-accent-cyan'>{project.period}</div>
							</div>

							{/* Card */}
							<GlassCard
								onClick={() => navigate(`/projects/timeline/${project.slug}`, { scroll: false })}
								withAccent
								accentPosition='top-right'
								className={cn('w-full text-left p-6')}
								style={{ viewTransitionName: `project-card-${project.id}` }}
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
