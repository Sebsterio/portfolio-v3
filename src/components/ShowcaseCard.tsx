import { cn } from '@/lib/utils';
import { GlassSurface } from '@/components/ui/GlassSurface';

interface ShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

/**
 * ShowcaseCard — feature highlight card with animated glint and elevation.
 *
 * Used on the home and about pages. Spring easing on `transition-ease`
 * gives hover a physical, overshoot feel.
 *
 * GlassSurface provides: reflection, noise, glint, hover shadow + elevation.
 * glass-edge-glow is kept explicit here because its position is custom
 * (not full-width — intentionally narrowed to the centre 60%).
 */
export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ icon, title, description, className }) => {
	return (
		<GlassSurface
			rounded={2}
			hoverable
			hovered='elevated'
			glint
			className={cn('group p-6 sm:p-8 md:p-10', 'duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]', className)}
		>
			{/* Custom-positioned edge glow — narrower than full-width */}
			<div className='glass-edge-glow overlay top-0 left-[15%] h-px w-[70%]' aria-hidden />

			{/* Content sits above overlays via DOM order */}
			<div className='flex gap-5 sm:gap-6'>
				<IconBadge>{icon}</IconBadge>
				<div className='min-w-0'>
					{/* NOTE: margin on this element or its sibling causes a VT flash on nav */}
					<h3 className='font-display text-base font-bold text-chrome-silver sm:text-lg md:text-xl'>{title}</h3>
					<p className='text-muted mt-1.5 text-[13px] leading-relaxed md:text-sm'>{description}</p>
				</div>
			</div>
		</GlassSurface>
	);
};

// ─── Icon Badge ───────────────────────────────────────────────────────────────

const IconBadge = ({ children }: { children: React.ReactNode }) => (
	<div
		className={cn(
			'flex shrink-0 items-center justify-center rounded-xl',
			'h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14',
			'gradient-primary',
			// CSS-variable shadows — no hardcoded RGB
			'shadow-[0_8px_24px_rgb(var(--accent-blue-rgb)/0.35),0_0_16px_rgb(var(--accent-blue-rgb)/0.15)]',
			'group-hover:shadow-[0_10px_32px_rgb(var(--accent-blue-rgb)/0.55),0_0_24px_rgb(var(--accent-blue-rgb)/0.35)]',
			'transition-[transform,box-shadow] duration-500 group-hover:scale-110',
		)}
	>
		<span className='text-2xl leading-none'>{children}</span>
	</div>
);
