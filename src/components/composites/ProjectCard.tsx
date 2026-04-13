import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { ProjectTags } from '@/components/composites/ProjectTags';
import { ProjectImage } from '@/components/primitives/ProjectImage';
import { Panel } from '@/components/primitives/Panel';
import { ArrowIndicator } from '@/components/primitives/ArrowIndicator';

type ProjectCardProps = {
	project: Project;
	style?: React.CSSProperties;
	className?: string;
	onClick: () => void;
};

export const ProjectCard = ({ project, style, className, onClick }: ProjectCardProps) => {
	return (
		<Panel
			edgeGlow
			className={cn(
				'group glass-surface-2 h-105 glass-radius-3 padding-card glass-elevation-1',
				'transition-all hover:scale-105 hover:glass-elevation-2',
				className,
			)}
			{...{ style, onClick }}
		>
			<div className='relative flex h-full flex-col justify-between gap-6 text-left'>
				<>
					<div className='space-y-3'>
						<div className='ui-meta tracking-wider text-label uppercase'>{project.year}</div>
						<h3 className='heading-2 line-clamp-2 text-primary'>{project.title}</h3>
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
						<p className='line-clamp-3 text-sm text-muted'>{project.summary}</p>
						<ProjectTags tags={project.tags} limit={3} size='sm' />
					</div>
				</>
			</div>

			<ArrowIndicator
				aria-label={`View ${project.title}`}
				className={cn('absolute right-8 bottom-8', ['group-hover:translate-x-2 group-hover:bg-accent/20'])}
			/>
		</Panel>
	);
};
