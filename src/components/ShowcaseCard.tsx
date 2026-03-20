import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

interface ShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

/**
 * ShowcaseCard — feature highlight card with glint and spring elevation.
 *
 * Used on home and about pages as a dwell target (users read, not scan).
 * Uses a fuller spring overshoot + slower duration than InfoCard's
 * 'lifted' variant — the extra theatrics communicate deliberate weight.
 *
 * Uses Card directly (not InfoCard) because layout, spacing,
 * and hover timing are specific enough that InfoCard adds no value.
 *
 * glass-edge-glow is explicit here — its width and x-position are
 * custom (70% wide, centred) and belong to this component's design.
 */
export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<Card
			variant='lifted'
			glint
			edgeGlow
			className={cn(
				'glass-radius-2 glass-surface-2 glass-elevation-1',
				'padding-card-lg',
				// Override lifted timing: fuller spring + slower duration for dwell behaviour.
				// GlassCard lifted uses duration-300 + overshoot 1.2 (scan targets).
				// ShowcaseCard uses duration-500 + overshoot 1.56 (dwell targets).
				'[transition-duration:500ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
				className,
			)}
		>
			<div className='flex gap-5 sm:gap-6'>
				{/* NOTE: setting "mb-6 "here or "mt-6" on next sibling resulted in a flash of old-page on nav to home-page */}
				<IconBadge>{icon}</IconBadge>
				<div className='min-w-0'>
					<h3 className='font-display text-base font-bold text-chrome-silver sm:text-lg md:text-xl'>{title}</h3>
					<p className='text-muted mt-1.5 text-[13px] leading-relaxed md:text-sm'>{description}</p>
				</div>
			</div>
		</Card>
	);
};

// ─── Icon Badge ───────────────────────────────────────────────────────────────

const IconBadge = ({ children }: { children: React.ReactNode }) => (
	<div
		className={cn(
			'flex shrink-0 items-center justify-center rounded-xl',
			'h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14',
			'gradient-primary',
			'shadow-showcase-badge',
			'group-hover:shadow-showcase-badge-hover',
			'transition-[transform,box-shadow] duration-500 group-hover:scale-110',
		)}
	>
		<span className='text-2xl leading-none'>{children}</span>
	</div>
);
