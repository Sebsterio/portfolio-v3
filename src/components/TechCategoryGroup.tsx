import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TechCategoryGroupProps = {
	label: string;
	children: ReactNode;
	className?: string;
};

export const TechCategoryGroup = ({ label, children, className }: TechCategoryGroupProps) => {
	return (
		<div className={className}>
			<h4
				className={cn(
					'text-[11px] tracking-[1.5px] md:text-xs md:tracking-wider',
					'font-semibold text-accent-blue uppercase',
					'mb-2 md:mb-3',
				)}
			>
				{label}
			</h4>
			<div className='flex flex-wrap gap-2 md:gap-2.5'>{children}</div>
		</div>
	);
};

export default TechCategoryGroup;
