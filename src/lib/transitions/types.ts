/**
 * Page Transition Types
 * TypeScript definitions for the page transition system
 */

export type TransitionDirection = 'forward' | 'back' | 'none';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'none';

export interface TransitionConfig {
  /** Type of transition animation */
  type?: TransitionType;
  /** Duration in milliseconds */
  duration?: number;
  /** Easing function */
  easing?: string;
  /** Whether to skip the transition */
  skip?: boolean;
}

export interface NavigationState {
  /** Current navigation direction */
  direction: TransitionDirection;
  /** Whether a transition is currently running */
  isTransitioning: boolean;
}

export interface PageTransitionContextValue {
  /** Current navigation state */
  state: NavigationState;
  /** Navigate with transition */
  navigate: (href: string, options?: TransitionConfig) => Promise<void>;
  /** Navigate back with transition */
  back: (options?: TransitionConfig) => void;
  /** Navigate forward with transition */
  forward: (options?: TransitionConfig) => void;
  /** Replace current route with transition */
  replace: (href: string, options?: TransitionConfig) => Promise<void>;
  /** Prefetch a route */
  prefetch: (href: string) => void;
}

export interface ViewTransitionAPI {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => void | Promise<void>) => ViewTransitionAPI;
  }
}
