import { forwardRef, ButtonHTMLAttributes } from 'react';

import { getButtonClasses, ButtonVariant, ButtonSize } from './Button.styles';

export type ButtonProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'sm', className, ...props }, ref) => (
	<button ref={ref} className={getButtonClasses(variant, size, className)} {...props} />
));

Button.displayName = 'Button';

export default Button;
