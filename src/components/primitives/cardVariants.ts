import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = 'static' | 'raised' | 'lifted';

// ─── Variant map ──────────────────────────────────────────────────────────────
//
// Transition lives here — not in CSS primitives.
// Rationale: Tailwind v4 arbitrary transition-[...] syntax emits only
// transition-property, not transition-duration. Both must be co-located
// on the same element. The component layer is the correct owner.

export const CARD_VARIANT_MAP: Record<CardVariant, string> = {
	static: '',
	raised: cn(
		'transition-[box-shadow,border-color] duration-200 ease-out',
		'hover:glass-elevation-2 hover:border-accent/20',
	),
	// Mild spring — scannable navigable cards (browse behaviour).
	// Lighter + faster than ShowcaseCard's spring (dwell behaviour).
	lifted: cn(
		'transition-[box-shadow,border-color,transform] duration-300',
		'ease-[cubic-bezier(0.34,1.2,0.64,1)]',
		'hover:glass-elevation-2 hover:border-accent/20 hover:-translate-y-1.5',
	),
};
