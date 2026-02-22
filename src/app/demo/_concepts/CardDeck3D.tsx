'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects, type Project } from '../projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CardDeck3D = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);

	const current = projects[currentIndex];

	const next = () => {
		setFlipped(false);
		setCurrentIndex((i) => (i + 1) % projects.length);
	};

	const prev = () => {
		setFlipped(false);
		setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
	};

	return (
		<div className='relative h-[700px] flex items-center justify-center perspective-[2000px]'>
			{/* Navigation */}
			<button
				onClick={prev}
				className={cn(
					'absolute left-0 z-20 w-12 h-12 rounded-full',
					'bg-white/[0.05] hover:bg-white/[0.1]',
					'flex items-center justify-center',
					'transition-all duration-300',
					'hover:scale-110'
				)}
			>
				<ChevronLeft className='w-6 h-6 text-chrome-silver' />
			</button>

			<button
				onClick={next}
				className={cn(
					'absolute right-0 z-20 w-12 h-12 rounded-full',
					'bg-white/[0.05] hover:bg-white/[0.1]',
					'flex items-center justify-center',
					'transition-all duration-300',
					'hover:scale-110'
				)}
			>
				<ChevronRight className='w-6 h-6 text-chrome-silver' />
			</button>

			{/* Card Stack */}
			<div className='relative w-full max-w-4xl h-[600px]'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentIndex}
						initial={{ rotateY: 90, opacity: 0 }}
						animate={{ rotateY: 0, opacity: 1 }}
						exit={{ rotateY: -90, opacity: 0 }}
						transition={{
							duration: 0.6,
							type: 'spring',
							stiffness: 100,
							damping: 20
						}}
						className='absolute inset-0'
						style={{ transformStyle: 'preserve-3d' }}
					>
						{/* Flip Container */}
						<motion.div
							animate={{ rotateY: flipped ? 180 : 0 }}
							transition={{
								duration: 0.6,
								type: 'spring',
								stiffness: 100
							}}
							className='relative w-full h-full cursor-pointer'
							style={{ transformStyle: 'preserve-3d' }}
							onClick={() => setFlipped(!flipped)}
						>
							{/* Front Side - Project Summary */}
							<div
								className={cn(
									'absolute inset-0 rounded-[32px] p-12',
									'bg-[rgba(13,13,13,0.8)] backdrop-blur-[60px]',
									'border border-chrome-silver/[0.12]',
									'backface-hidden'
								)}
								style={{ backfaceVisibility: 'hidden' }}
							>
								<div className='h-full flex flex-col justify-between'>
									<div className='space-y-6'>
										<div className='flex items-center gap-4 text-sm text-accent-cyan'>
											<span>{current.period}</span>
											<span>•</span>
											<span>{current.location}</span>
										</div>
										<h2 className='font-urbanist text-5xl font-bold text-chrome-silver leading-tight'>
											{current.title}
										</h2>
										<p className='text-2xl text-chrome-silver/80'>{current.company}</p>
									</div>

									<div className='space-y-6'>
										<p className='text-xl text-chrome-silver/70 leading-relaxed'>{current.summary}</p>
										<div className='flex flex-wrap gap-2'>
											{current.tags.map((tag) => (
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
									'overflow-y-auto',
									'backface-hidden'
								)}
								style={{
									backfaceVisibility: 'hidden',
									transform: 'rotateY(180deg)'
								}}
							>
								<div className='space-y-6'>
									<h3 className='font-urbanist text-3xl font-bold text-accent-blue'>Case Study</h3>

									<div className='space-y-4'>
										<Section title='Problem' content={current.problem} />
										<Section title='Approach' content={current.approach} />
										<Section title='Solution' content={current.solution} />
									</div>

									{/* Impact */}
									<div className='space-y-3'>
										<h4 className='font-urbanist text-xl font-bold text-accent-cyan'>Impact</h4>
										<ul className='space-y-2'>
											{current.impact.map((item, i) => (
												<li key={i} className='flex items-start gap-3'>
													<span className='text-accent-cyan mt-1'>▸</span>
													<span className='text-chrome-silver/90 text-sm'>{item}</span>
												</li>
											))}
										</ul>
									</div>

									{/* Link */}
									{current.link && (
										<a
											href={current.link}
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

				{/* Background Cards (Depth Effect) */}
				{[1, 2].map((offset) => {
					const index = (currentIndex + offset) % projects.length;
					return (
						<motion.div
							key={`bg-${index}`}
							className={cn(
								'absolute inset-0 rounded-[32px]',
								'bg-[rgba(13,13,13,0.4)] backdrop-blur-[20px]',
								'border border-chrome-silver/[0.06]',
								'pointer-events-none'
							)}
							style={{
								transform: `translateZ(-${offset * 100}px) scale(${1 - offset * 0.1})`,
								opacity: 1 - offset * 0.3,
								zIndex: -offset
							}}
						/>
					);
				})}
			</div>

			{/* Indicator */}
			<div className='absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2'>
				{projects.map((_, i) => (
					<button
						key={i}
						onClick={() => {
							setFlipped(false);
							setCurrentIndex(i);
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

const Section = ({ title, content }: { title: string; content: string }) => (
	<div className='space-y-2'>
		<h5 className='font-urbanist text-lg font-bold text-accent-blue'>{title}</h5>
		<p className='text-chrome-silver/80 text-sm leading-relaxed'>{content}</p>
	</div>
);
