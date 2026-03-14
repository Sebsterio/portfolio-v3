'use client';

import { AnimatePresence, motion, Variants } from 'motion/react';
import { ReactNode } from 'react';

// --------------------------------------------------------------------------------------------------
//  BackgroundTransitionContainer
//   - Allows bg transition to be timed independently from page transtions without blocking navigation
//
//  Currently UNUSED
//   -> Render this in root layout when implementing variable app background
// --------------------------------------------------------------------------------------------------

type BackgroundProviderProps = {
	/** Background component(s) to render) */
	children: ReactNode;
	/** Unique key to trigger transitions when changed */
	bgKey: string;
	className?: string;
};

const TRANSITIONS: Variants = {
	initial: { opacity: 0 },
	enter: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
	exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

export const BackgroundTransitionContainer = ({ children, bgKey = 'default', className }: BackgroundProviderProps) => {
	return (
		<AnimatePresence mode='wait' initial={false}>
			<motion.div
				key={bgKey}
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
