'use client';

import { TechTags } from '@/components/TechTags';
import { ProjectImage_Placeholder } from '../../../../components/ProjectImage';
import { ParsedText } from '@/lib/parser/ParsedText';

interface MagazineSectionAProps {
	number: string;
	megaTitle: string;
	title: string;
	subtitle: string;
	description: string[];
	tags: string[];
}

export function MagazineSectionA({ number, megaTitle, title, subtitle, description, tags }: MagazineSectionAProps) {
	return (
		<section className='relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 xl:gap-20 items-start group'>
			{/* Left Column */}
			<div className='relative'>
				{/* Number */}
				<div className='text-right lg:text-left text-3xl md:text-4xl xl:text-5xl font-urbanist font-black text-accent-cyan mb-4 [text-shadow:0_0_40px_rgba(0,217,255,0.5)]'>
					{number}
				</div>

				{/* Decorative Title */}
				<h2 className='project-decorative-text project-decorative-outline project-decorative-outline-hover text-[clamp(4rem,13vw,13rem)] absolute -top-4 lg:-top-4 -left-2 lg:-left-8 z-10 transition-all duration-500 group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.3)] group-hover:[text-shadow:0_0_60px_rgba(0,217,255,0.3)]'>
					{megaTitle}
				</h2>

				{/* Images */}
				<div className='relative z-20'>
					<ProjectImage_Placeholder
						gradient='bg-gradient-bounce-main'
						className='w-full h-[300px] md:h-[350px] lg:h-[450px] shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(102,126,234,0.2)] hover:scale-[1.02] hover:-translate-y-1'
					/>

					<ProjectImage_Placeholder
						gradient='bg-gradient-bounce-small'
						className='w-3/5 md:w-3/5 lg:w-3/5 h-[150px] md:h-[180px] lg:h-[200px] mt-8 ml-0 lg:ml-[25%] order-3 lg:order-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2'
						overlayType='none'
					>
						<div className='absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/20 to-transparent' />
					</ProjectImage_Placeholder>
				</div>
			</div>

			{/* Right Column - Content */}
			<div className='pt-4 lg:pt-16 order-2 lg:order-0'>
				<h3 className='font-urbanist text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-2 tracking-tight transition-all duration-300 group-hover:text-accent-cyan'>
					{title}
				</h3>
				<p className='text-base md:text-lg text-chrome-silver/60 mb-8'>{subtitle}</p>

				{description.map((paragraph, index) => (
					<p key={index} className='text-sm md:text-base leading-relaxed text-chrome-silver/75 mb-6'>
						<ParsedText bold='text-accent-cyan font-semibold'>{paragraph}</ParsedText>
					</p>
				))}

				<TechTags tags={tags} />
			</div>
		</section>
	);
}
