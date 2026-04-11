import type { ProjectThemeLookup } from '@/lib/theme/types';
import type { Project, ProjectNavItem, ProjectNavTarget } from '@/types';
import { projects } from '@/content/projects';

const allProjects = projects;
const workProjects = allProjects.filter((project) => !project.personal);
const personalProjects = allProjects.filter((project) => project.personal);

const projectBySlug = new Map(allProjects.map((project) => [project.slug, project] as const));

const projectThemeLookup = Object.freeze(
	Object.fromEntries(allProjects.map(({ slug, theme }) => [slug, theme ?? null])) as Record<string, (typeof projects)[number]['theme']>,
) as ProjectThemeLookup;

// --- Data access ---

export function getAllProjects() {
	return allProjects;
}

export function getProjects() {
	return workProjects;
}

export function getPersonalProjects() {
	return personalProjects;
}

export function getProject(slug: string) {
	return projectBySlug.get(slug);
}

export function getProjectThemeBySlug(slug: string) {
	return projectThemeLookup[slug] ?? null;
}

export function getProjectThemeLookup(): ProjectThemeLookup {
	return projectThemeLookup;
}

export function getProjectName(slug: string): string | undefined {
	return projectBySlug.get(slug)?.title;
}

export function getProjectCompany(slug: string): string | undefined {
	return projectBySlug.get(slug)?.company;
}

export function getProjectPeriod(slug: string): string | undefined {
	return projectBySlug.get(slug)?.period;
}

export function getProjectId(slug: string) {
	return projectBySlug.get(slug)?.id;
}

// --- Navigation selectors ---

export function getProjectNavItems(projects: Project[]): ProjectNavItem[] {
	const targets: ProjectNavTarget[] = projects.map(({ id, slug }) => ({ id, slug }));

	return targets.map((item, index, items) => ({
		...item,
		prev: items[(index - 1 + items.length) % items.length],
		next: items[(index + 1) % items.length],
	}));
}

// --- Format ---

export const getProjectAnchorId = (projectId: string | number) => `project-${projectId}`;
