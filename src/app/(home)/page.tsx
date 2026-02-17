'use client';

import { cn } from '@/lib/utils';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { StatusBadge, Title, TextBlock, ChromeShowcaseCard, ChromeButton, PageLayout } from '@/components';

import { copy, buttons, showcaseItems } from './_content';

type HomePageProps = {};

export default function HomePage({}: HomePageProps) {
	const { navigate } = useTransitionRouter();

	return (
		<PageLayout variant='hero'>
			<div className={cn('w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center')}>
				{/* Left Column - Hero Content */}
				<div className='space-y-12'>
					<div>
						<StatusBadge className='mb-10'>{copy.superscript}</StatusBadge>
						<Title variant='hero' className='mb-8'>
							{copy.title}
						</Title>
						<TextBlock className='max-w-xl'>{copy.subtitle}</TextBlock>
					</div>
					<div className='flex gap-5'>
						<ChromeButton onClick={() => navigate('/')} variant='primary'>
							{buttons.primary.text}
						</ChromeButton>
						<ChromeButton onClick={() => navigate('/about')} variant='secondary'>
							{buttons.secondary.text}
						</ChromeButton>
					</div>
				</div>

				{/* Right Column - Showcase Cards */}
				<div className='flex justify-center lg:justify-end w-full'>
					<div className='w-full space-y-6'>
						{showcaseItems.map(({ id, icon, title, description }) => (
							<ChromeShowcaseCard key={id} icon={icon} title={title} description={description} />
						))}
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
