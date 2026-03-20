'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

interface MagazineSectionEProps {
	sectionId: string;
	number: string;
	megaTitle: string;
	preTitle: string;
	title: string;
	subtitle: string;
	description: string[];
	imageMain: string;
	imageAside: string;
}

export function MagazineSectionE({
	sectionId,
	number,
	megaTitle,
	preTitle,
	title,
	subtitle,
	description,
	imageMain,
	imageAside,
}: MagazineSectionEProps) {
	return (
		<section id={sectionId} className='group relative -mt-12 ml-0 lg:ml-[2%] xl:ml-[8%]'>
			{/* Decorative Mega Title */}
			<h2 className='decorative-text decorative-outline-soft decorative-outline-editorial-soft-hover pointer-events-none absolute -top-16 right-0 z-10 text-[clamp(8rem,22vw,18rem)] md:-top-24 lg:right-[-5%]'>
				{megaTitle}
			</h2>

			{/* Number */}
			<div className='gradient-number-highlight relative z-20 mb-4 bg-clip-text font-urbanist text-3xl font-black text-transparent md:text-4xl'>
				{number}
			</div>

			{/* Content Grid */}
			<div className='relative z-20 grid items-start gap-8 pl-0 md:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:pl-12'>
				{/* Images Column */}
				<div className='flex flex-col gap-8'>
					<ProjectImage
						src={imageMain}
						gradient='bg-gradient-ao-main'
						className='shadow-editorial-ao magazine-image h-[200px] w-full hover:scale-[1.02] hover:-rotate-1 md:h-[280px] lg:h-[300px]'
						overlayType='dark'
						glintOnHover
					/>

					<ProjectImage
						src={imageAside}
						gradient='bg-gradient-ao-small'
						className='shadow-image-md magazine-image order-3 ml-auto h-[150px] w-3/4 hover:-translate-y-2 md:h-[200px] lg:order-0 lg:h-[220px]'
						glintOnHover
					/>
				</div>

				{/* Text Column */}
				<div className='order-2 pt-8 lg:order-0 lg:pt-20'>
					<p className='mb-6 font-urbanist text-xs font-bold tracking-wider text-label uppercase md:text-sm'>{preTitle}</p>

					<h3 className='mb-4 font-urbanist text-4xl leading-[0.85] font-black text-white transition-all duration-300 group-hover:text-label md:text-5xl lg:text-6xl xl:text-[5rem]'>
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
			</div>
		</section>
	);
}
