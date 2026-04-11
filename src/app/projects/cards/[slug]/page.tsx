import { notFound } from 'next/navigation';
import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { CardsProjectPage } from '@/components/CardsProjectPage';
import { getProject, getProjects, getProjectNeighbors } from '../../_lib';

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

	const { currentIndex, prev, next } = getProjectNeighbors(project, allProjects);
	const navItems = allProjects.map(({ id, slug }) => ({ id, slug }));

	return (
		<PageTransition>
			<CardsProjectPage project={project} prev={prev} next={next} currentIndex={currentIndex} navItems={navItems} />
		</PageTransition>
	);
}
