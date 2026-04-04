'use client';

import { cn } from '@/lib/utils';
import { StatusBadge, Title, TextBlock, ShowcaseCard, LinkButton as Button } from '@/components';

import { copy, buttons, showcaseItems } from './_content';
import { useTransitionReady } from '@/lib/transitions/components/TransitionProvider';
import { VT } from '@/lib/transitions/components/TransitionSlot';

type HomePageProps = Record<string, never>;

export default function HomePage({}: HomePageProps) {
	useTransitionReady();

	return (
		<div className={cn('grid w-full grid-cols-1 gap-10 md:gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20')}>
			{/* Left Column - Hero Content */}

			<div className='mt-4 stack-lg md:mt-6'>
				<VT as={StatusBadge} slot='vt-top' className='enter-top' /* HACK: Prevents flash */>
					{copy.superscript}
				</VT>
				<VT.Div slot='vt-left' className='stack-2xl'>
					<Title variant='hero'>{copy.title}</Title>
					<TextBlock className='max-w-lg md:max-w-xl'>{copy.subtitle}</TextBlock>

					<div className='flex flex-wrap gap-5'>
						<Button href={buttons.primary.href} variant='cta' size='lg'>
							{buttons.primary.text}
						</Button>
						<Button href={buttons.secondary.href} variant='secondary' size='lg'>
							{buttons.secondary.text}
						</Button>
					</div>
				</VT.Div>
			</div>

			{/* Right Column - Showcase Cards */}

			<VT.Area slot='max-lg:vt-right lg:vt-main'>
				<div className='w-full space-y-4 md:space-y-6'>
					{showcaseItems.map(({ id, icon, title, description }) => (
						<ShowcaseCard key={id} icon={icon} title={title} description={description} />
					))}
				</div>
			</VT.Area>
		</div>
	);
}
