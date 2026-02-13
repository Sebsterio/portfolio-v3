import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageLayoutVariant = 'default' | 'hero' | 'two-column' | 'centered';

type PageLayoutProps = {
	children: ReactNode;
	variant?: PageLayoutVariant;
	className?: string;
};

const CLASSES = {
	default: 'py-20',
	hero: 'min-h-[calc(100vh-140px)] flex items-center py-16',
	'two-column': 'py-20',
	centered: 'min-h-[calc(100vh-140px)] flex items-center justify-center py-16',
};

export const PageLayout = ({ children, variant = 'default', className }: PageLayoutProps) => {
	return <main className={cn(CLASSES[variant], className)}>{children}</main>;
};

export default PageLayout;
