export type TransitionDirection = 'forward' | 'back' | 'none';

export interface TransitionConfig {
	skip?: boolean;
}

// Providers

export interface NavigationStateContext {
	direction: TransitionDirection;
	isTransitioning: boolean;
}

export type TransitionMethodsContext = {
	navigate: (href: string, config?: TransitionConfig) => Promise<void>;
	replace: (href: string, config?: TransitionConfig) => Promise<void>;
	back: (config?: TransitionConfig) => void;
	forward: (config?: TransitionConfig) => void;
	prefetch: (href: string) => void;
};

// Router hook methods

export interface NavigationConfig extends TransitionConfig {
	instant?: boolean;
	delay?: number;
	scrollTo?: string;
	prefetch?: boolean;
	condition?: boolean;
}
