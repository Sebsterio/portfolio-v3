import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	children: React.ReactNode;
};
