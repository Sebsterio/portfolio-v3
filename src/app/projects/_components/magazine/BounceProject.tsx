// src/app/projects/components/BounceProject.tsx
'use client';

import { TechTags } from '@/components/TechTags';
import { ProjectImage } from '../../../../components/ProjectImage';

export function BounceProject() {
	return (
		<section className='relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 xl:gap-20 items-start'>
			{/* Left Column */}
			<div className='relative'>
				{/* Number */}
				<div className='text-right lg:text-left text-3xl md:text-4xl xl:text-5xl font-urbanist font-black text-accent-cyan mb-4 [text-shadow:0_0_40px_rgba(0,217,255,0.5)]'>
					01
				</div>

				{/* Decorative Title */}
				<h2 className='project-decorative-text project-decorative-outline project-decorative-outline-hover text-[clamp(4rem,13vw,13rem)] absolute top-[-1rem] lg:top-[-1rem] left-[-0.5rem] lg:left-[-2rem] z-10'>
					BOUNCE
				</h2>

				{/* Images */}
				<div className='relative z-20'>
					<ProjectImage
						gradient='bg-gradient-bounce-main'
						className='w-full h-[300px] md:h-[350px] lg:h-[450px] shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(102,126,234,0.2)] hover:scale-[1.02] hover:-translate-y-1'
					/>

					<ProjectImage
						gradient='bg-gradient-bounce-small'
						className='w-3/5 md:w-3/5 lg:w-3/5 h-[150px] md:h-[180px] lg:h-[200px] mt-8 ml-0 lg:ml-[25%] order-3 lg:order-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2'
						overlayType='none'
					>
						<div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/20 to-transparent' />
					</ProjectImage>
				</div>
			</div>

			{/* Right Column - Content */}
			<div className='pt-4 lg:pt-16 order-2 lg:order-none'>
				<h3 className='font-urbanist text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-2 tracking-tight'>Bounce.com</h3>
				<p className='text-base md:text-lg text-chrome-silver/60 mb-8'>Software Engineer (Contract) · Leading Travel Startup</p>

				<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75 mb-6'>
					Architected and delivered a production-ready{' '}
					<span className='text-accent-cyan font-semibold'>cross-platform component library</span> serving web, iOS, and Android platforms.
					This foundational system unified the design language across all Bounce products while reducing technical debt and enabling faster
					feature development.
				</p>

				<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75 mb-6'>
					Led the migration from legacy components and established clear patterns, comprehensive Storybook documentation, and technical
					guidance for organization-wide adoption. The system enabled three product teams to work independently while maintaining
					consistency, reducing UI inconsistencies by 80% and decreasing time-to-market for new features by 40%.
				</p>

				<TechTags tags={['Next.js', 'React Native', 'TypeScript', 'Storybook', 'Monorepo']} />
			</div>
		</section>
	);
}
