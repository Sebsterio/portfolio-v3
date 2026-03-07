import { cn } from '@/lib/utils';
import { ButtonVariant } from './types';

export const CLASSES = {
	common: cn('px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-full border-2', [
		'font-dm-sans text-[14px] sm:text-[15px] font-bold interactive-lift',
	]),
	primary: cn('gradient-primary text-white border-transparent shadow-accent-md hover:shadow-accent-lg'),
	secondary: cn(
		'bg-white/3 backdrop-blur-[10px] border-chrome-silver/15 text-chrome-silver',
		'hover:bg-white/8 hover:border-chrome-silver/40',
	),
};

export const getButtonClasses = (variant: ButtonVariant, className?: string) => {
	return cn(CLASSES.common, CLASSES[variant], className);
};
