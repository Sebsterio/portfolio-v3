import { notFound } from 'next/navigation';
import { PageTransition } from '@/lib/transitions/PageTransition';
import { TimelineProjectPage } from '@/app/projects/timeline/_components/TimelineProjectPage';
import { getProjects, getProject } from '@/app/projects/_lib';

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function TimelineProjectDetailsPage({ params }: Props) {
	const { slug } = await params;
	const [project, allProjects] = await Promise.all([getProject(slug), getProjects()]);

	if (!project) notFound();

	return (
		<PageTransition>
			<TimelineProjectPage project={project} allProjects={allProjects} />
		</PageTransition>
	);
}
