'use client';

import { useState } from 'react';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { BackLink } from '@/components/BackLink';
import { UnderConstructionPage } from '@/components/pages/UnderConstructionPage';
import type { DisplayMode, Project } from '@/types';
import { CardsProjectPage } from '../[slug]/_components/CardsProjectPage';
import { TimelineProjectPage } from '../[slug]/_components/TimelineProjectPage';
import { DisplayModeSwitcher } from './DisplayModeSwitcher';
import { PROJECT_PAGE_TITLE_ID } from '../[slug]/_config';

type ProjectClientProps = {
	initialView: DisplayMode;
	project: Project;
	slug: string;
};

export function ProjectPageClient({ initialView, project, slug }: ProjectClientProps) {
	useTransitionReady();
	const [view, setView] = useState<DisplayMode>(initialView);

	const handleViewChange = (newView: DisplayMode) => {
		const url = new URL(window.location.href);
		url.searchParams.set('view', newView);
		window.history.replaceState({}, '', url);

		if (document.startViewTransition) {
			document.startViewTransition(() => {
				setView(newView);
			});
		} else {
			setView(newView);
		}
	};

	if (view === 'magazine') {
		return (
			<div className='w-full space-y-16'>
				<div className='text-center'>
					<DisplayModeSwitcher currentMode={view} basePath={`/projects/${slug}`} onViewChange={handleViewChange} />
				</div>
				<div className='space-y-4'>
					<BackLink href='/projects?view=magazine'>All Projects</BackLink>
					<UnderConstructionPage />
				</div>
			</div>
		);
	}
	return (
		<div className='w-full flex flex-col gap-6'>
			<div className='text-center space-y-4'>
				<h1 id={PROJECT_PAGE_TITLE_ID} className='font-urbanist text-4xl md:text-5xl font-bold text-chrome-silver'>
					{project.title}
				</h1>
				<p className='text-chrome-silver/70 text-lg'>
					{project.company} · {project.period}
				</p>
				<DisplayModeSwitcher currentMode={view} basePath={`/projects/${slug}`} onViewChange={handleViewChange} />
			</div>

			{view === 'timeline' && <TimelineProjectPage project={project} />}
			{view === 'cards' && <CardsProjectPage project={project} />}
		</div>
	);
}
