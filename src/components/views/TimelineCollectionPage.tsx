'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { TimelineLine } from '@/components/primitives/TimelineLine';
import { TimelineDate } from '@/components/composites/TimelineDate';
import { TimelineCard } from '@/components/composites/TimelineCard';

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
				<VT.Area name='t-list'>
					<TimelineLine className='left-8 xl:left-32' />
					<div className='space-y-12'>
						{projects.map((project) => (
							<div key={project.id} className='relative flex gap-8'>
								<TimelineDate.Wide period={project.period} className='hidden xl:block' />
								<TimelineDate.Narrow period={project.period} className='xl:hidden' />
								<TimelineCard className='w-full' limit={4} onClick={() => go(project)} project={project} />
							</div>
						))}
					</div>
				</VT.Area>
			</div>

			{/* Mobile ─────────────────────────────────────────────── */}

			<div className='relative lg:hidden'>
				<TimelineLine className='left-1.75' />
				<div className='stack-md'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							<TimelineDate.Mobile period={project.period} className='mb-3' />
							<VT.Onto name={`t-project-${project.id}`} classes='t-project'>
								<TimelineCard className='mr-2 p-6' limit={4} onClick={() => go(project)} project={project} />
							</VT.Onto>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
