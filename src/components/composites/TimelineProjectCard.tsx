import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { Panel } from '@/components/primitives/Panel';
import { ImpactList } from '@/components/composites/ImpactList';
import { ProjectTags } from '@/components/composites/ProjectTags';
import { CaseStudySection } from '@/components/composites/CaseStudySection';
import { ButtonLinkExternal } from '@/components/primitives';

export const TimelineProjectCard = ({ project: p, className, ...props }: { project: Project; className?: string }) => (
	<Panel className={cn('glass-surface-1 relative space-y-5 glass-radius-2 border-accent/30 p-6 glass-elevation-1', className)} {...props}>
		<div className='space-y-1.5'>
			<h2 className='heading-1 text-primary'>{p.title}</h2>
			<p className='text-lg text-secondary'>{p.company}</p>
			<p className='text-sm text-muted'>{p.role}</p>
		</div>

		<p className='leading-relaxed text-secondary'>{p.intro}</p>

		<CaseStudySection label='The Challenge' content={p.challenge} size='sm' />

		<CaseStudySection label='The Solution' content={p.solution} size='sm' />

		<CaseStudySection label='Impact' size='sm'>
			<ImpactList items={p.impact} size='sm' />
		</CaseStudySection>

		<ProjectTags tags={p.tags} size='sm' />

		{p.link && (
			<ButtonLinkExternal href={p.link} size='sm'>
				Visit Project →
			</ButtonLinkExternal>
		)}
	</Panel>
);
