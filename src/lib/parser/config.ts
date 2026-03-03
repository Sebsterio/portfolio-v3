import { MarkdownType } from './types';

export const DEFAULT_CLASSES: Record<MarkdownType, string> = {
	normal: '',
	bold: '',
	italics: '',
	highlight: '',
};

export const PATTERNS: { type: Exclude<MarkdownType, 'normal'>; regex: RegExp }[] = [
	{ type: 'bold', regex: /\*\*(.*?)\*\*/ }, // 	Matches `**bold**`
	{ type: 'italics', regex: /__(.*?)__/ }, // 	Matches `__italics__`
	{ type: 'highlight', regex: /==(.*?)==/ }, // Matches `==highlight==`
];
