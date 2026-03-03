'use client';

import { ProjectImage_Placeholder } from '../../../../components/ProjectImage';

interface MagazineSectionMultiProps {
	number: string;
	title: string;
	subtitle: string;
	entries: Array<{
		title: string;
		description: string[];
	}>;
}

export function MagazineSectionMulti({ number, title, subtitle, entries }: MagazineSectionMultiProps) {
	return (
		<section className='relative -mt-8 group'>
			{/* Number */}
			<div className='font-urbanist text-lg md:text-xl font-black text-accent-cyan/60 tracking-wider mb-8'>{number}</div>

			{/* Content Grid */}
			<div className='max-w-[85%] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 lg:gap-20 items-center'>
				{/* Text Column */}
				<div className='pr-0 lg:pr-8'>
					<h3 className='font-urbanist text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] font-black text-white leading-[0.85] mb-4 transition-all duration-300 group-hover:text-accent-cyan'>
						{title}
					</h3>

					<p className='text-base md:text-lg text-chrome-silver/60 mb-10'>{subtitle}</p>

					{entries.map(({ title, description }, index) => (
						<div
							key={title}
							className={`grid md:grid-cols-1 lg:grid-cols-1 gap-6 ${
								index === 0 ? 'mb-10 pb-10 border-b border-accent-cyan/15' : ''
							} transition-all duration-400 hover:border-accent-cyan/40 hover:pl-4`}
						>
							<div>
								<h4 className='font-urbanist text-2xl md:text-3xl font-bold text-accent-cyan mb-3 transition-transform duration-300 hover:translate-x-1'>
									{title}
								</h4>

								<p className='text-sm md:text-base leading-relaxed text-chrome-silver/75'>{description}</p>
							</div>

							{/* Small image - shows next to text on mobile for first project only */}
							{index === 0 && (
								<div className='md:hidden'>
									<ProjectImage_Placeholder
										gradient='bg-gradient-freelance-small'
										className='w-full h-[150px] border-4 md:border-6 border-white/90'
										overlayType='none'
									/>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Images Column */}
				<div className='relative'>
					{/* Main Image */}
					<ProjectImage_Placeholder
						gradient='bg-gradient-freelance-main'
						className='w-full h-[300px] md:h-[400px] lg:h-[500px] shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(255,236,210,0.2)] hover:scale-[1.02] hover:rotate-1'
					>
						<div className='absolute inset-0 bg-linear-to-t from-transparent via-transparent to-black/30' />
					</ProjectImage_Placeholder>

					{/* Small Polaroid Image - desktop only */}
					<ProjectImage_Placeholder
						gradient='bg-gradient-freelance-small'
						className='hidden lg:block absolute bottom-[-15%] left-[-8%] w-[45%] h-[180px] xl:h-[220px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rotate-[8deg] hover:rotate-[5deg] hover:scale-105 border-8 border-white/90'
						overlayType='none'
					/>
				</div>
			</div>
		</section>
	);
}
