'use client';

import type { Project, ProjectNavItem } from '@/types';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { Panel } from '@/components/primitives/Panel';
import { FlipCard } from '@/components/motion/FlipCard';
import { BackLink } from '@/components/primitives/BackLink';
import { ProjectsPagination } from '@/components/primitives/ProjectsPagination';
import { ProjectSummaryContent } from '@/components/content/ProjectSummaryContent';
import { ProjectCaseStudyContent } from '@/components/content/ProjectCaseStudyContent';
import { PrevLinkButton, NextLinkButton } from '@/components/primitives/DirectionButtonLink';
import { CardsProjectPageLayout as Layout } from '@/components/layout/CardsProjectPageLayout';
import { PROJECT_PAGE_TITLE_ID, getCardsProjectHref } from '@/app/projects/_config';
import { PropsWithChildren } from 'react';

type CardsProjectPageProps = {
	project: Project;
	navItems: ProjectNavItem[];
	prev: ProjectNavItem['prev'];
	next: ProjectNavItem['next'];
};

const CardsProjectPanel = (props: PropsWithChildren) => (
	<Panel className='glass-surface-2 glass-radius-2 padding-panel glass-elevation-1' {...props} />
);

export const CardsProjectPage = ({ project, navItems, prev, next }: CardsProjectPageProps) => {
	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='container-md w-full'>
				<BackLink href='/projects/cards' scroll={false}>
					All Projects
				</BackLink>
			</div>

			<Layout className='content-container'>
				<Layout.Card>
					<VT.Div name={`c-project-${prev.id}`} classes='c-active' className='card-dummy -left-1/4' />
					<VT.Div name={`c-project-${next.id}`} classes='c-active' className='card-dummy -right-1/4' />
					<VT.Area name={`c-project-${project.id}`} classes='c-active'>
						<FlipCard
							className='relative z-50 mx-auto w-full max-w-4xl'
							front={<CardsProjectPanel> <ProjectSummaryContent project={project} /> </CardsProjectPanel>} // prettier-ignore
							back={<CardsProjectPanel> <ProjectCaseStudyContent project={project} /> </CardsProjectPanel>} // prettier-ignore
						/>
					</VT.Area>
				</Layout.Card>

				<Layout.Prev>
					<PrevLinkButton href={getCardsProjectHref(prev.slug)} scroll={false} />
				</Layout.Prev>

				<Layout.Next>
					<NextLinkButton href={getCardsProjectHref(next.slug)} scroll={false} />
				</Layout.Next>

				<Layout.Pagination>
					<ProjectsPagination projects={navItems}>
						{({ id, slug }) => (
							<ProjectsPagination.Link
								key={id}
								href={getCardsProjectHref(slug)}
								current={id === project.id}
								scrollTo={PROJECT_PAGE_TITLE_ID}
								aria-label={`Go to project ${slug}`}
							/>
						)}
					</ProjectsPagination>
				</Layout.Pagination>
			</Layout>
		</div>
	);
};
