'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { TransitionDirection, NavigationStateContext, TransitionMethodsContext, TransitionConfig } from './types';

/* Contexts */

const TransitionStateContext = createContext<NavigationStateContext | null>(null);

const TransitionMethodsContext = createContext<TransitionMethodsContext | null>(null);

/* Helpers */

const setDataAttribute = (key: string, value: string | boolean) => {
	const { dataset } = document.documentElement;
	if (typeof value === 'boolean') value ? (dataset[key] = 'true') : delete dataset[key];
	else dataset[key] = value;
};

const executeTransition = async (callback: () => void, direction: TransitionDirection, skip?: boolean) => {
	if (!document.startViewTransition || skip) {
		callback();
		return;
	}
	setDataAttribute('transitionDirection', direction);
	setDataAttribute('transitioning', true);
	try {
		await document.startViewTransition(async () => {
			callback();
			// In dev mode, wait for Next.js to flush updates
			await new Promise((resolve) => {
				if (process.env.NODE_ENV === 'development') {
					requestAnimationFrame(() => requestAnimationFrame(resolve));
				} else {
					setTimeout(resolve, 0);
				}
			});
		}).finished;
	} catch (error) {
		console.error('View transition failed:', error);
	}
};

/* Internal hooks */

const useNavigationDirection = () => {
	const isBackNavigation = useRef(false);
	const [direction, setDirection] = useState<TransitionDirection>('none');

	useEffect(() => {
		const handlePopState = () => {
			isBackNavigation.current = true;
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	useEffect(() => {
		const hasDirection = direction !== 'none';
		hasDirection && setDataAttribute('transitionDirection', direction);
		return () => setDataAttribute('transitionDirection', false);
	}, [direction]);

	return { isBackNavigation, direction, setDirection };
};

const useIsTransitioning = () => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		setDataAttribute('transitioning', isTransitioning);
		return () => setDataAttribute('transitioning', false);
	}, [isTransitioning]);

	return { isTransitioning, setIsTransitioning };
};

const useTransition = (
	isBackNavigationRef: React.MutableRefObject<boolean>,
	setDirection: (dir: TransitionDirection) => void,
	setIsTransitioning: (value: boolean) => void
) => {
	return useCallback(
		async (action: () => void, dir: TransitionDirection, config?: TransitionConfig) => {
			setDirection(dir);
			setIsTransitioning(true);
			await executeTransition(action, dir, config?.skip);
			setDirection('none');
			setIsTransitioning(false);
			isBackNavigationRef.current = false;
		},
		[setDirection, setIsTransitioning]
	);
};

/* Providers */

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { isBackNavigation, direction, setDirection } = useNavigationDirection();
	const { isTransitioning, setIsTransitioning } = useIsTransitioning();
	const transition = useTransition(isBackNavigation, setDirection, setIsTransitioning);

	const methods = useMemo(
		() => ({
			navigate: (href: string, config?: TransitionConfig) => {
				const dir = isBackNavigation.current ? 'back' : 'forward';
				return transition(() => router.push(href), dir, config);
			},
			replace: (href: string, config?: TransitionConfig) => {
				return transition(() => router.replace(href), 'none', config);
			},
			back: (config?: TransitionConfig) => {
				isBackNavigation.current = true;
				transition(() => router.back(), 'back', config);
			},
			forward: (config?: TransitionConfig) => {
				transition(() => router.forward(), 'forward', config);
			},
			prefetch: (href: string) => router.prefetch(href),
		}),
		[router, transition]
	);

	const state = { direction, isTransitioning };

	return (
		<TransitionMethodsContext.Provider value={methods}>
			<TransitionStateContext.Provider value={state}>{children}</TransitionStateContext.Provider>
		</TransitionMethodsContext.Provider>
	);
};

/* External hooks */

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
