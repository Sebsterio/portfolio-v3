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
				'tech-tag-muted',
				className
			)}
		>
			{children}
		</span>
	);
};

export default TechPill;
