import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type CaseStudySectionProps = {
	label: string;
	content: string;
	/**
	 * 'md' — panel context: heading-2, body-md. (TimelineProjectPanel)
	 * 'sm' — compact/mobile context: heading-3 bold, body-sm. (ExpandedMobileCard)
	 */
	size?: 'sm' | 'md';
	className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CaseStudySection — labelled content block (heading + body paragraph).
 *
 * Shared pattern across panel and mobile detail views for The Challenge,
 * The Solution, etc. The size prop covers two layout contexts:
 *   'md' — TimelineProjectPanel (heading-2, full body text)
 *   'sm' — ExpandedMobileCard (heading-3 bold, small body text)
 */
export function CaseStudySection({ label, content, size = 'md', className }: CaseStudySectionProps) {
	if (size === 'sm') {
		return (
			<div className={cn('space-y-2', className)}>
				<h3 className='heading-3 font-bold text-primary'>{label}</h3>
				<p className='text-sm leading-relaxed text-secondary'>{content}</p>
			</div>
		);
	}

	return (
		<div className={cn('space-y-3', className)}>
			<h3 className='heading-2 text-primary'>{label}</h3>
			<p className='leading-relaxed text-secondary'>{content}</p>
		</div>
	);
}

export default CaseStudySection;
