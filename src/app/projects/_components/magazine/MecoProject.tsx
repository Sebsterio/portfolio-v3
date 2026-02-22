// src/app/projects/components/MecoProject.tsx
'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

export function MecoProject() {
	return (
		<section className='relative -mt-8'>
			{/* Number */}
			<div className='text-xl md:text-2xl xl:text-3xl font-urbanist font-bold text-white/30 mb-4 relative z-20'>02</div>

			{/* Decorative Background Text */}
			<div className='project-decorative-text project-decorative-faded text-[clamp(6rem,20vw,20rem)] absolute top-[-2rem] md:top-[-4rem] left-[-1rem] md:left-[-2rem] w-full lg:w-auto z-10'>
				MECO
			</div>

			{/* Content Grid */}
			<div className='relative z-20 max-w-[1400px] ml-0 lg:ml-auto mr-0 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 lg:gap-16 items-center'>
				{/* Text Column */}
				<div className='py-4 md:py-8'>
					<p className='font-urbanist text-xs md:text-sm font-bold uppercase tracking-wider text-accent-cyan mb-6'>
						Music Festival · Lisbon
					</p>

					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-black text-white leading-[0.95] mb-3'>
						Underground Meco
					</h3>

					<p className='text-base md:text-lg text-chrome-silver/60 mb-8'>Full-Stack Developer (Contract)</p>

					<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75 mb-6'>
						Developed a comprehensive event management ecosystem that significantly improved operational efficiency for this music festival.
						The solution included a back-office platform for real-time inventory management, financial reporting, dashboards, and analytics.
					</p>

					<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75'>
						Built a customer-facing progressive web app with custom CMS, integrated payments processing via Stripe, geolocation services for
						venue navigation, and social media features to enhance attendee engagement. The system streamlined operations and created a
						seamless experience for both organizers and festival-goers.
					</p>
				</div>

				{/* Images Column */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 order-[-1] lg:order-none'>
					<ProjectImage
						gradient='bg-gradient-meco-main'
						className='md:col-span-2 h-[200px] md:h-[280px] lg:h-[300px] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(250,112,154,0.2)] hover:scale-[1.02]'
						overlayType='dark'
					/>

					<ProjectImage
						gradient='bg-gradient-meco-2'
						className='h-[150px] md:h-[180px] lg:h-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:-rotate-2'
						overlayType='none'
					/>

					<ProjectImage
						gradient='bg-gradient-meco-3'
						className='h-[150px] md:h-[180px] lg:h-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:rotate-2'
						overlayType='none'
					/>
				</div>
			</div>
		</section>
	);
}
