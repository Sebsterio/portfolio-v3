'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { cn } from '@/lib/utils';
import { ProjectTags } from '@/components/ProjectTags';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';
import { ProjectImage } from '@/components/ProjectImage';
import { CardContainer } from '@/components/ui/CardContainer';

// ----------------------------------------------------------------------------

type CardsCollectionPageProps = {
	projects: Project[];
};

export const CardsCollectionPage = ({ projects }: CardsCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='w-full space-y-8'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{projects.map((project) => (
					<div key={project.id} style={{ viewTransitionName: `project-card-${project.id}` }}>
						<ProjectCard
							project={project}
							onClick={() => navigate(`/projects/cards/${project.slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID })}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

// ----------------------------------------------------------------------------

type ProjectCardProps = {
	project: Project;
	style?: React.CSSProperties;
	onClick: () => void;
};

const ProjectCard = ({ project, style, onClick }: ProjectCardProps) => {
	return (
		<CardContainer
			variant='lifted'
			className={cn('glass-surface-2 glass-elevation-1 glass-radius-3 group h-105 p-8')}
			{...{ style, onClick }}
		>
			<div className='relative flex h-full flex-col justify-between gap-6 text-left'>
				<>
					<div className='space-y-3'>
						<div className='ui-meta tracking-wider text-accent-cyan uppercase'>{project.year}</div>
						<h3 className='heading-2 text-primary line-clamp-2'>{project.title}</h3>
						<p className='text-tertiary'>{project.company}</p>
					</div>

					<ProjectImage
						src={project.images.main}
						alt={`Screenshot of ${project.title}`}
						className={cn('h-full w-full rounded-lg gradient-primary-soft', [
							'transition-duration-300 opacity-75 transition-opacity group-hover:opacity-100',
						])}
					/>

					<div className='space-y-4'>
						<p className='text-muted line-clamp-3 text-sm'>{project.summary}</p>
						<ProjectTags tags={project.tags} limit={3} size='sm' />
					</div>
				</>
			</div>

			<ArrowIndicator
				className={cn('absolute right-8 bottom-8', [
					'transition-duration-300 transition-all group-hover:translate-x-2 group-hover:bg-accent-blue/20',
				])}
			/>
		</CardContainer>
	);
};

const ArrowIndicator = ({ className }: { className: string }) => (
	<div
		className={cn('transition-duration-300 flex h-12 w-12 items-center justify-center rounded-full transition-all', [
			['border border-accent-blue/30 bg-accent-blue/10 text-xl text-accent-cyan', className],
		])}
	>
		→
	</div>
);
