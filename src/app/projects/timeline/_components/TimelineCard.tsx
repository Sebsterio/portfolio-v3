import { cn } from '@/lib/utils';
import { Panel } from '@/components/ui/Panel';

type TimelineCardProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
};

/**
 * TimelineCard — interactive panel card for the timeline collection view.
 *
 * Builds on Panel (panel-scale glass, dual accent, noise).
 * Adds the hover translate used on the timeline list items.
 * Elevation upgrade on hover is omitted — on the timeline the translate
 * alone is sufficient feedback; shadow upgrade would compete visually
 * with the TimelineLine accent running alongside.
 */
export function TimelineCard({ children, className, style, onClick }: TimelineCardProps) {
	return (
		<Panel
			onClick={onClick}
			className={cn(
				'glass-surface-2 glass-radius-2 padding-card text-left glass-elevation-1',
				onClick && 'transition-[translate] duration-200 ease-out hover:translate-x-4',
				className,
			)}
			style={style}
		>
			{children}
		</Panel>
	);
}
