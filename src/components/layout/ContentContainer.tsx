import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContentContainerProps = {
	children: ReactNode;
	className?: string;
};

/**
 * ContentContainer - Wrapper for page content
 *
 * Responsibilities:
 * - Provides max-width constraint
 * - Centers content
 * - Provides horizontal padding
 * - Theme-agnostic
 */
export const ContentContainer = ({ children, className }: ContentContainerProps) => {
	return <div className={cn('max-w-[1400px] mx-auto px-10', className)}>{children}</div>;
};

export default ContentContainer;
