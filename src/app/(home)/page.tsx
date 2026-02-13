'use client';

import { cn } from '@/lib/utils';
import { StatusBadge, Title, TextBlock, ChromeShowcaseCard, ChromeButton } from '@/components';

import { copy, buttons, showcaseItems } from './_content';

export default function HomePage() {
	return (
		<main className='min-h-[calc(100vh-140px)] flex items-center py-16'>
			<div className={cn('w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center')}>
				<div className='space-y-12'>
					<div>
						<StatusBadge>{copy.superscript}</StatusBadge>
						<Title variant='hero' className='mb-8'>
							{copy.title}
						</Title>
						<TextBlock className='max-w-xl'>{copy.subtitle}</TextBlock>
					</div>

					<div className='flex gap-5 animate-[slideUp_1s_ease-out_1.2s_backwards]'>
						<ChromeButton variant='primary'>{buttons.primary.text}</ChromeButton>
						<ChromeButton variant='secondary'>{buttons.secondary.text}</ChromeButton>
					</div>
				</div>

				<div className='flex justify-center lg:justify-end w-full'>
					<div className={'relative w-full h-full p-10 space-y-6'}>
						{showcaseItems.map(({ id, icon, title, description }) => (
							<ChromeShowcaseCard key={id} icon={icon} title={title} description={description} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
