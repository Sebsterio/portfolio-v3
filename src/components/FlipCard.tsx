'use client';

import { KeyboardEvent, PropsWithChildren, useState } from 'react';
import { cn } from '@/lib/utils';

type FlipCardProps = PropsWithChildren<{
	className?: string;
}>;

export function FlipCard({ children, className }: FlipCardProps) {
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
			className={cn('w-full cursor-pointer', className)}
			onClick={onFlip}
			onKeyDown={onKeyDown}
		>
			<div
				className={cn(
					'grid transition-transform duration-600 transform-3d',
					'*:col-start-1 *:row-start-1 *:transition-opacity *:duration-300 *:backface-hidden',
					'[&>*:nth-child(2)]:rotate-y-180',
					flipped
						? 'rotate-y-180 [&>*:first-child]:pointer-events-none [&>*:first-child]:opacity-0 [&>*:nth-child(2)]:opacity-100'
						: '[&>*:first-child]:opacity-100 [&>*:nth-child(2)]:pointer-events-none [&>*:nth-child(2)]:opacity-0',
				)}
			>
				{children}
			</div>
		</div>
	);
}
