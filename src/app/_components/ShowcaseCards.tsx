'use client';

import { cn } from '@/lib/utils';
import { showcaseItems } from '@/lib/showcase-items';
import { LiquidMetalShowcaseCard } from '@/components/LiquidMetalShowcaseCard';

export function ShowcaseCards() {
	return (
		<div className={cn('relative w-full h-full p-10 flex flex-col gap-6')}>
			{showcaseItems.map(({ icon, title, description }) => (
				<LiquidMetalShowcaseCard icon={icon} title={title} description={description} />
			))}
		</div>
	);
}
