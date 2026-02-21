'use client';

import { useState } from 'react';
import { useTransitionRouter } from '@/lib/transitions/useTransitionRouter';
import { cn } from '@/lib/utils';
import { projects, type Project } from '../../_content';

type TimelineProjectProps = {
	project: Project;
};

export const TimelineProject = ({ project }: TimelineProjectProps) => {
	const { navigate } = useTransitionRouter();
	const [selectedId, setSelectedId] = useState(project.id);

	const handleProjectChange = (newProject: Project) => {
		setSelectedId(newProject.id);
		navigate(`/projects/${newProject.slug}?view=timeline`);
	};

	return (
		<div className='fixed inset-0 grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-0'>
			{/* Left Sidebar - Project List (Scrollable) */}
			<aside className='vt-left relative overflow-y-auto border-r border-chrome-silver/[0.08] bg-black/40 backdrop-blur-[20px] p-8'>
				{/* Timeline Line */}
				<div className='absolute left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-blue/20' />

				<div className='mb-8'>
					<h2 className='font-urbanist text-2xl font-bold mb-2 bg-gradient-to-r from-white to-accent-cyan bg-clip-text text-transparent'>
						Projects
					</h2>
					<p className='text-sm text-chrome-silver/60'>Case studies & development work</p>
				</div>

				<div className='space-y-2'>
					{projects.map((p) => (
						<button
							key={p.id}
							onClick={() => handleProjectChange(p)}
							className={cn(
								'relative w-full text-left p-4 pl-10 rounded-xl transition-all duration-300',
								selectedId === p.id
									? 'bg-accent-blue/10 border-l-2 border-accent-blue'
									: 'hover:bg-white/[0.03] border-l-2 border-transparent'
							)}
						>
							{/* Timeline Dot */}
							<div
								className={cn(
									'absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300',
									selectedId === p.id ? 'bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-chrome-silver/30'
								)}
							/>

							<div className='space-y-1'>
								<div className='text-xs text-accent-cyan font-dm-sans'>{p.period}</div>
								<div
									className={cn(
										'font-urbanist font-semibold transition-colors',
										selectedId === p.id ? 'text-chrome-silver' : 'text-chrome-silver/60'
									)}
								>
									{p.title}
								</div>
								<div className='text-xs text-chrome-silver/50'>{p.company}</div>
							</div>
						</button>
					))}
				</div>
			</aside>

			{/* Right Content Area (Scrollable) */}
			<main className='vt-right overflow-y-auto'>
				<div className='max-w-4xl mx-auto p-12 space-y-8'>
					{/* Header */}
					<div className='space-y-4'>
						<div className='text-sm text-accent-cyan font-semibold uppercase tracking-wider'>
							{project.company} · {project.role}
						</div>
						<h1 className='font-urbanist text-5xl font-bold text-chrome-silver'>{project.title}</h1>
						<p className='text-lg text-chrome-silver/70'>
							{project.period} • {project.location}
						</p>
						<p className='text-xl text-chrome-silver/80 leading-relaxed'>{project.intro}</p>
					</div>

					{/* Screenshots Placeholder */}
					<div className='grid grid-cols-3 gap-4'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className={cn(
									'aspect-video rounded-xl',
									'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
									'border border-chrome-silver/[0.08]',
									'flex items-center justify-center',
									'text-chrome-silver/30 text-sm'
								)}
							>
								Screenshot {i}
							</div>
						))}
					</div>

					{/* Challenge Section */}
					<div className='space-y-3'>
						<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Challenge</h3>
						<p className='text-chrome-silver/80 leading-relaxed'>{project.challenge}</p>
					</div>

					{/* Solution Section */}
					<div className='space-y-3'>
						<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>The Solution</h3>
						<p className='text-chrome-silver/80 leading-relaxed'>{project.solution}</p>
					</div>

					{/* Impact Section */}
					<div className='space-y-4'>
						<h3 className='font-urbanist text-2xl font-bold text-chrome-silver'>Impact & Results</h3>
						<ul className='space-y-2'>
							{project.impact.map((item, i) => (
								<li key={i} className='flex items-start gap-3'>
									<span className='text-accent-cyan mt-1'>→</span>
									<span className='text-chrome-silver/80'>{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Tech Tags */}
					<div className='flex flex-wrap gap-2'>
						{project.tags.map((tag) => (
							<span key={tag} className='px-4 py-2 rounded-lg bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'>
								{tag}
							</span>
						))}
					</div>

					{/* Link */}
					{project.link && (
						<a
							href={project.link}
							target='_blank'
							rel='noopener noreferrer'
							className={cn(
								'inline-flex items-center gap-2 px-8 py-4 rounded-full',
								'bg-gradient-to-br from-accent-blue to-accent-cyan',
								'text-white font-semibold',
								'hover:scale-105 transition-transform duration-300'
							)}
						>
							Visit Project →
						</a>
					)}
				</div>
			</main>
		</div>
	);
};
