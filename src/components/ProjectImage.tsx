'use client';

import { cn } from '@/lib/utils';

/**
 * --- // TEMP // ---
 */

interface ProjectImageProps {
	gradient: string;
	className?: string;
	overlayType?: 'dark' | 'light' | 'none';
	children?: React.ReactNode;
}

export function ProjectImage({ gradient, className, overlayType = 'light', children }: ProjectImageProps) {
	return (
		<div className={cn('project-image', gradient, className)}>
			{overlayType !== 'none' && <div className={overlayType === 'dark' ? 'project-image-overlay-dark' : 'project-image-overlay-light'} />}
			{children}
		</div>
	);
}
