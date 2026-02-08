'use client';

import { cn } from '@/lib/utils';
import { showcaseItems } from '@/lib/showcase-items';
import { QuantumShowcaseCard } from '@/components/QuantumShowcaseCard';

// Template: Liquid Metal
export function ShowcaseCards() {
	return (
		<div className={cn('relative w-full h-full p-10 flex flex-col gap-6')}>
			{showcaseItems.map(({ id, icon, title, description }) => (
				<QuantumShowcaseCard key={id} icon={icon} title={title} description={description} />
			))}
		</div>
	);
}
