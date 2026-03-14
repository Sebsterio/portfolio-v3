export const ChromeGradientBg = () => {
	return (
		<div
			className='fixed inset-0 animate-liquid-move'
			style={{
				background: `
            radial-gradient(ellipse at 25% 35%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 65%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `,
			}}
		/>
	);
};
