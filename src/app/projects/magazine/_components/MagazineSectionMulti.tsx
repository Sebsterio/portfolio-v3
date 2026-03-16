'use client';

import { ProjectImage } from '../../../../components/ProjectImage';

interface MagazineSectionMultiProps {
	number: string;
	title: string;
	subtitle: string;
	entries: Array<{
		sectionId: string;
		title: string;
		description: string[];
	}>;
}

export function MagazineSectionMulti({ number, title, subtitle, entries }: MagazineSectionMultiProps) {
	return (
		<section className='group relative -mt-8'>
			{/* Number */}
			<div className='mb-8 font-urbanist text-lg font-black tracking-wider text-accent-cyan/60 md:text-xl'>{number}</div>

			{/* Content Grid */}
			<div className='mx-auto grid max-w-[85%] items-center gap-8 md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
				{/* Text Column */}
				<div className='pr-0 lg:pr-8'>
					<h3 className='mb-4 font-urbanist text-4xl leading-[0.85] font-black text-white transition-all duration-300 group-hover:text-accent-cyan md:text-5xl lg:text-6xl xl:text-[5.5rem]'>
						{title}
					</h3>

					<p className='text-muted mb-10 text-base md:text-lg'>{subtitle}</p>

					{entries.map(({ sectionId, title, description }, index) => (
						<div
							key={title}
							id={sectionId}
							className={`grid gap-6 md:grid-cols-1 lg:grid-cols-1 ${
								index === 0 ? 'mb-10 border-b border-accent-cyan/15 pb-10' : ''
							} transition-all duration-400 hover:border-accent-cyan/40 hover:pl-4`}
						>
							<div>
								<h4 className='mb-3 font-urbanist text-2xl font-bold text-accent-cyan transition-transform duration-300 hover:translate-x-1 md:text-3xl'>
									{title}
								</h4>

								<p className='text-secondary text-sm leading-relaxed md:text-base'>{description}</p>
							</div>

							{/* Small image - shows next to text on mobile for first project only */}
							{index === 0 && (
								<div className='md:hidden'>
									<ProjectImage
										gradient='bg-gradient-freelance-small'
										className='magazine-image h-[150px] w-full border-4 border-white/90 md:border-6'
										glintOnHover
									/>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Images Column */}
				<div className='relative'>
					{/* Main Image */}
					<ProjectImage
						gradient='bg-gradient-freelance-main'
						className='magazine-image h-[300px] w-full shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(255,236,210,0.2)] hover:scale-[1.02] hover:rotate-1 md:h-[400px] lg:h-[500px]'
						overlayType='light'
						glintOnHover
					>
						<div className='overlay-full bg-linear-to-t from-transparent via-transparent to-black/30' />
					</ProjectImage>

					{/* Small Polaroid Image - desktop only */}
					<ProjectImage
						gradient='bg-gradient-freelance-small'
						className='magazine-image absolute bottom-[-15%] left-[-8%] hidden h-[180px] w-[45%] rotate-[8deg] border-8 border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-105 hover:rotate-[5deg] lg:flex xl:h-[220px]'
						glintOnHover
					/>
				</div>
			</div>
		</section>
	);
}
