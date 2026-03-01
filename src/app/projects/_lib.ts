import { projects } from './_content';

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
