export const getTransitionNameCss = (name: string) => ({
	style: { viewTransitionName: name } as React.CSSProperties,
});

export const getSupportsViewTransitions = () => typeof document !== 'undefined' && 'startViewTransition' in document;

export const getNormalizeHref = (href: string | object): string => {
	if (typeof href === 'string') return href;
	if ('pathname' in href && typeof href.pathname === 'string') return href.pathname;
	return '';
};

export const isCurrentPage = (href: string, pathname: string): boolean => {
	return getNormalizeHref(href) === pathname;
};
