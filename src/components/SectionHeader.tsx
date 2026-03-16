import { cn } from '@/lib/utils';

function SectionHeader({ title, className }: { title: string; className?: string }) {
	return (
		<h2 className={cn('heading-section', className)}>
			<span className={cn('status-dot glow-accent-strong bg-accent-blue')} />
			{title}
		</h2>
	);
}

export { SectionHeader };
