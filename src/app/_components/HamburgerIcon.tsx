'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import type { Transition } from 'motion/react';

type HamburgerIconProps = {
	isOpen: boolean;
};

export const HamburgerIcon = ({ isOpen }: HamburgerIconProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	const transition: Transition = shouldReduceMotion
		? { duration: 0 }
		: {
				type: 'spring',
				stiffness: 420,
				damping: 32,
		  };

	return (
		<motion.svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			className='text-chrome-silver overflow-visible'
			initial={false}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			animate={{ scale: isHovered ? 1.1 : 1 }}
			transition={transition}
			aria-hidden='true'
		>
			<defs>
				<filter id='hamburgerGlow' x='-50%' y='-50%' width='200%' height='200%'>
					<feDropShadow dx='0' dy='0' stdDeviation='3' floodColor='rgb(59,130,246)' floodOpacity='0.8' />
				</filter>
			</defs>

			<motion.g animate={{ filter: isHovered ? 'url(#hamburgerGlow)' : 'none' }} transition={{ duration: 0.2 }}>
				{/* Top */}
				<motion.line
					x1='3'
					x2='21'
					y1='6'
					y2='6'
					stroke='currentColor'
					strokeWidth='2'
					animate={isOpen ? { y1: 12, y2: 12, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
					transition={transition}
					style={{ originX: 0.5, originY: 0.5 }}
				/>

				{/* Middle */}
				<motion.line
					x1='3'
					x2='21'
					y1='12'
					y2='12'
					stroke='currentColor'
					strokeWidth='2'
					animate={{ opacity: isOpen ? 0 : 1 }}
					transition={{ duration: 0.15 }}
				/>

				{/* Bottom */}
				<motion.line
					x1='3'
					x2='21'
					y1='18'
					y2='18'
					stroke='currentColor'
					strokeWidth='2'
					animate={isOpen ? { y1: 12, y2: 12, rotate: -45 } : { y1: 18, y2: 18, rotate: 0 }}
					transition={transition}
					style={{ originX: 0.5, originY: 0.5 }}
				/>
			</motion.g>
		</motion.svg>
	);
};
