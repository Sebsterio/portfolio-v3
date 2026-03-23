import { cn } from '@/lib/utils';

export function PaerticlesBg() {
	return (
		<div className='absolute inset-0'>
			{Array.from({ length: 15 }).map((_, i) => (
				<div
					key={i}
					className={cn(
						'absolute h-[3px] w-[3px] animate-quantum-float rounded-full opacity-0',
						i % 3 === 0 ? 'bg-accent-2 glow-particle-accent' : 'bg-neutral-3 glow-particle-neutral',
					)}
					style={{
						left: `${(i * 7) % 100}%`,
						top: `${(i * 13) % 100}%`,
						transform: 'translateZ(0)',
						animationName: 'quantumFloat',
						animationDelay: `-${(i * 0.9) % 10}s`,
						animationDuration: `${8 + (i % 3)}s`,
					}}
				/>
			))}
		</div>
	);
}
