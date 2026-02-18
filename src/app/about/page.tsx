'use client';

import {
	Title,
	TextBlock,
	ShowcaseCard,
	GlassCard,
	Section,
	SectionHeader,
	LabeledValueRow,
	TechPill,
	TechCategoryGroup,
} from '@/components';
import { copy, highlights, quickFacts, techCategories } from './_content';
import { cn } from '@/lib/utils';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';

type AboutPageProps = {};

export default function AboutPage({}: AboutPageProps) {
	useTransitionReady();

	return (
		<div className='w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
			{/* Main Content Column */}
			<div className='space-y-12 vt-left'>
				<Title variant='page' className='mb-6'>
					{copy.title}
				</Title>

				<TextBlock highlightFirstParagraph>{copy.intro}</TextBlock>

				<Section /* className='vt-bottom' - GLITCH: page flash */>
					<SectionHeader title={copy.sectionTitles.highlights} className='mb-8' />

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
						{highlights.map((h, i) => (
							<ShowcaseCard key={i} icon={h.icon} title={h.title} description={h.description} />
						))}
					</div>
				</Section>
			</div>

			{/* Sidebar Column */}
			<div className={cn('space-y-6', 'vt-right')}>
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
							<TechCategoryGroup key={category} label={category}>
								{techs.map((t) => (
									<TechPill key={t}>{t}</TechPill>
								))}
							</TechCategoryGroup>
						))}
					</div>
				</GlassCard>
			</div>
		</div>
	);
}
