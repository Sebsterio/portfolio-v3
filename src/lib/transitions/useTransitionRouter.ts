/**
 * useTransitionRouter Hook
 *
 * Advanced utilities for working with page transitions.
 * Provides helpers for common patterns and edge cases.
 */

'use client';

import { useCallback } from 'react';
import { usePageTransition } from './TransitionProvider';
import type { TransitionConfig } from './types';

export function useTransitionRouter() {
	const { navigate, back, forward, replace, prefetch, state } = usePageTransition();

	/**
	 * Navigate with custom transition configuration
	 */
	const navigateWithConfig = useCallback(
		async (href: string, config?: TransitionConfig) => {
			await navigate(href, config);
		},
		[navigate]
	);

	/**
	 * Navigate without transition (instant)
	 */
	const navigateInstant = useCallback(
		async (href: string) => {
			await navigate(href, { skip: true });
		},
		[navigate]
	);

	/**
	 * Conditionally navigate based on a predicate
	 */
	const navigateIf = useCallback(
		async (condition: boolean, href: string, config?: TransitionConfig) => {
			if (condition) {
				await navigate(href, config);
			}
		},
		[navigate]
	);

	/**
	 * Navigate with a delay (useful for showing loading states)
	 */
	const navigateDelayed = useCallback(
		async (href: string, delayMs: number, config?: TransitionConfig) => {
			await new Promise((resolve) => setTimeout(resolve, delayMs));
			await navigate(href, config);
		},
		[navigate]
	);

	/**
	 * Navigate and scroll to an element by ID
	 */
	const navigateAndScroll = useCallback(
		async (href: string, elementId: string, config?: TransitionConfig) => {
			await navigate(href, config);
			// Wait for transition to complete and DOM to update
			setTimeout(() => {
				const element = document.getElementById(elementId);
				element?.scrollIntoView({ behavior: 'smooth' });
			}, 500);
		},
		[navigate]
	);

	/**
	 * Navigate with prefetch
	 */
	const navigateWithPrefetch = useCallback(
		async (href: string, config?: TransitionConfig) => {
			prefetch(href);
			await navigate(href, config);
		},
		[navigate, prefetch]
	);

	/**
	 * Replace current route without adding to history
	 */
	const replaceRoute = useCallback(
		async (href: string, config?: TransitionConfig) => {
			await replace(href, config);
		},
		[replace]
	);

	return {
		// Basic navigation
		navigate: navigateWithConfig,
		navigateInstant,
		back,
		forward,
		replace: replaceRoute,
		prefetch,

		// Advanced utilities
		navigateIf,
		navigateDelayed,
		navigateAndScroll,
		navigateWithPrefetch,

		// State
		state,
	};
}

/**
 * Hook to get element view transition name
 * Useful for dynamically assigning transition names to elements
 */
export function useViewTransitionName(name: string) {
	return {
		style: { viewTransitionName: name } as React.CSSProperties,
	};
}

/**
 * Hook to check if View Transitions API is supported
 */
export function useSupportsViewTransitions() {
	return typeof document !== 'undefined' && 'startViewTransition' in document;
}
