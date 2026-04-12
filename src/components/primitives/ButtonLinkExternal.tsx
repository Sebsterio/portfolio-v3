import { forwardRef } from 'react';
import { getButtonClasses, ButtonVariant, ButtonSize } from './Button.styles';

type ButtonLinkExternalProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	label?: string;
	// children?: React.ReactNode;
	// className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>;

export const ButtonLinkExternal = forwardRef<HTMLAnchorElement, ButtonLinkExternalProps>(
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

ButtonLinkExternal.displayName = 'ButtonLinkExternal';

export default ButtonLinkExternal;
