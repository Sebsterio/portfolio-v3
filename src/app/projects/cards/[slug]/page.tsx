import { notFound } from 'next/navigation';
import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { CardsProjectPage } from '@/components/views/CardsProjectPage';
import { getProjects, getProject, getProjectNavItems } from '../../_lib';

export const dynamic = 'force-static';

export function generateStaticParams() {
	return getProjects().map((project) => ({ slug: project.slug }));
}

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function CardsProjectDetailsPage({ params }: Props) {
	const { slug } = await params;

	const project = getProject(slug) ?? notFound();
	const navItems = getProjectNavItems(getProjects());
	const current = navItems.find((item) => item.id === project.id) ?? notFound();

	return (
		<PageTransition>
			<CardsProjectPage project={project} navItems={navItems} prev={current.prev} next={current.next} />
		</PageTransition>
	);
}
