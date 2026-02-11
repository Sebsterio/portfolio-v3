import type React from 'react';
import { /* Exo_2, Source_Code_Pro */ Urbanist, DM_Sans } from 'next/font/google';

// import { SITE_VERIFICATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { QuantumBackground, QuantumHeader } from '@/components';
import { ChromeBackground } from '@/components/ChromeBackground';

import './globals.css';
import { ChromeHeader } from '@/components/ChromeHeader';

export { metadata } from './_metadata';

/* ------------------------------------------------------------------------ */

/* THEME: Quantum Grid */

// const exo2 = Exo_2({
// 	subsets: ['latin'],
// 	variable: '--font-exo',
// 	weight: ['400', '600', '700', '800'],
// });

// const sourceCodePro = Source_Code_Pro({
// 	subsets: ['latin'],
// 	variable: '--font-source-code',
// 	weight: ['400', '600'],
// });

/* THEME: Liquid Chrome */

const urbanist = Urbanist({
	subsets: ['latin'],
	variable: '--font-urbanist',
	weight: ['300', '500', '700', '800'],
});

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
	weight: ['400', '500', '700'],
});

/* ------------------------------------------------------------------------ */

// const SiteVerificationMeta = SITE_VERIFICATION && <meta name='google-site-verification' content={SITE_VERIFICATION} />;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<head></head>

			<body
				className={cn(
					/* exo2.variable, sourceCodePro.variable. 'font-source-code' */ //
					urbanist.variable,
					dmSans.variable,
					`antialiased`
				)}
			>
				<div className='relative min-h-screen bg-black overflow-hidden'>
					<>
						{/* <div className='fixed inset-0 pointer-events-none overflow-hidden'>
							<QuantumBackground />
						</div> */}
						<ChromeBackground />
					</>

					<div className={'relative z-10 max-w-[1400px] mx-auto px-10'}>
						{/* <QuantumHeader /> */}
						<ChromeHeader />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
