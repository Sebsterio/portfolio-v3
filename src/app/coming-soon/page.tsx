import PageBG from '@/components/backgrounds/OrbsAndGridBG/OrbsAndGridBG';
import ComingSoonContent from './components/ComingSoonContent/ComingSoonContent';

import '@/styles/theme-A/common.css';
import '@/styles/theme-A/page.css';

export default function ComingSoonPage() {
	return (
		<main className='page-bg relative'>
			<PageBG />
			<ComingSoonContent />
		</main>
	);
}
