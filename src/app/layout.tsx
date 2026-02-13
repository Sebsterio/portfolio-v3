import type React from 'react';
import { Urbanist, DM_Sans } from 'next/font/google';

// import { SITE_VERIFICATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { QuantumBackground } from '@/components';
import { ChromeBackground } from '@/components/ChromeBackground';

import './globals.css';
import { ChromeHeader } from '@/components/ChromeHeader';

export { metadata } from './_metadata';

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

// const SiteVerificationMeta = SITE_VERIFICATION && <meta name='google-site-verification' content={SITE_VERIFICATION} />;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<head></head>

			<body className={cn(urbanist.variable, dmSans.variable, `antialiased`)}>
				<div className='relative min-h-screen bg-black overflow-hidden'>
					<>
						{/* <div className='fixed inset-0 pointer-events-none overflow-hidden'>
							<QuantumBackground />
						</div> */}
						<ChromeBackground />
					</>

					<div className={'relative z-10 max-w-[1400px] mx-auto px-10'}>
						<ChromeHeader />
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
