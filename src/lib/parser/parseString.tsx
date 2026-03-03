import { ReactNode } from 'react';
import { DEFAULT_CLASSES, PATTERNS } from './config';
import { MarkdownType, MarkdownOverrides } from './types';
import { cn } from '../utils';

const wrap = (content: string, type: MarkdownType, overrides?: MarkdownOverrides, key?: string): ReactNode => {
	return (
		<span key={key} className={cn(DEFAULT_CLASSES[type], overrides?.className, overrides?.[type])}>
			{content}
		</span>
	);
};

const parseSegment = (
	segment: string,
	type: Exclude<MarkdownType, 'normal'>,
	regex: RegExp,
	overrides?: MarkdownOverrides
): ReactNode[] => {
	const parts = segment.split(regex);

	if (parts.length === 1) return [segment];

	return parts.map((part, index) => (index % 2 === 1 ? wrap(part, type, overrides, `${type}-${index}-${part}`) : part));
};

/**
 * Converts markdown-like syntax into an immutable array of JSX nodes using Tailwind classes.
 * Syntax: `**bold**`, `__italics__`, `==highlight==`
 */
export const parseString = (text: string, overrides?: MarkdownOverrides): ReactNode[] => {
	if (!text) return [text];

	const parsed = PATTERNS.reduce<ReactNode[]>( // Parse markdown types
		(elements, { type, regex }) =>
			elements.flatMap((segment) => (typeof segment === 'string' ? parseSegment(segment, type, regex, overrides) : segment)),
		[text]
	);

	return parsed.map((node, index) => (typeof node === 'string' ? wrap(node, 'normal', overrides, `normal-${index}-${node}`) : node)); // Wrap remaining raw strings as "normal"
};
