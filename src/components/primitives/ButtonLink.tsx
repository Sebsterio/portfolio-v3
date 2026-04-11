'use client';

import { forwardRef } from 'react';
import { TransitionLink } from '@/lib/transitions/components/TransitionLink';
import { getButtonClasses, ButtonVariant, ButtonSize } from './Button.styles';

type ButtonLinkProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
	children: React.ReactNode;
} & React.ComponentProps<typeof TransitionLink>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	({ variant = 'primary', size = 'sm', className, ...props }, ref) => (
		<TransitionLink ref={ref} className={getButtonClasses(variant, size, className)} {...props} />
	),
);
ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
