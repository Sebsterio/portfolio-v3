'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import { projects } from '../../_content';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../../../types';

type CardsProjectPageProps = {
	project: Project;
};

export const CardsProjectPage = ({ project }: CardsProjectPageProps) => {
	const { navigate } = useTransitionRouter();
	const [flipped, setFlipped] = useState(false);
	const currentIndex = projects.findIndex((p) => p.id === project.id);

	const goToNext = () => {
		const nextIndex = (currentIndex + 1) % projects.length;
		setFlipped(false);
		navigate(`/projects/${projects[nextIndex].slug}?view=cards`);
	};

	const goToPrev = () => {
		const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
		setFlipped(false);
		navigate(`/projects/${projects[prevIndex].slug}?view=cards`);
	};

	return (
		<div className='vt-card-deck relative h-[700px] flex items-center justify-center perspective-[2000px]'>
			{/* Navigation Arrows */}
			<button
				onClick={goToPrev}
				className={cn(
					'absolute left-8 z-20 w-14 h-14 rounded-full',
					'bg-white/[0.05] hover:bg-white/[0.1]',
					'flex items-center justify-center',
					'transition-all duration-300 hover:scale-110'
				)}
			>
				<ChevronLeft className='w-7 h-7 text-chrome-silver' />
			</button>

			<button
				onClick={goToNext}
				className={cn(
					'absolute right-8 z-20 w-14 h-14 rounded-full',
					'bg-white/[0.05] hover:bg-white/[0.1]',
					'flex items-center justify-center',
					'transition-all duration-300 hover:scale-110'
				)}
			>
				<ChevronRight className='w-7 h-7 text-chrome-silver' />
			</button>

			{/* Card Container */}
			<div className='relative w-full max-w-4xl h-[600px]'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={project.id}
						initial={{ rotateY: 90, opacity: 0 }}
						animate={{ rotateY: 0, opacity: 1 }}
						exit={{ rotateY: -90, opacity: 0 }}
						transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
						className='absolute inset-0'
						style={{ transformStyle: 'preserve-3d' }}
					>
						{/* Flip Container */}
						<motion.div
							animate={{ rotateY: flipped ? 180 : 0 }}
							transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
							className='relative w-full h-full cursor-pointer'
							style={{ transformStyle: 'preserve-3d' }}
							onClick={() => setFlipped(!flipped)}
						>
							{/* Front Side */}
							<div
								className={cn(
									'absolute inset-0 rounded-[32px] p-12',
									'bg-[rgba(13,13,13,0.8)] backdrop-blur-[60px]',
									'border border-chrome-silver/[0.12]'
								)}
								style={{ backfaceVisibility: 'hidden' }}
							>
								<div className='h-full flex flex-col justify-between'>
									<div className='space-y-6'>
										<div className='flex items-center gap-4 text-sm text-accent-cyan'>
											<span>{project.period}</span>
											<span>•</span>
											<span>{project.location}</span>
										</div>
										<h2 className='font-urbanist text-5xl font-bold text-chrome-silver leading-tight'>{project.title}</h2>
										<p className='text-2xl text-chrome-silver/80'>{project.company}</p>
									</div>

									<div className='space-y-6'>
										<p className='text-xl text-chrome-silver/70 leading-relaxed'>{project.summary}</p>
										<div className='flex flex-wrap gap-2'>
											{project.tags.map((tag) => (
												<span
													key={tag}
													className='px-4 py-2 rounded-lg text-sm bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'
												>
													{tag}
												</span>
											))}
										</div>
										<p className='text-sm text-accent-blue animate-pulse'>Tap to flip →</p>
									</div>
								</div>
							</div>

							{/* Back Side - Case Study */}
							<div
								className={cn(
									'absolute inset-0 rounded-[32px] p-12',
									'bg-[rgba(13,13,13,0.95)] backdrop-blur-[60px]',
									'border border-accent-blue/[0.3]',
									'overflow-y-auto'
								)}
								style={{
									backfaceVisibility: 'hidden',
									transform: 'rotateY(180deg)',
								}}
							>
								<div className='space-y-6'>
									<h3 className='font-urbanist text-3xl font-bold text-accent-blue'>Case Study</h3>

									<div className='space-y-4'>
										<div>
											<h4 className='font-urbanist text-xl font-bold text-accent-cyan mb-2'>The Challenge</h4>
											<p className='text-chrome-silver/80 text-sm leading-relaxed'>{project.challenge}</p>
										</div>

										<div>
											<h4 className='font-urbanist text-xl font-bold text-accent-cyan mb-2'>The Solution</h4>
											<p className='text-chrome-silver/80 text-sm leading-relaxed'>{project.solution}</p>
										</div>
									</div>

									<div className='space-y-3'>
										<h4 className='font-urbanist text-xl font-bold text-accent-cyan'>Impact</h4>
										<ul className='space-y-2'>
											{project.impact.map((item, i) => (
												<li key={i} className='flex items-start gap-3'>
													<span className='text-accent-cyan mt-1'>→</span>
													<span className='text-chrome-silver/90 text-sm'>{item}</span>
												</li>
											))}
										</ul>
									</div>

									{project.link && (
										<a
											href={project.link}
											target='_blank'
											rel='noopener noreferrer'
											onClick={(e) => e.stopPropagation()}
											className={cn(
												'inline-flex items-center gap-2 px-6 py-3 rounded-full',
												'bg-gradient-to-br from-accent-blue to-accent-cyan',
												'text-white text-sm font-semibold',
												'hover:scale-105 transition-transform duration-300'
											)}
										>
											Visit Project →
										</a>
									)}
								</div>
							</div>
						</motion.div>
					</motion.div>
				</AnimatePresence>

				{/* Background Cards (Depth) */}
				{[1, 2].map((offset) => (
					<motion.div
						key={offset}
						className={cn(
							'absolute inset-0 rounded-[32px]',
							'bg-[rgba(13,13,13,0.4)] backdrop-blur-[20px]',
							'border border-chrome-silver/[0.06]',
							'pointer-events-none'
						)}
						style={{
							transform: `translateZ(-${offset * 100}px) scale(${1 - offset * 0.1})`,
							opacity: 1 - offset * 0.3,
							zIndex: -offset,
						}}
					/>
				))}
			</div>

			{/* Project Indicator */}
			<div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2'>
				{projects.map((p, i) => (
					<button
						key={p.id}
						onClick={() => {
							setFlipped(false);
							navigate(`/projects/${p.slug}?view=cards`);
						}}
						className={cn(
							'w-2 h-2 rounded-full transition-all duration-300',
							i === currentIndex ? 'bg-accent-blue w-8' : 'bg-chrome-silver/30 hover:bg-chrome-silver/50'
						)}
					/>
				))}
			</div>
		</div>
	);
};
