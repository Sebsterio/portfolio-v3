import type { ProjectThemeLookup } from '@/lib/theme/types';
import { projects } from './_content';

const workProjects = projects.filter((p) => !p.personal);
const personalProjects = projects.filter((p) => p.personal);
const projectThemeLookup = Object.freeze(
	Object.fromEntries(projects.map(({ slug, theme }) => [slug, theme ?? null])) as Record<string, (typeof projects)[number]['theme']>,
) as ProjectThemeLookup;

// --- Data access ---

export async function getProjects() {
	return workProjects;
}

export async function getPersonalProjects() {
	return personalProjects;
}

export function getProject(slug: string) {
	return projects.find((p) => p.slug === slug);
}

export function getProjectThemeBySlug(slug: string) {
	return projectThemeLookup[slug] ?? null;
}

export function getProjectThemeLookup(): ProjectThemeLookup {
	return projectThemeLookup;
}

export function getProjectName(slug: string): string | undefined {
	return projects.find((p) => p.slug === slug)?.title;
}

export function getProjectCompany(slug: string): string | undefined {
	return projects.find((p) => p.slug === slug)?.company;
}
export function getProjectPeriod(slug: string): string | undefined {
	return projects.find((p) => p.slug === slug)?.period;
}

export function getProjectId(slug: string) {
	return projects.find((p) => p.slug === slug)?.id;
}

// --- Format ---

export const getProjectAnchorId = (projectId: string | number) => `project-${projectId}`; // Project section `id` attribute
