'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'motion/react';

type PageTransitionContainerProps = {
	children: ReactNode;
	className?: string;
};

const TRANSITIONS: Variants = {
	initial: {
		...{ opacity: 0, y: 20 },
	},
	enter: {
		...{ opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], staggerChildren: 0.1 },
	},
	exit: {
		...{ opacity: 0, y: -20 },
		transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
	},
};

// TODO: fix "exit" animation

export const PageTransitionContainer = ({ children, className }: PageTransitionContainerProps) => {
	const pathname = usePathname();

	return (
		<AnimatePresence
			mode='wait'
			// initial={false} // <- prevents "enter" animation
		>
			<motion.div
				key={pathname}
				className={className}
				variants={TRANSITIONS}
				initial='initial'
				animate='enter'
				exit='exit' //
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default PageTransitionContainer;
