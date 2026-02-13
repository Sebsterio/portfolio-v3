import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TechPillProps = {
	children: ReactNode;
	className?: string;
};

export const TechPill = ({ children, className }: TechPillProps) => {
	return (
		<span
			className={cn(
				'px-3 py-1.5 rounded-lg text-xs font-dm-sans',
				'bg-accent-blue/10 border border-accent-blue/20 text-chrome-silver/80',
				className
			)}
		>
			{children}
		</span>
	);
};

export default TechPill;
