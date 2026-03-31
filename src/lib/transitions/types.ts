export interface TransitionConfig {
	skip?: boolean;
	scroll?: boolean; // Controls Next.js scroll behavior
}

// Providers

export interface NavigationStateContext {
	isTransitioning: boolean;
}

export type TransitionMethodsContext = {
	navigate: (href: string, config?: TransitionConfig) => Promise<void> | void;
	replace: (href: string, config?: TransitionConfig) => Promise<void> | void;
	back: (config?: TransitionConfig) => void;
	forward: (config?: TransitionConfig) => void;
	prefetch: (href: string) => void;
};

// Router

export interface NavigationConfig extends TransitionConfig {
	instant?: boolean; // alias for `skip`
	delay?: number;
	scrollTo?: string;
	prefetch?: boolean;
	condition?: boolean;
}
