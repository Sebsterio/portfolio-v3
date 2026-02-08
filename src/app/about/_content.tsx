import { Code2, Layers, Rocket, Gauge } from 'lucide-react';

export const copy = {
	title: ['*Building Systems', 'That Scale'],
	// TODO
	intro: [
		"I'm a senior front-end engineer with a hybrid background in design, engineering, and technical leadership. I specialise in building durable product foundations — modernising legacy systems, creating cross-platform design systems, and shaping better ways for teams to build, test, and ship software.",
		"I'm most energized by problems that sit at the intersection of UX, architecture, and scalability: turning messy real-world constraints into clean, maintainable systems that teams can confidently evolve over time.",
	],
	// TODO
	sectionTitles: {
		highlights: 'Core Strengths',
		quickFacts: 'Quick Facts',
		techStack: 'Tech Stack',
	},
};

export const highlights = [
	{
		icon: <Layers className='text-white' size={26} />,
		title: 'Cross-Platform Systems',
		description: 'Architect of design systems spanning Web, iOS, and Android platforms',
	},
	{
		icon: <Code2 className='text-white' size={26} />,
		title: 'Legacy Modernization',
		description: 'Led multiple migrations from legacy codebases to modern React/Next.js stacks',
	},
	{
		icon: <Rocket className='text-white' size={26} />,
		title: 'Production Excellence',
		description: 'Deep experience with testing, CI/CD, and production-grade workflows',
	},
	{
		icon: <Gauge className='text-white' size={26} />,
		title: 'End-to-End Ownership',
		description: 'Own features completely — from UX decisions to deployment and observability',
	},
];

export const techCategories = [
	{
		category: 'Frontend',
		techs: ['React', 'Next.js', 'TypeScript'],
	},
	{
		category: 'Infrastructure',
		techs: ['Node.js', 'CI/CD'],
	},
	{
		category: 'Design & Testing',
		techs: ['Design Systems', 'Storybook', 'Testing'],
	},
	{
		category: 'Optimization',
		techs: ['Performance'],
	},
];

export const quickFacts = [
	{ label: 'Experience', value: '8+ Years' },
	{ label: 'Specialization', value: 'Frontend + Systems' },
	{ label: 'Leadership', value: 'Technical Lead' },
];
