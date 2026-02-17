'use client';

import { useCallback } from 'react';
import { usePageTransition, usePageTransitionState } from './TransitionProvider';
import type { NavigationConfig } from './types';

const SCROLL_RESTORATION_DELAY = 500;

export const useTransitionRouter = () => {
	const { navigate: baseNavigate, back, forward, replace, prefetch } = usePageTransition();
	const state = usePageTransitionState();

	const navigate = useCallback(
		async (href: string, config?: NavigationConfig) => {
			if (config?.condition === false) return;
			if (config?.prefetch) prefetch(href);
			if (config?.delay) await new Promise((resolve) => setTimeout(resolve, config.delay));

			await baseNavigate(href, { ...config, skip: config?.instant });

			if (config?.scrollTo) {
				const element = document.getElementById(config.scrollTo);
				element && setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), SCROLL_RESTORATION_DELAY);
			}
		},
		[baseNavigate, prefetch]
	);

	return { navigate, back, forward, replace, prefetch, state };
};
