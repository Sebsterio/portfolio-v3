'use client';

import { useTransitionReady } from './TransitionProvider';

export function PageTransition({ children }: { children: React.ReactNode }) {
	useTransitionReady();

	return <>{children}</>;
}
