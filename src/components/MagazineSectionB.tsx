'use client';

import { ProjectImage } from './ProjectImage';

interface MagazineSectionBProps {
	sectionId: string;
	number: string;
	megaTitle: string;
	preTitle: string;
	title: string;
	subtitle: string;
	description: string[];
}

export function MagazineSectionB({ sectionId, number, megaTitle, preTitle, title, subtitle, description }: MagazineSectionBProps) {
	return (
		<section id={sectionId} className='group relative -mt-8'>
			{/* Number */}
			<div className='relative z-20 mb-4 font-urbanist text-xl font-bold text-white/30 md:text-2xl xl:text-3xl'>{number}</div>

			{/* Decorative Background Text */}
			<div className='decorative-text decorative-faded absolute -top-8 -left-4 z-10 w-full text-[clamp(6rem,20vw,20rem)] transition-all duration-500 group-hover:text-white/10 md:-top-16 md:-left-8 lg:w-auto'>
				{megaTitle}
			</div>

			{/* Content Grid */}
			<div className='relative z-20 mr-0 ml-0 grid max-w-[1400px] items-center gap-8 md:gap-12 lg:ml-auto lg:grid-cols-[0.8fr_1.2fr] lg:gap-16'>
				{/* Text Column */}
				<div className='py-4 md:py-8'>
					<p className='mb-6 font-urbanist text-xs font-bold tracking-wider text-label uppercase md:text-sm'>{preTitle}</p>

					<h3 className='mb-3 font-urbanist text-4xl leading-[0.95] font-black text-white transition-all duration-300 group-hover:text-label md:text-5xl lg:text-6xl xl:text-[4rem]'>
						{title}
					</h3>

					<p className='mb-8 text-base text-muted md:text-lg'>{subtitle}</p>

					<div className='space-y-6'>
						{description.map((paragraph, index) => (
							<p key={index} className='text-sm leading-relaxed text-secondary md:text-base'>
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Images Column */}
				<div className='-order-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:order-0'>
					<ProjectImage
						gradient='bg-gradient-meco-main'
						className='shadow-editorial-meco magazine-image h-[200px] hover:scale-[1.02] md:col-span-2 md:h-[280px] lg:h-[300px]'
						overlayType='dark'
						glintOnHover
					/>

					<ProjectImage
						gradient='bg-gradient-meco-2'
						className='magazine-image h-[150px] shadow-image-md hover:-translate-y-2 hover:-rotate-2 md:h-[180px] lg:h-[200px]'
						glintOnHover
					/>

					<ProjectImage
						gradient='bg-gradient-meco-3'
						className='magazine-image h-[150px] shadow-image-md hover:-translate-y-2 hover:rotate-2 md:h-[180px] lg:h-[200px]'
						glintOnHover
					/>
				</div>
			</div>
		</section>
	);
}
