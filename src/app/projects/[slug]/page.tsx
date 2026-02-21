'use client';

import { use } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { ViewSwitcher } from '../_components/ViewSwitcher';
import { getProjectBySlug } from '../_content';
import type { ViewMode } from '../types';
import { TimelineProjectPage } from './_components/TimelineProjectPage';
import { CardsProjectPage } from './_components/CardsProjectPage';
import { MagazineProjectPage } from './_components/MagazineProjectPage';

type ProjectPageProps = {
	params: Promise<{ slug: string }>;
};

export default function ProjectPage({ params }: ProjectPageProps) {
	useTransitionReady();
	const { slug } = use(params);
	const searchParams = useSearchParams();
	const view = (searchParams.get('view') as ViewMode) || 'timeline';

	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return (
		<div className='w-full space-y-8'>
			{/* Page Header */}
			<div className='text-center space-y-4'>
				<h1 className='font-urbanist text-4xl md:text-5xl font-bold text-chrome-silver'>{project.title}</h1>
				<p className='text-chrome-silver/70 text-lg'>
					{project.company} · {project.period}
				</p>
				<ViewSwitcher currentView={view} basePath={`/projects/${slug}`} />
			</div>

			{/* View Content */}
			{view === 'timeline' && <TimelineProjectPage project={project} />}
			{view === 'cards' && <CardsProjectPage project={project} />}
			{view === 'magazine' && <MagazineProjectPage project={project} />}
		</div>
	);
}
