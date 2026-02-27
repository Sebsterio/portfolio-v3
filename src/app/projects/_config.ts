import type { DisplayMode } from '@/types';
import { projects } from './_content';

export const DISPLAY_MODES: DisplayMode[] = ['timeline', 'cards', 'magazine'];

export const PROJECT_PAGE_TITLE_ID = 'project-page-title';

// Utils

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

// Server

export const generateViewParams = () => DISPLAY_MODES.map((view) => ({ view }));

export const generateProjectParams = () =>
	projects.flatMap((project) =>
		DISPLAY_MODES.map((view) => ({
			view,
			slug: project.slug,
		}))
	);
