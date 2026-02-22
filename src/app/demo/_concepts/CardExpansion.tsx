'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects, type Project } from '../projects';
import { X } from 'lucide-react';

export const CardExpansion = () => {
	const [selected, setSelected] = useState<Project | null>(null);

	return (
		<>
			{/* Grid of Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{projects.map((project) => (
					<motion.button
						key={project.id}
						layoutId={`project-${project.id}`}
						onClick={() => setSelected(project)}
						className={cn(
							'group relative p-8 rounded-[28px] text-left overflow-hidden',
							'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
							'border border-chrome-silver/[0.08]',
							'transition-all duration-500',
							'hover:translate-y-[-4px] hover:border-accent-blue/30'
						)}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						{/* Card Content */}
						<div className='relative z-10 space-y-4'>
							<div className='text-xs text-accent-cyan font-dm-sans'>{project.period}</div>
							<h3 className='font-urbanist text-xl font-bold text-chrome-silver'>{project.title}</h3>
							<p className='text-sm text-chrome-silver/60'>{project.company}</p>
							<div className='flex flex-wrap gap-2 pt-2'>
								{project.tags.slice(0, 3).map((tag) => (
									<span key={tag} className='px-2 py-1 rounded text-xs bg-accent-blue/10 text-accent-cyan'>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Diagonal Glare */}
						<div
							className='absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500'
							style={{
								background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 50%)'
							}}
						/>
					</motion.button>
				))}
			</div>

			{/* Expanded Modal */}
			<AnimatePresence>
				{selected && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelected(null)}
							className='fixed inset-0 bg-black/80 backdrop-blur-sm z-40'
						/>

						{/* Modal */}
						<motion.div
							layoutId={`project-${selected.id}`}
							className={cn(
								'fixed inset-4 md:inset-8 z-50',
								'bg-[rgba(13,13,13,0.95)] backdrop-blur-[60px]',
								'border border-chrome-silver/[0.12]',
								'rounded-[32px] overflow-hidden'
							)}
						>
							<div className='h-full overflow-y-auto p-8 md:p-12'>
								{/* Close Button */}
								<button
									onClick={() => setSelected(null)}
									className={cn(
										'absolute top-6 right-6 z-10',
										'w-10 h-10 rounded-full',
										'bg-white/[0.05] hover:bg-white/[0.1]',
										'flex items-center justify-center',
										'transition-colors duration-300'
									)}
								>
									<X className='w-5 h-5 text-chrome-silver' />
								</button>

								{/* Content */}
								<div className='max-w-4xl mx-auto space-y-8'>
									{/* Header */}
									<div className='space-y-4'>
										<div className='flex items-center gap-4 text-sm text-accent-cyan'>
											<span>{selected.period}</span>
											<span>•</span>
											<span>{selected.location}</span>
										</div>
										<h2 className='font-urbanist text-4xl md:text-5xl font-bold text-chrome-silver'>
											{selected.title}
										</h2>
										<p className='text-xl text-chrome-silver/80'>{selected.company}</p>
										<div className='flex flex-wrap gap-2'>
											{selected.tags.map((tag) => (
												<span
													key={tag}
													className='px-3 py-1.5 rounded-lg text-sm bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Summary */}
									<p className='text-lg text-chrome-silver/70 leading-relaxed'>{selected.summary}</p>

									{/* Case Study Sections */}
									<div className='space-y-6'>
										<Section title='Problem' content={selected.problem} />
										<Section title='Approach' content={selected.approach} />
										<Section title='Solution' content={selected.solution} />
									</div>

									{/* Impact */}
									<div className='space-y-4'>
										<h3 className='font-urbanist text-2xl font-bold text-accent-blue'>Impact</h3>
										<ul className='space-y-3'>
											{selected.impact.map((item, i) => (
												<li key={i} className='flex items-start gap-3'>
													<span className='text-accent-cyan mt-1'>▸</span>
													<span className='text-chrome-silver/80'>{item}</span>
												</li>
											))}
										</ul>
									</div>

									{/* Link */}
									{selected.link && (
										<a
											href={selected.link}
											target='_blank'
											rel='noopener noreferrer'
											className={cn(
												'inline-block px-8 py-4 rounded-full',
												'bg-gradient-to-br from-accent-blue to-accent-cyan',
												'text-white font-semibold',
												'hover:scale-105 transition-transform duration-300'
											)}
										>
											View Project →
										</a>
									)}
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

const Section = ({ title, content }: { title: string; content: string }) => (
	<div className='space-y-3'>
		<h3 className='font-urbanist text-2xl font-bold text-accent-blue'>{title}</h3>
		<p className='text-chrome-silver/80 leading-relaxed'>{content}</p>
	</div>
);
