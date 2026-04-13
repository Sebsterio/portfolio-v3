'use client';

import { KeyboardEvent, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type FlipContainerProps = {
	front: ReactNode;
	back: ReactNode;
	className?: string;
};

const STAGE_CLASS = 'grid transform-3d transition-transform duration-600';
const FACE_CLASS = 'grid col-start-1 row-start-1 transition-opacity duration-300 backface-hidden opacity-100';
const FACE_FLIPPED_CLASS = 'pointer-events-none opacity-0';

export function FlipContainer({ className, front, back }: FlipContainerProps) {
	const [flipped, setFlipped] = useState(false);

	const toggle = () => setFlipped((value) => !value);

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		toggle();
	};

	return (
		<div
			role='button'
			tabIndex={0}
			aria-pressed={flipped}
			aria-label={flipped ? 'Show front' : 'Show back'}
			className={cn('w-full cursor-pointer overflow-x-clip perspective-[2000px]', className)}
			onClick={toggle}
			onKeyDown={onKeyDown}
		>
			<div className={cn(STAGE_CLASS, flipped && 'rotate-y-180')}>
				<div className={cn(FACE_CLASS, flipped && FACE_FLIPPED_CLASS)}>{front}</div>
				<div className={cn(FACE_CLASS, !flipped && FACE_FLIPPED_CLASS, 'rotate-y-180')}>{back}</div>
			</div>
		</div>
	);
}

export { FlipContainer as FlipCard };
