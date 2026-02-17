'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { TransitionDirection, NavigationStateContext, TransitionMethodsContext, TransitionConfig } from './types';

const TransitionStateContext = createContext<NavigationStateContext | null>(null);
const TransitionMethodsContext = createContext<TransitionMethodsContext | null>(null);
const TransitionReadyContext = createContext<(() => void) | null>(null);

const setDataAttribute = (key: string, value: string | boolean) => {
	const { dataset } = document.documentElement;
	if (typeof value === 'boolean') value ? (dataset[key] = 'true') : delete dataset[key];
	else dataset[key] = value;
};

const executeTransition = async (
	callback: () => void,
	direction: TransitionDirection,
	navigationComplete: Promise<void>,
	skip?: boolean
) => {
	if (!document.startViewTransition || skip) {
		callback();
		return;
	}
	setDataAttribute('transitionDirection', direction);
	setDataAttribute('transitioning', true);
	try {
		await document.startViewTransition(async () => {
			callback();
			await navigationComplete;
		}).finished;
	} catch (error) {
		console.error('View transition failed:', error);
	}
};

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
	const resolveNavigation = useRef<(() => void) | null>(null);

	const signalReady = useCallback(() => {
		resolveNavigation.current?.();
		resolveNavigation.current = null;
	}, []);

	const performTransition = useCallback(
		async (action: () => void, dir: TransitionDirection, config?: TransitionConfig) => {
			setDirection(dir);
			setIsTransitioning(true);
			const navigationComplete = new Promise<void>((resolve) => {
				resolveNavigation.current = resolve;
				setTimeout(resolve, 500); // fallback for back/forward with no history
			});
			await executeTransition(action, dir, navigationComplete, config?.skip);
			setDirection('none');
			setIsTransitioning(false);
			isBackNavigationRef.current = false;
		},
		[setDirection, setIsTransitioning]
	);

	return { performTransition, signalReady };
};

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { isBackNavigation, direction, setDirection } = useNavigationDirection();
	const { isTransitioning, setIsTransitioning } = useIsTransitioning();
	const { performTransition, signalReady } = useTransition(isBackNavigation, setDirection, setIsTransitioning);

	const methods = useMemo(
		() => ({
			navigate: (href: string, config?: TransitionConfig) => {
				const dir = isBackNavigation.current ? 'back' : 'forward';
				return performTransition(() => router.push(href), dir, config);
			},
			replace: (href: string, config?: TransitionConfig) => performTransition(() => router.replace(href), 'none', config),
			back: (config?: TransitionConfig) => {
				isBackNavigation.current = true;
				performTransition(() => router.back(), 'back', config);
			},
			forward: (config?: TransitionConfig) => performTransition(() => router.forward(), 'forward', config),
			prefetch: (href: string) => router.prefetch(href),
		}),
		[router, performTransition]
	);

	return (
		<TransitionReadyContext.Provider value={signalReady}>
			<TransitionMethodsContext.Provider value={methods}>
				<TransitionStateContext.Provider value={{ direction, isTransitioning }}>{children}</TransitionStateContext.Provider>
			</TransitionMethodsContext.Provider>
		</TransitionReadyContext.Provider>
	);
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

export const useTransitionReady = () => {
	const signalReady = useContext(TransitionReadyContext);
	useEffect(() => {
		requestAnimationFrame(() => signalReady?.());
	}, []);
};
