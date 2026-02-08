import { cn } from '@/lib/utils';

function LabeledValueRow({
	label,
	value,
	rowClassName,
	labelClassName,
	valueClassName,
}: {
	label: string;
	value: string;
	rowClassName?: string;
	labelClassName?: string;
	valueClassName?: string;
}) {
	return (
		<div className={cn('flex justify-between items-center', rowClassName)}>
			<span className={cn('text-sm uppercase tracking-wider', labelClassName)}>{label}</span>
			<span className={cn('font-exo text-lg font-bold', valueClassName)}>{value}</span>
		</div>
	);
}

export { LabeledValueRow };
