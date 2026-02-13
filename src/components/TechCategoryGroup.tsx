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
			<h4 className='text-xs uppercase tracking-wider mb-3 font-semibold text-accent-blue'>{label}</h4>
			<div className='flex flex-wrap gap-2'>{children}</div>
		</div>
	);
};

export default TechCategoryGroup;
