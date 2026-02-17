'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { NavigationStateContext, TransitionMethodsContext, TransitionConfig } from './types';

/* Contexts */

const TransitionStateContext = createContext<NavigationStateContext | null>(null);
const TransitionMethodsContext = createContext<TransitionMethodsContext | null>(null);
const TransitionReadyContext = createContext<(() => void) | null>(null);

/* Helpers */

const setTransitioning = (value: boolean) => {
	if (value) {
		document.documentElement.dataset.transitioning = 'true';
	} else {
		delete document.documentElement.dataset.transitioning;
	}
};

const executeTransition = async (callback: () => void, navigationComplete: Promise<void>, skip?: boolean) => {
	if (!document.startViewTransition || skip) {
		callback();
		return;
	}

	setTransitioning(true);

	try {
		await document.startViewTransition(async () => {
			callback();
			await navigationComplete;
		}).finished;
	} catch (error) {
		console.error('View transition failed:', error);
	}
};

/* Internal Hooks */

const useIsTransitioning = () => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		setTransitioning(isTransitioning);
		return () => setTransitioning(false);
	}, [isTransitioning]);

	return { isTransitioning, setIsTransitioning };
};

const useTransition = (setIsTransitioning: (value: boolean) => void) => {
	const resolveNavigation = useRef<(() => void) | null>(null);

	const signalReady = useCallback(() => {
		resolveNavigation.current?.();
		resolveNavigation.current = null;
	}, []);

	const performTransition = useCallback(
		async (action: () => void, config?: TransitionConfig) => {
			setIsTransitioning(true);
			const navigationComplete = new Promise<void>((resolve) => {
				resolveNavigation.current = resolve;
				setTimeout(resolve, 500);
			});
			await executeTransition(action, navigationComplete, config?.skip);
			setIsTransitioning(false);
		},
		[setIsTransitioning]
	);

	return { performTransition, signalReady };
};

/* Provider */

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { isTransitioning, setIsTransitioning } = useIsTransitioning();
	const { performTransition, signalReady } = useTransition(setIsTransitioning);

	const methods = useMemo(
		() => ({
			navigate: (href: string, config?: TransitionConfig) => performTransition(() => router.push(href), config),
			replace: (href: string, config?: TransitionConfig) => performTransition(() => router.replace(href), config),
			back: (config?: TransitionConfig) => performTransition(() => router.back(), config),
			forward: (config?: TransitionConfig) => performTransition(() => router.forward(), config),
			prefetch: (href: string) => router.prefetch(href),
		}),
		[router, performTransition]
	);

	return (
		<TransitionReadyContext.Provider value={signalReady}>
			<TransitionMethodsContext.Provider value={methods}>
				<TransitionStateContext.Provider value={{ isTransitioning }}>{children}</TransitionStateContext.Provider>
			</TransitionMethodsContext.Provider>
		</TransitionReadyContext.Provider>
	);
};

/* External Hooks */

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
