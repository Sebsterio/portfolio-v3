import React from 'react';
import { cn } from '@/lib/utils';
import { ParsedText } from '@/lib/parser/ParsedText';

type TitleProps = {
	children: string | string[];
	variant: 'hero' | 'page' | 'projects';
	className?: string;
	id?: string;
};

const CLASSES = {
	base: {
		title: 'font-urbanist font-extrabold',
		line: 'bg-clip-text text-transparent',
		normal: 'bg-chrome-metallic',
		highlight: 'bg-linear-to-r from-accent-blue via-sky-400 to-accent-cyan animate-gradient-shift bg-size-[200%_200%]',
	},
	hero: { title: 'text-[clamp(64px,8vw,110px)] leading-[1.05] tracking-[-0.03em]' },
	page: { title: 'text-[clamp(48px,6vw,80px)] leading-tight tracking-[-0.02em]' },
	projects: { title: 'text-5xl md:text-6xl font-bold bg-linear-to-r from-white to-accent-cyan' },
};

export const Title: React.FC<TitleProps> = ({ children: lines, variant, className, ...props }) => {
	const normalizedLines = Array.isArray(lines) ? lines : [lines];

	return (
		<h1 className={cn(CLASSES.base.title, CLASSES[variant].title, className)} {...props}>
			{normalizedLines.map((rawLine, index) => {
				const isLastLine = index === normalizedLines.length - 1;
				return (
					<React.Fragment key={index}>
						<ParsedText className={CLASSES.base.line} normal={CLASSES.base.normal} highlight={CLASSES.base.highlight}>
							{rawLine}
						</ParsedText>

						{!isLastLine && <br />}
					</React.Fragment>
				);
			})}
		</h1>
	);
};
