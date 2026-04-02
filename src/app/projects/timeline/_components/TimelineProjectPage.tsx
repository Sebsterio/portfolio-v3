'use client';

import type { Project } from '@/types';
import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
import { BackLink } from '@/components/BackLink';
import { Panel } from '@/components/ui/Panel';
import { ProjectTags } from '@/components/ProjectTags';
import { TimelineLine } from '@/components/TimelineLine';
import { TimelineDot } from '@/components/TimelineDot';
import { TimelineProjectPanel } from './TimelineProjectPanel';
import { ProjectSidebarItem } from './TimelineProjectSidebarItem';
import { ExternalLinkButton } from '@/components';
import { ImpactList } from '@/components/ImpactList';
import { CaseStudySection } from '@/components/CaseStudySection';
import { VT } from '@/lib/transitions/components/TransitionSlot';

type TimelineProjectPageProps = {
	project: Project;
	allProjects: Project[];
};

export const TimelineProjectPage = ({ project, allProjects: projects }: TimelineProjectPageProps) => {
	const { navigate } = useTransitionRouter();
	const go = (p: Project) => navigate(`/projects/timeline/${p.slug}`, { scroll: false });

	return (
		<>
			<BackLink href='/projects/timeline' scroll={false} className='mb-8'>
				All Projects
			</BackLink>

			{/* Desktop ─────────────────────────────────────────── */}

			<div className='hidden w-full gap-8 lg:grid lg:grid-cols-[320px_1fr]'>
				<aside className='relative'>
					<VT.Area name='t-list'>
						<TimelineLine
							className='left-4'
							fadeEnds={false}
							style={{ height: `calc(100% - ${2 * projects.length}rem)` }} //
						/>
						<div className='space-y-3'>
							{projects.map((p) => (
								<ProjectSidebarItem
									key={p.id}
									project={p}
									isActive={project.id === p.id}
									onClick={() => go(p)} //
								/>
							))}
						</div>
					</VT.Area>
				</aside>
				<main>
					<VT.Area classes='vt-right'>
						<TimelineProjectPanel project={project} />
					</VT.Area>
				</main>
			</div>

			{/* Mobile ──────────────────────────────────────────── */}

			<div className='relative lg:hidden'>
				<TimelineLine className='left-1.75' />

				<div className='space-y-3'>
					{projects.map((p) => {
						const isExpanded = p.id === project.id;
						return (
							<div key={p.id}>
								{isExpanded ? <ExpandedMobileCard project={p} /> : <CollapsedMobileItem project={p} onClick={() => go(p)} />}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

// ─── Mobile sub-components ────────────────────────────────────────────────────

const ExpandedMobileCard = ({ project: p }: { project: Project }) => (
	<div className='space-y-4'>
		<div className='flex items-center gap-3'>
			<TimelineDot active />
			<span className='text-sm font-semibold text-label'>{p.period}</span>
		</div>

		<VT.Onto name={`t-project-${p.id}`}>
			<Panel className='glass-surface-1 space-y-6 glass-radius-2 border-accent/30 p-6 glass-elevation-1'>
				<div className='relative space-y-5'>
					<div className='space-y-1.5'>
						<h2 className='heading-1 text-primary'>{p.title}</h2>
						<p className='text-lg text-secondary'>{p.company}</p>
						<p className='text-sm text-muted'>{p.role}</p>
					</div>

					<p className='leading-relaxed text-secondary'>{p.intro}</p>

					<CaseStudySection label='The Challenge' content={p.challenge} size='sm' />
					<CaseStudySection label='The Solution' content={p.solution} size='sm' />

					<div className='space-y-3 pt-1'>
						<h3 className='heading-3 font-bold text-primary'>Impact</h3>
						<ImpactList items={p.impact} size='sm' />
					</div>

					<ProjectTags tags={p.tags} size='sm' />

					{p.link && (
						<ExternalLinkButton href={p.link} size='sm'>
							Visit Project →
						</ExternalLinkButton>
					)}
				</div>
			</Panel>
		</VT.Onto>
	</div>
);

const CollapsedMobileItem = ({ project: p, onClick }: { project: Project; onClick: () => void }) => (
	<VT.Onto name={`t-project-${p.id}`}>
		<button
			onClick={onClick}
			className='relative w-full rounded-xl border border-transparent p-4 pl-10 text-left transition-all duration-300 hover:bg-fill-sm'
		>
			<TimelineDot size='sm' className='absolute top-1/2 left-0 -translate-y-1/2' />
			<div className='space-y-1'>
				<div className='ui-meta text-label'>{p.period}</div>
				<div className='font-display text-sm font-semibold text-muted'>{p.title}</div>
				<div className='text-xs text-subtle'>{p.company}</div>
			</div>
		</button>
	</VT.Onto>
);
