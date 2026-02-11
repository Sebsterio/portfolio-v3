'use client';

export function ChromeBackground() {
	return (
		<>
			{/* Liquid Chrome Background */}
			<div
				className='fixed inset-0 pointer-events-none animate-liquid-move'
				style={{
					background: `
            radial-gradient(ellipse at 25% 35%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 65%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
				}}
			/>

			{/* Metallic Orbs */}
			<div
				className='fixed w-[500px] h-[500px] top-[-150px] right-[-100px] rounded-full pointer-events-none animate-orb-float'
				style={{
					background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			<div
				className='fixed w-[400px] h-[400px] bottom-[-100px] left-[-100px] rounded-full pointer-events-none'
				style={{
					background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
					filter: 'blur(80px)',
					animation: 'orbFloat 25s ease-in-out infinite 12s',
				}}
			/>
		</>
	);
}
