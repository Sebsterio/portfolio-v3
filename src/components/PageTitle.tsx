import React from 'react';

type PageTitleProps = {
	children: string | string[];
	className?: string;
	highlightClassName?: string;
	highlightStyle?: React.HTMLAttributes<HTMLSpanElement>['style'];
};

const isHighlighted = (line: string) => line.startsWith('*') && line.length > 1;

const stripMarkers = (line: string) => line.slice(1);

export const PageTitle: React.FC<PageTitleProps> = ({ children: lines, className, highlightClassName, highlightStyle }) => {
	const normalizedLines = Array.isArray(lines) ? lines : [lines];

	return (
		<h1 className={className}>
			{normalizedLines.map((rawLine, index) => {
				const highlight = isHighlighted(rawLine);
				const text = highlight ? stripMarkers(rawLine) : rawLine;
				const isLastLine = index === normalizedLines.length - 1;

				return (
					<React.Fragment key={index}>
						{highlight ? (
							<span className={highlightClassName} style={highlightStyle}>
								{text}
							</span>
						) : (
							text
						)}
						{!isLastLine && <br />}
					</React.Fragment>
				);
			})}
		</h1>
	);
};
