import { cn } from '@/lib/utils';

function Card({
	children,
	className,
	overlayClassName,
	overlayStyle,
}: {
	children: React.ReactNode;
	className?: string;
	overlayClassName?: string;
	overlayStyle?: React.CSSProperties;
}) {
	return (
		<div className={cn('relative rounded-[28px] overflow-hidden', className)}>
			<div className={cn('absolute inset-0 rounded-[28px] pointer-events-none', overlayClassName)} style={overlayStyle} />
			<div className='relative z-10'>{children}</div>
		</div>
	);
}

export { Card };
