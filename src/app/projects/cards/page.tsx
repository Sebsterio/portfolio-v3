import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { CardsCollectionPage } from '@/components/CardsCollectionPage';
import { getAllProjects } from '../_lib';

export default async function CardsProjectsPage() {
	const projects = getAllProjects();

	return (
		<PageTransition>
			<CardsCollectionPage projects={projects} />
		</PageTransition>
	);
}
