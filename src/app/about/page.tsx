'use client';

import { QuantumShowcaseCard } from '@/components/QuantumShowcaseCard';
import { copy, highlights, quickFacts, techCategories } from './_content';
import { ContentContainer } from './_components/ContentContainer';
import { SidebarContainer } from './_components/SidebarContainer';
import { PageTitle } from '@/components';

export default function AboutPage() {
	return (
		<main className='py-20'>
			<div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
				<ContentContainer className='space-y-12'>
					<div>
						<PageTitle
							className='font-exo text-[clamp(48px,6vw,80px)] font-extrabold leading-tight tracking-[-0.02em] mb-6'
							highlightClassName='bg-gradient-to-br from-quantum-purple via-quantum-magenta to-quantum-blue bg-clip-text text-transparent animate-gradient-shift'
							// highlightStyle={{ backgroundSize: '200% 200%' }}
						>
							{copy.title}
						</PageTitle>
					</div>

					{/* Intro */}
					<div className='space-y-6'>
						<p className='text-xl leading-relaxed text-white/90'>
							I'm a <span className='font-bold text-white'>senior front-end engineer</span> with a hybrid background in design, engineering,
							and technical leadership. I specialise in building durable product foundations — modernising legacy systems, creating
							cross-platform design systems, and shaping better ways for teams to build, test, and ship software.
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
				</ContentContainer>

				<SidebarContainer className='space-y-6'>
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
				</SidebarContainer>
			</div>
		</main>
	);
}
