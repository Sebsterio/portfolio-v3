import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type LayoutSlotProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const classes = {
	container: 'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-8 lg:gap-y-10',
	card: 'col-span-3 row-start-1 lg:col-span-1 lg:col-start-2',
	prev: 'col-start-1 row-start-2 justify-self-start lg:row-start-1 lg:self-center',
	next: 'col-start-3 row-start-2 justify-self-end lg:row-start-1 lg:self-center',
	pagination: 'col-start-2 row-start-2 justify-self-center',
} as const;

function createSlot(className: string) {
	const LayoutSlot = (props: LayoutSlotProps) => <div {...props} className={cn(className, props.className)} />;
	return LayoutSlot;
}

export const CardsProjectPageLayout = Object.assign(createSlot(classes.container), {
	Card: createSlot(classes.card),
	Prev: createSlot(classes.prev),
	Next: createSlot(classes.next),
	Pagination: createSlot(classes.pagination),
});
