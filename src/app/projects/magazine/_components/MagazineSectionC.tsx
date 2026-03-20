'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

interface MagazineSectionCProps {
	sectionId: string;
	number: string;
	title: string;
	subTitle: string;
	description: string[];
	imageMain: string;
}

export function MagazineSectionC({ sectionId, number, title, subTitle, description, imageMain }: MagazineSectionCProps) {
	return (
		<section id={sectionId} className='group relative -mt-12 ml-0 lg:ml-[5%]'>
			<div className='grid items-start gap-8 md:gap-12 lg:grid-cols-2'>
				{/* Text Column */}
				<div className='pt-4 md:pt-12'>
					{/* Number */}
					<div className='decorative-text decorative-outline -mb-4 text-[clamp(4rem,10vw,8rem)] leading-[0.8] transition-all duration-500 group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.5)] group-hover:[text-shadow:0_0_50px_rgba(0,217,255,0.3)]'>
						{number}
					</div>

					<h3 className='mb-4 font-urbanist text-4xl leading-[0.9] font-black text-white transition-all duration-300 group-hover:text-accent-cyan md:text-5xl lg:text-6xl xl:text-[4.5rem]'>
						{title}
					</h3>

					<p className='text-muted mb-8 text-base md:text-lg'>{subTitle}</p>

					<div className='space-y-6'>
						{description.map((paragraph, index) => (
							<p key={index} className='text-secondary text-sm leading-relaxed md:text-base'>
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Image Column */}
				<div className='pt-4 md:pt-8 lg:mr-0 xl:mr-12'>
					<ProjectImage
						src={imageMain}
						gradient='bg-gradient-tt'
						className='magazine-image h-[250px] w-full shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(79,172,254,0.2)] hover:scale-[1.02] hover:-rotate-1 md:h-[320px] lg:h-[380px]'
						overlayType='light'
						glintOnHover
					/>
				</div>
			</div>
		</section>
	);
}
