import { forwardRef } from 'react';
import { getButtonClasses, ButtonVariant, ButtonSize } from './styles';

type ExternalLinkButtonProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
	children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>;

export const ExternalLinkButton = forwardRef<HTMLAnchorElement, ExternalLinkButtonProps>(
	({ variant = 'primary', size = 'sm', className, ...props }, ref) => (
		<a ref={ref} target='_blank' rel='noopener noreferrer' className={getButtonClasses(variant, size, className)} {...props} />
	),
);

ExternalLinkButton.displayName = 'ExternalLinkButton';

export default ExternalLinkButton;
