'use client';

import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { ViewSwitcher } from '../_components/ViewSwitcher';
import { TimelineProject } from './_components/TimelineProjectPage';
import { CardsProject } from './_components/CardsProjectPage';
import { MagazineProject } from './_components/MagazineProjectPage';
import { getProjectBySlug } from '../_content';
import type { ViewMode } from '../types';

type ProjectPageProps = {
	params: { slug: string };
};

export default function ProjectPage({ params }: ProjectPageProps) {
	useTransitionReady();
	const searchParams = useSearchParams();
	const view = (searchParams.get('view') as ViewMode) || 'timeline';

	const project = getProjectBySlug(params.slug);

	if (!project) {
		notFound();
	}

	return (
		<div className='w-full space-y-8'>
			<ViewSwitcher currentView={view} basePath={`/projects/${params.slug}`} />

			{view === 'timeline' && <TimelineProject project={project} />}
			{view === 'cards' && <CardsProject project={project} />}
			{view === 'magazine' && <MagazineProject project={project} />}
		</div>
	);
}
