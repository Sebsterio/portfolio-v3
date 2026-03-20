type HamburgerIconProps = {
	isOpen: boolean;
};

export function HamburgerIcon({ isOpen }: HamburgerIconProps) {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' className='overflow-visible text-chrome-silver/80' aria-hidden='true'>
			<defs>
				<filter id='hamburgerGlow' x='-50%' y='-50%' width='200%' height='200%'>
					<feDropShadow dx='0' dy='0' stdDeviation='3' floodColor='rgb(255,255,255)' floodOpacity='0.1' />
					<feDropShadow dx='0' dy='0' stdDeviation='2' floodColor='rgb(59,130,246)' floodOpacity='1' />
				</filter>
			</defs>

			<g className='transition-[filter] duration-200' style={{ filter: isOpen ? 'url(#hamburgerGlow)' : 'none' }}>
				{/* Top line */}
				<line
					x1='3'
					y1='6'
					x2='21'
					y2='6'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					className='origin-center transition-transform duration-300 ease-out'
					style={{
						transformBox: 'fill-box',
						transformOrigin: 'center',
						transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
					}}
				/>

				{/* Middle line */}
				<line
					x1='3'
					y1='12'
					x2='21'
					y2='12'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					className='transition-opacity duration-150 ease-out'
					style={{
						opacity: isOpen ? 0 : 1,
					}}
				/>

				{/* Bottom line */}
				<line
					x1='3'
					y1='18'
					x2='21'
					y2='18'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					className='origin-center transition-transform duration-300 ease-out'
					style={{
						transformBox: 'fill-box',
						transformOrigin: 'center',
						transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
					}}
				/>
			</g>
		</svg>
	);
}
