export const getTransitionNameCss = (name: string) => ({
	style: { viewTransitionName: name } as React.CSSProperties,
});

export const getSupportsViewTransitions = () => typeof document !== 'undefined' && 'startViewTransition' in document;
