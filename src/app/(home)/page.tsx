'use client';

import { cn } from '@/lib/utils';
import { StatusBadge, Title, TextBlock, ShowcaseCard, LinkButton as Button } from '@/components';

import { copy, buttons, showcaseItems } from './_content';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';

type HomePageProps = {};

export default function HomePage({}: HomePageProps) {
	useTransitionReady();

	return (
		<div className={cn('w-full grid gap-20 items-center', 'grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]')}>
			{/* Left Column - Hero Content */}
			<div className=''>
				<StatusBadge className='vt-top'>{copy.superscript}</StatusBadge>

				<div className='space-y-12 vt-left'>
					<Title variant='hero' className='mb-8'>
						{copy.title}
					</Title>

					<TextBlock className='max-w-xl'>{copy.subtitle}</TextBlock>

					<div className='flex gap-5'>
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
			<div className='w-full space-y-6 vt-right'>
				{showcaseItems.map(({ id, icon, title, description }) => (
					<ShowcaseCard key={id} icon={icon} title={title} description={description} />
				))}
			</div>
		</div>
	);
}
