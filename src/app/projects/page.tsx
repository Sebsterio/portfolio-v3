import { projects } from './_content';
import type { DisplayMode } from '../../types';
import { ProjectsPageClient } from './_components/ProjectsPageClient';

type ProjectsPageProps = {
	searchParams: Promise<{ view?: DisplayMode }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
	const { view = 'timeline' } = await searchParams;

	return <ProjectsPageClient initialView={view} projects={projects} />;
}
