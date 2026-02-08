'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface QuantumShowcaseCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const QuantumShowcaseCard: React.FC<QuantumShowcaseCardProps> = ({ icon, title, description, className }) => {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!cardRef.current) return;

		gsap.fromTo(
			cardRef.current,
			{ opacity: 0, x: 60 },
			{
				opacity: 1,
				x: 0,
				duration: 1.5,
				ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				delay: 0.6,
			}
		);
	}, []);

	return (
		<div
			ref={cardRef}
			className={cn(
				'relative p-10 rounded-3xl overflow-hidden',
				'bg-[rgba(5,5,10,0.7)] backdrop-blur-[30px]',
				'border border-quantum-purple/20',
				'shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(178,75,243,0.2)]',
				'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
				'hover:translate-y-[-10px] hover:border-quantum-purple/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
				className
			)}
		>
			<div className='absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-quantum-purple/30 rounded-tl-3xl' />
			<div className='absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-quantum-purple/30 rounded-tr-3xl' />
			<div className='absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-quantum-purple/30 rounded-bl-3xl' />
			<div className='absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-quantum-purple/30 rounded-br-3xl' />

			<div className='flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-quantum-purple to-quantum-magenta shadow-[0_10px_30px_rgba(178,75,243,0.3)]'>
				<div className='text-[26px]'>{icon}</div>
			</div>

			<h3 className='font-exo text-xl font-bold text-white mb-3'>{title}</h3>

			<p className='text-[13px] leading-relaxed text-white/70'>{description}</p>
		</div>
	);
};
