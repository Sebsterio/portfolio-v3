'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects, type Project } from '../projects';

export const SplitTimeline = () => {
	const [selected, setSelected] = useState<Project>(projects[0]);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 h-[800px]'>
			{/* Left: Timeline */}
			<div className='relative'>
				<div className='sticky top-0 space-y-2 max-h-[800px] overflow-y-auto pr-4'>
					{/* Timeline Line */}
					<div className='absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-blue/20' />

					{projects.map((project, i) => (
						<button
							key={project.id}
							onClick={() => setSelected(project)}
							className={cn(
								'relative w-full text-left p-4 pl-12 rounded-xl transition-all duration-300',
								'group',
								selected.id === project.id
									? 'bg-accent-blue/10 border-l-2 border-accent-blue'
									: 'hover:bg-white/[0.03] border-l-2 border-transparent'
							)}
						>
							{/* Timeline Dot */}
							<div
								className={cn(
									'absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300',
									selected.id === project.id
										? 'bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]'
										: 'bg-chrome-silver/30 group-hover:bg-chrome-silver/50'
								)}
							/>

							<div className='space-y-1'>
								<div className='text-xs text-accent-cyan font-dm-sans'>{project.period}</div>
								<div
									className={cn(
										'font-urbanist font-semibold transition-colors duration-300',
										selected.id === project.id ? 'text-chrome-silver' : 'text-chrome-silver/60 group-hover:text-chrome-silver/80'
									)}
								>
									{project.title}
								</div>
								<div className='text-xs text-chrome-silver/50'>{project.company}</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Right: Detail Pane */}
			<motion.div
				key={selected.id}
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4 }}
				className={cn(
					'relative rounded-[28px] p-8 md:p-12',
					'bg-[rgba(13,13,13,0.6)] backdrop-blur-[40px]',
					'border border-chrome-silver/[0.08]',
					'overflow-y-auto max-h-[800px]'
				)}
			>
				{/* Content */}
				<div className='space-y-8'>
					{/* Header */}
					<div className='space-y-4'>
						<div className='flex items-center gap-4 text-sm text-accent-cyan'>
							<span>{selected.period}</span>
							<span>•</span>
							<span>{selected.location}</span>
						</div>
						<h2 className='font-urbanist text-4xl font-bold text-chrome-silver'>{selected.title}</h2>
						<p className='text-xl text-chrome-silver/80'>{selected.company}</p>
						<div className='flex flex-wrap gap-2'>
							{selected.tags.map((tag) => (
								<span
									key={tag}
									className='px-3 py-1.5 rounded-lg text-sm bg-accent-blue/10 text-accent-cyan border border-accent-blue/20'
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* Summary */}
					<p className='text-lg text-chrome-silver/70 leading-relaxed'>{selected.summary}</p>

					{/* Case Study Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<CaseStudyCard title='Problem' content={selected.problem} />
						<CaseStudyCard title='Approach' content={selected.approach} />
						<CaseStudyCard title='Solution' content={selected.solution} className='md:col-span-2' />
					</div>

					{/* Impact */}
					<div className='space-y-4'>
						<h3 className='font-urbanist text-2xl font-bold text-accent-blue'>Key Results</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{selected.impact.map((item, i) => (
								<div
									key={i}
									className={cn(
										'p-4 rounded-xl',
										'bg-gradient-to-br from-accent-blue/5 to-accent-cyan/5',
										'border border-accent-blue/20'
									)}
								>
									<div className='flex items-start gap-3'>
										<span className='text-accent-cyan mt-1 text-lg'>▸</span>
										<span className='text-chrome-silver/90 text-sm'>{item}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Link */}
					{selected.link && (
						<a
							href={selected.link}
							target='_blank'
							rel='noopener noreferrer'
							className={cn(
								'inline-flex items-center gap-2 px-8 py-4 rounded-full',
								'bg-gradient-to-br from-accent-blue to-accent-cyan',
								'text-white font-semibold',
								'hover:scale-105 transition-transform duration-300'
							)}
						>
							Visit Project
							<span>→</span>
						</a>
					)}
				</div>
			</motion.div>
		</div>
	);
};

const CaseStudyCard = ({ title, content, className }: { title: string; content: string; className?: string }) => (
	<div
		className={cn(
			'p-6 rounded-xl space-y-3',
			'bg-gradient-to-br from-white/[0.02] to-white/[0.01]',
			'border border-chrome-silver/[0.06]',
			className
		)}
	>
		<h4 className='font-urbanist text-lg font-bold text-accent-cyan'>{title}</h4>
		<p className='text-chrome-silver/80 text-sm leading-relaxed'>{content}</p>
	</div>
);
