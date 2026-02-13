'use client';

import { PageTransitionContainer } from '@/components/animation/PageTransitionContainer';

type TemplateProps = {
	children: React.ReactNode;
};

// This file is required by Next.js App Router
// to enable page transitions via Framer Motion.

export default function Template({ children }: TemplateProps) {
	return <PageTransitionContainer>{children}</PageTransitionContainer>;
}
