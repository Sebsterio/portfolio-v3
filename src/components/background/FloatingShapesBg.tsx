export function FloatingShapesBg() {
	return (
		<>
			<div
				className='absolute top-[20%] right-[15%] h-[100px] w-[100px] rotate-45 animate-quantum-shape-float border-2 border-accent-1/40 glow-atmosphere-1'
				style={{
					transform: 'translateZ(0)',
					willChange: 'transform',
					animation: 'shapeFloat 10s ease-in-out infinite',
				}}
			/>
			<div
				className='absolute bottom-[20%] left-[10%] h-[150px] w-[150px] animate-quantum-shape-float rounded-full border-2 border-accent-2/30 glow-atmosphere-2'
				style={{
					transform: 'translateZ(0)',
					willChange: 'transform',
					animationDelay: '-5s',
				}}
			/>
		</>
	);
}
