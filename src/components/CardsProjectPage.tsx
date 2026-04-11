'use client';

import { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { VT } from '@/lib/transitions/components/ViewTransition';
import { Panel } from '@/components/ui/Panel';
import { BackLink } from '@/components/BackLink';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { InlineList } from '@/components/InlineList';
import { ImpactList } from '@/components/ImpactList';
import { ExternalLinkButton } from '@/components/Button';
import { ProjectsNav } from '@/components/ProjectsNav';
import { PrevButton, NextButton } from '@/components/NavigationButton';
import { PROJECT_PAGE_TITLE_ID } from '@/app/projects/_config';
import { FlipCard } from './FlipCard';
import { cn } from '@/lib/utils';
import { ProjectNavItem } from '@/types';

// ----------------------------------------------------------------------------

function ProjectCardSummary({ project, className }: { project: Project; className?: string }) {
	return (
		<Panel className={className}>
			<div className='stack-md pb-2 md:stack-lg'>
				<div className='stack-xs'>
					<InlineList.Div className='ui-label cluster-md tracking-normal text-label normal-case'>
						{[project.period, project.location]}
					</InlineList.Div>
					<h2 className='display-2 leading-tight text-primary'>{project.title}</h2>
					<p className='body-lg text-secondary'>
						<span>{project.company}</span>
						<span className='text-muted'>{` - ${project.label}`}</span>
					</p>
				</div>

				<ProjectImage src={project.images.main} alt={`Screenshot of ${project.title}`} className='h-64 rounded-2xl md:h-80' />

				<p className='body-sm md:body-md text-tertiary'>{project.summary}</p>

				<ProjectTags size='lg' tags={project.tags} />

				<p className='ui-label animate-pulse tracking-normal text-accent normal-case select-none'>Flip card →</p>
			</div>
		</Panel>
	);
}

function ProjectCardCaseStudy({ project, className }: { project: Project; className?: string }) {
	return (
		<Panel className={className}>
			<div className='stack-md pb-2 md:stack-lg'>
				<h2 className='heading-2 text-accent'>Case Study</h2>

				<section className='stack-xs'>
					<h3 className='heading-3 text-label'>The Challenge</h3>
					<p className='body-xs md:body-sm text-secondary'>{project.challenge}</p>
				</section>

				<section className='stack-xs'>
					<h3 className='heading-3 text-label'>The Solution</h3>
					<p className='body-xs md:body-sm text-secondary'>{project.solution}</p>
				</section>

				<section className='stack-xs'>
					<h3 className='heading-3 text-label'>Impact</h3>
					<ImpactList items={project.impact} />
				</section>

				{project.link && <ExternalLinkButton size='sm' href={project.link} label='Visit Project →' />}
			</div>
		</Panel>
	);
}

// ----------------------------------------------------------------------------

const CARD_CLASSES = cn('glass-surface-2 glass-radius-2 padding-panel glass-elevation-1');

type CardsProjectPageProps = {
	project: Project;
	navItems: ProjectNavItem[];
	prev: ProjectNavItem['prev'];
	next: ProjectNavItem['next'];
};

export const CardsProjectPage = ({ project, navItems, prev, next }: CardsProjectPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='container-md w-full'>
				<BackLink href='/projects/cards' scroll={false}>
					All Projects
				</BackLink>
			</div>

			<div className='content-container grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-10'>
				<div className='col-span-3 row-start-1 lg:col-span-1 lg:col-start-2'>
					<VT.Div name={`c-project-${prev.id}`} classes='c-active' className='card-dummy -left-1/4' />
					<VT.Div name={`c-project-${next.id}`} classes='c-active' className='card-dummy -right-1/4' />
					<VT.Area name={`c-project-${project.id}`} classes='c-active'>
						<FlipCard className='relative z-50 mx-auto w-full max-w-4xl'>
							<ProjectCardSummary project={project} className={CARD_CLASSES} />
							<ProjectCardCaseStudy project={project} className={CARD_CLASSES} />
						</FlipCard>
					</VT.Area>
				</div>

				<div className='col-start-1 row-start-2 justify-self-start lg:row-start-1 lg:self-center'>
					<PrevButton onClick={() => navigate(`/projects/cards/${prev.slug}`, { scroll: false })} />
				</div>

				<div className='col-start-2 row-start-2 justify-self-center'>
					<ProjectsNav
						projects={navItems}
						currentId={project.id}
						onNavigate={(slug) => navigate(`/projects/cards/${slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID })}
					/>
				</div>

				<div className='col-start-3 row-start-2 justify-self-end lg:row-start-1 lg:self-center'>
					<NextButton onClick={() => navigate(`/projects/cards/${next.slug}`, { scroll: false })} />
				</div>
			</div>
		</div>
	);
};
