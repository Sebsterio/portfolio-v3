import { cn } from '@/lib/utils';
import { ButtonVariant } from './types';

export const CLASSES = {
	common: cn(
		'px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-full border-2',
		'font-dm-sans text-[14px] sm:text-[15px] font-bold',
		'transition-all duration-300 transition-ease-[cubic-bezier(0.34,1.56,0.64,1)]',
		'hover:-translate-y-1 hover:scale-[1.02]',
		'active:translate-y-0 active:scale-[0.98] active:duration-150'
	),
	primary: cn(
		'bg-linear-to-br from-accent-blue to-accent-cyan',
		'text-white border-transparent',
		'shadow-[0_15px_50px_rgba(59,130,246,0.35)]',
		'hover:shadow-[0_25px_70px_rgba(59,130,246,0.5)]'
	),
	secondary: cn(
		'bg-white/3 backdrop-blur-[10px]',
		'text-chrome-silver border-chrome-silver/15',
		'hover:bg-white/8 hover:border-chrome-silver/40'
	),
};

export const getButtonClasses = (variant: ButtonVariant, className?: string) => {
	return cn(CLASSES.common, CLASSES[variant], className);
};
