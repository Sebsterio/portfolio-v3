import React from 'react';
import { cn } from '@/lib/utils';

type TitleProps = {
	children: string | string[];
	variant: 'hero' | 'page';
	className?: string;
};

const CLASSES = {
	base: {
		title: 'font-urbanist font-extrabold',
		lineNormal: 'bg-clip-text text-transparent bg-chrome-metallic',
		lineStrong:
			'bg-clip-text text-transparent bg-linear-to-r from-accent-blue via-sky-400 to-accent-cyan animate-gradient-shift bg-size-[200%_200%]',
	},
	hero: {
		title: 'text-[clamp(64px,8vw,110px)] leading-[1.05] tracking-[-0.03em]',
	},
	page: {
		title: 'text-[clamp(48px,6vw,80px)] leading-tight tracking-[-0.02em]',
	},
};

const isHighlighted = (line: string) => line.startsWith('*') && line.length > 1;

const stripMarkers = (line: string) => line.slice(1);

export const Title: React.FC<TitleProps> = ({ children: lines, variant, className }) => {
	const normalizedLines = Array.isArray(lines) ? lines : [lines];

	return (
		<h1 className={cn(CLASSES.base.title, CLASSES[variant].title, className)}>
			{normalizedLines.map((rawLine, index) => {
				const highlight = isHighlighted(rawLine);
				const text = highlight ? stripMarkers(rawLine) : rawLine;
				const isLastLine = index === normalizedLines.length - 1;

				return (
					<React.Fragment key={index}>
						<span className={cn(CLASSES.base[highlight ? 'lineStrong' : 'lineNormal'])}>{text}</span>

						{!isLastLine && <br />}
					</React.Fragment>
				);
			})}
		</h1>
	);
};
