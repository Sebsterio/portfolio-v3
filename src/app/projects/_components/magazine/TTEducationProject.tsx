// src/app/projects/components/TTEducationProject.tsx
'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

export function TTEducationProject() {
	return (
		<section className='relative -mt-12 ml-0 lg:ml-[5%]'>
			<div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-start'>
				{/* Text Column */}
				<div className='pt-4 md:pt-12'>
					{/* Number */}
					<div className='project-decorative-text project-decorative-outline text-[clamp(4rem,10vw,8rem)] leading-[0.8] -mb-4 transition-all duration-500 hover:[text-shadow:0_0_50px_rgba(0,217,255,0.3)]'>
						03
					</div>

					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-black text-white leading-[0.9] mb-4'>
						TT Education
					</h3>

					<p className='text-base md:text-lg text-chrome-silver/60 mb-8'>Senior Front-End Developer · School Management Software</p>

					<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75 mb-6'>
						Led the modernization of a legacy education platform by reimplementing critical features including authentication, API
						integration, and checkout flows. Replaced outdated systems and enhanced stability, performance, and user experience across the
						platform.
					</p>

					<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75'>
						Implemented cross-product authentication using MSAL, enabling incremental replacement of legacy systems. Developed the interface
						for an AI chat feature, created a comprehensive design system, and added full accessibility compliance along with an extensive
						testing suite using Jest and Playwright.
					</p>
				</div>

				{/* Image Column */}
				<div className='pt-4 md:pt-8 lg:mr-0 xl:mr-12'>
					<ProjectImage
						gradient='bg-gradient-tt'
						className='w-full h-[250px] md:h-[320px] lg:h-[380px] shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(79,172,254,0.2)] hover:scale-[1.02] hover:-rotate-1'
					/>
				</div>
			</div>
		</section>
	);
}
