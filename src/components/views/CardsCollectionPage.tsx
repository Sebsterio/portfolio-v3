'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { ProjectCard } from '@/components/composites/ProjectCard';
import { PROJECT_PAGE_TITLE_ID } from '@/app/projects/_config';

// ----------------------------------------------------------------------------

type CardsCollectionPageProps = {
	projects: Project[];
};

export const CardsCollectionPage = ({ projects }: CardsCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

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
									: () => navigate(`/projects/cards/${project.slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID })
							}
						/>
					</VT.Onto>
				))}
			</div>
		</div>
	);
};
