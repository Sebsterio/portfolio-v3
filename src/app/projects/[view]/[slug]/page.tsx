import { notFound } from 'next/navigation';
import type { DisplayMode } from '@/types';
import { BackLink } from '@/components/BackLink';
import { UnderConstructionPage } from '@/components/pages/UnderConstructionPage';
import { CardsProjectPage } from '../../_components/CardsProjectPage';
import { TimelineProjectPage } from '../../_components/TimelineProjectPage';
import { getProjectBySlug, PROJECT_PAGE_TITLE_ID } from '../../_config';
import { generateProjectParams } from '../../_config';
import { DisplayModeSwitcher } from '../../_components/DisplayModeSwitcher';

export const dynamicParams = false;

export { generateProjectParams as generateStaticParams };

export function generateMetadata({ params }: ProjectPageProps) {
	const project = params?.slug && getProjectBySlug(params.slug);
	if (!project) return {};
	return {
		title: `${project.title} | Projects`,
		description: project.label, // TODO
	};
}

type ProjectPageProps = {
	params: { view: DisplayMode; slug: string };
};

export default function ProjectPage({ params }: ProjectPageProps) {
	const project = getProjectBySlug(params.slug);

	if (!project) notFound();

	// TEMP: UnderConstructionPage layout has assumptions that are getting in the way
	if (params.view === 'magazine') {
		return (
			<div className='w-full space-y-4'>
				<div className='text-center'>
					<DisplayModeSwitcher currentMode={params.view} subPath={params.slug} />
				</div>
				<BackLink href={`/projects/${params.view}`}>All Projects</BackLink>
				<UnderConstructionPage />
			</div>
		);
	}
	return (
		<div className='w-full space-y-6'>
			{/* Project header */}
			<div className='text-center space-y-4'>
				<h2 id={PROJECT_PAGE_TITLE_ID} className='font-urbanist text-4xl md:text-5xl font-bold text-chrome-silver'>
					{project.title}
				</h2>
				<p className='text-chrome-silver/70 text-lg'>
					{project.company} · {project.period}
				</p>
				<DisplayModeSwitcher currentMode={params.view} subPath={params.slug} />
			</div>

			{/* Project content */}
			{params.view === 'timeline' && <TimelineProjectPage project={project} />}
			{params.view === 'cards' && <CardsProjectPage project={project} />}
		</div>
	);
}
