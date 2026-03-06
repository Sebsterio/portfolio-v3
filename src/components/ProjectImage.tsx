'use client';

import { useState, type ReactNode } from 'react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { XOR } from '@/types';

// ----------------------------------------------------------------------------

type ImageProps = Omit<NextImageProps, 'src' | 'onError'> & {
	src: string | undefined;
	className?: string;
} & XOR<
		{ fallback: ReactNode },
		{ fallbackText?: string | false; fallbackClass?: string | false } //
	>;

/**
 * Container for an Image and fallback background and text (or JSX)
 * - FUTURE: loaders, placeholders, blurhash, etc.
 * - TODO: rename
 * */
export const Image = ({
	src,
	className,
	children,
	fallbackText = 'Error Loading Image',
	fallbackClass = 'text-white/40 text-sm font-semibold', // ?
	fallback = <span className={cn('z-10', fallbackClass)}>{fallbackText}</span>,
	...imageProps
}: ImageProps) => {
	const [imageError, setImageError] = useState(false);
	return (
		<div className={cn('relative overflow-hidden flex items-center justify-center', className)}>
			{!!src && !imageError ? (
				<NextImage className='object-cover' fill src={src} onError={() => setImageError(true)} {...imageProps}>
					{children}
				</NextImage>
			) : (
				fallback
			)}
			{children}
		</div>
	);
};

// ----------------------------------------------------------------------------

// TODO: include interaction styles of ProjectImage_Placeholder

export const ProjectImage = ({ alt, ...props }: ImageProps) => <Image {...props} alt={alt} />;

// ----------------------------------------------------------------------------

// TODO: repace instances with ProjectImage

type ProjectImagePlaceholderProps = {
	gradient: string;
	className?: string;
	overlayType?: 'dark' | 'light' | 'none';
	children?: React.ReactNode;
};

/**
 * @deprecated use `ProjectImage`
 */
export function ProjectImage_Placeholder({ gradient, className, overlayType = 'light', children }: ProjectImagePlaceholderProps) {
	return (
		<div className={cn('project-image', gradient, className)}>
			{overlayType !== 'none' && <div className={overlayType === 'dark' ? 'project-image-overlay-dark' : 'project-image-overlay-light'} />}
			{children}
		</div>
	);
}
