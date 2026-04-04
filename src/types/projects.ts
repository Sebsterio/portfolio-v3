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
		/** _Currently UNUSED_ */ // TODO: Timeline-list
		logo: string;

		/** _Currently UNUSED_ */
		thumbnail: string;

		/** Card-detail and Card-list */
		main: string;

		/** Magazine */
		promo: [string, string, string];

		/** Timeline-detail  */
		screens: [string, string, string];
	};
	link?: string;
	roleDetail?: string;
	freelance?: boolean;
	personal?: boolean;
	brief?: boolean;
};
