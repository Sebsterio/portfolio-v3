'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

export function AOProject() {
	return (
		<section className='relative -mt-12 ml-0 lg:ml-[2%] xl:ml-[8%]'>
			{/* Decorative Mega Title */}
			<h2 className='project-decorative-text text-transparent text-[clamp(8rem,22vw,18rem)] absolute top-[-4rem] md:top-[-6rem] right-0 lg:right-[-5%] z-10 pointer-events-none [-webkit-text-stroke:2px_rgba(255,255,255,0.1)]'>
				AO.COM
			</h2>

			{/* Number */}
			<div className='font-urbanist text-3xl md:text-4xl font-black bg-gradient-to-br from-accent-cyan to-white bg-clip-text text-transparent mb-4 relative z-20'>
				05
			</div>

			{/* Content Grid */}
			<div className='grid lg:grid-cols-[1fr_0.9fr] gap-8 md:gap-12 lg:gap-16 items-start pl-0 lg:pl-12 relative z-20'>
				{/* Images Column */}
				<div className='flex flex-col gap-8'>
					<ProjectImage
						gradient='bg-gradient-ao-main'
						className='w-full h-[200px] md:h-[280px] lg:h-[300px] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(240,147,251,0.2)] hover:scale-[1.02] hover:-rotate-1'
						overlayType='dark'
					/>

					<ProjectImage
						gradient='bg-gradient-ao-small'
						className='w-3/4 h-[150px] md:h-[200px] lg:h-[220px] ml-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 order-3 lg:order-none'
						overlayType='none'
					/>
				</div>

				{/* Text Column */}
				<div className='pt-8 lg:pt-20 order-2 lg:order-none'>
					<p className='font-urbanist text-xs md:text-sm font-bold uppercase tracking-wider text-accent-cyan mb-6'>E-Commerce Platform</p>

					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-black text-white leading-[0.85] mb-4'>
						AO.com
					</h3>

					<p className='text-base md:text-lg text-chrome-silver/60 mb-8'>Front-End Developer · Payments Team</p>

					<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75 mb-6'>
						Sole front-end developer in the Payments Team, responsible for integrating and maintaining payment and finance services across
						the e-commerce platform. Architected, built, and maintained a centralized payment system distributed as a micro frontend across
						multiple teams.
					</p>

					<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75'>
						This system replaced legacy payment implementations and streamlined the process of integrating new payment providers. Also
						maintained the finance application website section, implementing improvements that reduced errors and saved the company £16,000
						per month through enhanced validation and error handling.
					</p>
				</div>
			</div>
		</section>
	);
}
