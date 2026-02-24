'use client';

import { forwardRef } from 'react';
import { TransitionLink } from '@/lib/transitions/TransitionLink';
import type { ButtonVariant } from './types';
import { getButtonClasses } from './styles';

type LinkButtonProps = {
	variant?: ButtonVariant;
	className?: string;
	children: React.ReactNode;
} & React.ComponentProps<typeof TransitionLink>;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({ variant = 'primary', className, ...props }, ref) => {
	return <TransitionLink ref={ref} className={getButtonClasses(variant, className)} {...props} />;
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
