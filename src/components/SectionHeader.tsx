import { cn } from '@/lib/utils';

function SectionHeader({ title, className }: { title: string; className?: string }) {
	return (
		<h2 className={cn('font-urbanist text-2xl font-bold flex items-center gap-3', className)}>
			<span className={cn('w-2 h-2 rounded-full', 'bg-accent-blue animate-status-pulse shadow-[0_0_15px_rgba(59,130,246,1)]')} />
			{title}
		</h2>
	);
}

export { SectionHeader };
