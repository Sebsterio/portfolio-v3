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
	description: string[];
	summary: string;
	intro: string;
	challenge: string;
	solution: string;
	impact: string[];
	label: string;
	images: {
		thumbnail: string;
		main: string;
	};
	link?: string;
	roleDetail?: string;
	freelance?: boolean;
};
