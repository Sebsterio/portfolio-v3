import React from 'react';
import { cn } from '@/lib/utils';
import { ParsedText } from '@/lib/parser/ParsedText';

type TextBlockProps = {
	children: string | string[];
	className?: string;
	highlightFirstParagraph?: boolean;
};

const CLASSES = {
	paragraph: 'leading-relaxed',
	primary: 'text-xl text-chrome-silver/90',
	secondary: 'text-lg text-chrome-silver/70',
	bold: 'font-bold text-white',
};

export const TextBlock: React.FC<TextBlockProps> = ({ children: paragraphs, className, highlightFirstParagraph }) => {
	const normalizedParagraphs = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

	return (
		<div className={cn('space-y-6', className)}>
			{normalizedParagraphs.map((paragraph, index) => {
				const highlight = highlightFirstParagraph && index === 0;

				return (
					<p key={index} className={cn(CLASSES.paragraph, highlight ? CLASSES.primary : CLASSES.secondary)}>
						<ParsedText bold={CLASSES.bold}>{paragraph}</ParsedText>
					</p>
				);
			})}
		</div>
	);
};
