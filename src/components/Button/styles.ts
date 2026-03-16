import { cn } from '@/lib/utils';

export type ButtonVariant = 'cta' | 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'lg';

const CLASSES = {
	base: cn(
		'inline-flex items-center gap-2 rounded-full border-2',
		'font-dm-sans font-bold',
		'transition-[transform,colors] duration-300', //
	),
	sizes: {
		sm: 'px-6	py-3 text-xs	md:px-8	 md:py-3 md:text-base',
		lg: 'px-8	py-4 text-sm	md:px-12 md:py-4 md:text-lg',
	},
	variants: {
		cta: cn(
			'border-transparent gradient-primary text-white',
			'shadow-accent-md hover:shadow-accent-lg', //
		),
		primary: cn(
			'border-transparent gradient-primary text-white',
			'glow-primary-soft hover:scale-105', //
		),
		secondary: cn(
			'border-chrome-silver/15 bg-white/3 text-chrome-silver backdrop-blur-[10px]',
			'hover:border-chrome-silver/40 hover:bg-white/8',
		),
	},
} as const;

export const getButtonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'sm', className?: string) =>
	cn(CLASSES.base, CLASSES.sizes[size], CLASSES.variants[variant], className);
