import { cn } from '@/lib/utils';
import { ButtonVariant } from './types';

export const CLASSES = {
	common: cn('rounded-full border-2 px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5', [
		'interactive-lift font-dm-sans text-[14px] font-bold sm:text-[15px]',
	]),
	primary: cn('shadow-accent-md hover:shadow-accent-lg border-transparent gradient-primary text-white'),
	secondary: cn(
		'border-chrome-silver/15 bg-white/3 text-chrome-silver backdrop-blur-[10px]',
		'hover:border-chrome-silver/40 hover:bg-white/8',
	),
};

export const getButtonClasses = (variant: ButtonVariant, className?: string) => {
	return cn(CLASSES.common, CLASSES[variant], className);
};
