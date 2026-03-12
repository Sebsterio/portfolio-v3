import { redirect } from 'next/navigation';
import { getProjectAnchorId, getProjectId, getProjects } from '../../_lib';

export const dynamicParams = false;

export async function generateStaticParams() {
	const projects = await getProjects();

	return projects.map((project) => ({ slug: project.slug }));
}

export default async function MagazineSlugPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const projectId = getProjectId(slug)!;
	const sectionId = getProjectAnchorId(projectId);

	redirect(`/projects/magazine#${sectionId}`);
}
