'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

interface MagazineSectionDProps {
	number: string;
	title: string;
	subtitle: string;
	description: string[];
}

export function MagazineSectionD({ number, title, subtitle, description }: MagazineSectionDProps) {
	return (
		<section className='relative -mt-8 group'>
			{/* Decorative Number */}
			<div className='project-decorative-text text-transparent text-[clamp(6rem,15vw,12rem)] absolute top-[-3rem] md:top-[-5rem] lg:top-[-6rem] right-[2%] md:right-[5%] z-30 [-webkit-text-stroke:2px_rgba(255,255,255,0.08)] transition-all duration-500 group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.2)]'>
				{number}
			</div>

			{/* Large Image */}
			<ProjectImage
				gradient='bg-gradient-ebit-main'
				className='w-full h-[250px] md:h-[320px] lg:h-[380px] mb-8 lg:mb-8 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(106,17,203,0.2)] hover:scale-[1.01]'
				overlayType='light'
			/>

			{/* Content Grid */}
			<div className='grid lg:grid-cols-[1fr_400px] gap-8 md:gap-12 lg:gap-16 items-start relative'>
				{/* Text Column */}
				<div className='py-4 md:py-8 relative z-20 lg:bg-transparent bg-black/80 lg:backdrop-blur-0 backdrop-blur-md lg:p-0 p-8 lg:rounded-none rounded-2xl lg:border-0 border border-accent-cyan/20 lg:mt-0 -mt-24'>
					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-black text-white leading-[0.95] mb-2 transition-all duration-300 group-hover:text-accent-cyan'>
						{title}
					</h3>

					<p className='text-base md:text-lg text-chrome-silver/60 mb-8'>{subtitle}</p>

					{description.map((paragraph, index) => (
						<p
							key={index}
							className={`text-sm md:text-base leading-relaxed text-chrome-silver/75 ${index < description.length - 1 ? 'mb-6' : ''}`}
						>
							{paragraph}
						</p>
					))}
				</div>

				{/* Small Image */}
				<ProjectImage
					gradient='bg-gradient-ebit-small'
					className='w-full lg:w-full h-[200px] md:h-[250px] lg:h-[350px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] lg:-translate-x-12 lg:translate-y-8 -translate-y-12 lg:mt-0 w-[70%] hover:lg:-translate-x-14 hover:lg:translate-y-6 hover:scale-[1.02] transition-all duration-500'
					overlayType='none'
				/>
			</div>
		</section>
	);
}
