'use client';

import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { TimelineCard } from './TimelineCard';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import type { Project } from '@/types';
import { InlineList } from '@/components/InlineList';
import { ArrowIndicator } from '@/components/ArrowIndicator';
import { VT } from '@/lib/transitions/components/TransitionSlot';
import { cn } from '@/lib/utils';

type TimelineCollectionPageProps = {
	projects: Project[];
};

export const TimelineCollectionPage = ({ projects }: TimelineCollectionPageProps) => {
	const { navigate } = useTransitionRouter();
	const go = (project: Project) => navigate(`/projects/timeline/${project.slug}`, { scroll: false });

	return (
		<div className='w-full stack-lg'>
			{/* Desktop ─────────────────────────────────────── */}
			<div className='relative ml-8 hidden lg:mr-8 lg:block xl:mr-32'>
				<VT classes='vt-t-list'>
					<TimelineLine className='left-8 xl:left-32' />
					<div className='space-y-12'>
						{projects.map((project) => (
							<div key={project.id} className='relative flex gap-8'>
								<TimelineDateWide period={project.period} className='hidden xl:block' />
								<TimelineDateNarrow period={project.period} className='xl:hidden' />
								<TimelineCard onClick={() => go(project)} className='w-full'>
									<TimelineCardContent project={project} limit={4} />
								</TimelineCard>
							</div>
						))}
					</div>
				</VT>
			</div>

			{/* Mobile ─────────────────────────────────────────────── */}
			<div className='relative lg:hidden'>
				<TimelineLine className='left-1.75' />
				<div className='stack-md'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							<TimelineDateMobile period={project.period} />
							<VT bind name={`project-card-${project.id}`}>
								<TimelineCard onClick={() => go(project)} className='mr-2 p-6'>
									<TimelineCardContent project={project} limit={4} />
								</TimelineCard>
							</VT>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// ─── Local sub-components ────────────────────────────────────────────────────
// Extracted to reduce repetition. Move to separate files if they grow.

const TimelineDateWide = ({ period, className }: { period: string; className?: string }) => (
	<div className={cn('relative', className)}>
		<div className='flex w-32 shrink-0 items-start justify-end pt-8'>
			<span className='pr-4 text-sm font-semibold whitespace-nowrap text-label'>{period}</span>
		</div>
		<TimelineDot active className='absolute top-8 -right-px z-10 translate-x-1/2' />
	</div>
);

const TimelineDateNarrow = ({ period, className }: { period: string; className?: string }) => (
	<div className={cn('relative w-8 self-stretch', className)}>
		<div className='absolute top-1/2 left-2 -translate-y-1/2'>
			<span className='block origin-center -translate-x-1/2 -rotate-90 text-sm font-semibold tracking-wider whitespace-nowrap text-label'>
				{period}
			</span>
		</div>
		<TimelineDot active className='absolute top-8 -right-0.75 z-10 translate-x-1/2' />
	</div>
);

const TimelineDateMobile = ({ period }: { period: string }) => (
	<div className='mb-3 flex items-center gap-3'>
		<TimelineDot active />
		<span className='translate-y-px text-sm font-semibold text-label'>{period}</span>
	</div>
);

const TimelineCardContent = ({ project, limit = 4 }: { project: Project; limit?: number }) => (
	<div className='relative space-y-3 md:space-y-4'>
		<InlineList.Div className='cluster-sm hidden text-sm text-subtle md:flex'>{[project.location, project.role]}</InlineList.Div>
		<h3 className='heading-2 md:heading-1 text-primary'>{project.title}</h3>
		<p className='text-tertiary md:text-lg md:text-secondary'>{project.company}</p>
		<p className='text-sm leading-relaxed text-muted md:text-base'>{project.summary}</p>
		<ProjectTags tags={project.tags} limit={limit} className='pt-2' size='lg' />
		<ArrowIndicator aria-label={`View ${project.title}`} className='absolute right-0 bottom-0 group-hover:translate-x-1' />
	</div>
);
