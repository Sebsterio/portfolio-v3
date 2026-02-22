'use client';

import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import type { Project } from '../../../types';

type MagazineCollectionPageProps = {
	projects: Project[];
};

/**
 * Magazine Collection View
 *
 * Masonry/collage layout with varied card sizes and designs.
 * Some cards show large images with minimal text overlay.
 * Others show text-heavy layouts with small images.
 * Mix of portrait, landscape, and square aspect ratios.
 */
export const MagazineCollectionPage = ({ projects }: MagazineCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	// Grid positioning - vary card sizes
	const gridClasses = [
		'col-span-full md:col-span-2 row-span-2', // Large feature
		'col-span-full md:col-span-1 row-span-1', // Medium
		'col-span-full md:col-span-1 row-span-1', // Medium
		'col-span-full md:col-span-2 row-span-1', // Wide
		'col-span-full md:col-span-1 row-span-2', // Tall
		'col-span-full md:col-span-1 row-span-1', // Medium
		'col-span-full md:col-span-1 row-span-1', // Medium
	];

	// Layout variants - alternate between image-heavy and text-heavy
	const layouts: Array<'image-dominant' | 'text-dominant' | 'overlay'> = [
		'overlay',
		'text-dominant',
		'image-dominant',
		'overlay',
		'image-dominant',
		'text-dominant',
		'overlay',
	];

	return (
		<div className='max-w-[1600px] mx-auto'>
			<div className='grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6'>
				{projects.map((project, idx) => {
					const layout = layouts[idx % layouts.length];
					const gridClass = gridClasses[idx % gridClasses.length];

					return (
						<button
							key={project.id}
							onClick={() => navigate(`/projects/${project.slug}?view=magazine`)}
							className={cn(
								'vt-magazine-card group relative overflow-hidden rounded-[24px]',
								'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
								'border border-chrome-silver/[0.08]',
								'transition-all duration-500',
								'hover:border-accent-blue/30 hover:scale-[1.02]',
								gridClass
							)}
						>
							{layout === 'image-dominant' && <ImageDominantCard project={project} />}
							{layout === 'text-dominant' && <TextDominantCard project={project} />}
							{layout === 'overlay' && <OverlayCard project={project} />}

							{/* Hover Gradient */}
							<div
								className={cn(
									'absolute inset-0 opacity-0 group-hover:opacity-100',
									'bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-cyan/10',
									'transition-opacity duration-500 pointer-events-none'
								)}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};

// Layout Variant: Image-dominant (large image, small text overlay)
const ImageDominantCard = ({ project }: { project: Project }) => (
	<>
		<div className='absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20'>
			{/* TODO: Replace with actual image */}
			<div className='w-full h-full flex items-center justify-center text-chrome-silver/20 text-sm'>Image</div>
		</div>
		<div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent' />
		<div className='absolute bottom-0 left-0 right-0 p-8'>
			<div className='text-xs text-accent-cyan mb-2'>{project.year}</div>
			<h3 className='font-urbanist text-3xl font-bold text-white mb-2'>{project.title}</h3>
			<p className='text-sm text-chrome-silver/80'>{project.company}</p>
		</div>
	</>
);

// Layout Variant: Text-dominant (small image, large text area)
const TextDominantCard = ({ project }: { project: Project }) => (
	<div className='p-8 flex flex-col h-full'>
		<div className='flex-1 space-y-4'>
			<div className='text-xs text-accent-cyan uppercase tracking-wider'>{project.year}</div>
			<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>{project.title}</h3>
			<p className='text-chrome-silver/70'>{project.company}</p>
			<p className='text-sm text-chrome-silver/60 line-clamp-4'>{project.summary}</p>
			<div className='flex flex-wrap gap-2'>
				{project.tags.slice(0, 3).map((tag) => (
					<span key={tag} className='px-2 py-1 rounded text-xs bg-accent-blue/10 text-accent-cyan'>
						{tag}
					</span>
				))}
			</div>
		</div>
		<div className='h-24 -mx-8 -mb-8 mt-4 bg-gradient-to-br from-accent-blue/10 to-accent-cyan/10 flex items-center justify-center text-chrome-silver/20 text-xs'>
			Thumbnail
		</div>
	</div>
);

// Layout Variant: Overlay (text overlaid on image)
const OverlayCard = ({ project }: { project: Project }) => (
	<>
		<div className='absolute inset-0 bg-gradient-to-br from-accent-blue/30 to-accent-cyan/30'>
			{/* TODO: Replace with actual image */}
			<div className='w-full h-full flex items-center justify-center text-chrome-silver/20 text-sm'>Image</div>
		</div>
		<div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />
		<div className='relative h-full p-8 flex flex-col justify-between'>
			<div>
				<div className='text-xs text-accent-cyan mb-3'>{project.year}</div>
				<h3 className='font-urbanist text-3xl font-bold text-white mb-2'>{project.title}</h3>
				<p className='text-lg text-chrome-silver/90'>{project.company}</p>
			</div>
			<div>
				<p className='text-sm text-chrome-silver/70 mb-4 line-clamp-3'>{project.summary}</p>
				<div className='flex flex-wrap gap-2'>
					{project.tags.slice(0, 4).map((tag) => (
						<span key={tag} className='px-3 py-1 rounded-lg text-xs bg-white/10 text-white border border-white/20'>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	</>
);
