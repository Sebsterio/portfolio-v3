import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { getProjects } from '../_lib';
import { TimelineCollectionPage } from '@/components/views/TimelineCollectionPage';

export default async function TimelineListPage() {
	const projects = await getProjects();

	return (
		<PageTransition>
			<TimelineCollectionPage projects={projects} />
		</PageTransition>
	);
}
