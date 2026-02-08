'use client';

import { cn } from '@/lib/utils';

// Placeholder data
const metrics = [
	{ value: '15+', label: 'Years XP' },
	{ value: '120+', label: 'Projects' },
	{ value: '25+', label: 'Tech Stack' },
	{ value: '100%', label: 'Satisfaction' },
];

export function QuantumMetricsGrid() {
	return (
		<div
			className={cn(
				'relative w-full h-full p-10 rounded-3xl',
				'bg-gradient-to-br from-quantum-purple/5 to-quantum-magenta/5',
				'backdrop-blur-[20px] border border-quantum-purple/20',
				'shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(178,75,243,0.2)]',
				'transition-all duration-500'
			)}
		>
			{/* Metrics Grid */}
			<div className='w-full'>
				{metrics.map((metric, index) => (
					<div
						key={metric.label}
						className={cn('flex justify-between items-center', 'py-5 border-b border-quantum-purple/10', 'last:border-b-0')}
						style={{
							animation: `fadeInUp 0.8s ease-out ${0.8 + index * 0.1}s backwards`,
						}}
					>
						<span className='text-[13px] tracking-wider text-white/60 uppercase'>{metric.label}</span>
						<span
							className={cn(
								'font-exo text-[32px]/[32px] font-extrabold',
								'bg-gradient-to-br from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'
							)}
						>
							{metric.value}
						</span>
					</div>
				))}
			</div>

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
