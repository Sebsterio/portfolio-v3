export function FloatingShapesBg() {
	return (
		<>
			<div
				className='absolute top-[20%] right-[15%] h-[100px] w-[100px] rotate-45 animate-quantum-shape-float border-2 border-accent-blue/40'
				style={{
					boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
					transform: 'translateZ(0)',
					willChange: 'transform',
					animation: 'shapeFloat 10s ease-in-out infinite',
				}}
			/>
			<div
				className='absolute bottom-[20%] left-[10%] h-[150px] w-[150px] animate-quantum-shape-float rounded-full border-2 border-accent-cyan/30'
				style={{
					boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
					transform: 'translateZ(0)',
					willChange: 'transform',
					animationDelay: '-5s',
				}}
			/>
		</>
	);
}
