'use client';

import type { Project } from '@/types';
import { getTimelineProjectHref } from '@/lib/navigation';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { BackLink } from '@/components/primitives/BackLink';
import { TimelineLine } from '@/components/primitives/TimelineLine';
import { TimelineDate } from '@/components/composites/TimelineDate';
import { TimelineProjectPanel } from '@/components/composites/TimelineProjectPanel';
import { TimelineProjectLink } from '@/components/composites/TimelineProjectLink';
import { TimelineProjectCard } from '@/components/composites/TimelineProjectCard';

type TimelineProjectPageProps = {
	project: Project;
	allProjects: Project[];
};

export const TimelineProjectPage = ({ project, allProjects: projects }: TimelineProjectPageProps) => {
	return (
		<>
			<BackLink href='/projects/timeline' scroll={false} className='mb-8'>
				All Projects
			</BackLink>

			{/* Desktop ─────────────────────────────────────────── */}
			<div className='hidden w-full gap-8 lg:grid lg:grid-cols-[320px_1fr]'>
				<aside className='relative self-start'>
					<VT.Area name='t-list'>
						<TimelineLine className='left-4' />
						<div className='space-y-3'>
							{projects.map((p) => (
								<TimelineProjectLink
									key={p.id}
									active={project.id === p.id}
									href={getTimelineProjectHref(p.slug)}
									scroll={false}
									project={p}
								/>
							))}
						</div>
					</VT.Area>
				</aside>
				<main>
					<VT.Area slot='vt-right'>
						<TimelineProjectPanel project={project} />
					</VT.Area>
				</main>
			</div>

			{/* Mobile ──────────────────────────────────────────── */}
			<div className='relative lg:hidden'>
				<TimelineLine className='left-1.75' />
				<div className='space-y-3'>
					{projects.map((p) => (
						<div key={p.id}>
							{p.id === project.id ? (
								// Expanded
								<div className='space-y-4'>
									<TimelineDate.Mobile period={p.period} />
									<VT.Onto name={`t-project-${p.id}`} classes='t-project t-active'>
										<TimelineProjectCard project={p} />
									</VT.Onto>
								</div>
							) : (
								// Collapsed
								<VT.Onto name={`t-project-${p.id}`} classes='t-project'>
									<TimelineProjectLink
										className='-ml-2.5'
										active={false}
										href={getTimelineProjectHref(p.slug)}
										scroll={false}
										project={p}
									/>
								</VT.Onto>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};
