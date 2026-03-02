import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { CardsCollectionPage } from './_components/CardsCollectionPage';
import { getProjects } from '../_lib';

export default async function CardsProjectsPage() {
	const projects = await getProjects();

	return (
		<PageTransition>
			<CardsCollectionPage projects={projects} />
		</PageTransition>
	);
}
