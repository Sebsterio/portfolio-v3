'use client';

import { ProjectImage_Placeholder } from '../../../../components/ProjectImage';
import { ParsedText } from '@/lib/parser/ParsedText';
import { ProjectTags } from '@/components/ProjectTags';

interface MagazineSectionAProps {
	sectionId: string;
	number: string;
	megaTitle: string;
	title: string;
	subtitle: string;
	description: string[];
	tags: string[];
}

export function MagazineSectionA({ sectionId, number, megaTitle, title, subtitle, description, tags }: MagazineSectionAProps) {
	return (
		<section id={sectionId} className='group relative grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-20'>
			{/* Left Column */}
			<div className='relative'>
				{/* Number */}
				<div className='mb-4 text-right font-urbanist text-3xl font-black text-accent-cyan [text-shadow:0_0_40px_rgba(0,217,255,0.5)] md:text-4xl lg:text-left xl:text-5xl'>
					{number}
				</div>

				{/* Decorative Title */}
				<h2 className='project-decorative-text project-decorative-outline project-decorative-outline-hover absolute -top-4 -left-2 z-10 text-[clamp(4rem,13vw,13rem)] transition-all duration-500 group-hover:[-webkit-text-stroke:2px_rgba(0,217,255,0.3)] group-hover:[text-shadow:0_0_60px_rgba(0,217,255,0.3)] lg:-top-4 lg:-left-8'>
					{megaTitle}
				</h2>

				{/* Images */}
				<div className='relative z-20'>
					<ProjectImage_Placeholder
						gradient='bg-gradient-bounce-main'
						className='h-[300px] w-full shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(102,126,234,0.2)] hover:-translate-y-1 hover:scale-[1.02] md:h-[350px] lg:h-[450px]'
					/>

					<ProjectImage_Placeholder
						gradient='bg-gradient-bounce-small'
						className='order-3 mt-8 ml-0 h-[150px] w-3/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 md:h-[180px] md:w-3/5 lg:order-0 lg:ml-[25%] lg:h-[200px] lg:w-3/5'
						overlayType='none'
					>
						<div className='absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-white/20 to-transparent' />
					</ProjectImage_Placeholder>
				</div>
			</div>

			{/* Right Column - Content */}
			<div className='order-2 pt-4 lg:order-0 lg:pt-16'>
				<h3 className='mb-2 font-urbanist text-4xl font-extrabold tracking-tight text-white transition-all duration-300 group-hover:text-accent-cyan md:text-5xl lg:text-[3.5rem]'>
					{title}
				</h3>
				<p className='text-muted mb-8 text-base md:text-lg'>{subtitle}</p>

				{description.map((paragraph, index) => (
					<p key={index} className='text-secondary mb-6 text-sm leading-relaxed md:text-base'>
						<ParsedText bold='text-accent-cyan font-semibold'>{paragraph}</ParsedText>
					</p>
				))}

				<ProjectTags className='mt-6 md:mt-8' variant='highlight' size='lg' tags={tags} />
			</div>
		</section>
	);
}
