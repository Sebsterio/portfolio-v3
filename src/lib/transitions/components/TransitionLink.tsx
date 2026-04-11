'use client';

import { ComponentProps, MouseEvent } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import type { NavigationConfig } from '../types';
import { useTransitionRouter } from '../hooks/useTransitionRouter';
import { getNormalizeHref } from '../utils';
import { useIsCurrentPage } from './TransitionProvider';

type ClickEvent = MouseEvent<HTMLAnchorElement>;

export type TransitionLinkProps = Omit<ComponentProps<typeof NextLink>, 'onClick' | 'scroll'> &
	NavigationConfig & { onClick?: (e: ClickEvent) => void };

const shouldInterceptClick = (e: ClickEvent, url: string) => {
	return (
		!(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) &&
		!url.startsWith('http') &&
		!url.startsWith('//')
	);
};

export const TransitionLink = ({ href, className, instant, scrollTo, delay, onClick, ...props }: TransitionLinkProps) => {
	const { navigate } = useTransitionRouter();
	const isCurrent = useIsCurrentPage(href);
	const url = getNormalizeHref(href);

	const handleClick = (e: ClickEvent) => {
		onClick?.(e);
		if (!shouldInterceptClick(e, url)) return;
		e.preventDefault();
		navigate(url, { instant, scrollTo, delay });
	};

	return (
		<NextLink
			href={href}
			onClick={handleClick}
			className={cn(className, isCurrent && 'pointer-events-none')}
			aria-current={isCurrent ? 'page' : undefined}
			aria-disabled={isCurrent}
			scroll={false} // Handled it in navigate()
			{...props}
		/>
	);
};

export default TransitionLink;
