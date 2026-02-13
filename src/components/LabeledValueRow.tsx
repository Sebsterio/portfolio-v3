import { cn } from '@/lib/utils';

type LabeledValueRowProps = {
	label: string;
	value: string;
	className?: string;
};

const CLASSES = {
	row: cn(
		'flex justify-between items-center',
		'py-4',
		'border-b border-quantum-purple/10 last:border-b-0' //
	),
	label: cn(
		'text-sm uppercase tracking-wider',
		'text-chrome-silver/60' //
	),
	value: cn(
		'font-urbanist text-lg font-bold',
		'bg-gradient-to-br from-accent-blue to-accent-cyan bg-clip-text text-transparent' //
	),
};

export const LabeledValueRow = ({ label, value, className }: LabeledValueRowProps) => {
	return (
		<div className={cn(CLASSES.row, className)}>
			<span className={CLASSES.label}>{label}</span>
			<span className={CLASSES.value}>{value}</span>
		</div>
	);
};
