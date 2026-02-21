'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import { projects } from '../../_content';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../../types';

type TimelineProjectPageProps = {
	project: Project;
};

export const TimelineProjectPage = ({ project }: TimelineProjectPageProps) => {
	const { navigate } = useTransitionRouter();
	const [expandedId, setExpandedId] = useState(project.id);

	const handleProjectClick = (p: Project) => {
		setExpandedId(p.id);
		navigate(`/projects/${p.slug}?view=timeline`);
	};

	return (
		<>
			{/* Back Link */}
			<Link
				href='/projects?view=timeline'
				className='inline-flex items-center gap-2 text-sm text-chrome-silver/60 hover:text-accent-cyan transition-colors'
			>
				<ArrowLeft className='w-4 h-4' />
				All Projects
			</Link>

			{/* Desktop Layout */}
			<div className='hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 w-full'>
				{/* Sidebar */}
				<aside className='relative'>
					<div className='absolute left-4 top-0 bottom-0 w-[2px]'>
						<div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan to-transparent' />
						<div className='absolute inset-0 bg-gradient-to-b from-accent-blue/80 via-accent-cyan to-accent-blue/20' />
					</div>

					<div className='space-y-3'>
						{projects.map((p) => (
							<button
								key={p.id}
								onClick={() => handleProjectClick(p)}
								className={cn(
									'relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300',
									expandedId === p.id ? 'bg-accent-blue/10 border border-accent-blue/30' : 'hover:bg-white/[0.03] border border-transparent'
								)}
							>
								<div
									className={cn(
										'absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300',
										expandedId === p.id ? 'bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-chrome-silver/30'
									)}
								/>

								<div className='space-y-1'>
									<div className='text-xs text-accent-cyan font-dm-sans'>{p.period}</div>
									<div
										className={cn(
											'font-urbanist font-semibold text-sm transition-colors',
											expandedId === p.id ? 'text-chrome-silver' : 'text-chrome-silver/60'
										)}
									>
										{p.title}
									</div>
									<div className='text-xs text-chrome-silver/50'>{p.company}</div>
								</div>
							</button>
						))}
					</div>
				</aside>

				{/* Main Content Card */}
				<main
					className={cn(
						'p-8 md:p-12 rounded-2xl space-y-8',
						'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
						'border border-chrome-silver/[0.08]',
						'relative overflow-hidden'
					)}
				>
					{/* Decorative gradient accents */}
					<div className='absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-2xl' />
					<div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-cyan/10 to-transparent rounded-2xl' />

					<div className='relative'>
						{/* Header */}
						<div className='space-y-4'>
							<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider'>
								{project.company} · {project.role}
							</div>
							<p className='text-lg text-chrome-silver/70'>
								{project.period} · {project.location}
							</p>
							<p className='text-xl text-chrome-silver/80 leading-relaxed'>{project.intro}</p>
						</div>

						{/* Screenshots Placeholder */}
						<div className='grid grid-cols-3 gap-4 mt-8'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className={cn(
										'aspect-video rounded-xl',
										'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
										'border border-chrome-silver/[0.08]',
										'flex items-center justify-center text-chrome-silver/30 text-sm'
									)}
								>
									Screenshot {i}
								</div>
							))}
						</div>

						{/* Challenge */}
						<div className='space-y-3 mt-8'>
							<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Challenge</h3>
							<p className='text-chrome-silver/80 leading-relaxed'>{project.challenge}</p>
						</div>

						{/* Solution */}
						<div className='space-y-3 mt-8'>
							<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Solution</h3>
							<p className='text-chrome-silver/80 leading-relaxed'>{project.solution}</p>
						</div>

						{/* Impact */}
						<div className='space-y-4 mt-8'>
							<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>Impact & Results</h3>
							<ul className='space-y-2'>
								{project.impact.map((item, i) => (
									<li key={i} className='flex items-start gap-3'>
										<span className='text-accent-cyan mt-1'>→</span>
										<span className='text-chrome-silver/80'>{item}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Tech Tags */}
						<div className='flex flex-wrap gap-2 mt-8'>
							{project.tags.map((tag) => (
								<span key={tag} className='px-4 py-2 rounded-lg bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'>
									{tag}
								</span>
							))}
						</div>

						{/* Link */}
						{project.link && (
							<a
								href={project.link}
								target='_blank'
								rel='noopener noreferrer'
								className={cn(
									'inline-flex items-center gap-2 px-8 py-4 rounded-full mt-8',
									'bg-gradient-to-br from-accent-blue to-accent-cyan',
									'text-white font-semibold',
									'hover:scale-105 transition-transform duration-300'
								)}
							>
								Visit Project →
							</a>
						)}
					</div>
				</main>
			</div>

			{/* Mobile Layout */}
			<div className='lg:hidden relative'>
				{/* Vertical Line with Fade */}
				<div className='absolute left-0 top-0 bottom-0 w-[2px]'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan to-transparent' />
					<div className='absolute inset-0 bg-gradient-to-b from-accent-blue/80 via-accent-cyan to-accent-blue/20' />
				</div>

				<div className='pl-6 space-y-3'>
					{projects.map((p) => {
						const isExpanded = expandedId === p.id;

						return (
							<div key={p.id}>
								{isExpanded ? (
									// Expanded: Show as card with date header
									<div
										className={cn(
											'rounded-2xl p-6 space-y-6',
											'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
											'border border-accent-blue/30',
											'relative overflow-hidden',
											'-ml-6'
										)}
									>
										{/* Decorative gradient */}
										<div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-2xl' />

										{/* Date Header */}
										<div className='relative flex items-center gap-3'>
											<div className='w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]' />
											<div className='text-xs text-accent-cyan font-semibold'>{p.period}</div>
										</div>

										{/* Content */}
										<div className='relative space-y-4'>
											<div className='text-sm text-chrome-silver/60'>{p.role}</div>

											<p className='text-chrome-silver/80 leading-relaxed'>{p.intro}</p>

											<div className='space-y-3'>
												<h3 className='font-urbanist text-lg font-bold text-chrome-silver'>The Challenge</h3>
												<p className='text-sm text-chrome-silver/80 leading-relaxed'>{p.challenge}</p>
											</div>

											<div className='space-y-3'>
												<h3 className='font-urbanist text-lg font-bold text-chrome-silver'>The Solution</h3>
												<p className='text-sm text-chrome-silver/80 leading-relaxed'>{p.solution}</p>
											</div>

											<div className='space-y-3'>
												<h3 className='font-urbanist text-lg font-bold text-chrome-silver'>Impact</h3>
												<ul className='space-y-2'>
													{p.impact.map((item, i) => (
														<li key={i} className='flex items-start gap-2 text-sm'>
															<span className='text-accent-cyan mt-1'>→</span>
															<span className='text-chrome-silver/80'>{item}</span>
														</li>
													))}
												</ul>
											</div>

											<div className='flex flex-wrap gap-2'>
												{p.tags.map((tag) => (
													<span
														key={tag}
														className='px-3 py-1 rounded text-xs bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'
													>
														{tag}
													</span>
												))}
											</div>

											{p.link && (
												<a
													href={p.link}
													target='_blank'
													rel='noopener noreferrer'
													className={cn(
														'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm',
														'bg-gradient-to-br from-accent-blue to-accent-cyan',
														'text-white font-semibold'
													)}
												>
													Visit Project →
												</a>
											)}
										</div>
									</div>
								) : (
									// Collapsed: Show as timeline item
									<button
										onClick={() => handleProjectClick(p)}
										className={cn(
											'relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300',
											'hover:bg-white/[0.03] border border-transparent'
										)}
									>
										<div className='absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-chrome-silver/30' />

										<div className='space-y-1'>
											<div className='text-xs text-accent-cyan font-dm-sans'>{p.period}</div>
											<div className='font-urbanist font-semibold text-sm text-chrome-silver/60'>{p.title}</div>
											<div className='text-xs text-chrome-silver/50'>{p.company}</div>
										</div>
									</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};
