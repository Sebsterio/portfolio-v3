import { Urbanist, DM_Sans } from 'next/font/google';

export const urbanist = Urbanist({
	subsets: ['latin'],
	variable: '--font-urbanist',
	weight: ['300', '500', '700', '800'],
});

export const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
	weight: ['400', '500', '700'],
});
