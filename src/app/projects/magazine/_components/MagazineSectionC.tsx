'use client';

import { ProjectImage_Placeholder } from '../../../../components/ProjectImage';

interface MagazineSectionCProps {
	number: string;
	title: string;
	subTitle: string;
	description: string[];
}

export function MagazineSectionC({ number, title, subTitle, description }: MagazineSectionCProps) {
	return (
		<section className='relative -mt-12 ml-0 lg:ml-[5%] group'>
			<div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-start'>
				{/* Text Column */}
				<div className='pt-4 md:pt-12'>
					{/* Number */}
					<div className='project-decorative-text project-decorative-outline text-[clamp(4rem,10vw,8rem)] leading-[0.8] -mb-4 transition-all duration-500 group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.5)] group-hover:[text-shadow:0_0_50px_rgba(0,217,255,0.3)]'>
						{number}
					</div>

					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-black text-white leading-[0.9] mb-4 transition-all duration-300 group-hover:text-accent-cyan'>
						{title}
					</h3>

					<p className='text-base md:text-lg text-muted mb-8'>{subTitle}</p>

					{description.map((paragraph, index) => (
						<p
							key={index}
							className={`text-sm md:text-base leading-relaxed text-secondary ${index < description.length - 1 ? 'mb-6' : ''}`}
						>
							{paragraph}
						</p>
					))}
				</div>

				{/* Image Column */}
				<div className='pt-4 md:pt-8 lg:mr-0 xl:mr-12'>
					<ProjectImage_Placeholder
						gradient='bg-gradient-tt'
						className='w-full h-[250px] md:h-[320px] lg:h-[380px] shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(79,172,254,0.2)] hover:scale-[1.02] hover:-rotate-1'
					/>
				</div>
			</div>
		</section>
	);
}
