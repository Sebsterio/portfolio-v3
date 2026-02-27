'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { DisplayModeSwitcher } from './DisplayModeSwitcher';
import { TimelineCollectionPage } from './TimelineCollectionPage';
import { CardsCollectionPage } from './CardsCollectionPage';
import { MagazineCollectionPage } from './MagazineCollectionPage';
import type { DisplayMode, Project } from '@/types';

type ProjectsClientProps = {
	initialView: DisplayMode;
	projects: Project[];
};

export function ProjectsPageClient({ initialView, projects }: ProjectsClientProps) {
	useTransitionReady();
	const [view, setView] = useState<DisplayMode>(initialView);
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleViewChange = (newView: DisplayMode) => {
		// Update URL without full navigation
		const url = new URL(window.location.href);
		url.searchParams.set('view', newView);
		window.history.replaceState({}, '', url);

		// Instant view switch with View Transition API
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				setView(newView);
			});
		} else {
			setView(newView);
		}
	};

	return (
		<div className='w-full space-y-8'>
			{/* Page Header */}
			<div className='text-center space-y-4'>
				<h1 className='font-urbanist text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent'>
					Projects
				</h1>
				<p className='text-chrome-silver/60 text-lg'>Case studies & development work from recent years</p>
				<DisplayModeSwitcher currentMode={view} onViewChange={handleViewChange} />
			</div>

			{/* Page Content */}
			{view === 'timeline' && <TimelineCollectionPage projects={projects} />}
			{view === 'cards' && <CardsCollectionPage projects={projects} />}
			{view === 'magazine' && <MagazineCollectionPage projects={projects} />}
		</div>
	);
}
