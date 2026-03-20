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
	hero: {
		title: cn('text-[clamp(64px,8vw,110px)] leading-[1.05] tracking-[-0.03em]'),
		lineNormal: cn('bg-chrome-metallic'),
		lineHighlight: cn('gradient-title-highlight animate-gradient-shift bg-size-[200%_200%]'),
	},
	page: {
		title: cn('text-[clamp(48px,6vw,80px)] leading-tight tracking-[-0.02em]'),
		lineNormal: cn('bg-chrome-metallic'),
		lineHighlight: cn('gradient-title-highlight animate-gradient-shift bg-size-[200%_200%]'),
	},
	projects: {
		title: cn('text-5xl font-bold md:text-6xl'),
		lineNormal: cn('bg-chrome-metallic'), // cn('bg-linear-to-r from-white to-accent-cyan'),
		lineHighlight: '',
	},
};

export const Title: React.FC<TitleProps> = ({ children: lines, variant, className, ...props }) => {
	const normalizedLines = Array.isArray(lines) ? lines : [lines];

	return (
		<h1 className={cn('font-urbanist font-extrabold', CLASSES[variant].title, className)} {...props}>
			{normalizedLines.map((rawLine, index) => {
				const isLastLine = index === normalizedLines.length - 1;
				return (
					<React.Fragment key={index}>
						<ParsedText
							className={'bg-clip-text text-transparent'}
							normal={cn(CLASSES[variant]?.lineNormal)}
							highlight={CLASSES[variant]?.lineHighlight}
						>
							{rawLine}
						</ParsedText>

						{!isLastLine && <br />}
					</React.Fragment>
				);
			})}
		</h1>
	);
};
