'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { BackLink } from '@/components/BackLink';
import { ProjectTags } from '@/components/ProjectTags';
import { ProjectImage } from '@/components/ProjectImage';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';
import { InlineList } from '@/components/InlineList';

type CardsProjectPageProps = {
	project: Project;
	allProjects: Project[];
};

// TODO: mv out of here; and index by id; also rename these tw classes
const projectGradients: Record<string, string> = {
	'bounce-component-library': 'bg-gradient-bounce-main',
	'underground-meco-event-platform': 'bg-gradient-meco-main',
	'tt-education-modernization': 'bg-gradient-tt',
	'tokensite-blockchain-analytics': 'bg-gradient-ebit-main',
	'ao-payment-system': 'bg-gradient-ao-main',
	'animalysis-vet-clinic': 'bg-gradient-freelance-main',
	'narbon-ecommerce': 'bg-gradient-freelance-small',
};

const NavigationButton = ({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) => {
	const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
	return (
		<button
			onClick={onClick}
			className={cn(
				'w-12 h-12 md:w-14 md:h-14 rounded-full',
				'bg-white/5 hover:bg-white/10',
				'flex items-center justify-center',
				'transition-all duration-300 hover:scale-110',
			)}
		>
			<Icon className='w-6 h-6 md:w-7 md:h-7 text-chrome-silver' />
		</button>
	);
};

const ProjectIndicators = ({
	projects,
	currentIndex,
	onNavigate,
}: {
	projects: Project[];
	currentIndex: number;
	onNavigate: (slug: string) => void;
}) => (
	<div className='flex gap-2'>
		{projects.map((p, i) => (
			<button
				key={p.id}
				onClick={() => onNavigate(p.slug)}
				className={cn(
					'h-2 rounded-full transition-all duration-300',
					i === currentIndex ? 'bg-accent-blue w-8' : 'bg-chrome-silver/30 hover:bg-chrome-silver/50 w-2',
				)}
			/>
		))}
	</div>
);

// ----------------------------------------------------------------------------

export const CardsProjectPage = ({ project, allProjects: projects }: CardsProjectPageProps) => {
	const { navigate } = useTransitionRouter();
	const [flipped, setFlipped] = useState(false);
	const frontRef = useRef<HTMLDivElement>(null);
	const backRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const currentIndex = projects.findIndex((p) => p.id === project.id);
	const gradientClass = projectGradients[project.slug] || 'bg-gradient-bounce-main';

	// Measure and update container height whenever flip state changes
	useEffect(() => {
		const updateHeight = () => {
			const activeRef = flipped ? backRef.current : frontRef.current;
			const container = containerRef.current;

			if (activeRef && container) {
				const height = activeRef.offsetHeight;
				container.style.height = `${height}px`;
			}
		};

		// Immediate update
		updateHeight();

		// Also update after animation completes
		const timer = setTimeout(updateHeight, 650);

		return () => clearTimeout(timer);
	}, [flipped]);

	// Update container height when project changes (without resetting flip state)
	useEffect(() => {
		const container = containerRef.current;
		const front = frontRef.current;

		if (container && front) {
			const timer = setTimeout(() => {
				container.style.height = `${front.offsetHeight}px`;
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [project.id]);

	const goToNext = () => {
		const nextIndex = (currentIndex + 1) % projects.length;
		setFlipped(false);
		navigate(`/projects/cards/${projects[nextIndex].slug}`, { scroll: false });
	};

	const goToPrev = () => {
		const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
		setFlipped(false);
		navigate(`/projects/cards/${projects[prevIndex].slug}`, { scroll: false });
	};

	const goToProject = (slug: string) => {
		setFlipped(false);
		navigate(`/projects/cards/${slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID });
	};

	return (
		<div className='w-full flex flex-col gap-8'>
			<div className='w-full max-w-4xl mx-auto'>
				<BackLink href={`/projects/cards`} scroll={false}>
					All Projects
				</BackLink>
			</div>

			<div className='flex flex-col items-center gap-8'>
				{/* Card Container with Navigation */}
				<div className='grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-start w-full max-w-350'>
					{/* Desktop Left Button */}
					<div className='hidden lg:flex lg:items-start lg:pt-40'>
						<NavigationButton direction='prev' onClick={goToPrev} />
					</div>

					{/* Card Deck */}
					<div
						className={cn('perspective-[2000px] w-full max-w-4xl mx-auto')}
						style={
							{ viewTransitionName: `project-card-${project.id}` } //
						}
					>
						<div ref={containerRef} className='relative transition-all duration-500 ease-in-out' style={{ minHeight: '600px' }}>
							<AnimatePresence mode='wait'>
								<motion.div
									key={project.id}
									initial={{ rotateY: 0, opacity: 1 }}
									animate={{ rotateY: 0, opacity: 1 }}
									exit={{ rotateY: -90, opacity: 0 }}
									transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
									className='w-full'
									style={{ transformStyle: 'preserve-3d' }}
								>
									{/* Flip Container */}
									<motion.div
										animate={{ rotateY: flipped ? 180 : 0 }}
										transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
										className='relative w-full cursor-pointer'
										style={{ transformStyle: 'preserve-3d' }}
										onClick={() => setFlipped(!flipped)}
									>
										{/* Front Side */}
										<div
											ref={frontRef}
											className={cn('rounded-4xl p-8 md:p-12', 'surface-glass-3 backdrop-glass-3')}
											style={{
												backfaceVisibility: 'hidden',
												WebkitBackfaceVisibility: 'hidden',
											}}
										>
											<div className='space-y-6 md:space-y-8'>
												{/* Header */}
												<div className='space-y-3 md:space-y-4'>
													<InlineList.Div className='cluster-md text-sm text-accent-cyan'>
														{[project.period, project.location]}
													</InlineList.Div>
													<h2 className='font-urbanist text-3xl md:text-5xl font-bold text-chrome-silver leading-tight'>{project.title}</h2>
													<p className='text-xl md:text-2xl text-chrome-silver/80'>
														<span className=''>{project.company}</span>
														<span className='text-chrome-silver/40'>{' - ' + project.label}</span>
													</p>
												</div>

												<ProjectImage
													src={project.images.main}
													alt={`Screenshot of ${project.title}`}
													sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 896px'
													className={cn('h-64 md:h-80 rounded-2xl', gradientClass)}
													fallbackClass='text-white/50 text-sm font-semibold'
													fallbackText='Screenshot Unavailable'
												/>

												{/* Footer */}
												<div className='space-y-4 pb-2'>
													<p className='text-base md:text-xl text-tertiary leading-relaxed'>{project.summary}</p>
													<ProjectTags tags={project.tags} />
													<p className='text-sm text-accent-blue animate-pulse'>Tap to flip →</p>
												</div>
											</div>
										</div>

										{/* Back Side */}
										<div
											ref={backRef}
											className={cn(
												'absolute inset-0 rounded-4xl p-8 md:p-12',
												'bg-[rgba(13,13,13,0.95)] backdrop-blur-[60px]',
												'border border-accent-blue/30',
											)}
											style={{
												backfaceVisibility: 'hidden',
												WebkitBackfaceVisibility: 'hidden',
												transform: 'rotateY(180deg)',
											}}
										>
											<div className='space-y-6 pb-2'>
												<h3 className='font-urbanist text-2xl md:text-3xl font-bold text-accent-blue'>Case Study</h3>

												<div className='space-y-6'>
													<div>
														<h4 className='font-urbanist text-lg md:text-xl font-bold text-accent-cyan mb-2'>The Challenge</h4>
														<p className='text-chrome-silver/80 text-sm md:text-base leading-relaxed'>{project.challenge}</p>
													</div>

													<div>
														<h4 className='font-urbanist text-lg md:text-xl font-bold text-accent-cyan mb-2'>The Solution</h4>
														<p className='text-chrome-silver/80 text-sm md:text-base leading-relaxed'>{project.solution}</p>
													</div>

													<div>
														<h4 className='font-urbanist text-lg md:text-xl font-bold text-accent-cyan mb-2'>Impact</h4>
														<ul className='space-y-2'>
															{project.impact.map((item, i) => (
																<li key={i} className='flex items-start gap-3'>
																	<span className='text-accent-cyan mt-1'>→</span>
																	<span className='text-chrome-silver/90 text-sm md:text-base'>{item}</span>
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
														onClick={(e) => e.stopPropagation()}
														className={cn(
															'button-primary-inline-sm',
															'hover:scale-105 transition-transform duration-300',
														)}
													>
														Visit Project →
													</a>
												)}
											</div>
										</div>
									</motion.div>

									{/* Background Cards (Depth Effect) - only visible when not flipped */}
									{!flipped &&
										[1, 2].map((offset) => (
											<div
												key={offset}
												className={cn('absolute inset-0 rounded-4xl', 'surface-glass-1 backdrop-glass-0', 'pointer-events-none')}
												style={{
													transform: `translateZ(-${offset * 100}px) scale(${1 - offset * 0.1})`,
													opacity: 1 - offset * 0.3,
													zIndex: -offset,
												}}
											/>
										))}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					{/* Desktop Right Button */}
					<div className='hidden lg:flex lg:items-start lg:pt-40'>
						<NavigationButton direction='next' onClick={goToNext} />
					</div>
				</div>

				{/* Mobile/Tablet Navigation (Below Card) */}
				<div className='lg:hidden flex items-center justify-between w-full max-w-sm'>
					<NavigationButton direction='prev' onClick={goToPrev} />
					<ProjectIndicators projects={projects} currentIndex={currentIndex} onNavigate={goToProject} />
					<NavigationButton direction='next' onClick={goToNext} />
				</div>

				{/* Desktop Indicators (Below Card) */}
				<div className='hidden lg:block'>
					<ProjectIndicators projects={projects} currentIndex={currentIndex} onNavigate={goToProject} />
				</div>
			</div>
		</div>
	);
};
