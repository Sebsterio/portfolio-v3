import { PageTransition } from '@/lib/transitions/components/PageTransition';
import { getProjects } from '../_lib';
import { MagazineCollectionPage } from '@/components/MagazineCollectionPage';

export default async function MagazineProjectsPage() {
	const projects = await getProjects();

	return (
		<PageTransition>
			<MagazineCollectionPage projects={projects} />
		</PageTransition>
	);
}
