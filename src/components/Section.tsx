import { cn } from '@/lib/utils';

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
	return <section className={cn('space-y-6', className)}>{children}</section>;
}

export { Section };
