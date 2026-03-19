'use client';

import { cn } from '@/lib/utils';
import { useTransitionReady } from '@/lib/transitions/components/TransitionProvider';
import { Title, TextBlock, LabeledValueRow, InfoCard } from '@/components';
import { copy } from './_content';

export function UnderConstructionPage() {
	useTransitionReady();

	return (
		<div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]'>
			<div className='stack-2xl vt-left'>
				<Title variant='page' className='mb-6'>
					{copy.title}
				</Title>
				<TextBlock className='max-w-2xl' highlightFirstParagraph>
					{copy.text}
				</TextBlock>
			</div>

			<div className={cn('vt-right lg:vt-main', 'mt-8')}>
				<InfoCard title={copy.cardTitle}>
					<div className='my-6 space-y-6'>
						{copy.cardRows.map(({ label, value }) => (
							<LabeledValueRow key={label} {...{ label, value }} />
						))}
					</div>
				</InfoCard>
			</div>
		</div>
	);
}
