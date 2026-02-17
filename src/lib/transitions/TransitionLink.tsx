'use client';

import { ComponentProps, MouseEvent } from 'react';
import NextLink from 'next/link';
import { usePageTransition } from './TransitionProvider';
import type { TransitionConfig } from './types';

type ClickEvent = MouseEvent<HTMLAnchorElement>;
type Href = TransitionLinkProps['href'];
interface TransitionLinkProps extends Omit<ComponentProps<typeof NextLink>, 'onClick'> {
	transition?: TransitionConfig;
	onClick?: (e: ClickEvent) => void;
}

const getUrlFromHref = (href: Href) => {
	return typeof href === 'string' ? href : href.pathname || '';
};

const shouldInterceptClick = (e: ClickEvent, url: string) => {
	return (
		!(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) &&
		!url.startsWith('http') &&
		!url.startsWith('//')
	);
};

export const TransitionLink = ({ href, transition, onClick, ...props }: TransitionLinkProps) => {
	const { navigate } = usePageTransition();
	const url = getUrlFromHref(href);

	const handleClick = (e: ClickEvent) => {
		onClick?.(e);
		if (!shouldInterceptClick(e, url)) return;
		e.preventDefault();
		navigate(url, transition);
	};

	return <NextLink href={href} onClick={handleClick} {...props} />;
};

export default TransitionLink;
