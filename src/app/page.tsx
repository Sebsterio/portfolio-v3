import OrbsHomePage from './orbs/page';
import OrbsBodyLayout from './orbs/layout';

export default function RootHomePage() {
	return (
		<OrbsBodyLayout>
			<OrbsHomePage />
		</OrbsBodyLayout>
	);
}
