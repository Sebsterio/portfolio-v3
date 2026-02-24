'use client';

import { cn } from '@/lib/utils';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { Title, TextBlock, LabeledValueRow, GlassCard } from '@/components';
import { copy } from './_content';

export function UnderConstructionPage() {
	useTransitionReady();

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12'>
			<div className='space-y-10 vt-left'>
				<Title variant='page' className='mb-6'>
					{copy.title}
				</Title>
				<TextBlock className='max-w-2xl' highlightFirstParagraph>
					{copy.text}
				</TextBlock>
			</div>

			<div className={cn('vt-right lg:vt-main', 'mt-8')}>
				<GlassCard title={copy.cardTitle}>
					<div className='space-y-6 my-6'>
						{copy.cardRows.map(({ label, value }) => (
							<LabeledValueRow key={label} {...{ label, value }} />
						))}
					</div>
				</GlassCard>
			</div>
		</div>
	);
}
