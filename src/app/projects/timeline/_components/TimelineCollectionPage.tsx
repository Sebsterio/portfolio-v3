'use client';

import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { TimelineCard } from './TimelineCard';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import type { Project } from '@/types';
import { InlineList } from '@/components/InlineList';
import { ArrowIndicator } from '@/components/ArrowIndicator';

type TimelineCollectionPageProps = {
	projects: Project[];
};

export const TimelineCollectionPage = ({ projects }: TimelineCollectionPageProps) => {
	const { navigate } = useTransitionRouter();
	const go = (project: Project) => navigate(`/projects/timeline/${project.slug}`, { scroll: false });

	return (
		<div className='w-full stack-lg'>
			{/* Desktop Wide ─────────────────────────────────────── */}
			<div className='relative mr-32 ml-8 hidden vt-t-list xl:block'>
				<TimelineLine position='right' />
				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex items-start gap-8'>
							<TimelineDateWide period={project.period} />
							<TimelineCard onClick={() => go(project)} className='flex-1'>
								<TimelineCardContent project={project} limit={4} />
							</TimelineCard>
						</div>
					))}
				</div>
			</div>

			{/* Desktop Narrow ────────────────────────────────────── */}
			<div className='relative mr-8 hidden vt-t-list md:block xl:hidden'>
				<TimelineLine className='left-8' />
				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex gap-8'>
							<TimelineDateNarrow period={project.period} />
							<TimelineCard onClick={() => go(project)} className='w-full'>
								<TimelineCardContent project={project} limit={4} />
							</TimelineCard>
						</div>
					))}
				</div>
			</div>

			{/* Mobile ─────────────────────────────────────────────── */}
			<div className='relative md:hidden'>
				<TimelineLine position='left' />
				<div className='stack-md'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							<TimelineDateMobile period={project.period} />
							<TimelineCard onClick={() => go(project)} className='mr-2 p-6' style={{ viewTransitionName: `project-card-${project.id}` }}>
								<TimelineCardContent project={project} limit={4} />
							</TimelineCard>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// ─── Local sub-components ────────────────────────────────────────────────────
// Extracted to reduce repetition. Move to separate files if they grow.

const TimelineDateWide = ({ period }: { period: string }) => (
	<div className='relative'>
		<div className='flex w-32 shrink-0 items-start justify-end pt-8'>
			<span className='pr-4 text-sm font-semibold whitespace-nowrap text-accent-cyan'>{period}</span>
		</div>
		<TimelineDot active className='absolute top-8 -right-px z-10 translate-x-1/2' />
	</div>
);

const TimelineDateNarrow = ({ period }: { period: string }) => (
	<div className='relative w-8 self-stretch'>
		<div className='absolute top-1/2 left-2 -translate-y-1/2'>
			<span className='block origin-center -translate-x-1/2 -rotate-90 text-sm font-semibold tracking-wider whitespace-nowrap text-accent-cyan'>
				{period}
			</span>
		</div>
		<TimelineDot active className='absolute top-8 right-[-3px] z-10 translate-x-1/2' />
	</div>
);

const TimelineDateMobile = ({ period }: { period: string }) => (
	<div className='mb-3 flex items-center gap-3'>
		<TimelineDot active />
		<span className='translate-y-px text-sm font-semibold text-accent-cyan'>{period}</span>
	</div>
);

const TimelineCardContent = ({ project, limit = 4 }: { project: Project; limit?: number }) => (
	<div className='relative space-y-3 md:space-y-4'>
		<InlineList.Div className='cluster-sm hidden text-sm md:flex text-subtle'>{[project.location, project.role]}</InlineList.Div>
		<h3 className='heading-2 text-primary md:heading-1'>{project.title}</h3>
		<p className='text-tertiary md:text-secondary md:text-lg'>{project.company}</p>
		<p className='text-muted text-sm leading-relaxed md:text-base'>{project.summary}</p>
		<ProjectTags tags={project.tags} limit={limit} className='pt-2' size='lg' />
		<ArrowIndicator
			aria-label={`View ${project.title}`}
			className='absolute right-0 bottom-0 group-hover:translate-x-1'
		/>
	</div>
);
