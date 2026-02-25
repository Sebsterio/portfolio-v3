'use client';

import { useState } from 'react';
import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import { BackLink } from '@/components/BackLink';
import { GlassCard1 as GlassCard } from '@/components/GlassCard';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import { projects } from '../../_content';
import { PROJECT_PAGE_TITLE_ID } from '../_config';

type TimelineProjectPageProps = {
	project: Project;
};

const ProjectSidebarItem = ({ project, isActive, onClick }: { project: Project; isActive: boolean; onClick: () => void }) => (
	<button
		onClick={onClick}
		className={cn(
			'relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300',
			isActive ? 'bg-accent-blue/10 border border-accent-blue/30' : 'hover:bg-white/[0.03] border border-transparent'
		)}
		// style={{ viewTransitionName: `project-card-${project.id}` }}
	>
		<TimelineDot active={isActive} size='sm' className='absolute left-[14px] top-1/2 -translate-y-1/2' />

		<div className='space-y-1'>
			<div className='text-xs text-accent-cyan font-dm-sans'>{project.period}</div>
			<div
				className={cn('font-urbanist font-semibold text-sm transition-colors', isActive ? 'text-chrome-silver' : 'text-chrome-silver/60')}
			>
				{project.title}
			</div>
			<div className='text-xs text-chrome-silver/50'>{project.company}</div>
		</div>
	</button>
);

const ProjectContentCard = ({ project, className }: { project: Project; className?: string }) => (
	<GlassCard className={cn('p-8 md:p-12 space-y-8', className)}>
		{/* Decorative gradients */}
		<div className='gradient-accent-tr' />
		<div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-cyan/10 to-transparent rounded-2xl' />

		<div className='relative space-y-8'>
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
			<div className='grid grid-cols-3 gap-4'>
				{[1, 2, 3].map((i) => (
					<div key={i} className='aspect-video rounded-xl glass-card flex items-center justify-center text-chrome-silver/30 text-sm'>
						Screenshot {i}
					</div>
				))}
			</div>

			<div className='space-y-3'>
				<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Challenge</h3>
				<p className='text-chrome-silver/80 leading-relaxed'>{project.challenge}</p>
			</div>

			<div className='space-y-3'>
				<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Solution</h3>
				<p className='text-chrome-silver/80 leading-relaxed'>{project.solution}</p>
			</div>

			<div className='space-y-4'>
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

			<ProjectTags tags={project.tags} />

			{project.link && (
				<a
					href={project.link}
					target='_blank'
					rel='noopener noreferrer'
					className={cn(
						'inline-flex items-center gap-2 px-8 py-4 rounded-full',
						'bg-gradient-to-br from-accent-blue to-accent-cyan',
						'text-white font-semibold',
						'hover:scale-105 transition-transform duration-300'
					)}
				>
					Visit Project →
				</a>
			)}
		</div>
	</GlassCard>
);

export const TimelineProjectPage = ({ project }: TimelineProjectPageProps) => {
	const { navigate } = useTransitionRouter();
	const [expandedId, setExpandedId] = useState(project.id);

	const handleProjectClick = (p: Project) => {
		setExpandedId(p.id);
		navigate(`/projects/${p.slug}?view=timeline`, { scroll: false /* scrollTo: PROJECT_PAGE_TITLE_ID */ });
	};

	return (
		<>
			<BackLink href='/projects?view=timeline'>All Projects</BackLink>

			{/* Desktop */}
			<div className='hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 w-full'>
				<aside className='vt-main relative'>
					<TimelineLine position='center' fadeEnds={false} style={{ height: `calc(100% - ${2 * projects.length}rem)` }} />

					<div className='space-y-3'>
						{projects.map((p) => (
							<ProjectSidebarItem key={p.id} project={p} isActive={expandedId === p.id} onClick={() => handleProjectClick(p)} />
						))}
					</div>
				</aside>

				<main>
					<ProjectContentCard className={cn('vt-right')} project={project} />
				</main>
			</div>

			{/* Mobile */}
			<div className='lg:hidden relative'>
				<TimelineLine position='left' />

				<div className='space-y-3'>
					{projects.map((p) => {
						const isExpanded = expandedId === p.id;

						return (
							<div key={p.id}>
								{isExpanded ? (
									<div className='space-y-4'>
										<div className='flex items-center gap-3'>
											<TimelineDot active />
											<div className='text-xs text-accent-cyan font-semibold'>{p.period}</div>
										</div>

										<GlassCard withAccent className='p-6 space-y-6 border-accent-blue/30'>
											<div className='relative space-y-4'>
												<div className='space-y-2'>
													<h2 className='font-urbanist text-3xl font-bold text-chrome-silver'>{p.title}</h2>
													<p className='text-lg text-chrome-silver/80'>{p.company}</p>
													<div className='text-sm text-chrome-silver/60'>{p.role}</div>
												</div>

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

												<ProjectTags tags={p.tags} size='sm' />

												{p.link && (
													<a
														href={p.link}
														target='_blank'
														rel='noopener noreferrer'
														className='inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm bg-gradient-to-br from-accent-blue to-accent-cyan text-white font-semibold'
													>
														Visit Project →
													</a>
												)}
											</div>
										</GlassCard>
									</div>
								) : (
									<button
										onClick={() => handleProjectClick(p)}
										className='relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent'
									>
										<TimelineDot size='sm' className='absolute left-[6px] top-1/2 -translate-y-1/2' />

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
