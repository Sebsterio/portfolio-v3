'use client';

/**
 * TransitionProvider
 * - Orchestrates view transitions around Next.js App Router navigation
 *
 * Architecture:
 * - Provider: Core transition execution + navigation guard + sync with View Transitions API
 * - useTransitionRouter: Convenience layer (delay, prefetch, condition, scrollTo)
 * - TransitionLink: Link-specific wrapper
 *
 * Promise mechanism:
 * - useTransitionReady signals when page is rendered (via useLayoutEffect)
 * - Resolves the navigationComplete promise
 * - Ensures View Transitions API captures correct DOM snapshot
 */

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { NavigationStateContext, TransitionMethodsContext, TransitionConfig } from '../types';
import { getNormalizeHref, isCurrentPage } from '../utils';
import { DEFAULT_IS_SCROLL } from '../config';

/* Config */

const NAVIGATION_TIMEOUT_MS = 2000; // Guard against navigationComplete never resolving (e.g. missing PageTransition wrapper).

/* Contexts */

const TransitionStateContext = createContext<NavigationStateContext | null>(null);
const TransitionMethodsContext = createContext<TransitionMethodsContext | null>(null);
const TransitionReadyContext = createContext<(() => void) | null>(null);

/* Helpers */

const isDev = process.env.NODE_ENV === 'development';

const devWarn = (msg: string) => (isDev ? console.warn(msg) : undefined);

const updateDocumentTransitioning = (value: boolean) => {
	const { dataset } = document.documentElement;
	if (value) dataset.transitioning = 'true';
	else delete dataset.transitioning;
};

const executeTransition = async (callback: () => void, navigationComplete: Promise<void>) => {
	try {
		await document.startViewTransition(async () => {
			callback();
			await navigationComplete;
		}).finished;
	} catch (error) {
		console.error('View transition failed:', error);
	}
};

/* Providers */

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();
	const pathnameRef = useRef(pathname);
	const resolveNavigation = useRef<(() => void) | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		pathnameRef.current = pathname;
	}, [pathname]);

	const signalReady = useCallback(() => {
		resolveNavigation.current?.();
		resolveNavigation.current = null;
	}, []);

	const transition = useCallback(
		async (action: () => void, _config?: TransitionConfig) => {
			const navigationComplete = new Promise<void>((resolve) => (resolveNavigation.current = resolve));
			const navigationTimeout = new Promise<void>((resolve) =>
				setTimeout(() => resolve(devWarn('[Transition] navigationComplete timed out — resolving fallback')), NAVIGATION_TIMEOUT_MS),
			);
			setIsTransitioning(true);
			updateDocumentTransitioning(true);
			await executeTransition(action, Promise.race([navigationComplete, navigationTimeout]));
			updateDocumentTransitioning(false);
			setIsTransitioning(false);
		},
		[setIsTransitioning],
	);

	const navigate = useCallback(
		(href: string, action: () => void, config?: TransitionConfig) => {
			if (isCurrentPage(href, pathnameRef.current)) return devWarn(`[Navigation] Blocked: Already on ${href}`);
			if (config?.skip || !document.startViewTransition) return;
			return transition(action, config);
		},
		[transition],
	);

	const methods = useMemo(
		() => ({
			navigate: (href: string, config?: TransitionConfig) =>
				navigate(href, () => router.push(href, { scroll: config?.scroll ?? DEFAULT_IS_SCROLL }), config),
			replace: (href: string, config?: TransitionConfig) =>
				navigate(href, () => router.replace(href, { scroll: config?.scroll ?? DEFAULT_IS_SCROLL }), config),
			back: (config?: TransitionConfig) => transition(() => router.back(), config),
			forward: (config?: TransitionConfig) => transition(() => router.forward(), config),
			prefetch: (href: string) => router.prefetch(href),
		}),
		[router, navigate, transition],
	);

	return (
		<TransitionReadyContext.Provider value={signalReady}>
			<TransitionMethodsContext.Provider value={methods}>
				<TransitionStateContext.Provider value={{ isTransitioning }}>{children}</TransitionStateContext.Provider>
			</TransitionMethodsContext.Provider>
		</TransitionReadyContext.Provider>
	);
};

/* Hooks */

export const useTransitionReady = () => {
	const signalReady = useContext(TransitionReadyContext);
	useLayoutEffect(() => {
		signalReady?.();
	}, [signalReady]);
};

export const usePageTransition = () => {
	const methods = useContext(TransitionMethodsContext);
	if (!methods) throw new Error('usePageTransition must be used within TransitionProvider');
	return methods;
};

export const usePageTransitionState = () => {
	const state = useContext(TransitionStateContext);
	if (!state) throw new Error('usePageTransitionState must be used within TransitionProvider');
	return state;
};

export const useIsCurrentPage = (href: string | object) => {
	const pathname = usePathname();
	return isCurrentPage(getNormalizeHref(href), pathname);
};

export const useGetIsCurrentPage = () => {
	const pathname = usePathname();
	return useCallback((href: string | object) => isCurrentPage(getNormalizeHref(href), pathname), [pathname]);
};
