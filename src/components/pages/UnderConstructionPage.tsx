'use client';

import { useTransitionReady } from '@/lib/transitions/components/TransitionProvider';
import { Title, TextBlock, LabeledValueRow, InfoCard } from '@/components';
import { copy } from './_content';
import { VT } from '@/lib/transitions/components/TransitionSlot';

export function UnderConstructionPage() {
	useTransitionReady();

	return (
		<div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]'>
			<VT.Div classes='vt-left' className='stack-2xl'>
				<Title variant='page'>{copy.title}</Title>
				<TextBlock className='max-w-2xl' highlightFirstParagraph>
					{copy.text}
				</TextBlock>
			</VT.Div>

			<VT.Area classes='vt-right lg:vt-main'>
				<InfoCard title={copy.cardTitle}>
					<div className='my-6 space-y-6'>
						{copy.cardRows.map(({ label, value }) => (
							<LabeledValueRow key={label} {...{ label, value }} />
						))}
					</div>
				</InfoCard>
			</VT.Area>
		</div>
	);
}
