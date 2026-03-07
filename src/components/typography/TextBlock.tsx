import React from 'react';
import { cn } from '@/lib/utils';
import { ParsedText } from '@/lib/parser/ParsedText';

type TextBlockProps = {
	children: string | string[];
	className?: string;
	highlightFirstParagraph?: boolean;
};

export const TextBlock: React.FC<TextBlockProps> = ({ children: paragraphs, className, highlightFirstParagraph }) => {
	const normalizedParagraphs = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

	return (
		<div className={cn('space-y-6', className)}>
			{normalizedParagraphs.map((paragraph, index) => {
				const isPrimary = highlightFirstParagraph && index === 0;

				return (
					<p key={index} className={cn(isPrimary ? 'body-lg text-primary' : 'body-md text-tertiary')}>
						<ParsedText bold={'text-bold'}>{paragraph}</ParsedText>
					</p>
				);
			})}
		</div>
	);
};
