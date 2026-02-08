'use client';

import { QuantumBackground, QuantumHeader, QuantumHero, QuantumDataPanel, QuantumButton } from '@/components';

export default function HomePage() {
	return (
		<div className='relative min-h-screen bg-black overflow-hidden'>
			<QuantumBackground />

			{/* Main Content */}
			<div className='relative z-10 container max-w-[1400px] mx-auto px-10'>
				{/* Header Navigation */}
				<QuantumHeader />

				{/* Hero Section */}
				<section className='min-h-[calc(100vh-180px)] flex items-center py-20'>
					<div className='grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center w-full'>
						{/* Left Column - Hero Content */}
						<div>
							<QuantumHero />

							{/* CTA Buttons */}
							<div className='flex gap-6 mt-12 animate-[slideUp_1s_ease-out_1.2s_backwards]'>
								<QuantumButton variant='primary'>View Portfolio</QuantumButton>
								<QuantumButton variant='secondary'>Start Project</QuantumButton>
							</div>
						</div>

						{/* Right Column - Data Panel */}
						<div className='flex justify-center lg:justify-end w-full'>
							<QuantumDataPanel />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
