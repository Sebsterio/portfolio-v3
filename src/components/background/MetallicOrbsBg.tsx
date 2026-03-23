export const MetallicOrbsBg = () => {
	return (
		<>
			{/* Metallic Orbs */}
			<div
				className='gradient-atmosphere-metallic-orb fixed top-[-150px] right-[-100px] h-[500px] w-[500px] animate-orb-float rounded-full'
				style={{
					filter: 'blur(80px)',
				}}
			/>
			<div
				className='gradient-atmosphere-metallic-orb fixed bottom-[-100px] left-[-100px] h-[400px] w-[400px] animate-orb-float rounded-full'
				style={{
					filter: 'blur(80px)',
					animationDelay: '-12s',
				}}
			/>
		</>
	);
};
