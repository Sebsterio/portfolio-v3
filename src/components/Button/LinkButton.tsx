'use client';

import { forwardRef } from 'react';
import { TransitionLink } from '@/lib/transitions/TransitionLink';
import { TransitionConfig } from '@/lib/transitions/types';
import type { ButtonVariant } from './types';
import { getButtonClasses } from './styles';

type LinkButtonProps = {
	variant?: ButtonVariant;
	transition?: TransitionConfig;
	className?: string;
	children: React.ReactNode;
} & React.ComponentProps<typeof TransitionLink>;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	({ variant = 'primary', className, transition, ...props }, ref) => {
		return <TransitionLink ref={ref} transition={transition} className={getButtonClasses(variant, className)} {...props} />;
	}
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
