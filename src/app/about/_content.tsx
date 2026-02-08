import { Code2, Layers, Rocket, Gauge } from 'lucide-react';

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
