import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type ImpactListProps = {
	items: string[];
	/**
	 * 'md' — standard gap-3, default text size. Panel and card detail views.
	 * 'sm' — compact gap-2, text-sm. Mobile expanded views.
	 */
	size?: 'sm' | 'md';
	className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ImpactList — arrow-prefixed bullet list for project impact items.
 *
 * Shared across TimelineProjectPanel, ProjectCardBack, and ExpandedMobileCard.
 * The size prop covers the two layout contexts: standard panel spacing (md)
 * and compact mobile card spacing (sm).
 */
export function ImpactList({ items, size = 'md', className }: ImpactListProps) {
	return (
		<ul className={cn('space-y-2', className)}>
			{items.map((item, i) => (
				<li key={i} className={cn('flex items-start', size === 'sm' ? 'gap-2 text-sm' : 'gap-3')}>
					<span className={cn('shrink-0 text-accent-cyan', size === 'sm' ? 'mt-0.5' : 'mt-1')}>→</span>
					<span className={cn('text-chrome-silver/80', size === 'md' && 'md:text-base')}>{item}</span>
				</li>
			))}
		</ul>
	);
}

export default ImpactList;
