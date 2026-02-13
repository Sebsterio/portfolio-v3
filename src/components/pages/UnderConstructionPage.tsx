import { Title, TextBlock, LabeledValueRow, GlassCard } from '@/components';
import { copy } from './_content';

export function UnderConstructionPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<div className='space-y-10'>
					<Title variant='page' className='mb-6'>
						{copy.title}
					</Title>
					<TextBlock className='max-w-2xl' highlightFirstParagraph>
						{copy.text}
					</TextBlock>
				</div>

				<div>
					<GlassCard title={copy.cardTitle}>
						<div className='space-y-6 my-6'>
							{copy.cardRows.map(({ label, value }) => (
								<LabeledValueRow key={label} {...{ label, value }} />
							))}
						</div>
					</GlassCard>
				</div>
			</div>
		</main>
	);
}
