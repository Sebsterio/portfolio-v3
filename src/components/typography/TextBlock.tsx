import React from 'react';
import { cn } from '@/lib/utils';

type TextBlockProps = {
	children: string | string[];
	className?: string;
	highlightFirstParagraph?: boolean;
};

const CLASSES = {
	paragraph: 'leading-relaxed',
	paragrapHighlight: 'text-xl text-chrome-silver/90',
	paragraphNormal: 'text-lg text-chrome-silver/70',
};

export const TextBlock: React.FC<TextBlockProps> = ({ children: paragraphs, className, highlightFirstParagraph }) => {
	const normalizedParagraphs = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

	return (
		<div className={cn('space-y-6', className)}>
			{normalizedParagraphs.map((paragraph, index) => {
				const isFirst = index === 0;
				const highlight = highlightFirstParagraph && isFirst;
				return (
					<p key={index} className={cn(CLASSES.paragraph, CLASSES[highlight ? 'paragrapHighlight' : 'paragraphNormal'])}>
						{paragraph}
					</p>
				);
			})}
		</div>
	);
};
