import { PageTransition } from '@/lib/transitions/PageTransition';
import { getProjects } from '../_lib';
import { TimelineCollectionPage } from './_components/TimelineCollectionPage';

export default async function TimelineListPage() {
	const projects = await getProjects();

	return (
		<PageTransition>
			<TimelineCollectionPage projects={projects} />
		</PageTransition>
	);
}
