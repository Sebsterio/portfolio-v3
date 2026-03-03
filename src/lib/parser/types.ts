export type MarkdownType = 'bold' | 'italics' | 'highlight' | 'normal';

export type MarkdownOverrides = Partial<Record<MarkdownType | 'className', string>>;
