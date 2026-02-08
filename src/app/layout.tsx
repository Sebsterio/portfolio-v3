import type React from 'react';
import { Exo_2, Source_Code_Pro } from 'next/font/google';
// import { SITE_VERIFICATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
export { metadata } from './_metadata';

import './globals.css';

const exo2 = Exo_2({
	subsets: ['latin'],
	variable: '--font-exo',
	weight: ['400', '600', '700', '800'],
});

const sourceCodePro = Source_Code_Pro({
	subsets: ['latin'],
	variable: '--font-source-code',
	weight: ['400', '600'],
});

// const SiteVerificationMeta = SITE_VERIFICATION && <meta name='google-site-verification' content={SITE_VERIFICATION} />;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<head></head>

			<body className={cn(exo2.variable, sourceCodePro.variable, `font-source-code antialiased`)}>{children}</body>
		</html>
	);
}
