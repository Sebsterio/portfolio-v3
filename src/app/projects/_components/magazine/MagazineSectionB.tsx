'use client';

import { ProjectImage_Placeholder } from '../../../../components/ProjectImage';

interface MagazineSectionBProps {
	number: string;
	megaTitle: string;
	preTitle: string;
	title: string;
	subtitle: string;
	description: string[];
}

export function MagazineSectionB({ number, megaTitle, preTitle, title, subtitle, description }: MagazineSectionBProps) {
	return (
		<section className='relative -mt-8 group'>
			{/* Number */}
			<div className='text-xl md:text-2xl xl:text-3xl font-urbanist font-bold text-white/30 mb-4 relative z-20'>{number}</div>

			{/* Decorative Background Text */}
			<div className='project-decorative-text project-decorative-faded text-[clamp(6rem,20vw,20rem)] absolute top-[-2rem] md:top-[-4rem] left-[-1rem] md:left-[-2rem] w-full lg:w-auto z-10 transition-all duration-500 group-hover:text-white/10'>
				{megaTitle}
			</div>

			{/* Content Grid */}
			<div className='relative z-20 max-w-[1400px] ml-0 lg:ml-auto mr-0 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 lg:gap-16 items-center'>
				{/* Text Column */}
				<div className='py-4 md:py-8'>
					<p className='font-urbanist text-xs md:text-sm font-bold uppercase tracking-wider text-accent-cyan mb-6'>{preTitle}</p>

					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-black text-white leading-[0.95] mb-3 transition-all duration-300 group-hover:text-accent-cyan'>
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

				{/* Images Column */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 order-[-1] lg:order-none'>
					<ProjectImage_Placeholder
						gradient='bg-gradient-meco-main'
						className='md:col-span-2 h-[200px] md:h-[280px] lg:h-[300px] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(250,112,154,0.2)] hover:scale-[1.02]'
						overlayType='dark'
					/>

					<ProjectImage_Placeholder
						gradient='bg-gradient-meco-2'
						className='h-[150px] md:h-[180px] lg:h-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:-rotate-2'
						overlayType='none'
					/>

					<ProjectImage_Placeholder
						gradient='bg-gradient-meco-3'
						className='h-[150px] md:h-[180px] lg:h-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:rotate-2'
						overlayType='none'
					/>
				</div>
			</div>
		</section>
	);
}
