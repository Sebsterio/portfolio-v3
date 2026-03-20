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
 *
 * ProjectCardBack uses different styling (accent-cyan heading, mb-2 spacing)
 * and stays inline in that component.
 */
export function CaseStudySection({ label, content, size = 'md', className }: CaseStudySectionProps) {
	if (size === 'sm') {
		return (
			<div className={cn('space-y-2', className)}>
				<h3 className='heading-3 text-primary font-bold'>{label}</h3>
				<p className='text-secondary text-sm leading-relaxed'>{content}</p>
			</div>
		);
	}

	return (
		<div className={cn('space-y-3', className)}>
			<h3 className='heading-2 text-primary'>{label}</h3>
			<p className='text-secondary leading-relaxed'>{content}</p>
		</div>
	);
}

export default CaseStudySection;
