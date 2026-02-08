'use client';

import { QuantumBackground, QuantumHeader, QuantumHero, QuantumButton } from '@/components';
// import { QuantumMetricsGrid } from '@/components';

import { ShowcaseCards } from './_components/ShowcaseCards';
import { LandingPageLayout } from './_components/LandingPageLayout';

export default function HomePage() {
	return (
		<LandingPageLayout
			backgroundJsx={<QuantumBackground />}
			headerJsx={<QuantumHeader />}
			heroJsx={
				<div>
					<QuantumHero />
					<div className='flex gap-6 mt-12 animate-[slideUp_1s_ease-out_1.2s_backwards]'>
						<QuantumButton variant='primary'>View Portfolio</QuantumButton>
						<QuantumButton variant='secondary'>Start Project</QuantumButton>
					</div>
				</div>
			}
			panelJsx={
				// <QuantumMetricsGrid/>
				<ShowcaseCards />
			}
		/>
	);
}
