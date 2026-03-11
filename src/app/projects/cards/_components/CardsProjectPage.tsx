'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { BackLink } from '@/components/BackLink';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { InlineList } from '@/components/InlineList';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';

type CardsProjectPageProps = {
	project: Project;
	allProjects: Project[];
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

type NavigationButtonProps = {
	direction: 'prev' | 'next';
	onClick: () => void;
	className?: string;
};

function NavigationButton({ direction, onClick, className }: NavigationButtonProps) {
	const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

	return (
		<button
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

function ProjectCardFront({ project, gradientClass, flipped }: { project: Project; gradientClass: string; flipped: boolean }) {
	return (
		<div
			className={cn(
				'col-start-1 row-start-1 rounded-4xl p-8 md:p-12',
				'surface-glass-3 backdrop-glass-3',
				'transition-opacity duration-300',
				flipped ? 'pointer-events-none opacity-0' : 'opacity-100',
			)}
			style={{
				backfaceVisibility: 'hidden',
				WebkitBackfaceVisibility: 'hidden',
			}}
		>
			<div className='space-y-6 md:space-y-8'>
				<div className='space-y-3 md:space-y-4'>
					<InlineList.Div className='cluster-md text-sm text-accent-cyan'>{[project.period, project.location]}</InlineList.Div>

					<h2 className='font-urbanist text-3xl font-bold leading-tight text-chrome-silver md:text-5xl'>{project.title}</h2>

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
					fallbackClass='text-sm font-semibold text-white/50'
					fallbackText='Screenshot Unavailable'
				/>

				<div className='space-y-4 pb-2'>
					<p className='text-base leading-relaxed text-tertiary md:text-xl'>{project.summary}</p>
					<ProjectTags tags={project.tags} />
					<p className='text-sm text-accent-blue animate-pulse'>Flip card →</p>
				</div>
			</div>
		</div>
	);
}

function ProjectCardBack({ project, flipped }: { project: Project; flipped: boolean }) {
	return (
		<div
			className={cn(
				'col-start-1 row-start-1 rounded-4xl p-8 md:p-12',
				'border border-accent-blue/30 bg-[rgba(13,13,13,0.95)] backdrop-blur-[60px]',
				'transition-opacity duration-300',
				flipped ? 'opacity-100' : 'pointer-events-none opacity-0',
			)}
			style={{
				backfaceVisibility: 'hidden',
				WebkitBackfaceVisibility: 'hidden',
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
						<ul className='space-y-2'>
							{project.impact.map((item) => (
								<li key={item} className='flex items-start gap-3'>
									<span className='mt-1 text-accent-cyan'>→</span>
									<span className='text-sm text-chrome-silver/90 md:text-base'>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{project.link && (
					<a
						href={project.link}
						target='_blank'
						rel='noopener noreferrer'
						onClick={(event) => event.stopPropagation()}
						className={cn('button-primary-inline-sm', 'transition-transform duration-300 hover:scale-105')}
					>
						Visit Project →
					</a>
				)}
			</div>
		</div>
	);
}

function FlipProjectCard({
	project,
	gradientClass,
	flipped,
	onFlip,
}: {
	project: Project;
	gradientClass: string;
	flipped: boolean;
	onFlip: () => void;
}) {
	return (
		<div className='perspective-[2000px] w-full max-w-4xl mx-auto' style={{ viewTransitionName: `project-card-${project.id}` }}>
			<div onClick={onFlip} className='cursor-pointer'>
				<div
					className='grid'
					style={{
						transformStyle: 'preserve-3d',
						transition: `transform ${CARD_FLIP_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
						transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
					}}
				>
					<ProjectCardFront project={project} gradientClass={gradientClass} flipped={flipped} />
					<ProjectCardBack project={project} flipped={flipped} />
				</div>
			</div>
		</div>
	);
}

export const CardsProjectPage = ({ project, allProjects }: CardsProjectPageProps) => {
	const { navigate } = useTransitionRouter();
	const [flipped, setFlipped] = useState(false);

	const currentIndex = useMemo(() => allProjects.findIndex((item) => item.id === project.id), [allProjects, project.id]);

	const gradientClass =
		CARD_IMAGE_GRADIENTS[((currentIndex % CARD_IMAGE_GRADIENTS.length) + CARD_IMAGE_GRADIENTS.length) % CARD_IMAGE_GRADIENTS.length];

	const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
	const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

	const goToProject = (slug: string, options?: { scroll?: false; scrollTo?: string }) => {
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
						'grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-8',
						'items-center',
					)}
				>
					<div className='col-span-3 row-start-1 lg:col-span-1 lg:col-start-2'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={project.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25 }}
								className='w-full'
							>
								<FlipProjectCard
									project={project}
									gradientClass={gradientClass}
									flipped={flipped}
									onFlip={() => setFlipped((value) => !value)}
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					<div className='col-start-1 row-start-2 justify-self-start lg:row-start-1 lg:self-center'>
						<NavigationButton direction='prev' onClick={() => goToProject(prevProject.slug, { scroll: false })} />
					</div>

					<div className='col-start-3 row-start-2 justify-self-end lg:row-start-1 lg:self-center'>
						<NavigationButton direction='next' onClick={() => goToProject(nextProject.slug, { scroll: false })} />
					</div>

					<div className='col-start-2 row-start-2 justify-self-center lg:col-start-2'>
						<ProjectIndicators
							projects={allProjects}
							currentIndex={currentIndex}
							onNavigate={(slug) => goToProject(slug, { scrollTo: PROJECT_PAGE_TITLE_ID })}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
