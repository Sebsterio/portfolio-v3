'use client';

import Link from 'next/link';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '../types';

type TimelineCollectionPageProps = {
	projects: Project[];
};

export const TimelineCollectionPage = ({ projects }: TimelineCollectionPageProps) => {
	const { navigate } = useTransitionRouter();

	return (
		<div className='w-full space-y-8'>
			{/* Back to Home Link */}
			<Link href='/' className='inline-flex items-center gap-2 text-sm text-chrome-silver/60 hover:text-accent-cyan transition-colors'>
				<ArrowLeft className='w-4 h-4' />
				Back to Home
			</Link>

			{/* Desktop Timeline */}
			<div className='hidden md:block relative w-full'>
				{/* Vertical Line with Fade */}
				<div className='absolute left-32 top-0 bottom-0 w-[2px]'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan to-transparent' />
					<div className='absolute inset-0 bg-gradient-to-b from-accent-blue/80 via-accent-cyan to-accent-blue/20' />
				</div>

				<div className='space-y-12'>
					{projects.map((project) => (
						<div key={project.id} className='relative flex items-start gap-8'>
							{/* Date Container (Left Side) */}
							<div className='w-32 flex-shrink-0 flex items-start justify-end pt-0'>
								<div className='text-sm font-semibold text-accent-cyan whitespace-nowrap pr-4 lg:block hidden'>
									{project.period.replace(' – ', ' - ')}
								</div>
								<div className='lg:hidden block -rotate-90 origin-top-right translate-x-4 translate-y-8 text-sm font-semibold text-accent-cyan whitespace-nowrap'>
									{project.period.replace(' – ', ' - ')}
								</div>
							</div>

							{/* Timeline Dot */}
							<div className='absolute left-[126.5px] top-0 w-4 h-4 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)] z-10' />

							{/* Project Card */}
							<button
								onClick={() => navigate(`/projects/${project.slug}?view=timeline`)}
								className={cn(
									'vt-project-card flex-1 text-left',
									'p-8 rounded-2xl',
									'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
									'border border-chrome-silver/[0.08]',
									'transition-all duration-300',
									'hover:border-accent-blue/30 hover:translate-x-2',
									'relative overflow-hidden'
								)}
							>
								{/* Subtle gradient accent */}
								<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-2xl' />

								<div className='relative space-y-4'>
									<div className='flex items-center gap-3 text-sm text-chrome-silver/50'>
										<span>{project.location}</span>
										<span>•</span>
										<span>{project.role}</span>
									</div>

									<h3 className='font-urbanist text-3xl font-bold text-chrome-silver'>{project.title}</h3>

									<p className='text-lg text-chrome-silver/80'>{project.company}</p>

									<p className='text-chrome-silver/60 leading-relaxed'>{project.summary}</p>

									<div className='flex flex-wrap gap-2 pt-2'>
										{project.tags.slice(0, 4).map((tag) => (
											<span
												key={tag}
												className='px-3 py-1.5 rounded-lg text-sm bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Mobile Timeline */}
			<div className='md:hidden relative'>
				{/* Vertical Line with Fade */}
				<div className='absolute left-0 top-0 bottom-0 w-[2px]'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan to-transparent' />
					<div className='absolute inset-0 bg-gradient-to-b from-accent-blue/80 via-accent-cyan to-accent-blue/20' />
				</div>

				<div className='pl-6 space-y-6'>
					{projects.map((project) => (
						<div key={project.id} className='relative'>
							{/* Date and Dot (Above Card) */}
							<div className='flex items-start justify-between mb-3'>
								<div className='w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)] -ml-[25px] mt-1' />
								<div className='text-xs font-semibold text-accent-cyan'>{project.period}</div>
							</div>

							{/* Project Card */}
							<button
								onClick={() => navigate(`/projects/${project.slug}?view=timeline`)}
								className={cn(
									'vt-project-card w-full text-left',
									'p-6 rounded-2xl',
									'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
									'border border-chrome-silver/[0.08]',
									'transition-all duration-300',
									'hover:border-accent-blue/30',
									'relative overflow-hidden'
								)}
							>
								{/* Subtle gradient accent */}
								<div className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-2xl' />

								<div className='relative space-y-3'>
									<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>{project.title}</h3>

									<p className='text-chrome-silver/70'>{project.company}</p>

									<p className='text-sm text-chrome-silver/60 leading-relaxed'>{project.summary}</p>

									<div className='flex flex-wrap gap-2'>
										{project.tags.slice(0, 3).map((tag) => (
											<span key={tag} className='px-2 py-1 rounded text-xs bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'>
												{tag}
											</span>
										))}
									</div>
								</div>
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
