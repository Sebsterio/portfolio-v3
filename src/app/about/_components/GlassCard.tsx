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
				'bg-[rgba(5,5,10,0.7)] backdrop-blur-[40px] backdrop-saturate-[180%]',
				'border border-quantum-purple/10',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(178,75,243,0.1),inset_0_1px_0_rgba(178,75,243,0.2)]',
				className
			)}
			overlayClassName={overlayClassName}
			overlayStyle={{
				background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)',
				...overlayStyle,
			}}
		>
			{title && <h3 className='font-exo text-lg font-bold text-white'>{title}</h3>}
			{children}
		</Card>
	);
}

export { GlassCard };
