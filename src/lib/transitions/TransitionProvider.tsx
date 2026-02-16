'use client';

/**
 * PageTransitionProvider
 * 
 * Wraps the application to enable View Transitions API with direction-aware animations.
 * Keeps root layout as server component by using this as a child wrapper.
 */

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import type { 
  TransitionDirection, 
  TransitionConfig, 
  NavigationState,
  PageTransitionContextValue 
} from './types';

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [state, setState] = useState<NavigationState>({
    direction: 'none',
    isTransitioning: false,
  });

  // Track navigation history to determine direction
  const historyIndexRef = useRef(0);
  const isBackNavigationRef = useRef(false);
  const currentPathnameRef = useRef(pathname);

  // Update refs when pathname changes
  useEffect(() => {
    currentPathnameRef.current = pathname;
  }, [pathname]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      isBackNavigationRef.current = true;
      setState(prev => ({ ...prev, direction: 'back' }));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update data attributes for CSS targeting
  useEffect(() => {
    if (state.direction !== 'none') {
      document.documentElement.dataset.transitionDirection = state.direction;
    }
    
    if (state.isTransitioning) {
      document.documentElement.dataset.transitioning = 'true';
    } else {
      delete document.documentElement.dataset.transitioning;
    }

    return () => {
      delete document.documentElement.dataset.transitionDirection;
      delete document.documentElement.dataset.transitioning;
    };
  }, [state.direction, state.isTransitioning]);

  // Core navigation function with View Transitions
  const performTransition = useCallback(
    async (
      action: () => void,
      direction: TransitionDirection,
      config?: TransitionConfig
    ): Promise<void> => {
      // Skip if API not supported or explicitly disabled
      if (!document.startViewTransition || config?.skip) {
        action();
        return;
      }

      // Set direction before transition
      setState({ direction, isTransitioning: true });

      try {
        const transition = document.startViewTransition(() => {
          action();
          // Wait a tick for Next.js to update
          return new Promise(resolve => setTimeout(resolve, 0));
        });

        await transition.finished;
      } catch (error) {
        console.error('View transition failed:', error);
      } finally {
        setState({ direction: 'none', isTransitioning: false });
        isBackNavigationRef.current = false;
      }
    },
    []
  );

  // Navigate to a new route
  const navigate = useCallback(
    async (href: string, config?: TransitionConfig): Promise<void> => {
      const direction = isBackNavigationRef.current ? 'back' : 'forward';
      historyIndexRef.current += 1;
      
      await performTransition(() => router.push(href), direction, config);
    },
    [router, performTransition]
  );

  // Navigate back
  const back = useCallback(
    (config?: TransitionConfig): void => {
      historyIndexRef.current -= 1;
      isBackNavigationRef.current = true;
      
      performTransition(() => router.back(), 'back', config);
    },
    [router, performTransition]
  );

  // Navigate forward
  const forward = useCallback(
    (config?: TransitionConfig): void => {
      historyIndexRef.current += 1;
      
      performTransition(() => router.forward(), 'forward', config);
    },
    [router, performTransition]
  );

  // Replace current route
  const replace = useCallback(
    async (href: string, config?: TransitionConfig): Promise<void> => {
      await performTransition(() => router.replace(href), 'none', config);
    },
    [router, performTransition]
  );

  // Prefetch route
  const prefetch = useCallback(
    (href: string): void => {
      router.prefetch(href);
    },
    [router]
  );

  const value: PageTransitionContextValue = {
    state,
    navigate,
    back,
    forward,
    replace,
    prefetch,
  };

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

// Hook to access transition context
export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  
  return context;
}
