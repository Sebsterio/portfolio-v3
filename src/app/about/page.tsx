'use client';

import {
	Title,
	TextBlock,
	ChromeShowcaseCard,
	GlassCard,
	Section,
	SectionHeader,
	LabeledValueRow,
	TechPill,
	TechCategoryGroup,
} from '@/components';
import { copy, highlights, quickFacts, techCategories } from './_content';

export default function AboutPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<div className='space-y-12'>
					<Title variant='page' className='mb-6'>
						{copy.title}
					</Title>
					<TextBlock highlightFirstParagraph>{copy.intro}</TextBlock>
					<Section>
						<SectionHeader
							title={copy.sectionTitles.highlights}
							className='mb-8'
							dotClassName='bg-accent-blue animate-status-pulse shadow-[0_0_15px_rgba(59,130,246,1)]' // TODO
						/>

						<div className='grid grid-cols-1 gap-6'>
							{highlights.map((h, i) => (
								<ChromeShowcaseCard key={i} icon={h.icon} title={h.title} description={h.description} />
							))}
						</div>
					</Section>
				</div>

				<div className='space-y-6'>
					<GlassCard title={copy.sectionTitles.quickFacts}>
						<div className='space-y-6 my-6'>
							{quickFacts.map(({ label, value }) => (
								<LabeledValueRow key={label} {...{ label, value }} />
							))}
						</div>
					</GlassCard>

					<GlassCard title={copy.sectionTitles.techStack}>
						<div className='space-y-8 my-8'>
							{techCategories.map(({ category, techs }) => (
								<TechCategoryGroup key={category} label={category} labelClassName='text-accent-blue'>
									{techs.map((t) => (
										<TechPill key={t} className='bg-accent-blue/10 border border-accent-blue/20 text-chrome-silver/800'>
											{t}
										</TechPill>
									))}
								</TechCategoryGroup>
							))}
						</div>
					</GlassCard>
				</div>
			</div>
		</main>
	);
}
