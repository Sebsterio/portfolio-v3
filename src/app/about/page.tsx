'use client';

import { Title, TextBlock, ShowcaseCard, InfoCard, Section, LabeledValueRow, TechCategoryGroup } from '@/components';
import { copy, highlights, quickFacts, techCategories } from './_content';
import { cn } from '@/lib/utils';
import { useTransitionReady } from '@/lib/transitions/components/TransitionProvider';
import { ProjectTags } from '@/components/ProjectTags';
import { VT } from '@/lib/transitions/components/TransitionSlot';

type AboutPageProps = Record<string, never>;

export default function AboutPage({}: AboutPageProps) {
	useTransitionReady();

	return (
		<div className={cn('grid w-full grid-cols-1 lg:grid-cols-[1fr_400px]', 'gap-10 md:gap-12 lg:gap-16')}>
			{/* Main Content Column */}

			<VT.Area classes='vt-left'>
				<div className='stack-2xl'>
					<Title variant='page'>{copy.title}</Title>

					<TextBlock highlightFirstParagraph>{copy.intro}</TextBlock>

					<Section title={copy.sectionTitles.highlights} /* 'vt-bottom' -> GLITCH: page flash */>
						<div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2', 'gap-4 md:gap-6')}>
							{highlights.map((h, i) => (
								<ShowcaseCard key={i} icon={h.icon} title={h.title} description={h.description} />
							))}
						</div>
					</Section>
				</div>
			</VT.Area>

			{/* Sidebar Column */}

			<VT.Area classes='vt-right lg:vt-main'>
				<div className='stack-md'>
					<InfoCard title={copy.sectionTitles.quickFacts}>
						<div className='space-y-4 md:space-y-6 md:pb-2'>
							{quickFacts.map(({ label, value }) => (
								<LabeledValueRow key={label} {...{ label, value }} />
							))}
						</div>
					</InfoCard>

					<InfoCard title={copy.sectionTitles.techStack}>
						<div className='space-y-6 pb-2 md:space-y-8 md:pb-4'>
							{techCategories.map(({ category, techs }) => (
								<TechCategoryGroup key={category} label={category}>
									<ProjectTags variant='muted' size='md' tags={techs} />
								</TechCategoryGroup>
							))}
						</div>
					</InfoCard>
				</div>
			</VT.Area>
		</div>
	);
}
