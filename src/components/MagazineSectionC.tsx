'use client';

import { ProjectImage } from './ProjectImage';

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
					<div className='decorative-text decorative-outline decorative-outline-editorial-strong-hover -mb-4 text-[clamp(4rem,10vw,8rem)] leading-[0.8]'>
						{number}
					</div>

					<h3 className='mb-4 font-urbanist text-4xl leading-[0.9] font-black text-white transition-all duration-300 group-hover:text-label md:text-5xl lg:text-6xl xl:text-[4.5rem]'>
						{title}
					</h3>

					<p className='mb-8 text-base text-muted md:text-lg'>{subTitle}</p>

					<div className='space-y-6'>
						{description.map((paragraph, index) => (
							<p key={index} className='text-sm leading-relaxed text-secondary md:text-base'>
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
						className='shadow-editorial-tt magazine-image h-[250px] w-full hover:scale-[1.02] hover:-rotate-1 md:h-[320px] lg:h-[380px]'
						overlayType='light'
						glintOnHover
					/>
				</div>
			</div>
		</section>
	);
}
