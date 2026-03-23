'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { cn } from '@/lib/utils';
import { ProjectTags } from '@/components/ProjectTags';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';
import { ProjectImage } from '@/components/ProjectImage';
import { Panel } from '@/components/ui/Panel';
import { ArrowIndicator } from '@/components/ArrowIndicator';

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
		<Panel
			edgeGlow
			className={cn(
				'glass-radius-3 group glass-surface-2 h-105 padding-card glass-elevation-1',
				'transition-all hover:scale-105 hover:glass-elevation-2',
			)}
			{...{ style, onClick }}
		>
			<div className='relative flex h-full flex-col justify-between gap-6 text-left'>
				<>
					<div className='space-y-3'>
						<div className='ui-meta tracking-wider text-label uppercase'>{project.year}</div>
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
				aria-label={`View ${project.title}`}
				className={cn('absolute right-8 bottom-8', [
					'group-hover:translate-x-2 group-hover:bg-accent/20',
				])}
			/>
		</Panel>
	);
};

