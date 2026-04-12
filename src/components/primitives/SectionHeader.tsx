import { cn } from '@/lib/utils';

function SectionHeader({ title, className }: { title: string; className?: string }) {
	return (
		<h2 className={cn('heading-2 flex items-center gap-3', className)}>
			<span className={cn('status-dot glow-accent-lg bg-accent')} />
			{title}
		</h2>
	);
}

export { SectionHeader };
