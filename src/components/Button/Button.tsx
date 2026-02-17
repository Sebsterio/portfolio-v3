import { forwardRef } from 'react';

import { getButtonClasses } from './styles';
import { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', className, ...props }, ref) => {
	return <button ref={ref} className={getButtonClasses(variant, className)} {...props} />;
});

Button.displayName = 'Button';

export default Button;
