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
import { useTransitionReady } from '@/lib/transitions/components/TransitionProvider';

type AboutPageProps = Record<string, never>;

export default function AboutPage({}: AboutPageProps) {
	useTransitionReady();

	return (
		<div
			className={cn(
				'w-full grid grid-cols-1 lg:grid-cols-[1fr_400px]',
				'gap-10 md:gap-12 lg:gap-16', //
			)}
		>
			{/* Main Content Column */}
			<div className='vt-left space-y-10 md:space-y-12'>
				<Title variant='page' className='mb-4 md:mb-6'>
					{copy.title}
				</Title>

				<TextBlock highlightFirstParagraph>{copy.intro}</TextBlock>

				<Section /* className='vt-bottom' - GLITCH: page flash */>
					<SectionHeader title={copy.sectionTitles.highlights} className='mb-8' />

					<div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2', 'gap-4 md:gap-6')}>
						{highlights.map((h, i) => (
							<ShowcaseCard key={i} icon={h.icon} title={h.title} description={h.description} />
						))}
					</div>
				</Section>
			</div>

			{/* Sidebar Column */}
			<div className={cn('space-y-5 md:space-y-6', 'vt-right lg:vt-main')}>
				<GlassCard title={copy.sectionTitles.quickFacts}>
					<div className='space-y-4 md:space-y-6 my-5 md:my-6'>
						{quickFacts.map(({ label, value }) => (
							<LabeledValueRow key={label} {...{ label, value }} />
						))}
					</div>
				</GlassCard>

				<GlassCard title={copy.sectionTitles.techStack}>
					<div className='space-y-6 md:space-y-8 my-6 md:my-8'>
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
