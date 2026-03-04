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
	'2xl': cn('rounded-glass-1'),
	'4xl/md:5xl': cn('rounded-glass-2'),
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
				'surface-glass-2 backdrop-glass shadow-glass-0', // NOTE: backdrop glitches if element has vt
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
