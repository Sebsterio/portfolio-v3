import { Title, TextBlock } from '@/components';

// TODO: mv these to src/components
import { ContentContainer } from '@/app/about/_components/ContentContainer';
import { SidebarContainer } from '@/app/about/_components/SidebarContainer';
import { LabeledValueRow } from '@/app/about/_components/LabeledValueRow';
import { GlassCard } from '@/app/about/_components/GlassCard';

const copy = {
	title: '*Page in progress',
	text: [
		'This section of the site is currently being shaped and refined.',
		"I'm crafting something meaningful here — when it's ready, it will reflect the same care, precision, and visual language as the rest of the portfolio.",
		'Please check back soon.',
	],
	cardTitle: 'Status',
	cardRows: [
		{ label: 'State', value: 'Under construction' },
		{ label: 'ETA', value: 'Coming soon' },
	],
};
export function UnderConstructionPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<ContentContainer className='space-y-10'>
					<Title variant='page' className='mb-6'>
						{copy.title}
					</Title>

					<TextBlock className='max-w-2xl' highlightFirstParagraph>
						{copy.text}
					</TextBlock>
				</ContentContainer>

				<SidebarContainer>
					<GlassCard title={copy.cardTitle}>
						<div className='space-y-6 my-6'>
							{copy.cardRows.map(({ label, value }) => (
								<LabeledValueRow key={label} {...{ label, value }} />
							))}
						</div>
					</GlassCard>
				</SidebarContainer>
			</div>
		</main>
	);
}
