'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { cn } from '@/lib/utils';
import { BackLink } from '@/components/BackLink';
import { GlassCard1 as GlassCard } from '@/components/GlassCard';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import { ProjectContentCard } from './TimelineProjectContentCard';
import { ProjectSidebarItem } from './TimelineProjectSidebarItem';

import { PROJECT_PAGE_TITLE_ID } from '../../_config';

type TimelineProjectPageProps = {
	project: Project;
	allProjects: Project[];
};

export const TimelineProjectPage = ({ project, allProjects: projects }: TimelineProjectPageProps) => {
	const { navigate } = useTransitionRouter();

	const handleProjectClick = (p: Project) => {
		navigate(`/projects/timeline/${p.slug}`, { scroll: false });
	};

	return (
		<>
			<BackLink href='/projects/timeline' scroll={false} className='mb-8'>
				All Projects
			</BackLink>

			{/* Desktop */}
			<div className='hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 w-full'>
				<aside className='vt-t-list relative'>
					<TimelineLine position='center' fadeEnds={false} style={{ height: `calc(100% - ${2 * projects.length}rem)` }} />

					<div className='space-y-3'>
						{projects.map((p) => (
							<ProjectSidebarItem key={p.id} project={p} isActive={project.id === p.id} onClick={() => handleProjectClick(p)} />
						))}
					</div>
				</aside>

				<main className='vt-t-detail'>
					<ProjectContentCard project={project} />
				</main>
			</div>

			{/* Mobile */}
			<div className={cn('lg:hidden relative')}>
				<TimelineLine position='left' />

				<div className='space-y-3'>
					{projects.map((p) => {
						const isExpanded = p.id === project.id;

						return (
							<div key={p.id}>
								{isExpanded ? (
									<div className={cn('space-y-4')}>
										<div className='flex items-center gap-3'>
											<TimelineDot active />
											<div className='text-xs text-accent-cyan font-semibold'>{p.period}</div>
										</div>

										<GlassCard
											withAccent
											className='p-6 space-y-6 border-accent-blue/30'
											style={{ viewTransitionName: `project-card-${p.id}` }}
										>
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

												{/* TODO: extract component or styles */}
												{p.link && (
													<a
														href={p.link}
														target='_blank'
														rel='noopener noreferrer'
														className='inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm bg-linear-to-br from-accent-blue to-accent-cyan text-white font-semibold'
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
										className={cn(
											'relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300 hover:bg-white/3 border border-transparent'
										)}
										style={{ viewTransitionName: `project-card-${p.id}` }}
									>
										<TimelineDot size='sm' className='absolute left-0 top-1/2 -translate-y-1/2' />

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
