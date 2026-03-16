'use client';

import { cn } from '@/lib/utils';
import { StatusBadge, Title, TextBlock, ShowcaseCard, LinkButton as Button } from '@/components';

import { copy, buttons, showcaseItems } from './_content';
import { useTransitionReady } from '@/lib/transitions/components/TransitionProvider';

type HomePageProps = Record<string, never>;

export default function HomePage({}: HomePageProps) {
	useTransitionReady();

	return (
		<div className={cn('grid w-full grid-cols-1 items-center gap-14 md:gap-20 lg:grid-cols-[1.2fr_0.8fr]')}>
			{/* Left Column - Hero Content */}
			<div className=''>
				<StatusBadge className='mb-7 vt-top md:mb-9'>{copy.superscript}</StatusBadge>

				<div className='space-y-8 vt-left md:space-y-12'>
					<Title variant='hero' className='mb-8'>
						{copy.title}
					</Title>

					<TextBlock className='max-w-lg md:max-w-xl'>{copy.subtitle}</TextBlock>

					<div className='flex flex-wrap gap-5'>
						<Button href={buttons.primary.href} variant='primary'>
							{buttons.primary.text}
						</Button>
						<Button href={buttons.secondary.href} variant='secondary'>
							{buttons.secondary.text}
						</Button>
					</div>
				</div>
			</div>

			{/* Right Column - Showcase Cards */}
			<div className={cn('vt-right lg:vt-main', 'w-full space-y-4 md:space-y-6')}>
				{showcaseItems.map(({ id, icon, title, description }) => (
					<ShowcaseCard key={id} icon={icon} title={title} description={description} />
				))}
			</div>
		</div>
	);
}
