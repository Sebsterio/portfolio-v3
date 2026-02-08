'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { QuantumBackground } from '@/components/QuantumBackground';
import { QuantumHeader } from '@/components/QuantumHeader';
import { QuantumShowcaseCard } from '@/components/QuantumShowcaseCard';

import { highlights, quickFacts, techCategories } from './_content';

export default function AboutVariant2() {
	const contentRef = useRef<HTMLDivElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			gsap.fromTo(
				contentRef.current,
				{ opacity: 0, x: -60 },
				{
					opacity: 1,
					x: 0,
					duration: 1.5,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					delay: 0.3,
				}
			);
		}

		if (sidebarRef.current) {
			gsap.fromTo(
				sidebarRef.current,
				{ opacity: 0, x: 60 },
				{
					opacity: 1,
					x: 0,
					duration: 1.5,
					ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					delay: 0.5,
				}
			);
		}
	}, []);

	return (
		<div className='relative min-h-screen bg-black overflow-hidden'>
			<QuantumBackground />

			<div className='relative z-10 max-w-[1400px] mx-auto px-10 py-8'>
				<QuantumHeader />

				<main className='py-20'>
					<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
						{/* Main Content */}
						<div ref={contentRef} className='space-y-12'>
							{/* Title */}
							<div>
								<h1 className='font-exo text-[clamp(48px,6vw,80px)] font-extrabold leading-tight tracking-[-0.02em] mb-6'>
									<span className='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue bg-clip-text text-transparent'>
										Building Systems
									</span>
									<br />
									That Scale
								</h1>
							</div>

							{/* Intro */}
							<div className='space-y-6'>
								<p className='text-xl leading-relaxed text-white/90'>
									I'm a <span className='font-bold text-white'>senior front-end engineer</span> with a hybrid background in design,
									engineering, and technical leadership. I specialise in building durable product foundations — modernising legacy systems,
									creating cross-platform design systems, and shaping better ways for teams to build, test, and ship software.
								</p>
								<p className='text-lg leading-relaxed text-white/70'>
									I'm most energized by problems that sit at the intersection of UX, architecture, and scalability: turning messy real-world
									constraints into clean, maintainable systems that teams can confidently evolve over time.
								</p>
							</div>

							{/* Highlights */}
							<div>
								<h2 className='font-exo text-2xl font-bold mb-8 flex items-center gap-3'>
									<span className='w-2 h-2 bg-quantum-purple rounded-full animate-status-pulse' />
									Core Strengths
								</h2>
								<div className='grid grid-cols-1 gap-6'>
									{highlights.map((highlight, index) => (
										<QuantumShowcaseCard key={index} icon={highlight.icon} title={highlight.title} description={highlight.description} />
									))}
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div ref={sidebarRef} className='space-y-6'>
							{/* Quick Facts Panel */}
							<div className='relative p-8 rounded-[28px] overflow-hidden bg-[rgba(5,5,10,0.7)] backdrop-blur-[40px] backdrop-saturate-[180%] border border-quantum-purple/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(178,75,243,0.1),inset_0_1px_0_rgba(178,75,243,0.2)]'>
								<div
									className='absolute inset-0 rounded-[28px] pointer-events-none'
									style={{
										background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)`,
									}}
								/>
								<div className='relative z-10 space-y-6'>
									<h3 className='font-exo text-lg font-bold text-white mb-6'>Quick Facts</h3>
									{quickFacts.map((fact, index) => (
										<div key={index} className='flex justify-between items-center py-4 border-b border-quantum-purple/10 last:border-b-0'>
											<span className='text-sm text-white/60 uppercase tracking-wider'>{fact.label}</span>
											<span className='font-exo text-lg font-bold bg-gradient-to-br from-quantum-purple to-quantum-magenta bg-clip-text text-transparent'>
												{fact.value}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Tech Stack Panel */}
							<div className='relative p-8 rounded-[28px] overflow-hidden bg-[rgba(5,5,10,0.7)] backdrop-blur-[40px] backdrop-saturate-[180%] border border-quantum-purple/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_4px_16px_rgba(178,75,243,0.1),inset_0_1px_0_rgba(178,75,243,0.2)]'>
								<div
									className='absolute inset-0 rounded-[28px] pointer-events-none'
									style={{
										background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)`,
									}}
								/>
								<div className='relative z-10 space-y-8'>
									<h3 className='font-exo text-lg font-bold text-white mb-6'>Tech Stack</h3>
									{techCategories.map((category, index) => (
										<div key={index}>
											<h4 className='text-xs text-quantum-purple uppercase tracking-wider mb-3 font-semibold'>{category.category}</h4>
											<div className='flex flex-wrap gap-2'>
												{category.techs.map((tech, techIndex) => (
													<span
														key={techIndex}
														className='px-3 py-1.5 rounded-lg bg-quantum-purple/10 border border-quantum-purple/20 text-white/80 text-xs font-source-code'
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
