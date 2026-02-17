'use client';

import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { StatusBadge, Title, TextBlock, ShowcaseCard, Button, PageLayout } from '@/components';

import { copy, buttons, showcaseItems } from './_content';

type HomePageProps = {};

export default function HomePage({}: HomePageProps) {
	const { navigate } = useTransitionRouter();

	return (
		<PageLayout variant='hero'>
			<div className={cn('w-full grid gap-20 items-center', 'grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]')}>
				{/* Left Column - Hero Content */}
				<div className={cn('space-y-12', 'vt-left')}>
					<div>
						<StatusBadge className='mb-10'>{copy.superscript}</StatusBadge>
						<Title variant='hero' className='mb-8'>
							{copy.title}
						</Title>
						<TextBlock className='max-w-xl'>{copy.subtitle}</TextBlock>
					</div>
					<div className='flex gap-5'>
						<Button onClick={() => navigate(buttons.primary.href)} variant='primary'>
							{buttons.primary.text}
						</Button>
						<Button onClick={() => navigate(buttons.secondary.href)} variant='secondary'>
							{buttons.secondary.text}
						</Button>
					</div>
				</div>

				{/* Right Column - Showcase Cards */}
				<div className={cn('flex justify-center lg:justify-end w-full', 'vt-right')}>
					<div className='w-full space-y-6'>
						{showcaseItems.map(({ id, icon, title, description }) => (
							<ShowcaseCard key={id} icon={icon} title={title} description={description} />
						))}
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
