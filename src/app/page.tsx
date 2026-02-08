'use client';

import { cn } from '@/lib/utils';
import { QuantumStatusBadge } from '@/components/QuantumStatusBadge';
import { QuantumShowcaseCard } from '@/components/QuantumShowcaseCard';
import { QuantumButton } from '@/components';
import { HeroContainer } from './_components/HeroContainer';
import { PageTitle } from '../components/PageTitle';
import { SidePanelContainer } from './_components/SidePanelContainer';
import { copy, buttons, showcaseItems } from './_content';

export default function HomePage() {
	return (
		<section className='min-h-[calc(100vh-180px)] flex items-center py-20'>
			<div className={cn('w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center')}>
				<div>
					<HeroContainer>
						<QuantumStatusBadge>{copy.superscript}</QuantumStatusBadge>

						<PageTitle
							className='font-exo text-[clamp(56px,8vw,110px)] font-extrabold leading-[1.1] tracking-[-0.02em] uppercase mb-8'
							highlightClassName='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue bg-clip-text text-transparent animate-gradient-shift'
							highlightStyle={{ backgroundSize: '200% 200%' }}
						>
							{copy.title}
						</PageTitle>

						<p className='text-xl leading-relaxed text-white/70 max-w-xl'>{copy.subtitle}</p>
					</HeroContainer>

					<div className='flex gap-6 mt-12 animate-[slideUp_1s_ease-out_1.2s_backwards]'>
						<QuantumButton variant='primary'>{buttons.primary.text}</QuantumButton>
						<QuantumButton variant='secondary'>{buttons.secondary.text}</QuantumButton>
					</div>
				</div>

				<div className='flex justify-center lg:justify-end w-full'>
					<SidePanelContainer>
						<div className={cn('relative w-full h-full p-10 flex flex-col gap-6')}>
							{showcaseItems.map(({ id, icon, title, description }) => (
								<QuantumShowcaseCard key={id} icon={icon} title={title} description={description} />
							))}
						</div>
					</SidePanelContainer>
				</div>
			</div>
		</section>
	);
}
