'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { cn } from '@/lib/utils';
import { ProjectTags } from '@/components/ProjectTags';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';
import { ProjectImage } from '@/components/ProjectImage';
import { GlassSurface } from '@/components/ui/GlassSurface';

// ----------------------------------------------------------------------------

type CardsCollectionPageProps = {
	projects: Project[];
};

export const CardsCollectionPage = ({ projects }: CardsCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='w-full space-y-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onClick={() => navigate(`/projects/cards/${project.slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID })}
						style={{ viewTransitionName: `project-card-${project.id}` }}
					/>
				))}
			</div>
		</div>
	);
};

// ----------------------------------------------------------------------------

type ProjectCardProps = {
	project: Project;
	style: React.CSSProperties;
	onClick: () => void;
};

const ProjectCard = ({ project, style, onClick }: ProjectCardProps) => {
	return (
		<GlassSurface
			className={cn('group h-105 p-8', 'hover:scale-[102%] -hover:translate-y-2', 'active:scale-[98%]')}
			rounded='5xl'
			hoverable
			{...{ style, onClick }}
		>
			<div className='relative h-full flex flex-col justify-between gap-6 text-left'>
				<>
					<div className='space-y-3'>
						<div className='text-xs text-accent-cyan font-dm-sans uppercase tracking-wider'>{project.year}</div>
						<h3 className='font-urbanist text-2xl font-bold text-chrome-silver line-clamp-2'>{project.title}</h3>
						<p className='text-chrome-silver/70'>{project.company}</p>
					</div>

					<ProjectImage
						src={project.images.main}
						alt={`Screenshot of ${project.title}`}
						className={cn('h-full w-full rounded-lg gradient-primary-soft', [
							'opacity-75 group-hover:opacity-100 transition-opacity transition-duration-300',
						])}
						fallbackClass='text-white/50 text-sm font-semibold'
						fallbackText='Screenshot Unavailable'
					/>

					<div className='space-y-4'>
						<p className='text-sm text-chrome-silver/60 line-clamp-3'>{project.summary}</p>
						<ProjectTags tags={project.tags} limit={3} size='sm' />
					</div>
				</>
			</div>

			<ArrowIndicator
				className={cn('absolute bottom-8 right-8', [
					'group-hover:translate-x-2 group-hover:bg-accent-blue/20 transition-all transition-duration-300',
				])}
			/>
		</GlassSurface>
	);
};

const ArrowIndicator = ({ className }: { className: string }) => (
	<div
		className={cn('w-12 h-12 rounded-full flex items-center justify-center transition-all transition-duration-300', [
			['text-xl text-accent-cyan bg-accent-blue/10 border border-accent-blue/30', className],
		])}
	>
		→
	</div>
);
