'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { Panel } from '@/components/ui/Panel';
import { BackLink } from '@/components/BackLink';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { InlineList } from '@/components/InlineList';
import { ImpactList } from '@/components/ImpactList';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';
import { ExternalLinkButton } from '@/components/Button';

type CardsProjectPageProps = {
	project: Project;
	allProjects: Project[];
};

type NavigationTarget = {
	slug: string;
	options?: { scroll?: false; scrollTo?: string };
};

type ProjectNeighbors = {
	currentIndex: number;
	prev: Project;
	next: Project;
};

const CARD_IMAGE_GRADIENTS = [
	'bg-gradient-bounce-main',
	'bg-gradient-meco-main',
	'bg-gradient-tt',
	'bg-gradient-ebit-main',
	'bg-gradient-ao-main',
	'bg-gradient-freelance-main',
	'bg-gradient-freelance-small',
] as const;

const CARD_FLIP_DURATION_MS = 600;

const CARD_WRAPPER_STYLE: CSSProperties = {
	transformStyle: 'preserve-3d',
};

const CARD_FACE_SHARED_STYLE: CSSProperties = {
	backfaceVisibility: 'hidden',
	WebkitBackfaceVisibility: 'hidden',
};

function getProjectNeighbors(project: Project, allProjects: Project[]): ProjectNeighbors {
	const currentIndex = allProjects.findIndex((item) => item.id === project.id);

	if (currentIndex < 0) {
		throw new Error(`CardsProjectPage: project "${project.id}" not found in allProjects.`);
	}

	return {
		currentIndex,
		prev: allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length],
		next: allProjects[(currentIndex + 1) % allProjects.length],
	};
}

function getCardImageGradient(index: number): string {
	return CARD_IMAGE_GRADIENTS[index % CARD_IMAGE_GRADIENTS.length];
}

function getProjectCardTransitionStyle(flipped: boolean): CSSProperties {
	return {
		...CARD_WRAPPER_STYLE,
		transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
		transition: `transform ${CARD_FLIP_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
	};
}

function getProjectCardViewTransitionStyle(projectId: Project['id']): CSSProperties {
	return {
		viewTransitionName: `project-card-${projectId}`,
	};
}
function getProjectCardInnerViewTransitionStyle(projectId: Project['id']): CSSProperties {
	return {
		viewTransitionName: `project-card-inner-${projectId}`,
	};
}

type NavigationButtonProps = {
	direction: 'prev' | 'next';
	onClick: () => void;
	className?: string;
};

function NavigationButton({ direction, onClick, className }: NavigationButtonProps) {
	const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

	return (
		<button
			type='button'
			onClick={onClick}
			className={cn(
				'h-12 w-12 rounded-full md:h-14 md:w-14',
				'flex items-center justify-center',
				'bg-white/5 hover:bg-white/10',
				'transition-transform duration-300 hover:scale-110',
				className,
			)}
		>
			<Icon className='h-6 w-6 text-chrome-silver md:h-7 md:w-7' />
		</button>
	);
}

type ProjectIndicatorsProps = {
	projects: Project[];
	currentIndex: number;
	onNavigate: (slug: string) => void;
	className?: string;
};

function ProjectIndicators({ projects, currentIndex, onNavigate, className }: ProjectIndicatorsProps) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			{projects.map((item, index) => (
				<button
					type='button'
					key={item.id}
					onClick={() => onNavigate(item.slug)}
					className={cn(
						'h-2 rounded-full transition-all duration-300',
						index === currentIndex ? 'w-8 bg-accent-blue' : 'w-2 bg-chrome-silver/30 hover:bg-chrome-silver/50',
					)}
				/>
			))}
		</div>
	);
}

type ProjectCardFaceProps = {
	project: Project;
	flipped: boolean;
};

function ProjectCardFront({ project, flipped, gradientClass }: ProjectCardFaceProps & { gradientClass: string }) {
	return (
		<Panel
			className={cn(
				'glass-surface-2 glass-elevation-1 glass-radius-2',
				'col-start-1 row-start-1 padding-panel',
				'transition-opacity duration-300',
				flipped ? 'pointer-events-none opacity-0' : 'opacity-100',
			)}
			style={CARD_FACE_SHARED_STYLE}
		>
			<div className='space-y-6 md:space-y-8'>
				<div className='space-y-3 md:space-y-4'>
					<InlineList.Div className='cluster-md text-sm text-accent-cyan'>{[project.period, project.location]}</InlineList.Div>

					<h2 className='font-urbanist text-3xl leading-tight font-bold text-chrome-silver md:text-5xl'>{project.title}</h2>

					<p className='text-xl text-chrome-silver/80 md:text-2xl'>
						<span>{project.company}</span>
						<span className='text-chrome-silver/40'>{' - ' + project.label}</span>
					</p>
				</div>

				<ProjectImage
					src={project.images.main}
					alt={`Screenshot of ${project.title}`}
					sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 896px'
					className={cn('h-64 rounded-2xl md:h-80', gradientClass)}
				/>

				<div className='space-y-4 pb-2'>
					<p className='text-tertiary text-base leading-relaxed md:text-xl'>{project.summary}</p>
					<ProjectTags size='lg' tags={project.tags} />
					<p className='animate-pulse text-sm text-accent-blue'>Flip card →</p>
				</div>
			</div>
		</Panel>
	);
}

function ProjectCardBack({ project, flipped }: ProjectCardFaceProps) {
	return (
		<Panel
			className={cn(
				'glass-surface-2 glass-elevation-1 glass-radius-2',
				'col-start-1 row-start-1 padding-panel',
				'border-accent-blue/30',
				'transition-opacity duration-300',
				flipped ? 'opacity-100' : 'pointer-events-none opacity-0',
			)}
			style={{
				...CARD_FACE_SHARED_STYLE,
				transform: 'rotateY(180deg)',
			}}
		>
			<div className='space-y-6 pb-2'>
				<h3 className='font-urbanist text-2xl font-bold text-accent-blue md:text-3xl'>Case Study</h3>

				<div className='space-y-6'>
					<div>
						<h4 className='mb-2 font-urbanist text-lg font-bold text-accent-cyan md:text-xl'>The Challenge</h4>
						<p className='text-sm leading-relaxed text-chrome-silver/80 md:text-base'>{project.challenge}</p>
					</div>

					<div>
						<h4 className='mb-2 font-urbanist text-lg font-bold text-accent-cyan md:text-xl'>The Solution</h4>
						<p className='text-sm leading-relaxed text-chrome-silver/80 md:text-base'>{project.solution}</p>
					</div>

					<div>
						<h4 className='mb-2 font-urbanist text-lg font-bold text-accent-cyan md:text-xl'>Impact</h4>
						<ImpactList items={project.impact} />
					</div>
				</div>

				{project.link && (
					<ExternalLinkButton href={project.link} size='sm'>
						Visit Project →
					</ExternalLinkButton>
				)}
			</div>
		</Panel>
	);
}

type ProjectTransitionSlotProps = {
	projectId: Project['id'];
	side: 'prev' | 'next';
};

function ProjectTransitionSlot({ projectId, side }: ProjectTransitionSlotProps) {
	return (
		<div
			aria-hidden='true'
			className={cn(
				'pointer-events-none absolute top-1/4 bottom-1/4 hidden w-[20rem] max-w-[28vw] overflow-hidden rounded-4xl lg:block',
				side === 'prev' ? 'right-[calc(100%+2rem)]' : 'left-[calc(100%+2rem)]',
			)}
			style={getProjectCardInnerViewTransitionStyle(projectId)}
		/>
	);
}

type FlipProjectCardProps = {
	project: Project;
	prevProjectId: Project['id'];
	nextProjectId: Project['id'];
	gradientClass: string;
	flipped: boolean;
	onFlip: () => void;
};

function FlipProjectCard({ project, prevProjectId, nextProjectId, gradientClass, flipped, onFlip }: FlipProjectCardProps) {
	return (
		<div className='relative mx-auto w-full max-w-4xl overflow-x-clip perspective-[2000px]'>
			<ProjectTransitionSlot projectId={prevProjectId} side='prev' />
			<ProjectTransitionSlot projectId={nextProjectId} side='next' />

			<div style={getProjectCardViewTransitionStyle(project.id)}>
				<div
					onClick={onFlip}
					className='block w-full cursor-pointer bg-transparent p-0 text-left'
					style={getProjectCardInnerViewTransitionStyle(project.id)}
				>
					<div className='grid' style={getProjectCardTransitionStyle(flipped)}>
						<ProjectCardFront project={project} gradientClass={gradientClass} flipped={flipped} />
						<ProjectCardBack project={project} flipped={flipped} />
					</div>
				</div>
			</div>
		</div>
	);
}

type ProjectCardControlsProps = {
	projects: Project[];
	currentIndex: number;
	onPrev: () => void;
	onNext: () => void;
	onNavigate: (slug: string) => void;
};

function ProjectCardControls({ projects, currentIndex, onPrev, onNext, onNavigate }: ProjectCardControlsProps) {
	return (
		<>
			<div className='col-start-1 row-start-2 justify-self-start lg:row-start-1 lg:self-center'>
				<NavigationButton direction='prev' onClick={onPrev} />
			</div>

			<div className='col-start-3 row-start-2 justify-self-end lg:row-start-1 lg:self-center'>
				<NavigationButton direction='next' onClick={onNext} />
			</div>

			<div className='col-start-2 row-start-2 justify-self-center lg:col-start-2'>
				<ProjectIndicators projects={projects} currentIndex={currentIndex} onNavigate={onNavigate} />
			</div>
		</>
	);
}

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

			<div className='flex flex-col items-center gap-8'>
				<div
					className={cn(
						'w-full max-w-350',
						'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-10',
					)}
				>
					<div className='col-span-3 row-start-1 lg:col-span-1 lg:col-start-2'>
						<FlipProjectCard
							project={project}
							prevProjectId={prev.id}
							nextProjectId={next.id}
							gradientClass={getCardImageGradient(currentIndex)}
							flipped={flipped}
							onFlip={() => setFlipped((value) => !value)}
						/>
					</div>

					<ProjectCardControls
						projects={allProjects}
						currentIndex={currentIndex}
						onPrev={() => navigateToProject({ slug: prev.slug, options: { scroll: false } })}
						onNext={() => navigateToProject({ slug: next.slug, options: { scroll: false } })}
						onNavigate={(slug) => navigateToProject({ slug, options: { scrollTo: PROJECT_PAGE_TITLE_ID } })}
					/>
				</div>
			</div>
		</div>
	);
};
