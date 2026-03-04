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

const roundedMap = {
	[1]: cn('rounded-glass-1'),
	[2]: cn('rounded-glass-2'),
	[3]: cn('rounded-glass-3'),
};

export function GlassSurface(props: GlassSurfaceProps) {
	const { as, children, className, style, hoverable, rounded, onClick } = props;
	const Component = as ?? (onClick ? 'button' : 'div');
	const interactive = !!onClick;
	return (
		<Component
			className={cn(
				['relative overflow-hidden', roundedMap[rounded]],
				'surface-glass-2 backdrop-glass-2 shadow-glass-0', // NOTE: backdrop glitches if element has vt
				hoverable && 'transition-colors transition-duration-300 hover:border-accent-blue/30',
				interactive && 'cursor-pointer',
				className,
			)}
			{...{ style, onClick }}
		>
			{children}
		</Component>
	);
}
