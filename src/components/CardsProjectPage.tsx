'use client';

import { CSSProperties, PropsWithChildren, useMemo, useState } from 'react';
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

// ----------------------------------------------------------------------------

type ProjectCardProps = PropsWithChildren & {
	className?: string;
	style?: CSSProperties;
};

function ProjectCard({ className, children, ...props }: ProjectCardProps) {
	return (
		<Panel className={cn('glass-surface-2 glass-radius-2 padding-panel glass-elevation-1', className)} {...props}>
			{children}
		</Panel>
	);
}

function ProjectCardFrontLayout({ ...project }: Project) {
	return (
		<div className='space-y-6 pb-2 md:space-y-8'>
			<div className='space-y-3 md:space-y-4'>
				<InlineList.Div className='cluster-md text-sm text-label'>{[project.period, project.location]}</InlineList.Div>
				<h2 className='font-urbanist text-3xl leading-tight font-bold text-primary md:text-5xl'>{project.title}</h2>
				<p className='text-xl text-secondary md:text-2xl'>
					<span>{project.company}</span>
					<span className='text-muted'>{' - ' + project.label}</span>
				</p>
			</div>
			<ProjectImage src={project.images.main} alt={`Screenshot of ${project.title}`} className='h-64 rounded-2xl md:h-80' />
			<p className='text-base leading-relaxed text-tertiary md:text-xl'>{project.summary}</p>
			<ProjectTags size='lg' tags={project.tags} />
			<p className='animate-pulse text-sm text-accent select-none'>Flip card →</p>
		</div>
	);
}

function ProjectCardSection({ title, children }: { title: string } & PropsWithChildren) {
	return (
		<div>
			<h4 className='mb-2 font-urbanist text-lg font-bold text-label md:text-xl'>{title}</h4>
			{children}
		</div>
	);
}
function ProjectCardText({ children }: PropsWithChildren) {
	return <p className='text-sm leading-relaxed text-secondary md:text-base'>{children}</p>;
}

function ProjectCardBackLayout({ ...project }: Project) {
	return (
		<div className='space-y-6 pb-2 md:space-y-8'>
			<h3 className='font-urbanist text-2xl font-bold text-accent md:text-3xl'>Case Study</h3>
			<ProjectCardSection title='The Challenge'>
				<ProjectCardText>{project.challenge}</ProjectCardText>
			</ProjectCardSection>
			<ProjectCardSection title='The Solution'>
				<ProjectCardText>{project.solution}</ProjectCardText>
			</ProjectCardSection>
			<ProjectCardSection title='Impact'>
				<ImpactList items={project.impact} />
			</ProjectCardSection>
			{project.link && <ExternalLinkButton size='sm' href={project.link} label='Visit Project →' />}
		</div>
	);
}

// ----------------------------------------------------------------------------

// TODO: mv to server
function getProjectNeighbors(project: Project, allProjects: Project[]) {
	const currentIndex = allProjects.findIndex((item) => item.id === project.id);
	const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
	const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

	return { currentIndex, prev: prevProject, next: nextProject };
}

type CardsProjectPageProps = { project: Project; allProjects: Project[] };
type NavigationTarget = { slug: string; options?: { scroll?: false; scrollTo?: string } };

export const CardsProjectPage = ({ project, allProjects }: CardsProjectPageProps) => {
	const { navigate } = useTransitionRouter();

	const [flipped, setFlipped] = useState(false);

	const { currentIndex, prev, next } = useMemo(() => getProjectNeighbors(project, allProjects), [project, allProjects]);

	const navigateToProject = ({ slug, options }: NavigationTarget) => {
		setFlipped(false);
		navigate(`/projects/cards/${slug}`, options);
	};

	return (
		<div className='flex w-full flex-col gap-8'>
			<div className='mx-auto w-full max-w-4xl'>
				<BackLink href='/projects/cards' scroll={false}>
					All Projects
				</BackLink>
			</div>

			<div className='grid w-full max-w-350 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-10'>
				{/*  */}

				<div className='col-span-3 row-start-1 lg:col-span-1 lg:col-start-2'>
					<div className='relative z-50 mx-auto w-full max-w-4xl overflow-x-clip perspective-[2000px]'>
						<VT.Div name={`c-project-${prev.id}`} classes='c-active' className='card-dummy -left-1/4' />
						<VT.Div name={`c-project-${next.id}`} classes='c-active' className='card-dummy -right-1/4' />
						<VT.Area name={`c-project-${project.id}`} classes='c-active'>
							<div className='w-full cursor-pointer' onClick={() => setFlipped((value) => !value)}>
								<div
									className={cn('grid transition-transform duration-600 transform-3d', [
										[flipped && 'rotate-y-180', '*:col-start-1 *:row-start-1 *:transition-opacity *:duration-300 *:backface-hidden'],
									])}
								>
									<div className={cn(flipped ? 'pointer-events-none opacity-0' : 'opacity-100')}>
										<ProjectCard>
											<ProjectCardFrontLayout {...project} />
										</ProjectCard>
									</div>
									<div className={cn(flipped ? 'opacity-100' : 'pointer-events-none opacity-0', 'rotate-y-180')}>
										<ProjectCard>
											<ProjectCardBackLayout {...project} />
										</ProjectCard>
									</div>
								</div>
							</div>
						</VT.Area>
					</div>
				</div>

				<div className='col-start-1 row-start-2 justify-self-start lg:row-start-1 lg:self-center'>
					<PrevButton onClick={() => navigateToProject({ slug: prev.slug, options: { scroll: false } })} />
				</div>

				<div className='col-start-2 row-start-2 justify-self-center lg:col-start-2'>
					<ProjectsNav
						projects={allProjects}
						currentIndex={currentIndex}
						onNavigate={(slug) => navigateToProject({ slug, options: { scrollTo: PROJECT_PAGE_TITLE_ID } })}
					/>
				</div>

				<div className='col-start-3 row-start-2 justify-self-end lg:row-start-1 lg:self-center'>
					<NextButton onClick={() => navigateToProject({ slug: next.slug, options: { scroll: false } })} />
				</div>
			</div>
		</div>
	);
};
