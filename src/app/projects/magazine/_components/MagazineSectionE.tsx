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
			<h2 className='decorative-text pointer-events-none absolute -top-16 right-0 z-10 text-[clamp(8rem,22vw,18rem)] text-transparent transition-all duration-500 [-webkit-text-stroke:2px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.2)] md:-top-24 lg:right-[-5%]'>
				{megaTitle}
			</h2>

			{/* Number */}
			<div className='relative z-20 mb-4 bg-linear-to-br from-accent-cyan to-white bg-clip-text font-urbanist text-3xl font-black text-transparent md:text-4xl'>
				{number}
			</div>

			{/* Content Grid */}
			<div className='relative z-20 grid items-start gap-8 pl-0 md:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:pl-12'>
				{/* Images Column */}
				<div className='flex flex-col gap-8'>
					<ProjectImage
						src={imageMain}
						gradient='bg-gradient-ao-main'
						className='magazine-image h-[200px] w-full shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(240,147,251,0.2)] hover:scale-[1.02] hover:-rotate-1 md:h-[280px] lg:h-[300px]'
						overlayType='dark'
						glintOnHover
					/>

					<ProjectImage
						src={imageAside}
						gradient='bg-gradient-ao-small'
						className='magazine-image order-3 ml-auto h-[150px] w-3/4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 md:h-[200px] lg:order-0 lg:h-[220px]'
						glintOnHover
					/>
				</div>

				{/* Text Column */}
				<div className='order-2 pt-8 lg:order-0 lg:pt-20'>
					<p className='mb-6 font-urbanist text-xs font-bold tracking-wider text-accent-cyan uppercase md:text-sm'>{preTitle}</p>

					<h3 className='mb-4 font-urbanist text-4xl leading-[0.85] font-black text-white transition-all duration-300 group-hover:text-accent-cyan md:text-5xl lg:text-6xl xl:text-[5rem]'>
						{title}
					</h3>

					<p className='text-muted mb-8 text-base md:text-lg'>{subtitle}</p>

					{description.map((paragraph, index) => (
						<p
							key={index}
							className={`text-secondary text-sm leading-relaxed md:text-base ${index < description.length - 1 ? 'mb-6' : ''}`}
						>
							{paragraph}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}
