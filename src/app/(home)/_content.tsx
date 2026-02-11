import { Zap, Sparkles, Target } from 'lucide-react';

export const copy = {
	superscript: 'Available for Projects',
	title: ['Crafting', '*Immersive', 'Experience'], // prefix "*" -> highlight styles
	subtitle:
		'Merging modern web technologies and thoughtful design to deliver immersive, visually striking, and highly performant web	applications that scale.',
};

export const buttons = {
	primary: {
		text: 'View Portfolio',
	},
	secondary: {
		text: 'Start Project',
	},
};

export const showcaseItems = [
	{
		id: 1,
		icon: <Zap className='text-white' size={26} />,
		title: 'Performance',
		description: 'Lightning-fast load times with optimized rendering',
	},
	{
		id: 2,
		icon: <Sparkles className='text-white' size={26} />,
		title: 'Design',
		description: 'Pixel-perfect interfaces with fluid animations',
	},
	{
		id: 3,
		icon: <Target className='text-white' size={26} />,
		title: 'Precision',
		description: 'Meticulous attention to every detail',
	},
];
