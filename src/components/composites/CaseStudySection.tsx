import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type CaseStudySectionProps = PropsWithChildren<{
	label: string;
	content?: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}>;

const CLASSES = {
	sm: {
		container: 'space-y-2',
		label: 'heading-3 font-bold',
		content: 'text-sm ',
	},
	md: {
		container: 'space-y-3',
		label: 'heading-2',
		content: '',
	},
	lg: {
		container: 'space-y-4',
		label: 'heading-2',
		content: '',
	},
};

/**
 * CaseStudySection — labelled content block (heading + body paragraph).
 */
export function CaseStudySection({ label, content, size = 'md', className, children }: CaseStudySectionProps) {
	const c = CLASSES[size];

	return (
		<div className={cn(c.container, className)}>
			<h3 className={cn(c.label, 'text-primary')}>{label}</h3>
			{content && <p className={cn(c.content, 'leading-relaxed text-secondary')}> {content}</p>}
			{children}
		</div>
	);
}

export default CaseStudySection;
