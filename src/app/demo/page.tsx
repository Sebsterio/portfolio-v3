'use client';

import { useState } from 'react';
import { useTransitionReady } from '@/lib/transitions/TransitionProvider';
import { CardExpansion } from './_concepts/CardExpansion';
import { SplitTimeline } from './_concepts/SplitTimeline';
import { CardDeck3D } from './_concepts/CardDeck3D';
import { cn } from '@/lib/utils';

type Concept = 'expansion' | 'timeline' | 'deck';

export default function ProjectsDemoPage() {
	useTransitionReady();
	const [concept, setConcept] = useState<Concept>('expansion');

	return (
		<div className='w-full space-y-8'>
			{/* Concept Switcher */}
			<div className='flex gap-3 justify-center'>
				{(['expansion', 'timeline', 'deck'] as Concept[]).map((c) => (
					<button
						key={c}
						onClick={() => setConcept(c)}
						className={cn(
							'px-6 py-3 rounded-full font-dm-sans text-sm font-semibold transition-all duration-300',
							concept === c
								? 'bg-gradient-to-br from-accent-blue to-accent-cyan text-white'
								: 'bg-white/[0.03] text-chrome-silver/60 hover:text-chrome-silver hover:bg-white/[0.08]'
						)}
					>
						{c === 'expansion' && 'Card Expansion'}
						{c === 'timeline' && 'Split Timeline'}
						{c === 'deck' && '3D Card Deck'}
					</button>
				))}
			</div>

			{/* Active Concept */}
			<div className='min-h-[600px]'>
				{concept === 'expansion' && <CardExpansion />}
				{concept === 'timeline' && <SplitTimeline />}
				{concept === 'deck' && <CardDeck3D />}
			</div>
		</div>
	);
}
