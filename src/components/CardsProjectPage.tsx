'use client';
import { CSSProperties, PropsWithChildren } from 'react';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
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
import { PROJECT_PAGE_TITLE_ID } from '../app/projects/_config';
import { FlipCard } from './FlipCard';

// ----------------------------------------------------------------------------

type ProjectCardProps = PropsWithChildren<{
	className?: string;
	style?: CSSProperties;
}>;

function ProjectCard({ className, children, ...props }: ProjectCardProps) {
	return (
		<Panel className={cn('glass-surface-2 glass-radius-2 padding-panel glass-elevation-1', className)} {...props}>
			{children}
		</Panel>
	);
}

function ProjectCardSection({ title, children }: PropsWithChildren<{ title: string }>) {
	return (
		<section className='stack-xs'>
			<h3 className='heading-3 text-label'>{title}</h3>
			{children}
		</section>
	);
}

function ProjectCardSummary({ project }: { project: Project }) {
	return (
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
	);
}

function ProjectCardCaseStudy({ project }: { project: Project }) {
	return (
		<div className='stack-md pb-2 md:stack-lg'>
			<h2 className='heading-2 text-accent'>Case Study</h2>

			<ProjectCardSection title='The Challenge'>
				<p className='body-xs md:body-sm text-secondary'>{project.challenge}</p>
			</ProjectCardSection>

			<ProjectCardSection title='The Solution'>
				<p className='body-xs md:body-sm text-secondary'>{project.solution}</p>
			</ProjectCardSection>

			<ProjectCardSection title='Impact'>
				<ImpactList items={project.impact} />
			</ProjectCardSection>

			{project.link && <ExternalLinkButton size='sm' href={project.link} label='Visit Project →' />}
		</div>
	);
}

// ----------------------------------------------------------------------------

type CardsProjectPageLayoutProps = PropsWithChildren<{
	allProjects: Project[];
	currentIndex: number;
	onNavigatePrev: () => void;
	onNavigateNext: () => void;
	onNavigateProject: (slug: string) => void;
}>;

function CardsProjectPageLayout({
	allProjects,
	currentIndex,
	onNavigatePrev,
	onNavigateNext,
	onNavigateProject,
	children,
}: CardsProjectPageLayoutProps) {
	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='container-md w-full'>
				<BackLink href='/projects/cards' scroll={false}>
					All Projects
				</BackLink>
			</div>

			<div className='content-container grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-10'>
				<div className='col-span-3 row-start-1 lg:col-span-1 lg:col-start-2'>{children}</div>

				<div className='col-start-1 row-start-2 justify-self-start lg:row-start-1 lg:self-center'>
					<PrevButton onClick={onNavigatePrev} />
				</div>

				<div className='col-start-2 row-start-2 justify-self-center'>
					<ProjectsNav projects={allProjects} currentIndex={currentIndex} onNavigate={onNavigateProject} />
				</div>

				<div className='col-start-3 row-start-2 justify-self-end lg:row-start-1 lg:self-center'>
					<NextButton onClick={onNavigateNext} />
				</div>
			</div>
		</div>
	);
}

type CardsProjectPageProps = {
	project: Project;
	allProjects: Project[];
};

// TODO: move to src/app/projects/_lib.ts
function getProjectNeighbors(project: Project, allProjects: Project[]) {
	const currentIndex = allProjects.findIndex((item) => item.id === project.id);
	const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
	const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

	return { currentIndex, prev: prevProject, next: nextProject };
}

export const CardsProjectPage = ({ project, allProjects }: CardsProjectPageProps) => {
	const { navigate } = useTransitionRouter();

	const { currentIndex, prev, next } = getProjectNeighbors(project, allProjects);

	return (
		<CardsProjectPageLayout
			allProjects={allProjects}
			currentIndex={currentIndex}
			onNavigatePrev={() => navigate(`/projects/cards/${prev.slug}`, { scroll: false })}
			onNavigateNext={() => navigate(`/projects/cards/${next.slug}`, { scroll: false })}
			onNavigateProject={(slug) => navigate(`/projects/cards/${slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID })}
		>
			<div className='relative z-50 mx-auto w-full max-w-4xl overflow-x-clip perspective-[2000px]'>
				<VT.Div name={`c-project-${prev.id}`} classes='c-active' className='card-dummy -left-1/4' />
				<VT.Div name={`c-project-${next.id}`} classes='c-active' className='card-dummy -right-1/4' />

				<VT.Area name={`c-project-${project.id}`} classes='c-active'>
					<FlipCard>
						<ProjectCard>
							<ProjectCardSummary project={project} />
						</ProjectCard>

						<ProjectCard>
							<ProjectCardCaseStudy project={project} />
						</ProjectCard>
					</FlipCard>
				</VT.Area>
			</div>
		</CardsProjectPageLayout>
	);
};
