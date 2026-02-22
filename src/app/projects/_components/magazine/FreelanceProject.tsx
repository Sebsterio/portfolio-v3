// src/app/projects/components/FreelanceProject.tsx
'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

export function FreelanceProject() {
	return (
		<section className='relative -mt-8'>
			{/* Number */}
			<div className='font-urbanist text-lg md:text-xl font-black text-accent-cyan/60 tracking-wider mb-8'>06 — FREELANCE</div>

			{/* Content Grid */}
			<div className='max-w-[85%] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 lg:gap-20 items-center'>
				{/* Text Column */}
				<div className='pr-0 lg:pr-8'>
					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] font-black text-white leading-[0.85] mb-4'>
						Freelance Projects
					</h3>

					<p className='text-base md:text-lg text-chrome-silver/60 mb-10'>Web Developer & Designer · Various Clients</p>

					{/* Animalysis - with small image on mobile */}
					<div className='grid md:grid-cols-1 lg:grid-cols-1 gap-6 mb-10 pb-10 border-b border-accent-cyan/15 transition-all duration-400 hover:border-accent-cyan/40 hover:pl-4'>
						<div>
							<h4 className='font-urbanist text-2xl md:text-3xl font-bold text-accent-cyan mb-3 transition-transform duration-300 hover:translate-x-1'>
								Animalysis
							</h4>

							<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75'>
								Built a full-stack progressive web app that streamlines the process of reporting pet health problems to vet clinics through
								dynamically generated, personalized surveys. Developed the accompanying vet clinic management system for searching report
								history and survey customization.
							</p>
						</div>

						{/* Small image - shows next to text on mobile, hidden on desktop */}
						<div className='md:hidden'>
							<ProjectImage
								gradient='bg-gradient-freelance-small'
								className='w-full h-[150px] border-4 md:border-6 border-white/90'
								overlayType='none'
							/>
						</div>
					</div>

					{/* Narbon Fashion */}
					<div className='transition-all duration-400 hover:pl-4'>
						<h4 className='font-urbanist text-2xl md:text-3xl font-bold text-accent-cyan mb-3 transition-transform duration-300 hover:translate-x-1'>
							Narbon Fashion
						</h4>

						<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75'>
							Created a modern e-commerce progressive web app using React, Redux, and Node.js. Implemented Firebase user authentication and
							database integration, Stripe payments processing, and cloud infrastructure optimization using Heroku, Atlas, and Cloudinary to
							minimize server load and maximize performance.
						</p>
					</div>
				</div>

				{/* Images Column */}
				<div className='relative'>
					{/* Main Image */}
					<ProjectImage
						gradient='bg-gradient-freelance-main'
						className='w-full h-[300px] md:h-[400px] lg:h-[500px] shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(255,236,210,0.2)] hover:scale-[1.02] hover:rotate-1'
					>
						<div className='absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/30' />
					</ProjectImage>

					{/* Small Polaroid Image - desktop only */}
					<ProjectImage
						gradient='bg-gradient-freelance-small'
						className='hidden lg:block absolute bottom-[-15%] left-[-8%] w-[45%] h-[180px] xl:h-[220px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rotate-[8deg] hover:rotate-[5deg] hover:scale-105 border-8 border-white/90'
						overlayType='none'
					/>
				</div>
			</div>
		</section>
	);
}
