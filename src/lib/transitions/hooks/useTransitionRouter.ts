'use client';

import { useCallback } from 'react';
import type { NavigationConfig } from '../types';
import { usePageTransition, usePageTransitionState } from '../components/TransitionProvider';
import { DEFAULT_IS_SCROLL } from '../config';

export const useTransitionRouter = () => {
	const { navigate: baseNavigate, back, forward, replace, prefetch } = usePageTransition();
	const state = usePageTransitionState();

	const navigate = useCallback(
		async (href: string, config?: NavigationConfig) => {
			if (config?.condition === false) return;
			if (config?.prefetch) prefetch(href);
			if (config?.delay) await new Promise((resolve) => setTimeout(resolve, config.delay));

			await baseNavigate(href, {
				...config,
				skip: config?.instant,
				scroll: config?.scrollTo ? false : config?.scroll ?? DEFAULT_IS_SCROLL, // Our `scrollTo` overrides Next.js `scroll`
			});

			if (config?.scrollTo) {
				const element = document.getElementById(config.scrollTo);
				if (element) element.scrollIntoView({ behavior: 'smooth' });
			}
		},
		[baseNavigate, prefetch]
	);

	return { navigate, back, forward, replace, prefetch, state };
};
