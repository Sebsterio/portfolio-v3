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

// import { PROJECT_PAGE_TITLE_ID } from '../../_config';

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
				<aside className='relative vt-t-list'>
					<TimelineLine position='center' fadeEnds={false} style={{ height: `calc(100% - ${2 * projects.length}rem)` }} />
					<div className='space-y-3'>
						{projects.map((p) => (
							<ProjectSidebarItem key={p.id} project={p} isActive={project.id === p.id} onClick={() => go(p)} />
						))}
					</div>
				</aside>

				<main className='vt-t-detail'>
					<TimelineProjectPanel project={project} />
				</main>
			</div>

			{/* Mobile ──────────────────────────────────────────── */}
			<div className='relative lg:hidden'>
				<TimelineLine position='left' />
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
			<span className='text-xs font-semibold text-accent-cyan'>{p.period}</span>
		</div>

		<Panel className='glass-surface-1 glass-elevation-1 glass-radius-2 space-y-6 border-accent-blue/30 p-6' style={{ viewTransitionName: `project-card-${p.id}` }}>
			<div className='relative space-y-4'>
				<div className='space-y-1.5'>
					<h2 className='heading-1 text-primary'>{p.title}</h2>
					<p className='text-secondary text-lg'>{p.company}</p>
					<p className='text-muted text-sm'>{p.role}</p>
				</div>

				<p className='text-secondary leading-relaxed'>{p.intro}</p>

				<ImpactSection label='The Challenge' content={p.challenge} />
				<ImpactSection label='The Solution' content={p.solution} />

				<div className='space-y-3'>
					<h3 className='heading-3 text-primary font-bold'>Impact</h3>
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
	</div>
);

const CollapsedMobileItem = ({ project: p, onClick }: { project: Project; onClick: () => void }) => (
	<button
		onClick={onClick}
		className='relative w-full rounded-xl border border-transparent p-4 pl-10 text-left transition-all duration-300 hover:bg-white/3'
		style={{ viewTransitionName: `project-card-${p.id}` }}
	>
		<TimelineDot size='sm' className='absolute top-1/2 left-0 -translate-y-1/2' />
		<div className='space-y-1'>
			<div className='ui-meta text-accent-cyan'>{p.period}</div>
			<div className='text-muted font-display text-sm font-semibold'>{p.title}</div>
			<div className='text-subtle text-xs'>{p.company}</div>
		</div>
	</button>
);

const ImpactSection = ({ label, content }: { label: string; content: string }) => (
	<div className='space-y-2'>
		<h3 className='heading-3 text-primary font-bold'>{label}</h3>
		<p className='text-secondary text-sm leading-relaxed'>{content}</p>
	</div>
);
