import { cn } from '@/lib/utils';
import { Card } from './Card';

function GlassCard({
	children,
	className,
	title,
	overlayClassName,
	overlayStyle,
}: {
	children: React.ReactNode;
	className?: string;
	title?: string;
	overlayClassName?: string;
	overlayStyle?: React.CSSProperties;
}) {
	return (
		<Card
			className={cn(
				'p-8',
				'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px] backdrop-saturate-[180%] backdrop-brightness-[1.15]',
				'border border-chrome-silver/[0.08]',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(240,240,240,0.12)]',
				className
			)}
			overlayClassName={overlayClassName}
			overlayStyle={{
				background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 20%, transparent 50%)`,
				...overlayStyle,
			}}
		>
			{title && <h3 className='font-urbanist text-lg font-bold text-chrome-silver'>{title}</h3>}
			{children}
		</Card>
	);
}

export { GlassCard };
