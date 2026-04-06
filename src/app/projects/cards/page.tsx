import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { CardsCollectionPage } from '@/components/CardsCollectionPage';
import { getPersonalProjects, getProjects } from '../_lib';

export default async function CardsProjectsPage() {
	const workProjects = await getProjects();
	const personalProjects = await getPersonalProjects();

	return (
		<PageTransition>
			<CardsCollectionPage projects={[...workProjects, ...personalProjects]} />
		</PageTransition>
	);
}
