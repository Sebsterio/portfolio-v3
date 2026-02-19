export const getTransitionNameCss = (name: string) => ({
	style: { viewTransitionName: name } as React.CSSProperties,
});

export const getSupportsViewTransitions = () => typeof document !== 'undefined' && 'startViewTransition' in document;

export const getNormalizeHref = (href: string | object): string => {
	return typeof href === 'string' ? href : (href as any).pathname || '';
};

export const isCurrentPage = (href: string, pathname: string): boolean => {
	return getNormalizeHref(href) === pathname;
};
