'use client';

import { useState, type ReactNode } from 'react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { XOR } from '@/types';

// ----------------------------------------------------------------------------

type ImageProps = Omit<NextImageProps, 'src' | 'onError' | 'alt'> & {
	alt?: NextImageProps['alt'];
	src?: string;
	className?: string;
} & ImageFallbackProps;

type ImageFallbackProps = XOR<
	{ fallback: ReactNode },
	{ fallbackText?: string | false; fallbackClass?: string | false } //
>;

/**
 * Container for an Image and fallback background and text (or JSX)
 * - FUTURE: loaders, placeholders, blurhash, etc.
 * - TODO: rename
 * */
export const Image = ({
	alt = '',
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
		<div className={cn('relative flex items-center justify-center overflow-hidden', className)}>
			{!!src && !imageError ? (
				<NextImage className='object-cover' fill src={src} alt={alt} onError={() => setImageError(true)} {...imageProps} />
			) : (
				fallback
			)}
			{children}
		</div>
	);
};

// ----------------------------------------------------------------------------

type ProjectImageProps = ImageProps & {
	gradient?: string; // TEMP transitional
	overlayType?: 'dark' | 'light'; // TEMP transitional
	glintOnHover?: boolean;
};

export const ProjectImage = ({
	alt,
	children,
	className,
	gradient: gradientClassName,
	overlayType,
	fallback,
	fallbackClass = fallback ? undefined : 'text-white/50 text-sm font-semibold',
	fallbackText = fallback ? undefined : 'Screenshot Unavailable',
	glintOnHover,
	...props
}: ProjectImageProps) => {
	return (
		<Image
			{...props}
			alt={alt}
			className={cn('image-bg', glintOnHover && 'hover-glint', gradientClassName, className)}
			fallbackClass={fallbackClass}
			fallbackText={fallbackText}
		>
			{children}
			{overlayType === 'dark' && <div className='image-overlay-dark' />}
			{overlayType === 'light' && <div className='image-overlay-light' />}
		</Image>
	);
};
