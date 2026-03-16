import { cn } from '@/lib/utils';

type LabeledValueRowProps = {
	label: string;
	value: string;
	className?: string;
};

const CLASSES = {
	row: cn(
		'flex items-center justify-between',
		'py-3 md:py-4',
		'border-b border-chrome-light/10 last:border-b-0', //
	),

	label: cn(
		'text-[11px] tracking-wider uppercase md:text-sm', //
		'text-muted',
	),

	value: cn('gradient-primary gradient-text font-urbanist text-base font-bold md:text-lg'),
};

export const LabeledValueRow = ({ label, value, className }: LabeledValueRowProps) => {
	return (
		<div className={cn(CLASSES.row, className)}>
			<span className={CLASSES.label}>{label}</span>
			<span className={CLASSES.value}>{value}</span>
		</div>
	);
};
