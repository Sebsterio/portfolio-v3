'use client';

import { use } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { DisplayModeSwitcher } from '../_components/DisplayModeSwitcher';
import { projects } from '../_content';
import type { DisplayMode } from '../../../types';
import { TimelineProjectPage } from './_components/TimelineProjectPage';
import { CardsProjectPage } from './_components/CardsProjectPage';
import { UnderConstructionPage } from '@/components/pages/UnderConstructionPage';
// import { MagazineProjectPage } from './_components/MagazineProjectPage';
import { BackLink } from '@/components/BackLink';

const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

type ProjectPageProps = {
	params: Promise<{ slug: string }>;
};

export default function ProjectPage({ params }: ProjectPageProps) {
	useTransitionReady();
	const { slug } = use(params);
	const searchParams = useSearchParams();
	const view = (searchParams.get('view') as DisplayMode) || 'timeline';

	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}
	if (view === 'magazine') {
		return (
			<div className='w-full space-y-16'>
				<div className='text-center'>
					<DisplayModeSwitcher currentMode={view} basePath={`/projects/${slug}`} />
				</div>
				<div className='space-y-4'>
					<BackLink href='/projects?view=magazine'>All Projects</BackLink>
					<UnderConstructionPage />;
				</div>
			</div>
		);
	}
	return (
		<div className='w-full flex flex-col gap-6'>
			{/* Page Header */}
			<div className='text-center space-y-4'>
				<h1 className='font-urbanist text-4xl md:text-5xl font-bold text-chrome-silver'>{project.title}</h1>
				<p className='text-chrome-silver/70 text-lg'>
					{project.company} · {project.period}
				</p>
				<DisplayModeSwitcher currentMode={view} basePath={`/projects/${slug}`} />
			</div>

			{/* View Content */}
			{view === 'timeline' && <TimelineProjectPage project={project} />}
			{view === 'cards' && <CardsProjectPage project={project} />}
			{/* {view === 'magazine' && <MagazineProjectPage project={project} />} */}
		</div>
	);
}
