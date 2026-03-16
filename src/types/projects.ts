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
		/** _Currently UNUSED_ */ // TODO: Timeline-list project image
		logo: string;

		/** _Currently UNUSED_ */
		thumbnail: string;

		/** Card-detail and Card-list project image */
		main: string;

		/** _Currently UNUSED_ */
		promo: [string, string, string];

		/** Timeline-detail project images  */
		screens: [string, string, string];
	};
	link?: string;
	roleDetail?: string;
	freelance?: boolean;
};
