'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import type { Project } from '../../../types';

type CardsCollectionPageProps = {
	projects: Project[];
};

export const CardsCollectionPage = ({ projects }: CardsCollectionPageProps) => {
	const { navigate } = useTransitionRouter();
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
			{projects.map((project) => (
				<motion.button
					key={project.id}
					onClick={() => navigate(`/projects/${project.slug}?view=cards`)}
					onHoverStart={() => setHoveredId(project.id)}
					onHoverEnd={() => setHoveredId(null)}
					className={cn(
						'vt-project-card group relative',
						'h-[400px] rounded-[28px] overflow-hidden text-left',
						'transition-all duration-500'
					)}
					whileHover={{ scale: 1.02, y: -8 }}
					whileTap={{ scale: 0.98 }}
				>
					{/* Background Layer - Morphs from thumbnail on hover */}
					<div className='absolute inset-0'>
						{/* Thumbnail (visible by default) */}
						<div
							className={cn(
								'absolute inset-0 transition-opacity duration-500',
								'bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20',
								hoveredId === project.id ? 'opacity-0' : 'opacity-100'
							)}
						>
							{/* TODO: Replace with actual image */}
							<div className='w-full h-full flex items-center justify-center text-chrome-silver/30'>Thumbnail</div>
						</div>

						{/* Morphed Background (visible on hover) */}
						<div
							className={cn(
								'absolute inset-0 transition-opacity duration-500',
								'bg-[rgba(13,13,13,0.95)] backdrop-blur-[60px]',
								hoveredId === project.id ? 'opacity-100' : 'opacity-0'
							)}
							style={{
								backgroundImage: hoveredId === project.id ? `url(${project.thumbnail})` : 'none',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<div className='absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent' />
						</div>
					</div>

					{/* Glass Layer */}
					<div
						className={cn(
							'absolute inset-0',
							'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
							'border border-chrome-silver/[0.08]',
							'transition-all duration-500',
							'group-hover:border-accent-blue/30'
						)}
					/>

					{/* Content */}
					<div className='relative h-full p-8 flex flex-col justify-between'>
						<div className='space-y-3'>
							<div className='text-xs text-accent-cyan font-dm-sans uppercase tracking-wider'>{project.year}</div>
							<h3 className='font-urbanist text-2xl font-bold text-chrome-silver line-clamp-2'>{project.title}</h3>
							<p className='text-chrome-silver/70'>{project.company}</p>
						</div>

						<div className='space-y-4'>
							<p className='text-sm text-chrome-silver/60 line-clamp-3'>{project.summary}</p>
							<div className='flex flex-wrap gap-2'>
								{project.tags.slice(0, 3).map((tag) => (
									<span key={tag} className='px-2 py-1 rounded text-xs bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Hover Arrow Indicator */}
					<div
						className={cn(
							'absolute bottom-8 right-8',
							'w-12 h-12 rounded-full',
							'bg-accent-blue/10 border border-accent-blue/30',
							'flex items-center justify-center',
							'text-accent-cyan text-xl',
							'transition-all duration-300',
							'group-hover:translate-x-2 group-hover:bg-accent-blue/20'
						)}
					>
						→
					</div>
				</motion.button>
			))}
		</div>
	);
};
