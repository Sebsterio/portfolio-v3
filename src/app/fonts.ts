import localFont from 'next/font/local';

export const dmSans = localFont({
	src: [
		{
			path: './fonts/DMSans-VariableFont_opsz,wght.woff2',
			style: 'normal',
			weight: '100 900',
		},
		{
			path: './fonts/DMSans-Italic-VariableFont_opsz,wght.woff2',
			style: 'italic',
			weight: '100 900',
		},
	],
	variable: '--font-dm-sans',
	display: 'swap',
});

export const urbanist = localFont({
	src: [
		{
			path: './fonts/Urbanist-VariableFont_wght.woff2',
			style: 'normal',
			weight: '100 900',
		},
		{
			path: './fonts/Urbanist-Italic-VariableFont_wght.woff2',
			style: 'italic',
			weight: '100 900',
		},
	],
	variable: '--font-urbanist',
	display: 'swap',
});
