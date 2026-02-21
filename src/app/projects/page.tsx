'use client';

import { useSearchParams } from 'next/navigation';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { ViewSwitcher } from './_components/ViewSwitcher';
import { TimelineCollection } from './_components/TimelineCollectionPage';
import { CardsCollection } from './_components/CardsCollectionPage';
import { MagazineCollection } from './_components/MagazineCollectionPage';
import { projects } from './_content';
import { ViewMode } from './types';

export default function ProjectsPage() {
	useTransitionReady();
	const searchParams = useSearchParams();
	const view = (searchParams.get('view') as ViewMode) || 'timeline';

	return (
		<div className='w-full space-y-8'>
			<ViewSwitcher currentView={view} />

			{view === 'timeline' && <TimelineCollection projects={projects} />}
			{view === 'cards' && <CardsCollection projects={projects} />}
			{view === 'magazine' && <MagazineCollection projects={projects} />}
		</div>
	);
}
