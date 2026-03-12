import { projects } from './_content';

// --- Data access ---

export async function getProjects() {
	return projects;
}
export function getProject(slug: string) {
	return projects.find((p) => p.slug === slug);
}

// TODO: add field "name"
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
