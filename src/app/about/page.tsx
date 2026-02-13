'use client';

import { Title } from '@/components';
import { ChromeShowcaseCard } from '@/components/ChromeShowcaseCard';
import { ContentContainer } from './_components/ContentContainer';
import { SidebarContainer } from './_components/SidebarContainer';
import { GlassCard } from './_components/GlassCard';
import { Section } from './_components/Section';
import { SectionHeader } from './_components/SectionHeader';
import { LabeledValueRow } from './_components/LabeledValueRow';
import { TechPill } from './_components/TechPill';
import { TechCategoryGroup } from './_components/TechCategoryGroup';
import { copy, highlights, quickFacts, techCategories } from './_content';

export default function AboutPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<ContentContainer className='space-y-12'>
					<Title variant='page' className='mb-6'>
						{copy.title}
					</Title>

					<Section>
						<p className='text-xl leading-relaxed text-chrome-silver/90'>{copy.intro[0]}</p>
						<p className='text-lg leading-relaxed text-chrome-silver/70'>{copy.intro[1]}</p>
					</Section>

					<Section>
						<SectionHeader
							title={copy.sectionTitles.highlights}
							className='mb-8'
							dotClassName='bg-accent-blue animate-status-pulse shadow-[0_0_15px_rgba(59,130,246,1)]'
						/>

						<div className='grid grid-cols-1 gap-6'>
							{highlights.map((h, i) => (
								<ChromeShowcaseCard key={i} icon={h.icon} title={h.title} description={h.description} />
							))}
						</div>
					</Section>
				</ContentContainer>

				<SidebarContainer className='space-y-6'>
					<GlassCard title={copy.sectionTitles.quickFacts}>
						<div className='space-y-6 my-6'>
							{quickFacts.map(({ label, value }, i) => (
								<LabeledValueRow
									key={i}
									rowClassName='py-4 border-b border-quantum-purple/10 last:border-b-0'
									labelClassName='text-chrome-silver/60'
									valueClassName='bg-gradient-to-br from-accent-blue to-accent-cyan bg-clip-text text-transparent'
									{...{ label, value }}
								/>
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
				</SidebarContainer>
			</div>
		</main>
	);
}
