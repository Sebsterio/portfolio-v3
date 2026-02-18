'use client';

import { cn } from '@/lib/utils';
import { StatusBadge, Title, TextBlock, ShowcaseCard, LinkButton as Button } from '@/components';

import { copy, buttons, showcaseItems } from './_content';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';

type HomePageProps = {};

export default function HomePage({}: HomePageProps) {
	useTransitionReady();

	return (
		<div className={cn('w-full grid items-center gap-14 md:gap-20 grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]')}>
			{/* Left Column - Hero Content */}
			<div className=''>
				<StatusBadge className='vt-top mb-7 md:mb-9'>{copy.superscript}</StatusBadge>

				<div className='vt-left space-y-8 md:space-y-12'>
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
			<div className='vt-right w-full space-y-4 md:space-y-6'>
				{showcaseItems.map(({ id, icon, title, description }) => (
					<ShowcaseCard key={id} icon={icon} title={title} description={description} />
				))}
			</div>
		</div>
	);
}
