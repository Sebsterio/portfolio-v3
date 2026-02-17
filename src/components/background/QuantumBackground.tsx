import { cn } from '@/lib/utils';

export function QuantumBackground() {
	return (
		<>
			{/* 3D Grid Background */}
			<div
				className='absolute inset-0 opacity-20 animate-quantum-grid-perspective'
				style={{
					backgroundImage: `
            linear-gradient(rgba(160, 160, 160, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 160, 160, 0.08) 1px, transparent 1px)
          `,
					backgroundSize: '60px 60px',
					transform: 'rotateX(60deg) scale(2) translateZ(0)',
					transformOrigin: 'center center',
					willChange: 'transform',
				}}
			/>

			{/* Particles */}
			<div className='absolute inset-0'>
				{Array.from({ length: 15 }).map((_, i) => (
					<div
						key={i}
						className={cn(
							'absolute w-[3px] h-[3px] rounded-full opacity-0 animate-quantum-float',
							i % 3 === 0 ? 'bg-accent-cyan' : 'bg-chrome-mid'
						)}
						style={{
							left: `${(i * 7) % 100}%`,
							top: `${(i * 13) % 100}%`,
							animationDelay: `${(i * 0.7) % 10}s`,
							animationDuration: `${8 + (i % 3)}s`,
							boxShadow: i % 3 === 0 ? '0 0 8px rgba(6, 182, 212, 0.4)' : '0 0 6px rgba(160, 160, 160, 0.25)',
							transform: 'translateZ(0)',
							willChange: 'transform, opacity',
						}}
					/>
				))}
			</div>

			{/* Floating Geometric Shapes */}
			<div
				className='absolute w-[100px] h-[100px] border-2 border-accent-blue/40 
                   top-[20%] right-[15%] rotate-45 animate-quantum-shape-float'
				style={{
					boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
					transform: 'translateZ(0)',
					willChange: 'transform',
				}}
			/>
			<div
				className='absolute w-[150px] h-[150px] border-2 border-accent-cyan/30 
                   bottom-[20%] left-[10%] rounded-full'
				style={{
					animation: 'shapeFloat 10s ease-in-out infinite 2s',
					boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
					transform: 'translateZ(0)',
					willChange: 'transform',
				}}
			/>
		</>
	);
}
