import { cn } from '@/lib/utils';
import { CardContainer } from '@/components/ui/CardContainer';

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
 * Uses a fuller spring overshoot + slower duration than GlassCard's
 * 'lifted' variant — the extra theatrics communicate deliberate weight.
 *
 * Uses CardContainer directly (not GlassCard) because layout, spacing,
 * and hover timing are specific enough that GlassCard adds no value.
 *
 * glass-edge-glow is explicit here — its width and x-position are
 * custom (70% wide, centred) and belong to this component's design.
 */
export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<CardContainer
			glint
			variant='lifted'
			className={cn(
				'glass-surface-2 glass-elevation-1 glass-radius-2',
				'p-6 sm:p-8 md:p-10',
				// Override lifted timing: fuller spring + slower duration for dwell behaviour.
				// GlassCard lifted uses duration-300 + overshoot 1.2 (scan targets).
				// ShowcaseCard uses duration-500 + overshoot 1.56 (dwell targets).
				'[transition-duration:500ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
				className,
			)}
		>
			{/* Custom-positioned edge glow — narrower than full-width */}
			<div className='glass-edge-glow overlay top-0 left-[15%] h-px w-[70%]' aria-hidden />

			<div className='flex gap-5 sm:gap-6'>
				<IconBadge>{icon}</IconBadge>
				<div className='min-w-0'>
					{/* NOTE: margin on this element or its sibling causes a VT flash on nav */}
					<h3 className='font-display text-base font-bold text-chrome-silver sm:text-lg md:text-xl'>{title}</h3>
					<p className='text-muted mt-1.5 text-[13px] leading-relaxed md:text-sm'>{description}</p>
				</div>
			</div>
		</CardContainer>
	);
};

// ─── Icon Badge ───────────────────────────────────────────────────────────────

const IconBadge = ({ children }: { children: React.ReactNode }) => (
	<div
		className={cn(
			'flex shrink-0 items-center justify-center rounded-xl',
			'h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14',
			'gradient-primary',
			'shadow-[0_8px_24px_rgb(var(--accent-blue-rgb)/0.35),0_0_16px_rgb(var(--accent-blue-rgb)/0.15)]',
			'group-hover:shadow-[0_10px_32px_rgb(var(--accent-blue-rgb)/0.55),0_0_24px_rgb(var(--accent-blue-rgb)/0.35)]',
			'transition-[transform,box-shadow] duration-500 group-hover:scale-110',
		)}
	>
		<span className='text-2xl leading-none'>{children}</span>
	</div>
);
