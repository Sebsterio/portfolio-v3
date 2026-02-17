import { cn } from '@/lib/utils';
import { ButtonVariant } from './types';

export const CLASSES = {
	common: cn(
		'px-12 py-5 rounded-full',
		'font-dm-sans text-[15px] font-bold',
		'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
		'hover:translate-y-[-4px] hover:scale-[1.02]'
	),
	primary: cn(
		'bg-gradient-to-br from-accent-blue to-accent-cyan',
		'text-white',
		'shadow-[0_15px_50px_rgba(59,130,246,0.35)]',
		'hover:shadow-[0_25px_70px_rgba(59,130,246,0.5)]'
	),
	secondary: cn(
		'bg-white/[0.03] backdrop-blur-[10px]',
		'text-chrome-silver',
		'border-2 border-chrome-silver/15',
		'hover:bg-white/[0.08] hover:border-chrome-silver/40'
	),
};

export const getButtonClasses = (variant: ButtonVariant, className?: string) => {
	return cn(CLASSES.common, CLASSES[variant], className);
};
