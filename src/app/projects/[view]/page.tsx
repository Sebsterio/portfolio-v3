import { notFound } from 'next/navigation';
import type { DisplayMode } from '@/types';
import { projects } from '../_content';
import { generateViewParams } from '../_config';
import { CardsCollectionPage } from '../_components/CardsCollectionPage';
import { TimelineCollectionPage } from '../_components/TimelineCollectionPage';
import { MagazineCollectionPage } from '../_components/MagazineCollectionPage';
import { DisplayModeSwitcher } from '../_components/DisplayModeSwitcher';

export { generateViewParams as generateStaticParams };

const viewComponents = {
	timeline: TimelineCollectionPage,
	cards: CardsCollectionPage,
	magazine: MagazineCollectionPage,
};

type AllProjectsPageProps = {
	params: { view: DisplayMode };
};

export default function AllProjectsPage({ params }: AllProjectsPageProps) {
	const ViewComponent = params.view && viewComponents[params.view];

	if (!ViewComponent) notFound();

	return (
		<div className='space-y-6'>
			<div className='text-center space-y-4'>
				<h1 className='font-urbanist text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent'>
					Projects
				</h1>
				<p className='text-chrome-silver/60 text-lg'>Case studies & development work from recent years</p>
				<div className='text-center'>
					<DisplayModeSwitcher currentMode={params.view} />
				</div>
			</div>
			<ViewComponent projects={projects} />;
		</div>
	);
}
