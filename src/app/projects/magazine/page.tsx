import { PageTransition } from '@/lib/transitions/PageTransition';
import { getProjects } from '../_lib';
import { MagazineCollectionPage } from './_components/MagazineCollectionPage';

export default async function MagazineProjectsPage() {
	const projects = await getProjects();

	return (
		<PageTransition>
			<MagazineCollectionPage projects={projects} />
		</PageTransition>
	);
}
