import { Project } from '@/types';
import { ImpactList } from '@/components/composites/ImpactList';
import { ButtonLinkExternal } from '@/components/primitives';

export function ProjectCaseStudyContent({ project }: { project: Project }) {
	return (
		<div className='stack-md pb-2 md:stack-lg'>
			<h2 className='heading-2 text-accent'>Case Study</h2>

			<section className='stack-xs'>
				<h3 className='heading-3 text-label'>The Challenge</h3>
				<p className='body-xs md:body-sm text-secondary'>{project.challenge}</p>
			</section>

			<section className='stack-xs'>
				<h3 className='heading-3 text-label'>The Solution</h3>
				<p className='body-xs md:body-sm text-secondary'>{project.solution}</p>
			</section>

			<section className='stack-xs'>
				<h3 className='heading-3 text-label'>Impact</h3>
				<ImpactList items={project.impact} />
			</section>

			{project.link && <ButtonLinkExternal size='sm' href={project.link} label='Visit Project →' />}
		</div>
	);
}
