'use client';

/**
 * TransitionLink
 *
 * Drop-in replacement for Next.js Link that automatically triggers page transitions.
 * Supports all standard Link props plus transition configuration.
 */

import NextLink from 'next/link';
import { usePageTransition } from './TransitionProvider';
import type { TransitionConfig } from './types';
import { ComponentProps, MouseEvent } from 'react';

interface TransitionLinkProps extends Omit<ComponentProps<typeof NextLink>, 'onClick'> {
	/** Optional transition configuration */
	transition?: TransitionConfig;
	/** Optional click handler */
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function TransitionLink({ href, transition, onClick, ...props }: TransitionLinkProps) {
	const { navigate } = usePageTransition();

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		// Call user's onClick if provided
		onClick?.(e);

		// Don't interfere with default behavior for these cases
		if (
			e.defaultPrevented ||
			e.button !== 0 || // Not left click
			e.metaKey || // Cmd/Win key pressed
			e.ctrlKey || // Ctrl key pressed
			e.shiftKey || // Shift key pressed
			e.altKey // Alt key pressed
		) {
			return;
		}

		// Only handle internal navigation
		const url = typeof href === 'string' ? href : href.pathname || '';
		if (url.startsWith('http') || url.startsWith('//')) {
			return;
		}

		e.preventDefault();
		navigate(url, transition);
	};

	return <NextLink href={href} onClick={handleClick} {...props} />;
}

export default TransitionLink;
