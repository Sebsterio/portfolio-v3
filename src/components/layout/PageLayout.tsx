'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';

type PageLayoutVariant = 'default' | 'hero' | 'two-column' | 'centered';

type PageLayoutProps = {
	children: ReactNode;
	variant?: PageLayoutVariant;
	className?: string;
};

const CLASSES: Record<PageLayoutVariant, string> = {
	default: 'py-20',
	hero: 'min-h-[calc(100vh-140px)] flex items-center py-16',
	'two-column': 'py-20',
	centered: 'min-h-[calc(100vh-140px)] flex items-center justify-center py-16',
};

export const PageLayout = ({ children, variant = 'default', className }: PageLayoutProps) => {
	useTransitionReady();
	return <main className={cn(CLASSES[variant], className)}>{children}</main>;
};
