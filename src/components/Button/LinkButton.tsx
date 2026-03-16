'use client';

import { forwardRef } from 'react';
import { TransitionLink } from '@/lib/transitions/components/TransitionLink';
import { getButtonClasses, ButtonVariant, ButtonSize } from './styles';

type LinkButtonProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
	children: React.ReactNode;
} & React.ComponentProps<typeof TransitionLink>;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	({ variant = 'primary', size = 'sm', className, ...props }, ref) => (
		<TransitionLink ref={ref} className={getButtonClasses(variant, size, className)} {...props} />
	),
);
LinkButton.displayName = 'LinkButton';

export default LinkButton;
