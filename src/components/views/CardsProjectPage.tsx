'use client';

import type { Project, ProjectNavItem } from '@/types';
import { PAGE_ANCHOR_ID } from '@/config/constants';
import { getCardsProjectHref } from '@/lib/navigation';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { FlipCard } from '@/components/motion/FlipCard';
import { BackLink } from '@/components/primitives/BackLink';
import { ProjectsPagination } from '@/components/primitives/ProjectsPagination';
import { ProjectSummary } from '@/components/composites/ProjectSummary';
import { ProjectCaseStudy } from '@/components/composites/ProjectCaseStudy';
import { PrevLinkButton, NextLinkButton } from '@/components/primitives/DirectionButtonLink';
import { CardsProjectPageLayout as Layout } from '@/components/layout/CardsProjectPageLayout';

type CardsProjectPageProps = {
	project: Project;
	navItems: ProjectNavItem[];
	prev: ProjectNavItem['prev'];
	next: ProjectNavItem['next'];
};

export const CardsProjectPage = ({ project, navItems, prev, next }: CardsProjectPageProps) => {
	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='container-md w-full'>
				<BackLink href='/projects/cards' scroll={false}>
					All Projects
				</BackLink>
				<div id={PAGE_ANCHOR_ID} />
			</div>

			<Layout className='content-container'>
				<Layout.Card>
					<VT.Div name={`c-project-${prev.id}`} classes='c-active' className='card-dummy -left-1/4' />
					<VT.Div name={`c-project-${next.id}`} classes='c-active' className='card-dummy -right-1/4' />
					<VT.Area name={`c-project-${project.id}`} classes='c-active'>
						<FlipCard
							className='relative z-50 mx-auto w-full max-w-4xl'
							front={<ProjectSummary project={project} />}
							back={<ProjectCaseStudy project={project} />}
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
								scrollTo={PAGE_ANCHOR_ID}
								aria-label={`Go to project ${slug}`}
							/>
						)}
					</ProjectsPagination>
				</Layout.Pagination>
			</Layout>
		</div>
	);
};
