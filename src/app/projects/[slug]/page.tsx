import { notFound } from 'next/navigation';
import type { DisplayMode } from '@/types';
import { projects } from '../_content';
import { ProjectPageClient } from '../_components/ProjectPageClient';

const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

type ProjectPageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ view?: DisplayMode }>;
};

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
	const { slug } = await params;
	const { view = 'timeline' } = await searchParams;
	const currentProject = getProjectBySlug(slug);

	if (!currentProject) notFound();

	return <ProjectPageClient initialView={view} project={currentProject} slug={slug} />;
}
