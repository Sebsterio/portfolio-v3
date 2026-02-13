import { cn } from '@/lib/utils';

function TechCategoryGroup({
	label,
	children,
	labelClassName,
	containerClassName,
}: {
	label: string;
	children: React.ReactNode;
	labelClassName?: string;
	containerClassName?: string;
}) {
	return (
		<div>
			<h4 className={cn('text-xs uppercase tracking-wider mb-3 font-semibold', labelClassName)}>{label}</h4>
			<div className={cn('flex flex-wrap gap-2', containerClassName)}>{children}</div>
		</div>
	);
}

export { TechCategoryGroup };
