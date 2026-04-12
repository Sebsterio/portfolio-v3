import type { ThemeName } from '@/lib/theme/types';

export type DisplayMode = 'timeline' | 'cards' | 'magazine';

export type Project = {
	id: string;
	slug: string;
	theme: ThemeName | null;
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

export type ProjectNavTarget = Pick<Project, 'id' | 'slug'>;

export type ProjectNavItem = ProjectNavTarget & { prev: ProjectNavTarget; next: ProjectNavTarget };
