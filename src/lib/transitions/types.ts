export interface TransitionConfig {
	skip?: boolean;
}

// Providers

export interface NavigationStateContext {
	isTransitioning: boolean;
}

export type TransitionMethodsContext = {
	navigate: (href: string, config?: TransitionConfig) => Promise<void>;
	replace: (href: string, config?: TransitionConfig) => Promise<void>;
	back: (config?: TransitionConfig) => void;
	forward: (config?: TransitionConfig) => void;
	prefetch: (href: string) => void;
};

// Router

export interface NavigationConfig extends TransitionConfig {
	instant?: boolean;
	delay?: number;
	scrollTo?: string;
	prefetch?: boolean;
	condition?: boolean;
}
