import { cn } from '@/lib/utils';

function TechPill({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<span
			className={cn('px-3 py-1.5 rounded-lg text-xs font-dm-sans', className)} //
		>
			{children}
		</span>
	);
}

export { TechPill };
