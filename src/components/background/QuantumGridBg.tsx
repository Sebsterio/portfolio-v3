export function QuantumGridBg() {
	return (
		<div
			className='gradient-atmosphere-grid absolute inset-0 animate-quantum-grid-perspective opacity-20'
			style={{
				backgroundSize: '60px 60px',
				willChange: 'transform',
				transform: 'rotateX(60deg) scale(2) translateZ(0)',
				transformOrigin: 'center center',
			}}
		/>
	);
}
