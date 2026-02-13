// TODO: mv these to src/components
import { ContentContainer } from '@/app/about/_components/ContentContainer';
import { SidebarContainer } from '@/app/about/_components/SidebarContainer';
import { LabeledValueRow } from '@/app/about/_components/LabeledValueRow';
import { Section } from '@/app/about/_components/Section';
import { GlassCard } from '@/app/about/_components/GlassCard';

import { Title } from '@/components/Title';

const copy = {
	title: 'Page in progress',
};
export function UnderConstructionPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<ContentContainer className='space-y-10'>
					<Title
						className='font-exo text-[clamp(48px,6vw,80px)] font-extrabold leading-tight tracking-[-0.02em]'
						highlightClassName='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue bg-clip-text text-transparent animate-gradient-shift'
					>
						{copy.title}
					</Title>

					<Section className='max-w-2xl'>
						<p className='text-xl leading-relaxed text-white/90'>This section of the site is currently being shaped and refined.</p>

						<p className='text-lg leading-relaxed text-white/70'>
							I'm crafting something meaningful here — when it's ready, it will reflect the same care, precision, and visual language as the
							rest of the portfolio.
						</p>

						<p className='text-lg leading-relaxed text-white/70'>Please check back soon.</p>
					</Section>
				</ContentContainer>

				<SidebarContainer>
					<GlassCard
						className='p-8 bg-[rgba(5,5,10,0.7)] backdrop-blur-[40px] backdrop-saturate-[180%] border border-quantum-purple/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(178,75,243,0.1),inset_0_1px_0_rgba(178,75,243,0.2)]'
						overlayStyle={{
							background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)',
						}}
					>
						<div className='space-y-6'>
							<h3 className='font-exo text-lg font-bold text-white'>Status</h3>

							<LabeledValueRow
								label='State'
								value='Under construction'
								rowClassName='py-4 border-b border-quantum-purple/10'
								labelClassName='text-white/60'
								valueClassName='bg-gradient-to-br from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'
							/>

							<LabeledValueRow
								label='ETA'
								value='Coming soon'
								rowClassName='py-4'
								labelClassName='text-white/60'
								valueClassName='bg-gradient-to-br from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'
							/>
						</div>
					</GlassCard>
				</SidebarContainer>
			</div>
		</main>
	);
}
