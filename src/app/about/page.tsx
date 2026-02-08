'use client';

import { QuantumShowcaseCard } from '@/components/QuantumShowcaseCard';
import { copy, highlights, quickFacts, techCategories } from './_content';
import { ContentContainer } from './_components/ContentContainer';
import { SidebarContainer } from './_components/SidebarContainer';
import { PageTitle } from '@/components';
import { cn } from '@/lib/utils';

function Card({
	children,
	className,
	overlayClassName,
	overlayStyle,
}: {
	children: React.ReactNode;
	className?: string;
	overlayClassName?: string;
	overlayStyle?: React.CSSProperties;
}) {
	return (
		<div className={cn('relative rounded-[28px] overflow-hidden', className)}>
			<div className={cn('absolute inset-0 rounded-[28px] pointer-events-none', overlayClassName)} style={overlayStyle} />
			<div className='relative z-10'>{children}</div>
		</div>
	);
}
function GlassCard({
	children,
	className,
	title,
	overlayClassName,
	overlayStyle,
}: {
	children: React.ReactNode;
	className?: string;
	title?: string;
	overlayClassName?: string;
	overlayStyle?: React.CSSProperties;
}) {
	return (
		<Card
			className={cn(
				'p-8',
				'bg-[rgba(5,5,10,0.7)] backdrop-blur-[40px] backdrop-saturate-[180%]',
				'border border-quantum-purple/10',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(178,75,243,0.1),inset_0_1px_0_rgba(178,75,243,0.2)]',
				className
			)}
			overlayClassName={overlayClassName}
			overlayStyle={{
				background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)',
				...overlayStyle,
			}}
		>
			{title && <h3 className='font-exo text-lg font-bold text-white'>{title}</h3>}
			{children}
		</Card>
	);
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
	return <section className={cn('space-y-6', className)}>{children}</section>;
}

function SectionHeader({ title, className, dotClassName }: { title: string; className?: string; dotClassName?: string }) {
	return (
		<h2 className={cn('font-exo text-2xl font-bold flex items-center gap-3', className)}>
			<span className={cn('w-2 h-2 rounded-full', dotClassName)} />
			{title}
		</h2>
	);
}

function LabeledValueRow({
	label,
	value,
	rowClassName,
	labelClassName,
	valueClassName,
}: {
	label: string;
	value: string;
	rowClassName?: string;
	labelClassName?: string;
	valueClassName?: string;
}) {
	return (
		<div className={cn('flex justify-between items-center', rowClassName)}>
			<span className={cn('text-sm uppercase tracking-wider', labelClassName)}>{label}</span>
			<span className={cn('font-exo text-lg font-bold', valueClassName)}>{value}</span>
		</div>
	);
}

function TechPill({ children, className }: { children: React.ReactNode; className?: string }) {
	return <span className={cn('px-3 py-1.5 rounded-lg text-xs font-source-code', className)}>{children}</span>;
}

function TechCategoryGroup({
	label,
	children,
	labelClassName,
	containerClassName,
}: {
	label: string;
	children: React.ReactNode;
	labelClassName?: string;
	containerClassName?: string;
}) {
	return (
		<div>
			<h4 className={cn('text-xs uppercase tracking-wider mb-3 font-semibold', labelClassName)}>{label}</h4>
			<div className={cn('flex flex-wrap gap-2', containerClassName)}>{children}</div>
		</div>
	);
}

export default function AboutPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<ContentContainer className='space-y-12'>
					<PageTitle
						className='font-exo text-[clamp(48px,6vw,80px)] font-extrabold leading-tight tracking-[-0.02em] mb-6'
						highlightClassName='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue bg-clip-text text-transparent animate-gradient-shift'
					>
						{copy.title}
					</PageTitle>

					<Section>
						<p className='text-xl leading-relaxed text-white/90'>{copy.intro[0]}</p>
						<p className='text-lg leading-relaxed text-white/70'>{copy.intro[1]}</p>
					</Section>

					<Section>
						<SectionHeader title={copy.sectionTitles.highlights} className='mb-8' dotClassName='bg-quantum-purple animate-status-pulse' />

						<div className='grid grid-cols-1 gap-6'>
							{highlights.map((h, i) => (
								<QuantumShowcaseCard key={i} icon={h.icon} title={h.title} description={h.description} />
							))}
						</div>
					</Section>
				</ContentContainer>

				<SidebarContainer className='space-y-6'>
					<GlassCard title={copy.sectionTitles.quickFacts}>
						<div className='space-y-6 my-6'>
							{quickFacts.map(({ label, value }, i) => (
								<LabeledValueRow
									{...{ label, value, key: i }}
									rowClassName='py-4 border-b border-quantum-purple/10 last:border-b-0'
									labelClassName='text-white/60'
									valueClassName='bg-gradient-to-br from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'
								/>
							))}
						</div>
					</GlassCard>

					<GlassCard title={copy.sectionTitles.techStack}>
						<div className='space-y-8 my-8'>
							{techCategories.map(({ category, techs }) => (
								<TechCategoryGroup key={category} label={category} labelClassName='text-quantum-purple'>
									{techs.map((t) => (
										<TechPill key={t} className='bg-quantum-purple/10 border border-quantum-purple/20 text-white/80'>
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
