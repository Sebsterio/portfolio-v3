export type DisplayMode = 'timeline' | 'cards' | 'magazine';

export type Project = {
	id: string;
	slug: string;
	title: string;
	company: string;
	period: string;
	year: string;
	location: string;
	role: string;
	tags: string[];
	thumbnail: string;
	summary: string;
	intro: string;
	challenge: string;
	solution: string;
	impact: string[];
	link?: string;
};
