import { cn } from '@/lib/utils';

function SectionHeader({ title, className, dotClassName }: { title: string; className?: string; dotClassName?: string }) {
	return (
		<h2 className={cn('font-urbanist text-2xl font-bold flex items-center gap-3', className)}>
			<span className={cn('w-2 h-2 rounded-full', dotClassName)} />
			{title}
		</h2>
	);
}

export { SectionHeader };
