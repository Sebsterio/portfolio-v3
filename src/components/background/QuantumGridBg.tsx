export function QuantumGridBg() {
	return (
		<div
			className='absolute inset-0 animate-quantum-grid-perspective opacity-20'
			style={{
				backgroundImage: `
            linear-gradient(rgba(160, 160, 160, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 160, 160, 0.08) 1px, transparent 1px)
          `,
				backgroundSize: '60px 60px',
				willChange: 'transform',
				transform: 'rotateX(60deg) scale(2) translateZ(0)',
				transformOrigin: 'center center',
			}}
		/>
	);
}
