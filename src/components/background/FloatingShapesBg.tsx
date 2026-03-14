export function FloatingShapesBg() {
	return (
		<>
			<div
				className='absolute top-[20%] right-[15%] w-[100px] h-[100px] rotate-45 border-2 border-accent-blue/40 animate-quantum-shape-float'
				style={{
					boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
					transform: 'translateZ(0)',
					willChange: 'transform',
					animation: 'shapeFloat 10s ease-in-out infinite',
				}}
			/>
			<div
				className='absolute bottom-[20%] left-[10%] w-[150px] h-[150px] rounded-full border-2 border-accent-cyan/30 animate-quantum-shape-float'
				style={{
					boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
					transform: 'translateZ(0)',
					willChange: 'transform',
					aninmationDelay: '-5s',
				}}
			/>
		</>
	);
}
