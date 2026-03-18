import { cn } from '@/lib/utils';
import { PanelContainer } from '@/components/ui/PanelContainer';

type TimelineCardProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
};

/**
 * TimelineCard — interactive panel card for the timeline collection view.
 *
 * Builds on PanelContainer (panel-scale glass, dual accent, noise).
 * Adds the hover translate used on the timeline list items.
 * Elevation upgrade on hover is omitted — on the timeline the translate
 * alone is sufficient feedback; shadow upgrade would compete visually
 * with the TimelineLine accent running alongside.
 */
export function TimelineCard({ children, className, style, onClick }: TimelineCardProps) {
	return (
		<PanelContainer
			onClick={onClick}
			className={cn(
				'glass-surface-2 glass-elevation-1 glass-radius-2',
				'p-8 text-left',
				onClick && 'transition-transform duration-200 ease-out hover:translate-x-2',
				className,
			)}
			style={style}
		>
			{children}
		</PanelContainer>
	);
}
