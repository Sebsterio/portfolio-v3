'use client';

import type { Project } from '@/types';
import { PAGE_ANCHOR_ID } from '@/config/constants';
import { getCardsProjectHref } from '@/lib/navigation';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { ProjectCard } from '@/components/composites/ProjectCard';

// ----------------------------------------------------------------------------

type CardsCollectionPageProps = {
	projects: Project[];
};

export const CardsCollectionPage = ({ projects }: CardsCollectionPageProps) => {
	const { navigate, prefetch } = useTransitionRouter();

	return (
		<div className='w-full stack-lg'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{projects.map((project) => (
					<VT.Onto name={`c-project-${project.id}`} classes='c-project' key={project.id}>
						<ProjectCard
							project={project}
							onClick={
								project.brief
									? () => project.link && window.open(project.link, '_blank')
									: () => navigate(getCardsProjectHref(project.slug), { scrollTo: PAGE_ANCHOR_ID })
							}
							{...(!project.brief && { onHover: () => prefetch(getCardsProjectHref(project.slug)) })}
						/>
					</VT.Onto>
				))}
			</div>
		</div>
	);
};
