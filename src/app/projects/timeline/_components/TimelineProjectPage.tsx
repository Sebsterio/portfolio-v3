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
import { ExternalLinkButton } from '@/components';

// import { PROJECT_PAGE_TITLE_ID } from '../../_config';

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
			<div className='hidden w-full gap-8 lg:grid lg:grid-cols-[320px_1fr]'>
				<aside className='relative vt-t-list'>
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
			<div className={cn('relative lg:hidden')}>
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
											<div className='text-xs font-semibold text-accent-cyan'>{p.period}</div>
										</div>

										<GlassCard
											withAccent
											className='space-y-6 border-accent-blue/30 p-6'
											style={{ viewTransitionName: `project-card-${p.id}` }}
										>
											<div className='relative space-y-4'>
												<div className='space-y-2'>
													<h2 className='heading-1 text-primary'>{p.title}</h2>
													<p className='text-secondary text-lg'>{p.company}</p>
													<div className='text-muted text-sm'>{p.role}</div>
												</div>

												<p className='text-secondary leading-relaxed'>{p.intro}</p>

												<div className='space-y-3'>
													<h3 className='heading-3-compact text-primary'>The Challenge</h3>
													<p className='text-secondary text-sm leading-relaxed'>{p.challenge}</p>
												</div>

												<div className='space-y-3'>
													<h3 className='heading-3-compact text-primary'>The Solution</h3>
													<p className='text-secondary text-sm leading-relaxed'>{p.solution}</p>
												</div>

												<div className='space-y-3'>
													<h3 className='heading-3-compact text-primary'>Impact</h3>
													<ul className='space-y-2'>
														{p.impact.map((item, i) => (
															<li key={i} className='flex items-start gap-2 text-sm'>
																<span className='mt-1 text-accent-cyan'>→</span>
																<span className='text-chrome-silver/80'>{item}</span>
															</li>
														))}
													</ul>
												</div>

												<ProjectTags tags={p.tags} size='sm' />

												{p.link && (
													<ExternalLinkButton href={p.link} size='sm'>
														Visit Project →
													</ExternalLinkButton>
												)}
											</div>
										</GlassCard>
									</div>
								) : (
									<button
										onClick={() => handleProjectClick(p)}
										className={cn(
											'relative w-full rounded-xl border border-transparent p-4 pl-10 text-left transition-all duration-300 hover:bg-white/3',
										)}
										style={{ viewTransitionName: `project-card-${p.id}` }}
									>
										<TimelineDot size='sm' className='absolute top-1/2 left-0 -translate-y-1/2' />

										<div className='space-y-1'>
											<div className='ui-meta-accent'>{p.period}</div>
											<div className='text-muted font-urbanist text-sm font-semibold'>{p.title}</div>
											<div className='text-subtle text-xs'>{p.company}</div>
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
