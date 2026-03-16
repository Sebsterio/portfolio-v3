export const MetallicOrbsBg = () => {
	return (
		<>
			{/* Metallic Orbs */}
			<div
				className='fixed top-[-150px] right-[-100px] h-[500px] w-[500px] animate-orb-float rounded-full'
				style={{
					background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			<div
				className='fixed bottom-[-100px] left-[-100px] h-[400px] w-[400px] animate-orb-float rounded-full'
				style={{
					background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
					filter: 'blur(80px)',
					animationDelay: '-12s',
				}}
			/>
		</>
	);
};
