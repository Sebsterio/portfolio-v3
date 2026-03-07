import { parseString } from './parseString';
import { MarkdownOverrides } from './types';

type ParsedTextProps = MarkdownOverrides & {
	children: string;
};

/**
 * React component wrapper around `parseString`.
 * Accepts markdown-like text and optional style/class overrides per syntax type.
 */
export const ParsedText = ({ children, className, normal, bold, italics, highlight }: ParsedTextProps) => (
	<>{parseString(children, { className, normal, bold, italics, highlight })}</>
);
