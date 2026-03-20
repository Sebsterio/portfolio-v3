'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

interface MagazineSectionDProps {
	sectionId: string;
	number: string;
	title: string;
	subtitle: string;
	description: string[];
	imageMain: string;
	imageAside: string;
}

export function MagazineSectionD({ sectionId, number, title, subtitle, description, imageMain, imageAside }: MagazineSectionDProps) {
	return (
		<section id={sectionId} className='group relative -mt-8'>
			{/* Decorative Number */}
			<div className='decorative-text absolute -top-12 right-[2%] z-30 text-[clamp(6rem,15vw,12rem)] text-transparent transition-all duration-500 [-webkit-text-stroke:2px_rgba(255,255,255,0.08)] group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.2)] md:-top-20 md:right-[5%] lg:-top-24'>
				{number}
			</div>

			{/* Large Image */}
			<ProjectImage
				src={imageMain}
				gradient='bg-gradient-ebit-main'
				className='magazine-image mb-8 h-[250px] w-full shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(106,17,203,0.2)] hover:scale-[1.01] md:h-[320px] lg:mb-8 lg:h-[380px]'
				overlayType='light'
				glintOnHover
			/>

			{/* Content Grid */}
			<div className='relative grid items-start gap-8 md:gap-12 lg:grid-cols-[1fr_400px] lg:gap-16'>
				{/* Text Column */}
				<div className='lg:backdrop-blur-0 relative z-20 -mt-24 rounded-2xl border border-accent-cyan/20 bg-black/80 p-8 py-4 backdrop-blur-md md:py-8 lg:mt-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0'>
					<h3 className='mb-2 font-urbanist text-4xl leading-[0.95] font-black text-white transition-all duration-300 group-hover:text-accent-cyan md:text-5xl lg:text-6xl xl:text-[5rem]'>
						{title}
					</h3>

					<p className='text-muted mb-8 text-base md:text-lg'>{subtitle}</p>

					<div className='space-y-6'>
						{description.map((paragraph, index) => (
							<p key={index} className='text-secondary text-sm leading-relaxed md:text-base'>
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Small Image */}
				<ProjectImage
					src={imageAside}
					gradient='bg-gradient-ebit-small'
					className='magazine-image h-[200px] w-[70%] w-full -translate-y-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.02] md:h-[250px] lg:mt-0 lg:h-[350px] lg:w-full lg:-translate-x-12 lg:translate-y-8 lg:hover:-translate-x-14 lg:hover:translate-y-6'
					glintOnHover
				/>
			</div>
		</section>
	);
}
