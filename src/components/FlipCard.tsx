'use client';

import { KeyboardEvent, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type FlipCardProps = {
	front: ReactNode;
	back: ReactNode;
	render?: (face: ReactNode) => ReactNode;
	className?: string;
};

export function FlipCard({ className, front, back, render: renderFace = (f) => f }: FlipCardProps) {
	const [flipped, setFlipped] = useState(false);

	const onFlip = () => setFlipped((value) => !value);

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		onFlip();
	};

	return (
		<div
			role='button'
			tabIndex={0}
			aria-pressed={flipped}
			aria-label={flipped ? 'Show project summary' : 'Show project case study'}
			className={cn('w-full cursor-pointer overflow-x-clip perspective-[2000px]', className)}
			onClick={onFlip}
			onKeyDown={onKeyDown}
		>
			<div
				className={cn(
					'grid transition-transform duration-600 transform-3d',
					'*:col-start-1 *:row-start-1 *:transition-opacity *:duration-300 *:backface-hidden',
					'[&>[data-flip-face="back"]]:rotate-y-180',
					flipped
						? '[transform:rotateY(180deg)] [&>[data-flip-face="back"]]:opacity-100 [&>[data-flip-face="front"]]:pointer-events-none [&>[data-flip-face="front"]]:opacity-0'
						: '[&>[data-flip-face="back"]]:pointer-events-none [&>[data-flip-face="back"]]:opacity-0 [&>[data-flip-face="front"]]:opacity-100',
				)}
			>
				<div data-flip-face='front'>{renderFace(front)}</div>
				<div data-flip-face='back'>{renderFace(back)}</div>
			</div>
		</div>
	);
}
