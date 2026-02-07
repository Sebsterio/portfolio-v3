'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LEGACY_SITE_URL } from '@/lib/constants';
import SocialLinks from './SocialLinks';

export default function ComingSoonContent() {
	const containerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const socialRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const tl = gsap.timeline();

		// Set initial states
		gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, socialRef.current], {
			opacity: 0,
			y: 60,
			scale: 0.9,
		});

		// Entrance animation sequence
		tl.to(
			titleRef.current,
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.8,
				ease: 'power3.out',
			},
			'-=0.6'
		)
			.to(
				subtitleRef.current,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: 'power3.out',
				},
				'-=0.6'
			)
			.to(
				descriptionRef.current,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: 'power3.out',
				},
				'-=0.6'
			)
			.to(
				socialRef.current,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: 'power3.out',
				},
				'-=0.4'
			);
	}, []);

	return (
		<div ref={containerRef} className='min-h-screen flex items-center justify-center p-4 relative z-10'>
			<div className='glass-strong rounded-2xl p-8 md:p-12 max-w-3xl w-full text-center relative overflow-hidden'>
				{/* Content */}
				<div className='relative z-10'>
					{/* Main Title */}
					<div ref={titleRef}>
						<h1 className='text-4xl md:text-7xl font-bold my-6 gradient-text'>Website Under Development</h1>
					</div>

					{/* Subtitle */}
					<div ref={subtitleRef} className='text-2xl md:text-3xl text-slate-300 mb-4 font-light'>
						<p className='accent-gradient'>New portfolio is on the way.</p> Rebuilt from the ground up.
					</div>

					{/* Description */}
					<div ref={descriptionRef} className='space-y-4 mb-10'>
						<p className='text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto'>
							The{' '}
							<a href={LEGACY_SITE_URL} className='text-blue-400 underline'>
								previous version
							</a>{' '}
							no longer reflects my experience, technical stack, or design approach. Over the past few years, my work has evolved
							significantly — both in how I build things and who I build them for.
						</p>
						<p className='text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto'>
							The new portfolio will reflect that reality more accurately.
						</p>
						<p className='text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto'>Feel free to get in touch in the meantime.</p>
					</div>

					{/* Social Links */}
					<div ref={socialRef} className='mb-8'>
						<SocialLinks />
					</div>

					{/* Status */}
					<div className='flex items-center justify-center gap-3'>
						<div className='relative'>
							<div className='w-3 h-3 bg-emerald-400 rounded-full animate-pulse' />
							<div className='absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping' />
						</div>
						<span className='text-slate-400 font-medium'>Portfolio v3.0 in development</span>
					</div>
				</div>

				{/* Decorative elements */}
				<div className='absolute top-6 right-6 w-24 h-24 border border-red-400/20 rounded-full animate-float' />
				<div
					className='absolute bottom-6 left-6 w-16 h-16 border border-cyan-400/20 rounded-full animate-float'
					style={{ animationDelay: '2s' }}
				/>
				<div
					className='absolute top-1/2 left-6 w-8 h-8 border border-blue-400/20 rounded-full animate-float'
					style={{ animationDelay: '4s' }}
				/>
			</div>
		</div>
	);
}
