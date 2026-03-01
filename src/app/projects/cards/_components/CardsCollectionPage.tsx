'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
// import { GlassCard1 as GlassCard } from '@/components/GlassCard';
import { ProjectTags } from '@/components/ProjectTags';
import { PROJECT_PAGE_TITLE_ID } from '../../_config';

// ----------------------------------------------------------------------------

type CardsCollectionPageProps = {
	projects: Project[];
};

export const CardsCollectionPage = ({ projects }: CardsCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='w-full space-y-8'>
			<div
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'
				//  className={cn(/* 'vt-main', */ 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto')}
			>
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onNavigate={() => navigate(`/projects/cards/${project.slug}`, { scrollTo: PROJECT_PAGE_TITLE_ID })}
					/>
				))}
			</div>
		</div>
	);
};

// ----------------------------------------------------------------------------

const ProjectCard = ({ project, onNavigate }: { project: Project; onNavigate: () => void }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.button
			onClick={onNavigate}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className={cn('group relative h-[420px] rounded-[28px] overflow-hidden text-left')}
			style={
				{ viewTransitionName: `project-card-${project.id}` } //
			}
			whileHover={{ scale: 1.02, y: -8 }}
			whileTap={{ scale: 0.98 }}
		>
			{/* Thumbnail Layer (default visible) */}
			<div
				className={cn(
					'absolute inset-x-0 top-0 h-48 transition-all duration-500',
					'bg-gradient-to-br from-accent-blue/30 via-accent-cyan/20 to-purple-500/20',
					isHovered ? 'opacity-0' : 'opacity-100'
				)}
			>
				<div className='w-full h-full flex items-center justify-center text-chrome-silver/40 text-sm font-semibold'>{project.title}</div>
			</div>

			{/* Background Image on Hover */}
			<div
				className={cn(
					'absolute inset-0 transition-opacity duration-500',
					'bg-gradient-to-br from-accent-blue/40 via-accent-cyan/30 to-purple-500/30',
					isHovered ? 'opacity-100' : 'opacity-0'
				)}
			>
				<div className='w-full h-full flex items-center justify-center text-chrome-silver/20 text-2xl font-bold'>{project.title}</div>
			</div>

			{/* Glass Overlay */}
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
					<ProjectTags tags={project.tags} limit={3} size='sm' />
				</div>
			</div>

			{/* Arrow Indicator */}
			<div
				className={cn(
					'absolute bottom-8 right-8 w-12 h-12 rounded-full',
					'bg-accent-blue/10 border border-accent-blue/30',
					'flex items-center justify-center text-accent-cyan text-xl',
					'transition-all duration-300',
					'group-hover:translate-x-2 group-hover:bg-accent-blue/20'
				)}
			>
				→
			</div>
		</motion.button>
	);
};
