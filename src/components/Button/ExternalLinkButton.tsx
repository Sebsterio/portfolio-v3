import { forwardRef } from 'react';
import { getButtonClasses, ButtonVariant, ButtonSize } from './styles';

type ExternalLinkButtonProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	label?: string;
	// children?: React.ReactNode;
	// className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>;

export const ExternalLinkButton = forwardRef<HTMLAnchorElement, ExternalLinkButtonProps>(
	({ variant = 'primary', size = 'sm', className, label, children, ...props }, ref) => (
		<a
			ref={ref}
			rel='noopener noreferrer'
			target='_blank'
			className={getButtonClasses(variant, size, className)}
			aria-label={label}
			{...props}
		>
			{children ?? label}
		</a>
	),
);

ExternalLinkButton.displayName = 'ExternalLinkButton';

export default ExternalLinkButton;
