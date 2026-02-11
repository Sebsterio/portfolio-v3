import React from 'react';
import { cn } from '@/lib/utils';

type PageTitleProps = {
	children: string | string[];
	/** entire title */
	className?: string;
	/** Every line */
	lineClassName?: string;
	normalClassName?: string;
	normalStyle?: React.HTMLAttributes<HTMLSpanElement>['style'];
	highlightClassName?: string;
	highlightStyle?: React.HTMLAttributes<HTMLSpanElement>['style'];
};

const isHighlighted = (line: string) => line.startsWith('*') && line.length > 1;

const stripMarkers = (line: string) => line.slice(1);

export const PageTitle: React.FC<PageTitleProps> = ({
	children: lines,
	className,
	lineClassName,
	normalClassName,
	normalStyle,
	highlightClassName,
	highlightStyle,
}) => {
	const normalizedLines = Array.isArray(lines) ? lines : [lines];

	return (
		<h1 className={className}>
			{normalizedLines.map((rawLine, index) => {
				const highlight = isHighlighted(rawLine);
				const text = highlight ? stripMarkers(rawLine) : rawLine;
				const isLastLine = index === normalizedLines.length - 1;

				return (
					<React.Fragment key={index}>
						<span
							className={cn(lineClassName, highlight ? highlightClassName : normalClassName)}
							style={highlight ? highlightStyle : normalStyle}
						>
							{text}
						</span>

						{!isLastLine && <br />}
					</React.Fragment>
				);
			})}
		</h1>
	);
};
