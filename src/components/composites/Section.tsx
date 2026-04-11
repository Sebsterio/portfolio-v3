import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '../primitives/SectionHeader';

type SectionProps = {
	children: ReactNode;
	/**
	 * Optional section heading. When provided, renders a SectionHeader above
	 * children and applies stack-lg spacing between header and content.
	 */
	title?: string;
	className?: string;
};

/**
 * Section — semantic section wrapper with optional titled header.
 *
 * When `title` is provided, renders a SectionHeader and manages the
 * heading-to-content gap via stack-lg (space-y-8 = 32px), which is
 * the same as the previous pattern of `mb-8` on SectionHeader directly.
 *
 * When no title, acts as a plain `<section>` wrapper.
 */
export const Section = ({ children, title, className }: SectionProps) => {
	return (
		<section className={cn(title && 'stack-lg', className)}>
			{title && <SectionHeader title={title} />}
			{children}
		</section>
	);
};

export default Section;
