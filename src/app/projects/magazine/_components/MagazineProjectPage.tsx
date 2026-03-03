'use client';

export {};

// import { useState, useEffect, useRef } from 'react';
// import { useTransitionRouter } from '@/lib/transitions/hooks/useTransitionRouter';
// import { cn } from '@/lib/utils';
// import { projects } from '../../_content';
// import { Project } from '../../../../types';

// type MagazineProjectPageProps = {
// 	project: Project;
// };

// type Section = 'overview' | 'challenge' | 'solution' | 'impact';

// const sections: { id: Section; label: string }[] = [
// 	{ id: 'overview', label: 'Overview' },
// 	{ id: 'challenge', label: 'Challenge' },
// 	{ id: 'solution', label: 'Solution' },
// 	{ id: 'impact', label: 'Impact' },
// ];

// /**
//  * Magazine Project View
//  *
//  * Full-page articles with vertical sidebar navigation.
//  * Each section is a full-page "article".
//  * Navigation index is rotated 90deg on the right edge.
//  */
// export const MagazineProjectPage = ({ project }: MagazineProjectPageProps) => {
// 	const { navigate } = useTransitionRouter();
// 	const [activeSection, setActiveSection] = useState<Section>('overview');
// 	const containerRef = useRef<HTMLDivElement>(null);

// 	// Scroll to section
// 	const scrollToSection = (sectionId: Section) => {
// 		const element = document.getElementById(`section-${sectionId}`);
// 		element?.scrollIntoView({ behavior: 'smooth' });
// 	};

// 	// Detect active section on scroll
// 	useEffect(() => {
// 		const handleScroll = () => {
// 			const container = containerRef.current;
// 			if (!container) return;

// 			const scrollPosition = container.scrollTop + window.innerHeight / 2;

// 			for (const section of sections) {
// 				const element = document.getElementById(`section-${section.id}`);
// 				if (element) {
// 					const { offsetTop, offsetHeight } = element;
// 					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
// 						setActiveSection(section.id);
// 						break;
// 					}
// 				}
// 			}
// 		};

// 		const container = containerRef.current;
// 		container?.addEventListener('scroll', handleScroll);
// 		return () => container?.removeEventListener('scroll', handleScroll);
// 	}, []);

// 	return (
// 		<div className='m-page-project relative'>
// 			{/* Vertical Navigation Index (Right Edge, Rotated) */}
// 			<nav className='fixed right-6 top-1/2 -translate-y-1/2 z-50'>
// 				<div className='flex flex-col gap-4 items-center rotate-90 origin-center'>
// 					{sections.map((section) => (
// 						<button
// 							key={section.id}
// 							onClick={() => scrollToSection(section.id)}
// 							className={cn(
// 								'text-sm font-dm-sans uppercase tracking-wider whitespace-nowrap transition-all duration-300',
// 								activeSection === section.id ? 'text-accent-cyan font-bold scale-110' : 'text-chrome-silver/50 hover:text-chrome-silver/80'
// 							)}
// 						>
// 							{section.label}
// 						</button>
// 					))}
// 				</div>

// 				{/* Project Navigator */}
// 				<div className='mt-12 flex gap-2 rotate-90 origin-center'>
// 					{projects.map((p) => (
// 						<button
// 							key={p.id}
// 							onClick={() => navigate(`/projects/${p.slug}?view=magazine`)}
// 							className={cn(
// 								'w-2 h-2 rounded-full transition-all duration-300',
// 								p.id === project.id ? 'bg-accent-blue w-6' : 'bg-chrome-silver/30 hover:bg-chrome-silver/50'
// 							)}
// 						/>
// 					))}
// 				</div>
// 			</nav>

// 			{/* Article Sequence (Snap Scroll) */}
// 			<div ref={containerRef} className='h-screen overflow-y-auto snap-y snap-mandatory' style={{ scrollSnapType: 'y mandatory' }}>
// 				{/* Section: Overview */}
// 				<section id='section-overview' className='min-h-screen snap-start flex items-center justify-center p-16'>
// 					<div className='max-w-4xl space-y-8'>
// 						<div className='space-y-4'>
// 							<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider'>
// 								{project.company} · {project.role}
// 							</div>
// 							<h1 className='font-urbanist text-7xl font-bold text-chrome-silver leading-tight'>{project.title}</h1>
// 							<p className='text-xl text-chrome-silver/70'>
// 								{project.period} · {project.location}
// 							</p>
// 						</div>

// 						<div className='h-px bg-linear-to-r from-transparent via-chrome-silver/20 to-transparent' />

// 						<p className='text-2xl text-chrome-silver/80 leading-relaxed'>{project.intro}</p>

// 						<div className='flex flex-wrap gap-3'>
// 							{project.tags.map((tag) => (
// 								<span key={tag} className='px-5 py-2 rounded-full bg-accent-blue/10 text-accent-cyan border border-accent-blue/20 text-sm'>
// 									{tag}
// 								</span>
// 							))}
// 						</div>

// 						{/* Scroll indicator */}
// 						<div className='flex justify-center pt-12'>
// 							<div className='animate-bounce text-accent-cyan'>↓</div>
// 						</div>
// 					</div>
// 				</section>

// 				{/* Section: Challenge */}
// 				<section id='section-challenge' className='min-h-screen snap-start flex items-center justify-center p-16 bg-black/20'>
// 					<div className='max-w-4xl space-y-8'>
// 						<div>
// 							<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider mb-4'>01 · The Challenge</div>
// 							<h2 className='font-urbanist text-5xl font-bold text-chrome-silver mb-8'>What We Were Up Against</h2>
// 						</div>

// 						<div className='prose prose-invert max-w-none'>
// 							<p className='text-xl text-chrome-silver/80 leading-relaxed'>{project.challenge}</p>
// 						</div>

// 						{/* Screenshots placeholder */}
// 						<div className='grid grid-cols-2 gap-6 pt-8'>
// 							{[1, 2].map((i) => (
// 								<div
// 									key={i}
// 									className={cn(
// 										'aspect-video rounded-xl',
// 										'bg-[rgba(13,13,13,0.6)] backdrop-blur-2xl',
// 										'border border-chrome-silver/8',
// 										'flex items-center justify-center text-chrome-silver/30'
// 									)}
// 								>
// 									Screenshot {i}
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</section>

// 				{/* Section: Solution */}
// 				<section id='section-solution' className='min-h-screen snap-start flex items-center justify-center p-16'>
// 					<div className='max-w-4xl space-y-8'>
// 						<div>
// 							<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider mb-4'>02 · The Solution</div>
// 							<h2 className='font-urbanist text-5xl font-bold text-chrome-silver mb-8'>How We Solved It</h2>
// 						</div>

// 						<div className='prose prose-invert max-w-none'>
// 							<p className='text-xl text-chrome-silver/80 leading-relaxed'>{project.solution}</p>
// 						</div>

// 						{/* Screenshot placeholder */}
// 						<div className='pt-8'>
// 							<div
// 								className={cn(
// 									'aspect-21/9 rounded-xl',
// 									'bg-[rgba(13,13,13,0.6)] backdrop-blur-2xl',
// 									'border border-chrome-silver/8',
// 									'flex items-center justify-center text-chrome-silver/30'
// 								)}
// 							>
// 								Wide Screenshot
// 							</div>
// 						</div>
// 					</div>
// 				</section>

// 				{/* Section: Impact */}
// 				<section id='section-impact' className='min-h-screen snap-start flex items-center justify-center p-16 bg-black/20'>
// 					<div className='max-w-4xl space-y-8'>
// 						<div>
// 							<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider mb-4'>03 · Impact & Results</div>
// 							<h2 className='font-urbanist text-5xl font-bold text-chrome-silver mb-8'>The Results</h2>
// 						</div>

// 						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 							{project.impact.map((item, i) => (
// 								<div
// 									key={i}
// 									className={cn(
// 										'p-8 rounded-xl',
// 										'bg-linear-to-br from-accent-blue/10 to-accent-cyan/10',
// 										'border border-accent-blue/20'
// 									)}
// 								>
// 									<div className='flex items-start gap-4'>
// 										<span className='text-3xl font-bold text-accent-cyan'>{String(i + 1).padStart(2, '0')}</span>
// 										<p className='text-chrome-silver/90 text-lg leading-relaxed'>{item}</p>
// 									</div>
// 								</div>
// 							))}
// 						</div>

// 						{project.link && (
// 							<div className='pt-8 flex justify-center'>
// 								<a
// 									href={project.link}
// 									target='_blank'
// 									rel='noopener noreferrer'
// 									className={cn(
// 										'inline-flex items-center gap-3 px-10 py-5 rounded-full',
// 										'bg-linear-to-br from-accent-blue to-accent-cyan',
// 										'text-white text-lg font-semibold',
// 										'hover:scale-105 transition-transform duration-300'
// 									)}
// 								>
// 									Visit Project
// 									<span>→</span>
// 								</a>
// 							</div>
// 						)}
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);
// };
