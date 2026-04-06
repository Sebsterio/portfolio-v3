'use client';

import { ProjectImage } from './ProjectImage';
import { ParsedText } from '@/lib/parser/ParsedText';
import { ProjectTags } from '@/components/ProjectTags';
import { cn } from '@/lib/utils';

interface MagazineSectionAProps {
	sectionId: string;
	number: string;
	megaTitle: string;
	title: string;
	subtitle: string;
	description: string[];
	tags: string[];
	imageMain: string;
	imageAside: string;
}

export function MagazineSectionA({
	sectionId,
	number,
	megaTitle,
	title,
	subtitle,
	description,
	tags,
	imageMain,
	imageAside,
}: MagazineSectionAProps) {
	return (
		<section id={sectionId} className='group relative grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-20'>
			{/* Left Column */}
			<div className='relative'>
				{/* Number */}
				<div className='text-glow-editorial mb-4 text-right font-urbanist text-3xl font-black text-label md:text-4xl lg:text-left xl:text-5xl'>
					{number}
				</div>

				{/* Decorative Title */}
				<h2 className='decorative-text decorative-outline decorative-outline-editorial-hover absolute -top-4 -left-2 z-10 text-[clamp(4rem,13vw,13rem)] lg:-top-4 lg:-left-8'>
					{megaTitle}
				</h2>

				{/* Images */}
				<div className='relative z-20'>
					<ProjectImage
						src={imageMain}
						gradient='bg-gradient-bounce-main'
						className={cn('magazine-image', [
							'h-[300px] w-full md:h-[350px] lg:h-[450px]',
							'shadow-editorial-bounce',
							'hover:-translate-y-1 hover:scale-[1.02]',
						])}
						overlayType='light'
						glintOnHover
					/>

					<ProjectImage
						src={imageAside}
						gradient='bg-gradient-bounce-small'
						className={cn('magazine-image', [
							'order-3 mt-8 ml-0 h-[150px] w-3/5',
							'md:h-[180px] md:w-3/5',
							'lg:order-0 lg:ml-[25%] lg:h-[200px] lg:w-3/5',
							'shadow-image-md hover:-translate-y-2',
						])}
						glintOnHover
					>
						<div className='absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-white/20 to-transparent' />
					</ProjectImage>
				</div>
			</div>

			{/* Right Column - Content */}
			<div className='order-2 pt-4 lg:order-0 lg:pt-16'>
				<h3 className='mb-2 font-urbanist text-4xl font-extrabold tracking-tight text-white transition-all duration-300 group-hover:text-label md:text-5xl lg:text-[3.5rem]'>
					{title}
				</h3>
				<p className='mb-8 text-base text-muted md:text-lg'>{subtitle}</p>

				<div className='space-y-6'>
					{description.map((paragraph, index) => (
						<p key={index} className='text-sm leading-relaxed text-secondary md:text-base'>
							<ParsedText bold='text-label font-semibold'>{paragraph}</ParsedText>
						</p>
					))}
				</div>

				<ProjectTags className='mt-6 md:mt-8' variant='highlight' size='lg' tags={tags} />
			</div>
		</section>
	);
}
