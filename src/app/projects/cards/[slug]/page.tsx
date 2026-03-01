import { notFound } from 'next/navigation';
import { CardsProjectPage } from '../_components/CardsProjectPage';
import { getProject, getProjects } from '../../_lib';
import { PageTransition } from '@/lib/transitions/PageTransition';

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function CardsProjectDetailsPage({ params }: Props) {
	const { slug } = await params;
	const [project, allProjects] = await Promise.all([getProject(slug), getProjects()]);

	if (!project) notFound();

	return (
		<PageTransition>
			<CardsProjectPage project={project} allProjects={allProjects} />
		</PageTransition>
	);
}
