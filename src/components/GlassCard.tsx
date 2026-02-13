import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlassCardProps = {
	title: string;
	children: ReactNode;
	className?: string;
};

export const GlassCard = ({ title, children, className }: GlassCardProps) => {
	return (
		<div
			className={cn(
				'relative p-8 rounded-[28px] overflow-hidden',
				'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px] backdrop-saturate-[180%] backdrop-brightness-[1.15]',
				'border border-chrome-silver/[0.08]',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(240,240,240,0.12)]',
				className
			)}
		>
			{/* Diagonal Glare */}
			<div
				className='absolute inset-0 rounded-[28px] pointer-events-none'
				style={{
					background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 20%, transparent 50%)`,
				}}
			/>

			<div className='relative z-10'>
				<h3 className='font-urbanist text-lg font-bold text-chrome-silver mb-6'>{title}</h3>
				{children}
			</div>
		</div>
	);
};

export default GlassCard;
