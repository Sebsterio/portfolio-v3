export const MetallicOrbsBg = () => {
	return (
		<>
			{/* Metallic Orbs */}
			<div
				className='fixed w-[500px] h-[500px] top-[-150px] right-[-100px] rounded-full animate-orb-float'
				style={{
					background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			<div
				className='fixed w-[400px] h-[400px] bottom-[-100px] left-[-100px] rounded-full animate-orb-float'
				style={{
					background: 'radial-gradient(circle at 30% 30%, rgba(240, 240, 240, 0.2), rgba(160, 160, 160, 0.1) 40%, transparent 70%)',
					filter: 'blur(80px)',
					animationDelay: '-12s',
				}}
			/>
		</>
	);
};
