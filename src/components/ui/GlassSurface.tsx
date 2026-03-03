import { cn } from '@/lib/utils';

type GlassSurfaceProps = {
	children: React.ReactNode;
	className?: string;
	hoverable?: boolean;
	interactive?: boolean;
	rounded: keyof typeof roundedMap;
	as?: 'div' | 'button';
	style?: React.CSSProperties;
	onClick?: () => void;
};

// TODO: separate token from the component
const roundedMap = {
	md: cn('rounded-md'),
	lg: cn('rounded-lg'),
	xl: cn('rounded-xl'),
	'2xl': cn('rounded-2xl'),
	'4xl/md:5xl': cn('rounded-3xl md:rounded-[28px]'),
	'5xl': cn('rounded-[28px'),
};

export function GlassSurface(props: GlassSurfaceProps) {
	const { as, children, className, style, hoverable, rounded, onClick } = props;
	const Component = as ?? (onClick ? 'button' : 'div');
	const interactive = !!onClick; //                       <-- redundant innit...

	return (
		<Component
			className={cn(
				['relative overflow-hidden', roundedMap[rounded]],
				'bg-[rgba(13,13,13,0.6)] border border-chrome-silver/8',
				'backdrop-blur-2xl backdrop-saturate-180 backdrop-brightness-[1.15]', // NOTE: backdrop glitches if element has vt
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(240,240,240,0.12)]',
				hoverable && 'transition-colors transition-duration-300 hover:border-accent-blue/30',
				interactive && 'cursor-pointer',
				className
			)}
			{...{ style, onClick }}
		>
			{children}
		</Component>
	);
}
