'use client';

import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/StatusBadge';
import { PageTitle } from '@/components/PageTitle';
import { ChromeButton } from '@/components/ChromeButton';
import { ChromeShowcaseCard } from '@/components/ChromeShowcaseCard';
import { HeroContainer } from './_components/HeroContainer';
import { SidePanelContainer } from './_components/SidePanelContainer';
import { copy, buttons, showcaseItems } from './_content';

export default function HomePage() {
	return (
		<section className='min-h-[calc(100vh-140px)] flex items-center py-16'>
			<div className={cn('w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center')}>
				<div>
					<HeroContainer>
						<StatusBadge>{copy.superscript}</StatusBadge>

						<PageTitle
							className='font-urbanist text-[clamp(64px,8vw,110px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-8'
							lineClassName='bg-clip-text text-transparent'
							normalStyle={{
								backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 20%, #b8b8b8 50%, #888888 51%, #b8b8b8 80%, #ffffff 100%)',
							}}
							highlightStyle={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}
							/* TODO: animate bg (update these colors)
							highlightClassName='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue animate-gradient-shift'
							highlightStyle={{ backgroundSize: '200% 200%' }} */
						>
							{copy.title}
						</PageTitle>

						<p className='text-lg leading-relaxed text-chrome-silver/65 mb-12 max-w-xl'>{copy.subtitle}</p>
					</HeroContainer>

					<div className='flex gap-5 animate-[slideUp_1s_ease-out_1.2s_backwards]'>
						<ChromeButton variant='primary'>{buttons.primary.text}</ChromeButton>
						<ChromeButton variant='secondary'>{buttons.secondary.text}</ChromeButton>
					</div>
				</div>

				<div className='flex justify-center lg:justify-end w-full'>
					<SidePanelContainer className={'relative w-full h-full p-10 flex flex-col gap-6'}>
						{showcaseItems.map(({ id, icon, title, description }) => (
							<ChromeShowcaseCard key={id} icon={icon} title={title} description={description} />
						))}
					</SidePanelContainer>
				</div>
			</div>
		</section>
	);
}
