'use client';

import { useSearchParams } from 'next/navigation';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { DisplayModeSwitcher } from './_components/DisplayModeSwitcher';
import { TimelineCollectionPage } from './_components/TimelineCollectionPage';
import { CardsCollectionPage } from './_components/CardsCollectionPage';
import { MagazineCollectionPage } from './_components/MagazineCollectionPage';
import { projects } from './_content';
import type { DisplayMode } from './types';

export default function ProjectsPage() {
	useTransitionReady();
	const searchParams = useSearchParams();
	const view = (searchParams.get('view') as DisplayMode) || 'timeline';

	return (
		<div className='w-full space-y-8'>
			{/* Page Header */}
			<div className='text-center space-y-4'>
				<h1 className='font-urbanist text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent'>
					Projects
				</h1>
				<p className='text-chrome-silver/60 text-lg'>Case studies & development work from recent years</p>
				<DisplayModeSwitcher currentMode={view} />
			</div>

			{/* Page Content */}
			{view === 'timeline' && <TimelineCollectionPage projects={projects} />}
			{view === 'cards' && <CardsCollectionPage projects={projects} />}
			{view === 'magazine' && <MagazineCollectionPage projects={projects} />}
		</div>
	);
}
